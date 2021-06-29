from rest_framework import serializers
from .models import (Categoeries)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoeries
        fields = "__all__"