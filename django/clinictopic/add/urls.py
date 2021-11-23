from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from .views import AdsViewset,AddUserView,SelectedUserlistView,AllUserAdsViewset,SelectedBannerView
router = routers.DefaultRouter()
router.register('ads',AdsViewset , 'ads')
router.register('alluseradd',AllUserAdsViewset,'alladd')

urlpatterns = [

        url(r'^', include(router.urls)),
        path('adduser/',AddUserView.as_view(),name="adduser"),
        path('selecteduser/<int:addid>/<int:specid>/',SelectedUserlistView.as_view(),name="selecteduser"),
        path('selectedbanner/',SelectedBannerView.as_view())
]