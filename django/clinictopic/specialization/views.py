from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import (Audience, Specialization,UserSpecialization,SubSpecialization)
from .serializers import (GetAudienceSerializer,userTypeSerializer,
UserSpecializationSerializer,UserSubSpecialization,GetSpecializationseriallizer,
GetSubspecializationSerializer,SpecializationpicSerializer,SubSpecializationpicSerializer,
AdvisorySerializer,GetSpecializationandsub)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics, status, views, permissions
from rest_framework import viewsets, filters
# from rest_framework.decorators import detail_route
from rest_framework.decorators import action
from rest_framework import parsers
from authentication.models import User
from topics.models import UserCategory

# Create your views here.

# get specialization with sub specialization
class GetSpecializations(APIView):
    permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def get(self,request):
        try:
            spec = Specialization.objects.all().order_by('name')
            serializers = GetSpecializationandsub(spec,many=True,context = {'request':request})
            status_code = status.HTTP_200_OK
            categorycount = UserCategory.objects.filter(user_id=request.user).count()
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'Specialization details',
            'categorycount':categorycount,
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



class GetUserSpecializationsApiview(APIView):
    permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def get(self,request,pk):
        try:
            user = User.objects.get(email=pk)
            spec = UserSpecialization.objects.filter(user_id=user.id).order_by('spec_id__name')
            serializers = UserSpecializationSerializer(spec,many=True)
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
            spec = Audience.objects.all().order_by('name')
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
            serializer.save(user_id=self.request.user,many=True)


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
    @csrf_exempt
    def get_queryset(self):
        return UserSpecialization.objects.filter(user_id=self.request.user)  




class SpecializationView(viewsets.ModelViewSet):
    queryset = Specialization.objects.all().order_by('name')
    serializer_class = GetSpecializationseriallizer
    @action(detail=True, methods=['get'])
    def spubspec_list(self, request, pk=None):
        spec = self.get_object() # retrieve an object by pk provided
        spec_data = SubSpecialization.objects.filter(spec_id=spec).distinct()
        spec_json = GetSubspecializationSerializer(spec_data, many=True)
        return Response(spec_json.data)
    @action(detail=True,methods=['PUT'],serializer_class=SpecializationpicSerializer,parser_classes=[parsers.MultiPartParser],)
    def icon(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)

class SubSpecializationView(viewsets.ModelViewSet):
    queryset = SubSpecialization.objects.all().order_by('name')
    serializer_class = GetSubspecializationSerializer
    @action(detail=True,methods=['PUT'],serializer_class=SubSpecializationpicSerializer,parser_classes=[parsers.MultiPartParser],)
    def icon(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)


# class SubspecializationApiview(APIView):
#     # permission_classes = (IsAuthenticated,)
#     @csrf_exempt
#     def get(self,request,specid):
#         try:
#             spec = SubSpecialization.objects.filter(spec_id = specid)
#             serializers = GetSubspecializationSerializer(spec,many=True)
#             status_code = status.HTTP_200_OK
#             response = {
#             'success' : 'True',
#             'status code' : status_code,
#             'message': 'sub specialization details',
#             'data':serializers.data
#             }
#             return Response(response,status=status.HTTP_200_OK)
#         except Exception as e:
#             status_code = status.HTTP_400_BAD_REQUEST
#             response = {
#                 'success': 'false',
#                 'status code': status.HTTP_400_BAD_REQUEST,
#                 'message': 'not found',
#                 'error': str(e)
#                 }
#             return Response(response, status=status_code)

