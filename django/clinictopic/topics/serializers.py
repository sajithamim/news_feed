# from django.clinictopic.poll.models import UserPoll
from sys import setswitchinterval
from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import (Categoeries,TopicSpecialization,Topics,UserCategory,Image,Favourite,TopicSubSpecialization)
from specialization.serializers import (GetSpecializationseriallizer,GetSpecialization,GetSubspecializationSerializer)
from authentication.models import User
from authentication.serializers import UserProfileSerializer
from poll.models import UserPoll
from datetime import datetime, tzinfo
# from poll.serializers import TopicPollSerializer
# from poll.serializers import TopicPollSerializer
from poll.models import TopicPoll,PollOption
class GetPollOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollOption
        fields = '__all__'

class GetTopicpollSerializers(serializers.ModelSerializer):
    checked = serializers.SerializerMethodField()
    poll_option = GetPollOptionSerializer(many=True,read_only=True)
    class Meta:
        model = TopicPoll
        fields ='__all__'

    def get_checked(self,obj):
        # print(obj.topic_poll_id.user_id)
        user = self.context.get("request").user
        # print(obj.poll_option)
        if UserPoll.objects.filter(user_id__email=user,poll_option_id__topic_poll_id__id =obj.id).exists():
            userdata = UserPoll.objects.get(user_id__email=user,poll_option_id__topic_poll_id__id =obj.id)
            return str(userdata.poll_option_id.id)
        # userobj = User.objects.get(phone = obj['phone'])
        # userid = userobj.id
        # return UserCategory.objects.filter(user_id=userid).count()
        return "null"


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

class TopicsubSpecializationSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = TopicSubSpecialization
        fields = ['id','subspec_id']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['subspec_id'] = GetSubspecializationSerializer(instance.subspec_id).data
        return response

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'

class FilteredListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(user_id=self.context['request'].user)
        return super(FilteredListSerializer, self).to_representation(data)


class GetTopicFavouriteserializer(serializers.ModelSerializer):
    # favourite = serializers.SerializerMethodField()
    class Meta:
        # list_serializer_class = FilteredListSerializer
        model = Favourite
        fields=['id']

class GetTopicSeriaizer(serializers.ModelSerializer):
    topic_image = ImageSerializer(many=True, read_only=True)
    pdf =serializers.FileField(max_length=None,use_url=True, allow_null=True, required=False)
    class Meta:
        model = Topics
        fields = '__all__'
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['category_id'] = CategorySerializer(instance.category_id).data
        return response


class TopicFavouriteserializer(serializers.ModelSerializer):
    # favourite = serializers.SerializerMethodField()
    class Meta:
        list_serializer_class = FilteredListSerializer
        model = Favourite
        fields=['id']

class TopicSeriaizer(serializers.ModelSerializer):
    # images = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    # images = ImageSerializer(many=True,read_only=True)
    # poll_topic = GetTopicpollSerializers(many=True,read_only=True)
    topic_image = ImageSerializer(many=True, read_only=True)
    favourite_topic = TopicFavouriteserializer(many=True,read_only=True)
    # author = UserProfileSerializer(read_only=True)
    # email = serializers.EmailField(required=False,allow_null=True,allow_blank=True,write_only=True)
    # favourite = serializers.SerializerMethodField()
    pdf =serializers.FileField(max_length=None,use_url=True, allow_null=True, required=False)
    pdfsecond = serializers.FileField(max_length=None,use_url=True, allow_null=True, required=False)
    # topic_topic = TopicSpecializationSerializer(many=True)
    topic_subspec = TopicsubSpecializationSerializer(many=True)
    # favourite = serializers.SerializerMethodField()
    published = serializers.SerializerMethodField()
    externalurltype = serializers.SerializerMethodField()
    isadd = serializers.SerializerMethodField()
    class Meta:
        model = Topics
        fields = '__all__'
    def get_isadd(self,obj):
        return False
    def get_externalurltype(self,obj):
        etype = ""
        formattype = obj.format
        url = obj.external_url
        if formattype=='1':
            etype='pdf'
        else:
            if  url=="":
                etype=""
            elif str(url)[-4:]=='.pdf':
                etype="pdf"
            else:
                etype="external"
        return etype


    def get_published(self, obj):
        now = datetime.utcnow()
        publishtime = obj.publishingtime
        if publishtime.strftime("%Y-%m-%d %H:%M:%S")<=now.strftime("%Y-%m-%d %H:%M:%S"):
            published = 1
        else:
            published = 0
        return published
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['category_id'] = CategorySerializer(instance.category_id).data
        return response

    def create(self, validated_data):
        topic_spec_data = validated_data.pop('topic_subspec')
        if 'email' in validated_data:
            email = validated_data['email']
            del validated_data['email']
            author = User.objects.get(email=email)
            topic = Topics.objects.create(author=author,**validated_data)
        else:
            topic = Topics.objects.create(**validated_data)
        for data in topic_spec_data:
            topic_spec =TopicSubSpecialization.objects.create(topic_id = topic, **data)
        return topic

    def update(self, instance, validated_data):
        if validated_data['format'] =='1':
            image =Image.objects.filter(topic_id=instance).delete()
            if 'title' in validated_data:
                instance.title = validated_data.get('title', instance.title)
            if 'category_id' in validated_data:
                instance.category_id = validated_data.get('category_id', instance.category_id)
            if 'description' in validated_data:
                instance.description = validated_data.get('description', instance.description)
            if 'publishingtime' in validated_data:
                instance.publishingtime = validated_data.get('publishingtime', instance.publishingtime)
            if 'format' in validated_data:
                instance.format = validated_data.get('format', instance.format)
            instance.deliverytype='pdf'
            instance.source_url=''
            instance.external_url=''
            instance.media_type =''
            instance.video_url=''
        if validated_data['format'] =='2':
            # image =Image.objects.filter(topic_id=instance).delete()
            instance.source_url=''
            if 'title' in validated_data:
                instance.title = validated_data.get('title', instance.title)
            if 'category_id' in validated_data:
                instance.category_id = validated_data.get('category_id', instance.category_id)
            if 'description' in validated_data:
                instance.description = validated_data.get('description', instance.description)
            if 'external_url' in validated_data:
                instance.external_url = validated_data.get('external_url', instance.external_url)
            if 'publishingtime' in validated_data:
                instance.publishingtime = validated_data.get('publishingtime', instance.publishingtime)
            if 'format' in validated_data:
                instance.format = validated_data.get('format', instance.format)
            if 'source_url' in validated_data:
                instance.source_url = validated_data.get('source_url', instance.source_url)
            if 'deliverytype' in validated_data:
                instance.deliverytype = validated_data.get('deliverytype', instance.deliverytype)
            if 'pdf' in validated_data:
                instance.pdf = validated_data.get('pdf', instance.pdf)
            instance.media_type ='image'
            instance.video_url=''
            # instance.pdf=''
            instance.pdfsecond=''
        if validated_data['format'] =='3':
            image =Image.objects.filter(topic_id=instance).delete()
            instance.source_url=''
            if 'title' in validated_data:
                instance.title = validated_data.get('title', instance.title)
            if 'category_id' in validated_data:
                instance.category_id = validated_data.get('category_id', instance.category_id)
            if 'description' in validated_data:
                instance.description = validated_data.get('description', instance.description)
            if 'external_url' in validated_data:
                instance.external_url = validated_data.get('external_url', instance.external_url)
            if 'publishingtime' in validated_data:
                instance.publishingtime = validated_data.get('publishingtime', instance.publishingtime)
            if 'format' in validated_data:
                instance.format = validated_data.get('format', instance.format)
            if 'source_url' in validated_data:
                instance.source_url = validated_data.get('source_url', instance.source_url)
            if 'video_url' in validated_data:
                instance.video_url = validated_data.get('video_url', instance.video_url)
            if 'deliverytype' in validated_data:
                instance.deliverytype = validated_data.get('deliverytype', instance.deliverytype)
            if 'pdf' in validated_data:
                instance.pdf = validated_data.get('pdf', instance.pdf)
            instance.media_type ='video'
            instance.pdfsecond=''
            # instance.video_url=''
            # instance.pdf=''
        instance.save()


        # # up till here everything is updating, however the problem appears here.
        # # I don't know how to get the right InvoiceItem object, because in the validated
        # # data I get the items queryset, but without an id.

        items = validated_data.get('topic_subspec')
        inv_item = TopicSubSpecialization.objects.filter(topic_id = instance).delete()
        for item in items:
            topic_spec = TopicSubSpecialization.objects.create(topic_id = instance, **item)
        return instance


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


