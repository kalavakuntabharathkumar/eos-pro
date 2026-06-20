import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export default function Directory() {
  const { data: res = {} } = useQuery({ queryKey: ['employees', 'dir'], queryFn: () => axios.get('/api/hrms/employees').then(r => r.data) });
  const employees: any[] = (res as any).data || [];
  return (
    <div className="space-y-4"><h1 className="text-xl font-bold text-slate-900">Employee Directory</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {employees.map((emp: any) => (
          <div key={emp.id} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg mx-auto">{emp.full_name?.[0]}</div>
            <p className="text-sm font-medium text-slate-800 mt-2">{emp.full_name}</p>
            <p className="text-xs text-slate-400 capitalize">{emp.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
