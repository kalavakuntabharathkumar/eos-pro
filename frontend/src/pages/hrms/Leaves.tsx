import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function Leaves() {
  const qc = useQueryClient();
  const { data: leaves = [] } = useQuery({ queryKey: ['leaves'], queryFn: () => axios.get('/api/hrms/leaves').then(r => r.data) });
  const approve = useMutation({ mutationFn: (id: number) => axios.patch(`/api/hrms/leaves/${id}/approve`), onSuccess: () => qc.invalidateQueries({ queryKey: ['leaves'] }) });
  const reject = useMutation({ mutationFn: (id: number) => axios.patch(`/api/hrms/leaves/${id}/reject`), onSuccess: () => qc.invalidateQueries({ queryKey: ['leaves'] }) });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Leave Management</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200"><tr>{['#','Type','Reason','Status','Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {(leaves as any[]).map((l: any) => (
              <tr key={l.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-400">{l.id}</td>
                <td className="px-4 py-3 font-medium">{l.leave_type}</td>
                <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{l.reason}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${l.status==='approved'?'bg-emerald-100 text-emerald-700':l.status==='rejected'?'bg-red-100 text-red-700':'bg-amber-100 text-amber-700'}`}>{l.status}</span></td>
                <td className="px-4 py-3">{l.status === 'pending' && <div className="flex gap-2"><button onClick={() => approve.mutate(l.id)} className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">Approve</button><button onClick={() => reject.mutate(l.id)} className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">Reject</button></div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
