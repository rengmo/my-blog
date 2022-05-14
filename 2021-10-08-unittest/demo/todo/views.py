from django.core import serializers
from django.http import HttpResponse, JsonResponse, QueryDict
from django.views import View
from .models import Todo
from .utils.c import c_function
import json

class TodoView(View):
    '''清单
    
    post：创建清单；put：更新清单；get：获取清单详情
    '''
    def format_request_data(self, request_data):
        '''整理请求传递的数据'''
        todo_data = {}
        todo_data['content'] = request_data.get('content', '')
        todo_data['remark'] = request_data.get('remark', '')
        todo_data['priority'] = int(request_data.get('priority', 1))
        return todo_data
    
    def get(self, request, pk):
        try:
            todo = Todo.objects.filter(pk=pk)
            todo_list_str = serializers.serialize('json', todo) # 将QuerySet序列化为JSON数据
            todo_list = json.loads(todo_list_str)
            todo_data = todo_list[0]['fields']
            return JsonResponse(todo_data, status=200)
        except Exception as e:
            return HttpResponse(f'获取清单失败，{e.__str__()}', status=400)

    def post(self, request):
        try:
            data = QueryDict(request.body)
            todo_data = self.format_request_data(data)
            todo = Todo(**todo_data)
            todo.save()
            return HttpResponse('创建清单成功', status=201)
        except Exception as e:
            return HttpResponse(f'创建清单失败，{e.__str__()}', status=400)

    def put(self, request, pk):
        try:
            data = QueryDict(request.body)
            todo_data = self.format_request_data(data)
            Todo.objects.filter(pk=pk).update(**todo_data)
            return HttpResponse('更新清单成功', status=200)
        except Exception as e:
            return HttpResponse(f'更新清单失败，{e.__str__()}', status=400) 

class TodoListView(View):
    '''清单列表

    get：获取清单列表
    '''
    def get(self, request):
        try:
            c_function()
            todo_list = Todo.objects.all()
            todo_list_str = serializers.serialize('json', todo_list) # 将QuerySet序列化为JSON数据
            todo_list_data = json.loads(todo_list_str)
            res_data = []
            for todo in todo_list_data:
                todo_data = { **todo.get('fields') }
                todo_data.update(id=todo.get('pk'))
                res_data.append(todo_data)
            return JsonResponse(res_data, safe=False, status=200) # 设置safe为False是为了返回非字典类型的数据
        except Exception as e:
            return HttpResponse(f'获取清单列表失败，{e.__str__()}', status=400)
