const express = require("express");
const bodyParser = require("body-parser");
const db_instance = require("../database/connection");



const valid_insertion_data = function( data ){
    
    
    return true;
};
const valid_update_data = function( data ){
    
    
    return true;
};


const MAX_TIMEOUT = 100; //ms

const departamento_route = express.Router();
departamento_route.use( bodyParser.json() );
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
        })
})
.post((req, res, next) => {
    const knex = db_instance();
    const departament = req.body;
    
    if ( !valid_insertation_data( departament )) {
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
    } );
})
.delete((req, res, next) => {
    const knex = db_instance();
    const departament = req.body;

    if ( !valid_deletation_data( departament )) {
        res.status(400).send("Invalid data");
        return;
    }

    knex("departamento")
        .where(knex.raw("id_departamento = ?", [departament.id_departamento]))
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

departamento_route.route("departamento/:id_departament")
.get((req, res, next) => {
    const knex = db_instance();
    const id_departament = req.params.id_departament;

    knex.select()
    .from("departamento")
    .where( knex.raw("id_departament = ?", [id_departament]))
    .then( result => {
        res.status( 200 ).json( result );
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
});

module.exports = { departamento_route };