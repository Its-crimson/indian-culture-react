from fastapi import APIRouter, HTTPException
from typing import List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from models import FeaturedStory, FeaturedStoryCreate, ApiResponse
from database import featured_stories_collection
from datetime import datetime

router = APIRouter(prefix="/featured-stories", tags=["Featured Stories"])


@router.get("/", response_model=List[FeaturedStory])
async def get_featured_stories():
    """Get all featured stories sorted by published_at (newest first)"""
    try:
        cursor = featured_stories_collection.find(
            {"is_featured": True}
        ).sort("published_at", -1)
        
        stories = await cursor.to_list(length=None)
        return [FeaturedStory(**story) for story in stories]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching featured stories: {str(e)}")


@router.get("/all", response_model=List[FeaturedStory])
async def get_all_stories():
    """Get all stories (featured and non-featured)"""
    try:
        cursor = featured_stories_collection.find({}).sort("published_at", -1)
        stories = await cursor.to_list(length=None)
        return [FeaturedStory(**story) for story in stories]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching all stories: {str(e)}")


@router.get("/category/{category}", response_model=List[FeaturedStory])
async def get_stories_by_category(category: str):
    """Get stories by category"""
    try:
        cursor = featured_stories_collection.find(
            {"category": {"$regex": category, "$options": "i"}}
        ).sort("published_at", -1)
        
        stories = await cursor.to_list(length=None)
        return [FeaturedStory(**story) for story in stories]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stories by category: {str(e)}")


@router.get("/{story_id}", response_model=FeaturedStory)
async def get_story(story_id: str):
    """Get a specific story by ID"""
    try:
        story = await featured_stories_collection.find_one({"id": story_id})
        if not story:
            raise HTTPException(status_code=404, detail="Story not found")
        return FeaturedStory(**story)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching story: {str(e)}")


@router.post("/", response_model=FeaturedStory)
async def create_story(story: FeaturedStoryCreate):
    """Create a new story"""
    try:
        story_dict = story.dict()
        story_obj = FeaturedStory(**story_dict)
        
        await featured_stories_collection.insert_one(story_obj.dict())
        return story_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating story: {str(e)}")


@router.put("/{story_id}", response_model=FeaturedStory)
async def update_story(story_id: str, story_update: FeaturedStoryCreate):
    """Update an existing story"""
    try:
        existing_story = await featured_stories_collection.find_one({"id": story_id})
        if not existing_story:
            raise HTTPException(status_code=404, detail="Story not found")
        
        update_dict = story_update.dict()
        update_dict["updated_at"] = datetime.utcnow()
        
        await featured_stories_collection.update_one(
            {"id": story_id},
            {"$set": update_dict}
        )
        
        updated_story = await featured_stories_collection.find_one({"id": story_id})
        return FeaturedStory(**updated_story)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating story: {str(e)}")


@router.delete("/{story_id}", response_model=ApiResponse)
async def delete_story(story_id: str):
    """Delete a story"""
    try:
        result = await featured_stories_collection.delete_one({"id": story_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Story not found")
        
        return ApiResponse(message="Story deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting story: {str(e)}")