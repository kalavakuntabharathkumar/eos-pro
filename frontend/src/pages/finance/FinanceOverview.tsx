import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function FinanceOverview() {
  const { data: invData } = useQuery({ queryKey: ['invoices'], queryFn: () => axios.get('/api/finance/invoices').then(r => r.data) });
  const { data: expData } = useQuery({ queryKey: ['expenses'], queryFn: () => axios.get('/api/finance/expenses').then(r => r.data) });
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-900">Finance Overview</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5"><p className="text-xs text-slate-500 uppercase">Revenue Collected</p><p className="text-3xl font-bold text-emerald-600 mt-2">${((invData as any)?.total_paid||0).toLocaleString()}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-5"><p className="text-xs text-slate-500 uppercase">Pending Invoices</p><p className="text-3xl font-bold text-amber-600 mt-2">${((invData as any)?.total_pending||0).toLocaleString()}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-5"><p className="text-xs text-slate-500 uppercase">Total Expenses</p><p className="text-3xl font-bold text-red-600 mt-2">${((expData as any)?.total||0).toLocaleString()}</p></div>
      </div>
    </div>
  );
}
