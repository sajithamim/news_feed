from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import UserPoll,PollOption,TopicPoll,Feedback
from authentication.models import User
# from topics.serializers import TopicSeriaizer

class PolloptionSerializer(serializers.ModelSerializer):
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
            for polloption in polloption:
                option=PollOption.objects.create(topic_poll_id=topicpoll, **polloption)
            return topicpoll

class UserPollSerializer(serializers.ModelSerializer):
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model= UserPoll
        fields="__all__"
        def to_representation(self, instance):
            response = super().to_representation(instance)
            response['poll_option_id'] = PolloptionSerializer(instance.poll_option_id).data
            return response

class FeedbackSerializer(serializers.ModelSerializer):
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    class Meta:
        model = Feedback
        fields = '__all__'

    def get_name(self, obj):
        user = User.objects.get(email =obj.user_id)
        # print(user)
        # sdb
        return user.name

    def get_email(self, obj):
        user = User.objects.get(email =obj.user_id)
        return user.email


# class SettingsSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(required=False,allow_null=True)
#     class Meta:
#         model = Settings
#         fields = '__all__'
        
#     def create(self, validated_data):
#         if 'id' in validated_data:
#             obj, created = Settings.objects.update_or_create(id=validated_data['id'],defaults=validated_data)
#             return obj
#         settings, created = Settings.objects.update_or_create(**validated_data)
#         return settings

