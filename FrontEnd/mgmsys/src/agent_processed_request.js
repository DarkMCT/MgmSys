import React, { Component } from "react";
import { make_request } from "./request";

// TODO
//      Criar as páginas de edição
//                          remoção
//                          detalhes
// OBS
//      Os dados devem ser retornados do DB com o id do evento

export class AgentProcessedRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_action: "list",
            request_id: null,
            data: null,
        };
    }

    search = ()=>{
        make_request("/visita", "POST", JSON.stringify({
            what: "STATUS_PROCESSADO",
        }))
        .then(res=>res.json())
        .then(result => {
            let data = {};
            result.map( (row, ind) => data[ind] = row);

            this.setState({data: data});
        })
        .catch(err => {
            console.log("error");
        });
    }

    componentDidMount = ()=>{
        this.search();
    }

    __onPDF = (request_id) => {
        console.log("PDF");
        console.log(this.data[request_id]);
    }

    __onDetail = (request_id) => {
        this.setState({current_action: "edit"})
        console.log("Detail");
        console.log(this.data[request_id]);
    }

    format_data = () => {
        if (this.state.data == null)
            return;

        const table = Object.values(this.state.data).map((row, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{row.tipo_requisicao}</td>
                    <td>{row.nome}</td>
                    <td>{row.data}</td>
                    <td><button className="btn btn-outline-primary" onClick={() => { this.__onPDF(row.id) }}>Gerar PDF</button><span className="pr-1"></span>
                        <button className="btn btn-primary" onClick={() => { this.__onDetail(row.id) }}>Detalhes</button><span className="pr-1"></span></td>
                </tr>
            )
        });

        return table;
    }

    list = () => {
        return (
            <div className="row justify-content-center pt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo de Requisição</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.format_data()}
                    </tbody>
                </table>
            </div>
        );
    }

    action_handler = () => {
        switch (this.state.current_action){
            case "list":
                return this.list();
            case "edit":
                return <div>Edit</div>;
            default:
                return <div>Error</div>
        }
    }

    render = () => {
        return (
            <div className="container">
            <div className="pb-5"></div>
                { this.action_handler() }
                <div className="footer"></div>
            </div>
        );
    }
};