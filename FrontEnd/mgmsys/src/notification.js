import React, { Component } from "react";
import { make_request } from "./request";

export class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receber_notificacao: false,
            message: "",
            message_class: "",
        };
    }

    send_to_server = () => {
        make_request("/user_info/notification", "POST", JSON.stringify({
            receber_notificacao: this.state.receber_notificacao,
        }))
        .then(res => {
            if (res.status === 200)
                this.setState({
                    message: "Alterado com sucesso!!",
                    message_class: "text-success"
                });
            else
                this.setState({
                    message: "Ops! ocorreu um erro.",
                    message_class: "text-danger",
                });
        })
        .catch(err => {
            this.setState({
                message: "Ops! ocorreu um erro ao enviar esses dados.",
                message_class: "text-danger",
            });
        })
    }

    componentDidMount = () => {
        make_request("/user_info/notification", "GET")
        .then(res => res.json())
        .then(notf => this.setState({
            receber_notificacao: notf.receber_notificacao,
            message: "Ok",
            message_class:  "text-success",
        }))
        .catch(err => {
            console.log(err);
            this.setState({
                message: "Ops! ocorreu um erro.",
                message_class: "text-danger",
            });
        });
    }

    componentWillUnmount = ()=> {
        this.send_to_server();
    }

    render = ()=>{
        return (
            <div className="container w-50">
                <div className="row justify-content-center">
                    <h3>Receber notificações</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            checked={this.state.receber_notificacao}
                            onChange={e=>this.setState({
                                receber_notificacao: e.target.checked,
                            })}>
                        </input>
                        <label className="custom-control-label" htmlFor="customCheck1">Eu concordo em receber notificações no meu email</label>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className={this.state.message_class}>{this.state.message}</div>
                </div>
            </div>
        );
    }
}