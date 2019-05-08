

// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const { db_instance, MAX_TIMEOUT } = require("../database/connection");
const {
    insert_data,
    update_data,
    get_id,
    data_exists,
    send_error,
    log_error,
    notify_managers
} = require("./utility");


// Constants definitions
// const MAX_TIMEOUT = 100;//ms
const visita_aluno_route = express.Router();

// Route name: /visita_aluno
//
// Responabilities: list all students and add new students
//      when listing: a GET METHOD is expected
//      when adding: a POST METHOD is expected. The body must have a "aluno", "visita_aluno" objects.
//
//  Behavior: On adding, if all data is correctly, is returned a response with status code 200 indicantion success.
//            Otherwise, is returned a response with status code 400 indicating fail. The reason can be duplication
//            of UNIQUE fields on Database, data with wrong type of the specified on database or the field is diferent
//            from the database definition.
//
//  Obs:     THIS ROUTE is SMART enough to prevent duplication of UNIQUE fields he just search if such fields exist
//            and if the exist just import the PRIMARY KEY
visita_aluno_route.route("/visita_aluno")
.get((req, res, next) => {
    const knex = db_instance();

    knex.select().from("visita_aluno").timeout(MAX_TIMEOUT)
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            log_error("/visita_aluno method=GET", "Searching for visita_aluno.", err, req,
                "Verify the connection with datebase")
            send_error(res, "Não foi possível listar todas as visitas de alunos.");
        });
})
.post((req, res, next) => {
    // extract data from body
    const data = req.body;
    const fk_id_usuario = req.session.user_info.id_usuario;
    const nome_usuario = req.session.user_info.nome;
    const knex = db_instance();

    let { aluno, visita_aluno } = data;
    let fk_id_visita_aluno = null;

    knex.transaction(trx => {
        data_exists("aluno", "matricula", aluno)
        .then(data_exist => {
            transaction_already_used = !data_exist;

            if (data_exist)
                return get_id("aluno", "matricula", aluno);
            else
                return insert_data("aluno", aluno, trx);
        })
        .then(fk_id_aluno => {
            visita_aluno = {...visita_aluno, fk_id_usuario, fk_id_aluno};
            return insert_data(
                "visita_aluno",
                visita_aluno,
                trx
            );
        })
        .then(id_visita_aluno => {
            fk_id_visita_aluno = id_visita_aluno;
            trx.commit();
        })
        .catch(trx.rollback);
    })
    .then(result=> {
        res.status(200).send("Success to register this visit");
        notify_managers(fk_id_usuario, nome_usuario, fk_id_visita_aluno,  aluno.nome, "aluno");
    })
    .catch(err=>{
        log_error("/visita_aluno", "Trying add visit", err, req, "Verify the body of request.");
        send_error(res, "Não foi possível cadastrar esta visita. Verifique os dados, por favor.");
    })

})
.patch(async (req, res, next)=>{
    // extract data from bosy
    const data_to_update = req.body;

    // verify if the key is present and if is, extract her
    let visita_aluno = "visita_aluno" in data_to_update ? data_to_update["visita_aluno"] : null;
    let aluno = "aluno" in data_to_update ? data_to_update["aluno"] : null;

    // Add student
    try {
        if (visita_aluno) {
            let { id_visita_aluno, ...changed_data} = visita_aluno;
            const updated_rows = await update_data("visita_aluno", id_visita_aluno, changed_data);

            // Just one row should be updated
            // if more than one was, something is wrong!
            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in visit_student.");
        }

        if (aluno) {
            let { id_aluno, ...changed_data} = aluno;
            const updated_rows = await update_data("aluno", id_aluno, changed_data);

            if (updated_rows !== 1)
                throw new Error("Zero or more than one rows was updated in student.");
        }

        res.sendStatus(200);
    } catch (err) {
        send_error(res, "Não foi possível alterar os dados. Verifique se você preencheu os campos corretamente.");
        log_error("/visita_aluno", "Trying to update visit", err, req);
    }

});

// Route name: /visita_visitante/:id
//
// Responabilities: Search for a specific user with "id_aluno" equal :id parameter
//
//  Behavior: If a student with this specify :id is found, the data of this student is sent in response
//
//  Obs:     If not is found, will return a empty array
visita_aluno_route.route("/visita_visitante/:id")
    .get((req, res, next) => {
        const id = req.params.id;
        const knex = db_instance();

        knex.select().from("visita_visitante").timeout(MAX_TIMEOUT)
            .where(knex.raw("visita_visitante.id_visita_visitante = ?", [id]))
            .then(result => {
                res.status(200).json(result);
            }).catch(err => {
                log_error("/visita_visitante/:id method=GET", "Searching for id_visita_visitante", err, req,
                    "Virify if all data is correct or if there is null values");

                send_error(res, "Não foi possível realizar está procura.")
            });
    });

// Route name: /visita_aluno/search
//
// Responabilities: Search if there is some student or visit with data passed by request.
//                  This endpoint is meant for front-end present a friendly way to import
//                  foreign key.
//
//  Behavior: If the field "what" is
//              "MATRICULA", search if the matricula field is present and search on student table
//                  if this value of matricula already exist and return it.
//
//  Obs:     If don't have match, a empty array is returned
visita_aluno_route.route("/visita_aluno/search")
    .post((req, res, next) => {
        if (req.body.what !== "MATRICULA") {
            next();
            return;
        }

        const { matricula } = req.body;
        if (matricula == null) {
            send_error(res, "A matricula não está presente.");
            return;
        }

        const knex = db_instance();

        let stmt = knex("aluno").select().where(knex.raw("matricula = ?", [matricula]));

        stmt.timeout(MAX_TIMEOUT)
            .then(result => {
                if (result.length === 1) {
                    const { id_aluno, ativado, ..._result } = result[0];
                    res.status(200).json(_result);
                }
                else
                    res.status(200).json({});

            })
            .catch(err => {
                log_error("/visita_aluno/search method=POST", "Searching for already added matricula", err, req,
                    "Verify if the data is inside some data struct, some unexpected caracter or the data type of " +
                    "the database is diferent of the expected.");
            })

    });

module.exports = { visita_aluno_route: visita_aluno_route };