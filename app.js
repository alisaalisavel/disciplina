'use strict';

// ============================================================
// CONSTANTS
// ============================================================

const STORAGE_KEY = 'disciplina_v1';

const DAYS = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTH_NAMES = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

const CATEGORIES = [
  { id: 'food',      name: 'Еда',          icon: '🍔' },
  { id: 'transport', name: 'Транспорт',    icon: '🚌' },
  { id: 'clothes',   name: 'Одежда',       icon: '👗' },
  { id: 'fun',       name: 'Развлечения',  icon: '🎉' },
  { id: 'health',    name: 'Здоровье',     icon: '💊' },
  { id: 'home',      name: 'Дом',          icon: '🏠' },
  { id: 'beauty',    name: 'Красота',      icon: '💅' },
  { id: 'other',     name: 'Другое',       icon: '📦' },
];

const COOKING_PLAN = [
  {
    id: 'level1', emoji: '🌱', title: 'Уровень 1 — Основы',
    recipes: [
      { id: 'l1_1', name: 'Яичница-болтунья' },
      { id: 'l1_2', name: 'Омлет' },
      { id: 'l1_3', name: 'Паста с томатным соусом' },
      { id: 'l1_4', name: 'Греческий салат' },
      { id: 'l1_5', name: 'Варёная курица' },
      { id: 'l1_6', name: 'Отварной рис' },
      { id: 'l1_7', name: 'Картошка по-деревенски' },
    ]
  },
  {
    id: 'level2', emoji: '🌿', title: 'Уровень 2 — Готовлю сама',
    recipes: [
      { id: 'l2_1', name: 'Куриный суп' },
      { id: 'l2_2', name: 'Жареная куриная грудка' },
      { id: 'l2_3', name: 'Картофельное пюре' },
      { id: 'l2_4', name: 'Салат Цезарь' },
      { id: 'l2_5', name: 'Тушёные овощи' },
      { id: 'l2_6', name: 'Яичница с помидорами' },
      { id: 'l2_7', name: 'Паста карбонара' },
    ]
  },
  {
    id: 'level3', emoji: '🌸', title: 'Уровень 3 — Уверенный повар',
    recipes: [
      { id: 'l3_1', name: 'Борщ' },
      { id: 'l3_2', name: 'Ризотто' },
      { id: 'l3_3', name: 'Запечённая рыба с овощами' },
      { id: 'l3_4', name: 'Куриное карри' },
      { id: 'l3_5', name: 'Домашняя пицца' },
      { id: 'l3_6', name: 'Блины' },
      { id: 'l3_7', name: 'Запечённая курица целиком' },
    ]
  },
];

// ============================================================
// STATE
// ============================================================

let state = { page: 'today', data: null, modal: null };
let tempCat = 'food';

// ============================================================
// DATA
// ============================================================

function defaultData() {
  return {
    habits: {
      active: [
        { id: 'wake',   name: 'Встала в 5:00',       icon: '🌅' },
        { id: 'sport',  name: 'Спорт',                icon: '💪' },
        { id: 'guitar', name: 'Гитара',               icon: '🎸' },
        { id: 'piano',  name: 'Пианино',              icon: '🎹' },
        { id: 'sugar',  name: 'Меньше сладкого',      icon: '🍫' },
      ],
      queue: [
        { id: 'english',  name: 'Английский',   icon: '🇬🇧' },
        { id: 'solfege',  name: 'Сольфеджио',   icon: '🎵' },
        { id: 'singing',  name: 'Пение',         icon: '🎤' },
        { id: 'reading',  name: 'Чтение',        icon: '📚' },
      ]
    },
    daily: {},
    finance: {
      monthlyBudget: 0,
      savingsGoal: 0,
      savingsCurrent: 0,
      expenses: [],
    },
    health: {
      doctors: [
        { id: 'd1', name: 'Терапевт',     specialty: 'Общая практика',   icon: '🩺', status: 'needed' },
        { id: 'd2', name: 'Стоматолог',   specialty: 'Зубы',             icon: '🦷', status: 'needed' },
        { id: 'd3', name: 'Гинеколог',    specialty: 'Женское здоровье', icon: '🌸', status: 'needed' },
        { id: 'd4', name: 'Дерматолог',   specialty: 'Кожа',             icon: '✨', status: 'needed' },
        { id: 'd5', name: 'Офтальмолог',  specialty: 'Зрение',           icon: '👁', status: 'needed' },
      ]
    },
    cooking: { learned: [] }
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return defaultData();
}

function save() {
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
    state.data.daily[k] = { habits: {}, wakeTime: null };
    save();
  }
  return state.data.daily[k];
}

