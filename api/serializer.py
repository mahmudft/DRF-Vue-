from django.db.models import fields
from api.models import Books
from rest_framework import serializers

class BooksSerilazier(serializers.ModelSerializer):
    poster = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Books
        fields = ['id', 'author', 'title', 'description', 'poster']
    

