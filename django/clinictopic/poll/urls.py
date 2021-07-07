from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from .views import PollView
router = routers.DefaultRouter()
# router.register('poll',PollView , 'poll')

urlpatterns = [

        url(r'^', include(router.urls)),
        path('poll/',PollView.as_view()),

]