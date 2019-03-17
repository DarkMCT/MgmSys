CREATE TABLE "pessoa" (
  "id_pessoa" serial,
  "nome"      varchar(120) NOT NULL,
  "telefone"  varchar(120) NOT NULL,
  "email"     varchar(120),
  "dt_nasc"   date,
  "RG"        varchar( 30) NOT NULL,
  "CPF"       varchar( 30) NOT NULL,
  "path"      varchar(120),
  "endereco"  varchar(120),
  PRIMARY KEY ("id_pessoa")
);

CREATE TABLE "departamento" (
  "id_departamento" serial,
  "sigla"           varchar(30)  NOT NULL,
  "nome"            varchar(120) NOT NULL,
	
  PRIMARY KEY ("id_departamento")
);

CREATE TABLE "aluno" (
  "id_aluno"     serial,
  "matricula"    varchar( 30) NOT NULL,
  "curso"        varchar(120) NOT NULL,
  "semestre"     int          NOT NULL,
  "fk_id_pessoa" int          REFERENCES pessoa(id_pessoa),
	
  PRIMARY KEY ("id_aluno")
);

CREATE TABLE "usuario" (
  "id_usuario"          serial,
  "nome"                varchar(120) NOT NULL,
  "SIAPE"               varchar(120) NOT NULL,
  "email"               varchar(120) NOT NULL,
  "senha"               char(60)     NOT NULL,
  "status_autenticacao" char(1),
  "tipo"                char(1),
  "fk_id_departamento"  int          REFERENCES departamento(id_departamento),
	
  PRIMARY KEY ("id_usuario")
);

CREATE TABLE "servidor" (
  "id_servidor"  serial,
  "SIAPE"        varchar(30) NOT NULL,
  "fk_id_pessoa" int         REFERENCES pessoa(id_pessoa),
	
  PRIMARY KEY ("id_servidor")
);

CREATE TABLE "visita" (
  "id_visita"        serial,
  "objetivo"         varchar(480) NOT NULL,
  "data"             date         NOT NULL,
  "frequencia"       varchar(120) NOT NULL,
  "duracao"          int          NOT NULL,
  "horario_inicio"   time         NOT NULL,
  "horario_fim"      time         NOT NULL,
  "status"           char(1)      NOT NULL,
  "fk_id_pessoa"     int          REFERENCES pessoa(id_pessoa),
  "fk_id_usuario" int          REFERENCES usuario(id_usuario),
	
  PRIMARY KEY ("id_visita")
);

CREATE TABLE "veiculo" (
  "id_veiculo"   serial       NOT NULL,
  "modelo"       varchar(120) NOT NULL,
  "cor"          varchar(120) NOT NULL,
  "placa"        varchar(10)  NOT NULL,
  "fk_id_visita" int          REFERENCES visita(id_visita),
	
  PRIMARY KEY ("id_veiculo")
);

CREATE TABLE "empresa" (
  "id_empresa" serial,
  "nome"     varchar(120) NOT NULL,
  "cep"      varchar(120) NOT NULL,
  "cnpj"     varchar(120) NOT NULL UNIQUE,
  "telefone" varchar(120),
	
  PRIMARY KEY ("id_empresa")
);

CREATE TABLE "visitante" (
  "id_visitante"  serial,
  "fk_id_empresa" int     REFERENCES empresa(id_empresa),
  "fk_id_pessoa"  int     REFERENCES pessoa(id_pessoa),
  PRIMARY KEY ("id_visitante")
);







INSERT INTO departamento(sigla, nome) VALUES
	('GAB'  , 'Gabinete da Direção Geral')                        ,
	('DAP'  , 'Diretoria de Administração e Planejamento')        ,
	('DE'   , 'Diretoria de Ensino')                              ,
	('DPIEX', 'Diretoria de Pesquisa, Inovação e Extensão')       ,
	('DREC' , 'Diretoria de Relações Empresariais e Comunitárias'),
	('CGGP' , 'Coordenação Geral de Gestão de Pessoas')           ,
	('DABC' , 'Departamento da Área de Bases Comum')              ,
	('DACC' , 'Departamento da Área de Construção Civil')         ,
	('DAEE' , 'Departamento da Área de Eletroeletrônica')         ,
	('DAI'  , 'Departamento da Área de Informática')              ,
	('DAS'  , 'Departamento da Área de Serviços')                 ;






INSERT INTO pessoa(nome, telefone, email, dt_nasc, "RG", "CPF", "path", endereco) VALUES
	('Marcos Costa Carvalho'  , '(11) 6489-7785', 'aaaaaaaaaaaaaaaaaaa@rhyta.com', '11/01/1999', '6546165-7', '765.690.979-04', 'user_1/', 'Rua tal taal Bairro Apbkso'),
	('Vitor Sousa Rocha'      , '(12) 3535-7785', 'bbbbbbbbbbbbbbbbbbb@rhyta.com', '12/02/1998', '3465547-7', '723.690.979-04', 'user_2/', 'Rua tal taal Bairro Apbkso'),
	('Paulo Azevedo Castro'   , '(13) 2535-7785', 'ccccccccccccccccccc@rhyta.com', '13/03/1997', '9856187-7', '803.690.979-04', 'user_3/', 'Rua tal taal Bairro Apbkso'),
	('João Goncalves Araujo'  , '(14) 1535-7785', 'ddddddddddddddddddd@rhyta.com', '14/04/1996', '2669748-7', '953.690.979-04', 'user_4/', 'Rua tal taal Bairro Apbkso'),
	('Davi Fernandes Alves'   , '(15) 9535-7785', 'eeeeeeeeeeeeeeeeeee@rhyta.com', '15/05/1995', '3215596-7', '323.690.979-04', 'user_5/', 'Rua tal taal Bairro Apbkso'),
	('Júlio Silva Goncalves'  , '(16) 8535-7785', 'fffffffffffffffffff@rhyta.com', '16/06/1994', '7995657-7', '556.690.979-04', 'user_6/', 'Rua tal taal Bairro Apbkso'),
	('Luan Melo Dias'         , '(17) 7535-7785', 'ggggggggggggggggggg@rhyta.com', '17/07/1993', '6546487-7', '565.690.979-04', 'user_7/', 'Rua tal taal Bairro Apbkso'),
	('Douglas Alves Ribeiro'  , '(18) 6535-7785', 'hhhhhhhhhhhhhhhhhhh@rhyta.com', '18/08/1992', '5656987-7', '983.690.979-04', 'user_8/', 'Rua tal taal Bairro Apbkso'),
	('Rafael Dias Costa'      , '(19) 5535-7785', 'iiiiiiiiiiiiiiiiiii@rhyta.com', '19/09/1991', '6564687-7', '233.690.979-04', 'user_9/', 'Rua tal taal Bairro Apbkso'),
	('Gabriel Silva Goncalves', '(20) 4535-7785', 'jjjjjjjjjjjjjjjjjjj@rhyta.com', '20/10/1990', '4568955-7', '103.690.979-04', 'user_10', 'Rua tal taal Bairro Apbkso');





INSERT INTO empresa(nome, cep, cnpj, telefone) VALUES
	('Dell SA'      , '48000-000', '32.951.647/6542-60', '(63) 5678-8079'),
	('Microsoft SA' , '38551-123', '98.357.647/8901-32', '(45) 8765-4567'),
	('HP SA'        , '69652-826', '56.456.647/1231-65', '(56) 1234-2536'),
	('Samsung SA'   , '84533-985', '78.987.847/4561-98', '(23) 6765-9234');	








