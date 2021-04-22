import requests
from django.shortcuts import render
from django.urls import reverse
from django.views.generic.base import View


class Home(View):
    def get(self, request, *args, **kwargs):
        context = {'title': 'Manuscript list'}
        # todo: изменить формат ссылки
        manuscript_list_api = requests.get('http://127.0.0.1:8000/api/v1/manuscript')
        context['manuscript_list_api'] = manuscript_list_api.json()
        return render(request, "index.html", context=context)