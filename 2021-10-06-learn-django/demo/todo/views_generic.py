from django.core import serializers
from django.views import generic
from django.http import JsonResponse
from .models import Todo
import json

class TodoListView(generic.ListView):
    model = Todo

    def render_to_response(self, context):
            todo_list = context.get('object_list')
            todo_list_str = serializers.serialize('json', todo_list) # 将QuerySet序列化为JSON数据
            todo_list_data = json.loads(todo_list_str)
            res_data = []
            for todo in todo_list_data:
                todo_data = { **todo.get('fields') }
                todo_data.update(id=todo.get('pk'))
                res_data.append(todo_data)
            return JsonResponse(res_data, safe=False, status=200) # 设置safe为False是为了返回非字典类型的数据
