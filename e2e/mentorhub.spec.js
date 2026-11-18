import { test, expect } from '@playwright/test'
import { login, nav, shot, isoDate, progress } from './helpers'

test.describe('1. Вхід', () => {
  test('невалідні дані показують помилки, валідні — пускають всередину', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Робоча пошта').fill('test@gmail.com')
    await page.getByLabel('Пароль').fill('1234')
    await page.getByRole('button', { name: 'Увійти' }).click()

    await expect(page.getByText('Корпоративна адреса @mentorhub.ua')).toHaveClass(/text-error-2/)
    await expect(page.getByText('Щонайменше 8 символів')).toHaveClass(/text-error-2/)
    await expect(page.getByRole('button', { name: 'Вийти' })).toHaveCount(0)
    await shot(page, '1a-login-errors')

    await page.getByLabel('Робоча пошта').fill('test@mentorhub.ua')
    await page.getByLabel('Пароль').fill('12345678')
    await page.getByRole('button', { name: 'Увійти' }).click()
    await expect(page.getByRole('heading', { name: 'Привіт, Test!' })).toBeVisible()
    await shot(page, '1b-login-success')
  })
})

test.describe('2. Roadmap', () => {
  test('відмітка дає +10 XP і %, зняття — забирає; завершення етапу видає бейдж', async ({ page }) => {
    await login(page)
    expect(await progress(page)).toEqual({ xp: 0, pct: 0, steps: 0 })

    const item = page.getByText('Налаштувати корпоративну пошту й календар')
    await item.click()
    await expect(page.getByRole('status', { name: 'Сповіщення' })).toContainText('+10 XP') // тост
    await expect.poll(() => progress(page)).toEqual({ xp: 10, pct: 7, steps: 1 })
    await shot(page, '2a-roadmap-checked')

    await item.click()
    await expect.poll(() => progress(page)).toEqual({ xp: 0, pct: 0, steps: 0 })
    await shot(page, '2b-roadmap-unchecked')

    // Етап «Доступи та інструменти» має 3 пункти (30 XP — без підвищення рівня й модалки)
    for (const t of ['Налаштувати корпоративну пошту й календар', 'Отримати доступ до Slack, Jira та Confluence', 'Налаштувати робоче середовище та VPN']) {
      await page.getByText(t).click()
    }
    await expect(page.getByText('Етап завершено! Бейдж «Підключений» отримано.')).toBeVisible()
    await expect.poll(() => progress(page)).toEqual({ xp: 30, pct: 20, steps: 3 })
    await shot(page, '2c-roadmap-stage-complete')

    await nav(page, 'Досягнення')
    await expect(page.getByText('Підключений', { exact: true })).toHaveClass(/text-ink/) // отримано
    await expect(page.getByText('Дослідник', { exact: true })).toHaveClass(/text-faint/) // заблоковано
    await shot(page, '2d-achievements-badge')
  })
})

