import React, { Component } from "react"

import { date_parse, check_changed_fields, deep_copy } from "./utility";
import { make_request } from "./request";

export class RequestEditServidor extends Component {
    constructor(props){
        super(props);
        this.state = {

        };

        this.original_data = null;
    }

    componentDidMount = ()=> {
        if (this.props.data != null)  {
            const visita_servidor = this.props.data;
            this.setState({...visita_servidor})
            this.original_data = deep_copy(visita_servidor);
            console.log({...visita_servidor});
        }
    }

    make_input = (object, field, type, value) => {
        return <input
            type={type}
            className="form-control"
            value={value}
            onChange={e =>{
                let update_state = {};
                update_state[object] = this.state[object];
                update_state[object][field] = e.target.value;

                this.setState(update_state);
            }}>
        </input>;
    }

    send_to_server = () => {
        let visita_servidor = check_changed_fields(this.original_data, this.state);

        // add the id's to update on server
        if ("visita_servidor" in visita_servidor)
            visita_servidor["visita_servidor"]["id_visita_servidor"] = this.original_data["visita_servidor"]["id_visita_servidor"];
        if ("servidor" in visita_servidor)
            visita_servidor["servidor"]["id_servidor"] = this.original_data["servidor"]["id_servidor"];
        if ("veiculo_servidor" in visita_servidor)
            visita_servidor["veiculo_servidor"]["id_veiculo_servidor"] = this.original_data["veiculo_servidor"]["id_veiculo_servidor"];

        make_request("/visita_servidor", "PATCH", JSON.stringify(visita_servidor))
        .then(res => {
            if (res.status === 200){
                this.setState({message: "Dados alterados com sucesso!"});
            } else {
                this.setState({message: "Não foi possível alterar os dados. Verifique se os campos estão preenchidos corretamente."});
            }
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }

    render = ()=>{
        if (!this.state.visita_servidor) return (<div></div>);

        if ("message" in this.state) {
            return (
                <div className="container">
                    <h3>{ this.state.message }</h3>
                    <div className="row pt-3">
                        <div className="col-6">
                            <button className="btn btn-secondary float-left" onClick={ this.props.onBack }>Voltar</button>
                        </div>
                        <div className="col-6">
                            {/* <button className="btn btn-success float-right" onClick={ this.send_to_server }>Salvar alterações</button> */}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center" scope="col" colSpan="2">Visita</th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Data (Início)</th>
                            <td>{ this.make_input("visita_servidor", "data", "date", date_parse(this.state.visita_servidor.data_inicio)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Data (Término)</th>
                            <td>{ this.make_input("visita_servidor", "data", "date", date_parse(this.state.visita_servidor.data_fim)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Frequência</th>
                            <td>{ this.make_input("visita_servidor", "frequencia", "text", this.state.visita_servidor.frequencia) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Início)</th>
                            <td>{ this.make_input("visita_servidor", "horario_inicio", "time", this.state.visita_servidor.horario_inicio) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Fim)</th>
                            <td>{ this.make_input("visita_servidor", "horario_fim", "time", this.state.visita_servidor.horario_fim) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Objetivo</th>
                            <td>{ this.make_input("visita_servidor", "objetivo", "text", this.state.visita_servidor.objetivo) }</td>
                        </tr>
                    </tbody>
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center" scope="col" colSpan="2">Servidor</th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nome</th>
                            <td>{ this.make_input("servidor", "nome", "text", this.state.servidor.nome) }</td>
                        </tr>
                        <tr>
                            <th scope="row">SIAPE</th>
                            <td>{ this.make_input("servidor", "siape", "text", this.state.servidor.siape) }</td>
                        </tr>
                        <tr>
                            <th scope="row">RG</th>
                            <td>{ this.make_input("servidor", "rg", "text", this.state.servidor.rg) }</td>
                        </tr>
                        <tr>
                            <th scope="row">CPF</th>
                            <td>{ this.make_input("servidor", "cpf", "text", this.state.servidor.cpf) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{ this.make_input("servidor", "email", "text", this.state.servidor.email) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                            <td>{ this.make_input("servidor", "telefone", "text", this.state.servidor.telefone) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Data nasc.</th>
                            <td>{ this.make_input("servidor", "dt_nasc", "date", date_parse(this.state.servidor.dt_nasc)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Endereço</th>
                            <td>{ this.make_input("servidor", "endereco", "text", this.state.servidor.endereco) }</td>
                        </tr>
                    </tbody>

                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center" scope="col" colSpan="2">Veículo</th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th scope="row">Placa</th>
                            <td>{ this.state.veiculo_servidor && this.make_input("veiculo_servidor", "placa", "text", this.state.veiculo_servidor.placa) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Modelo</th>
                            <td>{ this.state.veiculo_servidor && this.make_input("veiculo_servidor", "modelo", "text", this.state.veiculo_servidor.modelo) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Cor</th>
                            <td>{ this.state.veiculo_servidor && this.make_input("veiculo_servidor", "cor", "text", this.state.veiculo_servidor.cor) }</td>
                        </tr>
                    </tbody>
                </table>

                <div className="row pt-3">
                <div className="col-6">
                        <button className="btn btn-secondary float-left" onClick={ this.props.onBack }>Voltar</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success float-right" onClick={ this.send_to_server }>Salvar alterações</button>
                    </div>
                </div>
            </div>
        );
    }
}