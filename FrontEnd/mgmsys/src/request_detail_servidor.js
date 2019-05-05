import React, { Component } from "react"

import { format_date } from "./utility";

export class RequestDetailServidor extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount = ()=> {
        if (this.props.data != null)  {
            const visita_servidor = this.props.data;
            this.setState({...visita_servidor})
        }
    }

    render = ()=>{
        if (!this.state.visita_servidor) return (<div></div>);

        return (
            <div className="container">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th
                                className="text-center"
                                scope="col"
                                colSpan="2">
                                Visita
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Data (Início)</th>
                            <td>{format_date(this.state.visita_servidor.data_inicio)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Data (Fim)</th>
                            <td>{format_date(this.state.visita_servidor.data_fim)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Frequência</th>
                            <td>{this.state.visita_servidor.frequencia}</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Início)</th>
                            <td>{this.state.visita_servidor.horario_inicio}</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Fim)</th>
                            <td>{this.state.visita_servidor.horario_fim}</td>
                        </tr>
                        <tr>
                            <th scope="row">Objetivo</th>
                            <td>{this.state.visita_servidor.objetivo}</td>
                        </tr>
                    </tbody>
                    <thead className="thead-dark">
                        <tr>
                            <th
                                className="text-center"
                                scope="col"
                                colSpan="2">
                                Servidor
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
                            <td>{this.state.servidor.nome}</td>
                        </tr>
                        <tr>
                            <th scope="row">SIAPE</th>
                            <td>{this.state.servidor.siape}</td>
                        </tr>
                        <tr>
                            <th scope="row">RG</th>
                            <td>{this.state.servidor.rg}</td>
                        </tr>
                        <tr>
                            <th scope="row">CPF</th>
                            <td>{this.state.servidor.cpf}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{this.state.servidor.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                            <td>{this.state.servidor.telefone}</td>
                        </tr>
                        {/* <tr>
                            <th scope="row">Data nasc.</th>
                            <td>{format_date(this.state.servidor.dt_nasc)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Endereço</th>
                            <td>{this.state.servidor.endereco}</td>
                        </tr> */}
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
                            <td>{this.state.veiculo_servidor && this.state.veiculo_servidor.placa}</td>
                        </tr>
                        <tr>
                            <th scope="row">Modelo</th>
                            <td>{this.state.veiculo_servidor && this.state.veiculo_servidor.modelo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Cor</th>
                            <td>{this.state.veiculo_servidor && this.state.veiculo_servidor.cor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}