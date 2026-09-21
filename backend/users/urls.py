from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExperienceAPIView, EducationAPIView, ResumeAPIView, HomeDataAPIView, SkillsAPIView, CertificateViewset

router = DefaultRouter()
router.register("educations", EducationAPIView, basename="educations")
router.register("resume", ResumeAPIView, basename="resume")
router.register("skills", SkillsAPIView, basename="skills")
router.register("experiences", ExperienceAPIView, basename="experiences")
router.register("certificates", CertificateViewset, basename="certificates")

urlpatterns = [
    path("", include(router.urls)),
    path('homedata', HomeDataAPIView.as_view())
]