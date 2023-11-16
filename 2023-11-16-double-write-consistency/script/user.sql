create table if not exists users (
    id int auto_increment primary key,
    name varchar(100) not null,
    created_time int, 
    updated_time int
);


insert into users (name)
values ("王小明"),
("李小狼");
