const express = require("express");
const { gen_token, rec_data } = require("./token_system");
const { db_instance, MAX_TIMEOUT } = require("../database/connection");

const process_requisition_route = express.Router();

const make_request = (id_usuario, id_visita, tipo_visita, acao) => {
    return gen_token({
        id_usuario: id_usuario,
        id_visita: id_visita,
        tipo_visita: tipo_visita,
        acao: acao
    });
};

process_requisition_route.route("/authentication/request/:token")
.get((req, res, next) => {
    const token = req.params.token;

    rec_data(token)
    .then(data => {
        const {id_visita, id_usuario, tipo_visita, acao} = data;
        const knex = db_instance();
        const table = "visita_" + tipo_visita;

        knex(table)
        .update({
            status_de_aprovacao: acao
        })
        .where(knex.raw(`id_${table} = ?`, [id_visita]))
        .timeout(MAX_TIMEOUT)
        .then(result => {
            res.send("Requisição processada!");
        })
        .catch(err => {
            res.sendStatus(400);
        })
    })
    .catch(console.log);
});

module.exports = { make_request, process_requisition_route };