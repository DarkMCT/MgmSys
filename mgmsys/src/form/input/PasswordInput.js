import React, { Component } from 'react';

export class PasswordInput extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Senha:</label>
                <input type="password" className="form-control" name={this.props.name}/>
            </div>
        );
    }
}