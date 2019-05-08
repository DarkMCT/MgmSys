const get_template_request = (token_approve, token_reject, visitante, requerente, tipo) => {
    return `
    <html>
    <head>
        <style type="text/css">
        body {
            font-family: "Arial";
        }

        .button {
            padding: 10px;
            color: rgb(255, 255, 255);
            text-decoration: none;
            border-radius: 20%;
        }

        .message {
            font-size: 14px;
            margin-left: 30%;
            margin-right: 30%;
            padding-top: 50px;
            padding-bottom: 50px;
        }

        .title {
            color: rgba(30, 30, 200, 0.9);
        }

        div {
            text-align: center;
            padding-bottom: 50px;
        }

        .reject {
                background-color: rgba(200, 30, 30, 0.8);
        }

        .approve {
                background-color: rgba(30, 30, 200, 0.8);
        }
        </style>
    </head>
    <body>
        <div>
            <h1 class="title"> Solicitação de visita </h1>

            <p class="message"> Um solicitação para a visita de um <b>${tipo}</b>
                foi requerida por ${requerente} para ${visitante}.
                Acesse <a href="http://www.mgmsys.cba.ifmt.edu.br">MgMSyS</a> para analisa-lá.
            </p>

            <a class="button reject" href="${token_reject}">Rejeitar</a>
            <a class="button approve" href="${token_approve}">Aprovar</a>
        </div>
    </body>
    </html>
    `;
}

module.exports = { get_template_request };