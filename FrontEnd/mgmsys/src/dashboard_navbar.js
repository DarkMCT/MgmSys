
import React, {Component} from "react";
import { make_request } from "./request";

export class DashboardNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
        console.log(props);
    }

    logout = () => {
        make_request(
            "/auth",
            "POST",
            JSON.stringify({operation: "logout"})
        ).then( res => {
            this.props.onLogout();
        })
        .catch(err=>{
            console.log(err);
        });
    }

    render = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a
                    className="navbar-brand"
                    href="#begin">
                    Controle de Acesso
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#begin" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Meus dados
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarToggleExternalContent"
                                aria-controls="navbarToggleExternalContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown">

                                <button
                                    className="dropdown-item"
                                    onClick={this.props.on_settings}>
                                    Meus dados
                                </button>

                                <div className="dropdown-divider"></div>

                                <button
                                    className="dropdown-item"
                                    onClick={this.logout}>
                                    Sair
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    };

};