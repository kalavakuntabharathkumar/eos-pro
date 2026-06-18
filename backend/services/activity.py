from sqlalchemy.orm import Session
from datetime import datetime
from backend.models import ActivityLog

def log_activity(db: Session, user_id: int, action: str, resource: str, resource_id: int = None, details: str = None):
    entry = ActivityLog(user_id=user_id, action=action, resource=resource,
        resource_id=resource_id, details=details, created_at=datetime.utcnow())
    db.add(entry)
    db.commit()
    return entry

def get_user_activity(db: Session, user_id: int, limit: int = 50):
    return db.query(ActivityLog).filter(ActivityLog.user_id == user_id).order_by(ActivityLog.created_at.desc()).limit(limit).all()

def get_recent_activity(db: Session, limit: int = 100):
    return db.query(ActivityLog).order_by(ActivityLog.created_at.desc()).limit(limit).all()
