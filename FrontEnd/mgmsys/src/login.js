import React, { Component } from "react";

// should you pass a callback to be executed when the login
// success (onSuccess) or fail  (onFail)
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siape: "",
            password: "",
            message: "",
            logged: false,
        };
        console.log(props);
    }

    authenticate = () => {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');

        fetch('http://localhost:3001/auth', {
            method: 'POST',
            mode: "cors",
            headers: header,
            credentials: 'include',
            body: JSON.stringify({
                operation: 'login',
                siape: this.state.siape,
                password: this.state.password,
            }),
        }).then((res) => {
            if (res.status !== 200){
                this.setState({
                    message: "Usuário não encontrado",
                    logged: false,
                });
                this.props.onFail();
            } else {
                this.props.onSuccess();
                this.setState( { logged: true } );
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
                <div className="form-group">
                    <label htmlFor="siape">Siape:</label>
                    <input type="text" name="siape" id="siape" className="form-control"
                        onChange={event => {
                            this.setState({
                                siape: event.target.value
                            })
                        }}>
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" id="password" className="form-control"
                        onChange={event => {
                            this.setState({
                                password: event.target.value
                            })
                        }}>
                    </input>
                </div>
                <label className="text-danger text-small">{ this.state.message }</label>

                <button type="button" className="btn btn-outline-secondary w-50" onClick={ () => this.props.onRegister() }>
                    Registrar
                </button>

                <button type="button" className="btn btn-outline-primary w-50" onClick={this.authenticate}>
                    Login
                </button>

            </div>
        );
    }
};

