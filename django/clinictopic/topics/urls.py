from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from .views import UploadedImagesViewSet,TopicViewSet
from clinictopic.settings.base import MEDIA_ROOT,MEDIA_URL
 

router = routers.DefaultRouter()
router.register('category', UploadedImagesViewSet, 'images')
router.register('topic',TopicViewSet,'topic')

urlpatterns = [
        # path('getspec/', GetSpecializations.as_view()),
        # path('category/',CategoryFileUploadView.as_view()),
        # path('', include(router.urls)),
        url(r'^', include(router.urls)),

]