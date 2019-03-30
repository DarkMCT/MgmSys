

// -- imports
// ---- core imports

// ---- third imports
import React, { Component } from  "react";
import { DashboardNavbar } from "./dashboard_navbar";

// ---- user imports


export class AgentDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_info: this.props.userInfo,
        }
    }

    render = () => {
        return (
            <div>
                <DashboardNavbar
                    onLogout={this.props.onLogout}>
                </DashboardNavbar>
            </div>
        );

    };
};