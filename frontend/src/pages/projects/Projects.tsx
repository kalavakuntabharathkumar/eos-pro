import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Projects() {
  const { data: projects = [] } = useQuery({ queryKey: ['projects'], queryFn: () => axios.get('/api/projects').then(r => r.data) });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Projects</h1>
      <div className="grid gap-4">
        {(projects as any[]).map((p: any) => (
          <Link to={`/projects/${p.id}`} key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm block">
            <div className="flex items-center justify-between">
              <div><h3 className="font-semibold text-slate-900">{p.name}</h3><p className="text-xs text-slate-500 mt-1">{p.description}</p></div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{p.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
