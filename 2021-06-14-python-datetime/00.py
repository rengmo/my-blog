from datetime import date

today = date.today()
today_str = today.strftime('%Y-%m-%d')
print(today_str) # 2021-06-14


from datetime import datetime

dt = datetime(2021, 6, 14, 15, 2, 3)
dt_str = dt.strftime('%Y/%m/%d %H:%M:%S')
print(dt_str) # 2021/06/14 15:02:03

from datetime import time

t = time(15, 3, 0)
t_str = t.strftime('%H:%M:%S')
print(t_str) # 15:03:00


from datetime import datetime

dt = datetime.strptime('2021/06/14 15:05:06', '%Y/%m/%d %H:%M:%S')
print(dt, type(dt)) # 2021-06-14 15:05:06 <class 'datetime.datetime'>
 