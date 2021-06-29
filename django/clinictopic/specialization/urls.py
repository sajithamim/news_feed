from django.urls import path
from .views import (GetSpecializations,GetAudienceView,UserTypeView,
UserSpecializationApiView)

urlpatterns = [
        path('getspec/', GetSpecializations.as_view()),
        path('getaudience/',GetAudienceView.as_view()),
        path('usertype/',UserTypeView.as_view()),       
        path('userspec/',UserSpecializationApiView.as_view()),
]
