import React, { Component } from "react";
import { AgentRegisterStudentAluno } from "./agent_register_student_aluno";
import { AgentRegisterStudentAlunoVisita } from "./agent_register_student_aluno_visita";
import { make_request } from "./request";

export class AgentRegisterStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno: null,

            visita_aluno: null,

            menu_progress: 1,

            communication_status: ""
        };

        this.reset_state = {
            aluno: null,

            visita_aluno: null,
        };
    }

    send_to_server = () => {
        const {menu_progress, communication_status, ...data} = this.state;

        make_request(
            "/visita_aluno",
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
                <AgentRegisterStudentAluno
                    onSave={ data => this.setState({aluno: data}) }
                    onInitialValues={ () => this.state.aluno }
                    backendAddr={this.props.backendAddr}
                    onNext={ this.inc_progress }>
                </AgentRegisterStudentAluno>);
        case 2:
            return (
                <AgentRegisterStudentAlunoVisita
                    onSave={ data => this.setState({visita_aluno: data}) }
                    onInitialValues={ () => this.state.visita_aluno }
                    backendAddr={this.props.backendAddr}
                    onBack={ this.dec_progress }
                    onNext={ this.inc_progress }>
                </AgentRegisterStudentAlunoVisita>);

        case 3:
            {this.send_to_server()}
            {this.inc_progress()}

        case 4:
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