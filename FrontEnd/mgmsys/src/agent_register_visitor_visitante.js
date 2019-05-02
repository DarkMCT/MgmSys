import React, { Component } from "react";
import { isNumber } from "util";

import {date_parse} from "./utility";
import { make_request } from "./request";


export class AgentRegisterVisitorVisitante extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome: "",
            telefone: "",
            email: "",
            dt_nasc: "",
            rg: "",
            cpf: "",
            endereco: "",

            readonly: true,
        };

        this.initial_data = {};
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();
        if (initial_data != null)
            this.setState({...initial_data});
    }

    remove_mark_sings = (str) => {
        return str.replace(/(\.|\/|-|\/)/g, "");
    }

    save_data = () => {
        const visitante = {
            nome: this.state.nome,
            telefone: this.state.telefone,
            email: this.state.email,
            dt_nasc: this.state.dt_nasc,
            rg: this.state.rg,
            cpf: this.state.cpf,
            endereco: this.state.endereco,
        }

        this.props.onSave(visitante);
    };

    search = ()=>{
        let rg = this.state.rg.replace(/(\.|-)/g, "");
        let cpf = this.state.cpf.replace(/(\.|-)/g, "");

        if ((cpf.length === 11 && isNumber(+cpf)) || (rg.length === 8 && isNumber(+rg))){
            cpf = cpf.length === 11 ? cpf : null;
            rg = rg.length === 8 ? rg : null;

            make_request(
                "/visita_visitante/search",
                "POST",
                JSON.stringify({cpf: cpf, rg: rg, what: "RG_CPF"})
            ).then( res =>{
                return res.json();
            }).then( data => {
                if (Object.keys(data).length > 0) {
                    this.setState({...data, dt_nasc: date_parse(data.dt_nasc), readonly: true});
                } else {
                    this.setState({ readonly: false });
                }
            })
            .catch( err => {
                this.setState({readonly: false});
            });

        } else {
            this.setState({readonly: false});
        }
    }

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dados do visitante...</h1>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="visitante_rg">RG</label>
                        <input
                            type="text"
                            id="visitante_rg"
                            className="form-control"
                            placeholder="Digite o RG do visitante..."
                            value={this.state.rg}
                            onBlur={this.search}
                            onChange={(e)=>this.setState({rg: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: 0000000-00, 000000000
                        </small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="visitante_cpf">CPF</label>
                        <input
                            type="text"
                            id="visitante_cpf"
                            className="form-control"
                            placeholder="Digite o CPF do visitante..."
                            value={this.state.cpf}
                            onBlur={this.search}
                            onChange={(e)=>this.setState({cpf: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: 000.000.000-00, 00000000000
                        </small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="visitante_nome">Nome</label>
                        <input
                            type="text"
                            id="visitante_nome"
                            className="form-control"
                            placeholder="Digite o nome do visitante..."
                            value={this.state.nome}
                            readOnly={this.state.readonly}
                            onChange={(e)=>this.setState({nome: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: Foo Bar Baz
                        </small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="visitante_email">Email</label>
                        <input
                            type="text"
                            id="visitante_email"
                            className="form-control"
                            placeholder="Digite o email do visitante..."
                            value={this.state.email}
                            readOnly={this.state.readonly}
                            onChange={(e)=>this.setState({email: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: foo@bar.baz
                        </small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="visitante_dt_nasc">Data de Nascimento</label>
                        <input
                            type="date"
                            id="visitante_dt_nasc"
                            className="form-control"
                            placeholder="Digite a data de nascimento do visitante..."
                            value={this.state.dt_nasc}
                            readOnly={this.state.readonly}
                            onChange={(e)=>this.setState({dt_nasc: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: 01/01/2001
                        </small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="visitante_telefone">Telefone</label>
                        <input
                            type="text"
                            id="visitante_telefone"
                            className="form-control"
                            placeholder="Digite o telefone do visitante..."
                            value={this.state.telefone}
                            readOnly={this.state.readonly}
                            onChange={(e)=>this.setState({telefone: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">
                            Ex: (65) 99999-9999, 99999-9999, 3000-0000
                        </small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="visitante_endereco">Endereço</label>
                        <input
                            type="text"
                            id="visitante_endereco"
                            className="form-control"
                            placeholder="Digite o endereço do visitante..."
                            value={this.state.endereco}
                            readOnly={this.state.readonly}
                            onChange={(e)=>this.setState({endereco: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: Rua Foo Bar, Número 00
                        </small>
                    </div>
                </div>

                <div className="row pt-3">
                    <div className="col-6"></div>
                    <div className="col-6">
                        <button
                            className="btn btn-success float-right"
                            onClick={() =>{this.save_data(); this.props.onNext();}}>
                            Avançar
                        </button>
                    </div>
                </div>

                <div className="footer"></div>
            </div>
        );
    };
};