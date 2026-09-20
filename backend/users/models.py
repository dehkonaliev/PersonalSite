from django.db import models

class CustomUser(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    job_title = models.CharField(max_length=500)
    heading_activity = models.CharField(max_length=2000)
    home_context = models.CharField(max_length=2000)
    off_board = models.CharField(max_length=2000)
    photo = models.ImageField(upload_to='me/', blank=True, null=True)

class Activity(models.Model):
    title = models.CharField(max_length=200)
    context = models.CharField(max_length=2000)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title
    
class Resume(models.Model):
    location = models.CharField(max_length=300)
    summary = models.CharField(max_length=3000)
    email = models.EmailField()
    resume_file = models.FileField(upload_to='files/')
    website_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(null=True, blank=True)
    telegram_url = models.URLField(null=True, blank=True)
    
    
    
class Experience(models.Model):
    job = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    activity = models.CharField(max_length=2000, blank=True, null=True)
    from_date = models.DateField()
    to_date = models.DateField()
    location = models.CharField(max_length=300, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.company
    
class SkillType(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    type = models.ForeignKey(SkillType, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    
class Education(models.Model):
    field = models.CharField(max_length=100)
    edu_place = models.CharField(max_length=200)
    from_date = models.DateField()
    to_date = models.DateField()
    what_learnt = models.CharField(max_length=2000)
    certification = models.FileField(upload_to='certifications/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.edu_place
    
    