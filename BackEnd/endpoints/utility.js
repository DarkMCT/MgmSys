// Constants definitions
const MAX_TIMEOUT = 100;//ms

const db_instance = require("../database/connection");

const log_error = (route, when, err, req, suggestion) => {
    console.error("-".repeat(10) + " ERROR OCURRED " + "-".repeat(10));
    console.error("Route: ", route);
    console.error("When: ", when);

    if (suggestion != undefined)
        console.error("Suggestion: ", suggestion);

    if (req != undefined)
        console.error("Request: ", req.body);

    console.error("Error: ", err);

    console.error("-".repeat(35));
}

const send_error = (res, why)=>{
    if (!res.headersSent)
        res.status(400).send(why);
};

const remove_mark_signs = (str) => {
    return str.replace(/\.|\-|\//g, "");
}

const data_exists = (table_name, column_name, data)=>{
    const knex = db_instance();

    return new Promise((resolve, reject)=>{
        knex(table_name).count(`id_${table_name}`)
        .where(knex.raw(`${column_name} = ?`, [data[column_name]]))
        .timeout(MAX_TIMEOUT)
        .then(res => {
            if (res.length === 1){
                resolve(+res[0].count === 1);
            } else {
                resolve(false);
            }
        })
        .catch( err =>{
            console.log(err);
            reject(false);
        });
    });
}

const insert_data = (table_name, data)=>{
    const knex = db_instance();

    return new Promise((resolve, reject) => {
        knex(table_name).insert(data).returning(`id_${table_name}`)
        .timeout(MAX_TIMEOUT)
        .then(id => {
            if (id.length === 1)
                resolve(id[0]);
            else
                reject("Don't was possible to add this data.");
        })
        .catch(err=>{
            throw err;
        })
    })
}

const get_id =  (table_name, column_name, data)=>{
    const knex = db_instance();

    return new Promise((resolve, reject)=> {
        knex(table_name).select(`id_${table_name}`)
        .where(knex.raw(`${column_name} = ?`,[data[column_name]]))
        .timeout(MAX_TIMEOUT)
        .then(id => {
            if (id.length === 1)
                resolve(id[0][`id_${table_name}`]);
            else
                reject("Don't was possible to get this data.");
        })
        .catch(err=>{
            reject("Don't was possible to get this data.");
        });
    });
}

module.exports = { insert_data, get_id, data_exists, remove_mark_signs, send_error, log_error };