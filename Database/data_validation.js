

const table_field = {
    departamento: [ "sigla", "nome", "ativado"],

    usuario: [ "fk_id_departamento", "nome", "siape", "email", "senha", "tipo" ],
    aluno: [ "nome", "telefone", "email", "dt_nasc", "rg", "cpf", "endereco",
             "matricula", "curso", "semestre", "ativado"],

    visita_aluno: [ "fk_id_usuario", "fk_id_aluno", "objetivo", "data", "frequencia",
                    "duracao", "horario_inicio", "horario_fim", "status_de_aprovacao", "ativado"],

    servidor: [ "siape", "nome", "telefone", "email", "dt_nasc", "rg", "cpf",
                "endereco", "ativado" ],

    veiculo_servidor: [ "modelo", "cor", "placa", "ativado" ],

    visita_servidor: [ "fk_id_usuario", "fk_id_servidor", "fk_id_veiculo_servidor", "objetivo",
                        "data", "frequencia", "duracao", "pernoite", "horario_inicio", "horario_fim",
                        "status_de_aprovacao", "ativado" ],

    empresa: [ "nome", "cep", "cnpj", "telefone", "ativado" ],

    visitante: [ "fk_id_empresa", "nome", "telefone", "email", "dt_nasc", "rg", "cpf", "endereco", "ativado" ],

    veiculo_visitante: [ "modelo", "cor", "placa", "ativado", ],

    visita_visitante: [ "fk_id_usuario", "fk_id_veiculo_visitante", "fk_id_visitante",
                        "objetivo", "data", "frequencia", "duracao", "pernoite", "horario_inicio",
                        "horario_fim", "status_de_aprovacao", "ativado", ],
};

const patterns = {
    dptm_sigla: new RegExp("^[a-zA-Z]{2,}$"),

    dptm_nome: new RegExp("^((([a-zA-Z]|ç|ã|á|õ|ó|ẽ|é)*){2,} ?)+$"),

    nome : new RegExp("^(([a-zA-Z]|á|â|ã|é|ó|õ|ç)+| )+$"),

    siape: new RegExp(".{5,}"),

    email: new RegExp("^[a-zA-Z]([a-zA-Z]+|_+|\\d+)+@([a-zA-Z]\.?)+$"),

    telefone: new RegExp("^(\(\d{2}\))?\s*(\d{4,5})-?\d{4}$"),

    rg: new RegExp("^\d{5}-?\d{3}$"),

    cpf: new RegExp("^\d{3}.?\d{3}.?\d{3}-?\d{2}$"),

    matricula: new RegExp("^\d{13}$"),

    curso: new RegExp("^((([a-zA-Z]|ç|ã|á|õ|ó|ẽ|é)*){2,} ?)+$"),

    frequencia: new RegExp("^((([a-zA-Z]|ç|ã|á|õ|ó|ẽ|é)*){2,} ?)+$"),

    placa: new RegExp("^[a-zA-Z]{3}-?\d{4}$"),

    cep: new RegExp("^\d{5}-?\d{3}$"),

    cnpj: new RegExp("^\d{2}\.?\d{3}\.?\d{3}/\d{4}-\d{2}$"),

};


const error_message = {
    dptm_sigla: "Sigla inválida. Utilize apenas caracteres sem espaço.",
    dptm_nome: "Nome inválido. Não utilize símbolos nem caracteres especiais.",
    nome:  "Nome inválido. Não utilize números no nome.",
    siape: "Siape inválido.",
    email: "Endereço de email inválido.",
    telefone: "Número de telefone inválido.",
    rg: "RG inválido.",
    cpf: "CPF inválido",
    matricula: "Número de matrícula inválido",
    curso: "Nome do curso inválido.",
    frequencia: "Frequência inválida.",
    placa: "Número da placa inválido",
    cep: "CEP inválido.",
    cnpj: "CNPJ inválido",
};



const __valid_keys = (obj, table_name) => {
    if (Object.keys(obj).length !== table_field[table_name].length)
        return false;

    return table_field[table_name].every( column => {
        return (column in obj);
    });
};


const __valid_insertation = ( data ) => {
    return Object.keys(data)
        .every( key => {
            if ( key in patterns )
                return patterns[key].test( data[key] );
            else
                return true;
        });
};

const valid_departamento = ( departament ) => {
    const adapted_departament = {
        dptm_sigla: departament.sigla,
        dptm_nome: departament.nome,
    };

    return __valid_insertation( adapted_departament );
};

const valid_usuario = user => {
    if ( !__valid_keys(user, "usuario") ) return false;
    if ( user.senha < 7 ) return false;

    return __valid_insertation( user );
};

const valid_aluno = student => {
    return __valid_keys(student, "aluno") && __valid_insertation(student);
};

const valid_visita_aluno = visit => {
    return __valid_keys(visit, "visita_aluno") && __valid_insertation(visit);
};

const valid_servidor = emp => {
    return __valid_keys(emp, "servidor") && __valid_insertation(emp);
};

const valid_veiculo_servidor = vs => {
    return __valid_keys(vs, "veiculo_servidor") && __valid_insertation(vs);
};

const valid_visita_servidor = vs => {
    return __valid_keys(vs, "visita_servidor") && __valid_insertation(vs);
}

const valid_empresa = emp => {
    return __valid_keys(emp, "empresa") && __valid_insertation(emp);
}

const valid_visitante = vs => {
    return __valid_keys(vs, "visitante") && __valid_insertation(vs);
}

const valid_veiculo_visitante= vv => {
    return __valid_keys(vv, "veiculo_visitante") && __valid_insertation(vv);
}

const valid_visita_visitante = vs => {
    return __valid_keys(vs, "visita_visitante") && __valid_insertation(vs);
}

module.exports = {
    valid_aluno,
    valid_departamento,
    valid_empresa,
    valid_servidor,
    valid_usuario,
    valid_veiculo_servidor,
    valid_veiculo_visitante,
    valid_visita_aluno,
    valid_visita_servidor,
    valid_visita_visitante,
    valid_visitante,
};

