from typing import List
from django.http import response
from django.shortcuts import render
from .serializers import(CategorySerializer,TopicSpecializationSerializer,TopicSeriaizer,
userCategorySerializer,Categorypicserializer,Topicpdfserializer,TopicImageSerializer,
userFavouriteSerializer,CheckedCategorySerializer,GetTopicSeriaizer,UpdateTopicSpecializationSerializer,
TopicSecondpdfserializer,categoryTopicSerializer)
from rest_framework.parsers import FileUploadParser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import viewsets, filters
from .models import (Categoeries,TopicSpecialization,Topics,UserCategory,Favourite,Image)
from django_filters import rest_framework as filters
import django_filters.rest_framework
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import generics, status, views, permissions
from rest_framework.views import APIView
from authentication.models import AUTH_PROVIDERS, User
from django.shortcuts import get_list_or_404, get_object_or_404
from django.db.models import Q
from specialization.models import UserSpecialization
# from rest_framework.decorators import list_route
from rest_framework import mixins
from datetime import datetime, tzinfo
import pytz
from rest_framework.pagination import PageNumberPagination




class UpdateTopicSpecialization(APIView):
    serializer_class = UpdateTopicSpecializationSerializer
    pagination_class = None
    permission_classes = (IsAuthenticated,)
    def put(self,request,pk):
        try:
            topic = TopicSpecialization.objects.filter(topic_id=pk).delete()
            serializer = self.serializer_class(data=request.data,many=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            status_code = status.HTTP_200_OK
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'updated',
            'data':serializer.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'not found',
                'error': str(e)
                }
            return Response(response, status=status_code)

# from django_rest_swagger_swaggerdoc import swaggerdoc
# from rest_framework.decorators import detail_route
class GetUserCategoryApiview(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,pk):
        try:
            # specids = UserSpecialization.objects.filter()
            user = User.objects.get(email=pk)
            spec = UserCategory.objects.filter(user_id=user.id).order_by('id')
            serializers = userCategorySerializer(spec,many=True)
            status_code = status.HTTP_200_OK
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'category details',
            'data':serializers.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'not found',
                'error': str(e)
                }
            return Response(response, status=status_code)
# category model 
class UploadedImagesViewSet(viewsets.ModelViewSet):
    queryset = Categoeries.objects.all().order_by('title')
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)
    def create(self, request):
        name = request.data['title']
        if Categoeries.objects.filter(title__icontains=name):
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'Category already exists with this name'
                }
            return Response(response, status=status_code)
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    @action(detail=True,methods=['PUT'],serializer_class=Categorypicserializer,parser_classes=[MultiPartParser],)
    def icon(self, request, pk,*args,**kwargs):
        # try:
            obj = self.get_object()
            serializer = self.serializer_class(obj, data=request.data,
                                            partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,
                                        status.HTTP_400_BAD_REQUEST)
        # except Exception as e:
        #     print(str(e))
    # permission_classes = (IsAuthenticated,)


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topics.objects.all().order_by('-created_at')
    serializer_class = TopicSeriaizer
    permission_classes = (IsAuthenticated,)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # ordering = ('title')
    def retrieve(self, request, pk=None):
        queryset = Topics.objects.all()
        topic = get_object_or_404(queryset, pk=pk)
        serializer = TopicSeriaizer(topic,context = {'request':self.request})
        now = datetime.utcnow()
        # print("now",now)
        publishtime = topic.publishingtime
        # print("p",publishtime)
        # if publishtime>now:
        #     print("sdf")
        if publishtime.replace(tzinfo=None)<=now.replace(tzinfo=None):
            published = 1
        else:
            published = 0
        response = {"published":published}
        response.update(serializer.data)
        return Response(response)
    def get_queryset(self):
        user_type = self.request.user.is_superuser
        # print(user_type)
        queryset = self.queryset
        # print(queryset.query)
        query_set = queryset.filter()
        if not user_type:
            # now = datetime.utcnow()
            userCategory = UserCategory.objects.filter(user_id=self.request.user)
            idscat = list(userCategory.category_id.id for userCategory in userCategory)
            userspec = UserSpecialization.objects.filter(user_id=self.request.user)
            idsspec = list(userspec.spec_id.id for userspec in userspec)
            query_set = Topics.objects.filter(topic_topic__spec_id__id__in=idsspec).filter(category_id__id__in=idscat,publishingtime__lt=datetime.now()).order_by('-publishingtime').distinct()
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
    @action(detail=True,methods=['PUT'],serializer_class=TopicSecondpdfserializer,parser_classes=[MultiPartParser],)
    def secondpdf(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)

    @action(detail=False,url_path='search/(?P<search_pk>[^/.]+)',serializer_class=TopicSeriaizer)
    def search(self, request, search_pk, pk=None):
        userCategory = UserCategory.objects.filter(user_id=self.request.user)
        idscat = list(userCategory.category_id.id for userCategory in userCategory)
        userspec = UserSpecialization.objects.filter(user_id=self.request.user)
        idsspec = list(userspec.spec_id.id for userspec in userspec)
        queryset = Topics.objects.filter(title__icontains=search_pk,publishingtime__lt=datetime.now()).order_by('-publishingtime')
        # a =  self.kwargs['search_pk']
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

    # @action(detail=True,methods=['PUT'],serializer_class=TopicImageSerializer,parser_classes=[MultiPartParser],)
    # def images(self, request, pk):
    #     obj = self.get_object()
    #     serializer = self.serializer_class(obj, data=request.data,
    #                                        partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors,
    #                              status.HTTP_400_BAD_REQUEST)



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
        # serializer = userFavouriteSerializer(data=self.request.data, context = {'request':self.request})
        # if serializer.is_valid():
        #             serializer.save(user_id=self.request.user)
        serializer.save(user_id=self.request.user)
    def get_queryset(self):
        return Favourite.objects.filter(user_id=self.request.user)
    # def get_serializer_context(self):
    #     context = super(UserFavouriteApiView, self).get_serializer_context()
    #     context.update({"request": self.request})
    #     return context


