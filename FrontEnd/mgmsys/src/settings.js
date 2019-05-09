import React, { Component } from "react";
import { ChangePassword } from "./change_password";
import { Notification } from "./notification";

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render = () => {
        return (
            <div className="container w-50">
                <hr/>
                    <ChangePassword></ChangePassword>
                <hr/>
                    <Notification></Notification>
                <hr/>
                <div className="footer"></div>
            </div>
        )
    }
}