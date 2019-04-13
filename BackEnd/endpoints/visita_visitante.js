

// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const db_instance = require("../database/connection");

// Constants definitions
const MAX_TIMEOUT = 100;//ms
const visita_visitante_route = express.Router();

// ---- Utility functions ----

const log_error = (route, when, err, suggestion) => {
    console.error("-".repeat(10) + " ERROR OCURRED " + "-".repeat(10));
    console.error("Route: ", route);
    console.error("When: ", when);

    if (sugestion != undefined)
        console.error("Suggestion: ", suggestion);

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
        .where(knex.raw(`${column_name} = ?`, [data]))
        .timeout(MAX_TIMEOUT)
        .then(res => {
            if (res.length === 1){
                resolve(+res[0].count === 1);
            }
        })
        .catch( err =>{
            reject(err);
        });
    });
}

const insert_data_if_not_exist = (table_name, column_name, data)=>{
    const knex = db_instance();

    return data_exists(table_name, column_name, data[column_name])
        .then( exist => {
            if (!exist)
                return knex(table_name).insert(data).returning(`id_${table_name}`);
            else
                return knex(table_name).select(`id_${table_name}`).where(knex.raw(`${column_name} = ?`,[data[column_name]]));
        })
        .catch( err => {
           throw err;
        })
}

// ------------------------------------------------------------------------

// Route name: /visita_visitante
//
// Responabilities: list all visitants and add new visitantes
//      when listing: a GET METHOD is expected
//      when adding: a POST METHOD is expected. The body must have the a "visitante", "veiculo_visitante", "emrpesa",
//                  "visita_visitante" objects.
//
//  Behavior: On adding, if all data is correctly, is returned a response with status code 200 indicantion success.
//            Otherwise, is returned a response with status code 400 indicating fail. The reason can be duplication
//            of UNIQUE fields on Database, data with wrong type.
//
//  Obs:     THIS ROUTE is SMART enough to prevent duplication of UNIQUE fields he just search if such fields exist
//            and if the exist just import the PRIMARY KEY
visita_visitante_route.route("/visita_visitante")
.get((req, res, next)=>{
    const knex = db_instance();

    knex.select().from("visita_visitante").timeout(MAX_TIMEOUT)
        .then( result => {
            res.status(200).json(result);
        }).catch(err=>{
            log_error("/visita_visitante", "Searching for visits of visitants.", err,
                "Analyse the connection with database or the constaints on database.");
            send_error(res, "Não foi possível buscar as visitas de visitantes cadastrados.");
        });
})
.post((req, res, next)=>{
    // extract data from body
    const data = req.body;
    // split between visitante, veiculo_visitante, empresa, visita_visitante
    let {visitante, veiculo_visitante, empresa, visita_visitante} = data;

    empresa.cnpj = remove_mark_signs(empresa.cnpj);
    veiculo_visitante.placa = remove_mark_signs(veiculo_visitante.placa);
    visitante.rg = remove_mark_signs(visitante.rg);
    visitante.cpf = remove_mark_signs(visitante.cpf);

    // get a connection of the database
    const knex = db_instance();

    // TODO: refactor this code. The vehicle is not ever possible

    // insert the company first to get id_company
    insert_data_if_not_exist("empresa", "cnpj", empresa).then( id => {
        const fk_id_empresa = id[0].id_empresa;

        // insert the vehicle data to get id_vehicle
        insert_data_if_not_exist("veiculo_visitante", "placa", veiculo_visitante).then( id => {
            const fk_id_veiculo_visitante = id[0].id_veiculo_visitante;

            // remove the fk_id_empresa from visitante object
            visitante = {...visitante, fk_id_empresa};

            // insert the visitant to get the id_visitant
            insert_data_if_not_exist("visitante", "rg", visitante).then( id => {
                const fk_id_visitante = id[0].id_visitante;

                // the fk_id_usuario must be obtained from req (he is stored in a session)
                const fk_id_usuario = 5;// req.session.user_id <-- JUST TEST

                visita_visitante = {...visita_visitante, fk_id_usuario, fk_id_veiculo_visitante, fk_id_visitante};

                knex("visita_visitante").insert(visita_visitante).then(e => {
                    res.status(200).send("Success to register this visitante");
                }).catch(err=>{
                    log_error("/visita_visitante method=POST", "Adding visita_visitante.", err);
                    send_error(res, "Não foi possível cadastrar os dados desta visita. Verifique se os dados estão corretos.");
                })
            }).catch(err=>{
                log_error("/visita_visitante method=POST", "Adding visitante.", err);
                send_error(res, "Não foi possível cadastrar os dados deste visitante. Verifique se os dados estão corretos.");
            })
        }).catch(err=>{
            log_error("/visita_visitante method=POST", "Adding veiculo_visitante.", err);
            send_error(res, "Não foi possível cadastrar os dados deste veículo. Verifique se os dados estão corretos.");
        })
    }).catch(err=>{
        log_error("/visita_visitante method=POST", "Adding empresa.", err);
        send_error(res, "Não foi possível cadastrar os dados desta empresa. Verifique se os dados estão corretos.");
    });
});

