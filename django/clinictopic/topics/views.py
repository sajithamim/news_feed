from django.http import response
from django.shortcuts import render
from .serializers import(CategorySerializer,TopicSpecializationSerializer,TopicSeriaizer,
userCategorySerializer,Categorypicserializer,Topicpdfserializer,TopicImageSerializer,
userFavouriteSerializer,CheckedCategorySerializer)
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
from rest_framework import generics, status, views, permissions
from rest_framework.views import APIView
from django.shortcuts import get_list_or_404, get_object_or_404
# from rest_framework.decorators import list_route




# from django_rest_swagger_swaggerdoc import swaggerdoc
# from rest_framework.decorators import detail_route


# category model 
class UploadedImagesViewSet(viewsets.ModelViewSet):
    queryset = Categoeries.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)
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
    permission_classes = (IsAuthenticated,)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # ordering = ('title')
    def get_queryset(self):
        user_type = self.request.user.is_superuser
        queryset = self.queryset
        # print(queryset.query)
        query_set = queryset.filter()
        if not user_type:
            query_set = queryset.filter()
            # print(query_set.query)
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

    @action(detail=False,url_path='search/(?P<search_pk>[^/.]+)')
    def search(self, request, search_pk, pk=None):
        # a =  self.kwargs['search_pk']
        # print(a)
        a = search_pk
        # print()
        # recent_users = User.objects.all().order('-last_login')
        # page = self.paginate_queryset(recent_users)
        # serializer = self.get_pagination_serializer(page)
        return Response({"a":a})

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
        usercategory = UserCategory.objects.filter(user_id=self.request.user).delete()
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


class FavouriteDeleteView(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request, *args, **kwargs):
        try:
            delete_id = request.data["deleteid"]
            print(delete_id)
            if not delete_id:
                return Response(status=status.HTTP_404_NOT_FOUND)
            for i in delete_id:
                get_object_or_404(Favourite, pk=int(i)).delete()
            response={
                "success":"True",
                "message":"Deleted",
                "status":status.HTTP_204_NO_CONTENT
            }
            return Response(response,status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            response={
                "success":"False",
                "message":"not deleted",
                "status": status.HTTP_400_BAD_REQUEST,
                "error":str(e)
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)


class CategoryselectedView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        try:
            category = Categoeries.objects.all()
            serializers = CheckedCategorySerializer(category,many=True,context = {'request':request})
            response={
                "success":"True",
                "message":"Category list",
                "status":status.HTTP_200_OK,
                "data":serializers.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            response={
                "success":"False",
                "message":"not found",
                "status": status.HTTP_400_BAD_REQUEST,
                "error":str(e)
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)

