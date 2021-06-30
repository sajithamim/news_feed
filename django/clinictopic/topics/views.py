from django.shortcuts import render
from .serializers import(CategorySerializer)
from rest_framework.parsers import FileUploadParser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import viewsets, filters
from .models import (Categoeries)

class UploadedImagesViewSet(viewsets.ModelViewSet):
    queryset = Categoeries.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = (IsAuthenticated,)