// Route name: /visita_visitante/:id
//
// Responabilities: search by a visitant with id_visitant like :id parameter
//      when listing: a GET METHOD is expected, and the desired id must be in the url
//
//  Behavior: Search by some visit_visitant, specificated by :id parameter
//
//  Obs:    On succes, the response has the status code 200
//          On failure, the response has the status code 400
visita_visitante_route.route("/visita_visitante/:id")
.get((req, res, next)=>{
    const id = req.params.id;
    const knex = db_instance();

    knex.select().from("visita_visitante").timeout(MAX_TIMEOUT)
    .where(knex.raw("visita_visitante.id_visita_visitante = ?", [id]))
        .then( result => {
            res.status(200).json(result);
        }).catch(err=>{
            log_error("/visita_visitante/:id method=GET", )
            send_error(res, "Não foi possível verificar por esta visita.");
        });
});

// Route name: /visita_visitante/search
//
// Responabilities: Retrives datas of uniques fields from database. It must be used for front-end
//                  to export foreign keys and facilitate/imporve user experience
//
//  Behavior: On recieve a POST method, verify by the "what" field.
//            The what field can be "RG_CPF" to search a specific RG, CPF or both. When the what field is "PLACA"
//            search by PLACA such placa on database. When the what field is "CNPJ", search by such CNPJ on table
//            "empresa"
//
//
//  Obs:    On succes, the response has the status code 200
//          On failure, the response has the status code 400
visita_visitante_route.route("/visita_visitante/search")
.post((req, res, next)=>{
    if (req.body.what !== "RG_CPF"){
        next();
        return;
    }

    let {rg, cpf} = req.body;

    if (rg == null && cpf == null) {
        send_error(res, "RG e CPF não específicados.");
        return;
    }

    const knex = db_instance();

    let stmt = knex("visitante").select();

    if (rg == null){
        cpf = remove_mark_signs(cpf)
        stmt = stmt.where(knex.raw("cpf = ?", [cpf]));
    }
    else if (cpf == null){
        stmt = stmt.where(knex.raw("rg = ?", [rg]));
        rg = remove_mark_signs(rg)
    }
    else {
        cpf = remove_mark_signs(cpf)
        rg = remove_mark_signs(rg)

        stmt = stmt.where(knex.raw("cpf = ? and rg = ?", [cpf, rg]));
    }

    stmt.timeout(MAX_TIMEOUT)
    .then( result => {
        if (result.length === 1) {
            const {id_visitante, fk_id_empresa, ativado, ..._result} = result[0];

            res.status(200).json(_result);
        }
        else {
            send_error(res, "Não possível verificar a existências desses dados.");
        }
    })
    .catch( err => {
        log_error("/visita_visitante/search method=POST", "Searching by already added RG or CPF.", err);
        send_error(res, "Não possível verificar a existências desses dados.");
    })

})
.post((req, res, next)=>{
    if (req.body.what !== "PLACA") {
        next();
        return;
    }

    let { placa } = req.body;

    if (placa == null) {
        failure_message();
        return;
    }

    placa = remove_mark_signs(placa);

    const knex = db_instance();
    let stmt = knex("veiculo_visitante").select().where(knex.raw("placa = ?", [placa]));

    stmt.timeout(MAX_TIMEOUT)
    .then( result => {

        if (result.length === 1) {
            const {id_veiculo_visitante, ativado, ..._result} = result[0];

            res.status(200).json(_result);
        }
        else {
            failure_message();
        }
    })
    .catch( err => {
        log_error("/visita_visitante/search method=POST", "Searching by already added RG or CPF.", err);
        send_error(res, "Não possível verificar a existências desses dados.");
    })
})
.post((req, res, next)=>{
    if (req.body.what !== "CNPJ") {
        next();
        return;
    }

    let { cnpj } = req.body;
    if (cnpj == null) {
        send_error(res, "Não possível verificar a existências desses dados.");
        return;
    }

    cnpj = remove_mark_signs(cnpj)

    const knex = db_instance();

    let stmt = knex("empresa").select().where(knex.raw("cnpj = ?", [cnpj]));

    stmt.timeout(MAX_TIMEOUT)
    .then( result => {

        if (result.length === 1) {
            const {id_empresa, ativado, ..._result} = result[0];

            res.status(200).json(_result);
        }
        else {
            send_error(res, "Não possível verificar a existências desses dados.");
        }
    })
    .catch( err => {
        log_error("/visita_visitante/search method=POST", "Searching by already added RG or CPF.", err);
        send_error(res, "Não possível verificar a existências desses dados.");
    })
});

module.exports = { visita_visitante_route };