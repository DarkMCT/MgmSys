const jwt = require("jsonwebtoken");

const secret = "JKASNOaksdoOIJFA09WLEKMWE9FJ$#@$R20JD";
const valid_time = "1d";

const gen_token = data => {
    return new Promise((resolve, reject) => {
        jwt.sign(data, secret, {expiresIn: valid_time}, (err, token) => {
            if (err)
                reject(err);
            else
                resolve(token);
        });
    });
};

const rec_data = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {maxAge: valid_time}, (err, data)=>{
            if (err)
                reject(err);
            else
                resolve(data);
        })
    });
};

module.exports = { gen_token, rec_data };


