export default function Announcements() {
  const ITEMS = [
    { id:1, title:'Q2 All-Hands Meeting', content:'Join us on June 30 for our quarterly all-hands.', date:'2026-06-18', priority:'high' },
    { id:2, title:'Office Closure Notice', content:'The office will be closed on June 21 for team building.', date:'2026-06-15', priority:'medium' },
    { id:3, title:'New Leave Policy', content:'Updated leave policy effective July 1. Please review.', date:'2026-06-10', priority:'low' },
  ];
  return (
    <div className="space-y-4"><h1 className="text-xl font-bold text-slate-900">Announcements</h1>
      <div className="space-y-3">
        {ITEMS.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-slate-800">{a.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${a.priority==='high'?'bg-red-100 text-red-700':a.priority==='medium'?'bg-amber-100 text-amber-700':'bg-slate-100 text-slate-600'}`}>{a.priority}</span>
            </div>
            <p className="text-sm text-slate-600">{a.content}</p>
            <p className="text-xs text-slate-400 mt-2">{a.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
