from django.shortcuts import render
from rest_framework.response import Response
from .serializers import (ResumeSerializer, SkillsSerializer, HomeDataSerializer,
    EducationSerializer, ExperienceSerializer, CertificateSerializer
)
from .models import Resume, SkillType, Experience, Education, CustomUser, Activity, Certificates
from rest_framework import viewsets, generics



class ResumeAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    
    def list(self, request, *args, **kwargs):
        resume = self.get_queryset().first()
        return Response(self.get_serializer(resume).data)
    
class SkillsAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = SkillType.objects.all().order_by('order')
    serializer_class = SkillsSerializer
    
class ExperienceAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-order')
    serializer_class = ExperienceSerializer
    
class HomeDataAPIView(generics.RetrieveAPIView):
    serializer_class = HomeDataSerializer
    
    def get_object(self):
        return CustomUser.objects.first() or CustomUser()
    
class EducationAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all().order_by('-order')
    serializer_class = EducationSerializer
    
class CertificateViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Certificates.objects.all()
    serializer_class = CertificateSerializer
    
    
    