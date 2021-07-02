from django.shortcuts import render
from .serializers import(CategorySerializer,TopicSpecializationSerializer,TopicSeriaizer,
userCategorySerializer)
from rest_framework.parsers import FileUploadParser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import viewsets, filters
from .models import (Categoeries,TopicSpecialization,Topics,UserCategory)
from django_filters import rest_framework as filters
import django_filters.rest_framework


class UploadedImagesViewSet(viewsets.ModelViewSet):
    queryset = Categoeries.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = (IsAuthenticated,)


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topics.objects.all()
    serializer_class = TopicSeriaizer
    # permission_classes = (IsAuthenticated,)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # ordering = ('title')
    def get_queryset(self):
        user_type = self.request.user.is_superuser
        queryset = self.queryset
        query_set = queryset.filter()
        if not user_type:
            query_set = queryset.filter()
        return query_set



class UserCategoryApiView(generics.ListCreateAPIView):
    serializer_class = userCategorySerializer
    pagination_class = None
    permission_classes = (IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(UserCategoryApiView, self).get_serializer(*args, **kwargs)
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)
    def get_queryset(self):
        return UserCategory.objects.filter(user_id=self.request.user)  