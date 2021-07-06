from django.shortcuts import render
from .serializers import(CategorySerializer,TopicSpecializationSerializer,TopicSeriaizer,
userCategorySerializer,Categorypicserializer,Topicpdfserializer,TopicImageSerializer,
userFavouriteSerializer)
from rest_framework.parsers import FileUploadParser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import viewsets, filters
from .models import (Categoeries,TopicSpecialization,Topics,UserCategory,Favourite)
from django_filters import rest_framework as filters
import django_filters.rest_framework
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response

# from django_rest_swagger_swaggerdoc import swaggerdoc
# from rest_framework.decorators import detail_route


# category model 
class UploadedImagesViewSet(viewsets.ModelViewSet):
    queryset = Categoeries.objects.all()
    serializer_class = CategorySerializer
    @action(detail=True,methods=['PUT'],serializer_class=Categorypicserializer,parser_classes=[MultiPartParser],)
    def icon(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)
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

    @action(detail=True,methods=['PUT'],serializer_class=Topicpdfserializer,parser_classes=[MultiPartParser],)
    def pdf(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)
    '''/schema:
        get:
        tags:
            - Schema
        description: download schema file
        responses:
            "200":
            description: success
            content:
                multipart/form-data:
                schema:
                    type: object
                    properties:
                    filename:
                        type: array
                        items:
                        type: string
                        format: binary
            "400":
            $ref: "#/components/responses/failed"
            "404":
            $ref: "#/components/responses/notExist"'''
    @action(detail=True,methods=['PUT'],serializer_class=TopicImageSerializer,parser_classes=[MultiPartParser],)
    def images(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)



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


class UserFavouriteApiView(generics.ListCreateAPIView):
    serializer_class = userFavouriteSerializer
    # pagination_class = None
    permission_classes = (IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(UserFavouriteApiView, self).get_serializer(*args, **kwargs)
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)
    def get_queryset(self):
        return Favourite.objects.filter(user_id=self.request.user)  


# class PostViewSet(viewsets.ModelViewSet):
#     """
#     Post ModelViewSet.
#     """
#     queryset = Topics.objects.all()
#     serializer_class = PostSerializer
#     parser_classes = (MultiPartParser, FormParser)
#     # permission_classes = (IsAuthenticatedOrReadOnly,)

#     # @swaggerdoc('swaggerdoc/post.yml')
#     def create(self, request, *args, **kwargs):
        
#         # print(request.data)
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

#     def perform_create(self, serializer):
#         serializer.save()

#     def get_success_headers(self, data):
#         try:
#             return {'Location': str(data[api_settings.URL_FIELD_NAME])}
#         except (TypeError, KeyError):
#             return {}