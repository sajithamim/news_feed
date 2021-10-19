from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import (Advisory, Audience, Specialization,UserSpecialization,SubSpecialization,Quiz)
from .serializers import (GetAudienceSerializer,userTypeSerializer,
UserSpecializationSerializer,UserSubSpecialization,GetSpecializationseriallizer,
GetSubspecializationSerializer,SpecializationpicSerializer,SubSpecializationpicSerializer,
GetSpecializationandsub,AdvisorySerializer,QuizSerializer,PostSubspecializationSerializer,QuizgetSerializer,
GetSpecializationquiz)
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
        us = UserSpecialization.objects.filter(user_id =self.request.user).delete()
        serializer.save(user_id=self.request.user)
    @csrf_exempt
    def get_queryset(self):
        return UserSpecialization.objects.filter(user_id=self.request.user)  




class SpecializationView(viewsets.ModelViewSet):
    queryset = Specialization.objects.all().order_by('name')
    serializer_class = GetSpecializationseriallizer
    permission_classes = (IsAuthenticated,)
    def create(self, request):
        name = request.data['name']
        if Specialization.objects.filter(name__iexact=name):
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'specialization already exists with this name'
                }
            return Response(response, status=status_code)
        serializer = GetSpecializationseriallizer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    def update(self, request, *args, **kwargs):
        name = request.data['name']
        idpk=kwargs['pk']
        if Specialization.objects.filter(name__iexact=name).exclude(id=idpk):
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'specialization already exists with this name'
                }
            return Response(response, status=status_code)
        partial = True # Here I change partial to True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
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
    serializer_class = PostSubspecializationSerializer
    # permission_classes = (IsAuthenticated,)
    def create(self, request):
        name = request.data['name']
        spec_id = request.data['spec_id']
        if SubSpecialization.objects.filter(name__iexact=name,spec_id=spec_id):
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'subspecialization already exists with this name'
                }
            return Response(response, status=status_code)
        serializer = PostSubspecializationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    def update(self, request, *args, **kwargs):
        name = request.data['name']
        spec_id = request.data['spec_id']
        idpk=kwargs['pk']
        if  SubSpecialization.objects.filter(name__iexact=name,spec_id=spec_id).exclude(id=idpk):
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'subspecialization already exists with this name'
                }
            return Response(response, status=status_code)
        partial = True # Here I change partial to True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
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

class AdvisoryView(viewsets.ModelViewSet):
    queryset = Advisory.objects.all().order_by('-created_at')
    serializer_class = AdvisorySerializer
    permission_classes = (IsAuthenticated,)
    def create(self, request):
        specid = request.data[0]['spec_id']
        # userid = request.data['user_id']
        add = Advisory.objects.filter(spec_id=specid).delete()
        # if Advisory.objects.filter(spec_id=specid,user_id=userid).exists():
        #     status_code = status.HTTP_400_BAD_REQUEST
        #     response= {
        #         'success': 'false',
        #         'status code': status.HTTP_400_BAD_REQUEST,
        #         'message': 'User already exists'
        #     }
        #     return Response(response, status=status_code)
        serializer = AdvisorySerializer(data=request.data,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserAdvisoryUser(APIView):
    permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def get(self,request,pk):
        try:
            adv = Advisory.objects.filter(user_id=pk)
            serializers = AdvisorySerializer(adv,many=True)
            status_code = status.HTTP_200_OK
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'Advisory user details',
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


class GetAdvisoryUser(APIView):
    permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def get(self,request,pk):
        try:
            adv = Advisory.objects.filter(spec_id=pk).order_by('spec_id__name')
            serializers = AdvisorySerializer(adv,many=True)
            status_code = status.HTTP_200_OK
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'Advisory user details',
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


class QuizView(viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('title')
    serializer_class = QuizSerializer
    permission_classes = (IsAuthenticated,)

class QuizSubView(APIView):
    # permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def get(self,request):
        # quiz= Specialization.objects.filter(specialization_id__quiz_subspec_id__active=True).exclude(specialization_id__quiz_subspec_id__sub_spec_id__id__isnull=False).distinct()
        quiz= Specialization.objects.filter(specialization_id__quiz_subspec_id__sub_spec_id__id__isnull=False,specialization_id__quiz_subspec_id__active=True).distinct()
        print(quiz.query)
        # print(quiz)
        serializers=GetSpecializationquiz(quiz,many=True)
        status_code = status.HTTP_200_OK
        response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'Quiz list',
            'data':serializers.data
            }
        return Response(response,status=status_code)

    