import React, { Component } from 'react';

export class EmailInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Email:</label>
                <input type="email" className="form-control"/>
            </div>
        );
    }
};