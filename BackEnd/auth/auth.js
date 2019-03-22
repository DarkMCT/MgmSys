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



// ToDo List:
//   # Data validation >> ../database/data_validation because should be shared between 
//     back-end and front-end
// 
// 
// 
// 




//---------------- imports ----------------//

// ---- core imports
const crypto = require('crypto');

// ---- third party imports
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

// ---- user imports
const User = require('../system/user');
const DB = require('./credentials');







// ------- constants definitions ------- //

const memoryStore = session.MemoryStore;
const BadAuthenticationCode = 401;
const BadOperationOnServerCode = 500;
const SuccessAuthenticationCode = 200;
const SuccessOperationCode = 200;



const route = express.Router();

// // enable CORS
// route.use(cors({
//     methods: ['GET', 'POST'],
//     credentials: true,
//     origin: true,
// }));




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


const is_authenticated = (req)=>{
    return (req.session && req.session.user_id && req.session.user_id !== null);
}


const user_credentials_authentication = (user) => {
    return user;
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
            res.sendStatus( SuccessAuthenticationCode );       
        }
    }    
    
    if ( !res.headersSent )
        res.sendStatus( BadAuthenticationCode );

    next();    
})
.post((req, res, next) => {
    if ( req.body.operation !== 'register' ) {
        next();
        return;
    }

    const user_credentials_authenticated = user_credentials_authentication( req.body );

    if ( user_credentials_authenticated ) {
        const user_id = DB.addUser( user_credentials_authenticated );
        if ( user_id ) {        
            res.sendStatus( SuccessAuthenticationCode );
        }
    }

    if ( !res.headersSent )
        res.sendStatus( BadAuthenticationCode );

    next();
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
  
    if ( req.session.user_id ){
        req.session.user_id = null;
    } 

    res.sendStatus( SuccessAuthenticationCode );

    next();
});



module.exports = { auth_route: route, is_authenticated };