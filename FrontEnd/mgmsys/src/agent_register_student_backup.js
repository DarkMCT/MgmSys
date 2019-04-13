import React, { Component } from "react";

export class AgentRegisterStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno: {
                nome: null,
                telefone: null,
                email: null,
                dt_nasc: null,
                rg: null,
                cpf: null,
                endereco: null,
                matricula: null,
                curso: null,
                semestre: null,

            },
            visita_aluno: {
                fk_id_usuario: null,
                fk_id_aluno: null,
                objetivo: null,
                data: null,
                frequencia: null,
                duracao: null,
                horario_inicio: null,
                horario_fim: null,
            }
        };

        this.nome = React.createRef();
        this.telefone = React.createRef();
        this.email = React.createRef();
        this.dt_nasc = React.createRef();
        this.rg = React.createRef();
        this.cpf = React.createRef();
        this.endereco = React.createRef();
        this.matricula = React.createRef();
        this.curso = React.createRef();
        this.semestre = React.createRef();

        this.objetivo = React.createRef();
        this.data = React.createRef();
        this.frequencia = React.createRef();
        this.duracao = React.createRef();
        this.horario_inicio = React.createRef();
        this.horario_fim = React.createRef();

    }

    read_fields = ()=>{
        this.setState({aluno: {
            nome: this.nome.current.value,
            telefone: this.telefone.current.value,
            email: this.email.current.value,
            dt_nasc: this.dt_nasc.current.value,
            rg: this.rg.current.value,
            cpf: this.cpf.current.value,
            endereco: this.endereco.current.value,
            matricula: this.matricula.current.value,
            curso: this.curso.current.value,
            semestre: this.semestre.current.value,

        }});

        this.setState({visita_aluno: {
            objetivo: this.objetivo.current.value,
            data: this.data.current.value,
            frequencia: this.frequencia.current.value,
            duracao: this.duracao.current.value,
            horario_inicio: this.horario_inicio.current.value,
            horario_fim: this.horario_fim.current.value,
        }});
    }

    search_student = (student_number)=>{
        if (student_number.length !== 13) return;
        console.log("object");


    };

    send_student_credentials = () => {

    };

    send_visita_aluno_credentials = () => {

    }

    render = () => {
        return (
            <div className="container">
                <h1 className="text-center">Cadastro de Alunos</h1>
                <div className="row justify-content-center">
                    <div className="form-group col-6">
                        <label htmlFor="matricula">Número de matrícula</label>
                        <input type="text" className="form-control" id="matricula" placeholder="Número de matrícula" ref={this.matricula}></input>
                    </div>
                </div>


                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" placeholder="Endereço do aluno" ref={this.nome}></input>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" className="form-control" id="email" placeholder="email@host.com" ref={this.email}></input>
                    </div>
                </div>


                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" className="form-control" id="telefone" placeholder="(00) 0000-0000" ref={this.telefone}></input>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="dt_nasc">Data de Nasc.</label>
                        <input type="date" className="form-control" id="dt_nasc" placeholder="email@host.com" ref={this.dt_nasc}></input>
                    </div>
                </div>


                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="rg">RG</label>
                        <input type="text" className="form-control" id="rg" placeholder="0000000-0" ref={this.rg}></input>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" className="form-control" id="cpf" placeholder="000.000.000-00" ref={this.cpf}></input>
                    </div>
                </div>


                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" className="form-control" id="endereco" placeholder="Endereço do aluno" ref={this.endereco}></input>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="curso">Curso</label>
                        <input type="text" className="form-control" id="curso" placeholder="Curso do aluno" ref={this.curso}></input>
                    </div>
                    <div className="form-group col-2">
                        <label htmlFor="semestre">Semestre</label>
                        <input type="text" className="form-control" id="semestre" placeholder="0" ref={this.semestre}></input>
                    </div>
                </div>


                <div className="row">
                    <div className="form-group col-12">
                        <label htmlFor="objetivo">Objetivo</label>
                        <input type="text" className="form-control" id="objetivo" placeholder="Objetivo da visita" ref={this.objetivo}></input>
                    </div>
                </div>


                <div className="row">
                    <div className="form-group col-3">
                        <label htmlFor="data">Data</label>
                        <input type="text" className="form-control" id="data" placeholder="Data da visita" ref={this.data}></input>
                    </div>

                    <div className="form-group col-3">
                        <label htmlFor="duracao">Duração</label>
                        <input type="text" className="form-control" id="duracao" placeholder="Duração da visita" ref={this.duracao}></input>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="frequencia">Frequência</label>
                        <input type="text" className="form-control" id="frequencia" placeholder="Frequência de visitas" ref={this.frequencia}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="horario_inicio">Inicio</label>
                        <input type="time" className="form-control" placeholder="Horário do ínicio da visita" ref={this.horario_inicio}></input>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="horario_fim">Fim</label>
                        <input type="time" className="form-control" placeholder="Horário esperado do termino da visita" ref={this.horario_fimS}></input>
                    </div>

                </div>

                <div className="row justify-content-end">
                    <button className="btn btn-danger">Limpar</button> <span className="pl-3"></span>
                    <button className="btn btn-primary" onClick={this.read_fields}>Cadastrar</button>
                </div>

                <div className=" pt-6 pb-6">.</div>
            </div>
        );
    };
};