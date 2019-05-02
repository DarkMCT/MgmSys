import React, { Component } from "react";

export class AgentRegisterEmployeeServidorVisita extends Component{
    constructor(props){
        super(props);
        this.state= {
            objetivo: "",
            data_inicio: "",
            data_fim: "",
            frequencia: "",
            pernoite: false,
            horario_inicio: "",
            horario_fim: "",
        };
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();
        if (initial_data != null)
            this.setState({...initial_data});

    }

    save_data = () => {
        const visita_servidor = {
            objetivo: this.state.objetivo,
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim,
            frequencia: this.state.frequencia,
            pernoite: this.state.pernoite,
            horario_inicio: this.state.horario_inicio,
            horario_fim: this.state.horario_fim,
        }

        this.props.onSave(visita_servidor);
    };

    render = () => {
        return (
            <div className="container">
            <div className="row">
                <h1>Dados do visita...</h1>
            </div>

            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="visita_data_inicio">Data (Início)</label>
                    <input
                        type="date"
                        id="visita_data_inicio"
                        className="form-control"
                        placeholder="Digite a data de início do evento..."
                        value={this.state.data_inicio}
                        onChange={e=>this.setState({data_inicio: e.target.value})}>
                    </input>
                    <small
                        className="form-text text-muted">
                        Ex: 01/01/2011
                    </small>
                </div>

                <div className="form-group col-6">
                    <label htmlFor="visita_data_fim">Data (Término)</label>
                    <input
                        type="date"
                        id="visita_data_fim"
                        className="form-control"
                        placeholder="Digite a data de término do evento..."
                        value={this.state.data_fim}
                        onChange={e=>this.setState({data_fim: e.target.value})}>
                    </input>
                    <small
                        className="form-text text-muted">
                        Ex: 06/01/2011
                    </small>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="visita_horario_inicio">Horário de Inicio</label>
                    <input
                        type="time"
                        id="visita_horario_inicio"
                        className="form-control"
                        placeholder="Digite o horário de início da visita..."
                        value={this.state.horario_inicio}
                        onChange={e=>this.setState({horario_inicio: e.target.value})}>
                    </input>
                    <small
                        className="form-text text-muted">
                        Ex: 13:30, 1:30 PM
                    </small>
                </div>

                <div className="form-group col-6">
                    <label htmlFor="visita_horario_fim">Horário de Término</label>
                    <input
                        type="time"
                        id="visita_horario_fim"
                        className="form-control"
                        placeholder="Digite o horário de termino da visita..."
                        value={this.state.horario_fim}
                        onChange={e=>this.setState({horario_fim: e.target.value})}>
                    </input>
                    <small
                        className="form-text text-muted">Ex: 18:30, 6:30 PM
                    </small>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="visita_frequencia">Frequência das visitas</label>
                    <input
                        type="text"
                        id="visita_frequencia"
                        className="form-control"
                        placeholder="Digite a frequência das visitas..."
                        value={this.state.frequencia}
                        onChange={e=>this.setState({frequencia: e.target.value})}>
                    </input>
                    <small
                        className="form-text text-muted">
                        Ex: Todos os dias, A cada dois dias
                    </small>
                </div>

                <div className="form-group col-6">
                    <label htmlFor="visita_pernoite">Pernoite</label>
                    <select
                        id="visita_pernoite"
                        className="form-control"
                        value={this.state.pernoite}
                        onChange={e=>this.setState({pernoite: e.target.value})}>

                        <option value={false} key="1">Não</option>
                        <option value={true}  key="2">Sim</option>
                    </select>
                    <small
                        className="form-text text-muted">
                        Ex: Sim, Não
                    </small>
                </div>
            </div>

            <div className="row">
                <div className="form-group col">
                    <label htmlFor="visita_objetivo">Objetivo</label>
                    <input
                        type="textarea"
                        id="visita_objetivo"
                        className="form-control"
                        placeholder="Digite o objetivo da visita..."
                        value={this.state.objetivo}
                        onChange={e=>this.setState({objetivo: e.target.value})}>
                        </input>
                    <small
                        className="form-text text-muted">
                        Ex: Rua Foo Bar, Número 00
                    </small>
                </div>
            </div>

            <div className="row pt-3">
                <div className="col-6">
                    <button
                        className="btn btn-secondary float-left"
                        onClick={()=>{ this.save_data(); this.props.onBack(); }}>
                        Voltar
                    </button>
                </div>
                <div className="col-6">
                    <button
                        className="btn btn-success float-right"
                        onClick={()=>{ this.save_data(); this.props.onNext(); }}>
                        Finalizar
                    </button>
                </div>
            </div>

            <div className="footer"></div>
        </div>
        );
    };
};