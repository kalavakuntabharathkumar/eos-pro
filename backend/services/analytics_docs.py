from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.models import Document
from datetime import datetime, timedelta

def get_upload_stats(db: Session, days: int = 30):
    since = datetime.utcnow() - timedelta(days=days)
    total = db.query(Document).count()
    recent = db.query(Document).filter(Document.created_at >= since).count()
    total_size = db.query(func.sum(Document.file_size)).scalar() or 0
    return {"total_documents": total, "recent_uploads": recent, "total_size_bytes": int(total_size)}

def get_documents_by_type(db: Session):
    results = db.query(Document.file_type, func.count(Document.id).label("count")).group_by(Document.file_type).all()
    return [{"type": r.file_type, "count": r.count} for r in results]

def get_upload_trend(db: Session, days: int = 14):
    since = datetime.utcnow() - timedelta(days=days)
    results = db.query(func.date(Document.created_at).label("date"), func.count(Document.id).label("count")).filter(Document.created_at >= since).group_by(func.date(Document.created_at)).all()
    return [{"date": str(r.date), "count": r.count} for r in results]
