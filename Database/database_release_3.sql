

--// USUÁRIO //--
DROP TABLE IF EXISTS "departamento" CASCADE;
CREATE TABLE "departamento" (
  "id_departamento" SERIAL,
  "nome"            VARCHAR(120) NOT NULL UNIQUE,
  "sigla"           VARCHAR(30),
  "ativado"         BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_departamento")
);

--  TIPO:
--  -> 0 agente
--  -> 1 gerente
DROP TABLE IF EXISTS "usuario" CASCADE;
CREATE TABLE "usuario" (
  "id_usuario"          SERIAL,
  "fk_id_departamento"  INT REFERENCES departamento(id_departamento) NOT NULL,
  "siape"               VARCHAR(120) NOT NULL UNIQUE,
  "nome"                VARCHAR(120) NOT NULL,
  "email"               VARCHAR(120) NOT NULL,
  "senha"               CHAR(60)     NOT NULL,
  "tipo"                INT          NOT NULL,
  "status_autenticacao" BOOLEAN DEFAULT FALSE,
  "ativado"             BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_usuario")
);


--// ALUNO //--
DROP TABLE IF EXISTS "aluno" CASCADE;
CREATE TABLE "aluno" (
  "id_aluno"  SERIAL,
  "matricula" VARCHAR(13) NOT NULL UNIQUE,
  "rg"        VARCHAR(30) UNIQUE,
  "cpf"       VARCHAR(30) UNIQUE,
  "nome"      VARCHAR(120),
  "email"     VARCHAR(120),
  "curso"     VARCHAR(120),
  -- "telefone"  VARCHAR(60),
  -- "dt_nasc"   DATE, -- <- remove
  "semestre"  INT,
  -- "endereco"  VARCHAR(240),
  "ativado"   BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_aluno")
);

-- STATUS_DE_APROVACAO
--  -> 0 indica aguardando
--  -> 1 indica aprovado
--  -> 2 indica negado
DROP TABLE IF EXISTS "visita_aluno" CASCADE;
CREATE TABLE "visita_aluno" (
  "id_visita_aluno"     SERIAL,
  "fk_id_usuario"       INT REFERENCES usuario(id_usuario) NOT NULL,
  "fk_id_aluno"         INT REFERENCES aluno(id_aluno) NOT NULL,
  "objetivo"            VARCHAR(1920),
  "frequencia"          VARCHAR(120),
  "data_inicio"         DATE,
  "data_fim"            DATE,
  "horario_inicio"      TIME,
  "horario_fim"         TIME,
  -- "duracao"             INT, -- remove
  "status_de_aprovacao" INT DEFAULT 0,
  "ativado"             BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_visita_aluno")
);


--// SERVIDOR //--
DROP TABLE IF EXISTS "servidor" CASCADE;
CREATE TABLE "servidor" (
  "id_servidor" SERIAL,
  "siape"       VARCHAR(30)  NOT NULL UNIQUE,
  "email"       VARCHAR(120) NOT NULL,
  "rg"          VARCHAR(30) UNIQUE,
  "cpf"         VARCHAR(30) UNIQUE,
  "nome"        VARCHAR(120),
  -- "telefone"    VARCHAR(60),
  -- "dt_nasc"     DATE,         --descartar
  -- "endereco"    VARCHAR(240), --descartar
  "ativado"     INT DEFAULT 1,
  PRIMARY KEY ("id_servidor")
);

DROP TABLE IF EXISTS "veiculo_servidor" CASCADE;
CREATE TABLE "veiculo_servidor" (
  "id_veiculo_servidor" SERIAL,
  "modelo"              VARCHAR(120),
  "cor"                 VARCHAR(120),
  "placa"               VARCHAR(10) NOT NULL UNIQUE,
  "ativado"             INT DEFAULT 1,
  PRIMARY KEY ("id_veiculo_servidor")
);

-- STATUS_DE_APROVACAO:
-- -> 0 indica aguardando
-- -> 1 indica aprovado
-- -> 2 indica negado
DROP TABLE IF EXISTS "visita_servidor" CASCADE;
CREATE TABLE "visita_servidor" (
  "id_visita_servidor"      SERIAL,
  "fk_id_usuario"           INT REFERENCES usuario(id_usuario)    NOT NULL,
  "fk_id_servidor"          INT REFERENCES servidor(id_servidor)  NOT NULL,
  "fk_id_veiculo_servidor"  INT REFERENCES veiculo_servidor(id_veiculo_servidor),
  "data_inicio"             DATE,
  "data_fim"                DATE,
  "horario_inicio"          TIME,
  "horario_fim"             TIME,
  "objetivo"                VARCHAR(480),
  "frequencia"              VARCHAR(120),
  "pernoite"                BOOLEAN,
  "status_de_aprovacao"     INT DEFAULT 0,
  -- "duracao"                 INT, --delete
  "ativado"                 BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_visita_servidor")
);

--// VISITANTE //--
DROP TABLE IF EXISTS "empresa" CASCADE;
CREATE TABLE "empresa" (
  "id_empresa"  SERIAL,
  "cnpj"        VARCHAR(120) NOT NULL UNIQUE,
  "nome"        VARCHAR(120),
  -- "cep"         VARCHAR(120),
  -- "telefone"    VARCHAR(120),
  "ativado"     BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_empresa")
);

DROP TABLE IF EXISTS "visitante" CASCADE;
CREATE TABLE "visitante" (
  "id_visitante"  SERIAL,
  "fk_id_empresa" INT REFERENCES empresa(id_empresa),
  "rg"            VARCHAR(120) NOT NULL UNIQUE,
  "cpf"           VARCHAR(120) UNIQUE,
  "email"         VARCHAR(120),
  "nome"          VARCHAR(120),
  -- "endereco"      VARCHAR(240),
  -- "telefone"      VARCHAR(60),
  -- "dt_nasc"       DATE, -- delete
  "ativado"       BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_visitante")
);

DROP TABLE IF EXISTS "veiculo_visitante" CASCADE;
CREATE TABLE "veiculo_visitante" (
  "id_veiculo_visitante"  SERIAL,
  "modelo"                VARCHAR(120),
  "cor"                   VARCHAR(120),
  "placa"                 VARCHAR(10) NOT NULL UNIQUE,
  "ativado"               BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_veiculo_visitante")
);

-- STATUS_DE_APROVACAO:
-- -> 0 indica aguardando
-- -> 1 indica aprovado
-- -> 2 indica negado
DROP TABLE IF EXISTS "visita_visitante" CASCADE;
CREATE TABLE "visita_visitante" (
  "id_visita_visitante"     SERIAL,
  "fk_id_usuario"           INT REFERENCES usuario(id_usuario)      NOT NULL,
  "fk_id_visitante"         INT REFERENCES visitante(id_visitante)  NOT NULL,
  "fk_id_veiculo_visitante" INT REFERENCES veiculo_visitante(id_veiculo_visitante),
  "data_inicio"             DATE,
  "data_fim"                DATE,
  "horario_inicio"          TIME,
  "horario_fim"             TIME,
  "objetivo"                VARCHAR(1920),
  "frequencia"              VARCHAR(120),
  -- "duracao"                 INT, -- delete
  "status_de_aprovacao"     INT DEFAULT 0,
  "pernoite"                BOOLEAN,
  "ativado"                 BOOLEAN DEFAULT TRUE,
  PRIMARY KEY ("id_visita_visitante")
);