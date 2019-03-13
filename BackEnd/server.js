const express = require('express');
const app = express();

const auth = require('./auth/auth');

app.use(auth);

// validate if the user is logged
app.use((req, res, next) => {
    if ( req.session.user_id )
        next();
    else
        res.end(401);
});

app.listen(3000, ()=>{
    console.log('Server listening at port 3000');
});