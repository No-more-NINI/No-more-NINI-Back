CREATE TABLE user (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	address VARCHAR(100),
	birthdate DATE,
	email VARCHAR(100),
	password VARCHAR(50),
	latitude FLOAT,
	longitude FLOAT
);

CREATE TABLE m_offer(
	id SERIAL PRIMARY KEY,
	idComp INT REFERENCES m_company(usrId),
	title VARCHAR(100),
	description TEXT,
	salary FLOAT NOT NULL
);

CREATE TABLE m_employee(
	usrId INT PRIMARY KEY REFERENCES m_user(id)
);
CREATE TABLE m_company(
	usrId INT PRIMARY KEY REFERENCES m_user(id),
	description TEXT,
	image TEXT
);

create table m_user_offer (
	idoffer int,
	idcomp int,
	iduser int,
	acc_date date,
	accepted boolean default false,
	primary key(idoffer,idcomp,iduser,acc_date),
	foreign key (idoffer) references m_offer(id),
	foreign key (idcomp) references m_company(usrid),
	foreign key (iduser) references m_user(id)
);