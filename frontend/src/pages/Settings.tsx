export default function Settings() {
  return (
    <div className="space-y-4"><h1 className="text-xl font-bold text-slate-900">Settings</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Preferences</h2>
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between"><span>Email Notifications</span><input type="checkbox" defaultChecked /></div>
          <div className="flex items-center justify-between"><span>Dark Mode</span><input type="checkbox" /></div>
        </div>
      </div>
    </div>
  );
}
