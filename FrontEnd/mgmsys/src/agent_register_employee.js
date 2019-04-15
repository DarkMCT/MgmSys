import React, { Component } from "react";
import { AgentRegisterEmployeeServidor } from "./agent_register_employee_servidor";
import { AgentRegisterEmployeeServidorVisita } from "./agent_register_employee_servidor_visita";
import { AgentRegisterEmployeeServidorVeiculo } from "./agent_register_employee_servidor_veiculo";

export class AgentRegisterEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servidor: null,
            veiculo_servidor: null,
            visita_servidor: null,

            menu_progress: 1,

            communication_status: "",
        };

        this.reset_state = {
            servidor: null,
            veiculo_servidor: null,
            visita_servidor: null,
        };

    }

    send_to_server = () => {
        const {menu_progress, communication_status, ...data} = this.state;

        const header = new Headers();
        header.set("content-type", "application/json");

        fetch(this.props.backendAddr + "/visita_servidor", {
            headers: header,
            credentials: "include",
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
        }).then( res =>{
            if (res.status === 200){
                this.setState({ ...this.reset_state, communication_status: "Dados enviados com sucesso!"} );
            } else {
                this.setState({
                    communication_status: "Não foi possível cadastrar esses dados. Verifica que se todos os campos estão preenchidos corretamente."
                });
            }
        }).catch( err => {
            this.setState({
                communication_status: "Erro ao comunicar com o servidor. Verifique sua conexão com a rede."
            });
        });
    };

    delta_progress = (val) => this.setState((state, props) => {
        return {menu_progress: state.menu_progress + val};
    });


    inc_progress = () => this.setState((state, props) => {
        return this.delta_progress(+1);
    });

    dec_progress = () => this.setState((state, props) => {
        return this.delta_progress(-1);
    });

    restart_menu = () => {
        this.setState({menu_progress: 1});
    }

    render = () => {
        switch(this.state.menu_progress){
        case 1:
            return (
                <AgentRegisterEmployeeServidor
                    onSave={ data => this.setState({servidor: data}) }
                    onInitialValues={ () => this.state.servidor }
                    backendAddr={this.props.backendAddr}
                    onNext={ this.inc_progress }>
                </AgentRegisterEmployeeServidor>);
        case 2:
            return (
                <AgentRegisterEmployeeServidorVeiculo
                    onSave={ data => this.setState({veiculo_servidor: data}) }
                    onInitialValues={ () => this.state.veiculo_servidor }
                    backendAddr={this.props.backendAddr}
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterEmployeeServidorVeiculo>
            );
        case 3:
            return (
                <AgentRegisterEmployeeServidorVisita
                    onSave={ data => this.setState({visita_servidor: data}) }
                    onInitialValues={ () => this.state.visita_servidor }
                    backendAddr={this.props.backendAddr}
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterEmployeeServidorVisita>);
        case 4:
            {this.send_to_server()}
            {this.inc_progress()}

        case 5:
            return(
                <div className="container">
                    <h2>{this.state.communication_status}</h2>
                    <button className="btn btn-primary" onClick={this.restart_menu}>Continuar</button>
                </div>
            );
        default:
            { this.restart_menu() };
        }
    };
};