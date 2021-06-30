from django.shortcuts import render
from .serializers import(CategorySerializer,TopicSpecializationSerializer,TopicSeriaizer)
from rest_framework.parsers import FileUploadParser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import viewsets, filters
from .models import (Categoeries,TopicSpecialization,Topics)
from django_filters import rest_framework as filters
import django_filters.rest_framework


class UploadedImagesViewSet(viewsets.ModelViewSet):
    queryset = Categoeries.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topics.objects.all()
    serializer_class = TopicSeriaizer
    permission_classes = (IsAuthenticated,)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    ordering = ('title')

