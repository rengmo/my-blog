from django.test import TestCase, Client
from django.urls import reverse
from todo.models import Todo
from unittest.mock import patch

class TodoTestCase(TestCase):
    def setUp(self):
        todo_data = {
            'content': '粉刷',
            'remark': '我是一个粉刷匠',
            'priority': 5
        }
        Todo.objects.create(**todo_data)
    
    def test_create_todo(self):
        '''测试待办事项的创建'''
        todo_data = {
            'content': '喝茶',
            'remark': '粉刷累了喝杯茶',
            'priority': 3
        }
        url = reverse('todo:create')
        client = Client()
        response = client.post(url, todo_data)
        status_code = response.status_code
        self.assertEqual(status_code, 201)
        todo_queryset = Todo.objects.all()
        self.assertEqual(todo_queryset.count(), 2)

class TodoTestCaseOne(TestCase):
    fixtures = ['todo/tests/fixtures/todo.json']

    
    def test_fixtures(self):
        '''测试夹具导入的数据'''
        todo_queryset = Todo.objects.all()
        self.assertEqual(todo_queryset.count(), 1)


class TodoTestCaseTwo(TestCase):
    def setUp(self):
        todo_data = {
            'content': '粉刷',
            'remark': '我是一个粉刷匠',
            'priority': 5
        }
        Todo.objects.create(**todo_data)
    
    @patch('todo.utils.b.a_function', return_value=True)
    def test_get_todo_a_true(self, mock_a):
        '''测试获取待办事件列表

        模拟的a_function的返回值为True
        '''
        todo_queryset = Todo.objects.all() # 这里能拿到数据
        url = reverse('todo:list')
        client = Client()
        response = client.get(url) # 但是这里View内部的代码拿到的todo表的数据为空
        status_code = response.status_code
        self.assertEqual(status_code, 200)
    
    @patch('todo.utils.b.a_function', return_value=False)
    def test_get_todo_a_false(self, mock_a):
        '''测试获取待办事件列表

        模拟的a_function的返回值为False
        '''
        url = reverse('todo:list')
        client = Client()
        response = client.get(url)
        status_code = response.status_code
        self.assertEqual(status_code, 400)
    
    def test_a_x():
        print('a_x')










