import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Login } from "./login";
import { Register } from "./register";

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            app_state: "login_screen",
            backend_addr: "http://localhost:3001",
        };
    }

    render = () => {
        const state = this.state.app_state;
        if ( state === "login_screen" ){            
            return (<Login 
                onSuccess={()=>{ }}
                onFail={()=>{ }} 
                onRegister={()=>{ this.setState({ app_state: "register_screen" }) }}   
                backendAddr={ this.state.backend_addr }
            />);
        }

        if ( state === "register_screen" ){
            return (
                <Register 
                    onBack={ ()=>this.setState({app_state: "login_screen"}) }
                    backendAddr={ this.state.backend_addr }    
                />
            );
        }

        if ( state === "agent_dashboard" ){
        
        }

        if ( state === "manager_dashboard" ){

        }

        return (<div></div>);
    }
};

ReactDOM.render(<Main />, document.getElementById("root"));