from django.apps import AppConfig


class V1Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.api.v1'