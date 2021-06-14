import calendar
from datetime import datetime, timedelta

def get_start_time(time_number, time_unit):
    '''
    得到距离当前时间time_number秒/分钟/小时/天/周/月/年的时间
    '''
    if type(time_number) != int or type(time_unit) != str:
        raise Exception('传入的time_number需为整数类型，time_unit需为字符串类型')
    now = datetime.now()
    unit_list = ['seconds', 'minutes', 'hours', 'days', 'weeks']
    delta_params = None
    if time_unit in unit_list:
        delta_params = {
            time_unit: time_number
        }
        delta = timedelta(**delta_params)
        start_time = now - delta
        return start_time
    if time_unit == 'months':
        now_year = now.year
        now_month = now.month
        now_day = now.day
        start_year = now_year
        start_month = now_month - time_number
        start_day = now_day
        # 前time_number个月跨年了，比如当前是2021年3月，要取5月前的日期，那就是2020年10月
        if start_month <= 0:
            months_interval = abs(start_month)
            years_interval = months_interval // 12
            start_year = now_year - years_interval - 1
            start_month = 12 - months_interval % 12

        weekday, month_days = calendar.monthrange(year=start_year, month=start_month)
        # 前time_number个月没有当前日期，比如今天是3月31号，2月只有28号，那么取2月最后的一天28号
        if now_day > month_days:
            start_day = month_days
        start_time = now.replace(year=start_year, month=start_month, day=start_day)
        return start_time
    
    if time_unit == 'years':
        now_year = now.year
        now_month = now.month
        now_day = now.day
        start_year = now_year - time_number
        start_day = now_day
        weekday, month_days = calendar.monthrange(year=start_year, month=now_month)
        # 前time_number年对应的月没有当前日期，比如今天是2月29号，前1年的2月只有2月28号，那么取28号
        if now_day > month_days:
            start_day = month_days
        start_time = now.replace(year=start_year, month=now_month, day=start_day)
        return start_time

# 测试
x = get_start_time(1, 'years')
print(x)

from dateutil.relativedelta import relativedelta

def get_start_time_v1(time_number, time_unit):
    unit_list = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']
    if type(time_number) != int:
        raise Exception('传入的time_number类型需为整数')
    if time_unit not in unit_list:
        raise Exception('传入的单位time_unit不正确')
    now = datetime.now()
    delta_params = {
        time_unit: -time_number
    }
    start_time = now + relativedelta(**delta_params)
    return start_time

# 测试
y = get_start_time_v1(1, 'years')
print(y)

from datetime import date

today = date.today()
n = today.replace(year=2020)
print(n) # 2020-06-14


from datetime import datetime

now = datetime.now()
m = now.replace(month=5)
print(m) # 2021-05-14 16:27:44.384520


def get_time_interval(start_time, end_time):
    start_time = datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
    end_time = datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')
    if type(start_time) != datetime or type(end_time) != datetime:
        raise Exception('传入的参数格式不正确')
    if end_time < start_time:
        raise Exception('结束时间小于开始时间')
    interval = end_time - start_time
    return interval.seconds

# 测试
z = get_time_interval('2021-06-14 14:55:00', '2021-06-14 14:55:02')
print(z)


def get_time_interval_v1(start_time, end_time):
    start_time = datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
    end_time = datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')
    if type(start_time) != datetime or type(end_time) != datetime:
        raise Exception('传入的参数格式不正确')
    if end_time < start_time:
        raise Exception('结束时间小于开始时间')
    interval = relativedelta(end_time, start_time)
    return interval.years * 12 + interval.months
    
o = get_time_interval_v1('2021-06-14 14:55:00', '2022-07-14 14:55:02')
print(o)