set odps.sql.type.system.odps2=true;

show tables;

-- 创建用户表
create table if not exists users_demo (
    id varchar(20) not null comment '用户id',
    name varchar(255) not null comment '用户名称',
    phone varchar(20) comment '电话号码',
    created_time datetime not null comment '创建时间',
    modified_time datetime not null comment '修改时间'
)
partitioned by (dt char(10) comment '创建日期');

-- 查看表信息
desc users_demo;

-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;
-- 创建比赛表
create table if not exists games_demo (
    id int not null comment '比赛id',
    user_id varchar(20) not null comment '用户id',
    result varchar(200) not null comment '比赛结果',
    game_partition varchar(2) not null comment '比赛分区',
    created_time datetime not null comment '创建时间',
    modified_time datetime not null comment '修改时间'
)
partitioned by (dt char(10) comment '创建日期');

desc games_demo;

-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;
-- 创建日志表
create table if not exists user_actions_demo (
    id int not null comment '日志id',
    user_id varchar(20) comment '用户id',
    action varchar(255) not null comment '用户行为',
    created_time datetime not null comment '创建时间',
    modified_time datetime not null comment '修改时间'
)
partitioned by (dt char(10) comment '创建日期');

desc user_actions_demo;

-- 删除分区
alter table users_demo drop if exists partition (dt='20210805');

-- 添加分区
alter table users_demo add if not exists partition (dt='20210805');

set odps.sql.type.system.odps2=true;
-- 展示 users_demo 表的分区
show partitions users_demo; 

-- 查看分区信息
desc users_demo partition (dt='20210805');

-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;

insert into users_demo partition (dt='20210805') 
values
    ('1', '用户1', '13012345671', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('2', '用户2', '13012345672', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('3', '用户3', '13012345673', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('4', '用户4', '13012345674', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('5', '用户5', '13012345675', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('6', '用户6', '13012345676', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('7', '用户7', '13012345677', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('8', '用户8', '13012345678', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('9', '用户9', '13012345679', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm')),
    ('10', '用户10', '13012345670', dateadd(getdate(), -60, 'mm'), dateadd(getdate(), -60, 'mm'));

--开启全表扫描，仅此Session有效。查看表中的所有数据
set odps.sql.allow.fullscan=true;
select * from users_demo;

select * from users_demo where dt=20210805;

-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;
-- 添加分区
alter table games_demo add if not exists partition (dt='20210805');

-- 展示 users_demo 表的分区
show partitions games_demo; 

-- 查看分区信息
desc games_demo partition (dt='20210805');

-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;

-- 向比赛表中插入用户比赛的信息
insert into games_demo partition (dt='20210805') 
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
    (8, '6', 'failed', 'c', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (9, '1', 'succeed', 'a', '2021-07-17 10:10:10', '2021-07-17 10:10:10');


--开启全表扫描，仅此Session有效。查看表中的所有数据
set odps.sql.allow.fullscan=true;
select * from games_demo;

select * from games_demo where dt=20210805;


-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;
-- 添加分区
alter table user_actions_demo add if not exists partition (dt='20210805');

-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;

-- 向用户行为表中插入点击入口数据
insert into user_actions_demo partition (dt='20210805') 
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
    (16, '6', 'click_c_entrace', '2020-01-01 10:10:10', '2020-01-01 10:10:10'),
    (41, '6', 'click_c_entrace', '2020-01-01 10:10:10', '2020-01-01 10:10:10');

select * from user_actions_demo where dt=20210805;

-- 这个语句写在这里是为了方便选中执行
set odps.sql.type.system.odps2=true;

-- 向用户行为表中插入发起投降数据
insert into user_actions_demo partition (dt='20210805') 
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


select * from user_actions_demo where dt=20210805;



select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
    count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
    count(if(action='click_a_entrace', true, null)) / count(action) as a_rate,
    count(if(action='click_b_entrace', true, null)) / count(action) as b_rate,
    count(if(action='click_c_entrace', true, null)) / count(action) as c_rate,
    to_char(created_time, 'yyyy-mm-dd') as action_date
from user_actions_demo where dt=20210805 and action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by to_char(created_time, 'yyyy-mm-dd');


select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
    count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
    concat(to_char(created_time, 'yyyy'), '-', weekofyear(created_time)) as action_date
from user_actions_demo where dt=20210805 and action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by concat(to_char(created_time, 'yyyy'), '-', weekofyear(created_time));


select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
    count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
    to_char(created_time, 'yyyy-mm') as action_date
from user_actions_demo where dt=20210805 and action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by to_char(created_time, 'yyyy-mm');

select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
    count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
    to_char(created_time, 'yyyy') as action_date
from user_actions_demo where dt=20210805 and action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by to_char(created_time, 'yyyy');

select
    count(distinct if(action='click_a_entrace', user_id, null)) as a_count,
    count(distinct if(action='click_b_entrace', user_id, null)) as b_count,
    count(distinct if(action='click_c_entrace', user_id, null)) as c_count,
    count(distinct user_id) as all_count,
    to_char(created_time, 'yyyy') as action_date
from user_actions_demo where dt=20210805 and action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by to_char(created_time, 'yyyy');


select
    game_partition,
    user_id,
    count(if(result='succeed', true, null)) as success_count,
    count(result) as all_count,
    count(if(result='succeed', true, null)) / count(result) as success_rate
from games_demo where dt=20210805 and created_time >= '2020-01-01 00:00:00' and created_time < '2021-07-17 23:59:59'
group by game_partition, user_id
order by game_partition;

select
    game_partition,
    user_id,
    success_rate,
    row_number() over (partition by game_partition order by success_rate desc) as partition_row_number
from (
	select
		game_partition,
		user_id,
		count(if(result='succeed', true, null)) as success_count,
		count(result) as all_count,
		count(if(result='succeed', true, null)) / count(result) as success_rate
	from games_demo where dt=20210805 and created_time >= '2020-01-01 00:00:00' and created_time < '2021-07-17 23:59:59'
	group by game_partition, user_id
	order by game_partition
    limit 20000
	) as rate_table;


select * from (
    select
        game_partition,
        user_id,
        success_rate,
        row_number() over (partition by game_partition order by success_rate desc) as partition_row_number
    from (
        select
            game_partition,
            user_id,
            count(if(result='succeed', true, null)) as success_count,
            count(result) as all_count,
            count(if(result='succeed', true, null)) / count(result) as success_rate
        from games_demo where dt=20210805 and created_time >= '2020-01-01 00:00:00' and created_time < '2021-07-17 23:59:59'
        group by game_partition, user_id
        order by game_partition
        limit 20000
        ) as rate_table
    ) as has_row_bumber_table
where partition_row_number <= 3;


select 
    success_rate_table.user_id, 
    success_rate_table.success_rate, 
    click_surrender_table.click_surrender_count
from (
    select
        user_id,
        count(if(result='succeed', true, null)) as success_count,
        count(result) as all_count,
        count(if(result='succeed', true, null)) / count(result) as success_rate
    from games_demo where dt=20210805 and created_time >= '2020-01-01 00:00:00' and created_time < '2021-07-17 23:59:59'
    group by user_id 
    order by success_rate desc
    limit 3
) as success_rate_table
left join (
  select 
    user_id,
    count(1) as click_surrender_count
 from user_actions_demo where dt=20210805 and action='click_surrender'
 group by user_id
) as click_surrender_table
on success_rate_table.user_id = click_surrender_table.user_id
order by click_surrender_table.click_surrender_count;