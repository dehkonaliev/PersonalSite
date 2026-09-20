from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExperienceAPIView, EducationAPIView, ResumeAPIView, HomeDataAPIView, SkillsAPIView

router = DefaultRouter()
router.register("homedata", HomeDataAPIView, basename="homedata")
router.register("educations", EducationAPIView, basename="educations")
router.register("resume", ResumeAPIView, basename="resume")
router.register("skills", SkillsAPIView, basename="skills")
router.register("experiences", ExperienceAPIView, basename="experiences")

urlpatterns = [
    path("", include(router.urls)),
]