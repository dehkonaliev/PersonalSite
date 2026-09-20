from rest_framework import serializers
from .models import CustomUser, Skill, Activity, Experience, Education, Resume


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['name', 'title']

class HomeDataSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = [
            'first_name', 'last_name', 'job_title',
            'heading_activity', 'home_content', 'off_board',
            'photo', 'activities'
        ]
        
    def get_activities(self, obj):
        activities = Activity.objects.all().order_by('order')[:3]
        return ActivitySerializer(activities, many=True).data
    
class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['']
        
