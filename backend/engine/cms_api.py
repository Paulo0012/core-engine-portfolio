from ninja import Router, File, Form
from ninja.files import UploadedFile
from typing import List
from django.shortcuts import get_object_or_404
from .models import AcademicJourney, Certification, ProfessionalExperience, Skill, ContactInfo
from .schemas import AcademicJourneySchema, CertificationSchema, ProfessionalExperienceSchema, SkillSchema, ContactInfoSchema
from core.auth import auth_bearer

router = Router(tags=["Engine - CMS Dinâmico"])

# --- Academic Journey ---
@router.get("/academic/", response=List[AcademicJourneySchema])
def list_academic(request):
    return AcademicJourney.objects.all()

@router.post("/academic/", response={201: AcademicJourneySchema}, auth=auth_bearer)
def create_academic(request, data: AcademicJourneySchema):
    return 201, AcademicJourney.objects.create(**data.dict(exclude={'id'}))

@router.put("/academic/{item_id}", response=AcademicJourneySchema, auth=auth_bearer)
def update_academic(request, item_id: int, data: AcademicJourneySchema):
    item = get_object_or_404(AcademicJourney, id=item_id)
    for attr, value in data.dict(exclude={'id'}).items():
        setattr(item, attr, value)
    item.save()
    return item

@router.delete("/academic/{item_id}", response={204: None}, auth=auth_bearer)
def delete_academic(request, item_id: int):
    item = get_object_or_404(AcademicJourney, id=item_id)
    item.delete()
    return 204, None


# --- Certification ---
@router.get("/certifications/", response=List[CertificationSchema])
def list_certifications(request):
    return Certification.objects.all()

@router.post("/certifications/", response={201: CertificationSchema}, auth=auth_bearer)
def create_certification(request, data: Form[CertificationSchema], certificate_file: File[UploadedFile] = None):
    cert = Certification.objects.create(**data.dict(exclude={'id'}))
    if certificate_file:
        cert.certificate_file = certificate_file
        cert.save()
    return 201, cert

@router.put("/certifications/{item_id}", response=CertificationSchema, auth=auth_bearer)
def update_certification(request, item_id: int, data: Form[CertificationSchema], certificate_file: File[UploadedFile] = None):
    item = get_object_or_404(Certification, id=item_id)
    for attr, value in data.dict(exclude={'id'}).items():
        setattr(item, attr, value)
    if certificate_file:
        item.certificate_file = certificate_file
    item.save()
    return item

@router.delete("/certifications/{item_id}", response={204: None}, auth=auth_bearer)
def delete_certification(request, item_id: int):
    item = get_object_or_404(Certification, id=item_id)
    item.delete()
    return 204, None


# --- Professional Experience ---
@router.get("/experiences/", response=List[ProfessionalExperienceSchema])
def list_experiences(request):
    return ProfessionalExperience.objects.all()

@router.post("/experiences/", response={201: ProfessionalExperienceSchema}, auth=auth_bearer)
def create_experience(request, data: ProfessionalExperienceSchema):
    return 201, ProfessionalExperience.objects.create(**data.dict(exclude={'id'}))

@router.put("/experiences/{item_id}", response=ProfessionalExperienceSchema, auth=auth_bearer)
def update_experience(request, item_id: int, data: ProfessionalExperienceSchema):
    item = get_object_or_404(ProfessionalExperience, id=item_id)
    for attr, value in data.dict(exclude={'id'}).items():
        setattr(item, attr, value)
    item.save()
    return item

@router.delete("/experiences/{item_id}", response={204: None}, auth=auth_bearer)
def delete_experience(request, item_id: int):
    item = get_object_or_404(ProfessionalExperience, id=item_id)
    item.delete()
    return 204, None


# --- Skills ---
@router.get("/skills/", response=List[SkillSchema])
def list_skills(request):
    return Skill.objects.all()

@router.post("/skills/", response={201: SkillSchema}, auth=auth_bearer)
def create_skill(request, data: SkillSchema):
    return 201, Skill.objects.create(**data.dict(exclude={'id'}))

@router.put("/skills/{item_id}", response=SkillSchema, auth=auth_bearer)
def update_skill(request, item_id: int, data: SkillSchema):
    item = get_object_or_404(Skill, id=item_id)
    for attr, value in data.dict(exclude={'id'}).items():
        setattr(item, attr, value)
    item.save()
    return item

@router.delete("/skills/{item_id}", response={204: None}, auth=auth_bearer)
def delete_skill(request, item_id: int):
    item = get_object_or_404(Skill, id=item_id)
    item.delete()
    return 204, None


# --- Contact Info (Singleton-like) ---
@router.get("/contact/", response=ContactInfoSchema)
def get_contact(request):
    contact = ContactInfo.objects.first()
    if not contact:
        contact = ContactInfo.objects.create(email="email@example.com")
    return contact

@router.put("/contact/", response=ContactInfoSchema, auth=auth_bearer)
def update_contact(request, data: ContactInfoSchema):
    item = ContactInfo.objects.first()
    if not item:
        item = ContactInfo.objects.create()
    for attr, value in data.dict(exclude={'id'}).items():
        setattr(item, attr, value)
    item.save()
    return item
