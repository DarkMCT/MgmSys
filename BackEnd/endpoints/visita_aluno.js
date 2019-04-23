

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
    .post(async (req, res, next) => {
        // extract data from body
        const data = req.body;

        // split between student and visit student
        let { aluno, visita_aluno } = data;

        // Add student
        let fk_id_aluno = null;
        try {
            if (await data_exists("aluno", "matricula", aluno)){
                fk_id_aluno = await get_id("aluno", "matricula", aluno);
            } else {
                fk_id_aluno = await insert_data("aluno", aluno);
            }
        } catch(err) {
            log_error("/visita_aluno", "Trying add student", err, req, "Verify the body of request.");
            send_error(res, "Não foi possível cadastrar este aluno. Verifique os dados, por favor.");
        };

        const fk_id_usuario = req.session.user_info.id_usuario; // req.session.user_id

        // Add visit
        visita_aluno = {...visita_aluno, fk_id_usuario, fk_id_aluno};

        insert_data("visita_aluno", visita_aluno)
        .then( id => {
            res.status(200).send("Success to register this visit");
        })
        .catch(err=>{
            log_error("/visita_aluno", "Trying add visit", err, req, "Verify the body of request.");
            send_error(res, "Não foi possível cadastrar esta visita. Verifique os dados, por favor.");
        });
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
                    "Verify if the data is inside some data struct, some unexpected caracter or the data type of "+
                    "the database is diferent of the expected.");
            })

    });

module.exports = { visita_aluno_route: visita_aluno_route };