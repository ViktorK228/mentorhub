export const STAGES = [
  { id: 's1', title: 'Знайомство з компанією', icon: '🏢', badge: 'Дослідник', items: [
    { id: 's1-1', text: 'Прочитати місію, цінності та історію компанії' },
    { id: 's1-2', text: 'Переглянути оргструктуру та ключові команди' },
    { id: 's1-3', text: 'Ознайомитися з внутрішніми політиками й правилами' },
    { id: 's1-4', text: 'Пройти welcome-зустріч з HR' },
  ]},
  { id: 's2', title: 'Доступи та інструменти', icon: '🔑', badge: 'Підключений', items: [
    { id: 's2-1', text: 'Налаштувати корпоративну пошту й календар' },
    { id: 's2-2', text: 'Отримати доступ до Slack, Jira та Confluence' },
    { id: 's2-3', text: 'Налаштувати робоче середовище та VPN' },
  ]},
  { id: 's3', title: 'Перший проєкт', icon: '🚀', badge: 'Творець', items: [
    { id: 's3-1', text: 'Отримати перше завдання від тімліда' },
    { id: 's3-2', text: 'Вивчити документацію та архітектуру проєкту' },
    { id: 's3-3', text: 'Виконати та здати першу задачу на рев\'ю' },
    { id: 's3-4', text: 'Отримати фідбек і внести правки' },
  ]},
  { id: 's4', title: 'Інтеграція в команду', icon: '🤝', badge: 'Командний гравець', items: [
    { id: 's4-1', text: 'Провести 1-on-1 з ментором' },
    { id: 's4-2', text: 'Взяти участь у командному ритуалі (стендап, ретро)' },
    { id: 's4-3', text: 'Познайомитися з колегами з суміжних команд' },
    { id: 's4-4', text: 'Заповнити анкету зворотного зв\'язку за перший місяць' },
  ]},
]

export const XP_PER_ITEM = 10

export const LEVELS = [
  { name: 'Новачок', min: 0 },
  { name: 'Учень', min: 40 },
  { name: 'Практик', min: 80 },
  { name: 'Свій у команді', min: 130 },
]

export const TAGS = ['React', 'Python', 'SQL', 'DevOps', 'Soft skills', 'Design', 'TypeScript', 'Management']

export const MENTORS = [
  { id: 1, name: 'Олена Коваль', role: 'Senior Frontend Developer', tags: ['React', 'TypeScript', 'Design'], rating: 4.9, bio: 'Допомагаю новачкам швидко увійти у фронтенд: React, code review, дизайн-системи.' },
  { id: 2, name: 'Андрій Мельник', role: 'Backend Team Lead', tags: ['Python', 'SQL', 'Management'], rating: 4.8, bio: 'Покажу, як влаштований наш бекенд, і навчу писати ефективні SQL-запити.' },
  { id: 3, name: 'Ірина Шевченко', role: 'DevOps Engineer', tags: ['DevOps', 'Python'], rating: 4.7, bio: 'CI/CD, інфраструктура та автоматизація — розберемо все на практиці.' },
  { id: 4, name: 'Максим Бондар', role: 'Fullstack Developer', tags: ['React', 'Python', 'SQL', 'TypeScript'], rating: 4.6, bio: 'Від бази даних до інтерфейсу: допоможу побачити продукт цілком.' },
  { id: 5, name: 'Наталія Ткаченко', role: 'HR Business Partner', tags: ['Soft skills', 'Management'], rating: 5.0, bio: 'Допоможу адаптуватися в команді, вибудувати комунікацію та цілі.' },
  { id: 6, name: 'Дмитро Лисенко', role: 'Product Designer', tags: ['Design', 'Soft skills'], rating: 4.5, bio: 'UX, прототипування й робота з дизайнерами — без зайвої теорії.' },
  { id: 7, name: 'Софія Кравчук', role: 'Data Analyst', tags: ['SQL', 'Python', 'Soft skills'], rating: 4.8, bio: 'Навчу говорити мовою даних: SQL, аналітика, презентація висновків.' },
  { id: 8, name: 'Тарас Гнатюк', role: 'Engineering Manager', tags: ['Management', 'DevOps', 'Soft skills', 'React'], rating: 4.7, bio: 'Процеси, планування та розвиток кар’єри в інженерії.' },
]

// Похідні константи
export const TOTAL = STAGES.reduce((n, s) => n + s.items.length, 0)
export const MAX_TAGS = 5
export const CANCEL_HOURS = 2
