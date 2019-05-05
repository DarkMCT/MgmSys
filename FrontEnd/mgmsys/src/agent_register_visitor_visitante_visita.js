import React, { Component } from "react";

export class AgentRegisterVisitorVisitanteVisita extends Component{
    constructor(props){
        super(props);
        this.state = {
            objetivo: "",
            data_inicio: "",
            data_fim: "",
            frequencia: "Diário",
            pernoite: false,
            horario_inicio: "",
            horario_fim: "",
        };

        this.initial_data = {};
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();
        if (initial_data != null) {
            this.setState({...initial_data});
            console.log(initial_data);
        }
    }

    remove_mark_sings = (str) => {
        return str.replace(/(\.|\/|-|\/)/g, "");
    }

    save_data = () => {
        const visitante_visita = {
            objetivo: this.state.objetivo,
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim,
            frequencia: this.state.frequencia,
            pernoite: this.state.pernoite,
            horario_inicio: this.state.horario_inicio,
            horario_fim: this.state.horario_fim,
        }

        this.props.onSave(visitante_visita);
    };

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dados da visita...</h1>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="data_inicio">Data (Início)</label>
                        <input
                            type="date" id="data_inicio" className="form-control" placeholder="Digite a data de início do evento..."
                            value={this.state.data_inicio} onChange={e=>this.setState({data_inicio: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 01/01/2011</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="data_fim">Data (Término)</label>
                        <input
                            type="date" id="data_fim" className="form-control" placeholder="Digite a data de término do evento..."
                            value={this.state.data_fim} onChange={e=>this.setState({data_fim: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 06/01/2011</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="horario_inicio">Horário de Inicio</label>
                        <input
                            type="time" id="" ref={this.horario_inicio} className="form-control" placeholder="Digite o horário de início da visita..."
                            value={this.state.horario_inicio} onChange={e=>this.setState({horario_inicio: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 13:30, 1:30 PM</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="horario_inicio">Horário de Término</label>
                        <input
                            type="time" id="" ref={this.horario_fim} className="form-control" placeholder="Digite o horário de termino da visita..."
                            value={this.state.horario_fim} onChange={e=>this.setState({horario_fim: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 18:30, 6:30 PM</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="frequencia">Frequência das visitas</label>
                        <select
                            id="frequencia" className="form-control"
                            value={this.state.frequencia}
                            onChange={e=>this.setState({frequencia: e.target.value})}>
                            <option value={"Diário"}  key="1">Diário</option>
                            <option value={"Semanal"} key="2">Semanal</option>
                            <option value={"Mensal"}  key="3">Mensal</option>
                        </select>
                        <small className="form-text text-muted">Ex: Diário, Semanal</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="pernoite">Pernoite</label>
                        <select
                            id="pernoite" ref={this.pernoite} className="form-control"
                            value={this.state.pernoite} onChange={e=>this.setState({pernoite: e.target.value})}>
                            <option value={false} key="1">Não</option>
                            <option value={true}  key="2">Sim</option>
                        </select>
                        <small className="form-text text-muted">Ex: Sim, Não</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="objetivo">Objetivo</label>
                        <input
                            type="textarea" id="objetivo" ref={this.objetivo} className="form-control" placeholder="Digite o objetivo da visita..."
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