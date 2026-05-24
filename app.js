'use strict';

// ============================================================
// CONSTANTS
// ============================================================

const STORAGE_KEY = 'disciplina_v2';

const DAYS = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTH_NAMES = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

const CATEGORIES = [
  { id: 'food',      name: 'Еда',         icon: '🍔' },
  { id: 'transport', name: 'Транспорт',   icon: '🚌' },
  { id: 'clothes',   name: 'Одежда',      icon: '👗' },
  { id: 'fun',       name: 'Развлечения', icon: '🎉' },
  { id: 'health',    name: 'Здоровье',    icon: '💊' },
  { id: 'home',      name: 'Дом',         icon: '🏠' },
  { id: 'beauty',    name: 'Красота',     icon: '💅' },
  { id: 'smoke',     name: 'Курилка',     icon: '🚬' },
  { id: 'other',     name: 'Другое',      icon: '📦' },
];

// d=difficulty: 1=⭐ 2=⭐⭐ 3=⭐⭐⭐
const COOKING_CATEGORIES = [
  { id: 'breakfast', icon: '🌅', title: 'Завтраки', recipes: [
    { id: 'br01', name: 'Яичница',                    d: 1 },
    { id: 'br02', name: 'Омлет',                       d: 1 },
    { id: 'br03', name: 'Рисовая каша',               d: 1 },
    { id: 'br04', name: 'Авокадо-тост',               d: 1 },
    { id: 'br05', name: 'Манная каша',                d: 1 },
    { id: 'br06', name: 'Гранола с йогуртом',         d: 1 },
    { id: 'br07', name: 'Тост с яйцом',               d: 1 },
    { id: 'br08', name: 'Творожок с фруктами',        d: 1 },
    { id: 'br09', name: 'Горячие бутерброды',         d: 1 },
    { id: 'br10', name: 'Гренки',                      d: 1 },
    { id: 'br11', name: 'Сэндвич',                    d: 1 },
    { id: 'br12', name: 'Сырники',                    d: 2 },
    { id: 'br13', name: 'Блинчики',                   d: 2 },
    { id: 'br14', name: 'Панкейки',                   d: 2 },
    { id: 'br15', name: 'Творожная запеканка',        d: 2 },
    { id: 'br16', name: 'Дранники',                   d: 2 },
    { id: 'br17', name: 'Оладушки',                   d: 2 },
    { id: 'br18', name: 'Шакшука',                    d: 2 },
    { id: 'br19', name: 'Блинчики с мясом',           d: 2 },
    { id: 'br20', name: 'Блинчики с творогом',        d: 2 },
    { id: 'br21', name: 'Яйца Бенедикт',              d: 3 },
    { id: 'br22', name: 'Пончики',                    d: 3 },
  ]},
  { id: 'salads', icon: '🥗', title: 'Салаты', recipes: [
    { id: 'sl01', name: 'Классический овощной',       d: 1 },
    { id: 'sl02', name: 'Греческий',                   d: 1 },
    { id: 'sl03', name: 'Крабовый',                    d: 1 },
    { id: 'sl04', name: 'Капрезе',                    d: 1 },
    { id: 'sl05', name: 'Квашеная капуста',           d: 1 },
    { id: 'sl06', name: 'Цезарь',                      d: 2 },
    { id: 'sl07', name: 'Малибу',                      d: 2 },
    { id: 'sl08', name: 'С печенью и яблоком',        d: 2 },
    { id: 'sl09', name: 'Оливье',                      d: 2 },
    { id: 'sl10', name: 'Тёплый с курицей',           d: 2 },
    { id: 'sl11', name: 'Фунчоза с овощами',          d: 2 },
    { id: 'sl12', name: 'Морской',                    d: 2 },
    { id: 'sl13', name: 'Корейская морковь',          d: 2 },
    { id: 'sl14', name: 'Никуаз',                      d: 3 },
  ]},
  { id: 'mains', icon: '🍳', title: 'Основные блюда', recipes: [
    { id: 'mn01', name: 'Грудка в аэрогриле',         d: 1 },
    { id: 'mn02', name: 'Запечённые овощи',           d: 1 },
    { id: 'mn03', name: 'Рис с овощами',              d: 1 },
    { id: 'mn04', name: 'Жареная картошка',           d: 1 },
    { id: 'mn05', name: 'Тушёная картошка',           d: 1 },
    { id: 'mn06', name: 'Макароны с мясом',           d: 1 },
    { id: 'mn07', name: 'Спагетти',                   d: 1 },
    { id: 'mn08', name: 'Бёдра в аэрогриле',          d: 2 },
    { id: 'mn09', name: 'Карбонара',                   d: 2 },
    { id: 'mn10', name: 'Котлеты',                    d: 2 },
    { id: 'mn11', name: 'Мясо по-французски',         d: 2 },
    { id: 'mn12', name: 'Куриный суп',                d: 2 },
    { id: 'mn13', name: 'Тефтели',                    d: 2 },
    { id: 'mn14', name: 'Жаркое',                      d: 2 },
    { id: 'mn15', name: 'Жюльен',                      d: 2 },
    { id: 'mn16', name: 'Курица в кисло-сладком',     d: 2 },
    { id: 'mn17', name: 'Мисо суп',                   d: 2 },
    { id: 'mn18', name: 'Куриные котлеты с пюрешкой', d: 2 },
    { id: 'mn19', name: 'Говяжьи котлеты с пюрешкой', d: 2 },
    { id: 'mn20', name: 'Ленивые суши',               d: 2 },
    { id: 'mn21', name: 'Окрошка',                    d: 2 },
    { id: 'mn22', name: 'Холодник',                   d: 2 },
    { id: 'mn23', name: 'Борщ',                        d: 3 },
    { id: 'mn24', name: 'Курица целиком',              d: 3 },
    { id: 'mn25', name: 'Плов',                        d: 3 },
    { id: 'mn26', name: 'Голубцы',                    d: 3 },
    { id: 'mn27', name: 'Лагман',                      d: 3 },
    { id: 'mn28', name: 'Вареники',                   d: 3 },
    { id: 'mn29', name: 'Манты',                       d: 3 },
    { id: 'mn30', name: 'Пельмени',                   d: 3 },
    { id: 'mn31', name: 'Том ям',                      d: 3 },
    { id: 'mn32', name: 'Кукси',                       d: 3 },
    { id: 'mn33', name: 'Пицца',                       d: 3 },
    { id: 'mn34', name: 'Бешбармак',                   d: 3 },
  ]},
  { id: 'desserts', icon: '🍰', title: 'Десерты', recipes: [
    { id: 'ds01', name: 'Шоколадный мусс',            d: 1 },
    { id: 'ds02', name: 'Трюфели',                    d: 1 },
    { id: 'ds03', name: 'Творожный мусс',             d: 1 },
    { id: 'ds04', name: 'Сырки',                       d: 1 },
    { id: 'ds05', name: 'Клубника в шоколаде',        d: 1 },
    { id: 'ds06', name: 'Десерт в стакане',           d: 1 },
    { id: 'ds07', name: 'Брауни',                      d: 2 },
    { id: 'ds08', name: 'Чизкейк без выпечки',        d: 2 },
    { id: 'ds09', name: 'Панна котта',                d: 2 },
    { id: 'ds10', name: 'Яблочный пирог',             d: 2 },
    { id: 'ds11', name: 'Печенье',                    d: 2 },
    { id: 'ds12', name: 'Пирожное картошка',          d: 2 },
    { id: 'ds13', name: 'Шарлотка',                   d: 2 },
    { id: 'ds14', name: 'Маффины',                    d: 2 },
    { id: 'ds15', name: 'Кексы',                       d: 2 },
    { id: 'ds16', name: 'Пончики',                    d: 2 },
    { id: 'ds17', name: 'Медовик',                    d: 3 },
    { id: 'ds18', name: 'Шоколадный фондан',          d: 3 },
    { id: 'ds19', name: 'Моти',                        d: 3 },
    { id: 'ds20', name: 'Чизкейк классический',       d: 3 },
  ]},
];
const DIFF_STARS = { 1: '⭐', 2: '⭐⭐', 3: '⭐⭐⭐' };

const SONG_STEPS = [
  'Выучить аккорды / ноты',
  'Запомнить текст',
  'Сыграть куплет',
  'Сыграть припев',
  'Полная песня медленно',
  'Полная песня в темпе',
  'Записать видео',
];

const INSTRUMENT_ICON = { guitar: '🎸', piano: '🎹', voice: '🎤', other: '🎵' };

const WORKOUT_TYPES = [
  { id: 'pilates',  name: 'Пилатес',        icon: '🧘' },
  { id: 'func',     name: 'Функционал',     icon: '💪' },
  { id: 'back',     name: 'Здоровая спина', icon: '💆' },
  { id: 'glutes',   name: '3Д ягодицы',    icon: '🍑' },
  { id: 'stretch',  name: 'Стретчинг',      icon: '🤸' },
  { id: 'walk',     name: 'Прогулка',       icon: '🚶' },
];

const PLANT_STAGES = [
  { min: 0,  emoji: '🪴', label: 'Пустой горшок' },
  { min: 1,  emoji: '🌱', label: 'Семечко' },
  { min: 3,  emoji: '🌿', label: 'Росток' },
  { min: 7,  emoji: '🌸', label: 'Бутон' },
  { min: 14, emoji: '🌺', label: 'Цветок' },
  { min: 21, emoji: '🌳', label: 'Дерево' },
];

const ACHIEVEMENTS = [
  { id: 'first_habit',   icon: '🌱', title: 'Первый росток',       desc: 'Выполни любую привычку впервые' },
  { id: 'week_streak',   icon: '🔥', title: 'Неделя силы',         desc: '7 дней стрик на любой привычке' },
  { id: 'early_bird',    icon: '🌅', title: 'Ранняя пташка',       desc: 'Встань до 5:30 три раза' },
  { id: 'sport_10',      icon: '💪', title: 'Спортсменка',         desc: 'Спорт 10 раз' },
  { id: 'music_5h',      icon: '🎵', title: 'Музыкант',            desc: '5 часов практики (гитара + пианино)' },
  { id: 'no_sugar_7',    icon: '🍫', title: 'Железная воля',       desc: '7 дней без сладкого (0 штук)' },
  { id: 'savings',       icon: '💰', title: 'Копилка',             desc: 'Пополни накопления первый раз' },
  { id: 'doctors_3',     icon: '🌿', title: 'Забочусь о себе',     desc: 'Сходи к 3 врачам' },
  { id: 'cooking_7',     icon: '🍳', title: 'Шеф-повар',           desc: 'Освой 7 рецептов' },
  { id: 'song_done',     icon: '🎤', title: 'Звезда сцены',        desc: 'Доведи песню до конца' },
  { id: 'full_day',      icon: '🌟', title: 'Идеальный день',      desc: 'Выполни все привычки за день' },
  { id: 'garden_bloom',  icon: '🌸', title: 'Цветущий сад',        desc: 'Все растения на стадии 🌸 и выше' },
];

// habits that track time in minutes
const TIME_HABITS = ['guitar', 'piano'];
// habit that is a counter
const COUNTER_HABIT = 'sugar';

const INCOME_CATS = [
  { id: 'salary',  name: 'Зарплата',       icon: '💼' },
  { id: 'other',   name: 'Прочее',         icon: '💰' },
  { id: 'debt_in', name: 'Долг (вернули)', icon: '🤝' },
];

const SHOPPING_CATS = [
  { id: 'food',     name: 'Продукты',  icon: '🛒' },
  { id: 'home',     name: 'Дом',       icon: '🏠' },
  { id: 'beauty',   name: 'Косметика', icon: '💄' },
  { id: 'clothes',  name: 'Одежда',    icon: '👗' },
  { id: 'medicine', name: 'Лекарства', icon: '💊' },
  { id: 'other',    name: 'Другое',    icon: '📦' },
];

const BOOK_STATUSES = [
  { id: 'want',    label: 'Хочу прочитать', icon: '🔖' },
  { id: 'reading', label: 'Читаю',          icon: '📖' },
  { id: 'done',    label: 'Прочитала',      icon: '✅' },
];
const MEDIA_TYPES = [
  { id: 'movie',  label: 'Фильм',  icon: '🎬' },
  { id: 'series', label: 'Сериал', icon: '📺' },
];
const MEDIA_STATUSES = [
  { id: 'want',     label: 'Хочу',     icon: '❤️' },
  { id: 'watching', label: 'Смотрю',   icon: '▶️' },
  { id: 'done',     label: 'Смотрела', icon: '✅' },
];

const PRIORITIES = [
  { id: 'high',   label: 'Высокий', icon: '🔴' },
  { id: 'medium', label: 'Средний', icon: '🟡' },
  { id: 'low',    label: 'Низкий',  icon: '🟢' },
];
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

// ============================================================
// STATE
// ============================================================

let state = { page: 'today', data: null, modal: null, expandedTask: null };
let tempCat = 'food';
let tempInstrument = 'guitar';
let tempWorkout = 'pilates';
let sleepPeriod = 'week';
let workoutPeriod = 'week';
let financeTab = 'overview';
let financeAnalyticsPeriod = 'month';
let tempPriority = 'medium';
let editingTaskId = null;
let editingExpenseId = null;
let cookingTab = 'dishes';
let editingMyRecipeId = null;
let tempRecipeRating = 0;
let editingWorkoutKey = null;
let booksTab = 'reading';
let mediaTab = 'watching';
let editingBookId = null;
let editingMediaId = null;
let editingShoppingId = null;
let tempShoppingCat = 'food';
let tempIncomeCat = 'salary';
let tempBookStatus = 'want';
let tempMediaStatus = 'want';
let tempMediaType = 'movie';

// ============================================================
// DATA
// ============================================================

function defaultData() {
  return {
    habits: {
      active: [
        { id: 'sleep_good', name: 'Сон 6+ ч',   icon: '🌙' },
        { id: 'sport',      name: 'Тренировки', icon: '💪' },
        { id: 'uborka',     name: 'Уборка',      icon: '🧹' },
      ],
      queue: [
        { id: 'english', name: 'Английский', icon: '🇬🇧' },
        { id: 'solfege', name: 'Сольфеджио', icon: '🎵' },
        { id: 'singing', name: 'Вокал',       icon: '🎤' },
        { id: 'reading', name: 'Чтение',      icon: '📚' },
      ],
      archived: [
        { id: 'sugar',  name: 'Меньше сладкого', icon: '🍫' },
        { id: 'wake',   name: 'Встала в 5:00',   icon: '🌅' },
        { id: 'guitar', name: 'Гитара',           icon: '🎸' },
        { id: 'piano',  name: 'Пианино',          icon: '🎹' },
      ],
    },
    daily: {},
    finance: {
      monthlyBudget: 0, savingsGoal: 0, savingsCurrent: 0, expenses: [],
      income: [], monthlyPlans: {},
    },
    health: {
      doctors: [
        { id: 'd1', name: 'Терапевт',    specialty: 'Общая практика',   icon: '🩺', status: 'needed' },
        { id: 'd2', name: 'Стоматолог',  specialty: 'Зубы',             icon: '🦷', status: 'needed' },
        { id: 'd3', name: 'Гинеколог',   specialty: 'Женское здоровье', icon: '🌸', status: 'needed' },
        { id: 'd4', name: 'Дерматолог',  specialty: 'Кожа',             icon: '✨', status: 'needed' },
        { id: 'd5', name: 'Офтальмолог', specialty: 'Зрение',           icon: '👁', status: 'needed' },
      ]
    },
    cooking: { learned: [], myRecipes: [], customDishes: [] },
    goals: [],
    garden: { unlockedAchievements: [] },
    tasks: [],
    books: [],
    media: [],
    shopping: { items: [] },
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if (!d.goals)  d.goals = [];
      if (!d.garden) d.garden = { unlockedAchievements: [] };
      if (!d.habits.archived) d.habits.archived = [];
      if (!d.tasks)   d.tasks = [];
      if (!d.finance.income)       d.finance.income = [];
      if (!d.finance.monthlyPlans) d.finance.monthlyPlans = {};
      if (!d.books)   d.books = [];
      if (!d.media)   d.media = [];
      if (!d.shopping) d.shopping = { items: [] };
      if (!d.shopping.items) d.shopping.items = [];
      if (!d.cooking) d.cooking = { learned: [], myRecipes: [], customDishes: [] };
      if (!d.cooking.myRecipes)   d.cooking.myRecipes = [];
      if (!d.cooking.customDishes) d.cooking.customDishes = [];
      // Migrate: add uborka habit if missing
      if (!d.habits.active.find(h => h.id === 'uborka')) {
        d.habits.active.push({ id: 'uborka', name: 'Уборка', icon: '🧹' });
      }

      // Migrate: add sleep_good habit if missing
      if (!d.habits.active.find(h => h.id === 'sleep_good')) {
        const wakeIdx = d.habits.active.findIndex(h => h.id === 'wake');
        const insert = { id: 'sleep_good', name: 'Сон 6+ ч', icon: '🌙' };
        if (wakeIdx >= 0) d.habits.active.splice(wakeIdx + 1, 0, insert);
        else d.habits.active.unshift(insert);
      }

      // Migrate: rename sport → Тренировки
      const sport = d.habits.active.find(h => h.id === 'sport');
      if (sport) sport.name = 'Тренировки';

      // Migrate: rename Пение → Вокал
      const singing = d.habits.queue.find(h => h.id === 'singing');
      if (singing && singing.name === 'Пение') singing.name = 'Вокал';

      // Migrate: archive sugar/wake/guitar/piano if still in active
      for (const id of ['sugar', 'wake', 'guitar', 'piano']) {
        const idx = d.habits.active.findIndex(h => h.id === id);
        if (idx !== -1) {
          const [h] = d.habits.active.splice(idx, 1);
          if (!d.habits.archived.find(a => a.id === id)) d.habits.archived.push(h);
        }
      }
      return d;
    }
  } catch(e) {}
  return defaultData();
}

function updateAutoHabits() {
  // Auto-set sleep_good based on today's sleep data
  const td = state.data.daily[todayKey()];
  if (!td) return;
  const slMin = calcSleepMin(td.bedTime, td.wakeTime);
  if (slMin !== null) td.habits['sleep_good'] = slMin >= 360;
}

function save() {
  updateAutoHabits();
  checkAchievements();
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data)); } catch(e) {}
}

// ============================================================
// HELPERS
// ============================================================

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getTodayData() {
  const k = todayKey();
  if (!state.data.daily[k]) {
    state.data.daily[k] = { habits: {}, times: {}, sweets: 0, wakeTime: null, bedTime: null };
  }
  if (!state.data.daily[k].times)  state.data.daily[k].times = {};
  if (state.data.daily[k].sweets === undefined) state.data.daily[k].sweets = 0;
  return state.data.daily[k];
}

function fullDateStr() {
  const d = new Date();
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatDate(s) {
  const d = new Date(s + 'T12:00:00');
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatMoney(n) { return Math.round(n).toLocaleString('ru-RU'); }
function uid() { return Math.random().toString(36).slice(2, 10); }

function parseToMin(t) {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function calcSleepMin(bedTime, wakeTime) {
  const b = parseToMin(bedTime), w = parseToMin(wakeTime);
  if (b === null || w === null) return null;
  return b > w ? (w + 1440) - b : w - b;
}

function formatSleep(m) {
  if (m === null) return null;
  const h = Math.floor(m / 60), min = m % 60;
  return min > 0 ? `${h}ч ${min}м` : `${h}ч`;
}

function calcStreak(habitId) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const day = state.data.daily[key];
    const done = habitId === COUNTER_HABIT
      ? (day?.sweets === 0 && day?.habits?.[habitId])
      : day?.habits?.[habitId];
    if (done) { streak++; }
    else if (i > 0) break;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function getLast7Days() {
  const days = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const dd = new Date(d); dd.setDate(dd.getDate() - i);
    const key = `${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}-${String(dd.getDate()).padStart(2,'0')}`;
    days.push({ key, label: DAYS[dd.getDay()], data: state.data.daily[key] || null });
  }
  return days;
}

function getMonthExpenses() {
  const d = new Date();
  const prefix = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  return state.data.finance.expenses.filter(e => e.date.startsWith(prefix));
}

function totalSpent() { return getMonthExpenses().reduce((s, e) => s + e.amount, 0); }

function getMonthPlanKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}
function getMonthPlan() {
  return state.data.finance.monthlyPlans?.[getMonthPlanKey()] || {};
}
function getMonthIncome() {
  return (state.data.finance.income || []).filter(e => e.date.startsWith(getMonthPlanKey()));
}
function getSpentByCategory() {
  const byCat = {};
  for (const e of getMonthExpenses()) byCat[e.category] = (byCat[e.category] || 0) + e.amount;
  return byCat;
}

function getCat(id) { return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1]; }

function getPlantStage(streak) {
  let stage = PLANT_STAGES[0];
  for (const s of PLANT_STAGES) { if (streak >= s.min) stage = s; }
  return stage;
}

function totalWaterDrops() {
  let drops = 0;
  for (const key in state.data.daily) {
    const day = state.data.daily[key];
    const habits = state.data.habits.active;
    drops += habits.filter(h => day.habits?.[h.id]).length;
  }
  return drops;
}

function totalHobbyMinutes(habitId) {
  let total = 0;
  for (const key in state.data.daily) {
    total += state.data.daily[key].times?.[habitId] || 0;
  }
  return total;
}

function daysUntil(dateStr) {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.ceil((target - now) / 86400000);
}

function checkAchievements() {
  const unlocked = state.data.garden.unlockedAchievements;
  const unlock = (id) => { if (!unlocked.includes(id)) unlocked.push(id); };
  const all = state.data.daily;
  const habits = state.data.habits.active;

  // first_habit
  if (Object.values(all).some(d => Object.values(d.habits || {}).some(Boolean))) unlock('first_habit');

  // week_streak
  if (habits.some(h => calcStreak(h.id) >= 7)) unlock('week_streak');

  // early_bird: wake <= 05:30 at least 3 days
  const earlyDays = Object.values(all).filter(d => d.wakeTime && d.wakeTime <= '05:30').length;
  if (earlyDays >= 3) unlock('early_bird');

  // sport_10
  const sportDays = Object.values(all).filter(d => d.habits?.sport).length;
  if (sportDays >= 10) unlock('sport_10');

  // music_5h: 300 minutes total guitar + piano
  if ((totalHobbyMinutes('guitar') + totalHobbyMinutes('piano')) >= 300) unlock('music_5h');

  // no_sugar_7: 7 days with sweets === 0
  const noSugarDays = Object.values(all).filter(d => d.sweets === 0 && d.habits?.sugar).length;
  if (noSugarDays >= 7) unlock('no_sugar_7');

  // savings
  if (state.data.finance.savingsCurrent > 0) unlock('savings');

  // doctors_3
  const doneDoctors = state.data.health.doctors.filter(d => d.status === 'done').length;
  if (doneDoctors >= 3) unlock('doctors_3');

  // cooking_7
  if (state.data.cooking.learned.length >= 7) unlock('cooking_7');

  // song_done
  if (state.data.goals.some(g => g.steps.every(s => s.done))) unlock('song_done');

  // full_day (exclude uborka on weekdays)
  if (Object.entries(all).some(([key, d]) => {
    const dow = new Date(key + 'T12:00:00').getDay();
    const isWknd = dow === 0 || dow === 6;
    const dayHabits = habits.filter(h => h.id !== 'uborka' || isWknd);
    return dayHabits.every(h => d.habits?.[h.id]);
  })) unlock('full_day');

  // garden_bloom: all non-uborka habits streak >= 7
  if (habits.filter(h => h.id !== 'uborka').every(h => calcStreak(h.id) >= 7)) unlock('garden_bloom');
}

// ============================================================
// RENDER ENGINE
// ============================================================

function render() {
  document.getElementById('app').innerHTML = renderPage();
  const morePages = ['goals','health','garden','planner','cooking','achievements','books','media','shopping'];
  const activeNav = morePages.includes(state.page) ? 'more' : state.page;
  document.querySelectorAll('.nav-btn').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.page === activeNav)
  );
  bindEvents();
}

function renderPage() {
  const pages = {
    today: renderToday, sleep: renderSleep, finance: renderFinance,
    workout: renderWorkout, goals: renderGoals, garden: renderGarden,
    more: renderMore, health: renderHealth, planner: renderPlanner,
    cooking: renderCooking, achievements: renderAchievements,
    books: renderBooks, media: renderMedia, shopping: renderShopping,
  };
  return (pages[state.page] || renderToday)();
}

// ============================================================
// PAGE: TODAY
// ============================================================

function renderMonthCalendar() {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const habits = state.data.habits.active;
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;

  let cells = '';
  for (let i = 0; i < firstDow; i++) cells += `<div class="mcell mcell-empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayData = state.data.daily[key];
    const isToday = d === now.getDate();
    const isFuture = new Date(year, month, d) > now;
    const dow = new Date(year, month, d).getDay();
    const isWeekendDay = dow === 0 || dow === 6;
    const dayHabits = habits.filter(h => h.id !== 'uborka' || isWeekendDay);
    let level = 'empty';
    if (!isFuture && dayData) {
      const done = dayHabits.filter(h => dayData.habits?.[h.id]).length;
      const pct = dayHabits.length ? done / dayHabits.length : 0;
      level = pct === 0 ? 'l0' : pct < 0.5 ? 'l1' : pct < 1 ? 'l2' : 'l3';
    } else if (!isFuture) level = 'l0';
    cells += `<div class="mcell mcell-${level} ${isToday ? 'mcell-today' : ''}">${d}</div>`;
  }

  return `
    <div class="card">
      <div class="card-title">${MONTH_NAMES[month]} ${now.getFullYear()}</div>
      <div class="month-dow">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(l=>`<div class="dow-label">${l}</div>`).join('')}</div>
      <div class="month-grid">${cells}</div>
      <div class="chart-legend" style="margin-top:10px">
        <div class="legend-dot" style="background:var(--border)"></div> Нет данных
        <div class="legend-dot" style="background:var(--primary-light);margin-left:8px"></div> &lt;50%
        <div class="legend-dot" style="background:var(--primary);margin-left:8px"></div> &lt;100%
        <div class="legend-dot" style="background:var(--primary-dark);margin-left:8px"></div> 100% 🌟
      </div>
    </div>
  `;
}

function renderToday() {
  const td = getTodayData();
  const dow = new Date().getDay();
  const isWeekend = dow === 0 || dow === 6;
  const habits = state.data.habits.active.filter(h => h.id !== 'uborka' || isWeekend);
  const queue  = state.data.habits.queue;
  const doneCount = habits.filter(h => td.habits[h.id]).length;
  const pct = habits.length ? Math.round(doneCount / habits.length * 100) : 0;
  const greetings = ['Привет!', 'Доброе утро!', 'Привет, солнышко!', 'Привет, красотка!'];
  const greeting = greetings[new Date().getDay() % greetings.length];
  const drops = totalWaterDrops();

  return `
    <div class="page">
      <div class="page-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <h1>${greeting} 🌸</h1>
            <div class="subtitle">${fullDateStr()}</div>
          </div>
          <div class="water-badge">💧 ${drops}</div>
        </div>
      </div>

      <div class="card wake-card">
        ${td.wakeTime ? (() => {
          const slMin = calcSleepMin(td.bedTime, td.wakeTime);
          const slStr = formatSleep(slMin);
          const slOk  = slMin !== null && slMin >= 360;
          return `
            <div class="card-title">Подъём сегодня</div>
            <div class="wake-time-display">${td.wakeTime}</div>
            <div class="wake-status ${td.wakeTime <= '05:30' ? 'good' : 'late'}">
              ${td.wakeTime <= '05:30' ? '✓ Встала вовремя!' : td.wakeTime <= '07:00' ? '⚡ Почти! Завтра раньше' : '😴 Завтра встанем раньше'}
            </div>
            ${slStr ? `<div class="sleep-duration-badge ${slOk ? 'good' : 'bad'}" style="margin-top:10px">🌙 ${slStr} сна ${slOk ? '— отлично!' : '— цель 6ч+'}</div>` : `<button class="btn btn-secondary btn-sm" style="margin-top:10px" id="open-bed-modal">+ Время отбоя</button>`}
            <button class="btn btn-secondary btn-sm" style="margin-top:8px" id="change-wake">Изменить подъём</button>
          `;
        })() : `
          <div class="card-title">Во сколько встала?</div>
          <div class="wake-input-wrap">
            <p>Зафикси время подъёма</p>
            <input type="time" class="time-input" id="wake-input" value="${new Date().toTimeString().slice(0,5)}">
            <button class="btn btn-primary" id="save-wake">Сохранить</button>
          </div>
        `}
      </div>

      <div class="card">
        <div class="card-title">
          Привычки — ${doneCount}/${habits.length}
          <span style="float:right;font-weight:700;color:var(--primary-dark)">${pct}%</span>
        </div>
        <div class="progress-wrap" style="margin-bottom:16px">
          <div class="progress-bar" style="width:${pct}%"></div>
        </div>
        ${habits.map(h => {
          const done = !!td.habits[h.id];
          const streak = calcStreak(h.id);
          const isCounter = h.id === COUNTER_HABIT;
          const isTime    = TIME_HABITS.includes(h.id);
          const mins      = td.times?.[h.id] || 0;
          const sweets    = td.sweets || 0;

          if (isCounter) return `
            <div class="habit-item sugar-item">
              <span class="habit-icon">${h.icon}</span>
              <span class="habit-name">${h.name}</span>
              <div class="sugar-counter">
                <button class="sugar-btn" data-action="dec">−</button>
                <span class="sugar-count ${sweets === 0 ? 'zero' : sweets >= 3 ? 'high' : ''}">${sweets}</span>
                <button class="sugar-btn" data-action="inc">+</button>
              </div>
              ${streak > 0 ? `<span class="habit-streak ${streak >= 7 ? 'hot' : ''}">🔥 ${streak}</span>` : ''}
            </div>
          `;

          return `
            <div class="habit-item ${done ? 'done' : ''}" data-habit="${h.id}">
              <div class="habit-checkbox"></div>
              <span class="habit-icon">${h.icon}</span>
              <span class="habit-name">${h.name}</span>
              ${streak > 0 ? `<span class="habit-streak ${streak >= 7 ? 'hot' : ''}">🔥 ${streak}</span>` : ''}
            </div>
            ${isTime && done ? `
              <div class="time-track-row">
                <span class="time-track-label">⏱ Сколько минут?</span>
                <input type="number" class="time-track-input" data-habit="${h.id}" value="${mins}" min="0" max="300" inputmode="numeric" placeholder="0">
                <span class="time-track-unit">мин</span>
              </div>
            ` : ''}
          `;
        }).join('')}
      </div>

      ${renderMonthCalendar()}

      ${queue.length > 0 ? `
        <div class="card">
          <div class="card-title">В очереди — добавишь позже</div>
          ${queue.map(h => `
            <div class="queue-item">
              <span class="habit-icon">${h.icon}</span>
              <span class="habit-name">${h.name}</span>
              <span class="queue-label">скоро</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================
// PAGE: SLEEP
// ============================================================

function renderSleep() {
  const td = getTodayData();
  const days = getLast7Days();
  const withTime  = days.filter(d => d.data?.wakeTime);
  const withSleep = days.filter(d => d.data?.wakeTime && d.data?.bedTime);

  const avgWakeMin = withTime.length
    ? Math.round(withTime.reduce((s, d) => s + parseToMin(d.data.wakeTime), 0) / withTime.length) : null;
  const avgSleepMin = withSleep.length
    ? Math.round(withSleep.reduce((s, d) => s + calcSleepMin(d.data.bedTime, d.data.wakeTime), 0) / withSleep.length) : null;

  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const t = days[i].data?.wakeTime;
    if (t && t <= '06:30') streak++;
    else if (days[i].key !== todayKey()) break;
  }

  function minToStr(m) { return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`; }
  const todaySleepMin = calcSleepMin(td.bedTime, td.wakeTime);

  return `
    <div class="page">
      <div class="page-header">
        <h1>Сон 🌙</h1>
        <div class="subtitle">Цель: встать в 5:00, спать 6ч+</div>
      </div>

      <div class="stats-row">
        <div class="stat-box"><div class="stat-value">${streak}</div><div class="stat-label">🔥 Стрик</div></div>
        <div class="stat-box"><div class="stat-value" style="font-size:18px">${avgWakeMin !== null ? minToStr(avgWakeMin) : '—'}</div><div class="stat-label">Ср. подъём</div></div>
        <div class="stat-box"><div class="stat-value" style="font-size:16px">${avgSleepMin !== null ? formatSleep(avgSleepMin) : '—'}</div><div class="stat-label">Ср. сон</div></div>
      </div>

      <div class="card">
        <div class="card-title">Сегодня</div>
        <div class="sleep-today-grid">
          <div class="sleep-col">
            <div class="sleep-col-label">🌙 Отбой</div>
            ${td.bedTime ? `<div class="sleep-col-time">${td.bedTime}</div><button class="btn btn-secondary btn-sm" style="margin-top:8px" id="change-bed-sleep">Изменить</button>` : `<input type="time" class="sleep-col-input" id="bed-input-sleep" value="23:00"><button class="btn btn-primary btn-sm" style="margin-top:8px" id="save-bed-sleep">Сохранить</button>`}
          </div>
          <div class="sleep-divider">
            <div class="sleep-hours-badge ${todaySleepMin === null ? 'neutral' : todaySleepMin >= 360 ? 'good' : 'bad'}">
              ${todaySleepMin !== null ? formatSleep(todaySleepMin) : '?'}
            </div>
          </div>
          <div class="sleep-col">
            <div class="sleep-col-label">☀️ Подъём</div>
            ${td.wakeTime ? `<div class="sleep-col-time">${td.wakeTime}</div><button class="btn btn-secondary btn-sm" style="margin-top:8px" id="change-wake-sleep">Изменить</button>` : `<input type="time" class="sleep-col-input" id="wake-input-sleep" value="${new Date().toTimeString().slice(0,5)}"><button class="btn btn-primary btn-sm" style="margin-top:8px" id="save-wake-sleep">Сохранить</button>`}
          </div>
        </div>
        ${todaySleepMin !== null ? `<div style="text-align:center;margin-top:12px;font-size:13px;color:${todaySleepMin>=360?'var(--success-text)':'#BF360C'}">${todaySleepMin>=360?'✓ Норма выполнена!':'Не хватает '+formatSleep(360-todaySleepMin)+' до нормы'}</div>` : ''}
      </div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div class="card-title" style="margin-bottom:0">${sleepPeriod === 'week' ? 'Часы сна — 7 дней' : 'Сон за месяц'}</div>
          <div class="period-tabs">
            <button class="period-tab ${sleepPeriod==='week'?'active':''}" data-sleep-period="week">7 дней</button>
            <button class="period-tab ${sleepPeriod==='month'?'active':''}" data-sleep-period="month">Месяц</button>
          </div>
        </div>
        ${sleepPeriod === 'week' ? `
          <div class="sleep-chart">
            ${days.map(d => {
              const slMin = d.data?.wakeTime && d.data?.bedTime ? calcSleepMin(d.data.bedTime, d.data.wakeTime) : null;
              const pct = slMin ? Math.max(8, Math.min(100, (slMin - 240) / 360 * 100)) : 0;
              return `<div class="chart-col"><div class="chart-bar-wrap"><div class="chart-bar ${slMin?(slMin>=360?'good':''):' empty'}" style="height:${pct}%"></div></div><div class="chart-day">${d.label}</div></div>`;
            }).join('')}
          </div>
          <div class="chart-legend">
            <div class="legend-dot" style="background:var(--primary)"></div> 6ч+
            <div class="legend-dot" style="background:var(--primary-light);margin-left:8px"></div> Меньше 6ч
            <div class="legend-dot" style="background:var(--border);margin-left:8px"></div> Нет данных
          </div>
        ` : renderSleepMonthGrid()}
      </div>
    </div>
  `;
}

// ============================================================
// PAGE: FINANCE — helpers
// ============================================================

function getExpensesForPeriod(period) {
  const exps = state.data.finance.expenses;
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  if (period === 'month') {
    const pfx = `${y}-${String(m+1).padStart(2,'0')}`;
    return exps.filter(e => e.date.startsWith(pfx));
  }
  if (period === 'prev') {
    const pd = new Date(y, m-1, 1);
    const pfx = `${pd.getFullYear()}-${String(pd.getMonth()+1).padStart(2,'0')}`;
    return exps.filter(e => e.date.startsWith(pfx));
  }
  if (period === '3m') {
    const cut = new Date(y, m-2, 1);
    const cutStr = `${cut.getFullYear()}-${String(cut.getMonth()+1).padStart(2,'0')}-01`;
    return exps.filter(e => e.date >= cutStr);
  }
  return [...exps];
}

function getPeriodLabel(period) {
  const now = new Date();
  const m = now.getMonth(), y = now.getFullYear();
  if (period === 'month') return `${MONTH_NAMES[m]} ${y}`;
  if (period === 'prev') {
    const pd = new Date(y, m-1, 1);
    return `${MONTH_NAMES[pd.getMonth()]} ${pd.getFullYear()}`;
  }
  if (period === '3m') {
    const start = new Date(y, m-2, 1);
    return `${MONTH_NAMES[start.getMonth()]} — ${MONTH_NAMES[m]}`;
  }
  return 'Всё время';
}

function getPeriodDays(period) {
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  if (period === 'month') return now.getDate();
  if (period === 'prev') return new Date(y, m, 0).getDate();
  if (period === '3m') return 90;
  const exps = state.data.finance.expenses;
  if (!exps.length) return 1;
  const oldest = exps.map(e=>e.date).sort()[0];
  return Math.max(1, Math.ceil((now - new Date(oldest+'T00:00:00')) / 86400000) + 1);
}

function getCategoryBreakdown(expenses) {
  const totals = {};
  for (const e of expenses) totals[e.category] = (totals[e.category]||0) + e.amount;
  const total = Object.values(totals).reduce((s,v)=>s+v, 0);
  return CATEGORIES
    .filter(c => totals[c.id])
    .map(c => ({ ...c, amount: totals[c.id]||0, pct: total ? Math.round((totals[c.id]||0)/total*100) : 0 }))
    .sort((a,b) => b.amount - a.amount);
}

function getDailyTotals(period) {
  const exps = getExpensesForPeriod(period);
  const map = {};
  for (const e of exps) map[e.date] = (map[e.date]||0) + e.amount;
  return map;
}

// ============================================================
// PAGE: FINANCE
// ============================================================

function renderFinance() {
  const now = new Date();
  return `
    <div class="page">
      <div class="page-header">
        <h1>Финансы 💸</h1>
        <div class="subtitle">${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}</div>
      </div>
      <div class="finance-tabs-wrap">
        <button class="finance-tab ${financeTab==='overview'?'active':''}" data-finance-tab="overview">📊 Обзор</button>
        <button class="finance-tab ${financeTab==='plan'?'active':''}" data-finance-tab="plan">📅 План</button>
        <button class="finance-tab ${financeTab==='analytics'?'active':''}" data-finance-tab="analytics">📈 Аналитика</button>
      </div>
      ${financeTab === 'overview' ? renderFinanceOverview() : financeTab === 'plan' ? renderFinancePlan() : renderFinanceAnalytics()}
    </div>
  `;
}

function renderFinanceOverview() {
  const { finance } = state.data;
  const spent = totalSpent(), budget = finance.monthlyBudget || 0;
  const pct = budget ? Math.min(100, Math.round(spent / budget * 100)) : 0;
  const remaining = budget - spent;
  const savPct = finance.savingsGoal ? Math.min(100, Math.round(finance.savingsCurrent / finance.savingsGoal * 100)) : 0;
  const recent = getMonthExpenses().sort((a,b) => b.date.localeCompare(a.date)).slice(0, 15);

  return `
    <div class="card">
      <div class="card-title">Бюджет месяца</div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
        <span style="font-size:24px;font-weight:700;${pct>90?'color:#C62828':''}">${formatMoney(spent)} ₸</span>
        <span class="muted" style="font-size:13px">из ${formatMoney(budget)} ₸</span>
      </div>
      <div class="progress-wrap" style="margin-bottom:10px"><div class="progress-bar ${pct>90?'danger':''}" style="width:${pct}%"></div></div>
      <div style="font-size:13px;${remaining<0?'color:#C62828;font-weight:600':'color:var(--text-muted)'}">
        ${remaining>=0?`Осталось: ${formatMoney(remaining)} ₸`:`Превышение на ${formatMoney(-remaining)} ₸ 😱`}
      </div>
      <button class="btn btn-secondary btn-sm" style="margin-top:12px" id="open-budget-settings">⚙️ Настроить бюджет</button>
    </div>

    <div class="card">
      <div class="card-title">Накопления</div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
        <span style="font-size:24px;font-weight:700;color:var(--success-text)">${formatMoney(finance.savingsCurrent)} ₸</span>
        <span class="muted" style="font-size:13px">цель: ${formatMoney(finance.savingsGoal)} ₸</span>
      </div>
      <div class="progress-wrap" style="margin-bottom:10px"><div class="progress-bar success" style="width:${savPct}%"></div></div>
      <div style="font-size:13px;color:var(--text-muted)">${savPct}% от цели</div>
      <button class="btn btn-secondary btn-sm" style="margin-top:12px" id="open-savings">✏️ Скорректировать</button>
    </div>

    <button class="btn btn-primary btn-full" id="open-add-expense">+ Добавить трату</button>

    ${recent.length > 0 ? `
      <div class="card" style="margin-top:14px">
        <div class="card-title">Последние траты</div>
        ${recent.map(e => { const cat = getCat(e.category); return `
          <div class="expense-item">
            <div class="expense-icon">${cat.icon}</div>
            <div class="expense-info"><div class="expense-note">${e.note||cat.name}</div><div class="expense-meta">${cat.name} · ${formatDate(e.date)}</div></div>
            <div class="expense-amount">−${formatMoney(e.amount)} ₸</div>
            <div class="expense-actions">
              <button class="expense-edit-btn" data-expense-edit="${e.id}">✏️</button>
              <button class="expense-del-btn" data-expense-del="${e.id}">×</button>
            </div>
          </div>
        `; }).join('')}
      </div>
    ` : `<div class="empty-state" style="margin-top:16px"><div class="empty-icon">💸</div><p>Трат ещё нет.<br>Добавь первую!</p></div>`}
  `;
}

function renderFinancePlan() {
  const plan = getMonthPlan();
  const spentByCat = getSpentByCategory();
  const totalSpentAmt = totalSpent();
  const monthIncome = getMonthIncome().sort((a,b) => b.date.localeCompare(a.date));
  const totalIncomeAmt = monthIncome.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncomeAmt - totalSpentAmt;
  const totalPlanned = CATEGORIES.reduce((s, c) => s + (plan[c.id] || 0), 0);
  const now = new Date();

  return `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div class="card-title" style="margin:0">💼 Доходы — ${MONTH_NAMES[now.getMonth()]}</div>
        <button class="btn btn-primary btn-sm" id="add-income">+ Добавить</button>
      </div>
      <div style="font-size:26px;font-weight:700;color:var(--success-text);margin-bottom:10px">${formatMoney(totalIncomeAmt)} ₸</div>
      ${monthIncome.length > 0 ? monthIncome.slice(0,5).map(e => {
        const cat = INCOME_CATS.find(c => c.id === e.category) || INCOME_CATS[1];
        return `
          <div class="expense-item">
            <div class="expense-icon">${cat.icon}</div>
            <div class="expense-info">
              <div class="expense-note">${e.note || cat.name}</div>
              <div class="expense-meta">${cat.name} · ${formatDate(e.date)}</div>
            </div>
            <div class="expense-amount" style="color:var(--success-text)">+${formatMoney(e.amount)} ₸</div>
            <div class="expense-actions">
              <button class="expense-del-btn" data-income-del="${e.id}">×</button>
            </div>
          </div>
        `;
      }).join('') : `<div class="muted" style="font-size:13px">Доходов пока нет</div>`}
    </div>

    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div class="card-title" style="margin:0">📋 План расходов</div>
        <button class="btn btn-secondary btn-sm" id="open-set-plan">⚙️ Настроить</button>
      </div>
      ${totalPlanned === 0 && Object.keys(spentByCat).length === 0 ? `
        <div class="muted" style="text-align:center;padding:16px 0;font-size:13px">
          Нажми ⚙️ Настроить чтобы задать бюджет<br>по каждой категории на этот месяц
        </div>
      ` : `
        <div class="plan-header-row">
          <span class="plan-col-cat">Категория</span>
          <span class="plan-col-num muted" style="font-size:11px">План</span>
          <span class="plan-col-num muted" style="font-size:11px">Факт</span>
          <span class="plan-col-num muted" style="font-size:11px">Остаток</span>
        </div>
        ${CATEGORIES.map(cat => {
          const planned = plan[cat.id] || 0;
          const spent   = spentByCat[cat.id] || 0;
          if (!planned && !spent) return '';
          const delta = planned - spent;
          const over  = spent > planned && planned > 0;
          const pct   = planned > 0 ? Math.min(100, Math.round(spent / planned * 100)) : 0;
          return `
            <div class="plan-row">
              <span class="plan-col-cat">${cat.icon} ${cat.name}</span>
              <span class="plan-col-num muted">${planned > 0 ? formatMoney(planned) : '—'}</span>
              <span class="plan-col-num" style="font-weight:600">${spent > 0 ? formatMoney(spent) : '—'}</span>
              <span class="plan-col-num" style="font-weight:700;color:${over ? '#C62828' : delta > 0 ? 'var(--success-text)' : 'var(--text-muted)'}">
                ${planned > 0 ? (over ? `−${formatMoney(-delta)}` : `+${formatMoney(delta)}`) : '—'}
              </span>
            </div>
            ${planned > 0 ? `<div class="progress-wrap" style="margin-bottom:6px;height:3px"><div class="progress-bar ${over?'danger':''}" style="width:${pct}%;height:3px;border-radius:2px"></div></div>` : ''}
          `;
        }).join('')}
        <div class="plan-total-row">
          <span class="plan-col-cat" style="font-weight:700">Итого</span>
          <span class="plan-col-num muted">${totalPlanned > 0 ? formatMoney(totalPlanned) : '—'}</span>
          <span class="plan-col-num" style="font-weight:700;color:var(--primary-dark)">${formatMoney(totalSpentAmt)}</span>
          <span class="plan-col-num" style="font-weight:700;color:${totalPlanned>0&&totalSpentAmt>totalPlanned?'#C62828':'var(--success-text)'}">
            ${totalPlanned > 0 ? (totalSpentAmt > totalPlanned ? `−${formatMoney(totalSpentAmt-totalPlanned)}` : `+${formatMoney(totalPlanned-totalSpentAmt)}`) : '—'}
          </span>
        </div>
      `}
    </div>

    <div class="card">
      <div class="card-title">Баланс месяца</div>
      <div class="plan-balance-row">
        <div class="plan-balance-box income">
          <div class="plan-balance-label">Доходы</div>
          <div class="plan-balance-val">+${formatMoney(totalIncomeAmt)}</div>
        </div>
        <div class="plan-balance-box expense">
          <div class="plan-balance-label">Расходы</div>
          <div class="plan-balance-val">−${formatMoney(totalSpentAmt)}</div>
        </div>
        <div class="plan-balance-box ${balance >= 0 ? 'income' : 'expense'}">
          <div class="plan-balance-label">Остаток</div>
          <div class="plan-balance-val">${balance >= 0 ? '+' : ''}${formatMoney(balance)}</div>
        </div>
      </div>
    </div>
  `;
}

function renderFinanceAnalytics() {
  const periods = [
    { id: 'month', label: 'Этот мес.' },
    { id: 'prev',  label: 'Прошлый' },
    { id: '3m',    label: '3 месяца' },
    { id: 'all',   label: 'Всё время' },
  ];
  const exps = getExpensesForPeriod(financeAnalyticsPeriod);
  const totalAmt = exps.reduce((s,e) => s+e.amount, 0);
  const days = getPeriodDays(financeAnalyticsPeriod);
  const avgDay = days > 0 ? totalAmt / days : 0;
  const breakdown = getCategoryBreakdown(exps);
  const maxCatAmt = breakdown.length ? breakdown[0].amount : 1;

  // Comparison with previous period
  let prevExps = [], prevTotal = 0, trendPct = null;
  if (financeAnalyticsPeriod === 'month') {
    prevExps = getExpensesForPeriod('prev');
    prevTotal = prevExps.reduce((s,e)=>s+e.amount,0);
    if (prevTotal > 0) trendPct = Math.round((totalAmt - prevTotal) / prevTotal * 100);
  }

  // Daily chart for single-month periods
  let dailyChartHtml = '';
  if (financeAnalyticsPeriod === 'month' || financeAnalyticsPeriod === 'prev') {
    const dailyTotals = getDailyTotals(financeAnalyticsPeriod);
    const now = new Date();
    let year, month;
    if (financeAnalyticsPeriod === 'month') { year = now.getFullYear(); month = now.getMonth(); }
    else { const pd = new Date(now.getFullYear(), now.getMonth()-1,1); year=pd.getFullYear(); month=pd.getMonth(); }
    const daysInMon = new Date(year, month+1, 0).getDate();
    const maxDay = Math.max(...Object.values(dailyTotals), 1);
    const bars = [];
    for (let d=1; d<=daysInMon; d++) {
      const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const amt = dailyTotals[key] || 0;
      const h = amt > 0 ? Math.max(8, Math.round(amt/maxDay*100)) : 0;
      bars.push(`<div class="chart-col"><div class="chart-bar-wrap"><div class="chart-bar ${amt>0?'good':' empty'}" style="height:${h}%"></div></div><div class="chart-day" style="font-size:8px">${d}</div></div>`);
    }
    dailyChartHtml = `
      <div class="card">
        <div class="card-title">Траты по дням</div>
        <div class="sleep-chart" style="gap:2px">${bars.join('')}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:8px;text-align:center">высота бара = сумма трат за день</div>
      </div>
    `;
  }

  return `
    <div class="analytics-period-tabs">
      ${periods.map(p=>`<button class="analytics-period-btn ${financeAnalyticsPeriod===p.id?'active':''}" data-analytics-period="${p.id}">${p.label}</button>`).join('')}
    </div>

    <div class="card">
      <div class="card-title">${getPeriodLabel(financeAnalyticsPeriod)}</div>
      <div class="analytics-stats-row">
        <div class="analytics-stat">
          <div class="analytics-stat-value">${formatMoney(totalAmt)} ₸</div>
          <div class="analytics-stat-label">Потрачено</div>
        </div>
        <div class="analytics-stat">
          <div class="analytics-stat-value">${formatMoney(Math.round(avgDay))} ₸</div>
          <div class="analytics-stat-label">В день</div>
        </div>
        <div class="analytics-stat">
          <div class="analytics-stat-value">${exps.length}</div>
          <div class="analytics-stat-label">Трат</div>
        </div>
      </div>
      ${trendPct !== null ? `
        <div class="analytics-trend ${trendPct > 0 ? 'up' : 'down'}">
          ${trendPct > 0 ? '▲' : '▼'} ${Math.abs(trendPct)}% ${trendPct > 0 ? 'больше' : 'меньше'}, чем в прошлом месяце
        </div>
      ` : ''}
    </div>

    ${breakdown.length > 0 ? `
      <div class="card">
        <div class="card-title">По категориям</div>
        ${breakdown.map(c => `
          <div class="cat-breakdown-row">
            <div class="cat-breakdown-header">
              <span class="cat-breakdown-name">${c.icon} ${c.name}</span>
              <span class="cat-breakdown-pct">${c.pct}%</span>
              <span class="cat-breakdown-amt">${formatMoney(c.amount)} ₸</span>
            </div>
            <div class="progress-wrap" style="margin-top:5px;margin-bottom:10px;height:6px">
              <div class="progress-bar" style="width:${c.pct}%;height:6px;border-radius:3px"></div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : `<div class="empty-state" style="margin-top:16px"><div class="empty-icon">📊</div><p>Нет данных за этот период.<br>Добавь траты в Обзоре!</p></div>`}

    ${dailyChartHtml}
  `;
}

// ============================================================
// PAGE: WORKOUT
// ============================================================

function renderWorkout() {
  const td = getTodayData();
  const days = getLast7Days();

  // Stats
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].data?.habits?.sport) streak++;
    else if (days[i].key !== todayKey()) break;
  }
  const weekCount  = days.filter(d => d.data?.habits?.sport).length;
  const now = new Date();
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const monthCount = Object.entries(state.data.daily)
    .filter(([k, v]) => k.startsWith(monthPrefix) && v.habits?.sport).length;

  // Recent workouts (last 10 with workout logged)
  const recent = Object.entries(state.data.daily)
    .filter(([k, v]) => v.workout?.type)
    .sort(([a],[b]) => b.localeCompare(a))
    .slice(0, 10);

  const wt = WORKOUT_TYPES;

  return `
    <div class="page">
      <div class="page-header"><h1>Тренировки 💪</h1><div class="subtitle">Фиксируй каждую тренировку</div></div>

      <div class="stats-row">
        <div class="stat-box"><div class="stat-value">${streak}</div><div class="stat-label">🔥 Стрик</div></div>
        <div class="stat-box"><div class="stat-value">${weekCount}</div><div class="stat-label">За неделю</div></div>
        <div class="stat-box"><div class="stat-value">${monthCount}</div><div class="stat-label">За месяц</div></div>
      </div>

      <div class="card">
        <div class="card-title">Сегодня</div>
        ${td.workout?.type ? (() => {
          const wtype = WORKOUT_TYPES.find(w => w.id === td.workout.type) || WORKOUT_TYPES[WORKOUT_TYPES.length-1];
          return `
            <div style="display:flex;align-items:center;gap:14px">
              <div style="font-size:44px">${wtype.icon}</div>
              <div style="flex:1">
                <div style="font-size:18px;font-weight:700">${wtype.name}</div>
                ${td.workout.notes ? `<div class="muted" style="font-size:13px;margin-top:3px">${td.workout.notes}</div>` : ''}
              </div>
              <button class="btn btn-secondary btn-sm" id="edit-workout">Изменить</button>
            </div>
          `;
        })() : `
          <div class="empty-state" style="padding:16px 0">
            <div class="empty-icon">🏃</div>
            <p>Была тренировка сегодня?<br>Зафиксируй её!</p>
          </div>
          <button class="btn btn-primary btn-full" id="log-workout">+ Записать тренировку</button>
        `}
      </div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div class="card-title" style="margin-bottom:0">${workoutPeriod === 'week' ? 'Последние 7 дней' : 'Тренировки за месяц'}</div>
          <div class="period-tabs">
            <button class="period-tab ${workoutPeriod==='week'?'active':''}" data-workout-period="week">7 дней</button>
            <button class="period-tab ${workoutPeriod==='month'?'active':''}" data-workout-period="month">Месяц</button>
          </div>
        </div>
        ${workoutPeriod === 'week' ? `
          <div style="display:flex;gap:6px">
            ${days.map(d => {
              const w = d.data?.workout;
              const wtype = w ? WORKOUT_TYPES.find(t => t.id === w.type) : null;
              const done = !!d.data?.habits?.sport;
              return `
                <div style="flex:1;text-align:center">
                  <div style="font-size:22px;height:32px;display:flex;align-items:center;justify-content:center">
                    ${done ? (wtype?.icon || '💪') : '<span style="color:var(--border);font-size:18px">·</span>'}
                  </div>
                  <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${d.label}</div>
                </div>
              `;
            }).join('')}
          </div>
        ` : renderWorkoutMonthGrid()}
      </div>

      ${recent.length > 0 ? `
        <div class="card">
          <div class="card-title">История тренировок</div>
          ${recent.map(([key, v]) => {
            const wtype = WORKOUT_TYPES.find(t => t.id === v.workout.type) || WORKOUT_TYPES[WORKOUT_TYPES.length-1];
            return `
              <div class="workout-history-item">
                <div class="workout-history-icon">${wtype.icon}</div>
                <div style="flex:1">
                  <div style="font-size:14px;font-weight:600">${wtype.name}</div>
                  ${v.workout.notes ? `<div class="muted" style="font-size:12px">${v.workout.notes}</div>` : ''}
                </div>
                <div class="muted" style="font-size:12px;margin-right:8px">${formatDate(key)}</div>
                <button class="expense-edit-btn" data-workout-edit="${key}">✏️</button>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderHealth() {
  const { doctors } = state.data.health;
  const needed = doctors.filter(d=>d.status==='needed').length;
  const scheduled = doctors.filter(d=>d.status==='scheduled').length;
  const done = doctors.filter(d=>d.status==='done').length;

  return `
    <div class="page">
      <div class="page-header"><h1>Здоровье 🌿</h1><div class="subtitle">Твои врачи</div></div>
      <div class="stats-row">
        <div class="stat-box"><div class="stat-value danger-text">${needed}</div><div class="stat-label">Нужно</div></div>
        <div class="stat-box"><div class="stat-value" style="color:#BF360C">${scheduled}</div><div class="stat-label">Записана</div></div>
        <div class="stat-box"><div class="stat-value success-text">${done}</div><div class="stat-label">Сходила ✓</div></div>
      </div>
      <div class="card">
        <div class="card-title">Врачи — нажми чтобы изменить статус</div>
        ${doctors.map(d => `
          <div class="doctor-item">
            <div class="doctor-icon">${d.icon}</div>
            <div class="doctor-info"><div class="doctor-name">${d.name}</div><div class="doctor-specialty">${d.specialty}</div></div>
            <div class="doctor-status">
              <span class="status-badge ${d.status}">${d.status==='needed'?'Нужно':d.status==='scheduled'?'Записана':'✓ Сходила'}</span>
              <button class="status-cycle-btn" data-doctor="${d.id}">изменить →</button>
            </div>
            <button class="doctor-delete-btn" data-doctor-del="${d.id}" title="Удалить">×</button>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-secondary btn-full" id="add-doctor">+ Добавить врача</button>
    </div>
  `;
}

// ============================================================
// PAGE: MUSIC (бывш. Цели)
// ============================================================

function renderGoals() {
  const { goals } = state.data;

  return `
    <div class="page">
      <div class="page-header"><h1>Музыка 🎵</h1><div class="subtitle">Песни, которые учу</div></div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <div style="font-size:17px;font-weight:700">🎸 Мои песни</div>
        <button class="btn btn-primary btn-sm" id="add-goal">+ Добавить</button>
      </div>

      ${goals.length === 0 ? `
        <div class="card">
          <div class="empty-state">
            <div class="empty-icon">🎸</div>
            <p>Добавь первую песню,<br>которую хочешь выучить!</p>
          </div>
        </div>
      ` : goals.map(g => {
        const doneSt = g.steps.filter(s=>s.done).length;
        const pct = Math.round(doneSt/g.steps.length*100);
        const dLeft = daysUntil(g.targetDate);
        return `
          <div class="card">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">
              <div>
                <div style="font-size:17px;font-weight:700">${INSTRUMENT_ICON[g.instrument]||'🎵'} ${g.title}</div>
                <div class="muted" style="font-size:12px;margin-top:3px">
                  к ${formatDate(g.targetDate)} · ${dLeft>0?dLeft+' дней осталось':dLeft===0?'сегодня!':'просрочено на '+(-dLeft)+' дн.'}
                </div>
              </div>
              <span style="font-size:20px;font-weight:700;color:var(--primary-dark)">${pct}%</span>
            </div>
            <div class="progress-wrap" style="margin-bottom:14px"><div class="progress-bar" style="width:${pct}%"></div></div>
            ${g.steps.map(s => `
              <div class="recipe-item ${s.done?'learned':''}" data-goal="${g.id}" data-step="${s.id}">
                <div class="recipe-checkbox"></div>
                <span class="recipe-name">${s.name}</span>
              </div>
            `).join('')}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ============================================================
// PAGE: COOKING
// ============================================================

function renderCooking() {
  const { learned, myRecipes } = state.data.cooking;
  const allDishes = COOKING_CATEGORIES.flatMap(c => c.recipes);
  const totalRecipes = allDishes.length;
  const learnedCount = learned.length;
  const pct = totalRecipes > 0 ? Math.round(learnedCount / totalRecipes * 100) : 0;

  const dishesTab = cookingTab === 'dishes';

  const tabsHtml = `
    <div class="cooking-tabs">
      <button class="cooking-tab ${dishesTab ? 'active' : ''}" data-cooking-tab="dishes">📋 Блюда</button>
      <button class="cooking-tab ${!dishesTab ? 'active' : ''}" data-cooking-tab="recipes">📖 Рецепты</button>
    </div>
  `;

  let contentHtml = '';

  if (dishesTab) {
    contentHtml = `
      <div class="card">
        <div class="card-title">Общий прогресс</div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:22px;font-weight:700;color:var(--primary-dark)">${learnedCount}</span>
          <span class="muted" style="font-size:13px">из ${totalRecipes} блюд</span>
        </div>
        <div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
      </div>

      ${COOKING_CATEGORIES.map(cat => {
        const customCat = state.data.cooking.customDishes.filter(d => d.catId === cat.id);
        const catTotal = cat.recipes.length + customCat.length;
        const catLearned = [...cat.recipes, ...customCat].filter(r => learned.includes(r.id)).length;
        const catPct = catTotal > 0 ? Math.round(catLearned / catTotal * 100) : 0;

        const byDiff = [1, 2, 3].map(d => {
          const group = cat.recipes.filter(r => r.d === d);
          const customGroup = customCat.filter(r => r.d === d);
          if (!group.length && !customGroup.length) return '';
          return `
            <div class="cook-diff-group">
              <div class="cook-diff-label">${DIFF_STARS[d]}</div>
              ${group.map(r => `
                <div class="recipe-item ${learned.includes(r.id) ? 'learned' : ''}" data-recipe="${r.id}">
                  <div class="recipe-checkbox"></div>
                  <span class="recipe-name">${r.name}</span>
                </div>
              `).join('')}
              ${customGroup.map(r => `
                <div class="recipe-item ${learned.includes(r.id) ? 'learned' : ''}" data-recipe="${r.id}">
                  <div class="recipe-checkbox"></div>
                  <span class="recipe-name">${r.name} <span style="font-size:10px;color:var(--text-muted)">✎</span></span>
                </div>
              `).join('')}
            </div>
          `;
        }).join('');

        return `
          <div class="card">
            <div class="level-header">
              <div class="level-title">${cat.icon} ${cat.title}</div>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="level-progress-text">${catLearned}/${catTotal}</div>
                <button class="cook-add-dish-btn" data-add-dish="${cat.id}">+ Блюдо</button>
              </div>
            </div>
            <div class="progress-wrap" style="margin-bottom:10px"><div class="progress-bar" style="width:${catPct}%"></div></div>
            ${byDiff}
          </div>
        `;
      }).join('')}
    `;
  } else {
    // My recipes tab
    const recipeItems = myRecipes.length === 0
      ? `<div class="muted" style="text-align:center;padding:24px 0;font-size:14px">Пока нет рецептов.<br>Нажми + чтобы добавить первый 🍳</div>`
      : myRecipes.map(r => `
          <div class="my-recipe-item">
            <div class="my-recipe-top">
              <div class="my-recipe-title">${r.title}</div>
              <div class="my-recipe-actions">
                <button class="my-recipe-edit-btn" data-recipe-edit="${r.id}">✏️</button>
                <button class="my-recipe-del-btn" data-recipe-del="${r.id}">×</button>
              </div>
            </div>
            ${r.rating ? `<div style="font-size:12px;margin-top:3px">${'⭐'.repeat(r.rating)}</div>` : ''}
            ${r.text ? `<div class="my-recipe-text">${r.text.replace(/\n/g, '<br>')}</div>` : ''}
          </div>
        `).join('');

    contentHtml = `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <div class="card-title" style="margin:0">Мои рецепты 📖</div>
          <button class="btn btn-primary" id="add-my-recipe" style="padding:6px 14px;font-size:13px">+ Добавить</button>
        </div>
        <div class="muted" style="font-size:12px;margin-bottom:14px">Твоя личная книга рецептов</div>
        ${recipeItems}
      </div>
    `;
  }

  return `
    <div class="page">
      <div class="page-header"><h1>Кулинария 🍳</h1><div class="subtitle">Осваиваю рецепты</div></div>
      ${tabsHtml}
      ${contentHtml}
    </div>
  `;
}

// ============================================================
// PAGE: GARDEN
// ============================================================

function renderGarden() {
  const habits = state.data.habits.active;
  const drops = totalWaterDrops();
  const unlocked = state.data.garden.unlockedAchievements;

  const guitarMin = totalHobbyMinutes('guitar');
  const pianoMin  = totalHobbyMinutes('piano');

  return `
    <div class="page">
      <div class="page-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><h1>Мой сад 🌸</h1><div class="subtitle">Ухаживай за растениями каждый день</div></div>
          <div class="water-badge big">💧 ${drops}</div>
        </div>
      </div>

      <div class="garden-grid">
        ${habits.map(h => {
          const streak = calcStreak(h.id);
          const stage  = getPlantStage(streak);
          const isCounter = h.id === COUNTER_HABIT;
          const isTime    = TIME_HABITS.includes(h.id);
          const mins      = isTime ? totalHobbyMinutes(h.id) : null;
          return `
            <div class="plant-pot">
              <div class="plant-emoji">${stage.emoji}</div>
              <div class="plant-name">${h.icon} ${h.name}</div>
              <div class="plant-streak">${streak > 0 ? `🔥 ${streak} дн.` : 'Начни сегодня'}</div>
              <div class="plant-stage">${stage.label}</div>
              ${mins !== null ? `<div class="plant-time">⏱ ${mins < 60 ? mins+'м' : Math.floor(mins/60)+'ч '+(mins%60?mins%60+'м':'')}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>

      ${(guitarMin + pianoMin) > 0 ? `
        <div class="card">
          <div class="card-title">Время практики</div>
          <div style="display:flex;gap:14px">
            <div style="flex:1;text-align:center;padding:12px;background:var(--surface2);border-radius:var(--radius-sm)">
              <div style="font-size:28px">🎸</div>
              <div style="font-size:18px;font-weight:700;color:var(--primary-dark);margin-top:4px">${guitarMin < 60 ? guitarMin+'м' : Math.floor(guitarMin/60)+'ч '+(guitarMin%60?guitarMin%60+'м':'')}</div>
              <div class="muted" style="font-size:12px">Гитара</div>
            </div>
            <div style="flex:1;text-align:center;padding:12px;background:var(--surface2);border-radius:var(--radius-sm)">
              <div style="font-size:28px">🎹</div>
              <div style="font-size:18px;font-weight:700;color:var(--primary-dark);margin-top:4px">${pianoMin < 60 ? pianoMin+'м' : Math.floor(pianoMin/60)+'ч '+(pianoMin%60?pianoMin%60+'м':'')}</div>
              <div class="muted" style="font-size:12px">Пианино</div>
            </div>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

// ============================================================
// PAGE: ACHIEVEMENTS
// ============================================================

function renderAchievements() {
  const unlocked = state.data.garden.unlockedAchievements;
  const done   = ACHIEVEMENTS.filter(a => unlocked.includes(a.id));
  const locked = ACHIEVEMENTS.filter(a => !unlocked.includes(a.id));
  const pct    = Math.round(unlocked.length / ACHIEVEMENTS.length * 100);

  return `
    <div class="page">
      <div class="page-header">
        <h1>Достижения 🏆</h1>
        <div class="subtitle">${unlocked.length} из ${ACHIEVEMENTS.length} открыто</div>
      </div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:28px;font-weight:700;color:var(--primary-dark)">${unlocked.length}</span>
          <span class="muted" style="font-size:13px">из ${ACHIEVEMENTS.length}</span>
        </div>
        <div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:8px">${pct}% коллекции собрано${pct===100?' 🌟 — всё открыто!':''}</div>
      </div>

      ${done.length > 0 ? `
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px">✨ Открытые — ${done.length}</div>
        <div class="card" style="margin-bottom:18px">
          <div class="achievements-grid">
            ${done.map(a => `
              <div class="achievement-item done">
                <div class="achievement-icon">${a.icon}</div>
                <div>
                  <div class="achievement-title">${a.title}</div>
                  <div class="achievement-desc">${a.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${locked.length > 0 ? `
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px">🔒 Ещё не открыты — ${locked.length}</div>
        <div class="card">
          <div class="achievements-grid">
            ${locked.map(a => `
              <div class="achievement-item">
                <div class="achievement-icon">🔒</div>
                <div>
                  <div class="achievement-title">${a.title}</div>
                  <div class="achievement-desc">${a.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================
// HELPERS: MONTH GRIDS
// ============================================================

function renderSleepMonthGrid() {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  let cells = '';
  for (let i = 0; i < firstDow; i++) cells += `<div class="mcell mcell-empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayData = state.data.daily[key];
    const isToday = d === now.getDate();
    const isFuture = new Date(year, month, d) > now;
    let level = 'empty';
    if (!isFuture) {
      const slMin = dayData?.wakeTime && dayData?.bedTime ? calcSleepMin(dayData.bedTime, dayData.wakeTime) : null;
      if (slMin === null) level = 'l0';
      else if (slMin >= 420) level = 'l3';
      else if (slMin >= 360) level = 'l2';
      else level = 'l1';
    }
    cells += `<div class="mcell mcell-${level} ${isToday ? 'mcell-today' : ''}">${d}</div>`;
  }
  return `
    <div class="month-dow">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(l=>`<div class="dow-label">${l}</div>`).join('')}</div>
    <div class="month-grid">${cells}</div>
    <div class="chart-legend" style="margin-top:10px">
      <div class="legend-dot" style="background:var(--border)"></div> Нет данных
      <div class="legend-dot" style="background:var(--primary-light);margin-left:8px"></div> &lt;6ч
      <div class="legend-dot" style="background:var(--primary);margin-left:8px"></div> 6–7ч
      <div class="legend-dot" style="background:var(--primary-dark);margin-left:8px"></div> 7ч+ 🌟
    </div>
  `;
}

function renderWorkoutMonthGrid() {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  let cells = '';
  for (let i = 0; i < firstDow; i++) cells += `<div class="mcell mcell-empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayData = state.data.daily[key];
    const isToday = d === now.getDate();
    const isFuture = new Date(year, month, d) > now;
    let level = 'empty';
    if (!isFuture) level = dayData?.habits?.sport ? 'l3' : 'l0';
    cells += `<div class="mcell mcell-${level} ${isToday ? 'mcell-today' : ''}">${d}</div>`;
  }
  return `
    <div class="month-dow">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(l=>`<div class="dow-label">${l}</div>`).join('')}</div>
    <div class="month-grid">${cells}</div>
    <div class="chart-legend" style="margin-top:10px">
      <div class="legend-dot" style="background:var(--border)"></div> Нет тренировки
      <div class="legend-dot" style="background:var(--primary-dark);margin-left:8px"></div> Тренировка ✓
    </div>
  `;
}

// ============================================================
// PAGE: BOOKS
// ============================================================

function renderBooks() {
  const books = state.data.books || [];
  const tabs = [
    { id: 'reading', label: '📖 Читаю',    filter: b => b.status === 'reading' },
    { id: 'done',    label: '✅ Прочитала', filter: b => b.status === 'done' },
    { id: 'want',    label: '🔖 Хочу',     filter: b => b.status === 'want' },
  ];
  const list = books.filter(tabs.find(t => t.id === booksTab)?.filter || (() => true));
  const doneBooks = books.filter(b => b.status === 'done');
  const totalPagesRead = doneBooks.reduce((s, b) => s + (b.totalPages || 0), 0);

  function bookCard(b) {
    const bs = BOOK_STATUSES.find(s => s.id === b.status) || BOOK_STATUSES[0];
    const pct = b.totalPages > 0 ? Math.min(100, Math.round((b.pagesRead || 0) / b.totalPages * 100)) : 0;
    return `
      <div class="book-item">
        <div class="book-item-top">
          <div style="flex:1">
            <div class="book-title">${b.title}</div>
            ${b.author ? `<div class="book-author">${b.author}</div>` : ''}
            ${b.rating ? `<div style="font-size:11px;margin-top:2px">${'⭐'.repeat(b.rating)}</div>` : ''}
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0">
            <button class="expense-edit-btn" data-book-edit="${b.id}">✏️</button>
            <button class="expense-del-btn" data-book-del="${b.id}">×</button>
          </div>
        </div>
        ${b.status === 'reading' && b.totalPages > 0 ? `
          <div style="margin-top:8px">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:4px">
              <span>${b.pagesRead || 0} / ${b.totalPages} стр.</span><span>${pct}%</span>
            </div>
            <div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
              <input type="number" class="form-input" style="width:80px;padding:6px 8px;font-size:13px"
                placeholder="Стр." id="pages-input-${b.id}" min="0" max="${b.totalPages}" inputmode="numeric">
              <button class="btn btn-secondary btn-sm" data-log-pages="${b.id}">+ Записать</button>
            </div>
          </div>
        ` : ''}
        ${b.status === 'done' && b.totalPages > 0 ? `<div class="muted" style="font-size:12px;margin-top:4px">📄 ${b.totalPages} стр.</div>` : ''}
      </div>
    `;
  }

  return `
    <div class="page">
      <div class="page-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><h1>Книги 📚</h1><div class="subtitle">Читаю и хочу прочитать</div></div>
          <button class="btn btn-primary btn-sm" id="add-book">+ Добавить</button>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-box"><div class="stat-value">${doneBooks.length}</div><div class="stat-label">Прочитано</div></div>
        <div class="stat-box"><div class="stat-value">${books.filter(b=>b.status==='reading').length}</div><div class="stat-label">Читаю сейчас</div></div>
        <div class="stat-box"><div class="stat-value" style="font-size:16px">${totalPagesRead > 0 ? totalPagesRead.toLocaleString('ru') : '—'}</div><div class="stat-label">Стр. всего</div></div>
      </div>

      <div class="cooking-tabs">
        ${tabs.map(t => `<button class="cooking-tab ${booksTab===t.id?'active':''}" data-books-tab="${t.id}">${t.label}</button>`).join('')}
      </div>

      <div class="card">
        ${list.length === 0 ? `<div class="muted" style="text-align:center;padding:20px 0;font-size:14px">Список пустой 📭</div>`
          : list.map(bookCard).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// PAGE: MEDIA
// ============================================================

function renderMedia() {
  const media = state.data.media || [];
  const tabs = [
    { id: 'watching', label: '▶️ Смотрю',   filter: m => m.status === 'watching' },
    { id: 'done',     label: '✅ Смотрела',  filter: m => m.status === 'done' },
    { id: 'want',     label: '❤️ Хочу',     filter: m => m.status === 'want' },
  ];
  const list = media.filter(tabs.find(t => t.id === mediaTab)?.filter || (() => true));
  const now = new Date();
  const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const doneAll = media.filter(m => m.status === 'done');
  const doneMonth = doneAll.filter(m => m.dateDone?.startsWith(monthPrefix));

  function mediaCard(m) {
    const mt = MEDIA_TYPES.find(t => t.id === m.type) || MEDIA_TYPES[0];
    return `
      <div class="book-item">
        <div class="book-item-top">
          <div style="flex:1">
            <div class="book-title">${m.title}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${mt.icon} ${mt.label}</div>
            ${m.rating ? `<div style="font-size:11px;margin-top:2px">${'⭐'.repeat(m.rating)}</div>` : ''}
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0">
            <button class="expense-edit-btn" data-media-edit="${m.id}">✏️</button>
            <button class="expense-del-btn" data-media-del="${m.id}">×</button>
          </div>
        </div>
        ${m.status !== 'done' ? `
          <button class="btn btn-secondary btn-sm" style="margin-top:8px" data-media-done="${m.id}">✓ Отметить просмотрено</button>
        ` : m.dateDone ? `<div class="muted" style="font-size:11px;margin-top:4px">Просмотрено: ${formatDate(m.dateDone)}</div>` : ''}
      </div>
    `;
  }

  return `
    <div class="page">
      <div class="page-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><h1>Кино & Сериалы 🎬</h1><div class="subtitle">Смотрю и хочу посмотреть</div></div>
          <button class="btn btn-primary btn-sm" id="add-media">+ Добавить</button>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-box"><div class="stat-value">${doneAll.length}</div><div class="stat-label">Смотрела всего</div></div>
        <div class="stat-box"><div class="stat-value">${doneMonth.length}</div><div class="stat-label">В этом месяце</div></div>
        <div class="stat-box"><div class="stat-value">${media.filter(m=>m.status==='want').length}</div><div class="stat-label">Хочу посмотреть</div></div>
      </div>

      <div class="cooking-tabs">
        ${tabs.map(t => `<button class="cooking-tab ${mediaTab===t.id?'active':''}" data-media-tab="${t.id}">${t.label}</button>`).join('')}
      </div>

      <div class="card">
        ${list.length === 0 ? `<div class="muted" style="text-align:center;padding:20px 0;font-size:14px">Список пустой 🎭</div>`
          : list.map(mediaCard).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// PAGE: SHOPPING
// ============================================================

function renderShopping() {
  const items = state.data.shopping?.items || [];
  const active = items.filter(i => !i.done);
  const done   = items.filter(i => i.done);

  const byCat = SHOPPING_CATS.map(cat => ({
    ...cat,
    items: active.filter(i => i.category === cat.id)
  })).filter(c => c.items.length > 0);

  const highCount = active.filter(i => (i.priority || 'medium') === 'high').length;

  function itemRow(item) {
    const pr = PRIORITIES.find(p => p.id === (item.priority || 'medium'));
    return `
      <div class="shop-item ${item.done ? 'done' : ''}">
        <div class="shop-item-check" data-shop-toggle="${item.id}">
          ${item.done ? '✓' : ''}
        </div>
        <div style="flex:1">
          <div class="shop-item-name">${item.name}</div>
        </div>
        <span class="priority-badge priority-${pr.id}" style="font-size:11px">${pr.icon}</span>
        <button class="expense-del-btn" data-shop-del="${item.id}">×</button>
      </div>
    `;
  }

  return `
    <div class="page">
      <div class="page-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><h1>Список покупок 🛒</h1><div class="subtitle">${active.length} нужно купить${highCount > 0 ? ` · 🔴 ${highCount} срочно` : ''}</div></div>
          <button class="btn btn-primary btn-sm" id="add-shop-item">+ Добавить</button>
        </div>
      </div>

      ${active.length === 0 ? `
        <div class="card">
          <div class="muted" style="text-align:center;padding:20px 0;font-size:14px">Список пустой 🎉<br>Всё куплено!</div>
        </div>
      ` : byCat.map(cat => `
        <div class="card">
          <div class="card-title">${cat.icon} ${cat.name}</div>
          ${cat.items.sort((a,b) => (PRIORITY_ORDER[a.priority||'medium'])-(PRIORITY_ORDER[b.priority||'medium'])).map(itemRow).join('')}
        </div>
      `).join('')}

      ${done.length > 0 ? `
        <div class="card">
          <div class="card-title" style="color:var(--text-muted)">✓ Куплено (${done.length})</div>
          ${done.map(itemRow).join('')}
          <button class="btn btn-secondary btn-sm" style="margin-top:10px" id="clear-bought">Очистить купленное</button>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================
// PAGE: MORE (hub)
// ============================================================

function renderMore() {
  const sections = [
    { id: 'goals',        icon: '🎵', title: 'Музыка',        desc: 'Песни и прогресс' },
    { id: 'cooking',      icon: '🍳', title: 'Кулинария',     desc: 'Рецепты и уровни' },
    { id: 'books',        icon: '📚', title: 'Книги',         desc: 'Читаю и хочу прочитать' },
    { id: 'media',        icon: '🎬', title: 'Кино & Сериалы', desc: 'Смотрю и хочу' },
    { id: 'shopping',     icon: '🛒', title: 'Список покупок', desc: '' },
    { id: 'health',       icon: '🌿', title: 'Здоровье',      desc: 'Врачи и визиты' },
    { id: 'planner',      icon: '📋', title: 'Планер',        desc: '' },
    { id: 'garden',       icon: '🌱', title: 'Сад',           desc: 'Растения' },
    { id: 'achievements', icon: '🏆', title: 'Достижения',    desc: 'Коллекция ачивок' },
  ];
  const tasks = state.data.tasks || [];
  const activeTasks = tasks.filter(t => !t.done).length;
  const unlocked = state.data.garden.unlockedAchievements;
  const shopItems = (state.data.shopping?.items || []).filter(i => !i.done).length;
  const readingBooks = (state.data.books || []).filter(b => b.status === 'reading').length;
  return `
    <div class="page">
      <div class="page-header">
        <h1>Ещё ✨</h1>
        <div class="subtitle">Все разделы</div>
      </div>
      <div class="hub-grid">
        ${sections.map(s => {
          let desc = s.desc;
          if (s.id === 'planner' && activeTasks > 0) desc = `${activeTasks} задач`;
          if (s.id === 'achievements') desc = `${unlocked.length}/${ACHIEVEMENTS.length} открыто`;
          if (s.id === 'shopping' && shopItems > 0) desc = `${shopItems} не куплено`;
          if (s.id === 'books' && readingBooks > 0) desc = `Читаю: ${readingBooks}`;
          return `
            <button class="hub-card" data-page="${s.id}">
              <div class="hub-card-icon">${s.icon}</div>
              <div class="hub-card-title">${s.title}</div>
              ${desc ? `<div class="hub-card-desc">${desc}</div>` : ''}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// PAGE: PLANNER
// ============================================================

function renderPlanner() {
  const tasks = state.data.tasks || [];
  const active = [...tasks.filter(t => !t.done)]
    .sort((a, b) => (PRIORITY_ORDER[a.priority||'medium']) - (PRIORITY_ORDER[b.priority||'medium']));
  const done = tasks.filter(t => t.done);

  function priorityBadge(p) {
    const pr = PRIORITIES.find(x => x.id === (p || 'medium'));
    return `<span class="priority-badge priority-${pr.id}">${pr.icon} ${pr.label}</span>`;
  }

  function taskCard(t) {
    const isExp = state.expandedTask === t.id;
    const dLeft = t.deadline ? daysUntil(t.deadline) : null;
    const overdue = dLeft !== null && dLeft < 0 && !t.done;
    const urgent  = dLeft !== null && dLeft <= 1 && dLeft >= 0 && !t.done;
    const pr = t.priority || 'medium';
    return `
      <div class="task-item ${t.done ? 'task-done' : ''} task-priority-${pr}">
        <div class="task-row">
          <button class="task-check ${t.done ? 'checked' : ''}" data-task-done="${t.id}"></button>
          <div class="task-body" data-task-toggle="${t.id}">
            <div class="task-title-row">
              <span class="task-title">${t.title}</span>
              ${!t.done ? `<span class="priority-dot priority-dot-${pr}" title="${PRIORITIES.find(x=>x.id===pr)?.label}"></span>` : ''}
            </div>
            ${t.deadline ? `<div class="task-deadline ${overdue ? 'overdue' : urgent ? 'urgent' : ''}">
              ${overdue ? '⚠️ Просрочено' : dLeft === 0 ? '⏰ Сегодня!' : dLeft === 1 ? '📅 Завтра' : '📅 ' + formatDate(t.deadline)}
            </div>` : ''}
          </div>
          <div class="task-actions">
            <button class="task-edit-btn" data-task-edit="${t.id}" title="Редактировать">✏️</button>
            <button class="task-del" data-task-del="${t.id}" title="Удалить">×</button>
          </div>
        </div>
        ${isExp ? `
          <div class="task-expanded">
            ${t.description ? `<div class="task-desc">${t.description}</div>` : ''}
            <div class="task-meta-row">
              ${priorityBadge(t.priority)}
              ${t.deadline ? `<span class="task-meta-deadline">📅 ${formatDate(t.deadline)}</span>` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  const highCount  = active.filter(t => (t.priority||'medium') === 'high').length;

  return `
    <div class="page">
      <div class="page-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <h1>Планер 📋</h1>
            <div class="subtitle">${active.length > 0 ? `${active.length} задач${highCount > 0 ? ` · ${highCount} срочных 🔴` : ''}` : 'Всё чисто!'}</div>
          </div>
          <button class="btn btn-primary btn-sm" id="add-task">+ Задача</button>
        </div>
      </div>

      ${tasks.length === 0 ? `
        <div class="card">
          <div class="empty-state">
            <div class="empty-icon">✅</div>
            <p>Задач пока нет.<br>Добавь первую!</p>
          </div>
        </div>
      ` : ''}

      ${active.length > 0 ? `
        <div class="card">
          <div class="card-title">К выполнению — ${active.length}</div>
          ${active.map(taskCard).join('')}
        </div>
      ` : ''}

      ${done.length > 0 ? `
        <div class="card">
          <div class="card-title">Выполнено — ${done.length}</div>
          ${done.map(taskCard).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================
// MODALS
// ============================================================

function openModal(html) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay'; overlay.id = 'modal-root';
  overlay.innerHTML = `<div class="modal"><div class="modal-handle"></div>${html}</div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  bindModalEvents();
}

function closeModal() { document.getElementById('modal-root')?.remove(); }

function openWakeModal() {
  const td = getTodayData();
  openModal(`
    <h2>Время подъёма</h2>
    <div class="form-group">
      <label class="form-label">Во сколько встала?</label>
      <input type="time" class="form-input" id="modal-wake-input" value="${td.wakeTime||new Date().toTimeString().slice(0,5)}">
    </div>
    <button class="btn btn-primary btn-full" id="modal-save-wake">Сохранить</button>
  `);
}

function openBedModal() {
  const td = getTodayData();
  openModal(`
    <h2>Время отбоя</h2>
    <div class="form-group">
      <label class="form-label">Во сколько легла спать?</label>
      <input type="time" class="form-input" id="modal-bed-input" value="${td.bedTime||'23:00'}">
    </div>
    <button class="btn btn-primary btn-full" id="modal-save-bed">Сохранить</button>
  `);
}

function expenseModalHtml(title, e) {
  const cat = e?.category || tempCat;
  return `
    <h2>${title}</h2>
    <div class="form-group">
      <label class="form-label">Категория</label>
      <div class="category-grid">
        ${CATEGORIES.map(c=>`<button class="cat-btn ${c.id===cat?'selected':''}" data-cat="${c.id}"><span class="cat-icon">${c.icon}</span>${c.name}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Сумма (₸)</label>
      <input type="number" class="form-input" id="expense-amount" placeholder="0" inputmode="numeric" min="0" value="${e?.amount||''}">
    </div>
    <div class="form-group">
      <label class="form-label">Комментарий (необязательно)</label>
      <input type="text" class="form-input" id="expense-note" placeholder="Кофе, кино..." value="${e?.note||''}">
    </div>
    <button class="btn btn-primary btn-full" id="save-expense">${e ? 'Сохранить' : 'Добавить'}</button>
  `;
}

function openAddExpense() {
  editingExpenseId = null;
  tempCat = 'food';
  openModal(expenseModalHtml('Новая трата 💸', null));
}

function openEditExpense(id) {
  const e = state.data.finance.expenses.find(x => x.id === id);
  if (!e) return;
  editingExpenseId = id;
  tempCat = e.category;
  openModal(expenseModalHtml('Редактировать трату ✏️', e));
}

function openBudgetSettings() {
  const { finance } = state.data;
  openModal(`
    <h2>Настройки бюджета</h2>
    <div class="form-group">
      <label class="form-label">Бюджет на месяц (₸)</label>
      <input type="number" class="form-input" id="budget-input" value="${finance.monthlyBudget||''}" placeholder="150 000" inputmode="numeric">
    </div>
    <div class="form-group">
      <label class="form-label">Цель накоплений (₸)</label>
      <input type="number" class="form-input" id="savings-goal-input" value="${finance.savingsGoal||''}" placeholder="500 000" inputmode="numeric">
    </div>
    <button class="btn btn-primary btn-full" id="save-budget">Сохранить</button>
  `);
}

function openSavings() {
  const { finance } = state.data;
  openModal(`
    <h2>Накопления 💰</h2>
    <div class="form-group">
      <label class="form-label">Сколько накоплено сейчас (₸)</label>
      <input type="number" class="form-input" id="savings-now-input" value="${finance.savingsCurrent||''}" placeholder="0" inputmode="numeric">
    </div>
    <div class="form-group">
      <label class="form-label">Цель накоплений (₸)</label>
      <input type="number" class="form-input" id="savings-goal-input2" value="${finance.savingsGoal||''}" placeholder="500 000" inputmode="numeric">
    </div>
    <button class="btn btn-primary btn-full" id="save-savings">Сохранить</button>
  `);
}

function openAddDoctor() {
  openModal(`
    <h2>Добавить врача</h2>
    <div class="form-group">
      <label class="form-label">Специальность</label>
      <input type="text" class="form-input" id="doctor-name-input" placeholder="Кардиолог, ЛОР...">
    </div>
    <div class="form-group">
      <label class="form-label">Описание (необязательно)</label>
      <input type="text" class="form-input" id="doctor-spec-input" placeholder="Что проверить...">
    </div>
    <button class="btn btn-primary btn-full" id="save-doctor">Добавить</button>
  `);
}

function openLogWorkout(key) {
  editingWorkoutKey = key || null;
  const dayData = key ? (state.data.daily[key] || {}) : getTodayData();
  tempWorkout = dayData.workout?.type || 'pilates';
  openModal(`
    <h2>${key ? 'Изменить тренировку ✏️' : 'Тренировка 💪'}</h2>
    <div class="form-group">
      <label class="form-label">Что за тренировка?</label>
      <div class="category-grid" id="workout-grid">
        ${WORKOUT_TYPES.map(w => `
          <button class="cat-btn ${w.id === tempWorkout ? 'selected' : ''}" data-workout="${w.id}">
            <span class="cat-icon">${w.icon}</span>${w.name}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Заметка (необязательно)</label>
      <input type="text" class="form-input" id="workout-notes" placeholder="Ноги, кардио, 5км..." value="${dayData.workout?.notes || ''}">
    </div>
    <button class="btn btn-primary btn-full" id="save-workout">Сохранить</button>
  `);
}

function taskModalHtml(title, t) {
  const in7 = new Date(); in7.setDate(in7.getDate() + 7);
  const defaultDate = in7.toISOString().slice(0,10);
  return `
    <h2>${title}</h2>
    <div class="form-group">
      <label class="form-label">Название *</label>
      <input type="text" class="form-input" id="task-title" placeholder="Что нужно сделать?" value="${t ? t.title.replace(/"/g,'&quot;') : ''}">
    </div>
    <div class="form-group">
      <label class="form-label">Приоритет</label>
      <div class="priority-picker">
        ${PRIORITIES.map(p => `
          <button class="priority-pick-btn ${(t?.priority||'medium')===p.id?'selected':''} priority-pick-${p.id}" data-priority="${p.id}">
            ${p.icon} ${p.label}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Описание (необязательно)</label>
      <textarea class="form-input" id="task-desc" rows="3" placeholder="Детали, ссылки, заметки..." style="resize:none">${t ? t.description||'' : ''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Дедлайн (необязательно)</label>
      <input type="date" class="form-input" id="task-deadline" value="${t?.deadline || defaultDate}">
    </div>
    <button class="btn btn-primary btn-full" id="save-task">${t ? 'Сохранить' : 'Добавить'}</button>
  `;
}

function openAddTask() {
  editingTaskId = null;
  tempPriority = 'medium';
  openModal(taskModalHtml('Новая задача 📋', null));
}

function openEditTask(id) {
  const t = state.data.tasks.find(t => t.id === id);
  if (!t) return;
  editingTaskId = id;
  tempPriority = t.priority || 'medium';
  openModal(taskModalHtml('Редактировать задачу ✏️', t));
}

function openAddGoal() {
  tempInstrument = 'guitar';
  const in3months = new Date(); in3months.setMonth(in3months.getMonth() + 3);
  const dateStr = in3months.toISOString().slice(0,10);
  openModal(`
    <h2>Новая цель 🎯</h2>
    <div class="form-group">
      <label class="form-label">Название песни</label>
      <input type="text" class="form-input" id="goal-title" placeholder="Например: Счастье — Ария">
    </div>
    <div class="form-group">
      <label class="form-label">Инструмент</label>
      <div class="category-grid" style="grid-template-columns:repeat(4,1fr)">
        ${[{id:'guitar',icon:'🎸',name:'Гитара'},{id:'piano',icon:'🎹',name:'Пианино'},{id:'voice',icon:'🎤',name:'Голос'},{id:'other',icon:'🎵',name:'Другое'}].map(i=>`
          <button class="cat-btn ${i.id===tempInstrument?'selected':''}" data-instrument="${i.id}">
            <span class="cat-icon">${i.icon}</span>${i.name}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Выучить к дате</label>
      <input type="date" class="form-input" id="goal-date" value="${dateStr}">
    </div>
    <button class="btn btn-primary btn-full" id="save-goal">Создать план</button>
  `);
}

function recipeRatingHtml(current) {
  return `<div class="star-rating-picker">${[1,2,3,4,5].map(s =>
    `<button class="star-btn ${s <= current ? 'active' : ''}" data-star="${s}">⭐</button>`
  ).join('')}</div>`;
}

function openAddMyRecipe() {
  editingMyRecipeId = null;
  tempRecipeRating = 0;
  openModal(`
    <h2>Новый рецепт 📖</h2>
    <div class="form-group">
      <label class="form-label">Название блюда</label>
      <input type="text" class="form-input" id="my-recipe-title" placeholder="Например: Борщ бабушки">
    </div>
    <div class="form-group">
      <label class="form-label">Оценка</label>
      ${recipeRatingHtml(0)}
    </div>
    <div class="form-group">
      <label class="form-label">Рецепт / заметки</label>
      <textarea class="form-input" id="my-recipe-text" rows="7" placeholder="Ингредиенты, шаги, секреты..." style="resize:vertical;min-height:130px;font-family:inherit"></textarea>
    </div>
    <button class="btn btn-primary btn-full" id="save-my-recipe">Сохранить</button>
  `);
}

function openEditMyRecipe(id) {
  const r = state.data.cooking.myRecipes.find(x => x.id === id);
  if (!r) return;
  editingMyRecipeId = id;
  tempRecipeRating = r.rating || 0;
  openModal(`
    <h2>Редактировать рецепт 📖</h2>
    <div class="form-group">
      <label class="form-label">Название блюда</label>
      <input type="text" class="form-input" id="my-recipe-title" value="${r.title.replace(/"/g,'&quot;')}">
    </div>
    <div class="form-group">
      <label class="form-label">Оценка</label>
      ${recipeRatingHtml(r.rating || 0)}
    </div>
    <div class="form-group">
      <label class="form-label">Рецепт / заметки</label>
      <textarea class="form-input" id="my-recipe-text" rows="7" style="resize:vertical;min-height:130px;font-family:inherit">${r.text || ''}</textarea>
    </div>
    <button class="btn btn-primary btn-full" id="save-my-recipe">Сохранить</button>
  `);
}

function openAddIncome() {
  tempIncomeCat = 'salary';
  openModal(`
    <h2>Добавить доход 💰</h2>
    <div class="form-group">
      <label class="form-label">Сумма (₸) *</label>
      <input type="number" class="form-input" id="income-amount" placeholder="500 000" inputmode="numeric">
    </div>
    <div class="form-group">
      <label class="form-label">Категория</label>
      <div class="category-grid" style="grid-template-columns:repeat(3,1fr)">
        ${INCOME_CATS.map(c => `
          <button class="cat-btn ${c.id==='salary'?'selected':''}" data-income-cat="${c.id}">
            <span class="cat-icon">${c.icon}</span>${c.name}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Заметка</label>
      <input type="text" class="form-input" id="income-note" placeholder="Зарплата за май...">
    </div>
    <button class="btn btn-primary btn-full" id="save-income">Добавить</button>
  `);
}

function openSetMonthlyPlan() {
  const plan = getMonthPlan();
  const now = new Date();
  openModal(`
    <h2>📅 План на ${MONTH_NAMES[now.getMonth()]}</h2>
    <div class="muted" style="font-size:13px;margin-bottom:16px">Задай плановые суммы расходов по категориям</div>
    <div style="max-height:55vh;overflow-y:auto;padding-right:4px">
      ${CATEGORIES.map(cat => `
        <div class="form-group" style="margin-bottom:10px">
          <label class="form-label">${cat.icon} ${cat.name}</label>
          <input type="number" class="form-input" id="plan-${cat.id}"
            value="${plan[cat.id] || ''}" placeholder="0" inputmode="numeric">
        </div>
      `).join('')}
    </div>
    <button class="btn btn-primary btn-full" style="margin-top:8px" id="save-monthly-plan">Сохранить план</button>
  `);
}

function openAddCustomDish(catId) {
  const cat = COOKING_CATEGORIES.find(c => c.id === catId);
  openModal(`
    <h2>${cat?.icon || '🍳'} Добавить блюдо</h2>
    <div class="form-group">
      <label class="form-label">Название блюда</label>
      <input type="text" class="form-input" id="custom-dish-name" placeholder="Название блюда">
    </div>
    <div class="form-group">
      <label class="form-label">Сложность</label>
      <div class="category-grid" style="grid-template-columns:repeat(3,1fr)">
        ${[1,2,3].map(d => `
          <button class="cat-btn ${d===1?'selected':''}" data-diff="${d}">
            ${DIFF_STARS[d]}
          </button>
        `).join('')}
      </div>
    </div>
    <input type="hidden" id="custom-dish-cat" value="${catId}">
    <button class="btn btn-primary btn-full" id="save-custom-dish">Добавить</button>
  `);
}

function openAddBook() {
  editingBookId = null;
  tempBookStatus = 'want';
  openModal(`
    <h2>Добавить книгу 📚</h2>
    <div class="form-group">
      <label class="form-label">Название *</label>
      <input type="text" class="form-input" id="book-title" placeholder="Название книги">
    </div>
    <div class="form-group">
      <label class="form-label">Автор</label>
      <input type="text" class="form-input" id="book-author" placeholder="Имя автора">
    </div>
    <div class="form-group">
      <label class="form-label">Кол-во страниц</label>
      <input type="number" class="form-input" id="book-pages" placeholder="300" inputmode="numeric">
    </div>
    <div class="form-group">
      <label class="form-label">Статус</label>
      <div class="category-grid" style="grid-template-columns:repeat(3,1fr)">
        ${BOOK_STATUSES.map(s => `
          <button class="cat-btn ${s.id===tempBookStatus?'selected':''}" data-book-status="${s.id}">
            <span class="cat-icon">${s.icon}</span>${s.label}
          </button>
        `).join('')}
      </div>
    </div>
    <button class="btn btn-primary btn-full" id="save-book">Добавить</button>
  `);
}

function openEditBook(id) {
  const b = state.data.books.find(x => x.id === id);
  if (!b) return;
  editingBookId = id;
  tempBookStatus = b.status;
  tempRecipeRating = b.rating || 0;
  openModal(`
    <h2>Редактировать книгу 📚</h2>
    <div class="form-group">
      <label class="form-label">Название</label>
      <input type="text" class="form-input" id="book-title" value="${b.title.replace(/"/g,'&quot;')}">
    </div>
    <div class="form-group">
      <label class="form-label">Автор</label>
      <input type="text" class="form-input" id="book-author" value="${b.author || ''}">
    </div>
    <div class="form-group">
      <label class="form-label">Кол-во страниц</label>
      <input type="number" class="form-input" id="book-pages" value="${b.totalPages || ''}" inputmode="numeric">
    </div>
    <div class="form-group">
      <label class="form-label">Статус</label>
      <div class="category-grid" style="grid-template-columns:repeat(3,1fr)">
        ${BOOK_STATUSES.map(s => `
          <button class="cat-btn ${s.id===b.status?'selected':''}" data-book-status="${s.id}">
            <span class="cat-icon">${s.icon}</span>${s.label}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Оценка</label>
      ${recipeRatingHtml(b.rating || 0)}
    </div>
    <button class="btn btn-primary btn-full" id="save-book">Сохранить</button>
  `);
}

function openAddMedia() {
  editingMediaId = null;
  tempMediaStatus = 'want';
  tempMediaType = 'movie';
  openModal(`
    <h2>Добавить фильм / сериал 🎬</h2>
    <div class="form-group">
      <label class="form-label">Название *</label>
      <input type="text" class="form-input" id="media-title" placeholder="Название">
    </div>
    <div class="form-group">
      <label class="form-label">Тип</label>
      <div class="category-grid" style="grid-template-columns:repeat(2,1fr)">
        ${MEDIA_TYPES.map(t => `
          <button class="cat-btn ${t.id===tempMediaType?'selected':''}" data-media-type="${t.id}">
            <span class="cat-icon">${t.icon}</span>${t.label}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Статус</label>
      <div class="category-grid" style="grid-template-columns:repeat(3,1fr)">
        ${MEDIA_STATUSES.map(s => `
          <button class="cat-btn ${s.id===tempMediaStatus?'selected':''}" data-media-status="${s.id}">
            <span class="cat-icon">${s.icon}</span>${s.label}
          </button>
        `).join('')}
      </div>
    </div>
    <button class="btn btn-primary btn-full" id="save-media">Добавить</button>
  `);
}

function openEditMedia(id) {
  const m = state.data.media.find(x => x.id === id);
  if (!m) return;
  editingMediaId = id;
  tempMediaStatus = m.status;
  tempMediaType = m.type || 'movie';
  tempRecipeRating = m.rating || 0;
  openModal(`
    <h2>Редактировать 🎬</h2>
    <div class="form-group">
      <label class="form-label">Название</label>
      <input type="text" class="form-input" id="media-title" value="${m.title.replace(/"/g,'&quot;')}">
    </div>
    <div class="form-group">
      <label class="form-label">Тип</label>
      <div class="category-grid" style="grid-template-columns:repeat(2,1fr)">
        ${MEDIA_TYPES.map(t => `
          <button class="cat-btn ${t.id===m.type?'selected':''}" data-media-type="${t.id}">
            <span class="cat-icon">${t.icon}</span>${t.label}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Статус</label>
      <div class="category-grid" style="grid-template-columns:repeat(3,1fr)">
        ${MEDIA_STATUSES.map(s => `
          <button class="cat-btn ${s.id===m.status?'selected':''}" data-media-status="${s.id}">
            <span class="cat-icon">${s.icon}</span>${s.label}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Оценка</label>
      ${recipeRatingHtml(m.rating || 0)}
    </div>
    <button class="btn btn-primary btn-full" id="save-media">Сохранить</button>
  `);
}

function openAddShoppingItem() {
  editingShoppingId = null;
  tempShoppingCat = 'food';
  tempPriority = 'medium';
  openModal(`
    <h2>Добавить в список 🛒</h2>
    <div class="form-group">
      <label class="form-label">Что купить *</label>
      <input type="text" class="form-input" id="shop-name" placeholder="Например: Молоко">
    </div>
    <div class="form-group">
      <label class="form-label">Категория</label>
      <div class="category-grid">
        ${SHOPPING_CATS.map(c => `
          <button class="cat-btn ${c.id===tempShoppingCat?'selected':''}" data-shop-cat="${c.id}">
            <span class="cat-icon">${c.icon}</span>${c.name}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Приоритет</label>
      <div class="priority-picker">
        ${PRIORITIES.map(p => `
          <button class="priority-pick-btn ${p.id==='medium'?'selected':''} priority-pick-${p.id}" data-shop-priority="${p.id}">
            ${p.icon} ${p.label}
          </button>
        `).join('')}
      </div>
    </div>
    <button class="btn btn-primary btn-full" id="save-shop-item">Добавить</button>
  `);
}

// ============================================================
// EVENT BINDING
// ============================================================

function bindEvents() {
  // Habit toggles
  document.querySelectorAll('.habit-item[data-habit]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.habit;
      const td = getTodayData();
      td.habits[id] = !td.habits[id];
      save(); render();
    });
  });

  // Time tracking inputs
  document.querySelectorAll('.time-track-input').forEach(input => {
    input.addEventListener('change', () => {
      const id = input.dataset.habit;
      const td = getTodayData();
      td.times[id] = parseInt(input.value) || 0;
      save();
    });
  });

  // Sugar counter
  document.querySelectorAll('.sugar-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const td = getTodayData();
      if (btn.dataset.action === 'inc') td.sweets = (td.sweets || 0) + 1;
      else td.sweets = Math.max(0, (td.sweets || 0) - 1);
      // mark sugar habit done if sweets <= 1
      td.habits[COUNTER_HABIT] = td.sweets <= 1;
      save(); render();
    });
  });

  // Wake time — today page
  document.getElementById('save-wake')?.addEventListener('click', () => {
    const val = document.getElementById('wake-input')?.value;
    if (val) { getTodayData().wakeTime = val; save(); render(); }
  });
  document.getElementById('change-wake')?.addEventListener('click', openWakeModal);
  document.getElementById('open-bed-modal')?.addEventListener('click', openBedModal);

  // Wake/bed — sleep page
  document.getElementById('save-wake-sleep')?.addEventListener('click', () => {
    const val = document.getElementById('wake-input-sleep')?.value;
    if (val) { getTodayData().wakeTime = val; save(); render(); }
  });
  document.getElementById('change-wake-sleep')?.addEventListener('click', openWakeModal);
  document.getElementById('save-bed-sleep')?.addEventListener('click', () => {
    const val = document.getElementById('bed-input-sleep')?.value;
    if (val) { getTodayData().bedTime = val; save(); render(); }
  });
  document.getElementById('change-bed-sleep')?.addEventListener('click', openBedModal);

  // Workout
  document.getElementById('log-workout')?.addEventListener('click', () => openLogWorkout(null));
  document.getElementById('edit-workout')?.addEventListener('click', () => openLogWorkout(null));
  document.querySelectorAll('[data-workout-edit]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openLogWorkout(btn.dataset.workoutEdit); });
  });

  // Expense edit / delete
  document.querySelectorAll('[data-expense-edit]').forEach(btn => {
    btn.addEventListener('click', () => openEditExpense(btn.dataset.expenseEdit));
  });
  document.querySelectorAll('[data-expense-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.data.finance.expenses = state.data.finance.expenses.filter(e => e.id !== btn.dataset.expenseDel);
      save(); render();
    });
  });

  // Finance tabs
  document.querySelectorAll('[data-finance-tab]').forEach(btn => {
    btn.addEventListener('click', () => { financeTab = btn.dataset.financeTab; render(); });
  });
  document.querySelectorAll('[data-analytics-period]').forEach(btn => {
    btn.addEventListener('click', () => { financeAnalyticsPeriod = btn.dataset.analyticsPeriod; render(); });
  });

  // Finance
  document.getElementById('open-add-expense')?.addEventListener('click', openAddExpense);
  document.getElementById('open-budget-settings')?.addEventListener('click', openBudgetSettings);
  document.getElementById('open-savings')?.addEventListener('click', openSavings);

  // Hub navigation
  document.querySelectorAll('.hub-card[data-page]').forEach(card => {
    card.addEventListener('click', () => {
      state.page = card.dataset.page;
      window.scrollTo(0, 0);
      render();
    });
  });

  // Period selectors — sleep
  document.querySelectorAll('[data-sleep-period]').forEach(btn => {
    btn.addEventListener('click', () => { sleepPeriod = btn.dataset.sleepPeriod; render(); });
  });

  // Period selectors — workout
  document.querySelectorAll('[data-workout-period]').forEach(btn => {
    btn.addEventListener('click', () => { workoutPeriod = btn.dataset.workoutPeriod; render(); });
  });

  // Planner
  document.getElementById('add-task')?.addEventListener('click', openAddTask);
  document.querySelectorAll('[data-task-done]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const t = state.data.tasks.find(t => t.id === btn.dataset.taskDone);
      if (t) { t.done = !t.done; save(); render(); }
    });
  });
  document.querySelectorAll('[data-task-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.taskToggle;
      state.expandedTask = state.expandedTask === id ? null : id;
      render();
    });
  });
  document.querySelectorAll('[data-task-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      state.data.tasks = state.data.tasks.filter(t => t.id !== btn.dataset.taskDel);
      save(); render();
    });
  });
  document.querySelectorAll('[data-task-edit]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openEditTask(btn.dataset.taskEdit);
    });
  });

  // Health
  document.querySelectorAll('.status-cycle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const doc = state.data.health.doctors.find(d => d.id === btn.dataset.doctor);
      if (!doc) return;
      const cycle = ['needed','scheduled','done'];
      doc.status = cycle[(cycle.indexOf(doc.status)+1)%cycle.length];
      save(); render();
    });
  });
  document.querySelectorAll('.doctor-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.data.health.doctors = state.data.health.doctors.filter(d => d.id !== btn.dataset.doctorDel);
      save(); render();
    });
  });
  document.getElementById('add-doctor')?.addEventListener('click', openAddDoctor);

  // Goals: song steps
  document.querySelectorAll('.recipe-item[data-goal]').forEach(el => {
    el.addEventListener('click', () => {
      const goal = state.data.goals.find(g => g.id === el.dataset.goal);
      const step = goal?.steps.find(s => s.id === el.dataset.step);
      if (step) { step.done = !step.done; save(); render(); }
    });
  });
  document.getElementById('add-goal')?.addEventListener('click', openAddGoal);

  // Cooking: add dish per category
  document.querySelectorAll('[data-add-dish]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openAddCustomDish(btn.dataset.addDish); });
  });

  // Cooking tabs
  document.querySelectorAll('[data-cooking-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      cookingTab = btn.dataset.cookingTab;
      render();
    });
  });

  // Cooking: toggle learned dish
  document.querySelectorAll('.recipe-item[data-recipe]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.recipe;
      const { learned } = state.data.cooking;
      const idx = learned.indexOf(id);
      if (idx >= 0) learned.splice(idx, 1); else learned.push(id);
      save(); render();
    });
  });

  // Finance plan
  document.getElementById('add-income')?.addEventListener('click', openAddIncome);
  document.getElementById('open-set-plan')?.addEventListener('click', openSetMonthlyPlan);
  document.querySelectorAll('[data-income-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      state.data.finance.income = state.data.finance.income.filter(i => i.id !== btn.dataset.incomeDel);
      save(); render();
    });
  });

  // Books
  document.getElementById('add-book')?.addEventListener('click', openAddBook);
  document.querySelectorAll('[data-books-tab]').forEach(btn => {
    btn.addEventListener('click', () => { booksTab = btn.dataset.booksTab; render(); });
  });
  document.querySelectorAll('[data-book-edit]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openEditBook(btn.dataset.bookEdit); });
  });
  document.querySelectorAll('[data-book-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (!confirm('Удалить книгу?')) return;
      state.data.books = state.data.books.filter(b => b.id !== btn.dataset.bookDel);
      save(); render();
    });
  });
  document.querySelectorAll('[data-log-pages]').forEach(btn => {
    btn.addEventListener('click', () => {
      const bookId = btn.dataset.logPages;
      const input = document.getElementById(`pages-input-${bookId}`);
      const pages = parseInt(input?.value);
      if (!pages || pages <= 0) return;
      const b = state.data.books.find(x => x.id === bookId);
      if (!b) return;
      b.pagesRead = Math.min(b.totalPages || 9999, (b.pagesRead || 0) + pages);
      if (b.pagesRead >= b.totalPages) b.status = 'done';
      save(); render();
    });
  });

  // Media
  document.getElementById('add-media')?.addEventListener('click', openAddMedia);
  document.querySelectorAll('[data-media-tab]').forEach(btn => {
    btn.addEventListener('click', () => { mediaTab = btn.dataset.mediaTab; render(); });
  });
  document.querySelectorAll('[data-media-edit]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openEditMedia(btn.dataset.mediaEdit); });
  });
  document.querySelectorAll('[data-media-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (!confirm('Удалить?')) return;
      state.data.media = state.data.media.filter(m => m.id !== btn.dataset.mediaDel);
      save(); render();
    });
  });
  document.querySelectorAll('[data-media-done]').forEach(btn => {
    btn.addEventListener('click', () => {
      const m = state.data.media.find(x => x.id === btn.dataset.mediaDone);
      if (m) { m.status = 'done'; m.dateDone = todayKey(); save(); render(); }
    });
  });

  // Shopping
  document.getElementById('add-shop-item')?.addEventListener('click', openAddShoppingItem);
  document.querySelectorAll('[data-shop-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const item = state.data.shopping.items.find(i => i.id === el.dataset.shopToggle);
      if (item) { item.done = !item.done; save(); render(); }
    });
  });
  document.querySelectorAll('[data-shop-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      state.data.shopping.items = state.data.shopping.items.filter(i => i.id !== btn.dataset.shopDel);
      save(); render();
    });
  });
  document.getElementById('clear-bought')?.addEventListener('click', () => {
    state.data.shopping.items = state.data.shopping.items.filter(i => !i.done);
    save(); render();
  });

  // My Recipes: add
  document.getElementById('add-my-recipe')?.addEventListener('click', openAddMyRecipe);

  // My Recipes: edit
  document.querySelectorAll('[data-recipe-edit]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openEditMyRecipe(btn.dataset.recipeEdit);
    });
  });

  // My Recipes: delete
  document.querySelectorAll('[data-recipe-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (!confirm('Удалить рецепт?')) return;
      state.data.cooking.myRecipes = state.data.cooking.myRecipes.filter(r => r.id !== btn.dataset.recipeDel);
      save(); render();
    });
  });
}

function bindModalEvents() {
  document.getElementById('modal-save-wake')?.addEventListener('click', () => {
    const val = document.getElementById('modal-wake-input')?.value;
    if (val) { getTodayData().wakeTime = val; save(); closeModal(); render(); }
  });
  document.getElementById('modal-save-bed')?.addEventListener('click', () => {
    const val = document.getElementById('modal-bed-input')?.value;
    if (val) { getTodayData().bedTime = val; save(); closeModal(); render(); }
  });

  document.querySelectorAll('.cat-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempCat = btn.dataset.cat;
      document.querySelectorAll('.cat-btn[data-cat]').forEach(b => b.classList.toggle('selected', b.dataset.cat === tempCat));
    });
  });

  document.querySelectorAll('.cat-btn[data-instrument]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempInstrument = btn.dataset.instrument;
      document.querySelectorAll('.cat-btn[data-instrument]').forEach(b => b.classList.toggle('selected', b.dataset.instrument === tempInstrument));
    });
  });

  document.querySelectorAll('.cat-btn[data-workout]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempWorkout = btn.dataset.workout;
      document.querySelectorAll('.cat-btn[data-workout]').forEach(b => b.classList.toggle('selected', b.dataset.workout === tempWorkout));
    });
  });

  document.getElementById('save-workout')?.addEventListener('click', () => {
    const notes = (document.getElementById('workout-notes')?.value || '').trim();
    let dayData;
    if (editingWorkoutKey) {
      if (!state.data.daily[editingWorkoutKey]) {
        state.data.daily[editingWorkoutKey] = { habits: {}, times: {}, sweets: 0, wakeTime: null, bedTime: null };
      }
      dayData = state.data.daily[editingWorkoutKey];
      editingWorkoutKey = null;
    } else {
      dayData = getTodayData();
    }
    dayData.workout = { type: tempWorkout, notes };
    dayData.habits['sport'] = true;
    save(); closeModal(); render();
  });

  document.getElementById('save-expense')?.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('expense-amount')?.value);
    const note   = (document.getElementById('expense-note')?.value||'').trim();
    if (!amount || amount <= 0) { document.getElementById('expense-amount')?.focus(); return; }
    if (editingExpenseId) {
      const e = state.data.finance.expenses.find(x => x.id === editingExpenseId);
      if (e) { e.amount = amount; e.category = tempCat; e.note = note; }
      editingExpenseId = null;
    } else {
      state.data.finance.expenses.push({ id: uid(), date: todayKey(), amount, category: tempCat, note });
    }
    save(); closeModal(); render();
  });

  document.getElementById('save-budget')?.addEventListener('click', () => {
    state.data.finance.monthlyBudget = parseFloat(document.getElementById('budget-input')?.value)||0;
    state.data.finance.savingsGoal   = parseFloat(document.getElementById('savings-goal-input')?.value)||0;
    save(); closeModal(); render();
  });

  document.getElementById('save-savings')?.addEventListener('click', () => {
    state.data.finance.savingsCurrent = parseFloat(document.getElementById('savings-now-input')?.value)||0;
    const goal = document.getElementById('savings-goal-input2')?.value;
    if (goal !== undefined) state.data.finance.savingsGoal = parseFloat(goal)||0;
    save(); closeModal(); render();
  });

  document.getElementById('save-doctor')?.addEventListener('click', () => {
    const name = (document.getElementById('doctor-name-input')?.value||'').trim();
    if (!name) return;
    const spec = (document.getElementById('doctor-spec-input')?.value||'').trim();
    state.data.health.doctors.push({ id: uid(), name, specialty: spec||'Специалист', icon: '🏥', status: 'needed' });
    save(); closeModal(); render();
  });

  // Priority picker in task modal
  document.querySelectorAll('[data-priority]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempPriority = btn.dataset.priority;
      document.querySelectorAll('[data-priority]').forEach(b => {
        b.classList.toggle('selected', b.dataset.priority === tempPriority);
      });
    });
  });

  document.getElementById('save-task')?.addEventListener('click', () => {
    const title = (document.getElementById('task-title')?.value || '').trim();
    if (!title) { document.getElementById('task-title')?.focus(); return; }
    const desc     = (document.getElementById('task-desc')?.value || '').trim();
    const deadline = document.getElementById('task-deadline')?.value || null;
    if (!state.data.tasks) state.data.tasks = [];

    if (editingTaskId) {
      // Edit existing
      const t = state.data.tasks.find(t => t.id === editingTaskId);
      if (t) { t.title = title; t.description = desc; t.deadline = deadline || null; t.priority = tempPriority; }
      editingTaskId = null;
    } else {
      // Add new
      state.data.tasks.push({ id: uid(), title, description: desc, deadline: deadline || null, priority: tempPriority, done: false });
    }
    save(); closeModal(); render();
  });

  // Star rating picker in recipe modal
  document.querySelectorAll('.star-btn[data-star]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = parseInt(btn.dataset.star);
      tempRecipeRating = tempRecipeRating === s ? 0 : s;
      document.querySelectorAll('.star-btn[data-star]').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.star) <= tempRecipeRating);
      });
    });
  });

  // Diff picker in custom dish modal
  let tempDiff = 1;
  document.querySelectorAll('.cat-btn[data-diff]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempDiff = parseInt(btn.dataset.diff);
      document.querySelectorAll('.cat-btn[data-diff]').forEach(b => b.classList.toggle('selected', parseInt(b.dataset.diff) === tempDiff));
    });
  });

  document.getElementById('save-custom-dish')?.addEventListener('click', () => {
    const name = (document.getElementById('custom-dish-name')?.value || '').trim();
    const catId = document.getElementById('custom-dish-cat')?.value;
    if (!name) { document.getElementById('custom-dish-name')?.focus(); return; }
    const id = 'c_' + uid();
    state.data.cooking.customDishes.push({ id, catId, name, d: tempDiff });
    save(); closeModal(); render();
  });

  document.getElementById('save-my-recipe')?.addEventListener('click', () => {
    const title = (document.getElementById('my-recipe-title')?.value || '').trim();
    if (!title) { document.getElementById('my-recipe-title')?.focus(); return; }
    const text = (document.getElementById('my-recipe-text')?.value || '').trim();
    if (editingMyRecipeId) {
      const r = state.data.cooking.myRecipes.find(x => x.id === editingMyRecipeId);
      if (r) { r.title = title; r.text = text; r.rating = tempRecipeRating; }
      editingMyRecipeId = null;
    } else {
      state.data.cooking.myRecipes.push({ id: uid(), title, text, rating: tempRecipeRating });
    }
    save(); closeModal(); render();
  });

  // Income category picker
  document.querySelectorAll('[data-income-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempIncomeCat = btn.dataset.incomeCat;
      document.querySelectorAll('[data-income-cat]').forEach(b => b.classList.toggle('selected', b.dataset.incomeCat === tempIncomeCat));
    });
  });

  document.getElementById('save-income')?.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('income-amount')?.value);
    if (!amount || amount <= 0) { document.getElementById('income-amount')?.focus(); return; }
    const note = (document.getElementById('income-note')?.value || '').trim();
    state.data.finance.income.push({ id: uid(), date: todayKey(), amount, category: tempIncomeCat, note });
    save(); closeModal(); render();
  });

  document.getElementById('save-monthly-plan')?.addEventListener('click', () => {
    const key = getMonthPlanKey();
    if (!state.data.finance.monthlyPlans) state.data.finance.monthlyPlans = {};
    const plan = {};
    CATEGORIES.forEach(cat => {
      const val = parseFloat(document.getElementById(`plan-${cat.id}`)?.value) || 0;
      if (val > 0) plan[cat.id] = val;
    });
    state.data.finance.monthlyPlans[key] = plan;
    save(); closeModal(); render();
  });

  // Book status picker
  document.querySelectorAll('[data-book-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempBookStatus = btn.dataset.bookStatus;
      document.querySelectorAll('[data-book-status]').forEach(b => b.classList.toggle('selected', b.dataset.bookStatus === tempBookStatus));
    });
  });

  document.getElementById('save-book')?.addEventListener('click', () => {
    const title = (document.getElementById('book-title')?.value || '').trim();
    if (!title) { document.getElementById('book-title')?.focus(); return; }
    const author = (document.getElementById('book-author')?.value || '').trim();
    const totalPages = parseInt(document.getElementById('book-pages')?.value) || 0;
    if (editingBookId) {
      const b = state.data.books.find(x => x.id === editingBookId);
      if (b) { b.title = title; b.author = author; b.totalPages = totalPages; b.status = tempBookStatus; b.rating = tempRecipeRating; }
      editingBookId = null;
    } else {
      state.data.books.push({ id: uid(), title, author, totalPages, status: tempBookStatus, pagesRead: 0, rating: 0 });
    }
    save(); closeModal(); render();
  });

  // Media type / status pickers
  document.querySelectorAll('[data-media-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempMediaType = btn.dataset.mediaType;
      document.querySelectorAll('[data-media-type]').forEach(b => b.classList.toggle('selected', b.dataset.mediaType === tempMediaType));
    });
  });
  document.querySelectorAll('[data-media-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempMediaStatus = btn.dataset.mediaStatus;
      document.querySelectorAll('[data-media-status]').forEach(b => b.classList.toggle('selected', b.dataset.mediaStatus === tempMediaStatus));
    });
  });

  document.getElementById('save-media')?.addEventListener('click', () => {
    const title = (document.getElementById('media-title')?.value || '').trim();
    if (!title) { document.getElementById('media-title')?.focus(); return; }
    if (editingMediaId) {
      const m = state.data.media.find(x => x.id === editingMediaId);
      if (m) { m.title = title; m.type = tempMediaType; m.status = tempMediaStatus; m.rating = tempRecipeRating;
        if (tempMediaStatus === 'done' && !m.dateDone) m.dateDone = todayKey();
      }
      editingMediaId = null;
    } else {
      state.data.media.push({ id: uid(), title, type: tempMediaType, status: tempMediaStatus,
        rating: 0, dateAdded: todayKey(), dateDone: tempMediaStatus === 'done' ? todayKey() : null });
    }
    save(); closeModal(); render();
  });

  // Shopping cat / priority pickers
  document.querySelectorAll('[data-shop-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempShoppingCat = btn.dataset.shopCat;
      document.querySelectorAll('[data-shop-cat]').forEach(b => b.classList.toggle('selected', b.dataset.shopCat === tempShoppingCat));
    });
  });
  document.querySelectorAll('[data-shop-priority]').forEach(btn => {
    btn.addEventListener('click', () => {
      tempPriority = btn.dataset.shopPriority;
      document.querySelectorAll('[data-shop-priority]').forEach(b => b.classList.toggle('selected', b.dataset.shopPriority === tempPriority));
    });
  });

  document.getElementById('save-shop-item')?.addEventListener('click', () => {
    const name = (document.getElementById('shop-name')?.value || '').trim();
    if (!name) { document.getElementById('shop-name')?.focus(); return; }
    state.data.shopping.items.push({ id: uid(), name, category: tempShoppingCat, priority: tempPriority, done: false });
    save(); closeModal(); render();
  });

  document.getElementById('save-goal')?.addEventListener('click', () => {
    const title = (document.getElementById('goal-title')?.value||'').trim();
    const date  = document.getElementById('goal-date')?.value;
    if (!title || !date) return;
    state.data.goals.push({
      id: uid(),
      title,
      instrument: tempInstrument,
      targetDate: date,
      steps: SONG_STEPS.map((name, i) => ({ id: `s${i}`, name, done: false })),
    });
    save(); closeModal(); render();
  });
}

// ============================================================
// NAVIGATION
// ============================================================

function setupNav() {
  document.getElementById('bottom-nav').addEventListener('click', e => {
    const btn = e.target.closest('.nav-btn');
    if (btn?.dataset.page) { state.page = btn.dataset.page; window.scrollTo(0,0); render(); }
  });
}

function registerSW() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
}

function init() {
  state.data = loadData();
  setupNav();
  render();
  registerSW();
}

document.addEventListener('DOMContentLoaded', init);
