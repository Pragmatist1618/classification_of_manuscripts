from rest_framework import viewsets, permissions

from .models import Manuscript
from .serializers import ManuscriptSerializer


class ManuscriptViewSet(viewsets.ModelViewSet):
    queryset = Manuscript.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = ManuscriptSerializer
