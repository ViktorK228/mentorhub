import { useState } from 'react'
import { LEVELS, STAGES, TOTAL, XP_PER_ITEM } from '../data'
import { levelOf } from '../utils'
import { Card, Heading, LinkButton, Notice } from './ui'
import ProgressPanel from './ProgressPanel'

export default function Achievements({ done, doneCount, onBack, onReset }) {
  const li = levelOf(doneCount * XP_PER_ITEM)
  const [confirm, setConfirm] = useState(false)
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)]">
      <Card>
        <Heading title="Мої досягнення" sub={`Рівень ${li + 1} · ${LEVELS[li].name}`} back={onBack} />
        <ProgressPanel doneCount={doneCount} />
        {doneCount === TOTAL && <div className="mt-5"><Notice>Онбординг завершено! Вітаємо в команді.</Notice></div>}
        {doneCount > 0 && (confirm
          ? <div className="mt-4 flex flex-wrap items-center gap-1 text-sm"><span className="text-muted">Скинути весь прогрес?</span>
              <LinkButton danger onClick={() => { onReset(); setConfirm(false) }}>Так</LinkButton>
              <LinkButton onClick={() => setConfirm(false)}>Ні</LinkButton></div>
          : <LinkButton danger onClick={() => setConfirm(true)} className="mt-4">Скинути прогрес</LinkButton>)}
      </Card>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-5 text-2xl font-bold">Бейджі</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STAGES.map((s) => {
              const earned = s.items.every((i) => done[i.id])
              return (
                <div key={s.id} className="flex flex-col items-center text-center">
                  <div className={`grid h-16 w-16 place-items-center rounded-full text-2xl ${earned ? 'animate-pop bg-accent-2 text-on-btn' : 'bg-line text-faint'}`}>★</div>
                  <p className={`mt-2 text-sm ${earned ? 'text-ink' : 'text-faint'}`}>{s.badge}</p>
                  <p className="text-xs text-muted">{s.title}</p>
                </div>
              )
            })}
          </div>
          <p className="mt-5 text-sm text-muted">Бейдж відкривається після завершення всіх пунктів етапу.</p>
        </Card>
        <Card>
          <h2 className="mb-5 text-2xl font-bold">Рівні</h2>
          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {LEVELS.map((l, i) => (
              <li key={l.name} className={`rounded-2xl border-2 p-4 ${i === li ? 'border-accent-2' : 'border-line'} ${i > li ? 'text-faint' : ''}`}>
                <p className="text-xs">Рівень {i + 1}</p>
                <p className="font-bold">{l.name}</p>
                <p className="text-sm">{l.min} XP</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  )
}
