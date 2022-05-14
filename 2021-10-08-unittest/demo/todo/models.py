from django.db import models

class Todo(models.Model):
    content = models.CharField('待办事项内容', max_length=200)
    remark = models.CharField('备注', max_length=500)
    PRIORITY_CHOICES = [
        (1, '低优先级'),
        (2, '中低优先级'),
        (3, '中优先级'),
        (4, '中高优先级'),
        (5, '高优先级'),
    ]
    priority = models.IntegerField('优先级', choices=PRIORITY_CHOICES, default=1)
    completed = models.BooleanField('是否已完成', default=False)
    created_time = models.DateTimeField('创建的时间', auto_now_add=True)
    modified_time = models.DateTimeField('最后一次更新的时间', auto_now=True)

    class Meta:
        db_table = 'todo'

    def __str__(self):
        return self.content

