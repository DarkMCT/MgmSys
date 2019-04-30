import React, { Component } from "react";

import { make_request } from "./request";

import { format_date } from "./utility";

export class RequestApprove extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...this.props.data,
            message: "",
        };
    }

    approve = () => {
        make_request("/visita_process", "POST", JSON.stringify({
            tipo_requisicao: this.state.tipo_requisicao,
            id: this.state.id,
            status: "approve",
        }))
        .then(res=>{
            if (res.status === 200)
                this.props.backAction();
            else
                this.setState({
                    ...this.state,
                    message: "Ocurreu um erro ao processar está requisição."
                });
        })
    }

    render = () => {
        return (
        <div className="container">

            <div className="form-group">
                Solicitação para visita de:
                <label className="form-control">{this.state.nome}</label>
            </div>
            <div className="form-group">
                Na data:
                <label className="form-control">{format_date(this.state.data)}</label>
            </div>
            <div className="form-group">
                Solicitado por:
                <label className="form-control">{this.state.requerente}</label>
            </div>
            <div className="row justify-content-center">
                <h3 className="text-danger">{this.state.message}</h3>
            </div>

            <div className="row pt-3">
                <div className="col-6">
                    <button className="btn btn-secondary float-left" onClick={ this.props.backAction }>Voltar</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-success float-right w-25" onClick={ this.approve }>Aprovar</button>
                </div>
            </div>
        </div>);
    }
}