const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();
const memoryStore = session.MemoryStore;


const { auth_route, is_authenticated } = require("./auth/auth");
const { departamento_route } = require("./endpoints/departamento");
const { user_info_route } = require("./endpoints/user_info");
const { visita_visitante_route } = require("./endpoints/visita_visitante");
const { visita_aluno_route } = require("./endpoints/visita_aluno");


app.use(cors({
    methods: ["GET", "POST"],
    credentials: true,
    origin: true,
}));


// setup sessions (responsable for user authentication after login)
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 8,
        secure: false,
    },
    name: "session-id",
    saveUninitialized: false,
    resave: false,
    secret: "MGMSYSmgmsysMGMSYS",
    store: new memoryStore(),
}));


app.use(departamento_route);

/* app.use(auth_route);

// validate if the user is logged
app.use((req, res, next) => {
    if ( is_authenticated(req) )
    next("route");
    else if ( !res.headersSent )
    res.sendStatus(403);
}); */

app.use(user_info_route);

app.use(visita_visitante_route);

app.use(visita_aluno_route);


app.listen(3001, ()=>{
    console.log("Server listening at port 3001");
});