

// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const db_instance = require("../database/connection");
const {
    insert_data,
    update_data,
    get_id,
    data_exists,
    remove_mark_signs,
    send_error,
    log_error
} = require("./utility");

// Constants definitions
const MAX_TIMEOUT = 100;//ms
const visita_visitante_route = express.Router();


// ------------------------------------------------------------------------

// Route name: /visita_visitante
//
// Responabilities: list all visitants and add new visitantes
//      when listing: a GET METHOD is expected
//      when adding: a POST METHOD is expected. The body must have the a
//      "visitante", "veiculo_visitante", "emrpesa",
//                  "visita_visitante" objects.
//
//  Behavior: On adding, if all data is correctly, is returned a response with
//            status code 200 indicantion success. Otherwise, is returned a
//            response with status code 400 indicating fail. The reason can be
//            duplication of UNIQUE fields on Database, data with wrong type.
//
//  Obs:     THIS ROUTE is SMART enough to prevent duplication of UNIQUE fields
//           he just search if such fields existand if the exist just import the
//           PRIMARY KEY
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
.post( async (req, res, next)=>{
    // extract data from body
    const data = req.body;
    const knex = db_instance();

    // split between visitante, veiculo_visitante, empresa, visita_visitante
    let {visitante, veiculo_visitante, empresa, visita_visitante} = data;

    // foreign keys
    let fk_id_usuario = req.session.user_info.id_usuario;
    let fk_id_visitante = null;
    let fk_id_empresa = null;
    let fk_id_veiculo_visitante = null;

    empresa.cnpj = remove_mark_signs(empresa.cnpj);
    visitante.rg = remove_mark_signs(visitante.rg);
    visitante.cpf = remove_mark_signs(visitante.cpf);

    if (veiculo_visitante) // vehicle is optional
        veiculo_visitante.placa = remove_mark_signs(veiculo_visitante.placa);


    knex.transaction( trx =>  {
        let thread = null;
        if (veiculo_visitante != null)
            thread = data_exists("veiculo_visitante", "placa", veiculo_visitante);
        else
            thread = Promise.resolve(null);

        thread.then( vehicle_exists => {
            if (vehicle_exists === true)
                return get_id("veiculo_visitante", "placa", veiculo_visitante);
            else if (vehicle_exists === false)
                return insert_data("veiculo_visitante", veiculo_visitante, trx);
            else
                return Promise.resolve(null);

        })
        .then(_fk_id_veiculo_visitante => {
            fk_id_veiculo_visitante = _fk_id_veiculo_visitante;

            return data_exists("empresa", "cnpj", empresa);
        })
        .then(company_exists => {
            if (company_exists)
                return get_id("empresa", "cnpj", empresa);
            else
                return insert_data("empresa", empresa, trx);
        })
        .then(_fk_id_empresa=>{
            fk_id_empresa = _fk_id_empresa;

            visitante = {...visitante, fk_id_empresa};

            return data_exists("visitante", "rg", visitante);
        })
        .then(visitant_exists => {
            if (visitant_exists)
                return get_id("visitante", "rg", visitante);
            else
                return insert_data("visitante", visitante, trx);
        })
        .then(_fk_id_visitante => {
            fk_id_visitante = _fk_id_visitante;

            visita_visitante = {
                ...visita_visitante,
                fk_id_usuario,
                fk_id_visitante,
                fk_id_veiculo_visitante
            };
            // add visit
            return insert_data("visita_visitante", visita_visitante, trx);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then( () => {
        res.status(200).send("Success to register this visit");
    })
    .catch( err => {
        log_error("/visita_visitante", "Trying add visit", err, req, "Verify the body of request.");
        send_error(res, "Não foi possível cadastrar esta visita. Verifique os dados, por favor.");
    });
})
.patch(async (req, res, next) => {
    const data_to_update = req.body;

    let visita_visitante = "visita_visitante" in data_to_update ? data_to_update["visita_visitante"] : null;
    let visitante = "visitante" in data_to_update ? data_to_update["visitante"] : null;
    let veiculo_visitante = "veiculo_visitante" in data_to_update ? data_to_update["veiculo_visitante"] : null;
    let empresa = "empresa" in data_to_update ? data_to_update["empresa"] : null;

    try {
        if (visita_visitante) {
            let { id_visita_visitante, ...changed_data} = visita_visitante;
            const updated_rows = await update_data("visita_visitante", id_visita_visitante, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in visit_employee.");
        }

        if (visitante) {
            let { id_visitante, ...changed_data} = visitante;
            const updated_rows = await update_data("visitante", id_visitante, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in student.");
        }

        if (veiculo_visitante) {
            let { id_veiculo_visitante, ...changed_data} = veiculo_visitante;
            const updated_rows = await update_data("veiculo_visitante", id_veiculo_visitante, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in student.");
        }

        if (empresa) {
            let { id_empresa, ...changed_data} = empresa;
            const updated_rows = await update_data("empresa", id_empresa, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in student.");
        }

        res.sendStatus(200);

    } catch (err) {
        send_error(res, "Não foi possível alterar os dados. Verifique se você preencheu os campos corretamente.");
        log_error("/visita_visitante", "Trying to update visit", err, req);
    }

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
        send_error(res, "Placa não específicada.");
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
            send_error(res, "Não possível verificar a existências desses dados.");
        }
    })
    .catch( err => {
        log_error("/visita_visitante/search method=POST", "Searching by already added PLACA", err);
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