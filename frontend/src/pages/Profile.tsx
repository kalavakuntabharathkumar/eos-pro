import { useAuth } from '../context/AuthContext';
export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="space-y-4"><h1 className="text-xl font-bold text-slate-900">My Profile</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-bold">{user?.full_name?.[0]}</div>
          <div><h2 className="text-lg font-semibold text-slate-900">{user?.full_name}</h2><p className="text-slate-500 text-sm">{user?.email}</p></div>
        </div>
      </div>
    </div>
  );
}
