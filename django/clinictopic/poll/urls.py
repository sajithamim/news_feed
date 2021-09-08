from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from .views import PollView,userPollview,Feedbackview,SettingsViewSet,ContactusView
router = routers.DefaultRouter()
router.register('contactus',ContactusView , 'contactus')

urlpatterns = [

        url(r'^', include(router.urls)),
        path('poll/',PollView.as_view()),
        path('userpoll/',userPollview.as_view()),
        path('feedback/',Feedbackview.as_view()),
        path('settings/',SettingsViewSet.as_view()),
]