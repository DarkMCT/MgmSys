// Imports

// ---- Core imports
const crypto = require('crypto');

// ---- Third party imports
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

// ---- User imports
const User = require('../system/user');
const DB = require('./credentials');
// ------- Instantiations -------

const memoryStore = session.MemoryStore;

const route = express.Router();

// enable CORS
route.use(cors({
    methods: ['GET', 'POST'],
    credentials: true,
    origin: true,
}));

// setup sessions (responsable for user authentication after login)
route.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 8,
        secure: false,
    },
    name: 'session-id',
    saveUninitialized: false,
    resave: false,
    secret: 'MGMSYSmgmsysMGMSYS',
    store: new memoryStore(),
}));

// body-parser
route.use(bodyParser.json({
    type: 'application/json'
}));

// There is no need to use or manipulate the real password
// so transform the password in a hash using sha512
route.use((req, res, next) => {
    const password = req.body.password;

    if ( password ){
        const hmac = crypto.createHmac('sha512', 'MGMmgmMGMmgmMGMmgm');
        hmac.update(password);
        req.body.password = hmac.digest('hex');

        // console.log(req.body.password);
    }
    next('route');
});

// Processes login
//           registration
//           logout
//           authentication (test if the user is actually logged)
route.route('/auth')
.post((req, res, next) => {
    // verify if the operation is 'login'
    // else pass to the next middleware
    if ( req.body.operation !== 'login' ) {
        next();
        return;
    }
    
    const { siape, password } = req.body;

    if ( siape || password ) {
        // credential authentication
        const user_id = DB.authUser(siape, password);
        if ( user_id ){
            req.session.user_id = user_id;
            res.sendStatus(200);       
        }
    }    
    
    if ( !res.headersSent )
        res.sendStatus(401);
        
    next();    
})
.post((req, res, next) => {
    // verifing the operation
    if ( req.body.operation !== 'register' ) {
        next();
        return;
    }

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