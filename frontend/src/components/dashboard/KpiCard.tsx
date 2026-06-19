import clsx from 'clsx';

interface Props { label: string; value: string | number; trend?: number; icon: string; loading?: boolean; }

export default function KpiCard({ label, value, trend, icon, loading }: Props) {
  const trendPositive = (trend ?? 0) >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
        <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">
          {icon[0].toUpperCase()}
        </div>
      </div>
      {loading ? <div className="h-8 w-24 rounded bg-slate-100 animate-pulse" /> : <p className="text-3xl font-bold text-slate-900">{value}</p>}
      {trend !== undefined && (
        <div className={clsx('flex items-center gap-1 text-xs font-medium', trendPositive ? 'text-emerald-600' : 'text-red-500')}>
          <span>{trendPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend)} vs last month</span>
        </div>
      )}
    </div>
  );
}
