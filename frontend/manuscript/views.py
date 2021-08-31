import requests
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic.base import View


class Manuscript_list(View):
    def get(self, request, *args, **kwargs):
        context = {'title': 'Manuscript list'}
        manuscript_list_api = requests.get(request.build_absolute_uri(reverse('manuscript-api-list')))
        context['manuscript_list_api'] = manuscript_list_api.json()
        storages = []
        lec_types = []

        gospels = []
        part_of_lists = []
        lec_part_types = []

        for manuscript in manuscript_list_api.json():
            if not manuscript['storage'] in storages and manuscript['storage'] is not None:
                storages.append(manuscript['storage'])

            if not manuscript['lec_type'] in lec_types and manuscript['lec_type'] is not None:
                lec_types.append(manuscript['lec_type'])

            for img in manuscript['images']:
                if not img['gospel'] in gospels and img['gospel'] is not None:
                    gospels.append(img['gospel'])

                if not img['part_of_list'] in part_of_lists and img['part_of_list'] is not None:
                    part_of_lists.append(img['part_of_list'])

                if not img['lec_part_type'] in lec_part_types and img['lec_part_type'] is not None:
                    lec_part_types.append(img['lec_part_type'])

        context['storages'] = storages
        context['lec_types'] = lec_types

        context['gospels'] = gospels
        context['part_of_lists'] = part_of_lists
        context['lec_part_types'] = lec_part_types

        LEC_MONTH_CHOICES = [
            "St",
            'Ok',
            'Nw',
            'Dec',
            "Ja",
            'Feb',
            'Mar',
            'Apr',
            "May",
            'Jun',
            'Jul',
            'Aug',
            'unknown',
        ]

        context['lec_month_choices'] = LEC_MONTH_CHOICES

        to_update = {}
        for manuscript in manuscript_list_api.json():
        #     перебираем поля рукописи
        # to_update[manuscript] = []
            for img in manuscript['images']:
        #         перебираем поля изображений
        # if !manuscript in to_update:
        #     to_update[manuscript] = []
        # to_update[manuscript].append(img)
                pass

        context['to_update'] = to_update

        return render(request, "manuscript_list.html", context=context)


class Manuscript_item(View):
    def get(self, request, *args, **kwargs):
        url = request.build_absolute_uri(reverse('manuscript-api-detail',
                                                 kwargs={'pk': self.kwargs.get('pk')}))
        manuscript_api = requests.get(url).json()
        context = {
            'title': manuscript_api['cipher'],
            'manuscript': manuscript_api
        }
        return render(request, "manuscript_item.html", context=context)


class Manuscript_image(View):
    def get(self, request, *args, **kwargs):
        url = request.build_absolute_uri(reverse('manuscript-img-details',
                                                 kwargs={'pk': self.kwargs.get('pk')}))
        manuscript_img = requests.get(url).json()

        context = {
            'title': manuscript_img['cipher'],
            'manuscript': manuscript_img
        }
        return render(request, "manuscript_img.html", context=context)

