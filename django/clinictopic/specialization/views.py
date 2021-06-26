from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import (Audience, Specialization)
from .serializers import (GetSpecialization,GetAudienceSerializer,userTypeSerializer,
UserSpecializationSerializer)
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
        serializer.save(user_id=self.request.user)
    # @csrf_exempt
    # def post(self,request):
    #     try:
    #         request.data['user_id'] = request.user
    #         serializer = self.serializer_class(data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         # serializer.save()
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
    permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)
    # def post(self,request):
    #     try:
    #         # request.data['user_id'] = request.user
    #         serializer = self.serializer_class(data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         serializer.save(user_id=self.request.user.id)
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


