import { Logo, LinkButton } from './ui'
import ThemeToggle from './ThemeToggle'

// Іконки 24×24, лінійні (stroke), щоб однаково виглядали в обох темах
const icon = (d) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)
const ICONS = {
  map: icon(<><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></>),
  mentors: icon(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></>),
  meetings: icon(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>),
  achievements: icon(<><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9z" /></>),
}

const NAV = [['map', 'Карта'], ['mentors', 'Ментори'], ['meetings', 'Зустрічі'], ['achievements', 'Досягнення']]

export default function Header({ user, levelName, tab, onNavigate, onLogout, theme, setTheme }) {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:pb-0 md:h-16 md:flex-nowrap md:py-0">
          <Logo />
          <div className="flex items-center gap-2 md:order-last">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <span className="text-right text-sm font-bold leading-tight">{user.name}<br className="hidden sm:block" /><span className="text-muted sm:text-ink"> · {levelName.toLowerCase()}</span></span>
            <LinkButton onClick={onLogout}>Вийти</LinkButton>
          </div>
          {/* Верхні вкладки — від 640px */}
          <nav aria-label="Основна навігація" className="hidden w-full gap-1 overflow-x-auto sm:flex md:w-auto md:justify-center">
            {NAV.map(([k, l]) => {
              const active = tab === k
              return (
                <button key={k} onClick={() => onNavigate(k)} aria-current={active ? 'page' : undefined}
                  className={`relative shrink-0 px-4 py-3 text-sm transition md:py-5 ${active ? 'font-bold text-ink' : 'text-muted hover:text-ink'}`}>
                  {active && <span className="absolute left-1/2 top-0 h-1 w-6 -translate-x-1/2 rounded-full bg-accent-2 max-md:bottom-0 max-md:top-auto" />}
                  {l}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Нижня панель — до 640px */}
      <nav aria-label="Нижня навігація"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(0_0_0/0.08)] backdrop-blur sm:hidden">
        {NAV.map(([k, l]) => {
          const active = tab === k
          return (
            <button key={k} onClick={() => onNavigate(k)} aria-current={active ? 'page' : undefined}
              className={`relative flex min-w-0 flex-col items-center gap-1 px-1 pb-2 pt-2.5 text-[11px] leading-none transition ${active ? 'font-bold text-accent-ink' : 'text-muted active:text-ink'}`}>
              {active && <span className="absolute left-1/2 top-0 h-1 w-8 -translate-x-1/2 rounded-b-full bg-accent-2" />}
              {ICONS[k]}
              <span className="max-w-full truncate">{l}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
