import React, {Component} from "react";

import { RequestEditAluno } from "./request_edit_aluno";
import { RequestEditServidor } from "./request_edit_servidor";
import { RequestEditVisitante } from "./request_edit_visitante";
import { make_request } from "./request";

export class RequestEdit extends Component{
    constructor(props){
        super(props);
        this.state = {

        };

        this.original_data = null;
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
            this.original_data = {};
        })
        .catch(err=>{
            console.log(err);
        });
    }

    edit_request = ()=>{
        if (this.state.tipo_requisicao === "aluno")
            return <RequestEditAluno data={this.state.data} onBack={this.props.backAction}></RequestEditAluno>;
        else if (this.state.tipo_requisicao === "servidor")
            return <RequestEditServidor data={this.state.data} onBack={this.props.backAction}></RequestEditServidor>;
        else if (this.state.tipo_requisicao === "visitante")
            return <RequestEditVisitante data={this.state.data} onBack={this.props.backAction}></RequestEditVisitante>;
    }

    render = ()=>{
        return (
            <div className="containers">
                { this.edit_request() }
            </div>
        );
    };
};