from django.urls import path
from .views import Manuscript_list, Manuscript_item

urlpatterns = [
    path('', Manuscript_list.as_view(), name='manuscript'),
    path('<int:pk>/', Manuscript_item.as_view(), name='manuscript_item'),
]