const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const credentials = require("./credentials");

const google_playground = "https://developers.google.com/oauthplayground";

let oauth2Client = null;

const init_oauth2 = () => {
    if (oauth2Client)
        return;

    oauth2Client = new OAuth2(
        credentials.clientID,
        credentials.client_secret,
        google_playground
    );

    oauth2Client.setCredentials({
        refresh_token: credentials.refresh_token,
    });
};

const refresh_token = () => {
    init_oauth2();

    return oauth2Client.refreshAccessToken();
}

const get_transporter = () => {
    return new Promise((resolve, reject) => {
        refresh_token()
        .then(tokens => {
            const access_token = tokens.credentials.access_token;

            resolve(nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: credentials.user,
                    clientId: credentials.clientID,
                    clientSecret: credentials.client_secret,
                    refreshToken: credentials.refresh_token,
                    accessToken: access_token,
                }
            }));
        })
        .catch(err => {
            reject("Error to send email");
        })
    });
}

const mail_options = {
    from: credentials.user,
    subject: "MgMSyS - Notification",
    generateTextFromHTML: true,
};

const send_email = ({to, body}) => {
    let options = {...mail_options, to: to, html: body};
    return new Promise((resolve, reject) => {
        get_transporter()
        .then(transporter => {

            transporter.sendMail(options, (error, response) => {
                if (error){
                    reject(error);
                }
                else{
                    resolve(transporter);
                }
            })
        })
        .catch(err=>{
            reject(err);
        });
    });
};

module.exports = { send_email };