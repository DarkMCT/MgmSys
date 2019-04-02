import React, { Component } from "react";

export class AgentRegisterActions extends Component{
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
                <button type="button" onClick={this.props.student} className="btn btn-primary">Aluno</button>
                <button type="button" onClick={this.props.employee} className="btn btn-primary">Servidor</button>
                <button type="button" onClick={this.props.visitor} className="btn btn-primary">Visitante</button>
            </div>
        );
    }
};