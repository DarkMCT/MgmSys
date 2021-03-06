import React, { Component } from "react";
import { make_request } from "./request";

// should you pass a callback to be executed when the login
// success (onSuccess) or fail  (onFail)
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siape: "",
            senha: "",
            message: "",
            logged: false,
        };

    }

    authenticate = () => {
        make_request(
            "/auth",
            "POST",
            JSON.stringify({
                operation: 'login',
                siape: this.state.siape,
                senha: this.state.senha,
            })
        ).then((res) => {
            if (res.status !== 200) {
                this.setState({
                    message: "Usuário não encontrado",
                    logged: false,
                });
                this.props.onFail();
            } else if (res.status === 200) {
                res.json()
                    .then( ()=> {
                        this.props.onSuccess();
                    })
                    .catch(err => {
                        this.setState({ message: "Tipo de usuário não identificado." });
                    });
            }
        }).catch((err) => {
            this.setState({
                message: "Não foi possível conectar com o servidor",
                logged: false,
            });
            this.props.onFail();
        });
    }

    render = () => {
        return (
            <div className="container w-25 pt-5">

                <div className="row justify-content-center">
                    <h1 style={{fontFamily: 'Lobster'}}>MgmSys</h1>
                </div>

                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="siape">Siape:</label>
                        <input
                            type="text"
                            name="siape"
                            id="siape"
                            className="form-control"
                            onChange={event => {
                                this.setState({
                                    siape: event.target.value
                                })
                            }}>
                        </input>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            onChange={event => {
                                this.setState({
                                    senha: event.target.value
                                })
                            }}>
                        </input>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <label className="text-danger text-small">
                        {this.state.message}
                    </label>
                </div>
                <div className="row justify-content-center">
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-25 mr-2"
                        onClick={this.props.onRegister}>
                        Registrar
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-primary w-25 ml-2"
                        onClick={this.authenticate}>
                        Login
                    </button>
                </div>
                <div className="row justify-content-center pt-2">
                    <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={this.props.onForgetPassword}>
                        Esqueceu a senha?
                    </button>
                </div>
            </div>
        );
    }
};

