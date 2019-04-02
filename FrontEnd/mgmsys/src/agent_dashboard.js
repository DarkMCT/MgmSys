

// -- imports
// ---- core imports

// ---- third imports
import React, { Component } from  "react";
import { DashboardNavbar } from "./dashboard_navbar";
import { AgentActions } from "./agent_actions"
import { AgentWaitingRequest } from "./agent_waiting_request"
import { AgentProcessedRequest } from "./agent_processed_request";
import { AgentRegisterRequest } from "./agent_register_request";

// ---- user imports


export class AgentDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_info: this.props.userInfo,
            current_action: "waiting",
        }
    }

    body =  (current_action) => {
        switch ( current_action ){
            case "waiting":
                return(<AgentWaitingRequest></AgentWaitingRequest>);
            case "processed":
                return(<AgentProcessedRequest></AgentProcessedRequest>);
            case "register":
                return(<AgentRegisterRequest></AgentRegisterRequest>);
            default:
                return(<AgentWaitingRequest></AgentWaitingRequest>);
        }
    }

    render = () => {
        return (
            <div>
                <DashboardNavbar
                    onLogout={this.props.onLogout}>
                </DashboardNavbar>
                <div className="container pt-3 pb-3">
                    <div className="row justify-content-md-center">
                        <AgentActions
                            waiting={()=>this.setState({current_action: "waiting"})}
                            processed={()=>this.setState({current_action: "processed"})}
                            register={()=>this.setState({current_action: "register"})}
                        ></AgentActions>
                    </div>
                </div>
                <div className="container">
                    { this.body(this.state.current_action) }
                </div>
            </div>
        );

    };
};