test.describe('3. Фільтр менторів', () => {
  test('«Усі теги»: Python + Design → не знайдено; скидання повертає всіх 8', async ({ page }) => {
    await login(page)
    await nav(page, 'Ментори')
    await expect(page.getByRole('heading', { name: 'Знайдено 8 менторів' })).toBeVisible()

    await page.getByRole('radio', { name: 'Усі теги' }).click()
    await page.getByRole('button', { name: 'Python' }).click()
    await page.getByRole('button', { name: 'Design' }).click()
    await expect(page.getByRole('heading', { name: 'Менторів не знайдено' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Знайдено 0 менторів' })).toBeVisible()
    await shot(page, '3a-filter-not-found')

    await page.getByRole('button', { name: 'Скинути фільтри' }).last().click()
    await expect(page.getByRole('heading', { name: 'Знайдено 8 менторів' })).toBeVisible()
    await shot(page, '3b-filter-reset')
  })
})

test.describe('4. Бронювання', () => {
  test('успішне бронювання; повтор на той самий слот заблоковано; минула дата недоступна', async ({ page }) => {
    await login(page)
    await nav(page, 'Ментори')
    await page.getByText('Олена Коваль').click()
    await expect(page.getByRole('heading', { name: 'Бронювання' })).toBeVisible()

    const date = page.locator('#booking-date')
    await date.fill(isoDate(1))
    await page.getByRole('button', { name: /^10:00\s*Вільно$/ }).click()
    await page.getByRole('button', { name: 'Забронювати 10:00–10:30' }).click()

    await expect(page.getByRole('heading', { name: 'Мої зустрічі' })).toBeVisible()
    await expect(page.getByText('Зустріч заброньовано. Олена Коваль отримає сповіщення.')).toBeVisible()
    await expect(page.getByText(/· 10:00–10:30/)).toBeVisible()
    await shot(page, '4a-booking-success')

    // Повторне бронювання того самого слота
    await nav(page, 'Ментори')
    await page.getByText('Олена Коваль').click()
    await date.fill(isoDate(1))
    await expect(page.getByRole('button', { name: /^10:00\s*Зайнято$/ })).toBeDisabled()
    await shot(page, '4b-booking-slot-taken')

    // Минула дата: календар не дає її обрати (min), а якщо ввести вручну — усі слоти вимкнені
    await expect(date).toHaveAttribute('min', isoDate(0))
    await date.fill(isoDate(-1))
    const slots = page.getByRole('button', { name: /^\d\d:\d\d\s*(Вільно|Минув|Зайнято|Обрано)$/ })
    await expect(slots).toHaveCount(18)
    for (const s of await slots.all()) await expect(s).toBeDisabled()
    await expect(page.getByRole('button', { name: 'Оберіть час' })).toBeDisabled()
    await shot(page, '4c-booking-past-date')
  })
})

test.describe('5. Тема', () => {
  test('вибір теми зберігається після перезавантаження', async ({ page }) => {
    await login(page)
    const html = page.locator('html')
    const after = (await html.getAttribute('data-theme')) === 'light' ? 'dark' : 'light'

    await page.locator('header').getByRole('button', { name: /Увімкнути (світлу|темну) тему/ }).click()
    await expect(html).toHaveAttribute('data-theme', after)
    await page.reload()
    await expect(html).toHaveAttribute('data-theme', after)
    await expect(page.getByRole('button', { name: 'Вийти' })).toBeVisible()
    await shot(page, `5-theme-${after}-after-reload`)
  })
})

test.describe('6. Мобільна ширина 375px', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('немає горизонтального скролу на жодному екрані', async ({ page }) => {
    const check = async (name) => {
      const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }))
      await shot(page, `6-mobile-${name}`)
      expect(sw, `горизонтальний скрол на екрані «${name}»: ${sw}px > ${cw}px`).toBeLessThanOrEqual(cw)
    }
    await page.goto('/')
    await check('login')
    await login(page)
    await check('map')
    for (const [tab, file] of [['Ментори', 'mentors'], ['Зустрічі', 'meetings'], ['Досягнення', 'achievements']]) {
      await nav(page, tab)
      await check(file)
    }
    await nav(page, 'Ментори')
    await page.getByText('Олена Коваль').click()
    await check('booking')
  })

  test('нижня панель: усі 4 вкладки повністю видимі, верхні вкладки сховані', async ({ page }) => {
    await login(page)
    await expect(page.getByRole('navigation', { name: 'Основна навігація' })).toBeHidden()
    const bottom = page.getByRole('navigation', { name: 'Нижня навігація' })
    await expect(bottom).toBeVisible()

    const vw = page.viewportSize().width
    const vh = page.viewportSize().height
    const tabs = bottom.getByRole('button')
    await expect(tabs).toHaveCount(4)
    for (const [i, name] of ['Карта', 'Ментори', 'Зустрічі', 'Досягнення'].entries()) {
      const btn = tabs.nth(i)
      await expect(btn).toHaveAccessibleName(name)
      await expect(btn).toBeInViewport({ ratio: 1 }) // кнопка цілком у вікні
      const box = await btn.boundingBox()
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(vw)
      expect(box.y + box.height).toBeLessThanOrEqual(vh)
      expect(box.height, `${name}: зона натиску ≥ 44px`).toBeGreaterThanOrEqual(44)
      // підпис не обрізаний (truncate) і іконка на місці
      const label = btn.locator('span').last()
      await expect(label).toHaveText(name)
      const clipped = await label.evaluate((el) => el.scrollWidth > el.clientWidth)
      expect(clipped, `підпис «${name}» обрізаний`).toBe(false)
      await expect(btn.locator('svg')).toBeVisible()
    }

    // перемикання працює і позначає активну вкладку
    await tabs.nth(3).click()
    await expect(tabs.nth(3)).toHaveAttribute('aria-current', 'page')
    await expect(page.getByRole('heading', { name: 'Мої досягнення' })).toBeVisible()
    await shot(page, '6-mobile-bottom-nav-light', { fullPage: false })
    await page.getByRole('button', { name: /Увімкнути темну тему/ }).click()
    await shot(page, '6-mobile-bottom-nav-dark', { fullPage: false })
  })
})
