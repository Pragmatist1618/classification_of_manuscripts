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

    # r = requests.get('https://api.github.com/user', auth=('user', 'pass'))
    # >> > r.status_code
    # 200
    # >> > r.headers['content-type']
    # 'application/json; charset=utf8'
    # >> > r.encoding
    # 'utf-8'
    # >> > r.text
    # '{"type":"User"...'
    # >> > r.json()
    # {'private_gists': 419, 'total_private_repos': 77, ...}