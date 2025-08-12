from fastapi import APIRouter, HTTPException
from typing import List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from models import NewsletterSubscriber, NewsletterSubscriberCreate, ApiResponse
from database import newsletter_subscribers_collection
import re

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])


def is_valid_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


@router.post("/subscribe", response_model=ApiResponse)
async def subscribe_to_newsletter(subscriber: NewsletterSubscriberCreate):
    """Subscribe to newsletter"""
    try:
        # Validate email format
        if not is_valid_email(subscriber.email):
            raise HTTPException(status_code=400, detail="Invalid email format")
        
        # Check if email already exists
        existing_subscriber = await newsletter_subscribers_collection.find_one(
            {"email": subscriber.email.lower()}
        )
        
        if existing_subscriber:
            if existing_subscriber.get("is_active", True):
                return ApiResponse(
                    message="Email already subscribed to newsletter",
                    success=True
                )
            else:
                # Reactivate subscription
                await newsletter_subscribers_collection.update_one(
                    {"email": subscriber.email.lower()},
                    {"$set": {"is_active": True}}
                )
                return ApiResponse(
                    message="Newsletter subscription reactivated successfully",
                    success=True
                )
        
        # Create new subscription
        subscriber_obj = NewsletterSubscriber(email=subscriber.email.lower())
        await newsletter_subscribers_collection.insert_one(subscriber_obj.dict())
        
        return ApiResponse(
            message="Successfully subscribed to newsletter",
            success=True
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error subscribing to newsletter: {str(e)}")


@router.post("/unsubscribe", response_model=ApiResponse)
async def unsubscribe_from_newsletter(subscriber: NewsletterSubscriberCreate):
    """Unsubscribe from newsletter"""
    try:
        result = await newsletter_subscribers_collection.update_one(
            {"email": subscriber.email.lower()},
            {"$set": {"is_active": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Email not found in newsletter subscriptions")
        
        return ApiResponse(
            message="Successfully unsubscribed from newsletter",
            success=True
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error unsubscribing from newsletter: {str(e)}")


@router.get("/subscribers", response_model=List[NewsletterSubscriber])
async def get_newsletter_subscribers():
    """Get all active newsletter subscribers (admin only)"""
    try:
        cursor = newsletter_subscribers_collection.find(
            {"is_active": True}
        ).sort("subscribed_at", -1)
        
        subscribers = await cursor.to_list(length=None)
        return [NewsletterSubscriber(**subscriber) for subscriber in subscribers]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching newsletter subscribers: {str(e)}")


@router.get("/subscribers/count", response_model=dict)
async def get_subscriber_count():
    """Get count of active subscribers"""
    try:
        count = await newsletter_subscribers_collection.count_documents({"is_active": True})
        return {"active_subscribers": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting subscriber count: {str(e)}")