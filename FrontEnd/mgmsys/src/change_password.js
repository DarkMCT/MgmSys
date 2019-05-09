import React, {Component} from "react";
import { make_request } from "./request";

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: "",
            new_password: "",
            confirm_password: "",
            message: "Digite as senhas...",
            message_class: "text-danger",
        };
    }

    send_to_server = ()=>{
        const data = {
            old_password: this.state.old_password,
            new_password: this.state.new_password
        }

        if (this.state.confirm_password !== this.state.new_password ||
            this.state.new_password.length < 6) {
            this.setState({
                message: "As senhas não são iguais ou não possui menos de 6 caracteres",
                message_class: "text-danger"
            });
        }
        else {
            this.setState({
                message: "Enviando dados para o servidor...",
                message_class: "text-primary"
            });

            make_request("/auth/change_password", "POST", JSON.stringify(data))
            .then(res => {
                if (res.status === 200)
                    this.setState({
                        message: "Senha alterada!",
                        message_class: "text-success",
                        old_password: "",
                        new_password: "",
                        confirm_password: "",
                    });
                else
                    this.setState({
                        message: "Não foi possível alterar a senha!",
                        message_class: "text-danger",
                    });
            })
            .catch(err => {

            });
        }
    }


    render = ()=>{
        return (
            <div className="container w-50">
                <div className="row justify-content-center">
                    <h3>Alterar senha</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="oldpassword">Senha antiga:</label>
                        <input
                            className="form-control"
                            type="password"
                            id="oldpassword"
                            value={this.state.old_password}
                            onChange={e=>this.setState({old_password: e.target.value})}>
                        </input>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="newpassword">Senha nova:</label>
                        <input
                            className="form-control"
                            type="password"
                            id="newpassword"
                            value={this.state.new_password}
                            onChange={e=>{
                                this.setState({new_password: e.target.value});
                            }}>
                        </input>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="confirmpassword">Confirme a senha:</label>
                        <input
                            className="form-control"
                            type="password"
                            id="confirmpassword"
                            value={this.state.confirm_password}
                            onChange={e=>{
                                this.setState({confirm_password: e.target.value});
                            }}>
                            </input>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.send_to_server}>
                        Mudar Senha
                    </button>
                </div>
                <div className="row justify-content-center">
                    <div className={this.state.message_class}>{this.state.message}</div>
                </div>
            </div>
        );
    }
}