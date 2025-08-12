from fastapi import APIRouter, HTTPException
from typing import List
from models import RegionalHighlight, RegionalHighlightCreate, ApiResponse
from database import regional_highlights_collection
from datetime import datetime

router = APIRouter(prefix="/regional-highlights", tags=["Regional Highlights"])


@router.get("/", response_model=List[RegionalHighlight])
async def get_regional_highlights():
    """Get all active regional highlights sorted by sort_order"""
    try:
        cursor = regional_highlights_collection.find(
            {"is_active": True}
        ).sort("sort_order", 1)
        
        highlights = await cursor.to_list(length=None)
        return [RegionalHighlight(**highlight) for highlight in highlights]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching regional highlights: {str(e)}")


@router.get("/{highlight_id}", response_model=RegionalHighlight)
async def get_regional_highlight(highlight_id: str):
    """Get a specific regional highlight by ID"""
    try:
        highlight = await regional_highlights_collection.find_one({"id": highlight_id})
        if not highlight:
            raise HTTPException(status_code=404, detail="Regional highlight not found")
        return RegionalHighlight(**highlight)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching regional highlight: {str(e)}")


@router.post("/", response_model=RegionalHighlight)
async def create_regional_highlight(highlight: RegionalHighlightCreate):
    """Create a new regional highlight"""
    try:
        highlight_dict = highlight.dict()
        highlight_obj = RegionalHighlight(**highlight_dict)
        
        await regional_highlights_collection.insert_one(highlight_obj.dict())
        return highlight_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating regional highlight: {str(e)}")


@router.put("/{highlight_id}", response_model=RegionalHighlight)
async def update_regional_highlight(highlight_id: str, highlight_update: RegionalHighlightCreate):
    """Update an existing regional highlight"""
    try:
        existing_highlight = await regional_highlights_collection.find_one({"id": highlight_id})
        if not existing_highlight:
            raise HTTPException(status_code=404, detail="Regional highlight not found")
        
        update_dict = highlight_update.dict()
        update_dict["updated_at"] = datetime.utcnow()
        
        await regional_highlights_collection.update_one(
            {"id": highlight_id},
            {"$set": update_dict}
        )
        
        updated_highlight = await regional_highlights_collection.find_one({"id": highlight_id})
        return RegionalHighlight(**updated_highlight)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating regional highlight: {str(e)}")


@router.delete("/{highlight_id}", response_model=ApiResponse)
async def delete_regional_highlight(highlight_id: str):
    """Delete a regional highlight"""
    try:
        result = await regional_highlights_collection.delete_one({"id": highlight_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Regional highlight not found")
        
        return ApiResponse(message="Regional highlight deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting regional highlight: {str(e)}")