import React, { Component } from "react";

import { make_request } from "./request";

export class AgentWaitingRequest extends Component {
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

    __onRemove = (request_id) => {
        this.setState({current_action: "remove"});
        console.log("Remove:");
        console.log(this.state.data[request_id]);
    }

    __onEdit = (request_id) => {
        this.setState({current_action: "edit"});
        console.log("Edit:");
        console.log(this.state.data[request_id]);
    }

    __onDetail = (request_id) => {
        this.setState({current_action: "detail"});
        console.log("Detail:");
        console.log(this.state.data[request_id]);
    }

    format_data = () => {
        console.log("Here");
        if (this.state.data == null)
            return;

        const table = Object.values(this.state.data).map((row, i) => {
            return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.tipo_requisicao}</td>
                <td>{row.nome}</td>
                <td>{row.data}</td>
                <td><button className="btn btn-warning" onClick={()=>{this.__onEdit(row.id)}}>Editar</button><span className="pr-1"></span>
                    <button className="btn btn-danger"  onClick={()=>{this.__onRemove(row.id)}}>Remover</button><span className="pr-1"></span>
                    <button className="btn btn-primary" onClick={()=>{this.__onDetail(row.id)}}>Detalhes</button></td>
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
        switch (this.state.current_action){
            case "list":
                return this.list();
            case "edit":
                return <div>Editing</div>;
            case "remove":
                return <div>Remove</div>;
            case "detail":
                return <div>Detail</div>;
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