from rest_framework import serializers
from .models import CustomUser, Skill, SkillType, Activity, Experience, Education, Resume


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

  
class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'field', 'edu_place', 'from_date', 'to_date', 'what_learnt', 'certification']        

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'job', 'company', 'activity', 'from_date', 'to_date', 'location']

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = [
            'location', 'summary', 'email', 'resume_file', 'website_url',
            'github_url', 'linkedin_url', 'telegram_url'
        ]
    

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name']

class SkillsSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()
    class Meta:
        model = SkillType
        fields = ['name', 'skills']
        
    def get_skills(self, obj):
        skills = obj.skills.all().order_by('order')
        return SkillSerializer(skills, many=True).data   
        
