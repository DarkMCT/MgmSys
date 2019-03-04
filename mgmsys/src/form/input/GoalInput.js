import React, { Component } from 'react';

export class GoalInput extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Objetivo:</label>
                <input type="textarea" className="form-control" name={this.props.name}/>
            </div>
        );
    }
}