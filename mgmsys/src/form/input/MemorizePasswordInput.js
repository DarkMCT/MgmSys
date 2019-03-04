import React, { Component } from 'react';

export class MemorizePasswordInput extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    name={this.props.name}
                    id={this.props.name}                    
                    />
                <label className="custom-control-label" htmlFor={this.props.name}>Memorizar?</label>
            </div>
        );
    }
}