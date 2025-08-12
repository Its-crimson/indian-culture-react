from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import database initialization
from database import init_database, close_db_connection

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(
    title="Indian Heritage Cultural Website API",
    description="API for managing Indian cultural heritage content",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Indian Heritage Cultural Website API", "status": "running"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Indian Heritage API"}

# Include all route modules
# Route modules temporarily disabled

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database with sample data"""
    logger.info("Starting Indian Heritage Cultural Website API...")
    try:
        await init_database()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection"""
    logger.info("Shutting down API...")
    try:
        await close_db_connection()
        logger.info("Database connection closed")
    except Exception as e:
        logger.error(f"Error closing database connection: {e}")


# Additional endpoints for testing
@api_router.get("/test/all-data")
async def get_all_test_data():
    """Get all data for testing purposes"""
    try:
        from database import (
            hero_slides_collection, 
            cultural_categories_collection,
            regional_highlights_collection,
            featured_stories_collection
        )
        
        hero_slides = await hero_slides_collection.find({}).to_list(None)
        cultural_categories = await cultural_categories_collection.find({}).to_list(None)
        regional_highlights = await regional_highlights_collection.find({}).to_list(None)
        featured_stories = await featured_stories_collection.find({}).to_list(None)
        
        return {
            "hero_slides": len(hero_slides),
            "cultural_categories": len(cultural_categories),
            "regional_highlights": len(regional_highlights),
            "featured_stories": len(featured_stories),
            "status": "success"
        }
    except Exception as e:
        return {"error": str(e), "status": "error"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)