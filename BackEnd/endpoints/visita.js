
// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const db_instance = require("../database/connection");
const { send_error, log_error, query_employee, query_student, query_visitant } = require("./utility");

// Constants definitions
const MAX_TIMEOUT = 100;//ms
const visita_route = express.Router();


const is_manager = (id) => {
    // tipo === 0 -> Agent
    // tipo === 1 -> Manager

    const knex = db_instance();

    return new Promise( (resolve, reject) => {
        knex("usuario")
        .count("id_usuario")
        .where(knex.raw("id_usuario = ?", [id]))
        .where(knex.raw("tipo = 1"))
        .timeout(MAX_TIMEOUT)
        .then(result => {
            result = +result[0].count;
            resolve(result === 1);
        })
        .catch( err => {
            reject("Don't was possible verify if this user is a manager");
        })
    });
}

const get_visits = (fk_id_usuario) => {
    const knex = db_instance();

    const subquery = knex
        .column({id: "id_visita_aluno"}, "nome", "data", "status_de_aprovacao", knex.raw("'aluno' as tipo_requisicao"))
        .select()
        .from("visita_aluno")
        .where(knex.raw("fk_id_usuario=?", [fk_id_usuario]))
        .where(knex.raw("visita_aluno.ativado = ?", [true]))
        .innerJoin("aluno", "visita_aluno.fk_id_aluno", "=", "aluno.id_aluno")
        .union([
            knex.raw(`SELECT
                        id_visita_visitante AS id,
                        nome,
                        "data",
                        status_de_aprovacao,
                        'visitante' AS tipo_requisicao
                    FROM
                        visita_visitante, visitante
                    WHERE
                        fk_id_visitante = id_visitante AND
                        visita_visitante.ativado = true AND
                        fk_id_usuario = ?`, [fk_id_usuario]),

            knex.raw(`SELECT
                        id_visita_servidor AS id,
                        nome,
                        "data",
                        status_de_aprovacao,
                        'servidor' AS tipo_requisicao
                    FROM
                        visita_servidor, servidor
                    WHERE
                        fk_id_servidor = id_servidor AND
                        visita_servidor.ativado = true AND
                        fk_id_usuario = ?`, [fk_id_usuario]),
        ])
        .orderBy("data", "desc").as("subquery");

    return subquery;
}

const get_visits_for_managers = () => {
    const knex = db_instance();

    const subquery = knex.raw(
        `(SELECT
            id_visita_aluno AS id,
            aluno.nome AS nome,
            "data",
            status_de_aprovacao,
            'aluno' AS tipo_requisicao,
            usuario.nome AS requerente
        FROM
            visita_aluno, aluno, usuario
        WHERE
            visita_aluno.ativado = true AND
            visita_aluno.fk_id_aluno = aluno.id_aluno AND
            visita_aluno.fk_id_usuario = usuario.id_usuario
        UNION
        SELECT
            id_visita_visitante AS id,
            visitante.nome,
            "data",
            status_de_aprovacao,
            'visitante' AS tipo_requisicao,
            usuario.nome AS requerente
        FROM
            visita_visitante, visitante, usuario
        WHERE
            visita_visitante.ativado = true AND
            visita_visitante.fk_id_visitante = visitante.id_visitante AND
            visita_visitante.fk_id_usuario = usuario.id_usuario
        UNION
        SELECT
            id_visita_servidor AS id,
            servidor.nome,
            "data",
            status_de_aprovacao,
            'servidor' AS tipo_requisicao,
            usuario.nome AS requerente
        FROM
            visita_servidor, servidor, usuario
        WHERE
            visita_servidor.ativado = true AND
            visita_servidor.fk_id_servidor = servidor.id_servidor AND
            visita_servidor.fk_id_usuario = usuario.id_usuario
        ORDER BY "data" DESC) AS subquery
            `, [])

    return subquery;
}

visita_route.route("/visita")
.get((req, res, next) =>{
    const knex = db_instance();

    const fk_id_usuario = req.session.user_info.id_usuario;
    const subquery = get_visits(fk_id_usuario);

    knex.select("*").from(subquery).where(knex.raw("status_de_aprovacao = ?", [0]))
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    });
})
.post((req, res, next) =>{
    if (req.body.what !== "STATUS_AGUARDANDO"){
        next();
        return;
    }

    const knex = db_instance();

    const fk_id_usuario = req.session.user_info.id_usuario;

    let subquery = null;
    is_manager(fk_id_usuario)
    .then( result => {
        if (result === true)
            subquery = get_visits_for_managers();
        else
            subquery = get_visits(fk_id_usuario);

        return knex.select("*")
            .from(subquery)
            .where(knex.raw("status_de_aprovacao = ?", [0]))
    })
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    });
})
.post((req, res, next) =>{
    if (req.body.what !== "STATUS_PROCESSADO"){
        next();
        return;
    }

    const knex = db_instance();

    const fk_id_usuario = req.session.user_info.id_usuario;

    let subquery = null;
    is_manager(fk_id_usuario)
    .then( result => {
        if (result === true)
            subquery = get_visits_for_managers();
        else
            subquery = get_visits(fk_id_usuario);

        return knex.select("*")
            .from(subquery)
            .where(knex.raw("status_de_aprovacao != ?", [0]))
    })
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    });

});



get_table_name = (tipo_requisicao)=>{
    let table_name = null;
    if (tipo_requisicao === "aluno")
        table_name = "visita_aluno";
    else if (tipo_requisicao === "servidor")
        table_name = "visita_servidor";
    else if (tipo_requisicao === "visita_visitante")
        table_name = "visita_visitante";

    return table_name;
}

visita_route.route("/visita/delete/")
.post((req, res, next)=>{
    const id = req.body.id_visita;
    const tipo_requisicao = req.body.tipo_requisicao;

    let table_name = get_table_name(tipo_requisicao);

    if (table_name == null){
        send_error(res, "Dados inválidos. Tente novamente.");
        return;
    }

    const knex = db_instance();

    knex(table_name)
    .update({ativado: false})
    .where(knex.raw(`id_${table_name} = ?`, [id]))
    .timeout(MAX_TIMEOUT)
    .then(updated_rows => {

        if (updated_rows === 1)
            res.send("Requisição removida com sucesso!");
        else
            send_error(res, "Não foi possível remover está requisição");
    })
    .catch( err => {
        send_error(res, "Não foi possível remover está requisição.");
        log_error("/visita/delete/", "Removing a visit", err, req.body);
    });
});


/* query = (id, table_name) =>{
    const knex = db_instance();

    return new Promise((resolve, reject) => {
        knex
        .select()
        .from(table_name)
        .where(knex.raw(`${table_name}.id_${table_name} = ?`, [id]))
        .timeout(MAX_TIMEOUT)
        .then(result => {
            if (result.length === 1)
                resolve(result[0]);
            else
                reject("No row matched.");
        })
        .catch(err=>{
            reject(`Error when trying to query on ${table_names}.`);
        })
    });
}

query_student = (id_visita_aluno) => {
    const knex = db_instance();

    return new Promise((resolve, reject)=>{
        let visita_aluno = {};

        query(id_visita_aluno, "visita_aluno")
        .then(result=>{
            visita_aluno.visita_aluno = result;
            const id_aluno = result.fk_id_aluno;

            return query(id_aluno, "aluno");
        })
        .then(aluno => {
            visita_aluno.aluno = aluno;

            resolve(visita_aluno);
        })
        .catch(err=>{
            reject(err);
        });
    });
}

query_visitant = (id_visita_visitante) => {
    let visita_visitante = {};

    return new Promise((resolve, reject) => {
        query(id_visita_visitante, "visita_visitante")
        .then(async result=>{
            visita_visitante.visita_visitante = result;

            const id_visitante = result.fk_id_visitante;
            const id_veiculo_visitante = result.fk_id_veiculo_visitante;

            let veiculo_visitante = null;
            if (id_veiculo_visitante !== null)
                veiculo_visitante = await query(id_veiculo_visitante, "veiculo_visitante");

            visita_visitante.veiculo_visitante = veiculo_visitante;

            return query(id_visitante, "visitante");
        })
        .then(result => {
            visita_visitante.visitante = result;

            const id_empresa = result.fk_id_empresa;

            return query(id_empresa, "empresa");
        })
        .then(result => {
            visita_visitante.empresa = result;

            resolve(visita_visitante);
        })
        .catch(err=>{
            reject(err);
        });
    });
}

query_employee = (id_visita_servidor) => {
    let visita_servidor = {};

    return new Promise((resolve, reject)=>{
        query(id_visita_servidor, "visita_servidor")
        .then(async result => {
            visita_servidor.visita_servidor = result;

            const id_servidor = result.fk_id_servidor;
            const id_veiculo_servidor = result.fk_id_veiculo_servidor;

            let veiculo_servidor = null;
            if (id_veiculo_servidor !== null)
                veiculo_servidor = await query(id_veiculo_servidor, "veiculo_servidor");

            visita_servidor.veiculo_servidor = veiculo_servidor;

            return query(id_servidor, "servidor");
        })
        .then(servidor => {
            visita_servidor.servidor = servidor;

            resolve(visita_servidor);
        })
        .catch(err => {
            reject(err);
        })
    });

} */

visita_route.route("/visita/query")
.post( async (req, res, next)=>{
    // const id = 15;
    const id = req.body.id_visita;
    // const tipo_requisicao = "visitante";
    const tipo_requisicao = req.body.tipo_requisicao;

    if (tipo_requisicao == null){
        send_error(res, "Dados inválidos. Tente novamente.");
        return;
    }

    let data = null;
    if (tipo_requisicao === "aluno")
        data = await query_student(id);
    else if (tipo_requisicao === "visitante")
        data = await query_visitant(id);
    else if (tipo_requisicao === "servidor")
        data = await query_employee(id);

    if (data != null){
        res.json(data);
    } else {
        console.log("err");
    }


});

const change_visit_status = (table_name, id, value) => {
    const knex = db_instance();

    return knex(table_name)
    .update({
        status_de_aprovacao: value
    })
    .where(knex.raw(`id_${table_name} = ?`, [id]));
}

visita_route.route("/visita_process")
.post((req, res, next) => {
    const data = req.body;

    if (!("tipo_requisicao" in data) ||
        !("id" in data)              ||
        !("status" in data))          {

        res.sendStatus(400);
        return;
    }

    const tipo_requisicao = data["tipo_requisicao"];
    const id = data["id"];
    const status_de_aprovacao = data["status"] === "approve" ? 1 : 2;

    let table_name = `visita_${tipo_requisicao}`;

    change_visit_status(table_name, id, status_de_aprovacao)
    .then(result => {
        res.sendStatus(200);
    })
    .catch( err => {
        res.sendStatus(400);
    });
})


module.exports = { visita_route };