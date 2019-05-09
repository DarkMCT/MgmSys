const express = require("express");
const { make_hash } = require("../auth/credentials");
const { gen_token, rec_data } = require("./token_system");
const { db_instance, MAX_TIMEOUT } = require("../database/connection");
const { send_email } = require("../notification/notify");
const { get_template_reset_password } = require("./template_html");

const reset_password_route = express.Router();

const make_token= (email, siape, new_password) => {
    return new Promise((resolve, reject) => {
        make_hash(new_password)
        .then(hash => {
            resolve(gen_token({
                email: email,
                siape: siape,
                nova_senha: hash,
            }));
        })
        .catch(reject);
    });
};

const get_random_in_range = (a, b) => {
    return a + (b-a)*Math.random();
}
const random_string = (sz)=>{
    output = "";

    while (sz--) {
        let letter = parseInt(get_random_in_range(65, 90));
        letter = String.fromCharCode(letter)
        letter = Math.random() > 0.5 ? letter.toLowerCase(): letter;
        output = output.concat(letter)
    }

    return output;
}

reset_password_route.route("/authentication/reset_password")
.post((req, res, next)=>{

    const {email, siape } = req.body;
    console.log(email);
    const new_password = random_string(8);
    const server = "http://localhost:3001/authentication/reset_password/";

    make_token(email, siape, new_password)
    .then( token => {
        return send_email({
            to: email,
            body: get_template_reset_password(new_password, token, server)})
    })
    .then( transporter => {
        transporter.close();
        res.sendStatus(200);
    })
    .catch(err => {
        console.log("error at/authentication/reset_password: ", err);
        res.sendStatus(400);
    });
});

reset_password_route.route("/authentication/reset_password/:token")
.get((req, res, next) => {
    const token = req.params.token;

    rec_data(token)
    .then(data => {
        const {email, siape, nova_senha} = data;
        const knex = db_instance();

        knex("usuario")
        .update({senha: nova_senha}, ["id_usuario"])
        .where(knex.raw("email = ?", [email]))
        .where(knex.raw("siape = ?", [siape]))
        .timeout(MAX_TIMEOUT)
        .then(result => {
            if (result.length === 1)
                res.send("Senha alterada!");
            else
                res.send("Erro ao alterar a senha");
        })
        .catch(err => {
            res.sendStatus(400);
            console.log("error at/authentication/reset_password/:token (query): ", err);
        })
    })
    .catch(err => {
        console.log("error at/authentication/reset_password/:token (token): ", err);
    });
});


module.exports = { reset_password_route };