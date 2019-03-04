import React, { Component } from 'react';

export class NameInput extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Nome:</label>
                <input type="text" className="form-control" name={this.props.name}/>
            </div>
        );
    }
}