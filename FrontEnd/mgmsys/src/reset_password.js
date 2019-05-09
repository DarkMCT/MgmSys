import React, { Component } from "react";
import { make_request } from "./request";

export class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            siape: "",
            message: ""
        };
    }

    send_to_server = () => {
        const data = {
            email: this.state.email,
            siape: this.state.siape,
        };

        make_request("/authentication/reset_password/", "POST", JSON.stringify(data))
        .then(res => {
            if (res.status === 200)
                this.setState({message: "Verifique o seu email com a nova senha."});
            else
                console.log("Fail");
        })
        .catch(console.log);
    }

    render = () => {
        return (
            <div className="container">
                <div className="row justify-content-center pt-5 pb-3">
                    <h3
                        className="text-primary">Recuperar Senha</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={e=>this.setState({email: e.target.value})}>
                        </input>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="siape">Siape</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.siape}
                            onChange={e=>this.setState({siape: e.target.value})}>
                        </input>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <button
                            type="button"
                            className="btn btn-outline-secondary mr-2"
                            onClick={this.props.onBack}>
                            Voltar
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark ml-2"
                            onClick={this.send_to_server}>
                            Recuperar!!!
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}