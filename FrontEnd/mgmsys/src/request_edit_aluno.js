import React, { Component } from "react"

import { date_parse } from "./utility";


export class RequestEditAluno extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount = ()=> {
        if (this.props.data != null)  {
            const visita_aluno = this.props.data;
            this.setState({...visita_aluno})
            console.log({...visita_aluno});
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

    render = ()=>{
        if (!this.state.visita_aluno) return (<div></div>);

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
            </div>
        );
    }
}