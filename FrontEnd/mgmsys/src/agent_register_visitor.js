import React, { Component } from "react";
import { AgentRegisterVisitorVisitante } from "./agent_register_visitor_visitante";
import { AgentRegisterVisitorVisitanteVeiculo } from "./agent_register_visitor_visitante_veiculo";
import { AgentRegisterVisitorVisitanteVisita } from "./agent_register_visitor_visitante_visita";
import { AgentRegisterVisitorEmpresa } from "./agent_register_visitor_empresa";
import { make_request } from "./request";

export class AgentRegisterVisitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitante: null,

            veiculo_visitante: null,

            empresa: null,

            visita_visitante: null,

            menu_progress: 1,

            communication_status: "",
        };

        this.reset_state = {
            visitante: null,

            veiculo_visitante: null,

            empresa: null,

            visita_visitante: null,
        };
    }

    send_to_server = () => {
        const {menu_progress, communication_status, ...data} = this.state;

        make_request(
            "/visita_visitante",
            "POST",
            JSON.stringify(data)
        ).then( res =>{
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

                <AgentRegisterVisitorVisitante
                    onSave={ data => this.setState({visitante: data}) }
                    onInitialValues={ () => this.state.visitante }
                    backendAddr={this.props.backendAddr}
                    onNext={ this.inc_progress }>
                </AgentRegisterVisitorVisitante>);
        case 2:
            return (
                <AgentRegisterVisitorVisitanteVeiculo
                    onSave={ data => this.setState({veiculo_visitante: data}) }
                    onInitialValues={ () => this.state.veiculo_visitante }
                    backendAddr={this.props.backendAddr}
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterVisitorVisitanteVeiculo>);
        case 3:
            return (
                <AgentRegisterVisitorEmpresa
                    onSave={ data => this.setState({empresa: data}) }
                    onInitialValues={ () => this.state.empresa }
                    backendAddr={this.props.backendAddr}
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterVisitorEmpresa>
            );
        case 4:

            return (
                <AgentRegisterVisitorVisitanteVisita
                    onSave={ data => this.setState({visita_visitante: data}) }
                    onInitialValues={ () => this.state.visita_visitante }
                    backendAddr={this.props.backendAddr}
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterVisitorVisitanteVisita>
            );
        case 5:
                {this.send_to_server()}
                {this.inc_progress()}
                case 6:
                return(
                    <div className="container">
                <h2>{this.state.communication_status}</h2>
                <button className="btn btn-primary" onClick={this.restart_menu}>Continuar</button>
            </div>);
        default:
            {this.restart_menu()}
        }
    };
};