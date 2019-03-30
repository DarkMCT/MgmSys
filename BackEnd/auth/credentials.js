//
//  This file is responsible to connect the authentication with the database
//  and in this way, create a isolation between them.
//
//  This handle the cryptography too.
//
//  Written by Matheus Cândido Teixeira
//  Date: 22.03.2019
//


//---------------- imports ----------------//

// ---- core imports
const fs = require('fs');
const crypto = require('crypto');

// ---- third party imports
const bcrypt = require('bcrypt');

// ---- user imports
const db_instance = require("../database/connection");
const validation = require("../../Database/data_validation");


// ------- constants definitions ------- //
const saltRounds = 8; // This protect against brutalforce
const MAX_TIMEOUT = 100; //ms



/**
 * Find if there is an user with this credentials
 * @param {string} username - user name
 * @param {string} password - password
 * @returns {boolean} Success of operation
 */
const authUser = (siape, password, callback) => {
    const knex = db_instance();

    knex.select()
    .from("usuario")
    .where( knex.raw("siape = ?", [siape]) )
    .timeout( MAX_TIMEOUT )
    .then( row => {

        if (row.length === 1){
            bcrypt.compare(password, row[0].senha.trim())
            .then( res => {
                const {senha, ...user_info} = row[0];
                if (res === true)
                    callback(null, user_info)
                else
                    callback(Error("No user found"));
            })
            .catch( err =>{
                callback(Error("No user found"));
            });
        } else {
            callback(Error("No user found"));
        }
    })
    .catch( err => {
        callback(err);
    });
}

// callback -> A callback function that take two parameters:
//              err -> will be passed when has an error
//              val -> will be passed when a success occur, in this case err is null
const addUser = (user, callback) => {
    const knex = db_instance();

    bcrypt.hash(user.senha, saltRounds)
    .then(hash => {
        return knex("usuario")
        .insert({...user, senha: hash})
        .returning("id_usuario")
        .timeout(MAX_TIMEOUT);
    })
    .then( user_id => {
        callback(null, user_id);
    })
    .catch(err => {
        callback(err);
    });
};

module.exports = { addUser, authUser };

