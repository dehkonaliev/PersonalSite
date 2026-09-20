from django.shortcuts import render
from rest_framework import viewsets
from .models import Project
from .serializers import ProjectDetailSerializer, ProjectListSerializer

class ProjectViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_published=True).prefetch_related('technologies')
    look_up_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retirive':
            return ProjectDetailSerializer
        return ProjectListSerializer