from django.urls import path
from .views import (GetSpecializations,GetAudienceView,UserTypeView)

urlpatterns = [
        path('getspec/', GetSpecializations.as_view()),
        path('getaudience/',GetAudienceView.as_view()),
        path('usertype/',UserTypeView.as_view()),       
]
