SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS tb_formulario;
DROP TABLE IF EXISTS tb_marca;
DROP TABLE IF EXISTS tb_cor;
DROP TABLE IF EXISTS tb_categoria;
DROP TABLE IF EXISTS tb_participacao;
DROP TABLE IF EXISTS tb_combustivel;
DROP TABLE IF EXISTS tb_tipo;
DROP TABLE IF EXISTS tb_usuario;
DROP TABLE IF EXISTS tb_formulario_combustivel;
DROP TABLE IF EXISTS tb_formulario_tipo;

SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE tb_marca (
	id INTEGER NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(30),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tb_cor (
	id INTEGER NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(30),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tb_categoria (
	id INTEGER NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(30),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tb_participacao (
	id INTEGER NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(30),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tb_combustivel (
	id INTEGER NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(30),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tb_tipo (
	id INTEGER NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(30),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tb_usuario (
	id INTEGER NOT NULL AUTO_INCREMENT,
	nome VARCHAR(50),
	telefone VARCHAR(20),
	email VARCHAR(60),
	password CHAR(60),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tb_formulario (
	id INTEGER NOT NULL AUTO_INCREMENT,
	id_usuario INTEGER NOT NULL,
	id_marca INTEGER NOT NULL,
	id_cor INTEGER,
	id_categoria INTEGER NOT NULL,
	id_participacao INTEGER NOT NULL,
	cilindrada VARCHAR(5),
	ano_inicio INTEGER,
	ano_fim INTEGER,
	modelo VARCHAR(50),
	lance_min DOUBLE PRECISION,
	lance_max DOUBLE PRECISION,
	avaliacao_min DOUBLE PRECISION,
	avaliacao_max DOUBLE PRECISION,
	sucata BOOLEAN,
	sinistro BOOLEAN,
	info_adicional TEXT,
	data_envio DATE,
	PRIMARY KEY (id),
	FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id),
	FOREIGN KEY (id_marca) REFERENCES tb_marca(id),
	FOREIGN KEY (id_cor) REFERENCES tb_cor(id),
	FOREIGN KEY (id_categoria) REFERENCES tb_categoria(id),
	FOREIGN KEY (id_participacao) REFERENCES tb_participacao(id)
) ENGINE=InnoDB;

CREATE TABLE tb_formulario_combustivel (
	id_formulario INTEGER NOT NULL,
	id_combustivel INTEGER NOT NULL,
	PRIMARY KEY (id_formulario, id_combustivel),
	FOREIGN KEY (id_formulario) REFERENCES tb_formulario(id),
	FOREIGN KEY (id_combustivel) REFERENCES tb_combustivel(id)
) ENGINE=InnoDB;

CREATE TABLE tb_formulario_tipo (
	id_formulario INTEGER NOT NULL,
	id_tipo INTEGER NOT NULL,
	PRIMARY KEY (id_formulario, id_tipo),
	FOREIGN KEY (id_formulario) REFERENCES tb_formulario(id),
	FOREIGN KEY (id_tipo) REFERENCES tb_tipo(id)
) ENGINE=InnoDB;

INSERT INTO tb_marca (descricao) VALUES
	('TODAS'),
	('ACURA'),
	('ADLY'),
	('AGRALE'),
	('AGUSTA'),
	('ALFA'),
	('AMAZONAS'),
	('APRILIA'),
	('AQUILA'),
	('ATALA'),
	('AUDI'),
	('BAJAJ'),
	('BENELLI'),
	('BENZ'),
	('BETA'),
	('BIMOTA'),
	('BMW'),
	('BRANDY'),
	('BRAVA'),
	('BRM'),
	('BRP'),
	('BUELL'),
	('BUENO'),
	('BUGGY'),
	('BUGRE'),
	('BYCRISTO'),
	('CADILLAC'),
	('CAGIVA'),
	('CALOI'),
	('CHANA'),
	('CHANGAN'),
	('CHERY'),
	('CHEVROLET'),
	('CHRYSLER'),
	('CICCOBUS'),
	('DAELIM'),
	('DAEWOO'),
	('DAF'),
	('DAFRA'),
	('DAIHATSU'),
	('DAVIDSON'),
	('DAYANG'),
	('DAYUN'),
	('DERBI'),
	('DODGE'),
	('DUCATI'),
	('EFFA'),
	('EMME'),
	('ENFIELD'),
	('ENGESA'),
	('ENVEMO'),
	('FERRARI'),
	('FIAT'),
	('FIBRAVAN'),
	('FORD'),
	('FOTON'),
	('FOX'),
	('FYBER'),
	('FYM'),
	('GARINNI'),
	('GAS'),
	('GEELY'),
	('GEN'),
	('GMC'),
	('GREEN'),
	('GURGEL'),
	('GUZZI'),
	('HAFEI'),
	('HAOBAO'),
	('HAOJUE'),
	('HARTFORD'),
	('HERO'),
	('HONDA'),
	('HUSABERG'),
	('HUSQVARNA'),
	('HYUNDAI'),
	('INDIAN'),
	('IROS'),
	('ISUZU'),
	('IVECO'),
	('JAC'),
	('JAGUAR'),
	('JEEP'),
	('JINBEI'),
	('JIPE'),
	('JMC'),
	('JOHNNYPAG'),
	('JONNY'),
	('JPX'),
	('KAHENA'),
	('KASINSKI'),
	('KAWASAKI'),
	('KTM'),
	('KYMCO'),
	('LADA'),
	('LAMBORGHINI'),
	('LANDER'),
	('LANDUM'),
	('LAVRALE'),
	('LERIVO'),
	('LEXUS'),
	('LIFAN'),
	('LOBINI'),
	('LOTUS'),
	('MAHINDRA'),
	('MALAGUTI'),
	('MAN'),
	('MARCOPOLO'),
	('MARTIN'),
	('MASCARELLO'),
	('MASERATI'),
	('MATRA'),
	('MAXIBUS'),
	('MAZDA'),
	('MERCURY'),
	('MG'),
	('MINI'),
	('MITSUBISHI'),
	('MIURA'),
	('MIZA'),
	('MOTOCAR'),
	('MOTORINO'),
	('MOTORS'),
	('MRX'),
	('MVK'),
	('NAVISTAR'),
	('NEOBUS'),
	('NISSAN'),
	('ORCA'),
	('PEGASSI'),
	('PEUGEOT'),
	('PIAGGIO'),
	('PLYMOUTH'),
	('PONTIAC'),
	('PORSCHE'),
	('RAM'),
	('RAPTOR'),
	('RELY'),
	('RENAULT'),
	('RIGUETE'),
	('ROMEO'),
	('ROVER'),
	('ROYCE'),
	('SAAB'),
	('SANYANG'),
	('SATURN'),
	('SCANIA'),
	('SEAT'),
	('SHACMAN'),
	('SHINERAY'),
	('SIAMOTO'),
	('SINOTRUK'),
	('SMART'),
	('SSANGYONG'),
	('SUBARU'),
	('SUNDOWN'),
	('SUZUKI'),
	('TAC'),
	('TARGOS'),
	('TIGER'),
	('TOYOTA'),
	('TRAXX'),
	('TRICICLOS'),
	('TRIUMPH'),
	('TROLLER'),
	('VENTO'),
	('VOLCANO'),
	('VOLKSWAGEN'),
	('VOLVO'),
	('WAKE'),
	('WALK'),
	('WALKBUS'),
	('WALL'),
	('WUYANG'),
	('YAMAHA');

INSERT INTO tb_cor (descricao) VALUES
	('TODAS'),
	('Abóbora'),
	('Água'),
	('Água-marinha'),
	('Água-marinha média'),
	('Alizarim'),
	('Amarelo'),
	('Amarelo claro'),
	('Amarelo esverdeado'),
	('Amarelo ouro claro'),
	('Amarelo queimado'),
	('Âmbar'),
	('Ameixa'),
	('Ametista'),
	('Amêndoa'),
	('Aspargo'),
	('Azul'),
	('Azul alice'),
	('Azul ardósia'),
	('Azul areado'),
	('Azul aço'),
	('Azul cadete'),
	('Azul camarada'),
	('Azul celeste'),
	('Azul claro'),
	('Azul cobalto'),
	('Azul céu'),
	('Azul escuro'),
	('Azul flor de milho'),
	('Azul furtivo'),
	('Azul manteiga'),
	('Azul marinho'),
	('Azul meia-noite'),
	('Azul médio'),
	('Azul petróleo'),
	('Azul pólvora'),
	('Azul real'),
	('Azul violeta'),
	('Açafrão'),
	('Bege'),
	('Bordô'),
	('Borgonha'),
	('Branco'),
	('Branco antigo'),
	('Branco fantasma'),
	('Branco floral'),
	('Branco fumaça'),
	('Branco navajo'),
	('Bronze'),
	('Caqui'),
	('Cardo'),
	('Carmesim'),
	('Castanho avermelhado'),
	('Castanho claro'),
	('Cenoura'),
	('Cereja'),
	('Chocolate'),
	('Ciano claro'),
	('Ciano escuro'),
	('Cinza'),
	('Cinza ardósia'),
	('Cinza ardósia claro'),
	('Cinza ardósia escuro'),
	('Cinza claro'),
	('Cinza escuro'),
	('Cinza fosco'),
	('Cinza médio'),
	('Cobre'),
	('Concha'),
	('Coral'),
	('Coral claro'),
	('Couro'),
	('Creme'),
	('Creme de marisco'),
	('Creme de menta'),
	('Caqui escuro'),
	('Damasco'),
	('Dourado'),
	('Dourado escuro'),
	('Dourado pálido'),
	('Escarlate'),
	('Esmeralda'),
	('Feldspato'),
	('Ferrugem'),
	('Fuligem'),
	('Fúchsia'),
	('Grená'),
	('Hortelã'),
	('Índigo'),
	('Jade'),
	('Jambo'),
	('Laranja'),
	('Laranja escuro'),
	('Lavanda'),
	('Lavanda avermelhada'),
	('Lilás'),
	('Lima'),
	('Limão'),
	('Linho'),
	('Loiro'),
	('Madeira'),
	('Magenta'),
	('Magenta escuro'),
	('Malva'),
	('Mamão batido'),
	('Maná'),
	('Marfim'),
	('Marrom'),
	('Marrom amarelado'),
	('Marrom claro'),
	('Marrom rosado'),
	('Marrom sela'),
	('Milho'),
	('Milho Claro'),
	('Mocassim'),
	('Mostarda'),
	('Naval'),
	('Neve'),
	('Ocre'),
	('Oliva'),
	('Oliva escura'),
	('Oliva parda'),
	('Orquídea'),
	('Orquídea escura'),
	('Orquídea média'),
	('Ouro'),
	('Prata'),
	('Preto'),
	('Púrpura'),
	('Rosa'),
	('Rosa claro'),
	('Rosa embaçado'),
	('Roxo'),
	('Rútilo'),
	('Salmão'),
	('Salmão claro'),
	('Salmão escuro'),
	('Seda'),
	('Siena'),
	('Sépia'),
	('Tan'),
	('Terracota'),
	('Tijolo refratário'),
	('Tomate'),
	('Trigo'),
	('Triássico'),
	('Turquesa'),
	('Turquesa escura'),
	('Turquesa média'),
	('Turquesa pálida'),
	('Irucum'),
	('Verde'),
	('Verde espectro'),
	('Verde amarelado'),
	('Verde claro'),
	('Verde escuro'),
	('Verde floresta'),
	('Verde fluorescente'),
	('Verde lima'),
	('Verde grama'),
	('Verde mar claro'),
	('Verde mar escuro'),
	('Verde mar médio'),
	('Verde militar'),
	('Verde Paris'),
	('Verde primavera'),
	('Verde pálido'),
	('Verde-azulado'),
	('Vermelho'),
	('Vermelho escuro'),
	('Vermelho indiano'),
	('Vermelho violeta'),
	('Vermelho violeta pálido'),
	('Violeta'),
	('Violeta escuro');

INSERT INTO tb_categoria (descricao) VALUES
	('Carro'),
	('Moto');

INSERT INTO tb_participacao (descricao) VALUES
	('Presencial'),
	('Online'),
	('Ambos');

INSERT INTO tb_combustivel (id, descricao) VALUES
	(1, 'Álcool'),
	(2, 'Gasolina'),
	(3, 'Diesel'),
	(4, 'Flex');

INSERT INTO tb_tipo (id, descricao) VALUES
	(1, 'Passeio'),
	(2, 'Conversível'),
	(3, 'Pickup'),
	(4, 'SUV'),
	(5, 'Antigo');

INSERT INTO tb_usuario (id, nome, telefone, email, password) VALUES
	(1, 'ADMIN', '(00)00000-0000', 'admin@localhost', '$2a$10$uUbf1X3jgf.iDeWZGzgULeFomDSFurxdPe7/hJdIaUE5IIjZdP9Yi');
	-- HASH para senha: admin123
