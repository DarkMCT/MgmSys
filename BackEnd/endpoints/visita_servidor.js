

// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const db_instance = require("../database/connection");
const { insert_data, get_id, data_exists, remove_mark_signs, send_error, log_error } = require("./utility");

// Constants definitions
const MAX_TIMEOUT = 100;//ms

const visita_servidor_route = express.Router();


// ------------------------------------------------------------------------

// Route name: /visita_servidor
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
visita_servidor_route.route("/visita_servidor")
.get((req, res, next)=>{
    const knex = db_instance();

    knex.select().from("visita_servidor").timeout(MAX_TIMEOUT)
        .then( result => {
            res.status(200).json(result);
        }).catch(err=>{
            log_error("/visita_servidor", "Searching for visits of visitants.", err,
                "Analyse the connection with database or the constaints on database.");

            send_error(res, "Não foi possível buscar as visitas de servidores cadastrados.");
        });
})
.post(async (req, res, next)=>{
    // extract data from body
    const data = req.body;
    // split between servidor, veiculo_servidor, visita_servidor
    let { servidor, veiculo_servidor, visita_servidor } = data;

    servidor.cpf = remove_mark_signs(servidor.cpf);
    servidor.rg = remove_mark_signs(servidor.rg);
    veiculo_servidor.placa = remove_mark_signs(veiculo_servidor.placa);

    try {
        let fk_id_veiculo_servidor = null;
        if (veiculo_servidor != null){
            if (await data_exists("veiculo_servidor", "placa", veiculo_servidor) === true){
                fk_id_veiculo_servidor = await get_id("veiculo_servidor", "placa", veiculo_servidor);
            } else {
                fk_id_veiculo_servidor = await insert_data("veiculo_servidor", veiculo_servidor);
            }
        }
    } catch(err){
        log_error("/visita_servidor", "Trying add vehicle", err, req, "Verify the body of request.");
        send_error(res, "Não foi possível cadastrar este veículo. Verifica os dados, por favor.");
        return;
    }

    try {
        let fk_id_servidor = null;
        if (servidor == null) {
            send_error(res, "Não foi possível cadastrar os dados desta visita. Verifique se os dados estão corretos.");
            return;
        } else {
            if (await data_exists("servidor", "siape", servidor) === true){
                fk_id_servidor = await get_id("servidor", "siape", servidor);
            } else {
                fk_id_servidor = await insert_data("servidor", servidor);
            }
        }
    } catch(err) {
        log_error("/visita_servidor", "Trying add employee", err, req, "Verify the body of request.");
        send_error(res, "Não foi possível cadastrar este servidor. Verifica os dados, por favor.");
        return;
    }

    const fk_id_usuario = 5; //req.session.user_id;

    visita_servidor = {...visita_servidor, fk_id_usuario, fk_id_veiculo_servidor, fk_id_servidor};

    insert_data("visita_servidor", visita_servidor)
    .then(id => {
        res.status(200).send("Success to register this visitante");
    })
    .catch(err=>{
        log_error("/visita_servidor method=POST", "Adding visit.", err, req);
        send_error(res, "Não foi possível cadastrar os dados desta visita. Verifique se os dados estão corretos.");
    });
});

// Route name: /visita_servidor/:id
//
// Responabilities: search by a visitant with id_employee equal :id parameter
//      when listing: a GET METHOD is expected, and the desired id must be in the url
//
//  Behavior: Search by some visit_employee, specificated by :id parameter
//
//  Obs:    On succes, the response has the status code 200
//          On failure, the response has the status code 400
visita_servidor_route.route("/visita_servidor/:id")
.get((req, res, next)=>{
    const id = req.params.id;
    const knex = db_instance();

    knex.select().from("visita_servidor").timeout(MAX_TIMEOUT)
    .where(knex.raw("visita_servidor.id_visita_servidor = ?", [id]))
        .then( result => {
            res.status(200).json(result);
        }).catch(err=>{
            log_error("/visita_servidor/:id method=GET", )
            send_error(res, "Não foi possível verificar por esta visita.");
        });
});

// Route name: /visita_servidor/search
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
visita_servidor_route.route("/visita_servidor/search")
.post((req, res, next)=>{
    if (req.body.what !== "SIAPE"){
        next();
        return;
    }

    let {siape} = req.body;

    if (siape == null) {
        send_error(res, "SIAPE não específicado.");
        return;
    }

    const knex = db_instance();

    let stmt = knex("servidor").select().where(knex.raw("siape = ?", [siape]));


    stmt.timeout(MAX_TIMEOUT)
    .then( result => {
        if (result.length === 1) {
            const {id_servidor, ativado, ..._result} = result[0];

            res.status(200).json(_result);
        }
        else {
            send_error(res, "Não possível verificar a existências desses dados.");
        }
    })
    .catch( err => {
        log_error("/visita_visitante/search method=POST", "Searching by already added SIAPE.", err, req);
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
    let stmt = knex("veiculo_servidor").select().where(knex.raw("placa = ?", [placa]));

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
        log_error("/visita_servidor/search method=POST", "Searching by already added PLACA.", err);
        send_error(res, "Não possível verificar a existências desses dados.");
    })
});

module.exports = { visita_servidor_route: visita_servidor_route };