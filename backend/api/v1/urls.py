from rest_framework import routers

from .views import ManuscriptViewSet, ImagesViewSet

urlpatterns = [

]

# генерация url и их регистрация
router = routers.DefaultRouter()
# правый слэш на конце не ставится!
router.register('img', ImagesViewSet, basename='manuscript-img')
router.register('', ManuscriptViewSet, basename='manuscript-api')
urlpatterns += router.urls
