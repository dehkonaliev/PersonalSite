from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewset


router = DefaultRouter()
router.register("projects", ProjectViewset, basename="project")

urlpatterns = [
    path("api/", include(router.urls)),
]