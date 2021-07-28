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
from .serializers import AddSerializer,AddImageSerializer,AddUserSerializer,AddUserSelectedSerializer
from .models import AddUser, Ads

class AdsViewset(viewsets.ModelViewSet):
    queryset = Ads.objects.all().order_by('-created_at')
    serializer_class = AddSerializer
    # permission_classes = (IsAuthenticated,)
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


class AddUserView(generics.CreateAPIView):
    serializer_class = AddUserSerializer
    # pagination_class = None
    permission_classes = (IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(AddUserView, self).get_serializer(*args, **kwargs)
    def perform_create(self, serializer):
        serializer.save()


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