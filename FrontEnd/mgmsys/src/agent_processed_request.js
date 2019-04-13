import React, { Component } from "react";

// TODO
//      Criar as páginas de edição
//                          remoção
//                          detalhes
// OBS
//      Os dados devem ser retornados do DB com o id do evento

export class AgentProcessedRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_action: "list",
            request_id: null,
        };

        this.data = {
            1: { id: 1, nome: "Matheus", tipo_requisicao: "SERVIDOR", data: "22/11/2019" },
            2: { id: 2, nome: "Matheus", tipo_requisicao: "VISITANTE", data: "22/11/2019" },
            3: { id: 3, nome: "Matheus", tipo_requisicao: "SERVIDOR", data: "22/11/2019" },
            4: { id: 4, nome: "Matheus", tipo_requisicao: "VISITANTE", data: "22/11/2019" },
            5: { id: 5, nome: "Matheus", tipo_requisicao: "ALUNO", data: "22/11/2019" },
            6: { id: 6, nome: "Matheus", tipo_requisicao: "SERVIDOR", data: "22/11/2019" },
            7: { id: 7, nome: "Matheus", tipo_requisicao: "ALUNO", data: "22/11/2019" },
            8: { id: 8, nome: "Matheus", tipo_requisicao: "ALUNO", data: "22/11/2019" },
        };
    }

    __onPDF = (request_id) => {
        console.log("PDF");
        console.log(this.data[request_id]);
    }

    __onDetail = (request_id) => {
        this.setState({current_action: "edit"})
        console.log("Detail");
        console.log(this.data[request_id]);
    }

    format_data = () => {

        const table = Object.values(this.data).map((row, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{row.tipo_requisicao}</td>
                    <td>{row.nome}</td>
                    <td>{row.data}</td>
                    <td><button className="btn btn-outline-primary" onClick={() => { this.__onPDF(row.id) }}>Gerar PDF</button><span className="pr-1"></span>
                        <button className="btn btn-primary" onClick={() => { this.__onDetail(row.id) }}>Detalhes</button><span className="pr-1"></span></td>
                </tr>
            )
        });

        return table;
    }

    list = () => {
        return (
            <div className="row justify-content-center pt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo de Requisição</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.format_data()}
                    </tbody>
                </table>
            </div>
        );
    }

    action_handler = () => {
        switch (this.state.current_action){
            case "list":
                return this.list();
            case "edit":
                return <div>Edit</div>;
            default:
                return <div>Error</div>
        }
    }

    render = () => {
        return (
            <div className="container">
            <div className="pb-5"></div>
                { this.action_handler() }
                <div className="footer"></div>
            </div>
        );
    }
};