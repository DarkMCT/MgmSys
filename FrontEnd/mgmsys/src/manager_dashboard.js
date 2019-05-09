

// -- imports
// ---- core imports

// ---- third imports
import React, { Component } from  "react";
import { DashboardNavbar } from "./dashboard_navbar";


// ---- user imports
import { ManagerActions } from "./manager_actions";
import { ManagerWaitingRequest } from "./manager_waiting_request";
import { ManagerProcessedRequest } from "./manager_processed_request";
import { Settings } from "./settings";


export class ManagerDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_info: this.props.userInfo,
            current_action: "waiting",
        };
    }

    body =  (current_action) => {
        switch ( current_action ){
            case "waiting":
                return(<ManagerWaitingRequest
                    backendAddr={this.props.backendAddr}
                ></ManagerWaitingRequest>);
            case "processed":
                return(<ManagerProcessedRequest
                    backendAddr={this.props.backendAddr}
                ></ManagerProcessedRequest>);
            case "settings":
                return(
                    <Settings></Settings>
                );
            default:
                return(<ManagerWaitingRequest
                    backendAddr={this.props.backendAddr}
                ></ManagerWaitingRequest>);
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
                        <ManagerActions
                            waiting={()=>this.setState({current_action: "waiting"})}
                            processed={()=>this.setState({current_action: "processed"})}
                        ></ManagerActions>
                    </div>
                </div>
                <div className="container">
                    { this.body(this.state.current_action) }
                </div>
            </div>
        );

    };
};