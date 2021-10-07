x = []

def y():
    print('y')
    return 1

a = x and y()
b = bool(x and y())

print(a, b) # [] False


from datetime import datetime, timedelta

now = datetime.now()
yesterday = now + timedelta(days=-1)

print(now > yesterday) # True

print(2 <= 1.5) # False

# print(2 <= now) # TypeError: '<=' not supported between instances of 'int' and 'datetime.datetime'

c = (1, 2)
d = (1, 2)

print(c == d) # True
print(c is d) # True
print(id(c), id(d)) # 4470112416 4470112416



e = [1, 2]
f = [1, 2]

print(e == f) # True
print(e is f) # False
print(id(e), id(f)) # 4479741616 4478061536

print(1 in [1, 2, 3]) # True
print(1 not in (1, 2, 3)) # False

g = 'g'
h = 1
i = [1, 2]
j = { 'j': 1 }

print(isinstance(g, str)) # True
print(isinstance(h, int)) # True
print(isinstance(i, list)) # True
print(isinstance(j, dict)) # True


print(type('g') == str) # True
print(type(1) == int) # True


k = 2 / 1

print(k) # 2.0

l = 1 / 2
m = 1 // 2

print(l, m) # 0.5 0

n = 3.5 % 2

print(n) # 1.5

import math

o = math.trunc(1.2)
p = round(1.2265, 2)
q = round(2.5)
r = math.floor(1.2)
s = math.ceil(1.2)

print(o, p, q, r, s) # 1 1.23 2 1 2

import json

t = [
    'a',
    1,
    {
        'b': [1, 2, 3]
    }
]

t_str = json.dumps(t)
t_json = json.loads(t_str)

print(t_str, t_json[2]['b'][0]) # '["a", 1, {"b": [1, 2, 3]}]' 1

u = [1, 2]
v = [3, 4, 5, 6, 7, 8]

print(1 in u) # True
print(3 not in u) # True
print(u + v) # [1, 2, 3, 4, 5, 6, 7, 8]
print([None] * 2) # [None, None]
print(u[0]) # 1
print(v[1: 3]) # [4, 5]
print(v[0: 5: 1]) # [3, 4, 5, 6, 7]
print(len(u)) # 2
print(min(v)) # 3
print(max(v)) # 8
print(v.index(6)) # 3
print(v.count(1)) # 0

w = 'abc'.find('a')
print(w) # 0

x = '随便写点 {0}. {a}'.format('句子', a='哈哈')
print(x) # 随便写点 句子. 哈哈

y = ['基', '金', '狂', '跌', '，啧', '〠_〠']
print(''.join(y)) # 基金狂跌，啧〠_〠

z = 'Xyz'
print(z.lower()) # xyz


a = '这个a字符串a里没a有英文字母a'
print(a.replace('a', '')) #这个字符串里没有英文字母


b = 'a, b, c, d, e'
print(b.split(',')) # ['a', ' b', ' c', ' d', ' e']
print(b.split(',', 2)) # ['a', ' b', ' c, d, e']


c = 'xyz'
print(c.upper()) # XYZ

d = [1, 2]
d.append(3)
print(d) # [1, 2, 3]

d.extend((3, 4, 5))
print(d) # [1, 2, 3, 3, 4, 5]

d.insert(0, 10)
print(d) # [10, 1, 2, 3, 3, 4, 5]

d.remove(3) # [10, 1, 2, 3, 4, 5]
print(d)

d.pop() # [10, 1, 2, 3, 4]
print(d)

d.clear() # []
print(d)


for e in ('a', 'b', 'c'):
    print(e)

for i, f in enumerate(['a', 'b', 'c']):
    print(i, e)

# 0 c
# 1 c
# 2 c

g = {
    'a': 10,
    'b': 20,
    'c': 30,
}
for k, v in g.items():
    print(k, v)

# a 10
# b 20
# c 30

h_arr = [1, 2, 3]
i_arr = [4, 5]

for h, i in zip(h_arr, i_arr):
    print(h, i)

# 1 4
# 2 5