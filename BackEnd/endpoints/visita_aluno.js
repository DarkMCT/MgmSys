

// Core imports
//  ...

// Third part imports
const express = require("express");
const bodyParse = require("body-parser");

// User imports
const db_instance = require("../database/connection");

// Constants definitions
const MAX_TIMEOUT = 100;//ms
const visita_aluno_route = express.Router();

// ---- Utility functions ----

const log_error = (route, when, err, req, suggestion) => {
    console.error("-".repeat(10) + " ERROR OCURRED " + "-".repeat(10));
    console.error("Route: ", route);
    console.error("When: ", when);

    if (suggestion != undefined)
        console.error("Suggestion: ", suggestion);

    if (req != undefined)
        console.error("Request: ", req);

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
        .where(knex.raw(`${column_name} = ?`, [data]))
        .timeout(MAX_TIMEOUT)
        .then(res => {
            if (res.length === 1){
                resolve(+res[0].count === 1);
            } else {
                resolve(false);
            }
        })
        .catch( err =>{
            reject(false);
        });
    });
}

const insert_data_if_not_exist = (table_name, column_name, data)=>{
    const knex = db_instance();

    return data_exists(table_name, column_name, data[column_name])
        .then( exist => {
            if (!exist)
                return knex(table_name).insert(data)
                    .returning(`id_${table_name}`);
            else
                return knex(table_name).select(`id_${table_name}`)
                    .where(knex.raw(`${column_name} = ?`,[data[column_name]]));
        })
        .catch( err => {
           throw err;
        })
}

// ------------------------------------------------------------------------

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

        // split between student and visit student
        let { aluno, visita_aluno } = data;

        // get a connection of the database
        const knex = db_instance();

        // insert the student first, because we need of her id
        insert_data_if_not_exist("aluno", "matricula", aluno).then(id => {
            const fk_id_aluno = id[0].id_aluno;

            // the fk_id_usuario must be obtained from req (he is stored in a session)
            const fk_id_usuario = 5;// req.session.user_id

            visita_aluno = { ...visita_aluno, fk_id_usuario, fk_id_aluno };

            knex("visita_aluno").insert(visita_aluno).then(e => {
                res.status(200).send("Success to register this visit");
            }).catch(err => {
                log_error("/visita_aluno method=POST", "Adding visita_aluno", err, req,
                    "Verify if all data is correct or if there is null values");
                send_error(res, "Não foi possível adicionar está visita. Verifique se os dados estão corretos.");
            });
        }).catch(err => {
            log_error("/visita_aluno method=POST", "Adding aluno", err, req,
                "Verify if all data is correct or if there is null values");

            send_error(res, "Não foi possível adicionar este aluno. Verifique se os dados estão corretos.");
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
                const { id_aluno, ativado, ..._result } = result[0];

                res.status(200).json(_result);
            })
            .catch(err => {
                log_error("/visita_aluno/search method=POST", "Searching for already added matricula", err, req,
                    "Verify if the data is inside some data struct, some unexpected caracter or the data type of "+
                    "the database is diferent of the expected.");
            })

    });

module.exports = { visita_aluno_route: visita_aluno_route };