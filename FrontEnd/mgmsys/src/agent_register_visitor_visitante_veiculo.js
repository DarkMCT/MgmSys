import React, { Component } from "react";
import { make_request } from "./request";

export class AgentRegisterVisitorVisitanteVeiculo extends Component{
    constructor(props){
        super(props);
        this.state= {
            modelo: "",
            cor: "",
            placa: "",

            visita_com_veiculo: false,
            readonly: true,
        };
    }

    search = ()=>{
        let placa = this.state.placa.replace(/(\.|-)/g, "");

        if (placa.length === 7){
            make_request(
                "/visita_visitante/search",
                "POST",
                JSON.stringify({placa: placa, what: "PLACA"})
            ).then( res =>{
                return res.json();
            }).then( data => {
                if (Object.keys(data).length > 0) {
                    this.setState({...data, readonly: true});
                } else {
                    this.setState({ readonly: false });
                }
            })
            .catch( err => {
                this.setState({ readonly: false});
            });

        } else {
            this.setState({ readonly: false});
        }
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();

        if (initial_data != null) {
            const with_vehicle = initial_data.placa != null &&
                initial_data.placa.length > 0;

            this.setState({
                ...initial_data,
                visita_com_veiculo: with_vehicle,
            });
        }
    }

    remove_mark_sings = (str) => {
        return str.replace(/(\.|\/|-|\/)/g, "");
    }

    save_data = () => {
        const veiculo_visitante = this.state.visita_com_veiculo ? {
            modelo: this.state.modelo,
            cor: this.state.cor,
            placa: this.state.placa,
        } : null;

        this.props.onSave(veiculo_visitante);
    };

    change_state_vehicle_state = (value) => {
        const ro = !value ? true: this.state.readonly;
        this.setState({ visita_com_veiculo: value, readonly: ro });
    }


    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dados do veículo...</h1>
                </div>

                <div className="row justify-content-center">
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="visita-veiculo"
                            checked={!this.state.visita_com_veiculo}
                            onChange={ ()=>this.change_state_vehicle_state(false)}/>
                        <label
                            className="form-check-label">
                            Sem veículo
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="visita-veiculo"
                            checked={this.state.visita_com_veiculo}
                            onChange={ ()=>this.change_state_vehicle_state(true)}>
                        </input>
                        <label
                            className="form-check-label">
                            Com veículo
                        </label>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="form-group col-6">
                        <label htmlFor="veiculo_placa">Placa</label>
                        <input
                            type="text"
                            id="veiculo_placa"
                            className="form-control"
                            placeholder="Digite a placa do veículo..."
                            value={this.state.placa}
                            readOnly={!this.state.visita_com_veiculo}
                            onBlur={this.search}
                            onChange={e=>this.setState({placa: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: AAA-0000, AAA0000
                        </small>
                    </div>
                </div>

                <div className="row">
                <div className="form-group col-6">
                        <label htmlFor="veiculo_modelo">Modelo</label>
                        <input
                            type="text"
                            id="veiculo_modelo"
                            ref={this.veiculo_modelo}
                            className="form-control"
                            placeholder="Digite o modelo do veículo..."
                            value={this.state.modelo}
                            readOnly={this.state.readonly}
                            onChange={e=>this.setState({modelo: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: Sedan, Hatch
                        </small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="veiculo_cor">Cor</label>
                        <input
                            type="text"
                            id="veiculo_cor"
                            className="form-control"
                            placeholder="Digite a cor do veículo..."
                            value={this.state.cor}
                            readOnly={this.state.readonly}
                            onChange={e=>this.setState({cor: e.target.value})}>
                        </input>
                        <small
                            className="form-text text-muted">
                            Ex: Branco, Preto
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
                            Avançar
                        </button>
                    </div>
                </div>

                <div className="footer"></div>
            </div>
        );
    };
};