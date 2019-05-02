import React, { Component } from "react"

import {format_date} from "./utility";

export class RequestDetailVisitante extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount = ()=> {
        if (this.props.data != null)  {
            const visita_visitante = this.props.data;
            this.setState({...visita_visitante})
            console.log({...visita_visitante});
        }
    }

    render = ()=>{
        if (!this.state.visita_visitante) return (<div></div>);

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
                            <td>{format_date(this.state.visita_visitante.data_inicio)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Data (Término)</th>
                            <td>{format_date(this.state.visita_visitante.data_fim)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Frequência</th>
                            <td>{this.state.visita_visitante.frequencia}</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Início)</th>
                            <td>{this.state.visita_visitante.horario_inicio}</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Fim)</th>
                            <td>{this.state.visita_visitante.horario_fim}</td>
                        </tr>
                        <tr>
                            <th scope="row">Objetivo</th>
                            <td>{this.state.visita_visitante.objetivo}</td>
                        </tr>
                    </tbody>
                    <thead className="thead-dark">
                        <tr>
                            <th
                                className="text-center"
                                scope="col"
                                colSpan="2">
                                Visitante
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nome</th>
                            <td>{this.state.visitante.nome}</td>
                        </tr>
                        <tr>
                            <th scope="row">RG</th>
                            <td>{this.state.visitante.rg}</td>
                        </tr>
                        <tr>
                            <th scope="row">CPF</th>
                            <td>{this.state.visitante.cpf}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{this.state.visitante.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                            <td>{this.state.visitante.telefone}</td>
                        </tr>
                        <tr>
                            <th scope="row">Data nasc.</th>
                            <td>{format_date(this.state.visitante.dt_nasc)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Endereço</th>
                            <td>{this.state.visitante.endereco}</td>
                        </tr>
                    </tbody>
                    <thead className="thead-dark">
                        <tr>
                            <th
                                className="text-center"
                                scope="col"
                                colSpan="2">
                                Empresa
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nome</th>
                            <td>{this.state.empresa.nome}</td>
                        </tr>
                        <tr>
                            <th scope="row">CEP</th>
                            <td>{this.state.empresa.cep}</td>
                        </tr>
                        <tr>
                            <th scope="row">CNPJ</th>
                            <td>{this.state.empresa.cnpj}</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                            <td>{this.state.empresa.telefone}</td>
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
                            <td>{this.state.veiculo_visitante && this.state.veiculo_visitante.placa}</td>
                        </tr>
                        <tr>
                            <th scope="row">Modelo</th>
                            <td>{this.state.veiculo_visitante && this.state.veiculo_visitante.modelo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Cor</th>
                            <td>{this.state.veiculo_visitante && this.state.veiculo_visitante.cor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}