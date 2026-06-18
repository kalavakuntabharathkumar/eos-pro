from sqlalchemy.orm import Session
from datetime import datetime
from backend.models import Notification

def create_notification(db: Session, user_id: int, title: str, message: str, notification_type: str = "info"):
    n = Notification(user_id=user_id, title=title, message=message,
        is_read=False, notification_type=notification_type, created_at=datetime.utcnow())
    db.add(n)
    db.commit()
    db.refresh(n)
    return n

def get_unread_count(db: Session, user_id: int) -> int:
    return db.query(Notification).filter(Notification.user_id == user_id, Notification.is_read == False).count()

def mark_as_read(db: Session, notification_id: int, user_id: int) -> bool:
    n = db.query(Notification).filter(Notification.id == notification_id, Notification.user_id == user_id).first()
    if not n:
        return False
    n.is_read = True
    db.commit()
    return True

def mark_all_read(db: Session, user_id: int):
    db.query(Notification).filter(Notification.user_id == user_id, Notification.is_read == False).update({"is_read": True})
    db.commit()

def get_notifications(db: Session, user_id: int, limit: int = 20):
    return db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.created_at.desc()).limit(limit).all()
