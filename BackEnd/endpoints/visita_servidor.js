

// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const db_instance = require("../database/connection");
const { insert_data, update_data, get_id, data_exists, remove_mark_signs, send_error, log_error } = require("./utility");

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
    const fk_id_usuario = req.session.user_info.id_usuario; //req.session.user_id;
    const knex = db_instance();
    // split between servidor, veiculo_servidor, visita_servidor
    let { servidor, veiculo_servidor, visita_servidor } = data;
    let fk_id_veiculo_servidor = null;
    let fk_id_servidor = null;

    servidor.cpf = remove_mark_signs(servidor.cpf);
    servidor.rg = remove_mark_signs(servidor.rg);

    if (veiculo_servidor)
        veiculo_servidor.placa = remove_mark_signs(veiculo_servidor.placa);

    knex.transaction( trx => {
        let thread = null;

        // We use the variable "thread" because the vehicle is not always pre-
        // sent
        if (veiculo_servidor != null)
            thread =  data_exists("veiculo_servidor", "placa", veiculo_servidor);
        else
            thread = Promise.resolve(null);

        thread.then(vehicle_exist => {
            if (vehicle_exist === true)
                return get_id("veiculo_servidor", "placa", veiculo_servidor);
            else if (vehicle_exist === false)
                return insert_data("veiculo_servidor", veiculo_servidor, trx);
            else Promise.resolve(null);
        })
        .then( _fk_id_veiculo_servidor => {
            fk_id_veiculo_servidor = _fk_id_veiculo_servidor;

            return data_exists("servidor", "siape", servidor);
        })
        .then(employee_exists => {
            if (employee_exists)
                return get_id("servidor", "siape", servidor);
            else
                return insert_data("servidor", servidor, trx);
        })
        .then(_fk_id_servidor => {
            fk_id_servidor = _fk_id_servidor;

            visita_servidor = {
                ...visita_servidor,
                fk_id_usuario,
                fk_id_veiculo_servidor,
                fk_id_servidor,
            };

            return insert_data("visita_servidor", visita_servidor, trx)
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(() => {
        res.status(200).send("Success to register this visit");
    })
    .catch(err=>{
        log_error("/visita_servidor method=POST", "Adding visit.", err, req);
        send_error(res, "Não foi possível cadastrar os dados desta visita. " +
            "Verifique se os dados estão corretos.");
    });
})
.patch(async (req, res, next)=>{
    // extract data from the body
    const data_to_update = req.body;

    // extract if the key exist else let as null
    let visita_servidor = "visita_servidor" in data_to_update
        ? data_to_update["visita_servidor"]
        : null ;

    let servidor = "servidor" in data_to_update
        ? data_to_update["servidor"]
        : null ;

    let veiculo_servidor = "veiculo_servidor" in data_to_update
        ? data_to_update["veiculo_servidor"]
        : null ;

    try {
        // Update employee visit
        if (visita_servidor) {
            let { id_visita_servidor, ...changed_data} = visita_servidor;
            const updated_rows = await update_data("visita_servidor", id_visita_servidor, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in visit_employee.");
        }

        // Update employee
        if (servidor) {
            let { id_servidor, ...changed_data} = servidor;
            const updated_rows = await update_data("servidor", id_servidor, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in student.");
        }

        // Update vehicle if any
        if (veiculo_servidor) {
            let { id_veiculo_servidor, ...changed_data} = veiculo_servidor;
            const updated_rows = await update_data("veiculo_servidor", id_veiculo_servidor, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in student.");
        }

        res.sendStatus(200);

    } catch (err) {
        send_error(res, "Não foi possível alterar os dados. Verifique se você preencheu os campos corretamente.");
        log_error("/visita_servidor", "Trying to update visit", err, req);
    }

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
    // extract id
    const id = req.params.id;

    // get a connection of database
    const knex = db_instance();

    knex.select()
    .from("visita_servidor")
    .timeout(MAX_TIMEOUT)
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
    // Discard if is not of this route
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

    let stmt = knex("servidor")
        .select()
        .where(knex.raw("siape = ?", [siape]));

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
    // Discard if is not of this route
    if (req.body.what !== "PLACA") {
        next();
        return;
    }

    let { placa } = req.body;

    if (placa == null) {
        send_error(res, "Placa não específicada.");
        return;
    }

    // The marks are removed because this can affect the search
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
            send_error(res, "Placa não específicada.");
            return;
        }
    })
    .catch( err => {
        log_error("/visita_servidor/search method=POST", "Searching by already added PLACA.", err);
        send_error(res, "Não possível verificar a existências desses dados.");
    })
});

module.exports = { visita_servidor_route: visita_servidor_route };