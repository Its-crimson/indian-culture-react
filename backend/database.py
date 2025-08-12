from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
hero_slides_collection = db.hero_slides
cultural_categories_collection = db.cultural_categories
regional_highlights_collection = db.regional_highlights
featured_stories_collection = db.featured_stories
newsletter_subscribers_collection = db.newsletter_subscribers


async def init_database():
    """Initialize database with sample data if collections are empty"""
    
    # Sample hero slides data
    hero_slides_sample = [
        {
            "id": "1",
            "title": "Classical Dance Forms",
            "description": "Bharatanatyam, Kathak, Odissi - Ancient stories told through graceful movements",
            "categories": ["Dance", "Arts", "Traditions"],
            "bg_color": "#d987ff",
            "text_color": "#151515",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "region": "Pan-India",
            "is_active": True,
            "sort_order": 1
        },
        {
            "id": "2",
            "title": "Vibrant Festivals",
            "description": "Diwali, Holi, Durga Puja - Celebrations that unite communities across the nation",
            "categories": ["Festivals", "Traditions", "Community"],
            "bg_color": "#ffe03d",
            "text_color": "#151515",
            "image_url": "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&h=600&fit=crop",
            "region": "National",
            "is_active": True,
            "sort_order": 2
        },
        {
            "id": "3",
            "title": "Magnificent Architecture",
            "description": "From Taj Mahal to ancient temples - Architectural marvels that define India's skyline",
            "categories": ["Architecture", "Heritage", "History"],
            "bg_color": "#88a2ff",
            "text_color": "#ffffff",
            "image_url": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
            "region": "Historical",
            "is_active": True,
            "sort_order": 3
        },
        {
            "id": "4",
            "title": "Culinary Heritage",
            "description": "Rich flavors and diverse cuisines - A gastronomic journey across Indian states",
            "categories": ["Cuisine", "Culture", "Regional"],
            "bg_color": "#ff965a",
            "text_color": "#ffffff",
            "image_url": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
            "region": "Pan-India",
            "is_active": True,
            "sort_order": 4
        },
        {
            "id": "5",
            "title": "Traditional Crafts",
            "description": "Handloom textiles, pottery, jewelry - Artisan skills passed down through generations",
            "categories": ["Crafts", "Arts", "Heritage"],
            "bg_color": "#78d692",
            "text_color": "#151515",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "region": "Rural India",
            "is_active": True,
            "sort_order": 5
        }
    ]
    
    # Sample cultural categories data
    cultural_categories_sample = [
        {
            "id": "1",
            "title": "Classical Arts",
            "description": "Explore the timeless beauty of Indian classical music, dance, and performing arts that have captivated audiences for millennia.",
            "bg_color": "#ffd1e7",
            "text_color": "#151515",
            "categories": ["Music", "Dance", "Theatre"],
            "count_text": "12+ Forms",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            "is_featured": True,
            "sort_order": 1
        },
        {
            "id": "2",
            "title": "Festivals & Celebrations",
            "description": "Discover the vibrant tapestry of Indian festivals that celebrate seasons, harvests, and spiritual traditions.",
            "bg_color": "#f6fd87",
            "text_color": "#151515",
            "categories": ["Festivals", "Traditions", "Spirituality"],
            "count_text": "50+ Festivals",
            "image_url": "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=300&fit=crop",
            "is_featured": True,
            "sort_order": 2
        },
        {
            "id": "3",
            "title": "Architectural Wonders",
            "description": "Journey through India's magnificent architectural heritage from ancient temples to Mughal monuments.",
            "bg_color": "#b6cbcb",
            "text_color": "#151515",
            "categories": ["Architecture", "Heritage", "History"],
            "count_text": "100+ Sites",
            "image_url": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
            "is_featured": True,
            "sort_order": 3
        },
        {
            "id": "4",
            "title": "Regional Cuisines",
            "description": "Savor the diverse flavors and cooking traditions that vary dramatically across India's states and regions.",
            "bg_color": "#b7fbff",
            "text_color": "#151515",
            "categories": ["Food", "Culture", "Regional"],
            "count_text": "25+ Cuisines",
            "image_url": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
            "is_featured": True,
            "sort_order": 4
        },
        {
            "id": "5",
            "title": "Traditional Crafts",
            "description": "Appreciate the intricate craftsmanship of India's artisans through textiles, pottery, jewelry, and more.",
            "bg_color": "#d987ff",
            "text_color": "#ffffff",
            "categories": ["Crafts", "Textiles", "Artisan"],
            "count_text": "30+ Crafts",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            "is_featured": True,
            "sort_order": 5
        },
        {
            "id": "6",
            "title": "Languages & Literature",
            "description": "Explore India's linguistic diversity and rich literary traditions spanning ancient epics to modern works.",
            "bg_color": "#88a2ff",
            "text_color": "#ffffff",
            "categories": ["Literature", "Languages", "Poetry"],
            "count_text": "22+ Languages",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            "is_featured": True,
            "sort_order": 6
        }
    ]
    
    # Sample regional highlights data
    regional_highlights_sample = [
        {
            "id": "1",
            "region_name": "North India",
            "states": ["Punjab", "Rajasthan", "Delhi", "Uttar Pradesh"],
            "cultural_highlights": ["Punjabi Bhangra", "Rajasthani Folk Art", "Mughal Architecture", "Classical Music"],
            "bg_color": "#ff84e4",
            "text_color": "#151515",
            "is_active": True,
            "sort_order": 1
        },
        {
            "id": "2",
            "region_name": "South India",
            "states": ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"],
            "cultural_highlights": ["Bharatanatyam", "Ayurveda", "Temple Architecture", "Classical Music"],
            "bg_color": "#78d692",
            "text_color": "#151515",
            "is_active": True,
            "sort_order": 2
        },
        {
            "id": "3",
            "region_name": "East India",
            "states": ["West Bengal", "Odisha", "Assam", "Jharkhand"],
            "cultural_highlights": ["Durga Puja", "Odissi Dance", "Tea Culture", "Handicrafts"],
            "bg_color": "#ffe03d",
            "text_color": "#151515",
            "is_active": True,
            "sort_order": 3
        },
        {
            "id": "4",
            "region_name": "West India",
            "states": ["Maharashtra", "Gujarat", "Goa", "Rajasthan"],
            "cultural_highlights": ["Bollywood", "Garba Dance", "Portuguese Heritage", "Business Culture"],
            "bg_color": "#d1903a",
            "text_color": "#ffffff",
            "is_active": True,
            "sort_order": 4
        }
    ]
    
    # Sample featured stories data
    featured_stories_sample = [
        {
            "id": "1",
            "title": "The Art of Mehendi",
            "excerpt": "Discover the intricate patterns and cultural significance of henna art in Indian weddings and celebrations.",
            "content": "Mehendi, the ancient art of henna decoration, holds deep cultural significance in Indian traditions. This intricate body art form has been practiced for centuries, symbolizing joy, beauty, spiritual awakening, and offering. The elaborate patterns tell stories of love, prosperity, and new beginnings, making it an essential part of Indian celebrations.",
            "category": "Traditional Arts",
            "read_time": "5 min read",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
            "author": "Cultural Heritage Team",
            "is_featured": True
        },
        {
            "id": "2",
            "title": "Spice Routes of India",
            "excerpt": "Journey through the historical trade routes that brought the world to India's doorstep.",
            "content": "India's spice routes have shaped global trade and culture for millennia. From the Malabar Coast's black pepper to Kashmir's saffron, these aromatic treasures attracted merchants from across the world, creating a rich tapestry of cultural exchange and economic prosperity.",
            "category": "History & Culture",
            "read_time": "8 min read",
            "image_url": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
            "author": "Heritage Scholars",
            "is_featured": True
        },
        {
            "id": "3",
            "title": "Monsoon Festivals",
            "excerpt": "Celebrate the life-giving rains through India's monsoon festivals and traditions.",
            "content": "The monsoon season brings not just life-giving rains to India, but also a celebration of renewal and abundance. From Teej in the north to Onam in the south, monsoon festivals across India celebrate the earth's rejuvenation and the promise of a good harvest.",
            "category": "Festivals",
            "read_time": "6 min read",
            "image_url": "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=300&h=200&fit=crop",
            "author": "Festival Experts",
            "is_featured": True
        }
    ]
    
    # Initialize collections if empty
    if await hero_slides_collection.count_documents({}) == 0:
        await hero_slides_collection.insert_many(hero_slides_sample)
        print("✓ Initialized hero slides collection")
    
    if await cultural_categories_collection.count_documents({}) == 0:
        await cultural_categories_collection.insert_many(cultural_categories_sample)
        print("✓ Initialized cultural categories collection")
    
    if await regional_highlights_collection.count_documents({}) == 0:
        await regional_highlights_collection.insert_many(regional_highlights_sample)
        print("✓ Initialized regional highlights collection")
    
    if await featured_stories_collection.count_documents({}) == 0:
        await featured_stories_collection.insert_many(featured_stories_sample)
        print("✓ Initialized featured stories collection")


async def close_db_connection():
    """Close database connection"""
    client.close()