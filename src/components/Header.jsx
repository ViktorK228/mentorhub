import { Logo, LinkButton } from './ui'
import ThemeToggle from './ThemeToggle'

const NAV = [['map', 'Карта'], ['mentors', 'Ментори'], ['meetings', 'Зустрічі'], ['achievements', 'Досягнення']]

export default function Header({ user, levelName, tab, onNavigate, onLogout, theme, setTheme }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pt-3 md:h-16 md:flex-nowrap md:py-0">
        <Logo />
        <div className="flex items-center gap-2 md:order-last">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <span className="text-right text-sm font-bold leading-tight">{user.name}<br className="hidden sm:block" /><span className="text-muted sm:text-ink"> · {levelName.toLowerCase()}</span></span>
          <LinkButton onClick={onLogout}>Вийти</LinkButton>
        </div>
        <nav className="-mx-4 flex w-full gap-1 overflow-x-auto px-4 md:mx-0 md:w-auto md:justify-center md:px-0">
          {NAV.map(([k, l]) => {
            const active = tab === k
            return (
              <button key={k} onClick={() => onNavigate(k)}
                className={`relative shrink-0 px-4 py-3 text-sm transition md:py-5 ${active ? 'font-bold text-ink' : 'text-muted hover:text-ink'}`}>
                {active && <span className="absolute left-1/2 top-0 h-1 w-6 -translate-x-1/2 rounded-full bg-accent-2 max-md:bottom-0 max-md:top-auto" />}
                {l}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
