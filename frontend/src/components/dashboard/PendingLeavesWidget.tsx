import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function PendingLeavesWidget() {
  const qc = useQueryClient();
  const { data: leaves = [] } = useQuery({
    queryKey: ['leaves', 'pending'],
    queryFn: () => axios.get('/api/hrms/leaves').then(r => r.data.filter((l: any) => l.status === 'pending')),
  });
  const approve = useMutation({ mutationFn: (id: number) => axios.patch(`/api/hrms/leaves/${id}/approve`), onSuccess: () => qc.invalidateQueries({ queryKey: ['leaves'] }) });
  const reject = useMutation({ mutationFn: (id: number) => axios.patch(`/api/hrms/leaves/${id}/reject`), onSuccess: () => qc.invalidateQueries({ queryKey: ['leaves'] }) });
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h2 className="text-sm font-semibold text-slate-700 mb-4">Pending Leave Requests</h2>
      {(leaves as any[]).length === 0 ? <p className="text-sm text-slate-400 text-center py-6">No pending requests</p> : (
        <div className="space-y-3">
          {(leaves as any[]).slice(0, 5).map((leave: any) => (
            <div key={leave.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-slate-800">Leave #{leave.id}</p>
                <p className="text-xs text-slate-500">{leave.leave_type}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => approve.mutate(leave.id)} className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Approve</button>
                <button onClick={() => reject.mutate(leave.id)} className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
