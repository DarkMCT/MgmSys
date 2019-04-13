import React, { Component } from "react";
import { AgentRegisterEmployeeServidor } from "./agent_register_employee_servidor";
import { AgentRegisterEmployeeServidorVisita } from "./agent_register_employee_servidor_visita";
import { AgentRegisterEmployeeServidorVeiculo } from "./agent_register_employee_servidor_veiculo";

export class AgentRegisterEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            employee_vehicle: null,
            employee_visit: null,
            menu_progress: 1,
        };

    }

    search_employee = (rg_number) => {
        // verify if visitant is already registred
    };

    search_vehicle = (vehicle_plate) => {
        // verify if vehicle is already registred
    };

    send_to_server = () => {
        console.log("data sent");
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

    render = () => {
        switch(this.state.menu_progress){
        case 1:
            return (
                <AgentRegisterEmployeeServidor
                    onSave={ data => this.setState({employee: data}) }
                    onInitialValues={ () => this.state.employee }
                    onNext={ this.inc_progress }>
                </AgentRegisterEmployeeServidor>);
        case 2:
            return (
                <AgentRegisterEmployeeServidorVisita
                    onSave={ data => this.setState({employee_visit: data}) }
                    onInitialValues={ () => this.state.employee_visit }
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterEmployeeServidorVisita>);
        case 3:
        // Continuar aqui...
            return (
                <AgentRegisterEmployeeServidorVeiculo
                    onSave={ data => this.setState({employee_vehicle: data}) }
                    onInitialValues={ () => this.state.employee_vehicle }
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterEmployeeServidorVeiculo>
            );
        default:
            {this.send_to_server()}
            return(<div className="container">Dados enviados!</div>);
        }
    };
};