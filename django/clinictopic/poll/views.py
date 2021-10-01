from django.http.response import JsonResponse
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
from .serializers import (ContactSerilizer, Privacypolicyserializer, TOSserializer, TopicPollSerializer,UserPollSerializer,FeedbackSerializer,
SettingsSerializer,ContactusSerializer,AddSettingSerializer,Aboutusserializer)
from .models import Feedback,TopicPoll,Settings,ContactUs,AddSetting
from rest_framework import mixins
from rest_framework import generics, status, views, permissions
from rest_framework import pagination
from django.shortcuts import get_object_or_404
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view



# from django.clinictopic.poll import serializers


class TwentyPagination(pagination.PageNumberPagination):       
       page_size = 20

# Create your views here.


# class PollView(viewsets.ModelViewSet):
#     pagination_class = None
#     queryset = TopicPoll.objects.all()
#     serializer_class = TopicPollSerializer
#     def get_serializer(self, *args, **kwargs):
#         """ if an array is passed, set serializer to many """
#         if isinstance(kwargs.get('data', {}), list):
#             kwargs['many'] = True
#         return super(PollView, self).get_serializer(*args, **kwargs)


class PollView(generics.CreateAPIView):
    serializer_class = TopicPollSerializer
    pagination_class = None
    permission_classes = (IsAuthenticated,)
    # def get_serializer_context(self):
    #     """
    #     Extra context provided to the serializer class.
    #     """
    #     return {
    #         'request': self.request
    #     }
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        # if self.request.method == 'GET':
        #     # return TopicPollSerializer
        #     serializer_class = TopicPollSerializer
        #     kwargs['context'] = self.get_serializer_context()
            # return serializer_class(*args, **kwargs)    

        return super(PollView, self).get_serializer(*args, **kwargs)
    @csrf_exempt
    def perform_create(self, serializer):
        serializer.save()

class userPollview(generics.CreateAPIView):
    serializer_class = UserPollSerializer
    pagination_class = None
    permission_classes = (IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(userPollview, self).get_serializer(*args, **kwargs)
    @csrf_exempt
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)

class Feedbackview(generics.ListCreateAPIView):
    serializer_class = FeedbackSerializer
    pagination_class = TwentyPagination
    permission_classes = (IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(Feedbackview, self).get_serializer(*args, **kwargs)
    # @csrf_exempt
    # def perform_create(self, serializer):
    #     serializer.save(user_id=self.request.user)
    def get_queryset(self):
        return Feedback.objects.all().order_by('-id')


class SettingsViewSet(generics.ListCreateAPIView):
#@renderer_classes(JSONRenderer)    
#@csrf_exempt
    # @api_view(['GET', 'POST', ])
    # def get_serializer(self, *args, **kwargs):
    #     print("hihihihi")
    #     """ if an array is passed, set serializer to many """
    #     if isinstance(kwargs.get('data', {}), list):
    #         kwargs['many'] = True
    #     if self.request.method == 'GET':
    #         queryset = Settings.objects.all().order_by('id')
    #         serializer_class = SettingsSerializer(queryset,many='True')
    #         # pagination_class = None
    #         # permission_classes = (IsAuthenticated,)
    #         return Response(serializer_class.data)
    #     if self.request.method =='POST':
    #         data = JSONParser().parse(self.request)
    #         print(data)
    #         serializer = SettingsSerializer(data=data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    #         return JsonResponse(serializer.errors, status=400)
    # def get_queryset(self):
    #     return Settings.objects.all().order_by('-id')
    serializer_class=SettingsSerializer
    pagination_class=None
    @csrf_exempt
    def perform_create(self,serializer):
        serializer.save()
    @csrf_exempt
    def get_queryset(self):
        return Settings.objects.filter()


class ContactusView(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all().order_by('id')
    serializer_class = ContactusSerializer
    permission_classes = (IsAuthenticated,)
    

class AddSettingView(viewsets.ModelViewSet):
    queryset = AddSetting.objects.all().order_by('id')
    serializer_class = AddSettingSerializer
    permission_classes = (IsAuthenticated,)

class AboutusApiview(generics.ListCreateAPIView):
    serializer_class = Aboutusserializer
    pagination_class = None
    # permission_classes = (IsAuthenticated,)
    @csrf_exempt
    def perform_create(self, serializer): 

        # us = .objects.filter(user_id =self.request.user).delete()
        serializer.save()
    @csrf_exempt
    def get_queryset(self):
        return Settings.objects.filter() 


class ContactusApiView(generics.ListCreateAPIView):
    serializer_class =ContactSerilizer
    pagination_class=None
    @csrf_exempt
    def perform_create(self,serializer):
         serializer.save()
    @csrf_exempt
    def get_queryset(self):
        return Settings.objects.filter()

class PrivacyPolicyApiView(generics.ListCreateAPIView):
    serializer_class=Privacypolicyserializer
    pagination_class=None
    @csrf_exempt
    def perform_create(self,serializer):
        serializer.save()
    @csrf_exempt
    def get_queryset(self):
        return Settings.objects.filter()

class TOSapiView(generics.ListCreateAPIView):
    serializer_class=TOSserializer
    pagination_class=None
    @csrf_exempt
    def perform_create(self,serializer):
        #   tos=request.tos
        #if not Settings.objects.filter().exists():
        serializer.save()
        # print("Doneeeeeeeee")
        #serializer.update()
    @csrf_exempt
    def get_queryset(self):
        return Settings.objects.filter()
