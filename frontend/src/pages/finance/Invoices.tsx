import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function Invoices() {
  const [filter, setFilter] = useState('');
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['invoices', filter], queryFn: () => axios.get('/api/finance/invoices', { params: filter ? { status: filter } : {} }).then(r => r.data) });
  const invoices: any[] = (data as any)?.invoices || [];
  const updateStatus = useMutation({ mutationFn: ({id,status}: {id:number;status:string}) => axios.patch(`/api/finance/invoices/${id}/status?status=${status}`), onSuccess: () => qc.invalidateQueries({ queryKey: ['invoices'] }) });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Invoices</h1>
        <div className="flex gap-3 text-sm"><span className="text-emerald-600 font-medium">Paid: ${((data as any)?.total_paid||0).toLocaleString()}</span><span className="text-amber-600 font-medium">Pending: ${((data as any)?.total_pending||0).toLocaleString()}</span></div>
      </div>
      <div className="flex gap-2">{['','draft','sent','paid','overdue'].map(s => <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${filter===s?'bg-indigo-600 text-white':'bg-white border border-slate-200 text-slate-600'}`}>{s||'All'}</button>)}</div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200"><tr>{['Invoice #','Client','Amount','Status','Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv: any) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{inv.invoice_number}</td>
                <td className="px-4 py-3 text-slate-600">{inv.client_name}</td>
                <td className="px-4 py-3 font-semibold">${inv.amount?.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${inv.status==='paid'?'bg-emerald-100 text-emerald-700':inv.status==='sent'?'bg-blue-100 text-blue-700':'bg-slate-100 text-slate-600'}`}>{inv.status}</span></td>
                <td className="px-4 py-3"><select className="text-xs border border-slate-200 rounded px-2 py-1" value={inv.status} onChange={e => updateStatus.mutate({id:inv.id,status:e.target.value})}>{['draft','sent','paid','overdue'].map(s => <option key={s} value={s}>{s}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
