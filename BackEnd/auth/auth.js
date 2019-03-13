const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg');

const MemoryStore = session.MemoryStore;


const User = require('../system/user');
const DB = require('./test_database');

/**
 * Find if there is an user with this credentials
 * @param {string} username - user name
 * @param {string} password - password
 * @returns {boolean} Success of operation
 */
const login = (siape, password) => {
    for (let user of DB.users){
        if (user.siape === siape && user.password === password){
            return user.user_id;
        }
    }

    return null;
}

const route = express.Router();


route.use(cors({
    methods: ['GET', 'POST'],
    credentials: true,
    origin: true,
}));



route.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 8,
        secure: false,
    },
    name: 'session-id',
    saveUninitialized: false,
    resave: false,
    secret: 'MGMSYSmgmsysMGMSYS',
    store: new MemoryStore(),
}));

route.use(bodyParser.json({
    type: 'application/json'
}));

/**
 * Authenticate the user and initializes a session
 */
route.route('/auth')
.post((req, res, next) => {
    // verifing the operation
    if ( req.body.operation !== 'login' ) {
        next();
        return;
    }

    console.log(req.body);
    if (req.session.user_id){
        console.log(req.session.user_id + ' logged.');
    } else {
        // validation
        const { siape, password } = req.body;
        if ( !siape || !password ) res.sendStatus(401);
        else {
            // credential authentication
            const user_id = login(siape, password);
            if ( user_id ){
                req.session.user_id = user_id;
                res.sendStatus(200);
            }
            else {
                res.sendStatus(401);
            }
        }
    }
    
    next();    
})
.post((req, res, next) => {
    // verifing the operation
    if ( req.body.operation !== 'register' ) {
        next();
        return;
    }

    console.log('registring');
    // validation
    const { name, siape, password, email, type } = req.body;
    if ( !name || !siape || !password || !email || !type ) {
        res.sendStatus(401);
        return;
    }

    // registration
    const user_id = DB.addUser( req.body );
    if ( user_id ) {
        console.log(`User added ${ user_id }`);
        res.sendStatus(200);
    } else {
        console.log('Invalid credentials');
        res.sendStatus(401);
    }

    next();
})
.post((req, res, next) => {
    if ( req.body.operation !== 'authentication' ) {
        next();
        return;
    }

    console.log(req.session);
    if (req.session.user_id) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }

    next();
})
.post((req, res, next) => {
    if ( req.body.operation !== 'logout' ) {
        next();
        return;
    }

    if ( req.session.user_id ){
        req.session.user_id = null;
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }

    next();
});

module.exports = route;