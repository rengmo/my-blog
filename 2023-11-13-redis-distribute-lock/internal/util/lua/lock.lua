-- 锁不存在的时候，新增锁
-- 锁存在，并且hash中存储了指定的键时，将加锁的计数增加1
if redis.call("exists", KEYS[1]) == 0 or redis.call("hexists", KEYS[1], ARGV[1]) == 1 then
    redis.call("hincrby", KEYS[1], ARGV[1], 1)
    redis.call("expire", KEYS[1], ARGV[2])
    return 1
-- 锁存在，但是hash中不存在指定的键时，什么也不做
else
    return 0
end