import React, { Component } from "react"        ;

import { RequestEdit }   from "./request_edit"  ;
import { RequestRemove } from "./request_remove";
import { RequestDetail } from "./request_detail";

import { make_request }  from "./request"       ;

import { format_date }   from "./utility"       ;

export class AgentWaitingRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_action: "list",
            request_id: null,
            data: null,
        };
    }

    componentDidMount = ()=>{
        this.search();
    }

    search = ()=>{
        this.setState({data: null});

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

    __onRemove = (row) => {
        this.setState({current_action: "remove", selected_row: row});
    }

    __onEdit = (row) => {
        this.setState({current_action: "edit", selected_row: row});
    }

    __onDetail = (row) => {
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
                <td>{format_date(row.data)}</td>
                <td><button className="btn btn-warning" onClick={()=>{this.__onEdit(row)}}>Editar</button><span className="pr-1"></span>
                    <button className="btn btn-danger"  onClick={()=>{this.__onRemove(row)}}>Remover</button><span className="pr-1"></span>
                    <button className="btn btn-primary" onClick={()=>{this.__onDetail(row)}}>Detalhes</button></td>
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
            case "edit":
                return  <RequestEdit
                            backAction={backAction}
                            data={this.state.selected_row}>
                        </RequestEdit>;
            case "remove":
                return  <RequestRemove
                            backAction={backAction}
                            data={this.state.selected_row}>
                        </RequestRemove>;
            case "detail":
                return  <RequestDetail
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
            <div className="pb-5"></div>
                { this.action_handler() }
            <div className="footer"></div>
            </div>
        );
    }
};