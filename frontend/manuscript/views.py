import requests
from django.shortcuts import render
from django.urls import reverse
from django.views.generic.base import View


class Manuscript_list(View):
    def get(self, request, *args, **kwargs):
        context = {'title': 'Manuscript list'}
        manuscript_list_api = requests.get(request.build_absolute_uri(reverse('manuscript-api-list')))
        context['manuscript_list_api'] = manuscript_list_api.json()
        return render(request, "manuscript_list.html", context=context)


class Manuscript_item(View):
    def get(self, request, *args, **kwargs):
        url = request.build_absolute_uri(reverse('manuscript-api-detail',
                                                 kwargs={'pk': self.kwargs.get('pk')}))
        manuscript_api = requests.get(url).json()
        context = {
            'title': manuscript_api['title'],
            'manuscript': manuscript_api
        }
        return render(request, "manuscript_item.html", context=context)
