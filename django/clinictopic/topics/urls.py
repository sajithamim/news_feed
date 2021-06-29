from django.urls import path
from .views import (CategoryFileUploadView)

urlpatterns = [
        # path('getspec/', GetSpecializations.as_view()),
        path('category/',CategoryFileUploadView.as_view()),

]
