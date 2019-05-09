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
const { db_instance, MAX_TIMEOUT } = require("../database/connection");
const validation = require("../../Database/data_validation");

const { send_email } = require("../notification/notify");


// ------- constants definitions ------- //
const saltRounds = 8; // This protect against brutalforce
// const MAX_TIMEOUT = 100; //ms



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

const change_password = (id_user, old_password, new_password) => {
    const knex = db_instance();
    return new Promise((resolve, reject) => {
        knex
        .select("senha")
        .from("usuario")
        .where(knex.raw("id_usuario = ?", [id_user]))
        .then(_password => {
            const password = _password[0].senha;

            return bcrypt.compare(old_password, password)
        })
        .then(res => {

            if (res)
                return bcrypt.hash(new_password, saltRounds);
            else
                return Promise.resolve(false);
        })
        .then(hash => {

            if (hash === false)
                return Promise.resolve(false);
            else
                return knex("usuario")
                    .update({senha: hash}, ['id_usuario'])
                    .where(knex.raw("id_usuario = ?", [id_user]))
                    .timeout(MAX_TIMEOUT);
        })
        .then(affected_rows=>{
            if (affected_rows && affected_rows.length === 1)
                resolve(true);
            else
                resolve(false);
        })
        .catch(err => {
            reject(err);
        });
    });
}

const receive_notification = (user_id, value) => {
    const knex = db_instance();

    if (value == null)
        return new Promise((resolve, reject) => {
            knex
            .select("receber_notificacao")
            .from("usuario")
            .where(knex.raw("id_usuario = ?", [user_id]))
            .timeout(MAX_TIMEOUT)
            .then(result => {
                if (result.length === 1)
                    resolve(result[0].receber_notificacao);
                else
                    resolve(null);
            })
            .catch(reject);
        });
    else
        return new Promise((resolve, reject) => {
            knex("usuario")
            .update({receber_notificacao: value}, ["id_usuario"])
            .where(knex.raw("id_usuario = ?", [user_id]))
            .timeout(MAX_TIMEOUT)
            .then(res => {
                if (res.length === 1)
                    resolve(res[0]);
                else
                    resolve(null);
            })
            .catch(reject);
        });
}


const make_hash = (password) => {
    return bcrypt.hash(password, saltRounds);
}

module.exports = { addUser, authUser, change_password, make_hash, receive_notification };

