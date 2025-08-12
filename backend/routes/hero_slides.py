from fastapi import APIRouter, HTTPException
from typing import List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from models import HeroSlide, HeroSlideCreate, ApiResponse
from database import hero_slides_collection
from datetime import datetime

router = APIRouter(prefix="/hero-slides", tags=["Hero Slides"])


@router.get("/", response_model=List[HeroSlide])
async def get_hero_slides():
    """Get all active hero slides sorted by sort_order"""
    try:
        cursor = hero_slides_collection.find(
            {"is_active": True}
        ).sort("sort_order", 1)
        
        slides = await cursor.to_list(length=None)
        return [HeroSlide(**slide) for slide in slides]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching hero slides: {str(e)}")


@router.get("/{slide_id}", response_model=HeroSlide)
async def get_hero_slide(slide_id: str):
    """Get a specific hero slide by ID"""
    try:
        slide = await hero_slides_collection.find_one({"id": slide_id})
        if not slide:
            raise HTTPException(status_code=404, detail="Hero slide not found")
        return HeroSlide(**slide)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching hero slide: {str(e)}")


@router.post("/", response_model=HeroSlide)
async def create_hero_slide(slide: HeroSlideCreate):
    """Create a new hero slide"""
    try:
        slide_dict = slide.dict()
        slide_obj = HeroSlide(**slide_dict)
        
        await hero_slides_collection.insert_one(slide_obj.dict())
        return slide_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating hero slide: {str(e)}")


@router.put("/{slide_id}", response_model=HeroSlide)
async def update_hero_slide(slide_id: str, slide_update: HeroSlideCreate):
    """Update an existing hero slide"""
    try:
        existing_slide = await hero_slides_collection.find_one({"id": slide_id})
        if not existing_slide:
            raise HTTPException(status_code=404, detail="Hero slide not found")
        
        update_dict = slide_update.dict()
        update_dict["updated_at"] = datetime.utcnow()
        
        await hero_slides_collection.update_one(
            {"id": slide_id},
            {"$set": update_dict}
        )
        
        updated_slide = await hero_slides_collection.find_one({"id": slide_id})
        return HeroSlide(**updated_slide)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating hero slide: {str(e)}")


@router.delete("/{slide_id}", response_model=ApiResponse)
async def delete_hero_slide(slide_id: str):
    """Delete a hero slide"""
    try:
        result = await hero_slides_collection.delete_one({"id": slide_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Hero slide not found")
        
        return ApiResponse(message="Hero slide deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting hero slide: {str(e)}")