from rest_framework import serializers
from .models import UserPoll,PollOption,TopicPoll
from topics.serializers import TopicSeriaizer

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
            # usersubarray=[]
            for polloption in polloption:
                option=PollOption.objects.create(topic_poll_id=topicpoll, **polloption)
            # print(usersubarray)
            # spec_id = {}
            return topicpoll
    # def to_representation(s