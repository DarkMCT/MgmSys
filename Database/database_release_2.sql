



CREATE TABLE "departamento" (
  "id_departamento" serial,
  "sigla" varchar(30),
  "nome" varchar(120),
  "ativado" char(1),
  PRIMARY KEY ("id_departamento")
);

CREATE TABLE "usuario" (
  "id_usuario" serial,
  "fk_id_departamento" int REFERENCES departamento(id_departamento),
  "nome" varchar(120),
  "SIAPE" varchar(120),
  "email" varchar(120),
  "senha" char(60),
  "status_autenticacao" char(1),
  "tipo" char(1),
  "ativado" char(1),
  PRIMARY KEY ("id_usuario")
);




CREATE TABLE "aluno" (
  "id_aluno" serial,
  "nome" varchar(120),
  "telefone" varchar(60),
  "email" varchar(120),
  "dt_nasc" date,
  "RG" varchar(30),
  "CPF" varchar(30),
  "endereco" varchar(240),
  "matricula" varchar(13),
  "curso" varchar(120),
  "semestre" int,
  "ativado" char(1),
  PRIMARY KEY ("id_aluno")
);

CREATE TABLE "visita_aluno" (
  "id_visita_aluno" serial,
  "fk_id_usuario" int REFERENCES usuario(id_usuario),
  "fk_id_aluno" int REFERENCES aluno(id_aluno),
  "objetivo" varchar(480),
  "data" date,
  "frequencia" varchar(120),
  "duracao" int,
  "horario_inicio" time,
  "horario_fim" time,
  "status_de_aprovacao" char(1),
  "ativado" char(1),
  PRIMARY KEY ("id_visita_aluno")
);




CREATE TABLE "servidor" (
  "id_servidor" serial,
  "SIAPE" varchar(30),
  "nome" varchar(120),
  "telefone" varchar(60),
  "email" varchar(120),
  "dt_nasc" date,
  "RG" varchar(30),
  "CPF" varchar(30),
  "endereco" varchar(240),
  "ativado" char(1),
  PRIMARY KEY ("id_servidor")
);

CREATE TABLE "veiculo_servidor" (
  "id_veiculo_servidor" serial,
  "modelo" varchar(120),
  "cor" varchar(120),
  "placa" varchar(10),
  "ativado" char(1),
  PRIMARY KEY ("id_veiculo_servidor")
);

CREATE TABLE "visita_servidor" (
  "id_visita_servidor" serial,
  "fk_id_usuario" int REFERENCES usuario(id_usuario),
  "fk_id_servidor" int REFERENCES servidor(id_servidor),
  "fk_id_veiculo_servidor" int REFERENCES veiculo_servidor(id_veiculo_servidor),
  "objetivo" varchar(480),
  "data" date,
  "frequencia" varchar(120),
  "duracao" int,
  "pernoite" char(1),
  "horario_inicio" time,
  "horario_fim" time,
  "status_de_aprovacao" char(1),
  "ativado" char(1),
  PRIMARY KEY ("id_visita_servidor")
);




CREATE TABLE "empresa" (
  "id_empresa" serial,
  "nome" varchar(120),
  "cep" varchar(120),
  "cnpj" varchar(120),
  "telefone" varchar(120),
  "ativado" char(1),
  PRIMARY KEY ("id_empresa")
);

CREATE TABLE "visitante" (
  "id_visitante" serial,
  "fk_id_empresa" int REFERENCES empresa(id_empresa),
  "nome" varchar(120),
  "telefone" varchar(60),
  "email" varchar(120),
  "dt_nasc" date,
  "RG" varchar(120),
  "CPF" varchar(120),
  "endereco" varchar(240),
  "ativado" char(1),
  PRIMARY KEY ("id_visitante")
);

CREATE TABLE "veiculo_visitante" (
  "id_veiculo_visitante" serial,
  "modelo" varchar(120),
  "cor" varchar(120),
  "placa" varchar(10),
  "ativado" char(1),
  PRIMARY KEY ("id_veiculo_visitante")
);

CREATE TABLE "visita_visitante" (
  "id_visita_servidor" serial,
  "fk_id_usuario" int REFERENCES usuario(id_usuario),
  "fk_id_veiculo_visitante" int REFERENCES veiculo_visitante(id_veiculo_visitante),
  "fk_id_visitante" int REFERENCES visitante(id_visitante),
  "objetivo" varchar(480),
  "data" date,
  "frequencia" varchar(120),
  "duracao" int,
  "pernoite" char(1),
  "horario_inicio" time,
  "horario_fim" time,
  "status_de_aprovacao" char(1),
  "ativado" char(1),
  PRIMARY KEY ("id_visita_servidor")
);


