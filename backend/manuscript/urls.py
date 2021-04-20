from rest_framework import routers

from .views import ManuscriptViewSet

urlpatterns = [

]

# генерация url и их регистрация
router = routers.DefaultRouter()
router.register('', ManuscriptViewSet, basename='manuscript-api')
urlpatterns += router.urls
