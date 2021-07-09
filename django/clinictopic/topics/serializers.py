from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import (Categoeries,TopicSpecialization,Topics,UserCategory,Image,Favourite)
from specialization.serializers import (GetSpecializationseriallizer,GetSpecialization)
from authentication.models import User
# from poll.serializers import TopicPollSerializer
# from poll.serializers import TopicPollSerializer
from poll.models import TopicPoll,PollOption


class GetPollOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollOption
        fields = '__all__'

class GetTopicpollSerializers(serializers.ModelSerializer):
    poll_option = GetPollOptionSerializer(many=True,read_only=True)
    class Meta:
        model = TopicPoll
        fields ='__all__'


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Categoeries
        fields = ['id','title','image']

class CheckedCategorySerializer(serializers.ModelSerializer):
    checked = serializers.SerializerMethodField()
    id = serializers.ReadOnlyField()
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Categoeries
        fields = ['id','title','image','checked']
    def get_checked(self, obj):
        user_id =self.context['request'].user
        # print(user_id)
        return UserCategory.objects.filter(user_id=user_id,category_id=obj.id).count()
        # return "fsf"

class TopicSpecializationSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = TopicSpecialization
        fields = ['id','spec_id']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['spec_id'] = GetSpecialization(instance.spec_id).data
        return response

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'

class TopicFavouriteserializer(serializers.ModelSerializer):
    # favourite = serializers.SerializerMethodField()
    class Meta:
        model = Favourite
        fields=['id']

class TopicSeriaizer(serializers.ModelSerializer):
    # images = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    # images = ImageSerializer(many=True,read_only=True)
    poll_topic = GetTopicpollSerializers(many=True,read_only=True)
    topic_image = ImageSerializer(many=True, read_only=True)
    favourite_topic = TopicFavouriteserializer(many=True,read_only=True)
    pdf =serializers.FileField(max_length=None,use_url=True, allow_null=True, required=False)
    topic_topic = TopicSpecializationSerializer(many=True)
    # favourite = serializers.SerializerMethodField()
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








# class PostSerializer(serializers.ModelSerializer):
#     images = ImageSerializer(many=True)
#     pdf = serializers.FileField(max_length=None,use_url=True, allow_null=True, required=False)

#     class Meta:
#         model = Topics
#         fields = '__all__'

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['category_id'] = CategorySerializer(instance.category_id).data
#         return response

#     def create(self, validated_data):
#         """
#         Handle writable nested serializer to create a new post.
#         :param validated_data: validated data, by serializer class's validate method
#         :return: updated Post model instance
#         """
#         # Handle the case to avoid new Post instance creation if Image model data have any errors
#         data = validated_data.copy()
#         data.pop('images')  # deleting 'images' list as it is not going to be used

#         '''
#         Fetching `images` list of image files explicitly from context.
#         Because using default way, value of `images` received at serializers from viewset was an empty list.
#         However value of `images` in viewset were OK.
#         Hence applied this workaround.   
#         '''
#         images_data = self.context.get('request').data.pop('images')
#         # print(image_data)
#         try:
#             topic = Topics.objects.create(**data)
#         except TypeError:
#             msg = (
#                     'Got a `TypeError` when calling `Topics.objects.create()`.'
#             )
#             raise TypeError(msg)
#         try:
#             for image_data in images_data:
#                 # Image.objects.create(post=post, **image_data)
#                 image, created = Image.objects.get_or_create(image=image_data)
#                 topic.images.add(image)

#             return topic
#         except TypeError:
#             topic = Topics.objects.get(pk=topic.id)
#             topic.delete()
#             msg = (
#                     'Got a `TypeError` when calling `Image.objects.get_or_create()`.'
#             )
#             raise TypeError(msg)

#         return post

#     def update(self, instance, validated_data):
#         """
#         Handle writable nested serializer to update the current post.
#         :param instance: current Post model instance
#         :param validated_data: validated data, by serializer class's validate method
#         :return: updated Post model instance
#         """
#         # TODO: change the definition to make it work same as create()

#         '''
#         overwrite post instance fields with new data if not None, else assign the old value
#         '''
#         instance.topic_audience = validated_data.get('topic_audience', instance.topic_audience)
#         instance.category_id = validated_data.get('category_id', instance.category_id)
#         instance.title = validated_data.get('title', instance.title)
#         instance.topic_audience = validated_data.get('topic_audience', instance.topic_audience)
#         instance.description = validated_data.get('description', instance.description)
#         instance.deliverytype = validated_data.get('deliverytype', instance.deliverytype)
#         instance.external_url = validated_data.get('external_url', instance.external_url)
#         instance.media_type = validated_data.get('media_type', instance.media_type)
#         instance.video_url = validated_data.get('video_url', instance.video_url)
#         instance.publishingtime = validated_data.get('publishingtime', instance.publishingtime)
#         # instance.updated_at = validated_data.get('updated_at', instance.updated_at)  # no need to update; auto_now;

#         try:

#             '''
#             Fetching `images` list of image files explicitly from context.
#             Because using default way, value of `images` received at serializers from viewset was an empty list.
#             However value of `images` in viewset were OK.
#             Hence applied this workaround.   
#             '''
#             images_data = self.context.get('request').data.pop('images')
#         except:
#             images_data = None

#         if images_data is not None:
#             image_instance_list = []
#             for image_data in images_data:
#                 image, created = Image.objects.get_or_create(image=image_data)
#                 image_instance_list.append(image)

#             instance.images.set(image_instance_list)

#         instance.save()  # why? see base class code; need to save() to make auto_now work
#         return instance

class Categorypicserializer(serializers.ModelSerializer):
    class Meta:
        model = Categoeries
        fields =['image']

class Topicpdfserializer(serializers.ModelSerializer):
    class Meta:
        model =Topics
        fields = ['pdf']

class TopicImageSerializer(serializers.ModelSerializer):
    # image = serializers.ListField(child=serializers.ImageField(max_length=100000,allow_empty_file=False,use_url=False))
    class Meta:
        model = Image
        fields = ['image']
    def create(self, validated_data):
        image=validated_data.pop('image')
        for img in image:
            photo=Image.objects.create(image=img,**validated_data)
        return photo


class userFavouriteSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    # user_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    # category_id = serializers.StringRelatedField(many=True)
    success = serializers.SerializerMethodField()

    class Meta:
        model = Favourite
        fields = ['success','id','user_id','topic_id']

    def get_success(self,obj):
        return 'True'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['topic_id'] = TopicSeriaizer(instance.topic_id).data
        return response

    def validate(self,attrs):
        user_id = attrs.get('user_id','')
        # category_id = attrs.get('category_id','')
        # print(category_id.id)
        # user_
        user_data = User.objects.filter(email=user_id)
        if not user_data:
            raise serializers.ValidationError("invalid user!")
        return attrs

    
    def create(self, validated_data):
        # print (validated_data)
        return Favourite.objects.create(**validated_data)