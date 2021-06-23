from django.urls import path
from .views import GetSpecializations

urlpatterns = [
        path('getspec/', GetSpecializations.as_view()),
]
