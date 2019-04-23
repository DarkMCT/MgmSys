import React, { Component } from "react"


export class RequestDetailAluno extends Component {
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
                            <td>{this.state.visita_aluno.data}</td>
                        </tr>
                        <tr>
                            <th scope="row">Frequência</th>
                            <td>{this.state.visita_aluno.frequencia}</td>
                        </tr>
                        <tr>
                            <th scope="row">Duração</th>
                            <td>{this.state.visita_aluno.duracao}</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Início)</th>
                            <td>{this.state.visita_aluno.horario_inicio}</td>
                        </tr>
                        <tr>
                            <th scope="row">Horário (Fim)</th>
                            <td>{this.state.visita_aluno.horario_fim}</td>
                        </tr>
                        <tr>
                            <th scope="row">Objetivo</th>
                            <td>{this.state.visita_aluno.objetivo}</td>
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
                            <td>{this.state.aluno.nome}</td>
                        </tr>
                        <tr>
                            <th scope="row">Matrícula</th>
                            <td>{this.state.aluno.matricula}</td>
                        </tr>
                        <tr>
                            <th scope="row">RG</th>
                            <td>{this.state.aluno.rg}</td>
                        </tr>
                        <tr>
                            <th scope="row">CPF</th>
                            <td>{this.state.aluno.cpf}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{this.state.aluno.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Telefone</th>
                            <td>{this.state.aluno.telefone}</td>
                        </tr>
                        <tr>
                            <th scope="row">Data nasc.</th>
                            <td>{this.state.aluno.dt_nasc}</td>
                        </tr>
                        <tr>
                            <th scope="row">Endereço</th>
                            <td>{this.state.aluno.endereco}</td>
                        </tr>
                        <tr>
                            <th scope="row">Curso</th>
                            <td>{this.state.aluno.curso}</td>
                        </tr>
                        <tr>
                            <th scope="row">Semestre</th>
                            <td>{this.state.aluno.semestre}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}