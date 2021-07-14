from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import UserPoll,PollOption,TopicPoll
# from topics.serializers import TopicSeriaizer

class PolloptionSerializer(serializers.ModelSerializer):
    # checked = serializers.SerializerMethodField()
    class Meta: 
        model = PollOption
        fields = ['answer']
        write_only_fields = ('answer')

    # def get_checked(self,obj):
    #     print(obj.topic_poll_id.user_id)
    #     # userobj = User.objects.get(phone = obj['phone'])
    #     # userid = userobj.id
    #     # return UserCategory.objects.filter(user_id=userid).count()
    #     # user = obj.
    #     return "1"


class TopicPollSerializer(serializers.ModelSerializer):
    poll_option = PolloptionSerializer(many=True)
    checked = serializers.SerializerMethodField()
    # topic_poll_id
    class Meta:
        model = TopicPoll
        # fields = '__all__'
        fields =  ('topic_id','poll_option','number_of_options','checked')
        write_only_fields = ('topic_id','poll_option','number_of_options')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['topic_id'] = TopicSeriaizer(instance.topic_id).data
        return response

    def get_checked(self,obj):
        print(obj.topic_poll_id.user_id)
        # if UserPoll.objects.filter(user_id=,poll_option_id__topic_poll_id__id =obj.id).exists():
        # userobj = User.objects.get(phone = obj['phone'])
        # userid = userobj.id
        # return UserCategory.objects.filter(user_id=userid).count()
        # user = obj.
        return self.context['request'].user
    def create(self, validated_data):
            print(validated_data)
            polloption = validated_data.pop('poll_option')
            topicpoll = TopicPoll.objects.create(**validated_data)
            # usersubarray=[]
            for polloption in polloption:
                option=PollOption.objects.create(topic_poll_id=topicpoll, **polloption)
            # print(usersubarray)
            # spec_id = {}
            return topicpoll
    # def to_representation(s

class UserPollSerializer(serializers.ModelSerializer):
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model= UserPoll
        fields="__all__"
        def to_representation(self, instance):
            response = super().to_representation(instance)
            response['poll_option_id'] = PolloptionSerializer(instance.poll_option_id).data
            return response