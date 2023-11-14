-- 锁存在，并且hash中存储了指定的键，说明程序还在执行中，更新锁的过期时间
if redis.call("hexists", KEYS[1], ARGV[1]) == 1 then
    return redis.call("expire", KEYS[1], ARGV[2])
-- 否则锁不存在
else
    return 10
end