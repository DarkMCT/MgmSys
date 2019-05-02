// Constants definitions
const MAX_TIMEOUT = 100;//ms

const db_instance = require("../database/connection");

const log_error = (route, when, err, req, suggestion) => {
    console.error("-".repeat(10) + " ERROR OCURRED " + "-".repeat(10));
    console.error("Route: ", route);
    console.error("When: ", when);

    if (suggestion != undefined)
        console.error("Suggestion: ", suggestion);

    if (req != undefined)
        console.error("Request: ", req.body);

    console.error("Error: ", err);

    console.error("-".repeat(35));
}

const send_error = (res, why)=>{
    if (!res.headersSent)
        res.status(400).send(why);
};

const remove_mark_signs = (str) => {
    return str.replace(/\.|\-|\//g, "");
}

const data_exists = (table_name, column_name, data)=>{
    const knex = db_instance();

    return new Promise((resolve, reject)=>{
        knex(table_name).count(`id_${table_name}`)
        .where(knex.raw(`${column_name} = ?`, [data[column_name]]))
        .timeout(MAX_TIMEOUT)
        .then(res => {
            if (res.length === 1){
                resolve(+res[0].count === 1);
            } else {
                resolve(false);
            }
        })
        .catch( err =>{
            console.log(err);
            reject(false);
        });
    });
}

const insert_data = (table_name, data, trx)=>{
    const knex = db_instance();

    return new Promise((resolve, reject) => {
        let stmt = knex(table_name);

        if (trx != null)
            stmt = stmt.transacting(trx);

        stmt.insert(data)
        .returning(`id_${table_name}`)
        .timeout(MAX_TIMEOUT)
        .then(id => {
            if (id.length === 1)
                resolve(id[0]);
            else
                reject("Zero or more than one result.");
        })
        .catch((err) => {
            reject("Don't was possible to add this data.");
        })
    });
}

const get_id =  (table_name, column_name, data)=>{
    const knex = db_instance();
    return new Promise((resolve, reject)=> {
        knex(table_name)
        .select(`id_${table_name}`)
        .where(knex.raw(`${column_name} = ?`,[data[column_name]]))
        .timeout(MAX_TIMEOUT)
        .then(id => {
            if (id.length === 1)
                resolve(id[0][`id_${table_name}`]);
            else
                reject("Don't was possible to get this data.");
        })
        .catch(err=>{
           throw err;
        });
    });
}

const update_data = (table_name, id, data) => {
    const knex = db_instance();

    return knex(table_name)
        .where(knex.raw(`id_${table_name} = ?`, [id]))
        .update({...data})
        .timeout(MAX_TIMEOUT);
}

query = (id, table_name) =>{
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

}

module.exports = { insert_data, update_data, get_id, data_exists, remove_mark_signs, send_error, log_error,
    query_employee, query_student, query_visitant };