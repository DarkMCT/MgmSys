import React, {Component} from "react";

import { RequestEditAluno } from "./request_edit_aluno";
import { make_request } from "./request";

export class RequestEdit extends Component{
    constructor(props){
        super(props);
        this.state = {

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

    edit_request = ()=>{
        if (this.state.tipo_requisicao === "aluno")
            return <RequestEditAluno data={this.state.data}></RequestEditAluno>;
        else if (this.state.tipo_requisicao === "servidor")
            return <div></div>;
        else if (this.state.tipo_requisicao === "visitante")
            return <div></div>;
    }

    render = ()=>{
        return (
            <div>
                { this.edit_request() }
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.props.backAction}>Voltar</button>
                </div>
            </div>
        );
    };
};