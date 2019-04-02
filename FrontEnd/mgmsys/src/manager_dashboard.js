

// -- imports
// ---- core imports

// ---- third imports
import React, { Component } from  "react";
import { DashboardNavbar } from "./dashboard_navbar";

// ---- user imports


export class ManagerDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
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