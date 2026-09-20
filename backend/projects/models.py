from django.db import models
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField

class Technology(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
class Project(models.Model):
    title = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    summary = models.CharField(max_length=500)
    technologies = models.ManyToManyField(Technology, blank=True, null=True, related_name='technologies')
    github_link = models.URLField(blank=True, null=True)
    is_published = models.BooleanField(default=False)
    slug = models.SlugField(max_length=500, unique=True, blank=True)
    context = RichTextUploadingField(blank=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)[:250]
            slug = base
            n = 1
            while Project.objects.filter(slug=slug).exists():
                n += 1
            self.slug = f"{slug}-{n}"
        return super().save()
    
class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/')
    

    
