
const __knex = require("knex");

let __connection_instance = null;

const MAX_TIMEOUT = 1000; //1000 ms

const get_instance = ()=>{
    if ( __connection_instance == null ){
        __connection_instance = __knex({
            client: "pg",
            version: "11",
            connection: {
                host: "127.0.0.1",
                user: "manager",
                password: "password",
                database: "mgmsys"
            }
        });
    }

    return __connection_instance;
};

module.exports = { db_instance: get_instance, MAX_TIMEOUT };

/* const knex = get_instance();


knex.select().from("departamento").where({ativado: 1}).timeout(1000)
    .then( result => {
        console.log( result );
    })
    .catch( err => {
        console.log("err: " + string(err));
    })
    .finally( ()=>{
        knex.destroy();
    } ); */