import React, { Component } from "react";

export class AgentRegisterStudentAlunoVisita extends Component{
    constructor(props){
        super(props);
        this.state= {
            objetivo: "",
            data: "",
            frequencia: "",
            duracao: "",
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
        const student_visit = {
            objetivo: this.state.objetivo,
            data: this.state.data,
            frequencia: this.state.frequencia,
            duracao: this.state.duracao,
            horario_inicio: this.state.horario_inicio,
            horario_fim: this.state.horario_fim,
        }

        this.props.onSave(student_visit);
    };

    render = () => {
        return (
            <div className="container">
            <div className="row">
                <h1>Dados do visita...</h1>
            </div>

            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="estudante_data">Data</label>
                    <input
                        type="date" id="estudante_data" ref={ this.estudante_data } className="form-control" placeholder="Digite a data de início do evento..."
                        value={this.state.data} onChange={e=>this.setState({data: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: 01/01/2011</small>
                </div>

                <div className="form-group col-6">
                    <label htmlFor="estudante_duracao">Duração</label>
                    <input
                        type="text" id="estudante_duracao" ref={this.estudante_duracao} className="form-control" placeholder="Digite a duração do evento..."
                        value={this.state.duracao} onChange={e=>this.setState({duracao: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: Dois dias, Três semanas...</small>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="estudante_horario_inicio">Horário de Inicio</label>
                    <input
                        type="time" id="estudante_horario_inicio" ref={this.estudante_horario_inicio} className="form-control" placeholder="Digite o horário de início da visita..."
                        value={this.state.horario_inicio} onChange={e=>this.setState({horario_inicio: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: 13:30, 1:30 PM</small>
                </div>

                <div className="form-group col-6">
                    <label htmlFor="estudante_horario_fim">Horário de Término</label>
                    <input
                        type="time" id="estudante_horario_fim" ref={this.estudante_horario_fim} className="form-control" placeholder="Digite o horário de termino da visita..."
                        value={this.state.horario_fim} onChange={e=>this.setState({horario_fim: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: 18:30, 6:30 PM</small>
                </div>
            </div>

            <div className="row">
                <div className="form-group col">
                    <label htmlFor="estudante_frequencia">Frequência das visitas</label>
                    <input
                        type="text" id="estudante_frequencia" ref={this.estudante_frequencia} className="form-control" placeholder="Digite a frequência das visitas..."
                        value={this.state.frequencia} onChange={e=>this.setState({frequencia: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: Todos os dias, A cada dois dias</small>
                </div>
            </div>

            <div className="row">
                <div className="form-group col">
                    <label htmlFor="estudante_objetivo">Objetivo</label>
                    <input
                        type="textarea" id="estudante_objetivo" ref={this.estudante_objetivo} className="form-control" placeholder="Digite o objetivo da visita..."
                        value={this.state.objetivo} onChange={e=>this.setState({objetivo: e.target.value})}>
                        </input>
                    <small className="form-text text-muted">Ex: Rua Foo Bar, Número 00</small>
                </div>
            </div>

            <div className="row pt-3">
            <div className="col-6">
                    <button className="btn btn-secondary float-left" onClick={()=>{ this.save_data(); this.props.onBack(); }}>Voltar</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-success float-right" onClick={()=>{ this.save_data(); this.props.onNext(); }}>Finalizar</button>
                </div>
            </div>

            <div className="footer"></div>
        </div>
        );
    };
};