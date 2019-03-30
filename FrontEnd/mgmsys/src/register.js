
import React, { Component } from "react";

/*

  "id_usuario" serial,
  "fk_id_departamento" int REFERENCES departamento(id_departamento),
  "nome" varchar(120),
  "SIAPE" varchar(120),
  "email" varchar(120),
  "senha" char(60),
  "status_autenticacao" char(1),
  "tipo" char(1),
  "ativado" char(1),
*/

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departamentos: [],
            warning: null,

            credentials: {
                operation: "register",
                fk_id_departamento: null,
                nome: null,
                siape: null,
                email: null,
                senha: null,
                tipo: null,
            }
        };
    }

    componentDidMount = () => {
        this.fetchDepartaments();
    }

    fetchDepartaments = () => {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        fetch(this.props.backendAddr + "/departamento", {
            headers: header,
            mode: "cors",
            credentials: "include",
            method: "GET",
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);

            this.setState({ departamentos: data });
        }).catch(err => {
            console.error(err);
        });
    };

    getDepartaments = () => {
        return (
            this.state.departamentos.map(departamento => {
                return (<option key={departamento.id_departamento} value={departamento.id_departamento}>
                    {departamento.sigla + " - " + departamento.nome}
                </option>);
            })
        );
    };

    getUserTypes = () => {
        // 0 -> agente and 1 -> manager
        return (
            ["Agente", "Gerente"].map( (tipo, i) => <option key={i} value={i}>{ tipo }</option>)
        );
    }

    sendCredentials = () => {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        fetch(this.props.backendAddr + "/auth", {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: header,
            body:  JSON.stringify(this.state.credentials),
        })
        .then( res => {
            if (res.status === 200)
                this.props.onBack();
            else
                this.setState({warning: "Dados inválidos"});
        }).catch( err => {
            this.setState({warning: "Dados inválidos"});
        });
    }

    render = () => {
        return (
            <div className="container w-50 pt-5">
                <h1>Cadastro</h1>
                <br />
                <div className="form-group">
                    <label htmlFor="siape">Siape:</label>
                    <input
                        type="text"
                        name="siape"
                        id="siape"
                        className="form-control"
                        onChange={
                            e => this.setState({
                                credentials: {
                                    ...this.state.credentials, siape: e.target.value
                                }
                            })
                        }>
                    </input>
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={
                            e => this.setState({
                                credentials: {
                                    ...this.state.credentials, email: e.target.value
                                }
                            })
                        }>
                    </input>
                </div>

                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        className="form-control"
                        onChange={
                            e => this.setState({
                                credentials: {
                                    ...this.state.credentials, nome: e.target.value
                                }
                            })
                        }>
                    </input>
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        className="form-control"
                        ref={this.senha}
                        onChange={
                            e => {
                                this.setState({
                                    credentials: {
                                        ...this.state.credentials, senha: e.target.value
                                    }
                                });
                            }
                        }></input>

                </div>

                <div className="form-group">
                    <label htmlFor="tipo">Tipo Usuário:</label>
                    <select className="custom-select"
                        onChange={
                            e => this.setState({
                                credentials: {
                                    ...this.state.credentials, tipo: e.target.value
                                }
                            })
                        }>
                        <option defaultValue>Selecione o tipo de usuário</option>
                        {this.getUserTypes()}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="departamento">Departamento:</label>
                    <select className="custom-select"
                        onChange={
                            e => this.setState({
                                credentials: {
                                    ...this.state.credentials, fk_id_departamento: e.target.value
                                }
                            })
                        }>
                        <option defaultValue>Selecione um departamento</option>
                        {this.getDepartaments()}
                    </select>
                </div>

                <label className="text-danger">{this.state.warning}</label>
                <br />
                <button className="btn btn-outline-secondary" onClick={() => this.props.onBack()}>Voltar</button>
                <button className="btn btn-outline-primary" onClick={() => { console.log(this.state.credentials); this.sendCredentials() }}>Cadastrar</button>
                <div className="container pt-5"></div>
            </div>
        );
    };
};
