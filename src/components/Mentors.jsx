import { useMemo, useState } from 'react'
import { MENTORS } from '../data'
import { plural } from '../utils'
import { Button, Card } from './ui'
import MentorFilter from './MentorFilter'
import MentorCard from './MentorCard'

export default function Mentors({ onBook }) {
  const [selected, setSelected] = useState([])
  const [mode, setMode] = useState('any') // any | all

  const list = useMemo(() => MENTORS
    .map((m) => ({ ...m, matches: m.tags.filter((t) => selected.includes(t)).length }))
    .filter((m) => !selected.length || (mode === 'all' ? m.matches === selected.length : m.matches > 0))
    .sort((a, b) => b.matches - a.matches || a.name.localeCompare(b.name, 'uk')), [selected, mode])

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)]">
      <MentorFilter selected={selected} setSelected={setSelected} mode={mode} setMode={setMode} />

      <Card>
        <h2 className="text-2xl font-semibold">Знайдено {list.length} {plural(list.length, 'ментор', 'ментори', 'менторів')}</h2>
        <p className="mb-5 mt-2 text-sm text-muted">Сортування: за кількістю збігів, далі за алфавітом. Натисніть на картку, щоб забронювати 1-on-1.</p>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-line bg-bg px-6 py-8 text-center">
            <h3 className="text-xl font-bold">Менторів не знайдено</h3>
            <p className="mt-2 text-sm text-muted">Жоден ментор не має всіх навичок: {selected.map((t) => `«${t}»`).join(', ')}. Спробуйте інші теги або режим «Будь-який тег».</p>
            <Button onClick={() => setSelected([])} className="mt-4">Скинути фільтри</Button>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {list.map((m, idx) => (
              <MentorCard key={m.id} delay={idx * 60} m={m} selected={selected} highlight={selected.length > 0 && m.matches === selected.length}
                onClick={() => onBook({ ...m, selected })} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
