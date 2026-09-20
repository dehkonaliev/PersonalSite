from django.contrib import admin
from .models import Project, ProjectImage, Technology

admin.site.register(ProjectImage)
admin.site.register(Technology)
admin.site.register(Project)
