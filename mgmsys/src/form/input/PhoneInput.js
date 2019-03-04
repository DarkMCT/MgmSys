import React, { Component } from 'react';

export class PhoneInput extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Telefone:</label>
                <input type="phone" className="form-control" name={this.props.name}/>
            </div>
        );
    }
}