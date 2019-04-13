import React, { Component } from "react";

/*

  "nome" varchar(120),
  "telefone" varchar(60),
  "email" varchar(120),
  "dt_nasc" date,
  "rg" varchar(30) UNIQUE,
  "cpf" varchar(30) UNIQUE,
  "endereco" varchar(240),
  "matricula" varchar(13) NOT NULL UNIQUE,
  "curso" varchar(120),
  "semestre" int,
*/

export class AgentRegisterStudentAluno extends Component{
    constructor(props){
        super(props);
        this.state= {
            nome: "",
            telefone: "",
            email: "",
            dt_nasc: "",
            rg: "",
            cpf: "",
            endereco: "",
            matricula: "",
            curso: "",
            semestre: "",
        };

        this.estudante_nome = React.createRef();
        this.estudante_telefone = React.createRef();
        this.estudante_email = React.createRef();
        this.estudante_dt_nasc = React.createRef();
        this.estudante_rg = React.createRef();
        this.estudante_cpf = React.createRef();
        this.estudante_endereco = React.createRef();
        this.estudante_matricula = React.createRef();
        this.estudante_curso = React.createRef();
        this.estudante_semestre = React.createRef();
    }

    componentDidMount = () => {
        const initial_data = this.props.onInitialValues();
        if (initial_data != null)
            this.setState({...initial_data});

        console.log(initial_data);
    }

    remove_mark_sings = (str) => {
        return str.replace(/(\.|\/|-|\/)/g, "");
    }

    save_data = () => {
        const student_aluno = {
            nome: this.state.nome,
            telefone: this.state.telefone,
            email: this.state.email,
            dt_nasc: this.state.dt_nasc,
            rg: this.state.rg,
            cpf: this.state.cpf,
            endereco: this.state.endereco,
            matricula: this.state.matricula,
            curso: this.state.curso,
            semestre: this.state.semestre,
        }

        this.props.onSave(student_aluno);
    };

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dados do aluno...</h1>
                </div>

                <div className="row justify-content-center">
                    <div className="form-group col-6">
                        <label htmlFor="estudante_matricula">Número de matrícula</label>
                        <input type="text" id="estudante_matricula" ref={ this.estudante_matricula } className="form-control" placeholder="Digite o número de matrícula do aluno..."
                            value={this.state.matricula} onChange={e=>this.setState({matricula: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 2014000000000</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="estudante_rg">RG</label>
                        <input type="text" id="estudante_rg" ref={this.estudante_rg} className="form-control" placeholder="Digite o RG do estudante..."
                            value={this.state.rg} onChange={e=>this.setState({rg: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 0000000-0</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="estudante_cpf">CPF</label>
                        <input type="text" id="estudante_cpf" ref={this.estudante_cpf} className="form-control" placeholder="Digite o CPF do estudante..."
                            value={this.state.cpf} onChange={e=>this.setState({cpf: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 000.000.000-00, 000000000-00</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="estudante_nome">Nome</label>
                        <input type="text" id="estudante_nome" ref={this.estudante_nome} className="form-control" placeholder="Digite o nome do estudante..."
                            value={this.state.nome} onChange={e=>this.setState({nome: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: Foo Bar Baz</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="estudante_email">Email</label>
                        <input type="text" id="estudante_email" ref={this.estudante_email} className="form-control" placeholder="Digite o email do estudante..."
                            value={this.state.email} onChange={e=>this.setState({email: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: foo@bar.baz</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="estudante_curso">Curso</label>
                        <input type="text" id="estudante_curso" ref={this.estudante_curso} className="form-control" placeholder="Digite o curso do estudante..."
                            value={this.state.estudante_curso} onChange={e=>this.setState({curso: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: Engenharia da Computação</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="estudante_semestre">Semestre</label>
                        <input type="text" id="estudante_semestre" ref={this.estudante_semestre} className="form-control" placeholder="Digite o semestre do estudante..."
                            value={this.state.semestre} onChange={e=>this.setState({semestre: e.target.value})}>
                        </input>
                            <small className="form-text text-muted">Ex: 1, 2, 10</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="estudante_telefone">Telefone</label>
                        <input type="text" id="estudante_telefone" ref={this.estudante_telefone} className="form-control" placeholder="Digite o número de telefone do estudante..."
                            value={this.state.telefone} onChange={e=>this.setState({telefone: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 0000-0000, (00) 0000-0000</small>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="estudante_dt_nasc">Data de nascimento</label>
                        <input type="date" id="estudante_dt_nasc" ref={this.estudante_dt_nasc} className="form-control" placeholder="Digite a data de nascimento do estudante..."
                            value={this.state.dt_nasc} onChange={e=>this.setState({dt_nasc: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: 01/01/2001</small>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="estudante_endereco">Endereço</label>
                        <input type="text" id="estudante_endereco" ref={this.estudante_endereco} className="form-control" placeholder="Digite o endereço do estudante..."
                            value={this.state.endereco} onChange={e=>this.setState({endereco: e.target.value})}>
                        </input>
                        <small className="form-text text-muted">Ex: Rua Foo, Número 01</small>
                    </div>
                </div>

                <div className="row pt-3">
                    <div className="col-6">
                        {/* <button className="btn btn-secondary float-left" onClick={()=>{ this.save_data(); this.props.onBack(); }}>Voltar</button> */}
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