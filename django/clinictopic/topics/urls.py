from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from .views import (UploadedImagesViewSet,TopicViewSet,UserCategoryApiView,
UserFavouriteApiView,FavouriteDeleteView,CategoryselectedView,GetUserCategoryApiview,
TopicImageView,Deleteimage,UpdateTopicSpecialization,Authortest,TopicSuggestionView)
from clinictopic.settings.base import MEDIA_ROOT,MEDIA_URL
 

router = routers.DefaultRouter()
router.register('category', UploadedImagesViewSet, 'images')
router.register('topic',TopicViewSet,'topic')
# router.register('favourite',UserFavouriteApiView,'favourite')
# router.register('topictest',PostViewSet,'topictest')
# router.register('usercategory',UserCategoryApiView,'usercategory')

urlpatterns = [
        # path('getspec/', GetSpecializations.as_view()),
        # path('category/',CategoryFileUploadView.as_view()),
        # path('', include(router.urls)),
        url(r'^', include(router.urls)),
        path('usercategory',UserCategoryApiView.as_view(),name="usercategory"),
        path('favourite',UserFavouriteApiView.as_view(),name="favourite"),
        path('favouriteremove/',FavouriteDeleteView.as_view(),name="favouritedelete"),
        path('checkcategory/',CategoryselectedView.as_view()),
        path('getusercategory/<str:pk>/',GetUserCategoryApiview.as_view()),
        path('topicimages/',TopicImageView.as_view()),
        path('deletetopicimage/<str:pk>/',Deleteimage.as_view()),
        path('topicspecializationupdate/<str:pk>/',UpdateTopicSpecialization.as_view()),
        path('author/',Authortest.as_view()),
        path('topicSuggestion/<str:pk>/',TopicSuggestionView.as_view()),

]