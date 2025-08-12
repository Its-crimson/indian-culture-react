# Indian Heritage Cultural Website - Backend Integration Contracts

## Overview
This document outlines the API contracts, data models, and integration points for transforming the mock-based frontend into a fully dynamic backend-integrated application.

## Current Mock Data Structure

### 1. Hero Slides (`heroSlides`)
- **Fields**: id, title, description, categories, bgColor, textColor, image, region
- **Usage**: Main hero slider showcasing cultural aspects
- **Count**: 5 slides

### 2. Cultural Categories (`culturalCategories`)
- **Fields**: id, title, description, bgColor, textColor, categories, count, image
- **Usage**: Main culture grid cards
- **Count**: 6 categories

### 3. Regional Highlights (`regionalHighlights`)
- **Fields**: id, region, states, highlights, bgColor, textColor
- **Usage**: Regional showcase section
- **Count**: 4 regions

### 4. Featured Stories (`featuredStories`)
- **Fields**: id, title, excerpt, category, readTime, image
- **Usage**: Cultural stories section
- **Count**: 3 stories

### 5. Navigation Links (`navigationLinks`)
- **Fields**: label, href
- **Usage**: Header navigation
- **Count**: 6 links

## Database Models

### HeroSlide Model
```python
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
```

### CulturalCategory Model
```python
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
```

### RegionalHighlight Model
```python
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
```

### FeaturedStory Model
```python
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
```

## API Endpoints

### Hero Slides API
- `GET /api/hero-slides` - Get all active hero slides (sorted by sort_order)
- `POST /api/hero-slides` - Create new hero slide
- `PUT /api/hero-slides/{id}` - Update hero slide
- `DELETE /api/hero-slides/{id}` - Delete hero slide

### Cultural Categories API
- `GET /api/cultural-categories` - Get all cultural categories (sorted by sort_order)
- `POST /api/cultural-categories` - Create new cultural category
- `PUT /api/cultural-categories/{id}` - Update cultural category
- `DELETE /api/cultural-categories/{id}` - Delete cultural category

### Regional Highlights API
- `GET /api/regional-highlights` - Get all active regional highlights (sorted by sort_order)
- `POST /api/regional-highlights` - Create new regional highlight
- `PUT /api/regional-highlights/{id}` - Update regional highlight
- `DELETE /api/regional-highlights/{id}` - Delete regional highlight

### Featured Stories API
- `GET /api/featured-stories` - Get all featured stories (sorted by published_at desc)
- `GET /api/stories/{id}` - Get single story with full content
- `POST /api/featured-stories` - Create new story
- `PUT /api/featured-stories/{id}` - Update story
- `DELETE /api/featured-stories/{id}` - Delete story

### Newsletter API
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers (admin only)

## Frontend Integration Changes

### 1. Remove Mock Data Import
- Remove `import { heroSlides, culturalCategories, regionalHighlights, featuredStories } from '../mock'`
- Replace with API calls using axios

### 2. Add API Service Layer
Create `/app/frontend/src/services/api.js`:
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const apiService = {
  // Hero slides
  getHeroSlides: () => axios.get(`${API}/hero-slides`),
  
  // Cultural categories
  getCulturalCategories: () => axios.get(`${API}/cultural-categories`),
  
  // Regional highlights
  getRegionalHighlights: () => axios.get(`${API}/regional-highlights`),
  
  // Featured stories
  getFeaturedStories: () => axios.get(`${API}/featured-stories`),
  
  // Newsletter
  subscribeNewsletter: (email) => axios.post(`${API}/newsletter/subscribe`, { email })
};
```

### 3. Component Updates
- **HeroSlider.jsx**: Use `useEffect` and `useState` to fetch hero slides from API
- **CultureGrid.jsx**: Fetch cultural categories from API
- **RegionalShowcase.jsx**: Fetch regional highlights from API
- **FeaturedStories.jsx**: Fetch featured stories from API
- **Footer.jsx & FeaturedStories.jsx**: Add newsletter subscription functionality

### 4. Loading States
Add loading spinners and error handling for all API calls:
- Loading skeleton components
- Error boundary components
- Retry mechanisms

### 5. State Management
- Use React hooks (useState, useEffect) for local state
- Add proper error handling and loading states
- Implement optimistic updates where appropriate

## Data Migration

### Initial Data Seeding
Create database initialization script to populate with mock data:
1. Convert current mock data to database records
2. Add proper IDs, timestamps, and additional fields
3. Set appropriate sort orders for display sequence

### Admin Interface (Future)
- Content management system for updating slides, categories, and stories
- Image upload functionality
- Content scheduling and publishing workflow

## Performance Considerations

### Caching Strategy
- Implement Redis caching for frequently accessed data
- Cache hero slides, cultural categories for 1 hour
- Cache regional highlights for 6 hours
- Featured stories cache for 30 minutes

### Image Optimization
- Implement image resizing and optimization
- Use CDN for image delivery
- Add lazy loading for images

### Database Indexing
- Index on `is_active`, `sort_order`, `created_at` fields
- Index on `is_featured` for stories
- Compound indexes for complex queries

## Security Considerations
- Input validation for all POST/PUT endpoints
- Rate limiting for newsletter subscription
- SQL injection prevention through parameterized queries
- XSS protection for user-generated content

## Testing Strategy
- Unit tests for all API endpoints
- Integration tests for frontend-backend communication
- End-to-end tests for critical user journeys
- Performance tests for API response times

## Deployment Considerations
- Environment-specific configuration
- Database migration scripts
- Static asset optimization
- CDN integration for images