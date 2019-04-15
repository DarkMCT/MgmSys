import React, { Component } from "react";

export class AgentRegisterVisitorEmpresa extends Component{
    constructor(props){
        super(props);
        this.state= {
            nome: "",
            cep: "",
            cnpj: "",
            telefone: "",

            readonly: true,
        };

        this.empresa_nome = React.createRef();
        this.empresa_cep = React.createRef();
        this.empresa_cnpj = React.createRef();
        this.empresa_telefone = React.createRef();
    }

    search = ()=>{
        let cnpj = this.state.cnpj.replace(/(\.|-\/)/g, "");

        if (cnpj.length === 14){
            const header = new Headers();
            header.set("content-type", "application/json");

            fetch(this.props.backendAddr + "/visita_visitante/search", {
                headers: header,
                credentials: "include",
                method: "POST",
                mode: "cors",
                body: JSON.stringify({cnpj: cnpj, what: "CNPJ"}),
            }).then( res =>{
                return res.json();
            }).then( data => {
                if (Object.keys(data).length > 0)
                    this.setState({...data, readonly: true});
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
        if (initial_data != null)
            this.setState({...initial_data});
    }

    remove_mark_sings = (str) => {
        return str.replace(/(\.|\/|-|\/)/g, "");
    }

    save_data = () => {
        const empresa = {
            nome: this.state.nome,
            cep: this.state.cep,
            cnpj: this.remove_mark_sings(this.state.cnpj),
            telefone: this.state.telefone,
        }

        this.props.onSave(empresa);
    };

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dados da empresa...</h1>
                </div>

                <div className="row justify-content-center">
                    <div className="form-group col-6">
                        <label htmlFor="empresa_cnpj">CNPJ</label>
                        <input type="text" id="empresa_cnpj" ref={ this.empresa_cnpj } className="form-control" placeholder="Digite o CNPJ da empresa"
                            value={this.state.cnpj} onBlur={this.search} onChange={e=>this.setState({cnpj: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 39.848.267/0001-79</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="empresa_nome">Nome da Empresa</label>
                        <input type="text" id="empresa_nome" ref={this.empresa_nome} className="form-control" placeholder="Digite o nome da empresa..."
                            value={this.state.nome} readOnly={this.state.readonly} onChange={e=>this.setState({nome: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: Foo Bar SA</small>
                    </div>

                    <div className="form-group col-3">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" ref={this.empresa_cep} className="form-control" placeholder="Digite o CEP da empresa..."
                            value={this.state.cep} readOnly={this.state.readonly} onChange={e=>this.setState({cep: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 78000-000</small>
                    </div>

                    <div className="form-group col-3">
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" id="telefone" ref={this.empresa_telefone} className="form-control" placeholder="Digite o telefone da empresa..."
                            value={this.state.telefone} readOnly={this.state.readonly} onChange={e=>this.setState({telefone: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: (00) 0000-0000</small>
                    </div>
                </div>

                <div className="row pt-3">
                    <div className="col-6">
                        <button className="btn btn-secondary float-left" onClick={()=>{ this.save_data(); this.props.onBack(); }}>Voltar</button>
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