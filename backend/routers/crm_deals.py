from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional
from backend.database import get_db
from backend.models import CRMDeal, User
from backend.security import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/crm/deals", tags=["crm"])
STAGES = ["prospecting","qualification","proposal","negotiation","closed_won","closed_lost"]

class DealCreate(BaseModel):
    title: str; value: float; stage: str = "prospecting"; contact_id: int
    assigned_to: Optional[int] = None; close_date: Optional[str] = None

@router.get("/")
async def list_deals(stage: Optional[str] = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    q = db.query(CRMDeal)
    if stage: q = q.filter(CRMDeal.stage == stage)
    deals = q.order_by(CRMDeal.created_at.desc()).all()
    stage_totals = {}
    for d in deals: stage_totals[d.stage] = stage_totals.get(d.stage, 0) + d.value
    return {"deals": [{c.name: getattr(d, c.name) for c in d.__table__.columns} for d in deals], "stage_totals": stage_totals, "total_pipeline": sum(stage_totals.values())}

@router.post("/", status_code=201)
async def create_deal(data: DealCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deal = CRMDeal(**{k:v for k,v in data.dict().items() if k!='close_date'}, created_at=datetime.utcnow())
    db.add(deal); db.commit(); db.refresh(deal); return deal

@router.patch("/{deal_id}/stage")
async def update_stage(deal_id: int, stage: str = Query(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if stage not in STAGES: raise HTTPException(status_code=400, detail=f"Invalid stage")
    deal = db.query(CRMDeal).filter(CRMDeal.id == deal_id).first()
    if not deal: raise HTTPException(status_code=404, detail="Not found")
    deal.stage = stage; db.commit(); return deal
