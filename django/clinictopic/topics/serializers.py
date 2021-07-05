from django.db.models import fields
from rest_framework import serializers
from .models import (Categoeries,TopicSpecialization,Topics,UserCategory)
from specialization.serializers import (GetSpecializationseriallizer,GetSpecialization)
from authentication.models import User

class CategorySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=False, required=True)
    class Meta:
        model = Categoeries
        fields = ['id','title','image']



class TopicSpecializationSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = TopicSpecialization
        fields = ['id','spec_id']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['spec_id'] = GetSpecialization(instance.spec_id).data
        return response

class TopicSeriaizer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    pdf =serializers.FileField(max_length=None,use_url=True, allow_null=True, required=False)
    topic_topic = TopicSpecializationSerializer(many=True)
    class Meta:
        model = Topics
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['category_id'] = CategorySerializer(instance.category_id).data
        return response

    def create(self, validated_data):
        topic_spec_data = validated_data.pop('topic_topic')
        topic = Topics.objects.create(**validated_data)
        for data in topic_spec_data:
            topic_spec = TopicSpecialization.objects.create(topic_id = topic, **data)
        return topic



class userCategorySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    # user_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    # category_id = serializers.StringRelatedField(many=True)

    class Meta:
        model = UserCategory
        fields = ['id','user_id','category_id']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['category_id'] = CategorySerializer(instance.category_id).data
        return response

    def validate(self,attrs):
        user_id = attrs.get('user_id','')
        category_id = attrs.get('category_id','')
        # print(category_id.id)
        # user_
        user_data = User.objects.filter(email=user_id)
        if not user_data:
            raise serializers.ValidationError("invalid user!")
        return attrs

    
    def create(self, validated_data):
        # print (validated_data)
        return UserCategory.objects.create(**validated_data)
