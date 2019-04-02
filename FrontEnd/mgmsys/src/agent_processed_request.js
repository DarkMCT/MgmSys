import React, { Component } from "react";

export class AgentProcessedRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    format_data = () => {
        const data = [
            { nome: "Matheus", tipo_requisicao: "SERVIDOR",  data: "22/11/2019" },
            { nome: "Matheus", tipo_requisicao: "VISITANTE", data: "22/11/2019" },
            { nome: "Matheus", tipo_requisicao: "SERVIDOR",  data: "22/11/2019" },
            { nome: "Matheus", tipo_requisicao: "VISITANTE", data: "22/11/2019" },
            { nome: "Matheus", tipo_requisicao: "ALUNO",     data: "22/11/2019" },
            { nome: "Matheus", tipo_requisicao: "SERVIDOR",  data: "22/11/2019" },
            { nome: "Matheus", tipo_requisicao: "ALUNO",     data: "22/11/2019" },
            { nome: "Matheus", tipo_requisicao: "ALUNO",     data: "22/11/2019" },
        ];

        const rows = data.map(element => {
            return Object.values(element).map(value => {
                return <td>{value}</td>;
            });
        });

        const table = rows.map((row, n) => (
            <tr className={Math.random() > 0.5 ? "table-success" : "table-danger"}>
                <th scope="row">{n + 1}</th>
                {row}
                <td className="row">
                    <button className="btn btn-outline-primary">Gerar PDF</button><span className="pr-1"></span>
                    <button className="btn btn-primary">Detalhes</button>
                </td>
            </tr>
        ))

        return table;
    }

    render = () => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Tipo de Requisição</th>
                                <th scope="col">Data</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.format_data()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};