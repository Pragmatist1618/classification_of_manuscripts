from rest_framework import viewsets, permissions

from .models import Manuscript
from .serializers import ManuscriptSerializer


# используем viewsets
class ManuscriptViewSet(viewsets.ModelViewSet):
    # определяем набор данных
    queryset = Manuscript.objects.all()
    # права доступа
    permission_classes = [
        permissions.AllowAny,
    ]
    # подключаем сериалайзер
    serializer_class = ManuscriptSerializer
