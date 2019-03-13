const express = require('express');
const app = express();

const auth = require('./auth/auth');

app.use(auth);

app.listen(3000, ()=>{
    console.log('Server listening at port 3000');
});