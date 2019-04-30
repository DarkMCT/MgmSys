import React, { Component } from "react"

import { date_parse, check_changed_fields, deep_copy } from "./utility";
import { make_request } from "./request";


export class RequestEditAluno extends Component {
    constructor(props){
        super(props);
        this.state = {

        };

        this.original_data = null;
    }

    componentDidMount = ()=> {
        if (this.props.data != null)  {
            const visita_aluno = this.props.data;
            this.setState({...visita_aluno});
            this.original_data = deep_copy(visita_aluno);
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
        let visita_aluno = check_changed_fields(this.original_data, this.state);

        if ("visita_aluno" in visita_aluno)
            visita_aluno["visita_aluno"]["id_visita_aluno"] = this.original_data["visita_aluno"]["id_visita_aluno"];
        if ("aluno" in visita_aluno)
            visita_aluno["aluno"]["id_aluno"] = this.original_data["aluno"]["id_aluno"];

        make_request("/visita_aluno", "PATCH", JSON.stringify(visita_aluno))
        .then(res => {
            if (res.status === 200){
                this.setState({message: "Dados alterados com sucesso!"});
            } else {
                this.setState({message: "Não foi possível alterar os dados. Verifique se os campos estão preenchidos corretamente."});
            }
        })
        .catch(err => {
            this.setState({message: "Um erro ocorreu! Tente novamente."})
        });
    }

    render = ()=>{
        if (!this.state.visita_aluno) return <div></div>;

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
                            <th scope="row">Data</th>
                            <td>{ this.make_input("visita_aluno", "data", "date", date_parse(this.state.visita_aluno.data)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Frequência</th>
                            <td>{ this.make_input("visita_aluno", "frequencia", "text", this.state.visita_aluno.frequencia) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Duração</th>
                            <td>{ this.make_input("visita_aluno", "duracao", "text", this.state.visita_aluno.duracao) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Início)</th>
                            <td>{ this.make_input("visita_aluno", "horario_inicio", "time", this.state.visita_aluno.horario_inicio) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Fim)</th>
                            <td>{ this.make_input("visita_aluno", "horario_fim", "time", this.state.visita_aluno.horario_fim) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Objetivo</th>
                            <td>{ this.make_input("visita_aluno", "objetivo", "text", this.state.visita_aluno.objetivo) }</td>
                        </tr>
                    </tbody>
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center" scope="col" colSpan="2">Aluno</th>
                        </tr>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nome</th>
                            <td>{ this.make_input("aluno", "nome", "text", this.state.aluno.nome) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Matrícula</th>
                            <td>{ this.make_input("aluno", "matricula", "text", this.state.aluno.matricula) }</td>
                        </tr>
                        <tr>
                            <th scope="row">RG</th>
                            <td>{ this.make_input("aluno", "rg", "text", this.state.aluno.rg) }</td>
                        </tr>
                        <tr>
                            <th scope="row">CPF</th>
                            <td>{ this.make_input("aluno", "cpf", "text", this.state.aluno.cpf) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{ this.make_input("aluno", "email", "email", this.state.aluno.email) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                            <td>{ this.make_input("aluno", "telefone", "text", this.state.aluno.telefone) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Data nasc.</th>
                            <td>{ this.make_input("aluno", "dt_nasc", "date", date_parse(this.state.aluno.dt_nasc)) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Endereço</th>
                            <td>{ this.make_input("aluno", "endereco", "text", this.state.aluno.endereco) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Curso</th>
                            <td>{ this.make_input("aluno", "curso", "text", this.state.aluno.curso) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Semestre</th>
                            <td>{ this.make_input("aluno", "semestre", "text", this.state.aluno.semestre) }</td>
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