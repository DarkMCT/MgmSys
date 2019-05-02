import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Login } from "./login";
import { Register } from "./register";
import { AgentDashboard } from "./agent_dashboard";
import { ManagerDashboard } from "./manager_dashboard";
import { make_request } from "./request";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app_state: "login_screen",
            backend_addr: "http://localhost:3001",
            user_info: null,
        };
    }

    componentDidMount = () => {
        // this.setState({ app_state: "agent_dashboard"});
        // return;

        make_request(
            "/user_info",
            "GET"
        ).then( res => {
            if (res.status === 200){
                res.json()
                .then( data => {
                    const app_state = { 0: "agent_dashboard", 1: "manager_dashboard" };
                    this.setState({
                        user_info: data,
                        app_state: app_state[data.tipo],
                    });
                })
                .catch( err =>{
                    console.log("Error in parsing...");
                });
            }
        })
        .catch( err => {
            console.log("Error in request user info");
        });
    }

    render = () => {
        const state = this.state.app_state;
        if (state === "login_screen") {
            return (<Login
                onSuccess={ () => window.location.reload() }
                onFail={() => { }}
                onRegister={() => { this.setState({ app_state: "register_screen" }) }}
                backendAddr={this.state.backend_addr}
            />);
        }

        if (state === "register_screen") {
            return (
                <Register
                    onBack={() => this.setState({ app_state: "login_screen" })}
                    backendAddr={this.state.backend_addr}
                />
            );
        }

        if (state === "agent_dashboard") {
            return (
            <AgentDashboard
                userInfo={this.state.user_info}
                onLogout={()=>this.setState({app_state: "login_screen"})}
                backendAddr={this.state.backend_addr}>
            </AgentDashboard>
            );
        }

        if (state === "manager_dashboard") {
            return (
            <ManagerDashboard
                userInfo={this.state.user_info}
                onLogout={()=>this.setState({app_state: "login_screen"})}
                backendAddr={this.state.backend_addr}>
            </ManagerDashboard>
            );
        }

        return (<div></div>);
    }
};

ReactDOM.render(<Main />, document.getElementById("root"));