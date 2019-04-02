import React, { Component } from "react";


export class AgentActions extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render = ()=>{
        return(
            <div
                className="btn-group"
                role="group"
                aria-label="agent actions"
            >
                <button type="button" onClick={this.props.waiting} className="btn btn-primary">Aguardando</button>
                <button type="button" onClick={this.props.processed} className="btn btn-primary">Processados</button>
                <button type="button" onClick={this.props.register} className="btn btn-primary">Cadastrar</button>
            </div>
        );
    }
};