import json

from PIL import Image as img_pil
from django.http import HttpResponse, JsonResponse

from classification_of_manuscripts.settings import MEDIA_URL, BASE_DIR

from django.shortcuts import get_object_or_404, redirect
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Manuscript, Image
from .serializers import ManuscriptGetSerializer, ManuscriptSetSerializer, ImageSerializer, ImageInfoSerializer

# используем viewsets т.к. нужны: `create()`, `retrieve()`, `update()`,
#     `partial_update()`, `destroy()` and `list()` actions

# 'manuscript-api'
class ManuscriptViewSet(viewsets.ModelViewSet):
    # определяем набор данных
    queryset = Manuscript.objects.all()
    # права доступа
    permission_classes = [
        permissions.AllowAny,
    ]
    # подключаем сериалайзер
    # метод выбора сериалайзера
    def get_serializer_class(self):
        # если мы получаем набор данных или один элемент
        # то используем сериалайзер с получением изображений
        if self.action == 'list' or self.action == 'retrieve':
            return ManuscriptGetSerializer
        # для прочих действий изображения не нужны
        return ManuscriptSetSerializer


# 'manuscript-img'
class ImagesViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer


# manuscript and img-pk
# нследуемся от api-view т.к нам необходим только метод get
class ImageInfoView(APIView):
    def get(self, request, pk):
        # получаем сущность
        image = get_object_or_404(Image, id=pk)
        # получаем id рукописи
        # manuscript_id = image.manuscript

        serializer = ImageInfoSerializer(image)
        return Response(serializer.data, status=status.HTTP_200_OK)


def img_rotate(request, pk):
    if request.method == 'POST':
        img = get_object_or_404(Image, id=pk)

        im = img_pil.open(img.image)
        # im.show()

        im_rotate = im.rotate(90, expand=True)
        # im_rotate.show()

        im_rotate.save(BASE_DIR + '/backend' + MEDIA_URL + str(img.image))
        im.close()

        # return redirect(request.META.get('HTTP_REFERER'))
        return HttpResponse(json.dumps({'message': []}))
        # return JsonResponse({'message': 'send'}, status=200)
