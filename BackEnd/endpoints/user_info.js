

const express = require("express");


const user_info_route = express.Router();


user_info_route.route("/user_info")
.get((req, res, next)=>{
    const {id_usuario, ...user_info} = req.session.user_info;
    res.status(200).json(user_info);
});

module.exports = { user_info_route };