from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import UserPoll,PollOption,TopicPoll,Feedback,Settings,ContactUs,AddSetting
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
            # print(validated_data)
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


class SettingsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False,allow_null=True)
    class Meta:
        model = Settings
        fields = '__all__'
        
    def create(self, validated_data):
        count=Settings.objects.filter().count()
        print("Count:  ",count)
        if  count >=1:
            obj = Settings.objects.update(**validated_data)
            return obj
        settings = Settings.objects.create(**validated_data)
        return settings

class ContactusSerializer(serializers.ModelSerializer):

    default_error_messages = {
        'phone': 'The phone should only contain numeric characters'}
    class Meta:
        model = ContactUs
        fields = '__all__'
    def validate(self, attrs):
        email = attrs.get('email', '')
        name = attrs.get('name', '')
        phone = attrs.get('phone', '')
        message = attrs.get('message', '')
        # print(name)
        if phone:
            if not phone.isnumeric():
                raise serializers.ValidationError(
                    self.default_error_messages)
        return attrs

class AddSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddSetting
        fields = '__all__'
    def create(self, validated_data):
            add = AddSetting.objects.all().delete()
            addsetting=AddSetting.objects.create(**validated_data)
            return addsetting

class Aboutusserializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields =['about_us']

class ContactSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields =['contact_us']

class Privacypolicyserializer(serializers.ModelSerializer):
    class Meta:
        model=Settings
        fields=['privacy_policy']
class TOSserializer(serializers.ModelSerializer):
    class Meta:
        model=Settings
        fields=['tos']