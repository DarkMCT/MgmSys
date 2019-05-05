import React, { Component } from "react";
import { date_parse } from "./utility";
import { make_request } from "./request";

export class AgentRegisterEmployeeServidor extends Component{
    constructor(props){
        super(props);
        this.state= {
            siape: "",
            nome: "",
            // telefone: "",
            email: "",
            // dt_nasc: "",
            rg: "",
            cpf: "",
            // endereco: "",

            readonly: true,
        };
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();
        if (initial_data != null)
            this.setState({...initial_data});
    }

    save_data = () => {
        const servidor = {
            siape: this.state.siape,
            nome: this.state.nome,
            // telefone: this.state.telefone,
            email: this.state.email,
            // dt_nasc: this.state.dt_nasc,
            rg: this.state.rg,
            cpf: this.state.cpf,
            // endereco: this.state.endereco,
        }
        // this.setState({...veiculo_visitante});

        this.props.onSave(servidor);
    };

    search = ()=>{
        let siape = this.state.siape.replace(/(\.|-)/g, "");

        if (siape.length > 6){
            const header = new Headers();
            header.set("content-type", "application/json");

            make_request(
                "/visita_servidor/search",
                "POST",
                JSON.stringify({siape: siape, what: "SIAPE"})
            ).then( res =>{
                return res.json();
            }).then( data => {
                if (Object.keys(data).length > 0) {
                    if ("dt_nasc" in data)
                        data.dt_nasc = date_parse(data.dt_nasc)

                    this.setState({...data, readonly: true});
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
                    <h1>Dados do servidor...</h1>
                </div>

                <div className="row justify-content-center">
                    <div className="form-group col-6">
                        <label htmlFor="servidor_siape">SIAPE</label>
                        <input type="text" id="servidor_siape" ref={ this.servidor_siape } className="form-control" placeholder="Digite o código SIAPE do servidor"
                            value={this.state.siape} onBlur={this.search} onChange={e=>this.setState({siape: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 2000000</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="servidor_rg">RG</label>
                        <input type="text" id="servidor_rg" ref={this.servidor_rg} className="form-control" placeholder="Digite o RG do servidor..."
                            value={this.state.rg} readOnly={this.state.readonly} onChange={e=>this.setState({rg: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 0000000-0</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" ref={this.servidor_cpf} className="form-control" placeholder="Digite o CPF do servidor..."
                            value={this.state.cpf} readOnly={this.state.readonly} onChange={e=>this.setState({cpf: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 000.000.000-00, 000000000-00</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="servidor_nome">Nome</label>
                        <input type="text" id="servidor_nome" ref={this.servidor_nome} className="form-control" placeholder="Digite o nome do servidor..."
                            value={this.state.nome} readOnly={this.state.readonly} onChange={e=>this.setState({nome: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: Foo Bar Baz</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="cpf">Email</label>
                        <input type="text" id="servidor_email" ref={this.servidor_email} className="form-control" placeholder="Digite o email do servidor..."
                            value={this.state.email} readOnly={this.state.readonly} onChange={e=>this.setState({email: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: foo@bar.baz</small>
                    </div>
                </div>

                {/* <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="servidor_telefone">Telefone</label>
                        <input type="text" id="servidor_telefone" ref={this.servidor_telefone} className="form-control" placeholder="Digite o número de telefone do servidor..."
                            value={this.state.telefone} readOnly={this.state.readonly} onChange={e=>this.setState({telefone: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 0000-0000, (00) 0000-0000</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="servidor_dt_nasc">Data de nascimento</label>
                        <input type="date" id="servidor_dt_nasc" ref={this.servidor_dt_nasc} className="form-control" placeholder="Digite a data de nascimento do servidor..."
                            value={this.state.dt_nasc} readOnly={this.state.readonly} onChange={e=>this.setState({dt_nasc: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 01/01/2001</small>
                    </div>
                </div> */}

                {/* <div className="row">
                    <div className="form-group col">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" id="endereco" ref={this.servidor_endereco} className="form-control" placeholder="Digite o endereço do servidor..."
                            value={this.state.endereco} readOnly={this.state.readonly} onChange={e=>this.setState({endereco: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: Rua Foo, Número 01</small>
                    </div>
                </div> */}

                <div className="row pt-3">
                    <div className="col-6">
                        {/* <button className="btn btn-secondary float-left" onClick={()=>{ this.save_data(); this.props.onBack(); }}>Voltar</button> */}
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success float-right" onClick={()=>{ this.save_data(); this.props.onNext(); }}>Avançar</button>
                    </div>
                </div>

                <div className="footer"></div>

            </div>
        );
    };
};