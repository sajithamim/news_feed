from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics, status, views, permissions
from rest_framework import viewsets, filters
# from rest_framework.decorators import detail_route
from rest_framework.decorators import action
from rest_framework import parsers
from rest_framework import mixins
from rest_framework import generics, status, views, permissions
from rest_framework import pagination
from rest_framework.pagination import PageNumberPagination
from .serializers import(AddSerializer,AddImageSerializer,AddUserSerializer,
AddUserSelectedSerializer,AllUserAddSerializer,AllUseraddImage, SelectedBannerSerializer)
from .models import AddUser, Ads,AllUserAdd

class AdsViewset(viewsets.ModelViewSet):
    queryset = Ads.objects.all().order_by('-created_at')
    serializer_class = AddSerializer
    permission_classes = (IsAuthenticated,)
    @action(detail=True,methods=['PUT'],serializer_class=AddImageSerializer,parser_classes=[parsers.MultiPartParser],)
    def image(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)
# class TopicSuggestionView(APIView,PageNumberPagination):
#     # pagination_class = StandardResultsSetPagination
#     permission_classes = (IsAuthenticated,)
#     def get(self,request,pk):
#         try:
#             userCategory = UserCategory.objects.filter(user_id=request.user)
#             idscat = list(userCategory.category_id.id for userCategory in userCategory)
#             queryset = Categoeries.objects.filter(id__in=idscat).filter(topic_category__title__icontains=pk).distinct().order_by('title')
#             # serializers = categoryTopicSerializer(category,many=True)
#             results = self.paginate_queryset(queryset, request, view=self)
#             serializer = categoryTopicSerializer(results, many=True)
#             return self.get_paginated_response(serializer.data)
#         except Exception as e:
#             response={
#                 "success":"False",
#                 "message":"not found",
#                 "status": status.HTTP_400_BAD_REQUEST,
#                 "error":str(e)
#             }
#             return Response(response,status=status.HTTP_400_BAD_REQUEST)

class AddUserView(generics.CreateAPIView):
    serializer_class = AddUserSerializer
    # pagination_class = None
    permission_classes = (IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(AddUserView, self).get_serializer(*args, **kwargs)
    def create(self, request, *args, **kwargs):
        # print(request.data)
        serializer = self.get_serializer(data=request.data,  many=isinstance(request.data,list))
        current = AddUser.objects.filter(adsid = request.data[0]['adsid'],spec_id=request.data[0]['spec_id']).delete()
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SelectedUserlistView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request,addid ,specid,*args, **kwargs):
        try:
            user =AddUser.objects.filter(adsid=addid,spec_id=specid).order_by('id')
            serializers = AddUserSelectedSerializer(user,many=True)
            response={
                "success":"True",
                "message":"user Profile",
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


class AllUserAdsViewset(viewsets.ModelViewSet):
    queryset = AllUserAdd.objects.all().order_by('-created_at')
    serializer_class = AllUserAddSerializer
    # permission_classes = (IsAuthenticated,)
    @action(detail=True,methods=['PUT'],serializer_class=AllUseraddImage,parser_classes=[parsers.MultiPartParser],)
    def image(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)

class SelectedBannerView(APIView,PageNumberPagination):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self,request):
        queryset=AddUser.objects.filter(user_id=request.user).order_by('created_at')
        results=self.paginate_queryset(queryset,request,view=self)
        serializer=SelectedBannerSerializer(results,many=True)
        print(serializer.data)
        return self.get_paginated_response(serializer.data)


