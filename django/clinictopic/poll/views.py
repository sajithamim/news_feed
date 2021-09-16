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
from .serializers import TopicPollSerializer,UserPollSerializer,FeedbackSerializer,SettingsSerializer,ContactusSerializer,AddSettingSerializer
from .models import Feedback,TopicPoll,Settings,ContactUs,AddSetting
from rest_framework import mixins
from rest_framework import generics, status, views, permissions
from rest_framework import pagination
from django.shortcuts import get_object_or_404


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
    queryset = Settings.objects.all().order_by('id')
    serializer_class = SettingsSerializer
    pagination_class = None
    permission_classes = (IsAuthenticated,)

class ContactusView(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all().order_by('id')
    serializer_class = ContactusSerializer
    permission_classes = (IsAuthenticated,)

class AddSettingView(viewsets.ModelViewSet):
    queryset = AddSetting.objects.all().order_by('id')
    serializer_class = AddSettingSerializer
    permission_classes = (IsAuthenticated,)