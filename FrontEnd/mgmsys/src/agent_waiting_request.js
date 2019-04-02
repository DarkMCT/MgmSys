import React, { Component } from "react";

export class AgentWaitingRequest extends Component {
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
            <tr key={n}>
                <th scope="row">{n + 1}</th>
                {row}
                <td className="row" key={n}>
                    <button className="btn btn-warning">Editar</button><span className="pr-1"></span>
                    <button className="btn btn-danger">Remover</button><span className="pr-1"></span>
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
                                <th scope="col">Tipo de Requisão</th>
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