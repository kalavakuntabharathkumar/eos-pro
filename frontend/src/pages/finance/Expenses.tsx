import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function Expenses() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:'', amount:'', category:'Travel' });
  const { data } = useQuery({ queryKey: ['expenses'], queryFn: () => axios.get('/api/finance/expenses').then(r => r.data) });
  const expenses: any[] = (data as any)?.expenses || [];
  const catTotals = (data as any)?.category_totals || {};
  const submit = useMutation({ mutationFn: (d: any) => axios.post('/api/finance/expenses', d), onSuccess: () => { qc.invalidateQueries({ queryKey: ['expenses'] }); setShowForm(false); } });
  const approve = useMutation({ mutationFn: (id: number) => axios.patch(`/api/finance/expenses/${id}/approve`), onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] }) });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold text-slate-900">Expenses</h1><button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">New Expense</button></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(catTotals).map(([cat,total]) => <div key={cat} className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">{cat}</p><p className="text-lg font-bold text-slate-900 mt-1">${(total as number).toLocaleString()}</p></div>)}
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Title</label><input className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Amount ($)</label><input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={form.amount} onChange={e => setForm(f=>({...f,amount:e.target.value}))} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Category</label><select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}>{['Travel','Food','Office','Software','Training','Other'].map(c => <option key={c}>{c}</option>)}</select></div>
          </div>
          <button onClick={() => submit.mutate({...form,amount:parseFloat(form.amount)})} disabled={submit.isPending} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">{submit.isPending?'Submitting...':'Submit'}</button>
        </div>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200"><tr>{['Title','Category','Amount','Status',user?.role!=='employee'?'Action':''].filter(Boolean).map(h => <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((e: any) => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{e.title}</td>
                <td className="px-4 py-3 text-slate-500">{e.category}</td>
                <td className="px-4 py-3 font-semibold">${e.amount?.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${e.status==='approved'?'bg-emerald-100 text-emerald-700':e.status==='rejected'?'bg-red-100 text-red-700':'bg-amber-100 text-amber-700'}`}>{e.status}</span></td>
                {user?.role !== 'employee' && <td className="px-4 py-3">{e.status==='pending'&&<button onClick={() => approve.mutate(e.id)} className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">Approve</button>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
