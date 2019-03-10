import React, { Component } from 'react';

export class DepartamentInput extends Component{
    constructor(props){
        super(props);
    }

    list_departaments(){
        const departaments = this.props.itens.map(
            item =><option value={item}>{item}</option>)

        
        
        return departaments;
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Departamento:</label>
                { this.props.itens.length > 0 ?
                <select className="custom-select" name={this.props.name} id={this.props.name}>
                    { this.list_departaments() }
                </select> : null
                }
            </div>
        );
    }
}