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

    return false;
}

const route = express.Router();


route.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
.post((req, res, next) =>{
    if (req.session.user_id){

        res.send('Welcome back');
    } else {
        req.session.user_id = 'ok';
        res.send('Welcome');
    }
    
    
});

module.exports = route;