class FavouriteDeleteView(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request, *args, **kwargs):
        try:
            delete_id = request.data["deleteid"]
            if not delete_id:
                return Response(status=status.HTTP_404_NOT_FOUND)
            for i in delete_id:
                get_object_or_404(Favourite, pk=int(i)).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
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
            category = Categoeries.objects.all().order_by('title')
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


def modify_input_for_multiple_files(topic_id, image):
    dict = {}
    dict['topic_id'] = topic_id

    dict['image'] = image
    return dict

class TopicImageView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)
    # @csrf_exempt
    def post(self, request, *args, **kwargs):
        topic_id = request.data['topic_id']
        # converts querydict to original dict
        images = dict((request.data).lists())['image']
        flag = 1
        arr = []
        for img_name in images:
            modified_data = modify_input_for_multiple_files(topic_id,
                                                            img_name)
            file_serializer = TopicImageSerializer(data=modified_data)
            if file_serializer.is_valid():
                file_serializer.save()
                arr.append(file_serializer.data)
            else:
                flag = 0

        if flag == 1:
            return Response(arr, status=status.HTTP_201_CREATED)
        else:
            return Response(arr, status=status.HTTP_400_BAD_REQUEST)


class Deleteimage(APIView):
    # @csrf_exempt
    permission_classes = (IsAuthenticated,)
    def delete(self, request,pk):
        # print(id)
        try:      
            snippet = Image.objects.get(id=pk)
            snippet.delete()
            return Response({"status":"deleted","success":"True"},status=status.HTTP_200_OK)
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'invalid request',
                'error': str(e)
                }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

class TopicSuggestionView(APIView,PageNumberPagination):
    # pagination_class = StandardResultsSetPagination
    permission_classes = (IsAuthenticated,)
    def get(self,request,pk):
        try:
            userCategory = UserCategory.objects.filter(user_id=request.user)
            idscat = list(userCategory.category_id.id for userCategory in userCategory)
            queryset = Categoeries.objects.filter(id__in=idscat).filter(topic_category__title__icontains=pk).distinct().order_by('title')
            # serializers = categoryTopicSerializer(category,many=True)
            results = self.paginate_queryset(queryset, request, view=self)
            serializer = categoryTopicSerializer(results, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            response={
                "success":"False",
                "message":"not found",
                "status": status.HTTP_400_BAD_REQUEST,
                "error":str(e)
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)

from .serializers import authorserializer
class Authortest(APIView):
    serializer_class = authorserializer
    pagination_class = None
    # permission_classes = (IsAuthenticated,)
    def put(self,request):
            # topic = TopicSpecialization.objects.filter(topic_id=pk).delete()
            obj = Topics.objects.get(id='65283ab8-c51a-49ef-afe3-4c15e8aa2c30')
            serializer = self.serializer_class(obj, data=request.data,
                                            partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,
                                    status.HTTP_400_BAD_REQUEST)



