import React, { Component } from "react";

import { RequestDetail } from "./request_detail";
import { RequestApprove } from "./request_approve";
import { RequestReject } from "./request_reject";
import { make_request } from "./request";

import { format_date } from "./utility";

export class ManagerWaitingRequest extends Component {
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
            what: "STATUS_AGUARDANDO",

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

    __onReject = (row) => {
        this.setState({current_action: "reject", selected_row: row});
    }

    __onApprove = (row) => {
        this.setState({current_action: "approve", selected_row: row});
    }

    __onDatail = (row) => {
        this.setState({current_action: "detail", selected_row: row});
    }

    format_data = () => {
        // console.log("Here");
        if (this.state.data == null)
            return;

        const table = Object.values(this.state.data).map((row, i) => {

            return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.tipo_requisicao}</td>
                <td>{row.nome}</td>
                <td>{ format_date(row.data) }</td>
                <td>{row.requerente}</td>
                <td>
                    <button
                        className="btn btn-info"
                        onClick={()=>{this.__onDatail(row)}}>
                        Detalhes
                    </button>
                    <span className="pr-1"></span>
                    <button
                        className="btn btn-danger"
                        onClick={()=>{this.__onReject(row)}}>
                        Rejeitar
                    </button>
                    <span className="pr-1"></span>
                    <button
                        className="btn btn-success"
                        onClick={()=>{this.__onApprove(row)}}>
                        Aprovar
                    </button>
                </td>
            </tr>
        )});

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
                            <th scope="col">Requerente</th>
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
        const backAction = ()=> { this.setState({current_action: "list"}); this.search() };
        switch (this.state.current_action){
            case "list":
                return this.list();
            case "detail":
                return  <RequestDetail
                            backAction={backAction}
                            data={this.state.selected_row}>
                        </RequestDetail>;
            case "approve":
                return  <RequestApprove
                            backAction={backAction}
                            data={this.state.selected_row}>
                        ></RequestApprove>;

            case "reject":
                return <RequestReject
                            backAction={backAction}
                            data={this.state.selected_row}>
                        ></RequestReject>;

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