import { useState } from 'react'
import { LEVELS, STAGES, TOTAL, XP_PER_ITEM } from './data'
import { levelOf } from './utils'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './hooks/useTheme'
import { useToasts } from './hooks/useToasts'
import Header from './components/Header'
import Login from './components/Login'
import ThemeToggle from './components/ThemeToggle'
import Roadmap from './components/Roadmap'
import Mentors from './components/Mentors'
import BookingModal from './components/BookingModal'
import Bookings from './components/Bookings'
import Achievements from './components/Achievements'
import Toast from './components/Toast'
import Celebration from './components/Celebration'

export default function App() {
  const [user, setUser] = useLocalStorage('mh_user', null)
  const [theme, setTheme] = useTheme()
  const [done, setDone] = useLocalStorage('mh_done', {})
  const [bookings, setBookings] = useLocalStorage('mh_bookings', [])
  const [tab, setTab] = useState('map')
  const [bookingMentor, setBookingMentor] = useState(null)
  const [notice, setNotice] = useState(null) // останнє подія для блоку сповіщень
  const [toasts, pushToast] = useToasts()
  const [celebration, setCelebration] = useState(null)
  const doneCount = Object.values(done).filter(Boolean).length
  const levelName = LEVELS[levelOf(doneCount * XP_PER_ITEM)].name

  const toggle = (id) => {
    const checking = !done[id]
    setDone({ ...done, [id]: checking })
    if (!checking) return setNotice(null)
    pushToast(`+${XP_PER_ITEM} XP`)
    const before = levelOf(doneCount * XP_PER_ITEM)
    const after = levelOf((doneCount + 1) * XP_PER_ITEM)
    const stage = STAGES.find((s) => s.items.some((i) => i.id === id))
    const stageDone = stage.items.every((i) => i.id === id || done[i.id])
    if (doneCount + 1 === TOTAL) setNotice({ kind: 'success', text: 'Онбординг завершено! Вітаємо в команді.' })
    else if (after > before) setNotice({ kind: 'success', text: `Крок виконано! Новий рівень — «${LEVELS[after].name}».` })
    else if (stageDone) setNotice({ kind: 'success', text: `Етап завершено! Бейдж «${stage.badge}» отримано.` })
    else setNotice({ kind: 'success', text: `Крок виконано! +${XP_PER_ITEM} XP` })
    if (after > before) setCelebration(LEVELS[after].name)
  }

  const go = (t) => { setTab(t); setBookingMentor(null) }

  if (!user) return (
    <>
      <div className="fixed right-4 top-4 z-30"><ThemeToggle theme={theme} setTheme={setTheme} /></div>
      <Login onLogin={(u) => { setUser(u); setTab('map') }} />
    </>
  )

  return (
    <div className="min-h-screen">
      <Header user={user} levelName={levelName} tab={tab} onNavigate={go} onLogout={() => setUser(null)}
        theme={theme} setTheme={setTheme} />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:pb-6">
        {tab === 'map' && (
          <Roadmap user={user} done={done} doneCount={doneCount} toggle={toggle} notice={notice}
            bookings={bookings} goAchievements={() => go('achievements')} goMentors={() => go('mentors')} />
        )}
        {tab === 'mentors' && !bookingMentor && <Mentors onBook={setBookingMentor} />}
        {tab === 'mentors' && bookingMentor && (
          <BookingModal mentor={bookingMentor} bookings={bookings} onBack={() => setBookingMentor(null)}
            onConfirm={(b) => {
              setBookings((x) => [...x, b])
              setNotice({ kind: 'success', text: `Зустріч заброньовано. ${b.mentorName} отримає сповіщення.` })
              pushToast('Зустріч заброньовано')
              go('meetings')
            }} />
        )}
        {tab === 'meetings' && (
          <Bookings bookings={bookings} notice={notice?.text.startsWith('Зустріч') ? notice : null}
            onCancel={(id) => { setBookings((x) => x.filter((b) => b.id !== id)); setNotice(null) }} goMentors={() => go('mentors')} />
        )}
        {tab === 'achievements' && (
          <Achievements done={done} doneCount={doneCount} onBack={() => go('map')} onReset={() => { setDone({}); setNotice(null) }} />
        )}
      </main>

      <Toast toasts={toasts} />

      {celebration && <Celebration level={celebration} onClose={() => setCelebration(null)} />}
    </div>
  )
}
