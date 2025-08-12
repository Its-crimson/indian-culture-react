from fastapi import APIRouter, HTTPException
from typing import List
from models import CulturalCategory, CulturalCategoryCreate, ApiResponse
from database import cultural_categories_collection
from datetime import datetime

router = APIRouter(prefix="/cultural-categories", tags=["Cultural Categories"])


@router.get("/", response_model=List[CulturalCategory])
async def get_cultural_categories():
    """Get all cultural categories sorted by sort_order"""
    try:
        cursor = cultural_categories_collection.find({}).sort("sort_order", 1)
        categories = await cursor.to_list(length=None)
        return [CulturalCategory(**category) for category in categories]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching cultural categories: {str(e)}")


@router.get("/featured", response_model=List[CulturalCategory])
async def get_featured_cultural_categories():
    """Get only featured cultural categories"""
    try:
        cursor = cultural_categories_collection.find(
            {"is_featured": True}
        ).sort("sort_order", 1)
        
        categories = await cursor.to_list(length=None)
        return [CulturalCategory(**category) for category in categories]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching featured categories: {str(e)}")


@router.get("/{category_id}", response_model=CulturalCategory)
async def get_cultural_category(category_id: str):
    """Get a specific cultural category by ID"""
    try:
        category = await cultural_categories_collection.find_one({"id": category_id})
        if not category:
            raise HTTPException(status_code=404, detail="Cultural category not found")
        return CulturalCategory(**category)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching cultural category: {str(e)}")


@router.post("/", response_model=CulturalCategory)
async def create_cultural_category(category: CulturalCategoryCreate):
    """Create a new cultural category"""
    try:
        category_dict = category.dict()
        category_obj = CulturalCategory(**category_dict)
        
        await cultural_categories_collection.insert_one(category_obj.dict())
        return category_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating cultural category: {str(e)}")


@router.put("/{category_id}", response_model=CulturalCategory)
async def update_cultural_category(category_id: str, category_update: CulturalCategoryCreate):
    """Update an existing cultural category"""
    try:
        existing_category = await cultural_categories_collection.find_one({"id": category_id})
        if not existing_category:
            raise HTTPException(status_code=404, detail="Cultural category not found")
        
        update_dict = category_update.dict()
        update_dict["updated_at"] = datetime.utcnow()
        
        await cultural_categories_collection.update_one(
            {"id": category_id},
            {"$set": update_dict}
        )
        
        updated_category = await cultural_categories_collection.find_one({"id": category_id})
        return CulturalCategory(**updated_category)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating cultural category: {str(e)}")


@router.delete("/{category_id}", response_model=ApiResponse)
async def delete_cultural_category(category_id: str):
    """Delete a cultural category"""
    try:
        result = await cultural_categories_collection.delete_one({"id": category_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Cultural category not found")
        
        return ApiResponse(message="Cultural category deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting cultural category: {str(e)}")