CREATE TABLE category(
  id SERIAL NOT NULL,
  description varchar(100) NOT NULL,
  CONSTRAINT category_pkey PRIMARY KEY (id)
)

INSERT INTO category(description) values('ADMIN'),('USER'),('DEV')

CREATE TABLE client
(
  id SERIAL NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  photo varchar(100),
  dateCreate varchar(50) NOT NULL,
  birth varchar(50),
  age int,
  state boolean NOT NULL,
  idcategory integer NOT NULL REFERENCES category,
  email varchar(50),
  password varchar(20),
  CONSTRAINT client_pkey PRIMARY KEY (id)
)

insert into client(firstname, lastname, photo, dateCreate, birth, age, state, idCategory, email, password)
	values('', '', '', dateCreate, age, state, idCategory, email, password)


CREATE TABLE texture (
  id SERIAL NOT NULL,
  description varchar(50) NOT NULL,
  CONSTRAINT texture_pkey PRIMARY KEY (id) 
)

INSERT INTO texture(description) values('Gross'),('Middle'),('Slim')

CREATE TABLE physicalState (
  id SERIAL NOT NULL,
  idClient INT NOT NULL REFERENCES client,
  height DECIMAL(3,2) NOT NULL,
  age INT NOT NULL,
  weight DECIMAL(3,2) NOT NULL,
  idTexture INT NOT NULL REFERENCES texture,
  CONSTRAINT physicalState_pkey PRIMARY KEY (id)
)

CREATE TABLE historyPhysicialState (
  id SERIAL NOT NULL,
  idClient INT NOT NULL REFERENCES client,
  weight DECIMAL(3,2) NOT NULL,
  CONSTRAINT historyPhysicalState_pkey PRIMARY KEY (id)
)
DROP TABLE category
select * from client