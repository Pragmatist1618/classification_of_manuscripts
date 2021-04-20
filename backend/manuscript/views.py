from rest_framework import viewsets, permissions

from .models import Manuscript
from .serializers import ManuscriptGetSerializer, ManuscriptSetSerializer


# используем viewsets
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


