
// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const db_instance = require("../database/connection");
const { send_error, log_error } = require("./utility");

// Constants definitions
const MAX_TIMEOUT = 100;//ms
const visita_route = express.Router();

const get_visits = (fk_id_usuario) => {
    const knex = db_instance();

    const subquery = knex
        .column({id: "id_aluno"}, "nome", "data", "status_de_aprovacao", knex.raw("'aluno' as tipo_requisicao"))
        .select()
        .from("visita_aluno")
        .where(knex.raw("fk_id_usuario=?", [fk_id_usuario]))
        .innerJoin("aluno", "visita_aluno.fk_id_aluno", "=", "aluno.id_aluno")
        .union([
            knex.raw(`SELECT
                        id_visitante AS id,
                        nome,
                        "data",
                        status_de_aprovacao,
                        'visitante' AS tipo_requisicao
                    FROM
                        visita_visitante, visitante
                    WHERE
                        fk_id_visitante = id_visitante AND
                        fk_id_usuario = ?`, [fk_id_usuario]),

            knex.raw(`SELECT
                        id_servidor AS id,
                        nome,
                        "data",
                        status_de_aprovacao,
                        'servidor' AS tipo_requisicao
                    FROM
                        visita_servidor, servidor
                    WHERE
                        fk_id_servidor = id_servidor AND
                        fk_id_usuario = ?`, [fk_id_usuario]),
        ])
        .orderBy("data", "desc").as("subquery");

    return subquery;
}

visita_route.route("/visita")
.get((req, res, next) =>{
    const knex = db_instance();
    const subquery = get_visits(5);

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
    const subquery = get_visits(5);//get_visits(req.session.user_id);

    knex.select("*").from(subquery).where(knex.raw("status_de_aprovacao = ?", [0]))
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
    const subquery = get_visits(5);//get_visits(req.session.user_id);

    knex.select("*").from(subquery).where(knex.raw("status_de_aprovacao != ?", [0]))
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    });

});

module.exports = { visita_route };