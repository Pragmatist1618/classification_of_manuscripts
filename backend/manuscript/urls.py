from rest_framework import routers
from .views import ManuscriptViewSet
from rest_framework import routers

from .views import ManuscriptViewSet

router = routers.DefaultRouter()
router.register('', ManuscriptViewSet, basename='manuscript-api')
urlpatterns = router.urls
