

--  TEST DATA

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


INSERT INTO aluno(nome, telefone, email, dt_nasc, rg, cpf, endereco, matricula, curso, semestre) VALUES
    ('Matheus Teixeira', '99652-3456', 'zxvsdadfdo@gmail.com', '25/11/1996', '4534509-2', '044.111.222-33', 'Abc', '2014178445676', 'Engenharia da Computação', 9),
    ('Nathan Teixeira' , '99562-4567', 'lkjhkkhkho@gmail.com', '25/11/1996', '2452349-2', '011.444.555-66', 'Abc', '2015128474506', 'Engenharia de Controle e Aut.', 5),
    ('Donald Trump'    , '99792-5678', 'cvbncbnbno@gmail.com', '25/11/1996', '6456439-2', '022.777.888-99', 'Abc', '2016328456706', 'Engenharia da Computação', 9),
    ('Darth Vader'     , '99767-7653', 'dfghdfghdo@gmail.com', '25/11/1996', '5424549-2', '033.111.222-33', 'Abc', '2017458464206', 'Engenharia de Controle e Aut.', 8),
    ('Alan Turing'     , '99098-2353', 'rtyurtyudo@gmail.com', '25/11/1996', '6741249-2', '044.555.666-77', 'Abc', '2018677657606', 'Engenharia da Computação', 7),
    ('Carl Gauss'      , '99452-3456', 'yuityuryrt@gmail.com', '25/11/1996', '3433409-2', '055.888.999-00', 'Abc', '2019985430206', 'Engenharia de Controle e Aut.', 6),
    ('Pierre Laplace'  , '99872-5687', 'hfghjfghjg@gmail.com', '25/11/1996', '2323209-2', '066.111.222-33', 'Abc', '2014672340206', 'Engenharia da Computação', 5),
    ('Bernard Riemman' , '99862-8987', 'asdfsmssgs@gmail.com', '25/11/1996', '6523339-2', '077.666.444-33', 'Abc', '2015265670206', 'Engenharia de Controle e Aut.', 4),
    ('Leonhard Euller' , '99654-0983', 'alaksmskdo@gmail.com', '25/11/1996', '7683309-2', '088.999.333-43', 'Abc', '2016484560206', 'Engenharia da Computação', 3),
    ('George Grenn'    , '99232-0873', 'alaksmskfg@gmail.com', '25/11/1996', '8994309-2', '099.777.333-55', 'Abc', '2017876540206', 'Engenharia de Controle e Aut.', 2),
    ('Abraham Moivre'  , '99342-3765', 'asdgsdfgdo@gmail.com', '25/11/1996', '5662309-2', '066.888.666-11', 'Abc', '2018873450206', 'Engenharia da Computação', 1);



INSERT INTO empresa(nome, cep, cnpj, telefone) VALUES
	('Dell SA'      , '48000-000', '32.951.647/6542-60', '(63) 5678-8079'),
	('Microsoft SA' , '38551-123', '98.357.647/8901-32', '(45) 8765-4567'),
	('HP SA'        , '69652-826', '56.456.647/1231-65', '(56) 1234-2536'),
	('Samsung SA'   , '84533-985', '78.987.847/4561-98', '(23) 6765-9234');
