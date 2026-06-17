from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional
from backend.database import get_db
from backend.models import Department, User, Role
from backend.security import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/hrms/departments", tags=["hrms"])

class DepartmentCreate(BaseModel):
    name: str
    code: str
    head_of_department_id: Optional[int] = None

@router.get("/")
async def list_departments(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    departments = db.query(Department).all()
    result = []
    for d in departments:
        count = db.query(User).filter(User.department_id == d.id, User.is_active == True).count()
        result.append({**{c.name: getattr(d, c.name) for c in d.__table__.columns}, "employee_count": count})
    return result

@router.post("/", status_code=201)
async def create_department(data: DepartmentCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role not in (Role.ADMIN, Role.HR):
        raise HTTPException(status_code=403, detail="Not authorized")
    if db.query(Department).filter(Department.code == data.code).first():
        raise HTTPException(status_code=400, detail="Code already exists")
    dept = Department(**data.dict(), created_at=datetime.utcnow())
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return dept

@router.put("/{dept_id}")
async def update_department(dept_id: int, data: DepartmentCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    dept = db.query(Department).filter(Department.id == dept_id).first()
    if not dept:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(dept, k, v)
    db.commit()
    return dept
