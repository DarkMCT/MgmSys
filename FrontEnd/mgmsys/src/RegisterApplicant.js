import React, { Component } from 'react';

import { EmailInput } from './form/input/EmailInput';
import { NameInput } from './form/input/NameInput';
import { SiapeInput } from './form/input/SiapeInput';
import { PhoneInput } from './form/input/PhoneInput';
import { DepartamentInput } from './form/input/DepartamentInput';


export class RegisterApplicant extends Component {
    constructor(prosp) {
        super(prosp);
    }

    render() {
        return (
            <div className="container w-50 p-5">
                <h1 className="text-center pt-3 text-secondary">Requerente</h1>
                <form className="p-5">
                    <div className="row">
                        <div className="col">
                            <EmailInput name="email-input" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <NameInput name="name-input" />
                        </div>
                        <div className="col">
                            <SiapeInput name="siape-input" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <PhoneInput name="phone-input" />
                        </div>
                        <div className="col">
                            <DepartamentInput itens={
                                ["GAB - Gabinete da Direção Geral",
                                 "DAP - Diretoria de Administração e Planejamento",
                                 "DE - Diretoria de Ensino",
                                 "DPIEX - Diretoria de Pesquisa, Inovação e Extensão",
                                 "DREC - Diretoria de Relações Empresariais e Comunitárias",
                                 "CGGP - Coordenação Geral de Gestão de Pessoas",
                                 "DABC - Departamento da Área de Bases Comum",
                                 "DACC - Departamento da Área de Construção Civil",
                                 "DAEE - Departamento da Área de Eletroeletrônica",
                                 "DAI - Departamento da Área de Informática",
                                 "DAS - Departamento da Área de Serviços"]}/>
                        </div>
                    </div>

                    <div className="row justify-content-center p-2">
                        <button type="submit" className="btn btn-secondary w-25">Limpar</button>
                        <span className="pl-1 pr-1"></span>
                        <button type="submit" className="btn btn-primary w-25">Logar</button>
                    </div>


                </form>
            </div>
        );
    }
}