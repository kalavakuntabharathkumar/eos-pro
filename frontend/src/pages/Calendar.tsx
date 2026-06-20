export default function Calendar() {
  return (
    <div className="space-y-4"><h1 className="text-xl font-bold text-slate-900">Calendar</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="grid grid-cols-7 gap-1 text-xs text-center text-slate-400 mb-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="font-medium py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({length:30},(_,i)=>i+1).map(d => (
            <div key={d} className={`h-10 rounded-lg flex items-center justify-center text-sm cursor-pointer ${d===21?'bg-indigo-600 text-white font-bold':'hover:bg-slate-50 text-slate-700'}`}>{d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
