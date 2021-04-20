from rest_framework import serializers

from .models import *


class ManuscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manuscript
        fields = '__all__'
