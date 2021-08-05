create database if not exists game_demo;

use game_demo;

-- 创建用户表
create table if not exists users (
    id varchar(20) primary key,
    name varchar(255) not null,
    phone varchar(20),
    created_time datetime not null,
    modified_time datetime not null
);

-- 创建比赛表
create table if not exists games (
    id int,
    user_id varchar(20),
    result varchar(200) not null,
    game_partition varchar(2) not null,
    created_time datetime not null,
    modified_time datetime not null,
    primary key(id, user_id)
);

-- 创建日志表
create table if not exists user_actions (
    id int primary key auto_increment,
    user_id varchar(20),
    action varchar(255) not null,
    created_time datetime not null,
    modified_time datetime not null
);

show tables;

describe user_actions;

-- 向用户表中添加10个用户
insert into users(id, name, phone, created_time, modified_time)
values 
    ('1', '用户1', '13012345671', current_timestamp(), current_timestamp()),
    ('2', '用户2', '13012345672', current_timestamp(), current_timestamp()),
    ('3', '用户3', '13012345673', current_timestamp(), current_timestamp()),
    ('4', '用户4', '13012345674', current_timestamp(), current_timestamp()),
    ('5', '用户5', '13012345675', current_timestamp(), current_timestamp()),
    ('6', '用户6', '13012345676', current_timestamp(), current_timestamp()),
    ('7', '用户7', '13012345677', current_timestamp(), current_timestamp()),
    ('8', '用户8', '13012345678', current_timestamp(), current_timestamp()),
    ('9', '用户9', '13012345679', current_timestamp(), current_timestamp()),
    ('10', '用户10', '13012345670', current_timestamp(), current_timestamp());

select * from users;

-- 向用户行为表中插入点击入口数据
insert into user_actions(id, user_id, action, created_time, modified_time)
values
    (1, '1', 'click_a_entrace', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (2, '2', 'click_a_entrace', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (3, '3', 'click_b_entrace', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (4, '4', 'click_b_entrace', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (5, '5', 'click_a_entrace', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (6, '6', 'click_a_entrace', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (7, '7', 'click_c_entrace', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (8, '8', 'click_c_entrace', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (9, '9', 'click_b_entrace', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (10, '10', 'click_b_entrace', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (11, '1', 'click_c_entrace', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (12, '2', 'click_c_entrace', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (13, '3', 'click_a_entrace', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (14, '4', 'click_a_entrace', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (15, '5', 'click_c_entrace', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (16, '6', 'click_c_entrace', '2020-01-01 10:10:10', '2020-01-01 10:10:10');
        
select * from user_actions;

-- 向用户行为表中插入发起投降数据
insert into user_actions(id, user_id, action, created_time, modified_time)
values
    (17, '1', 'click_surrender', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (18, '2', 'click_surrender', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (19, '2', 'click_surrender', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (20, '3', 'click_surrender', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (21, '4', 'click_surrender', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (22, '4', 'click_surrender', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (23, '5', 'click_surrender', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (24, '6', 'click_surrender', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (25, '6', 'click_surrender', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (26, '7', 'click_surrender', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (27, '8', 'click_surrender', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (28, '8', 'click_surrender', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (29, '9', 'click_surrender', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (30, '10', 'click_surrender', '2021-06-01 10:10:10', '2021-06-01 10:10:10'), 
    (31, '10', 'click_surrender', '2021-06-01 10:10:10', '2021-06-01 10:10:10'), 
    (32, '1', 'click_surrender', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (33, '2', 'click_surrender', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (34, '2', 'click_surrender', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (35, '3', 'click_surrender', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (36, '4', 'click_surrender', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (37, '4', 'click_surrender', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (38, '5', 'click_surrender', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (39, '6', 'click_surrender', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (40, '6', 'click_surrender', '2020-01-01 10:10:10', '2020-01-01 10:10:10');

select * from user_actions;        

-- 向比赛表中插入用户比赛的信息
insert into games(id, user_id, result, game_partition, created_time, modified_time)
values
    (1, '1', 'succeed', 'a', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (1, '2', 'failed', 'a', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (2, '3', 'succeed', 'b', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (2, '4', 'failed', 'b', '2021-07-17 10:10:10', '2021-07-17 10:10:10'),
    (3, '5', 'succeed', 'a', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (3, '6', 'failed', 'a', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (4, '7', 'succeed', 'c', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (4, '8', 'failed', 'c', '2021-07-16 10:10:10', '2021-07-16 10:10:10'),
    (5, '9', 'succeed', 'b', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (5, '10', 'failed', 'b', '2021-06-01 10:10:10', '2021-06-01 10:10:10'), 
    (6, '1', 'succeed', 'c', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (6, '2', 'failed', 'c', '2021-06-01 10:10:10', '2021-06-01 10:10:10'),
    (7, '3', 'succeed', 'a', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (7, '4', 'failed', 'a', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (8, '5', 'succeed', 'c', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (8, '6', 'failed', 'c', '2020-01-01 10:10:10', '2020-01-01 10:10:10');

select * from games;