function fullDateStr() {
  const d = new Date();
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatMoney(n) {
  return Math.round(n).toLocaleString('ru-RU');
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function parseToMin(t) {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function calcStreak(habitId) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const done = state.data.daily[key]?.habits?.[habitId];
    if (done) {
      streak++;
    } else if (i === 0) {
      // today not yet done — don't break, just skip
    } else {
      break;
    }
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function getLast7Days() {
  const days = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const dd = new Date(d);
    dd.setDate(dd.getDate() - i);
    const key = `${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}-${String(dd.getDate()).padStart(2,'0')}`;
    days.push({ key, label: DAYS[dd.getDay()], data: state.data.daily[key] || null });
  }
  return days;
}

function renderMonthCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const habits = state.data.habits.active;

  // Monday-first: 0=Пн..6=Вс
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;

  const dayLabels = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

  let cells = '';
  // Empty cells before first day
  for (let i = 0; i < firstDow; i++) {
    cells += `<div class="mcell mcell-empty"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayData = state.data.daily[key];
    const isToday = d === now.getDate();
    const isFuture = new Date(year, month, d) > now;

    let level = 'empty';
    let title = '';

    if (!isFuture && dayData) {
      const done = habits.filter(h => dayData.habits?.[h.id]).length;
      const pct = habits.length ? done / habits.length : 0;
      if (pct === 0)       level = 'l0';
      else if (pct < 0.5)  level = 'l1';
      else if (pct < 1)    level = 'l2';
      else                 level = 'l3';
      title = `${done}/${habits.length} привычек`;
    } else if (!isFuture) {
      level = 'l0';
    }

    cells += `<div class="mcell mcell-${level} ${isToday ? 'mcell-today' : ''}" title="${title}">${d}</div>`;
  }

  return `
    <div class="card">
      <div class="card-title">${MONTH_NAMES[month]} ${year}</div>
      <div class="month-dow">
        ${dayLabels.map(l => `<div class="dow-label">${l}</div>`).join('')}
      </div>
      <div class="month-grid">${cells}</div>
      <div class="chart-legend" style="margin-top:12px">
        <div class="legend-dot" style="background:var(--border)"></div> Нет данных
        <div class="legend-dot" style="background:var(--surface2);border:1px solid var(--border);margin-left:8px"></div> 0%
        <div class="legend-dot" style="background:var(--primary-light);margin-left:8px"></div> &lt;50%
        <div class="legend-dot" style="background:var(--primary);margin-left:8px"></div> &lt;100%
        <div class="legend-dot" style="background:var(--primary-dark);margin-left:8px"></div> 100%
      </div>
    </div>
  `;
}

function getMonthExpenses() {
  const d = new Date();
  const prefix = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  return state.data.finance.expenses.filter(e => e.date.startsWith(prefix));
}

function totalSpent() {
  return getMonthExpenses().reduce((s, e) => s + e.amount, 0);
}

function getCat(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

// ============================================================
// RENDER ENGINE
// ============================================================

function render() {
  document.getElementById('app').innerHTML = renderPage();
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === state.page);
  });
  bindEvents();
}

function renderPage() {
  const pages = { today: renderToday, sleep: renderSleep, finance: renderFinance, health: renderHealth, cooking: renderCooking };
  return (pages[state.page] || renderToday)();
}

// ============================================================
// PAGE: TODAY
// ============================================================

function renderToday() {
  const td = getTodayData();
  const habits = state.data.habits.active;
  const queue  = state.data.habits.queue;
  const doneCount = habits.filter(h => td.habits[h.id]).length;
  const pct = habits.length ? Math.round(doneCount / habits.length * 100) : 0;

  const greetings = ['Привет!', 'Доброе утро!', 'Привет, солнышко!', 'Привет, красотка!'];
  const greeting = greetings[new Date().getDay() % greetings.length];

  return `
    <div class="page">
      <div class="page-header">
        <h1>${greeting} 🌸</h1>
        <div class="subtitle">${fullDateStr()}</div>
      </div>

      <div class="card wake-card">
        ${td.wakeTime ? `
          <div class="card-title">Подъём сегодня</div>
          <div class="wake-time-display">${td.wakeTime}</div>
          <div class="wake-status ${td.wakeTime <= '05:30' ? 'good' : 'late'}">
            ${td.wakeTime <= '05:30' ? '✓ Молодец, встала вовремя!' : td.wakeTime <= '07:00' ? '⚡ Почти! Завтра раньше' : '😴 Завтра обязательно встанем'}
          </div>
          <button class="btn btn-secondary btn-sm" style="margin-top:14px" id="change-wake">Изменить время</button>
        ` : `
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
          return `
            <div class="habit-item ${done ? 'done' : ''}" data-habit="${h.id}">
              <div class="habit-checkbox"></div>
              <span class="habit-icon">${h.icon}</span>
              <span class="habit-name">${h.name}</span>
              ${streak > 0 ? `<span class="habit-streak ${streak >= 7 ? 'hot' : ''}">🔥 ${streak}</span>` : ''}
            </div>
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

  const withTime = days.filter(d => d.data?.wakeTime);
  const avgMin = withTime.length
    ? Math.round(withTime.reduce((s, d) => s + parseToMin(d.data.wakeTime), 0) / withTime.length)
    : null;

  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const t = days[i].data?.wakeTime;
    if (t && t <= '06:30') streak++;
    else if (days[i].key !== todayKey()) break;
  }

  const times = days.map(d => d.data?.wakeTime ? parseToMin(d.data.wakeTime) : null);
  const validTimes = times.filter(Boolean);
  const maxT = validTimes.length ? Math.max(...validTimes, 420) : 420; // at least 7:00
  const minT = validTimes.length ? Math.min(...validTimes, 280) : 280; // at least 4:40

  function minToStr(m) {
    return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
  }

  return `
    <div class="page">
      <div class="page-header">
        <h1>Сон 🌙</h1>
        <div class="subtitle">Цель подъёма: 5:00</div>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-value">${streak}</div>
          <div class="stat-label">🔥 Стрик</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="font-size:18px">${avgMin !== null ? minToStr(avgMin) : '—'}</div>
          <div class="stat-label">Среднее</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${withTime.length}/7</div>
          <div class="stat-label">Зафиксировано</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Сегодня</div>
        ${td.wakeTime ? `
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div>
              <div style="font-size:40px;font-weight:700;color:var(--primary-dark);letter-spacing:-1px">${td.wakeTime}</div>
              <div class="muted" style="font-size:13px;margin-top:4px">
                ${td.wakeTime <= '05:00' ? '✓ Идеально!' : td.wakeTime <= '06:00' ? '⚡ Почти в цели' : td.wakeTime <= '07:00' ? '😐 Ещё работаем' : '😴 Совсем поздно'}
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" id="change-wake-sleep">Изменить</button>
          </div>
        ` : `
          <div class="wake-input-wrap" style="padding:4px 0">
            <input type="time" class="time-input" id="wake-input-sleep" value="${new Date().toTimeString().slice(0,5)}">
            <button class="btn btn-primary" id="save-wake-sleep">Сохранить подъём</button>
          </div>
        `}
      </div>

      <div class="card">
        <div class="card-title">Последние 7 дней</div>
        <div class="sleep-chart">
          ${days.map(d => {
            const tMin = d.data?.wakeTime ? parseToMin(d.data.wakeTime) : null;
            const range = maxT - minT || 60;
            const pct = tMin ? Math.max(8, Math.min(100, (tMin - minT) / range * 100)) : 0;
            const good = tMin && d.data.wakeTime <= '06:30';
            return `
              <div class="chart-col">
                <div class="chart-bar-wrap">
                  <div class="chart-bar ${tMin ? (good ? 'good' : '') : 'empty'}" style="height:${pct}%"></div>
                </div>
                <div class="chart-day">${d.label}</div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="chart-legend">
          <div class="legend-dot" style="background:var(--primary)"></div> До 6:30
          <div class="legend-dot" style="background:var(--primary-light);margin-left:8px"></div> Позже
          <div class="legend-dot" style="background:var(--border);margin-left:8px"></div> Не записано
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// PAGE: FINANCE
// ============================================================

function renderFinance() {
  const { finance } = state.data;
  const spent = totalSpent();
  const budget = finance.monthlyBudget || 0;
  const pct = budget ? Math.min(100, Math.round(spent / budget * 100)) : 0;
  const remaining = budget - spent;
  const savPct = finance.savingsGoal ? Math.min(100, Math.round(finance.savingsCurrent / finance.savingsGoal * 100)) : 0;
  const now = new Date();
  const monthName = MONTH_NAMES[now.getMonth()];

  const recent = getMonthExpenses()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  return `
    <div class="page">
      <div class="page-header">
        <h1>Финансы 💸</h1>
        <div class="subtitle">${monthName} ${now.getFullYear()}</div>
      </div>

      <div class="card">
        <div class="card-title">Бюджет месяца</div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:24px;font-weight:700;${pct > 90 ? 'color:#C62828' : ''}">
            ${formatMoney(spent)} ₸
          </span>
          <span class="muted" style="font-size:13px">из ${formatMoney(budget)} ₸</span>
        </div>
        <div class="progress-wrap" style="margin-bottom:10px">
          <div class="progress-bar ${pct > 90 ? 'danger' : ''}" style="width:${pct}%"></div>
        </div>
        <div style="font-size:13px;${remaining < 0 ? 'color:#C62828;font-weight:600' : 'color:var(--text-muted)'}">
          ${remaining >= 0
            ? `Осталось: ${formatMoney(remaining)} ₸`
            : `Превышение на ${formatMoney(-remaining)} ₸ 😱`}
        </div>
        <button class="btn btn-secondary btn-sm" style="margin-top:12px" id="open-budget-settings">⚙️ Настроить бюджет</button>
      </div>

      <div class="card">
        <div class="card-title">Накопления</div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:24px;font-weight:700;color:var(--success-text)">${formatMoney(finance.savingsCurrent)} ₸</span>
          <span class="muted" style="font-size:13px">цель: ${formatMoney(finance.savingsGoal)} ₸</span>
        </div>
        <div class="progress-wrap" style="margin-bottom:10px">
          <div class="progress-bar success" style="width:${savPct}%"></div>
        </div>
        <div style="font-size:13px;color:var(--text-muted)">${savPct}% от цели</div>
        <button class="btn btn-secondary btn-sm" style="margin-top:12px" id="open-savings">+ Пополнить</button>
      </div>

      <button class="btn btn-primary btn-full" id="open-add-expense">+ Добавить трату</button>

      ${recent.length > 0 ? `
        <div class="card" style="margin-top:14px">
          <div class="card-title">Последние траты</div>
          ${recent.map(e => {
            const cat = getCat(e.category);
            return `
              <div class="expense-item">
                <div class="expense-icon">${cat.icon}</div>
                <div class="expense-info">
                  <div class="expense-note">${e.note || cat.name}</div>
                  <div class="expense-meta">${cat.name} · ${formatDate(e.date)}</div>
                </div>
                <div class="expense-amount">−${formatMoney(e.amount)} ₸</div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="empty-state" style="margin-top:16px">
          <div class="empty-icon">💸</div>
          <p>Трат ещё нет.<br>Добавь первую!</p>
        </div>
      `}
    </div>
  `;
}

// ============================================================
// PAGE: HEALTH
// ============================================================

function renderHealth() {
  const { doctors } = state.data.health;
  const needed    = doctors.filter(d => d.status === 'needed').length;
  const scheduled = doctors.filter(d => d.status === 'scheduled').length;
  const done      = doctors.filter(d => d.status === 'done').length;

  return `
    <div class="page">
      <div class="page-header">
        <h1>Здоровье 🌿</h1>
        <div class="subtitle">Твои врачи</div>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-value danger-text">${needed}</div>
          <div class="stat-label">Нужно</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color:#BF360C">${scheduled}</div>
          <div class="stat-label">Записана</div>
        </div>
        <div class="stat-box">
          <div class="stat-value success-text">${done}</div>
          <div class="stat-label">Сходила ✓</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Врачи — нажми, чтобы изменить статус</div>
        ${doctors.map(d => `
          <div class="doctor-item">
            <div class="doctor-icon">${d.icon}</div>
            <div class="doctor-info">
              <div class="doctor-name">${d.name}</div>
              <div class="doctor-specialty">${d.specialty}</div>
            </div>
            <div class="doctor-status">
              <span class="status-badge ${d.status}">
                ${d.status === 'needed' ? 'Нужно' : d.status === 'scheduled' ? 'Записана' : '✓ Сходила'}
              </span>
              <button class="status-cycle-btn" data-doctor="${d.id}">изменить →</button>
            </div>
          </div>
        `).join('')}
      </div>

      <button class="btn btn-secondary btn-full" id="add-doctor">+ Добавить врача</button>
    </div>
  `;
}

// ============================================================
// PAGE: COOKING
// ============================================================

function renderCooking() {
  const { learned } = state.data.cooking;
  const totalAll     = COOKING_PLAN.reduce((s, l) => s + l.recipes.length, 0);
  const totalLearned = learned.length;

  const l1Done = COOKING_PLAN[0].recipes.filter(r => learned.includes(r.id)).length;
  const l2Done = COOKING_PLAN[1].recipes.filter(r => learned.includes(r.id)).length;
  const l1Half = Math.ceil(COOKING_PLAN[0].recipes.length / 2);
  const l2Half = Math.ceil(COOKING_PLAN[1].recipes.length / 2);

  return `
    <div class="page">
      <div class="page-header">
        <h1>Кулинария 🍳</h1>
        <div class="subtitle">${totalLearned} из ${totalAll} рецептов освоено</div>
      </div>

      <div class="progress-wrap" style="margin-bottom:20px">
        <div class="progress-bar" style="width:${Math.round(totalLearned/totalAll*100)}%"></div>
      </div>

      ${COOKING_PLAN.map((level, idx) => {
        const lvlLearned = level.recipes.filter(r => learned.includes(r.id)).length;
        const lvlPct = Math.round(lvlLearned / level.recipes.length * 100);
        const locked = (idx === 1 && l1Done < l1Half) || (idx === 2 && l2Done < l2Half);

        return `
          <div class="card ${locked ? 'locked-level' : ''}">
            <div class="level-header">
              <div class="level-title">${level.emoji} ${level.title}</div>
              <div class="level-progress-text">${lvlLearned}/${level.recipes.length}</div>
            </div>
            <div class="progress-wrap" style="margin-bottom:${locked ? 8 : 14}px">
              <div class="progress-bar" style="width:${lvlPct}%"></div>
            </div>
            ${locked ? `
              <div class="muted center" style="font-size:13px;padding:8px 0">
                🔒 Освой ещё ${idx === 1 ? l1Half - l1Done : l2Half - l2Done} рецептов из предыдущего уровня
              </div>
            ` : `
              ${level.recipes.map(r => `
                <div class="recipe-item ${learned.includes(r.id) ? 'learned' : ''}" data-recipe="${r.id}">
                  <div class="recipe-checkbox"></div>
                  <span class="recipe-name">${r.name}</span>
                </div>
              `).join('')}
            `}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ============================================================
// MODALS
// ============================================================

function openModal(html) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-root';
  overlay.innerHTML = `<div class="modal"><div class="modal-handle"></div>${html}</div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  bindModalEvents();
}

function closeModal() {
  document.getElementById('modal-root')?.remove();
}

function openWakeModal() {
  const td = getTodayData();
  openModal(`
    <h2>Время подъёма</h2>
    <div class="form-group">
      <label class="form-label">Во сколько встала?</label>
      <input type="time" class="form-input" id="modal-wake-input" value="${td.wakeTime || new Date().toTimeString().slice(0,5)}">
    </div>
    <button class="btn btn-primary btn-full" id="modal-save-wake">Сохранить</button>
  `);
}

function openAddExpense() {
  tempCat = 'food';
  openModal(`
    <h2>Новая трата</h2>
    <div class="form-group">
      <label class="form-label">Категория</label>
      <div class="category-grid" id="cat-grid">
        ${CATEGORIES.map(c => `
          <button class="cat-btn ${c.id === tempCat ? 'selected' : ''}" data-cat="${c.id}">
            <span class="cat-icon">${c.icon}</span>
            ${c.name}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Сумма (₸)</label>
      <input type="number" class="form-input" id="expense-amount" placeholder="0" inputmode="numeric" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Комментарий (необязательно)</label>
      <input type="text" class="form-input" id="expense-note" placeholder="Кофе, кино...">
    </div>
    <button class="btn btn-primary btn-full" id="save-expense">Добавить</button>
  `);
}

function openBudgetSettings() {
  const { finance } = state.data;
  openModal(`
    <h2>Настройки бюджета</h2>
    <div class="form-group">
      <label class="form-label">Бюджет на месяц (₸)</label>
      <input type="number" class="form-input" id="budget-input" value="${finance.monthlyBudget || ''}" placeholder="150 000" inputmode="numeric">
    </div>
    <div class="form-group">
      <label class="form-label">Цель накоплений (₸)</label>
      <input type="number" class="form-input" id="savings-goal-input" value="${finance.savingsGoal || ''}" placeholder="500 000" inputmode="numeric">
    </div>
    <button class="btn btn-primary btn-full" id="save-budget">Сохранить</button>
  `);
}

function openSavings() {
  const { finance } = state.data;
  openModal(`
    <h2>Пополнить накопления</h2>
    <div style="text-align:center;margin-bottom:16px;color:var(--text-muted);font-size:14px">
      Сейчас: ${formatMoney(finance.savingsCurrent)} ₸ из ${formatMoney(finance.savingsGoal)} ₸
    </div>
    <div class="form-group">
      <label class="form-label">Текущая сумма накоплений (₸)</label>
      <input type="number" class="form-input" id="savings-now-input" value="${finance.savingsCurrent || ''}" placeholder="0" inputmode="numeric">
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

// ============================================================
// EVENT BINDING
// ============================================================

function bindEvents() {
  // Habit toggles
  document.querySelectorAll('.habit-item').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.habit;
      const td = getTodayData();
      td.habits[id] = !td.habits[id];
      save();
      render();
    });
  });

  // Wake time — today page inline
  document.getElementById('save-wake')?.addEventListener('click', () => {
    const val = document.getElementById('wake-input')?.value;
    if (val) { getTodayData().wakeTime = val; save(); render(); }
  });

  document.getElementById('change-wake')?.addEventListener('click', openWakeModal);

  // Wake time — sleep page inline
  document.getElementById('save-wake-sleep')?.addEventListener('click', () => {
    const val = document.getElementById('wake-input-sleep')?.value;
    if (val) { getTodayData().wakeTime = val; save(); render(); }
  });

  document.getElementById('change-wake-sleep')?.addEventListener('click', openWakeModal);

  // Finance
  document.getElementById('open-add-expense')?.addEventListener('click', openAddExpense);
  document.getElementById('open-budget-settings')?.addEventListener('click', openBudgetSettings);
  document.getElementById('open-savings')?.addEventListener('click', openSavings);

  // Health
  document.querySelectorAll('.status-cycle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const doc = state.data.health.doctors.find(d => d.id === btn.dataset.doctor);
      if (!doc) return;
      const cycle = ['needed', 'scheduled', 'done'];
      doc.status = cycle[(cycle.indexOf(doc.status) + 1) % cycle.length];
      save(); render();
    });
  });

  document.getElementById('add-doctor')?.addEventListener('click', openAddDoctor);

  // Cooking recipe toggles
  document.querySelectorAll('.recipe-item').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.recipe;
      const { learned } = state.data.cooking;
      const idx = learned.indexOf(id);
      if (idx >= 0) learned.splice(idx, 1);
      else learned.push(id);
      save(); render();
    });
  });
}

