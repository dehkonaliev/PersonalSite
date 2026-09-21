from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.text import slugify

class Post(models.Model):
    title = models.CharField(max_length=1000)
    summary = models.CharField(max_length=3000)
    created_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)
    slug = models.SlugField(max_length=1000, unique=True, blank=True)
    body = RichTextUploadingField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            slug = slugify(self.title)[:500]
            n = 0
            while Post.objects.filter(slug=slug).exists():
                n += 1
                slug = f"{slug}-{n}"
            self.slug = slug
        return super().save()
    
    def __str__(self):
        return self.title
