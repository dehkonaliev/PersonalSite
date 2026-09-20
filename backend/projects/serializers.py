from rest_framework import serializers
from .models import Project, Technology

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name']


class ProjectDetailSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "summary", "context",
            "technologies", "github_link", "created_at",
        ]
        
class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'summary', 'technologies', 'github_link', 'created_at']
        
