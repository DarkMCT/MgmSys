import React, { Component } from "react";

export class AgentRegisterEmployeeServidorVeiculo extends Component{
    constructor(props){
        super(props);
        this.state= {
            modelo: "",
            cor: "",
            placa: "",

            readonly: true,
        };

        this.veiculo_modelo = React.createRef();
        this.veiculo_cor = React.createRef();
        this.veiculo_placa = React.createRef();
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();
        if (initial_data != null)
            this.setState({...initial_data});

        console.log(initial_data);
    }

    save_data = () => {
        const veiculo = {
            modelo: this.state.modelo,
            cor: this.state.cor,
            placa: this.state.placa,
        }

        this.props.onSave(veiculo);
    };

    search = ()=>{
        let placa = this.state.placa.replace(/(\.|-)/g, "");

        if (placa.length === 7){
            const header = new Headers();
            header.set("content-type", "application/json");

            fetch(this.props.backendAddr + "/visita_servidor/search", {
                headers: header,
                credentials: "include",
                method: "POST",
                mode: "cors",
                body: JSON.stringify({placa: placa, what: "PLACA"}),
            }).then( res =>{
                return res.json();
            }).then( data => {
                if (Object.keys(data).length > 0) {
                    this.setState({...data, readonly: true});
                } else {
                    this.setState({ readonly: false });
                }
            })
            .catch( err => {
                this.setState({readonly: false});
            });

        } else {
            this.setState({readonly: false});
        }
    }

    render = () => {
        return (
            <div className="container">
            <div className="row">
                <h1>Dados do veículo...</h1>
            </div>

            <div className="row justify-content-center">
                <div className="form-group col-6">
                    <label htmlFor="veiculo_placa">Placa</label>
                    <input
                        type="text" id="veiculo_placa" ref={ this.veiculo_placa } className="form-control" placeholder="Digite a placa do veículo..."
                        value={this.state.placa} onBlur={this.search} onChange={e=>this.setState({placa: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: AAA0000, AAA-0000</small>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="veiculo_cor">Cor</label>
                    <input
                        type="text" id="veiculo_cor" ref={this.veiculo_cor} className="form-control" placeholder="Digite a cor do veículo..."
                        value={this.state.cor} readOnly={this.state.readonly} onChange={e=>this.setState({cor: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: Branco, Preto</small>
                </div>

                <div className="form-group col-6">
                    <label htmlFor="veiculo_modelo">Modelo</label>
                    <input
                        type="text" id="veiculo_modelo" ref={this.veiculo_modelo} className="form-control" placeholder="Digite o modelo do veículo..."
                        value={this.state.modelo} readOnly={this.state.readonly} onChange={e=>this.setState({modelo: e.target.value})}>
                    </input>
                    <small className="form-text text-muted">Ex: Sedan, Hatch</small>
                </div>
            </div>

            <div className="row pt-3">
            <div className="col-6">
                    <button className="btn btn-secondary float-left" onClick={()=>{ this.save_data(); this.props.onBack(); }}>Voltar</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-success float-right" onClick={()=>{ this.save_data(); this.props.onNext(); }}>Avançar</button>
                </div>
            </div>

            <div className="footer"></div>
        </div>
        );
    };
};