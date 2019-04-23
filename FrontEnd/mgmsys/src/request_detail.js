import React, {Component} from "react";

import { RequestDetailAluno } from "./request_detail_aluno";
import { RequestDetailServidor } from "./request_detail_servidor";
import { RequestDetailVisitante } from "./request_detail_visitante";
import { make_request } from "./request";


export class RequestDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: null,
            tipo_requisicao: null,
        };
    }

    componentDidMount = ()=>{
        this.query();
    }

    query = ()=>{
        const requisicao = this.props.data;

        make_request("/visita/query", "POST", JSON.stringify({
            id_visita:  requisicao.id,
            tipo_requisicao: requisicao.tipo_requisicao,
        }))
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            this.setState({tipo_requisicao: requisicao.tipo_requisicao, data: data});
        })
        .catch(err=>{
            console.log(err);
        });
    }

    show_request = ()=>{
        if (this.state.tipo_requisicao === "aluno")
            return <RequestDetailAluno data={this.state.data}></RequestDetailAluno>;
        else if (this.state.tipo_requisicao === "servidor")
            return <RequestDetailServidor data={this.state.data}></RequestDetailServidor>;
        else if (this.state.tipo_requisicao === "visitante")
            return <RequestDetailVisitante data={this.state.data}></RequestDetailVisitante>;
    }

    render = ()=>{
        return (
            <div>
                { this.show_request() }
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.props.backAction}>Voltar</button>
                </div>
            </div>
        );
    };
};