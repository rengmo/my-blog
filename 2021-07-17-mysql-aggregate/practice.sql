use game_demo;

show tables;
    
select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
	count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
    count(if(action='click_a_entrace', true, null)) / count(action) as a_rate,
    count(if(action='click_b_entrace', true, null)) / count(action) as b_rate,
    count(if(action='click_c_entrace', true, null)) / count(action) as c_rate,
	date_format(created_time, '%Y-%m-%d') as action_date
from user_actions where action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by action_date;

select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
	count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
	date_format(created_time, '%Y-%u') as action_date
from user_actions where action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by action_date;

select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
	count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
	date_format(created_time, '%Y-%m') as action_date
from user_actions where action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by action_date;

select
    count(if(action='click_a_entrace', true, null)) as a_count,
    count(if(action='click_b_entrace', true, null)) as b_count,
	count(if(action='click_c_entrace', true, null)) as c_count,
    count(action) as all_count,
	date_format(created_time, '%Y') as action_date
from user_actions where action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by action_date
order by action_date;

insert into user_actions(id, user_id, action, created_time, modified_time)
values
	(41, '6', 'click_c_entrace', '2020-01-01 10:10:10', '2020-01-01 10:10:10');

select * from user_actions;

select
    count(distinct if(action='click_a_entrace', user_id, null)) as a_count,
    count(distinct if(action='click_b_entrace', user_id, null)) as b_count,
	count(distinct if(action='click_c_entrace', user_id, null)) as c_count,
    count(distinct user_id) as all_count,
	date_format(created_time, '%Y') as action_date
from user_actions where action in ('click_a_entrace', 'click_b_entrace', 'click_c_entrace')
group by action_date;

delete from user_actions where id=41;

select * from games;


insert into games(id, user_id, result, game_partition, created_time, modified_time)
values
	(9, '1', 'succeed', 'a', '2021-07-17 10:10:10', '2021-07-17 10:10:10');

select
    game_partition,
	user_id,
	count(if(result='succeed', true, null)) as success_count,
    count(result) as all_count,
    count(if(result='succeed', true, null)) / count(result) as success_rate
from games where created_time >= '2020-01-01 00:00:00' and created_time < '2021-07-17 23:59:59'
group by game_partition, user_id
order by game_partition;

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
		from games where created_time >= '2020-01-01 00:00:00' and created_time < '2021-07-17 23:59:59'
		group by game_partition, user_id
		order by game_partition
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
	from games where created_time >= '2020-01-01 00:00:00' and created_time < '2021-07-17 23:59:59'
	group by user_id 
	order by success_rate desc
	limit 3
) as success_rate_table
left join (
  select 
    user_id,
	count(1) as click_surrender_count
 from user_actions where action='click_surrender'
 group by user_id
) as click_surrender_table
on success_rate_table.user_id = click_surrender_table.user_id
order by click_surrender_table.click_surrender_count;


    