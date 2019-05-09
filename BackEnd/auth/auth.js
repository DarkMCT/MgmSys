//
// Propouse:
//      This file is responsible for all authentication mechanism of the system
//      from users registor to user login.
//
//      After some user made login is genereted a session and sent to user to keep
//      him or her logged.
//
//      On success is sent the http status code 200 (OK) and On error is sent the http
//      status code 401 (Unauthorized)
//
//  Written by Matheus Cândido Teixeira
//  Date: 22.03.2019

//---------------- imports ----------------//

// ---- core imports
const crypto = require('crypto');

// ---- third party imports
const express = require('express');

// ---- user imports
const {addUser, authUser, change_password, receive_notification } = require('./credentials');

// ------- constants definitions ------- //


const BadAuthenticationCode = 401;
const SuccessAuthenticationCode = 200;

const route = express.Router();

const is_authenticated = (req)=>{
    // console.log(req.session);
    const user_info = req.session.user_info;
    return (user_info && user_info.id_usuario && user_info.id_usuario !== null);
}

const user_credentials_authentication = (user) => {
    return user.senha.length > 6;
    // return validation.valid_usuario(user);
}

// Processes login
//           registration
//           logout
//           authentication (test if the user is actually logged)
//
// The operation that you want to do should be specified through
// in the member "operation" of your request.
//
// All authentication request should be sent in a HTTP Post method
//
route.route('/auth')
.post((req, res, next) => {
    // console.log(req.body);
    // verify if the operation is 'login'
    // else pass to the next middleware
    if ( req.body.operation !== 'login' ) {
        next();
        return;
    }

    // the operation entry should be removed because this entry doesn't
    // exist in table "usuario" and this cause a error
    delete req.body.operation;

    const { siape, senha } = req.body;

    authUser(siape, senha, (err, user_info) => {
        // console.log(err);
        if ( err == null ){
            req.session.user_info = user_info;
            const { id_usuario, ...user_info_without_user_id } = user_info;
            res.status( SuccessAuthenticationCode ).json( user_info_without_user_id );
        } else {
            res.sendStatus( BadAuthenticationCode );
        }
    });

})
.post((req, res, next) => {
    if ( req.body.operation !== 'register' ) {
        next();
        return;
    }

    // the operation entry should be removed because this entry doesn't
    // exist in table "usuario" and this cause a error
    delete req.body.operation;

    const user_credentials = req.body;

    const user_credentials_authenticated = user_credentials_authentication( user_credentials );

    if ( user_credentials_authenticated ) {
        addUser( user_credentials, (err, user_id) => {
            if ( err )
                res.sendStatus( BadAuthenticationCode );
            else
                res.sendStatus( SuccessAuthenticationCode );
        });
    }
})
.post((req, res, next) => {
    if ( req.body.operation !== 'authentication' ) {
        next();
        return;
    }

    if (is_authenticated( req ))
        res.sendStatus( SuccessAuthenticationCode );
    else
        res.sendStatus( BadAuthenticationCode );

    next();
})
.post((req, res, next) => {
    if ( req.body.operation !== 'logout' ) {
        next();
        return;
    }

    // try to destroy
    // if not possible, just set to null
    // console.log(req.session);
    if ( req.session.user_info ){
        req.session.user_info = null;
    }

    res.sendStatus( SuccessAuthenticationCode );

    next();
});

route.route("/auth/change_password")
.post((req, res, next)=>{
    const {new_password, old_password} = req.body;
    const id_usuario = req.session.user_info.id_usuario;


    change_password(id_usuario, old_password, new_password)
    .then(success => {
        if (success)
            res.sendStatus(200);
        else
            res.sendStatus(400);
    })
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    });
});



module.exports = { auth_route: route, is_authenticated };