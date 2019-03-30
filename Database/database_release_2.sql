
CREATE TABLE "departamento" (
  "id_departamento" serial,
  "sigla" varchar(30),
  "nome" varchar(120) NOT NULL UNIQUE,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_departamento")
);

-- status_autenticação -> 1 indica ativado e 0 indica desativado
-- tipo -> 1 indica gerente e 0 indica agente
-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "usuario" (
  "id_usuario" serial,
  "fk_id_departamento" int REFERENCES departamento(id_departamento) NOT NULL,
  "nome" varchar(120) NOT NULL,
  "siape" varchar(120) NOT NULL UNIQUE,
  "email" varchar(120) NOT NULL,
  "senha" char(100) NOT NULL,
  "status_autenticacao" int DEFAULT 0,
  "tipo" int NOT NULL,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_usuario")
);


-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "aluno" (
  "id_aluno" serial,
  "nome" varchar(120),
  "telefone" varchar(60),
  "email" varchar(120),
  "dt_nasc" date,
  "rg" varchar(30) UNIQUE,
  "cpf" varchar(30) UNIQUE,
  "endereco" varchar(240),
  "matricula" varchar(13) NOT NULL UNIQUE,
  "curso" varchar(120),
  "semestre" int,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_aluno")
);

-- status_de_aprovacao -> 0 indica aguardando, 1 indica aprovado e 2 indica negado
-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "visita_aluno" (
  "id_visita_aluno" serial,
  "fk_id_usuario" int REFERENCES usuario(id_usuario) NOT NULL,
  "fk_id_aluno" int REFERENCES aluno(id_aluno) NOT NULL,
  "objetivo" varchar(480),
  "data" date,
  "frequencia" varchar(120),
  "duracao" int,
  "horario_inicio" time,
  "horario_fim" time,
  "status_de_aprovacao" int DEFAULT 0,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_visita_aluno")
);

-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "servidor" (
  "id_servidor" serial,
  "siape" varchar(30) NOT NULL UNIQUE,
  "nome" varchar(120),
  "telefone" varchar(60),
  "email" varchar(120),
  "dt_nasc" date,
  "rg" varchar(30) UNIQUE,
  "cpf" varchar(30) UNIQUE,
  "endereco" varchar(240),
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_servidor")
);

-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "veiculo_servidor" (
  "id_veiculo_servidor" serial,
  "modelo" varchar(120),
  "cor" varchar(120),
  "placa" varchar(10) NOT NULL UNIQUE,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_veiculo_servidor")
);

-- status_de_aprovacao -> 0 indica aguardando, 1 indica aprovado e 2 indica negado
-- ativado -> 1 indica ativado e 0  indica desativado
CREATE TABLE "visita_servidor" (
  "id_visita_servidor" serial,
  "fk_id_usuario" int REFERENCES usuario(id_usuario) NOT NULL,
  "fk_id_servidor" int REFERENCES servidor(id_servidor) NOT NULL,
  "fk_id_veiculo_servidor" int REFERENCES veiculo_servidor(id_veiculo_servidor) NOT NULL,
  "objetivo" varchar(480),
  "data" date,
  "frequencia" varchar(120),
  "duracao" int,
  "pernoite" char(1),
  "horario_inicio" time,
  "horario_fim" time,
  "status_de_aprovacao" int DEFAULT 0,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_visita_servidor")
);

-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "empresa" (
  "id_empresa" serial,
  "nome" varchar(120),
  "cep" varchar(120),
  "cnpj" varchar(120) NOT NULL UNIQUE,
  "telefone" varchar(120),
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_empresa")
);

-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "visitante" (
  "id_visitante" serial,
  "fk_id_empresa" int REFERENCES empresa(id_empresa) NOT NULL,
  "nome" varchar(120),
  "telefone" varchar(60),
  "email" varchar(120),
  "dt_nasc" date,
  "rg" varchar(120) NOT NULL UNIQUE,
  "cpf" varchar(120) UNIQUE,
  "endereco" varchar(240),
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_visitante")
);

-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "veiculo_visitante" (
  "id_veiculo_visitante" serial,
  "modelo" varchar(120),
  "cor" varchar(120),
  "placa" varchar(10) NOT NULL UNIQUE,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_veiculo_visitante")
);

--  status_de_aprovacao -> 0 indica aguardando, 1 indica aprovado e 2 indica negado
-- ativado -> 1 indica ativado e 0 indica desativado
CREATE TABLE "visita_visitante" (
  "id_visita_servidor" serial,
  "fk_id_usuario" int REFERENCES usuario(id_usuario) NOT NULL,
  "fk_id_veiculo_visitante" int REFERENCES veiculo_visitante(id_veiculo_visitante) NOT NULL,
  "fk_id_visitante" int REFERENCES visitante(id_visitante) NOT NULL,
  "objetivo" varchar(480),
  "data" date,
  "frequencia" varchar(120),
  "duracao" int,
  "pernoite" char(1),
  "horario_inicio" time,
  "horario_fim" time,
  "status_de_aprovacao" int DEFAULT 0,
  "ativado" int DEFAULT 1,
  PRIMARY KEY ("id_visita_servidor")
);