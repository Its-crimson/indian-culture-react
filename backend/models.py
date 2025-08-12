from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


class HeroSlide(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    categories: List[str]
    bg_color: str
    text_color: str
    image_url: str
    region: str
    is_active: bool = True
    sort_order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class HeroSlideCreate(BaseModel):
    title: str
    description: str
    categories: List[str]
    bg_color: str
    text_color: str
    image_url: str
    region: str
    is_active: bool = True
    sort_order: int = 0


class CulturalCategory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    bg_color: str
    text_color: str
    categories: List[str]
    count_text: str
    image_url: str
    is_featured: bool = False
    sort_order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class CulturalCategoryCreate(BaseModel):
    title: str
    description: str
    bg_color: str
    text_color: str
    categories: List[str]
    count_text: str
    image_url: str
    is_featured: bool = False
    sort_order: int = 0


class RegionalHighlight(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    region_name: str
    states: List[str]
    cultural_highlights: List[str]
    bg_color: str
    text_color: str
    is_active: bool = True
    sort_order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class RegionalHighlightCreate(BaseModel):
    region_name: str
    states: List[str]
    cultural_highlights: List[str]
    bg_color: str
    text_color: str
    is_active: bool = True
    sort_order: int = 0


class FeaturedStory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str = ""
    category: str
    read_time: str
    image_url: str
    author: str = ""
    is_featured: bool = True
    published_at: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class FeaturedStoryCreate(BaseModel):
    title: str
    excerpt: str
    content: str = ""
    category: str
    read_time: str
    image_url: str
    author: str = ""
    is_featured: bool = True


class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    is_active: bool = True
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)


class NewsletterSubscriberCreate(BaseModel):
    email: str


# Response models for API
class ApiResponse(BaseModel):
    message: str
    data: Optional[dict] = None
    success: bool = True


class PaginatedResponse(BaseModel):
    data: List[dict]
    total: int
    page: int = 1
    page_size: int = 100
    success: bool = True