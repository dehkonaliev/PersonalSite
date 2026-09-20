from django.shortcuts import render
from rest_framework.response import Response
from .serializers import (ResumeSerializer, SkillsSerializer, HomeDataSerializer,
    EducationSerializer, ExperienceSerializer
)
from .models import Resume, SkillType, Experience, Education, CustomUser, Activity
from rest_framework import viewsets



class ResumeAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Resume.objects.first()
    serializer_class = ResumeSerializer
    
class SkillsAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = SkillType.objects.all().order_by('order')
    serializer_class = SkillsSerializer
    
class ExperienceAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-order')
    serializer_class = ExperienceSerializer
    
class HomeDataAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.first()
    serializer_class = HomeDataSerializer
    
class EducationAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all().order_by('-order')
    serializer_class = EducationSerializer
    
    
    