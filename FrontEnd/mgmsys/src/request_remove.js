import React, {Component} from "react";
import { make_request } from "./request";

export class RequestRemove extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: null,
        };
    }

    db_remove = ()=>{
        const requisicao = this.props.data;
        make_request("/visita/delete", "POST", JSON.stringify({
            id_visita:  requisicao.id,
            tipo_requisicao: requisicao.tipo_requisicao,
        }))
        .then( res => {
            if (res.status === 200){
                this.setState({message: "Requisição removida!"})
            } else {
                this.setState({message: "Não foi possível remover está requisição. Tente novamente."})
            }
        })
        .catch( err =>{

        });
    }

    print_data = ()=>{
        const requisicao = this.props.data;

        return (
            <div className="container">
                <div className="form-group">
                    <label>Solicitação para:</label>
                    <label className="form-control">{requisicao.tipo_requisicao}</label>
                </div>
                <div className="form-group">
                    <label>Nome:</label>
                    <label className="form-control">{requisicao.nome}</label>
                </div>
                <div className="form-group">
                    <label>Na data:</label>
                    <label className="form-control">{requisicao.data}</label>
                </div>

            </div>
        );
    }

    print_message = ()=>{
        return (
            <h3>{this.state.message}</h3>
        );
    }

    print_prompt = ()=>{
        return (
            <div className="row alert alert-danger">
                Tem certeza que deseja excluir esta requisição de acesso?
                <div className="row justify-content-end">
                    <div className="col-4">
                        <button className="btn btn-secondary" onClick={this.props.backAction}>Não</button>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary" onClick={this.db_remove}>Sim</button>
                    </div>
                </div>
            </div>
        );
    }

    render = ()=>{
        return (
            <div>
                <h1>Cancelando requisição</h1>

                {   this.state.message == null ?
                    this.print_data()       :
                    this.print_message()
                }

                {
                    this.state.message == null ?
                    this.print_prompt():
                    null
                }

                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.props.backAction}>Voltar</button>
                </div>
            </div>
        );
    };
};