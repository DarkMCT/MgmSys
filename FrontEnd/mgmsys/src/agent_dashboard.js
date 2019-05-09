

// -- imports
// ---- core imports

// ---- third imports
import React, { Component } from  "react";
import { DashboardNavbar } from "./dashboard_navbar";
import { AgentActions } from "./agent_actions"
import { AgentWaitingRequest } from "./agent_waiting_request"
import { AgentProcessedRequest } from "./agent_processed_request";
import { AgentRegisterRequest } from "./agent_register_request";
import { Settings } from "./settings";

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
                return(<AgentWaitingRequest
                    backendAddr={this.props.backendAddr}
                ></AgentWaitingRequest>);
            case "processed":
                return(<AgentProcessedRequest
                    backendAddr={this.props.backendAddr}
                ></AgentProcessedRequest>);
            case "register":
                return(<AgentRegisterRequest
                    backendAddr={this.props.backendAddr}
                ></AgentRegisterRequest>);
            case "settings":
                return(
                    <Settings></Settings>
                );
            default:
                return(<AgentWaitingRequest
                    backendAddr={this.props.backendAddr}
                ></AgentWaitingRequest>);
        }
    }

    on_settings = ()=>{
        this.setState({current_action: "settings"});
    }

    render = () => {
        return (
            <div>
                <DashboardNavbar
                    onLogout={this.props.onLogout}
                    on_settings={this.on_settings}>
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