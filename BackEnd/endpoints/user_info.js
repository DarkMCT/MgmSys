
const express = require("express");
const { receive_notification } = require("../auth/credentials");

const user_info_route = express.Router();


user_info_route.route("/user_info")
.get((req, res, next)=>{
    const {id_usuario, ...user_info} = req.session.user_info;
    res.status(200).json(user_info);
});

user_info_route.route("/user_info/notification")
.get((req, res, next) => {
    const id_usuario = req.session.user_info.id_usuario;

    receive_notification(id_usuario)
    .then(result => {
        if (result != null)
            res.json({receber_notificacao: result});
        else
            res.sendStatus(400);
    })
    .catch(err => {
        res.sendStatus(400);
    });
})
.post((req, res, next)=>{
    const {receber_notificacao} = req.body;
    const id_usuario = req.session.user_info.id_usuario;

    receive_notification(id_usuario, receber_notificacao)
    .then(result => {
        if (result)
            res.sendStatus(200);
        else
            res.sendStatus(400);
    })
    .catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});


module.exports = { user_info_route };