function bindModalEvents() {
  // Wake modal save
  document.getElementById('modal-save-wake')?.addEventListener('click', () => {
    const val = document.getElementById('modal-wake-input')?.value;
    if (val) { getTodayData().wakeTime = val; save(); closeModal(); render(); }
  });

  // Category selection in expense modal
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tempCat = btn.dataset.cat;
      document.querySelectorAll('.cat-btn').forEach(b =>
        b.classList.toggle('selected', b.dataset.cat === tempCat)
      );
    });
  });

  // Save expense
  document.getElementById('save-expense')?.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('expense-amount')?.value);
    const note   = (document.getElementById('expense-note')?.value || '').trim();
    if (!amount || amount <= 0) { document.getElementById('expense-amount')?.focus(); return; }
    state.data.finance.expenses.push({ id: uid(), date: todayKey(), amount, category: tempCat, note });
    save(); closeModal(); render();
  });

  // Save budget settings
  document.getElementById('save-budget')?.addEventListener('click', () => {
    state.data.finance.monthlyBudget = parseFloat(document.getElementById('budget-input')?.value) || 0;
    state.data.finance.savingsGoal   = parseFloat(document.getElementById('savings-goal-input')?.value) || 0;
    save(); closeModal(); render();
  });

  // Save savings
  document.getElementById('save-savings')?.addEventListener('click', () => {
    state.data.finance.savingsCurrent = parseFloat(document.getElementById('savings-now-input')?.value) || 0;
    save(); closeModal(); render();
  });

  // Save doctor
  document.getElementById('save-doctor')?.addEventListener('click', () => {
    const name = (document.getElementById('doctor-name-input')?.value || '').trim();
    if (!name) return;
    const spec = (document.getElementById('doctor-spec-input')?.value || '').trim();
    state.data.health.doctors.push({ id: uid(), name, specialty: spec || 'Специалист', icon: '🏥', status: 'needed' });
    save(); closeModal(); render();
  });
}

// ============================================================
// NAVIGATION
// ============================================================

function setupNav() {
  document.getElementById('bottom-nav').addEventListener('click', e => {
    const btn = e.target.closest('.nav-btn');
    if (btn && btn.dataset.page) {
      state.page = btn.dataset.page;
      window.scrollTo(0, 0);
      render();
    }
  });
}

// ============================================================
// SERVICE WORKER
// ============================================================

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// ============================================================
// INIT
// ============================================================

function init() {
  state.data = loadData();
  setupNav();
  render();
  registerSW();
}

document.addEventListener('DOMContentLoaded', init);
