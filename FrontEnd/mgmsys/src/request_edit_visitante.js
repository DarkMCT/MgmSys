import React, { Component } from "react";

import { date_parse, check_changed_fields, deep_copy } from "./utility";
import { make_request } from "./request";

export class RequestEditVisitante extends Component {
    constructor(props){
        super(props);
        this.state = {

        };

        this.original_data = null;
    }

    componentDidMount = ()=> {
        if (this.props.data != null)  {
            const visita_visitante = this.props.data;
            this.setState({...visita_visitante})
            this.original_data = deep_copy(visita_visitante);
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

// TODO
// --edit this request
// --create a handle on server
    send_to_server = () => {
        let visita_visitante = check_changed_fields(this.original_data, this.state);

        if ("visita_visitante" in visita_visitante)
            visita_visitante["visita_visitante"]["id_visita_visitante"] =
                this.original_data["visita_visitante"]["id_visita_visitante"];

        if ("visitante" in visita_visitante)
            visita_visitante["visitante"]["id_visitante"] =
                this.original_data["visitante"]["id_visitante"];

        if ("veiculo_visitante" in visita_visitante)
            visita_visitante["veiculo_visitante"]["id_veiculo_visitante"] =
                this.original_data["veiculo_visitante"]["id_veiculo_visitante"];

        if ("empresa" in visita_visitante)
            visita_visitante["empresa"]["id_empresa"] =
                this.original_data["empresa"]["id_empresa"];

        make_request("/visita_visitante", "PATCH", JSON.stringify(visita_visitante))
        .then(res => {
            if (res.status === 200) {
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
        if (!this.state.visita_visitante) return (<div></div>);

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
                            <td>{ this.make_input("visita_visitante", "data_inicio", "date", date_parse(this.state.visita_visitante.data_inicio)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Data (Término)</th>
                            <td>{ this.make_input("visita_visitante", "data_fim", "date", date_parse(this.state.visita_visitante.data_fim)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Frequência</th>
                            <td>{ this.make_input("visita_visitante", "frequencia", "text", this.state.visita_visitante.frequencia) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Início)</th>
                            <td>{ this.make_input("visita_visitante", "horario_inicio", "time", this.state.visita_visitante.horario_inicio) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Fim)</th>
                            <td>{ this.make_input("visita_visitante", "horario_fim", "time", this.state.visita_visitante.horario_fim) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Objetivo</th>
                            <td>{ this.make_input("visita_visitante", "objetivo", "text", this.state.visita_visitante.objetivo) }</td>
                        </tr>
                    </tbody>
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center" scope="col" colSpan="2">Visitante</th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nome</th>
                            <td>{ this.make_input("visitante", "nome", "text", this.state.visitante.nome) }</td>
                        </tr>
                        <tr>
                            <th scope="row">RG</th>
                            <td>{ this.make_input("visitante", "rg", "text", this.state.visitante.rg) }</td>
                        </tr>
                        <tr>
                            <th scope="row">CPF</th>
                            <td>{ this.make_input("visitante", "cpf", "text", this.state.visitante.cpf) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{ this.make_input("visitante", "email", "text", this.state.visitante.email) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                        <td>{ this.make_input("visitante", "telefone", "text", this.state.visitante.telefone) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Data nasc.</th>
                            <td>{ this.make_input("visitante", "dt_nasc", "date", date_parse(this.state.visitante.dt_nasc)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Endereço</th>
                            <td>{ this.make_input("visitante", "endereco", "text", this.state.visitante.endereco) }</td>
                        </tr>
                    </tbody>
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center" scope="col" colSpan="2">Empresa</th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nome</th>
                            <td>{ this.make_input("empresa", "nome", "text", this.state.empresa.nome) }</td>
                        </tr>
                        <tr>
                            <th scope="row">CEP</th>
                            <td>{ this.make_input("empresa", "cep", "text", this.state.empresa.cep) }</td>
                        </tr>
                        <tr>
                            <th scope="row">CNPJ</th>
                            <td>{ this.make_input("empresa", "cnpj", "text", this.state.empresa.cnpj) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                            <td>{ this.make_input("empresa", "telefone", "text", this.state.empresa.telefone) }</td>
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
                            <td>{ this.state.veiculo_visitante && this.make_input("veiculo_visitante", "placa", "text", this.state.veiculo_visitante.placa) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Modelo</th>
                            <td>{ this.state.veiculo_visitante && this.make_input("veiculo_visitante", "modelo", "text", this.state.veiculo_visitante.modelo) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Cor</th>
                            <td>{ this.state.veiculo_visitante && this.make_input("veiculo_visitante", "cor", "text", this.state.veiculo_visitante.cor) }</td>
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