import React, { Component } from "react";
import { make_request } from "./request";

import { RequestDetail } from "./request_detail";

import { format_date } from "./utility";

// TODO
//      Criar as páginas de edição
//                          remoção
//                          detalhes
// OBS
//      Os dados devem ser retornados do DB com o id do evento

export class ManagerProcessedRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_action: "list",
            request_id: null,
            data: null,
        };
    }

    search = ()=>{
        make_request("/visita", "POST", JSON.stringify({
            what: "STATUS_PROCESSADO",
        }))
        .then(res=>res.json())
        .then(result => {
            let data = {};
            result.map( (row, ind) => data[ind] = row);

            this.setState({data: data});
        })
        .catch(err => {
            console.log("error");
        });
    }

    componentDidMount = ()=>{
        this.search();
    }

       __onDetail = (row) => {
        this.setState({current_action: "detail", selected_row: row})
    }

    format_data = () => {
        if (this.state.data == null)
            return;

        const table = Object.values(this.state.data).map((row, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{row.tipo_requisicao}</td>
                    <td>{row.nome}</td>
                    <td>{format_date(row.data)}</td>
                    <td>{row.status_de_aprovacao === 1 ? "Aprovado" : "Não Aprovado"}</td>
                    <td>
                        {/* <button className="btn btn-outline-primary" onClick={() => { this.__onPDF(row) }}>Gerar PDF</button> */}
                        <button className="btn btn-primary" onClick={() => { this.__onDetail(row) }}>Detalhes</button>
                        </td>
                </tr>
            )
        });

        return table;
    }

    list = () => {
        return (
            <div className="row justify-content-center">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo de Requisição</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data</th>
                            <th scope="col">Status de Aprovação</th>
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
        const backAction = () => this.setState({current_action: "list"})
        switch (this.state.current_action){
            case "list":
                return this.list();
            case "detail":
                return <RequestDetail
                            backAction={backAction}
                            data={this.state.selected_row}>
                        </RequestDetail>;
            default:
                return <div>Error</div>
        }
    }

    render = () => {
        return (
            <div className="container">
                { this.action_handler() }
                <div className="footer"></div>
            </div>
        );
    }
};