from rest_framework import serializers
from .models import UserPoll,PollOption,TopicPoll



class PolloptionSerializer(serializers.ModelSerializer):
    topic_poll_id = serializers.ReadOnlyField()
    class Meta: 
        model = PollOption
        fields = '__all__'
        # read_only_fields = ('topic_poll_id')


class TopicPollSerializer(serializers.ModelSerializer):
    poll_option = PolloptionSerializer(many=True)
    # topic_poll_id
    class Meta:
        model = TopicPoll
        fields = '__all__'
        # write_only_fields = ('topic_id','poll_option')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['poll_option'] = PolloptionSerializer(instance.poll_option).data
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
            return {}
    # def to_representation(s