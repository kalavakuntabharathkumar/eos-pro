import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const STAGES = ['prospecting','qualification','proposal','negotiation','closed_won','closed_lost'];

export default function Deals() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['crm-deals'], queryFn: () => axios.get('/api/crm/deals').then(r => r.data) });
  const deals: any[] = (data as any)?.deals || [];
  const stageTotals = (data as any)?.stage_totals || {};
  const pipeline = (data as any)?.total_pipeline || 0;
  const updateStage = useMutation({ mutationFn: ({id,stage}: {id:number;stage:string}) => axios.patch(`/api/crm/deals/${id}/stage?stage=${stage}`), onSuccess: () => qc.invalidateQueries({ queryKey: ['crm-deals'] }) });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold text-slate-900">Deals</h1><div className="text-sm font-medium text-indigo-600">Pipeline: ${pipeline.toLocaleString()}</div></div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {STAGES.map(s => <div key={s} className="shrink-0 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-center text-xs"><div className="capitalize font-medium text-slate-700">{s.replace('_',' ')}</div><div className="text-indigo-600 font-semibold">${(stageTotals[s]||0).toLocaleString()}</div></div>)}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200"><tr>{['Title','Value','Stage','Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {deals.map((deal: any) => (
              <tr key={deal.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{deal.title}</td>
                <td className="px-4 py-3 text-indigo-600 font-medium">${deal.value?.toLocaleString()}</td>
                <td className="px-4 py-3 capitalize text-slate-600">{deal.stage?.replace('_',' ')}</td>
                <td className="px-4 py-3"><select className="text-xs border border-slate-200 rounded px-2 py-1" value={deal.stage} onChange={e => updateStage.mutate({id:deal.id,stage:e.target.value})}>{STAGES.map(s => <option key={s} value={s}>{s.replace('_',' ')}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
