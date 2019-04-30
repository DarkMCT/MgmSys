
const express = require("express");

const { query_employee, query_student, query_visitant } = require("./utility");

const report_route = express.Router();

const get_report = () => {

}

report_route.route("/report/:tipo_requisicao/:id")
.get((req, res, next)=> {
    const tipo_requisicao = req.params.tipo_requisicao;
    const id = req.params.id;
    query_employee(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.sendStatus(400);
    })

});

module.exports = { report_route };