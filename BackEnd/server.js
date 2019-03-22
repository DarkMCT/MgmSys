const express = require('express');
const cors = require('cors');

const app = express();


const { auth_route, is_authenticated } = require('./auth/auth');
const { departamento_route } = require('./endpoints/departamento');


app.use(cors({
    methods: ['GET', 'POST'],
    credentials: true,
    origin: true,
}));

/* app.use(auth_route);

// validate if the user is logged
app.use((req, res, next) => {
    if ( is_authenticated(req) )
        next('route');
    else if ( !res.headersSent )
        res.sendStatus(403);
});
 */
app.use(departamento_route);


app.listen(3001, ()=>{
    console.log('Server listening at port 3001');
});