from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.models import Invoice, Expense
from datetime import datetime, timedelta

def get_revenue_summary(db: Session):
    invoices = db.query(Invoice).all()
    return {"total_revenue": sum(i.amount for i in invoices if i.status == "paid"),
            "pending": sum(i.amount for i in invoices if i.status in ("draft","sent")),
            "overdue": sum(i.amount for i in invoices if i.status == "overdue"), "count": len(invoices)}

def get_monthly_revenue(db: Session, months: int = 6):
    now = datetime.utcnow()
    result = []
    for i in range(months - 1, -1, -1):
        target = now - timedelta(days=30 * i)
        start = target.replace(day=1, hour=0, minute=0, second=0)
        end = (start + timedelta(days=32)).replace(day=1)
        revenue = db.query(func.sum(Invoice.amount)).filter(Invoice.status == "paid", Invoice.created_at >= start, Invoice.created_at < end).scalar() or 0
        result.append({"month": target.strftime("%b %Y"), "revenue": float(revenue)})
    return result

def get_expense_by_category(db: Session):
    results = db.query(Expense.category, func.sum(Expense.amount).label("total")).group_by(Expense.category).all()
    return [{"category": r.category, "total": float(r.total or 0)} for r in results]

def get_expense_approval_rate(db: Session):
    total = db.query(Expense).count()
    approved = db.query(Expense).filter(Expense.status == "approved").count()
    return {"total": total, "approved": approved, "rate": round((approved/total*100) if total else 0, 2)}
