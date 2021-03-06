import React, { Component } from "react";
import { AgentRegisterActions } from "./agent_register_actions";
import { AgentRegisterEmployee } from "./agent_register_employee";
import { AgentRegisterStudent } from "./agent_register_student";
import { AgentRegisterVisitor } from "./agent_register_visitor";

export class AgentRegisterRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            current_action: ""
        };
    }

    render_body = ()=>{

        switch (this.state.current_action){
            case "student":
                return <AgentRegisterStudent
                    backendAddr={this.props.backendAddr}
                ></AgentRegisterStudent>;
            case "employee":
                return <AgentRegisterEmployee
                    backendAddr={this.props.backendAddr}
                ></AgentRegisterEmployee>;
            case "visitor":
                return <AgentRegisterVisitor
                    backendAddr={this.props.backendAddr}
                ></AgentRegisterVisitor>;
            default:
                return <AgentRegisterStudent
                    backendAddr={this.props.backendAddr}
                ></AgentRegisterStudent>;
        }


    }

    render = ()=>{
        return(
            <div className="container ">
                <div className="row justify-content-md-center">
                    <AgentRegisterActions
                        student={()=>this.setState({current_action: "student"})}
                        employee={()=>this.setState({current_action: "employee"})}
                        visitor={()=>this.setState({current_action: "visitor"})}
                    ></AgentRegisterActions>
                </div>
                <div className="container pt-5">
                    { this.render_body() }
                </div>
            </div>
        )
    }
};