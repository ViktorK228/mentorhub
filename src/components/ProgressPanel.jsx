import { LEVELS, TOTAL, XP_PER_ITEM } from '../data'
import { levelOf } from '../utils'

export default function ProgressPanel({ doneCount }) {
  const xp = doneCount * XP_PER_ITEM
  const li = levelOf(xp)
  const pct = Math.round((doneCount / TOTAL) * 100)
  const next = LEVELS[li + 1]
  return (
    <div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-bold">Рівень {li + 1} · {LEVELS[li].name}</span>
        <span className="text-2xl font-bold">{pct}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-accent-2 transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }}>
          <div className="animate-grow h-full w-full rounded-full bg-gradient-to-r from-accent-2 to-accent-2/70" />
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">
        {doneCount} з {TOTAL} кроків виконано · <span className="font-semibold text-accent-ink">{xp} XP</span>
        {next && <span className="text-muted"> · до «{next.name}» {next.min - xp} XP</span>}
      </p>
    </div>
  )
}
