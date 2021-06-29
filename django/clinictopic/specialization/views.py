from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import (Audience, Specialization,UserSpecialization)
from .serializers import (GetSpecialization,GetAudienceSerializer,userTypeSerializer,
UserSpecializationSerializer,UserSpecgetserializer,UserSubSpecialization)
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics, status, views, permissions

# Create your views here.

# get specialization with sub specialization
class GetSpecializations(APIView):
    permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def get(self,request):
        try:
            spec = Specialization.objects.all()
            serializers = GetSpecialization(spec,many=True)
            status_code = status.HTTP_200_OK
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'Specialization details',
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

# get auidence
class GetAudienceView(APIView):
    permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def get(self,request):
        try:
            spec = Audience.objects.all()
            serializers = GetAudienceSerializer(spec,many=True)
            status_code = status.HTTP_200_OK
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'Audience details',
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

# create user type
class UserTypeView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = userTypeSerializer
    def perform_create(self, serializer):
        # for i in request.data:
            serializer.save(user_id=self.request.user,many=True)
    # @csrf_exempt
    # def post(self,request):
    #     try:
    #         request.data['user_id'] = request.user
    #         serializer = self.serializer_class(data=request.data,many=True)
    #         serializer.is_valid(raise_exception=True)
    #         serializer.save(user_id=self.request.user)
    #         print("hello")
    #         status_code = status.HTTP_200_OK
    #         response = {
    #         'success' : 'True',
    #         'status code' : status_code,
    #         'message': 'user type created',
    #         # 'data':serializer.data
    #         }
    #         return Response(response,status=status.HTTP_200_OK)
    #     except Exception as e:
    #         status_code = status.HTTP_400_BAD_REQUEST
    #         response = {
    #             'success': 'false',
    #             'status code': status.HTTP_400_BAD_REQUEST,
    #             'message': 'not found',
    #             'error': str(e)
    #             }
    #         return Response(response, status=status_code)


class UserSpecializationApiView(generics.ListCreateAPIView):
    serializer_class = UserSpecializationSerializer
    pagination_class = None
    permission_classes = (IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(UserSpecializationApiView, self).get_serializer(*args, **kwargs)

    @csrf_exempt
    def perform_create(self, serializer):
        
        serializer.save(user_id=self.request.user)
    # def get_queryset(self):
    #     # serializer_class = self.
    #     return UserSubSpecialization.objects.all()  
    # def post(self,request, format=None):
    #     try:

    #         serializer = UserSpecializationSerializer(data=request.data)
    #         # if serializer.is_valid():
    #         #     serializer.save(user_id = request.user)
    #         #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #         serializer = self.serializer_class(data=request.data,many=True)
    #         print(serializer)
    #         serializer.context["user_id"] = request.user.id
    #         serializer.is_valid(raise_exception=True)
    #         print(serializer.save(user_id=request.user))
    #         # serializer.save(user_id=request.user)
    #         status_code = status.HTTP_200_OK
    #         response = {
    #         'success' : 'True',
    #         'status code' : status_code,
    #         'message': 'specialization created',
    #         'data':serializer.data
    #         }
    #         return Response(response,status=status.HTTP_200_OK)
    #     except Exception as e:
    #         status_code = status.HTTP_400_BAD_REQUEST
    #         response = {
    #             'success': 'false',
    #             'status code': status.HTTP_400_BAD_REQUEST,
    #             'message': 'not found',
    #             'error': str(e)
    #             }
    #         return Response(response, status=status_code)


