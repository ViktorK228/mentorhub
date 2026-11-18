import { initials } from '../utils'

export default function MentorCard({ m, selected, highlight, onClick, delay }) {
  const matched = m.tags.filter((t) => selected.includes(t))
  const other = m.tags.filter((t) => !selected.includes(t))
  return (
    <div onClick={onClick} style={delay != null ? { animationDelay: `${delay}ms` } : undefined}
      className={`flex gap-4 rounded-2xl border-2 bg-surface p-5 transition duration-200 ${delay != null ? 'animate-fade-up' : ''} ${highlight ? 'border-accent-2' : 'border-line'} ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-btn' : ''} ${onClick && !highlight ? 'hover:border-field' : ''}`}>
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-btn text-lg font-bold text-on-btn">{initials(m.name)}</div>
      <div className="min-w-0 flex-1 text-sm">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold">{m.name}</h3>
          <span className="shrink-0 text-warning">★ <span className="text-muted">{m.rating.toFixed(1)}</span></span>
        </div>
        <p className="text-muted">{m.role}</p>
        {selected.length > 0
          ? <p className="mt-1">Збіг: {matched.join(', ')} · {matched.length} з {selected.length}</p>
          : <p className="mt-1">Навички: {m.tags.join(', ')}</p>}
        {selected.length > 0 && other.length > 0 && <p className="mt-0.5 text-muted">Також: {other.join(', ')}</p>}
      </div>
    </div>
  )
}
