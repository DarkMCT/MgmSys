
// -- imports
// ---- core imports

// ---- third party imports
const express = require("express");
const bodyParser = require("body-parser");

// ---- user imports
const db_instance = require("../database/connection");
const validation = require("../../Database/data_validation");


// -- definitions
// ---- constants definitions
const MAX_TIMEOUT = 100; //ms
const departamento_route = express.Router();

// -- implementation
// ---- middleware's
departamento_route.use(bodyParser.json());

// ---- routes
// -- insert and generic query
departamento_route.route("/departamento")
.get((req, res, next)=>{
    const knex = db_instance();
    knex.select().from("departamento").where("ativado", 1)
        .then( result => {
            res.json( result );
        })
        .catch( err => {
            console.error(err);
            res.send( "Something wrong happend" );
        });
})
.post((req, res, next) => {
    const knex = db_instance();
    const departament = req.body;

    if ( !validation.valid_departamento( departament )) {
        res.status(400).send("Invalid data");
        return;
    }

    knex("departamento")
    .insert( departament )
    .timeout( MAX_TIMEOUT )
    .then(()=>{
        res.status(200).send("Departament added");
    }).catch( err => {
        console.error(err);
            res.status(400).send("Something wrong happend");
    });
});

// deletation, specific query and update
departamento_route.route("/departamento/:id_departament")
.get((req, res, next) => {
    const knex = db_instance();
    const id_departament = req.params.id_departament;

    knex.select()
    .from("departamento")
    .where( knex.raw("id_departamento = ?", [id_departament]))
    .then( result => {
        if ( result.length !== 1 )
            throw Error("Should not return more than 1 match.");
        else
            result = result[0];

        const { sigla, nome } = result;
        res.status( 200 ).json( { sigla: sigla, nome: nome });
        return;
    }).catch( err => {
        res.status( 400 ).send(" Something wrong happend...");
    });
})
.patch((req, res, next) => {
    const knex = db_instance();
    const departament = req.body;
    const id_departament = req.params.id_departament;

    if ( !valid_insertation_data( departament )) {
        res.status(400).send("Invalid data");
        return;
    }

    knex("departamento")
        .update( departament )
        .where(knex.raw("id_departamento = ?", [ id_departament ]))
        .timeout( MAX_TIMEOUT )
        .then(()=>{
            res.status(200).send("Departament updated");
        }).catch( err => {
            console.error(err);
            res.status(400).send("Something wrong happend");
        });
})
.delete((req, res, next) => {
    const knex = db_instance();
    const id_departament = req.params.id_departament;

    knex("departamento")
        .where(knex.raw("id_departamento = ?", [id_departament]))
        .update( { ativado: 0 } )
        .timeout( MAX_TIMEOUT )
        .then(()=>{
            res.status(200).send("Departament deleted");
        }).catch( err => {
            console.error(err);
            res.status(400).send("Something wrong happend...");
        });

    next();
});

module.exports = { departamento_route };