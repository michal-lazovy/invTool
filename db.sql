CREATE TABLE t_fund (
	id int(11),
	name varchar(300),
	link varchar(500),
	portfolio decimal(6,2) default 0
);

CREATE TABLE t_fund_value (
	id_fund int(11),
	value_date date,
	fund_value decimal(6,2)
);

