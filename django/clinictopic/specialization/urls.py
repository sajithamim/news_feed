from django.urls import path
from .views import (GetSpecializations,GetAudienceView)

urlpatterns = [
        path('getspec/', GetSpecializations.as_view()),
        path('getaudience/',GetAudienceView.as_view()),
]
