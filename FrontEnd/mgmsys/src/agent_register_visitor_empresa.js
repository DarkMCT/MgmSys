import React, { Component } from "react";
import { make_request } from "./request";

export class AgentRegisterVisitorEmpresa extends Component{
    constructor(props){
        super(props);
        this.state= {
            nome: "",
            // cep: "",
            cnpj: "",
            // telefone: "",

            autonomo: true,

            readonly: true,
        };

    }

    search = ()=>{
        let cnpj = this.state.cnpj.replace(/(\.|-\/)/g, "");

        if (cnpj.length === 14){
            make_request(
                "/visita_visitante/search",
                "POST",
                JSON.stringify({cnpj: cnpj, what: "CNPJ"})
            ).then( res =>{
                return res.json();
            }).then( data => {
                if (Object.keys(data).length > 0) {
                    this.setState({...data, readonly: true});
                } else {
                    this.setState({ readonly: false });
                }
            })
            .catch( err => {
                this.setState({...this.initial_data, readonly: false});
            });

        } else {
            this.setState({...this.initial_data, readonly: false});
        }
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();
        if (initial_data != null) {
            const autonomo = !(initial_data.cnpj &&
                initial_data.cnpj.length > 0);
            this.setState({...initial_data, autonomo: autonomo});
        }
    }

    remove_mark_sings = (str) => {
        return str.replace(/(\.|\/|-|\/)/g, "");
    }

    save_data = () => {
        const empresa = this.state.autonomo
            ? null
            : {
                nome: this.state.nome,
                cep: this.state.cep,
                cnpj: this.remove_mark_sings(this.state.cnpj),
                telefone: this.state.telefone,
            };

        this.props.onSave(empresa);
    };

    change_state_company_state = (value) => {
        const ro = !value ? true: this.state.readonly;
        this.setState({ autonomo: value, readonly: ro });
    }

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dados da empresa...</h1>
                </div>

                <div className="row justify-content-center">
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="visitante-autonomo"
                            checked={this.state.autonomo}
                            onChange={ ()=>this.change_state_company_state(true)}/>
                        <label
                            className="form-check-label">
                            Autônomo
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="visitante-autonomo"
                            checked={!this.state.autonomo}
                            onChange={ ()=>this.change_state_company_state(false)}>
                        </input>
                        <label
                            className="form-check-label">
                            Contratado
                        </label>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="form-group col-6">
                        <label htmlFor="empresa_cnpj">CNPJ</label>
                        <input
                            type="text"
                            id="empresa_cnpj"
                            className="form-control"
                            placeholder="Digite o CNPJ da empresa"
                            value={this.state.cnpj}
                            onBlur={this.search}
                            readOnly={this.state.autonomo}
                            onChange={e=>this.setState({cnpj: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: 39.848.267/0001-79
                        </small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="empresa_nome">Nome da Empresa</label>
                        <input
                            type="text"
                            id="empresa_nome"
                            className="form-control"
                            placeholder="Digite o nome da empresa..."
                            value={this.state.nome}
                            readOnly={this.state.readonly}
                            onChange={e=>this.setState({nome: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: Foo Bar SA
                        </small>
                    </div>

                   {/*  <div className="form-group col-3">
                        <label htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            id="cep"
                            className="form-control"
                            placeholder="Digite o CEP da empresa..."
                            value={this.state.cep}
                            readOnly={this.state.readonly}
                            onChange={e=>this.setState({cep: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: 78000-000
                        </small>
                    </div>

                    <div className="form-group col-3">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="text"
                            id="telefone"
                            className="form-control"
                            placeholder="Digite o telefone da empresa..."
                            value={this.state.telefone}
                            readOnly={this.state.readonly}
                            onChange={e=>this.setState({telefone: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: (00) 0000-0000</small>
                    </div> */}
                </div>

                <div className="row pt-3">
                    <div className="col-6">
                        <button
                            className="btn btn-secondary float-left"
                            onClick={()=>{ this.save_data(); this.props.onBack(); }}>
                            Voltar
                        </button>
                    </div>
                    <div className="col-6">
                        <button
                            className="btn btn-success float-right"
                            onClick={()=>{ this.save_data(); this.props.onNext(); }}>
                            Avançar
                        </button>
                    </div>
                </div>

                <div className="footer"></div>

            </div>
        );
    };
};