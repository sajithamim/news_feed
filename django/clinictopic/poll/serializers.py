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



class TopicPollSerializer(serializers.ModelSerializer):
    poll_option = PolloptionSerializer(many=True)
    # topic_poll_id
    class Meta:
        model = TopicPoll
        # fields = '__all__'
        fields =  ('topic_id','poll_option','number_of_options')
        write_only_fields = ('topic_id','poll_option','number_of_options')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['topic_id'] = TopicSeriaizer(instance.topic_id).data
        return response


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