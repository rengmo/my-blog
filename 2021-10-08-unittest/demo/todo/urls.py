from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import TodoView, TodoListView

app_name = 'todo'

urlpatterns = [
    path('create/', csrf_exempt(TodoView.as_view()), name='create'),
    path('edit/<int:pk>/', csrf_exempt(TodoView.as_view()), name='edit'),
    path('<int:pk>/', csrf_exempt(TodoView.as_view()), name='detail'),
    path('list/', csrf_exempt(TodoListView.as_view()), name='list'),
]