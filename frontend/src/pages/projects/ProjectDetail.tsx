import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<'tasks' | 'milestones'>('tasks');
  const { data: tasks = [] } = useQuery({ queryKey: ['tasks', id], queryFn: () => axios.get(`/api/projects/${id}/tasks`).then(r => r.data), enabled: tab === 'tasks' });
  const { data: milestones = [] } = useQuery({ queryKey: ['milestones', id], queryFn: () => axios.get(`/api/projects/${id}/milestones`).then(r => r.data), enabled: tab === 'milestones' });
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-900">Project #{id}</h1>
      <div className="flex gap-2 border-b border-slate-200">
        {(['tasks','milestones'] as const).map(t => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 ${tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>{t}</button>)}
      </div>
      {tab === 'tasks' && (
        <div className="space-y-2">
          {(tasks as any[]).map((t: any) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800">{t.title}</p>
              <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${t.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{t.priority}</span>
            </div>
          ))}
          {!(tasks as any[]).length && <p className="text-sm text-slate-400 text-center py-8">No tasks yet</p>}
        </div>
      )}
      {tab === 'milestones' && (
        <div className="space-y-2">
          {(milestones as any[]).map((m: any) => (
            <div key={m.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-medium">{m.title}</p>
              <p className="text-xs text-slate-400 mt-1">Due: {m.due_date ? new Date(m.due_date).toLocaleDateString() : '—'}</p>
            </div>
          ))}
          {!(milestones as any[]).length && <p className="text-sm text-slate-400 text-center py-8">No milestones yet</p>}
        </div>
      )}
    </div>
  );
}