class Categorypicserializer(serializers.ModelSerializer):
    # image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Categoeries
        fields =['image']

    # def get_image(self, obj):
    #     request = self.context.get('request')
    #     photo_url = obj.image.url
    #     print(request.build_absolute_uri(photo_url))
    #     return request.build_absolute_uri(photo_url)

class Topicpdfserializer(serializers.ModelSerializer):
    # pdf = serializers.FileField()
    class Meta:
        model =Topics
        fields = ['pdf']

class TopicSecondpdfserializer(serializers.ModelSerializer):
    # pdfsecond = serializers.FileField()
    class Meta:
        model =Topics
        fields = ['pdfsecond']

class TopicImageSerializer(serializers.ModelSerializer):
    # image = serializers.ListField(child=serializers.ImageField(max_length=100000,allow_empty_file=False,use_url=False))
    class Meta:
        model = Image
        fields = ('image','topic_id')


class userFavouriteSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    # user_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    # category_id = serializers.StringRelatedField(many=True)
    success = serializers.SerializerMethodField()

    class Meta:
        model = Favourite
        fields = ['success','id','user_id','topic_id']
        # extra_kwargs = {
        #     'topic_id': {'write_only': True}
        # }

    def get_success(self,obj):
        return 'True'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['topic_id'] = GetTopicSeriaizer(instance.topic_id).data
        return response

    def validate(self,attrs):
        user_id = attrs.get('user_id','')
        user_data = User.objects.filter(email=user_id)
        if not user_data:
            raise serializers.ValidationError("invalid user!")
        return attrs
    def create(self, validated_data):
        return Favourite.objects.get_or_create(**validated_data)


class UpdateTopicSpecializationSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = TopicSpecialization
        fields = ['id','spec_id','topic_id']

class authorserializer(serializers.ModelSerializer):
        # user = UserSerializer(read_only=True)
        author = serializers.EmailField(write_only=True)   
        model = Topics
        fields = ['author']

        def update(self, validated_data):
            # print(validated_data['author'])
            user = User.objects.get(email=validated_data['author'])
            print(user)
            topic = Topics.objects.update(author=user)
            return topic


class TopicSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topics
        fields = ['id','title']
    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['category_id'] = CategorySerializer(instance.category_id).data
    #     return response
#search topic suggestion
class categoryTopicSerializer(serializers.ModelSerializer):
    topic_category =TopicSearchSerializer(many=True)
    def get_topic_category(self, product):
        key = self.context.get("key")
        qs = Topics.objects.filter(title__icontains=pk)
        serializer = TopicSearchSerializer(instance=qs, many=True)
        return serializer.data
    class Meta:
        model = Categoeries
        fields = ['id','title','topic_category']

    # def to_representation(self, instance):
    #     key = self.context.get("key")
    #     data = data.filter(title__icontains=pk)
    #     return super(categoryTopicSerializer,self).to_representation(data)