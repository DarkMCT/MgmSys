import React, { Component } from 'react';

import { SiapeInput } from './form/input/SiapeInput';
import { PasswordInput } from './form/input/PasswordInput';
import { MemorizePasswordInput } from './form/input/MemorizePasswordInput';


export class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container w-25 h-50 mt-5 border bg-light">
                {/* <h1 className="text-center">AuthSys</h1> */}
                <form>
                    <div className="row">
                        <div className="col">
                            <SiapeInput name="siape-input"/>                    
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">                        
                            <PasswordInput name="password-input" />                    
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-secondary w-100">Limpar</button>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary w-100">Logar</button>                        
                        </div>

                    </div>

                    <div className="row pt-1">
                        <div className="col">                        
                            <MemorizePasswordInput name="memorize-password-input"/>                    
                        </div>
                    </div>


                </form>
            </div>
        );
    }
}