-- 因为Redis的很多指令常常返回0表示失败，返回1表示成功，为了与0和1区分开来，使用10和20
-- 如果锁不存在，直接返回
if redis.call("hexists", KEYS[1], ARGV[1]) == 0 then
    return 10
-- 如果锁存在，并且减1之后计数值已经变为0就删除键
elseif redis.call("hincrby", KEYS[1], ARGV[1], -1) == 0 then
    return redis.call("del", KEYS[1])
-- 如锁存在，但是减1之后计数值不为0，直接返回
else
    return 20
end