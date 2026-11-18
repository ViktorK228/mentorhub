import { MAX_TAGS, TAGS } from '../data'
import { Card, Heading, LinkButton } from './ui'

export default function MentorFilter({ selected, setSelected, mode, setMode }) {
  const toggleTag = (t) => setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : s.length < MAX_TAGS ? [...s, t] : s))
  return (
    <Card>
      <Heading title="Знайти ментора" sub="Смарт-фільтр за навичками" />
      <h2 className="mb-3 text-xl font-bold">Навички</h2>
      <div className="flex flex-wrap gap-2">
        {TAGS.map((t) => {
          const on = selected.includes(t)
          return (
            <button key={t} onClick={() => toggleTag(t)} disabled={!on && selected.length >= MAX_TAGS}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${on ? 'border-btn bg-btn text-on-btn' : 'border-field text-ink hover:border-btn'}`}>
              {on && <span>✓</span>}{t}
            </button>
          )
        })}
      </div>

      <p className="mb-2 mt-5 text-sm text-muted">Режим збігу</p>
      <div className="grid grid-cols-2 gap-1 rounded-xl border border-line p-1 text-sm" role="radiogroup">
        {[['any', 'Будь-який тег'], ['all', 'Усі теги']].map(([k, l]) => (
          <button key={k} role="radio" aria-checked={mode === k} onClick={() => setMode(k)}
            className={`rounded-lg py-2 font-semibold transition ${mode === k ? 'bg-btn text-on-btn' : 'text-muted hover:text-ink'}`}>{l}</button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">
        Можна вибрати від 1 до {MAX_TAGS} тегів. {mode === 'all' ? 'Показуємо менторів, які мають усі обрані навички.' : 'Показуємо менторів, які мають хоча б один.'}
      </p>
      <LinkButton onClick={() => setSelected([])} disabled={!selected.length} className="mt-4">Скинути фільтри</LinkButton>
    </Card>
  )
}
