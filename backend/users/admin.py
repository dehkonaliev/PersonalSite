from django.contrib import admin
from .models import CustomUser, Skill, Education, Experience, Activity, Resume, SkillType, Certificates

admin.site.register(Activity)
admin.site.register(Experience)
admin.site.register(Skill)
admin.site.register(Resume)
admin.site.register(Education)
admin.site.register(CustomUser)
admin.site.register(SkillType)
admin.site.register(Certificates)