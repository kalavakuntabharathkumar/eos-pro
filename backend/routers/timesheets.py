from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional
from backend.database import get_db
from backend.models import Timesheet, User
from backend.security import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/projects/timesheets", tags=["projects"])

class TimesheetCreate(BaseModel):
    task_id: int
    hours: float
    date: str
    description: Optional[str] = None

@router.get("/")
async def list_timesheets(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Timesheet).filter(Timesheet.employee_id == current_user.id).all()

@router.post("/", status_code=201)
async def log_time(data: TimesheetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    entry = Timesheet(employee_id=current_user.id, task_id=data.task_id,
        hours=data.hours, date=datetime.fromisoformat(data.date),
        description=data.description, created_at=datetime.utcnow())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@router.get("/summary")
async def timesheet_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    entries = db.query(Timesheet).filter(Timesheet.employee_id == current_user.id).all()
    return {"total_hours": sum(e.hours for e in entries), "entries": len(entries)}
