from django.shortcuts import render
from .models import Post
from .serializers import PostDetailSerializer, PostListSerializer
from rest_framework import viewsets


class PostViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.filter(is_published=True)
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer
    