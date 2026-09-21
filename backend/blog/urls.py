from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PostViewset

router = DefaultRouter()
router.register('', PostViewset, basename='posts')

urlpatterns = [
    path('', include(router.urls))
]