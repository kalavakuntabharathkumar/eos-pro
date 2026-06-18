from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel

class TriggerType(str, Enum):
    LEAVE_APPROVED = "leave_approved"
    EMPLOYEE_CREATED = "employee_created"
    INVOICE_PAID = "invoice_paid"
    EXPENSE_APPROVED = "expense_approved"
    TICKET_CREATED = "ticket_created"

class WorkflowStep(BaseModel):
    step_id: str
    action: str
    params: Dict[str, Any]
    condition: Optional[str] = None

class WorkflowDefinition(BaseModel):
    name: str
    trigger: TriggerType
    steps: List[WorkflowStep]
    is_active: bool = True

class WorkflowEngine:
    _instance = None
    _workflows: Dict[str, WorkflowDefinition] = {}

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def register(self, workflow_id: str, definition: WorkflowDefinition):
        self._workflows[workflow_id] = definition

    def get_workflows_for_trigger(self, trigger: TriggerType) -> List[WorkflowDefinition]:
        return [w for w in self._workflows.values() if w.trigger == trigger and w.is_active]

    def fire_trigger(self, trigger: TriggerType, context: Dict[str, Any]):
        from backend.workflows.runner import run_workflow
        return [run_workflow(wf, context) for wf in self.get_workflows_for_trigger(trigger)]
