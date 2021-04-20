from rest_framework import viewsets, permissions

from .models import Manuscript, Image
from .serializers import ManuscriptGetSerializer, ManuscriptSetSerializer, ImageSerializer


# TODO: добавить пагинацию
# используем viewsets т.к. нужны: `create()`, `retrieve()`, `update()`,
#     `partial_update()`, `destroy()` and `list()` actions
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


class ImagesViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer
