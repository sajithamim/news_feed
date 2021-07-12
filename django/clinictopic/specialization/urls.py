from django.urls import path
from .views import (GetSpecializations,GetAudienceView,UserTypeView,
UserSpecializationApiView,SpecializationView,SubSpecializationView,GetUserSpecializationsApiview)
from django.conf.urls import url, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register('specialization',SpecializationView , 'speciaization')
router.register('subspecialization',SubSpecializationView , 'subspeciaization')



urlpatterns = [
        path('getspec/', GetSpecializations.as_view()),
        path('getaudience/',GetAudienceView.as_view()),
        path('usertype/',UserTypeView.as_view()),       
        path('userspec/',UserSpecializationApiView.as_view()),
        path('getuserspecialization/<str:pk>/',GetUserSpecializationsApiview.as_view()),
        # path('getsubspecialization/',SubspecializationApiview.as_view()),
        url(r'^', include(router.urls)),

]
