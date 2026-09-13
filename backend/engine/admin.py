from django.contrib import admin
from .models import (
    Project, ProjectImage, AcademicJourney, Certification,
    ProfessionalExperience, Skill, ContactInfo
)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    search_fields = ('title', 'category')
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(ProjectImage)

@admin.register(AcademicJourney)
class AcademicJourneyAdmin(admin.ModelAdmin):
    list_display = ('course', 'institution', 'period', 'status')

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuer', 'date_info')

@admin.register(ProfessionalExperience)
class ProfessionalExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'period')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level')

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone')
