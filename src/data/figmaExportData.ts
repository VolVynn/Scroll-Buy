export interface ComponentVariant {
  name: string;
  state: 'default' | 'hover' | 'pressed' | 'focus' | 'disabled' | 'error' | 'loading' | 'empty' | 'active';
  label: string;
  previewSvg: string;
  description: string;
}

export interface DetailedComponentGroup {
  id: string;
  title: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'states' | 'patterns';
  description: string;
  variants: ComponentVariant[];
  doRule: string;
  dontRule: string;
}

export const STATES_SPEC_TABLE = [
  {
    state: 'default',
    meaning: 'звичайний вигляд (стан спокою)',
    example: 'кнопка в спокої, ненатиснута, поле без фокусу, звичайна картка товару',
    color: '#4F6C73',
  },
  {
    state: 'hover',
    meaning: 'наведено курсор (веб і десктоп)',
    example: 'кнопка темнішає на 10%, з’являється легка тінь, картка злегка підіймається',
    color: '#3d555b',
  },
  {
    state: 'pressed',
    meaning: 'елемент натиснуто (активний дотик)',
    example: 'кнопка темніша, злегка «втиснута» (scale-[0.98]), темніша обводка',
    color: '#30454a',
  },
  {
    state: 'focus',
    meaning: 'елемент вибрано з клавіатури або тапом',
    example: 'помітна контрастна рамка навколо кнопки/поля (#4F6C73 або ring-2 #FEDF82)',
    color: '#A7E4F2',
  },
  {
    state: 'disabled',
    meaning: 'дія зараз заблокована / недоступна',
    example: 'сіре тло (#EAEAEA), сірий текст (#A6A6A6), відсутність клікабельності',
    color: '#A6A6A6',
  },
  {
    state: 'error',
    meaning: 'введено неправильні дані або збій',
    example: 'червона рамка поля (#AB3336), іконка трикутника та чіткий текст помилки під полем',
    color: '#AB3336',
  },
  {
    state: 'loading',
    meaning: 'система обробляє запит користувача',
    example: 'обертовий спінер замість тексту кнопки («Оформлення...», «Публікація...»)',
    color: '#4F6C73',
  },
  {
    state: 'empty',
    meaning: 'даних у списку ще немає',
    example: 'порожній список замовлень або чатів з тематичною ілюстрацією та підказкою дії',
    color: '#A6A6A6',
  },
];

export const COMPREHENSIVE_COMPONENT_GROUPS: DetailedComponentGroup[] = [
  // 1. АТОМИ (ATOMS)
  {
    id: 'btn-primary-large',
    title: 'КНОПКА · PRIMARY (Головна дія)',
    category: 'atoms',
    description: 'Основна дія на екрані («Забронювати», «Перейти до оформлення», «Підтвердити угоду»). Використовує фірмовий токен primary-100 (#A7E4F2) або primary-600 (#4F6C73).',
    doRule: 'Одна головна кнопка на екрані; дієслово в наказовій формі або інфінітиві. Контраст не менше 4.5:1.',
    dontRule: 'Не ставити поруч дві однакові Primary-кнопки та не використовувати розмиті тексти («ОК», «Далі») — це спричиняє когнітивний дисонанс (закон Хіка), ускладнює вибір дії та призводить до випадкових помилкових замовлень чи списань.',
    variants: [
      {
        name: 'DEFAULT',
        state: 'default',
        label: 'Забронювати',
        description: 'Звичайний вигляд у спокої',
        previewSvg: `<svg width="180" height="44" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="44" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
          <text x="90" y="27" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>
        </svg>`,
      },
      {
        name: 'HOVER',
        state: 'hover',
        label: 'Забронювати (Hover)',
        description: 'Наведення курсору (темнішає на 10%)',
        previewSvg: `<svg width="180" height="44" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="44" rx="2" fill="#92D8E8" stroke="#3D555B" stroke-width="1.5"/>
          <text x="90" y="27" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>
        </svg>`,
      },
      {
        name: 'PRESSED',
        state: 'pressed',
        label: 'Забронювати (Pressed)',
        description: 'Натиснуто (втиснута scale-[0.98])',
        previewSvg: `<svg width="180" height="44" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="176" height="40" rx="2" fill="#7DCFE2" stroke="#30454A" stroke-width="2"/>
          <text x="90" y="26" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>
        </svg>`,
      },
      {
        name: 'FOCUS',
        state: 'focus',
        label: 'Забронювати (Focus)',
        description: 'Фокус із клавіатури з акцентною обводкою',
        previewSvg: `<svg width="180" height="44" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="44" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="2"/>
          <rect x="-3" y="-3" width="186" height="50" rx="4" fill="none" stroke="#FEDF82" stroke-width="2"/>
          <text x="90" y="27" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>
        </svg>`,
      },
      {
        name: 'DISABLED',
        state: 'disabled',
        label: 'Забронювати (Disabled)',
        description: 'Дія заблокована',
        previewSvg: `<svg width="180" height="44" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="44" rx="2" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1"/>
          <text x="90" y="27" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>
        </svg>`,
      },
      {
        name: 'LOADING',
        state: 'loading',
        label: 'Бронюємо...',
        description: 'Спінер замість тексту під час запиту',
        previewSvg: `<svg width="180" height="44" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="44" rx="2" fill="#4F6C73"/>
          <circle cx="45" cy="22" r="6" stroke="#A7E4F2" stroke-width="2" stroke-dasharray="25 8"/>
          <text x="102" y="26" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Бронюємо...</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'btn-secondary-ghost',
    title: 'КНОПКА · SECONDARY & GHOST (Другорядні дії)',
    category: 'atoms',
    description: 'Контурні кнопки та текстові посилання («Написати продавцю», «Скасувати», «Редагувати профіль»).',
    doRule: 'Використовувати поруч із Primary для альтернативної дії або відмови від кроку.',
    dontRule: 'Не робити кнопку відмови яскравішою або контрастнішою за збереження — це руйнує візуальну ієрархію, відволікає від цільової конверсії та провокує випадкове скасування заповнених форм.',
    variants: [
      {
        name: 'OUTLINE DEFAULT',
        state: 'default',
        label: 'Написати продавцю',
        description: 'Контурна рамка #4F6C73',
        previewSvg: `<svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="40" rx="2" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
          <text x="90" y="25" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Написати продавцю</text>
        </svg>`,
      },
      {
        name: 'OUTLINE HOVER',
        state: 'hover',
        label: 'Написати продавцю (Hover)',
        description: 'Підсвітка фону #F2F2F2',
        previewSvg: `<svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="40" rx="2" fill="#F0F9FB" stroke="#4F6C73" stroke-width="1.5"/>
          <text x="90" y="25" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Написати продавцю</text>
        </svg>`,
      },
      {
        name: 'GHOST CANCEL',
        state: 'default',
        label: 'Скасувати',
        description: 'Текстова кнопка відмови (#AB3336)',
        previewSvg: `<svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="70" y="21" fill="#AB3336" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Скасувати</text>
        </svg>`,
      },
      {
        name: 'GHOST HOVER',
        state: 'hover',
        label: 'Скасувати (Hover)',
        description: 'Підкреслення при наведенні',
        previewSvg: `<svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="70" y="21" fill="#8B1E21" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Скасувати</text>
          <line x1="38" y1="25" x2="102" y2="25" stroke="#8B1E21" stroke-width="1.5"/>
        </svg>`,
      },
    ],
  },

  {
    id: 'btn-icon-floating',
    title: 'ІКОНКИ-КНОПКИ ТА РЕАКЦІЇ (Icon Buttons)',
    category: 'atoms',
    description: 'Круглі плаваючі кнопки дій у відеострічці та модальних вікнах (Лайк, Закладка, Поділитися, Закрити, Назад).',
    doRule: 'Забезпечувати мінімальну площу дотику 44x44px на сенсорних екранах для легкого тапу пальцем.',
    dontRule: 'Не робити область дотику менше 44x44px (або розмір менше 36px без відступів) — це порушує стандарт доступності WCAG 2.1 Target Size, викликає промахи пальцем на сенсорних екранах і дратує користувача під час перегляду стрічки.',
    variants: [
      {
        name: 'LIKE DEFAULT',
        state: 'default',
        label: 'Лайк (Спокій)',
        description: 'Біла контурна іконка',
        previewSvg: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="24" r="20" fill="rgba(0,0,0,0.4)"/>
          <path d="M 30 32 L 23 25 C 20 22 20 18 23 16 C 26 14 29 16 30 18 C 31 16 34 14 37 16 C 40 18 40 22 37 25 Z" stroke="#FFFFFF" stroke-width="2" fill="none"/>
          <text x="30" y="52" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1.4k</text>
        </svg>`,
      },
      {
        name: 'LIKE ACTIVE',
        state: 'active',
        label: 'Лайк (Активний)',
        description: 'Червоне заповнення #AB3336',
        previewSvg: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="24" r="20" fill="rgba(0,0,0,0.4)"/>
          <path d="M 30 32 L 23 25 C 20 22 20 18 23 16 C 26 14 29 16 30 18 C 31 16 34 14 37 16 C 40 18 40 22 37 25 Z" stroke="#AB3336" stroke-width="2" fill="#AB3336"/>
          <text x="30" y="52" fill="#FEDF82" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1.4k</text>
        </svg>`,
      },
      {
        name: 'BOOKMARK ACTIVE',
        state: 'active',
        label: 'Закладка (Збережено)',
        description: 'Акцентний колір #A7E4F2',
        previewSvg: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="24" r="20" fill="rgba(0,0,0,0.4)"/>
          <path d="M 24 16 L 36 16 L 36 32 L 30 27 L 24 32 Z" fill="#A7E4F2" stroke="#A7E4F2" stroke-width="1.5"/>
          <text x="30" y="52" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">382</text>
        </svg>`,
      },
      {
        name: 'CLOSE ROUND',
        state: 'default',
        label: 'Закрити (Хрестик)',
        description: 'Кругла кнопка модалки',
        previewSvg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M 14 14 L 26 26 M 26 14 L 14 26" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
      },
    ],
  },

  {
    id: 'input-fields',
    title: 'ПОЛЕ ВВОДУ ТА ВАЛІДАЦІЯ (Input Field)',
    category: 'atoms',
    description: 'Текстове поле для вводу назви, ціни, телефону чи опису. Має чітку візуальну ієрархію між лейблом, плейсхолдером і текстом помилки.',
    doRule: 'Підсвічувати помилку кольором #AB3336 та обов’язково додавати іконку трикутника і зрозумілий текст пояснення («Номер має містити 12 цифр»).',
    dontRule: 'Не обмежуватися лише червоною рамкою без текстового пояснення помилки та не скидати введені дані — це викликає розгубленість у користувача, змушує його повторно вводити весь текст і різко збільшує відтік з форми замовлення.',
    variants: [
      {
        name: 'DEFAULT',
        state: 'default',
        label: 'Телефон',
        description: 'Звичайний стан з плейсхолдером',
        previewSvg: `<svg width="220" height="66" viewBox="0 0 220 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="12" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="600">Телефон</text>
          <rect y="18" width="220" height="38" rx="2" fill="#FAFAFA" stroke="#D1D5DB" stroke-width="1"/>
          <text x="10" y="42" fill="#A6A6A6" font-family="Overpass, sans-serif" font-size="12">+380 __ ___ __ __</text>
        </svg>`,
      },
      {
        name: 'FOCUS',
        state: 'focus',
        label: 'Телефон (активний ввід)',
        description: 'Рамка primary-600 #4F6C73',
        previewSvg: `<svg width="220" height="66" viewBox="0 0 220 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="12" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Телефон</text>
          <rect y="18" width="220" height="38" rx="2" fill="#FFFFFF" stroke="#4F6C73" stroke-width="2"/>
          <text x="10" y="42" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="12">+380 67 |</text>
        </svg>`,
      },
      {
        name: 'ERROR',
        state: 'error',
        label: 'Помилка валідації',
        description: 'Рамка #AB3336 + повідомлення з іконкою',
        previewSvg: `<svg width="220" height="66" viewBox="0 0 220 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="12" fill="#AB3336" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Телефон</text>
          <rect y="18" width="220" height="34" rx="2" fill="#FFF5F5" stroke="#AB3336" stroke-width="1.5"/>
          <text x="10" y="39" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="12">+380 67 12</text>
          <text x="0" y="62" fill="#AB3336" font-family="Overpass, sans-serif" font-size="10">Δ Номер має містити 12 цифр</text>
        </svg>`,
      },
      {
        name: 'DISABLED',
        state: 'disabled',
        label: 'Заблоковане поле',
        description: 'Сіре тло, нередаговане',
        previewSvg: `<svg width="220" height="66" viewBox="0 0 220 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="12" fill="#A6A6A6" font-family="Open Sans, sans-serif" font-size="11" font-weight="600">Телефон</text>
          <rect y="18" width="220" height="38" rx="2" fill="#EAEAEA" stroke="#D0D0D0" stroke-width="1"/>
          <text x="10" y="42" fill="#A6A6A6" font-family="Overpass, sans-serif" font-size="12">+380 67 123 45 67</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'checkbox-switch',
    title: 'ЧЕКБОКС ТА ПЕРЕМИКАЧ (Checkbox & Switch)',
    category: 'atoms',
    description: 'Елементи бінарного вибору (згода з правилами сервісу Scroll & Buy, перемикання опцій, статусів).',
    doRule: 'Чекбокс повинен мати клікабельну текстову мітку, а стан помилки має чітко підсвічувати рамку червоним.',
    dontRule: 'Не робити чекбокс і перемикач менше 20x20px та без клікабельного текстового лейблу — користувачу важко поцілити пальцем у дрібний елемент, що блокує прийняття оферти або перемикання налаштувань сповіщень.',
    variants: [
      {
        name: 'CHECKBOX UNCHECKED',
        state: 'default',
        label: 'Чекбокс (Не вибрано)',
        description: 'Стан спокою',
        previewSvg: `<svg width="240" height="30" viewBox="0 0 240 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="20" rx="3" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
          <text x="32" y="19" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="11">Погоджуюсь з правилами</text>
        </svg>`,
      },
      {
        name: 'CHECKBOX CHECKED',
        state: 'active',
        label: 'Чекбокс (Вибрано)',
        description: 'Фірмове заповнення #4F6C73 з білою галочкою',
        previewSvg: `<svg width="240" height="30" viewBox="0 0 240 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="20" rx="3" fill="#4F6C73" stroke="#4F6C73" stroke-width="1.5"/>
          <path d="M 7 15 L 11 19 L 17 10" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="32" y="19" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="11" font-weight="600">Погоджуюсь з правилами</text>
        </svg>`,
      },
      {
        name: 'CHECKBOX ERROR',
        state: 'error',
        label: 'Чекбокс (Помилка)',
        description: 'Червона рамка #AB3336 при спробі відправки без згоди',
        previewSvg: `<svg width="240" height="30" viewBox="0 0 240 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="20" rx="3" fill="#FFF5F5" stroke="#AB3336" stroke-width="2"/>
          <text x="32" y="19" fill="#AB3336" font-family="Overpass, sans-serif" font-size="11" font-weight="600">Обов’язкове підтвердження</text>
        </svg>`,
      },
      {
        name: 'SWITCH OFF',
        state: 'default',
        label: 'Перемикач (Switch OFF)',
        description: 'Вимкнений стан: нейтральний сірий трек #D1D5DB, білий повзунок ліворуч, підпис ВИМК',
        previewSvg: `<svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="48" height="24" rx="12" fill="#D1D5DB" stroke="#9CA3AF" stroke-width="1"/>
          <circle cx="14" cy="16" r="9" fill="#FFFFFF"/>
          <text x="58" y="20" fill="#6B7280" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">ВИМК</text>
        </svg>`,
      },
      {
        name: 'SWITCH ON',
        state: 'active',
        label: 'Перемикач (Switch ON)',
        description: 'Увімкнений стан: фірмовий трек #4F6C73, акцентний повзунок #A7E4F2 праворуч, підпис УВІМК',
        previewSvg: `<svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="48" height="24" rx="12" fill="#4F6C73" stroke="#3D555B" stroke-width="1"/>
          <circle cx="38" cy="16" r="9" fill="#A7E4F2"/>
          <text x="58" y="20" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">УВІМК</text>
        </svg>`,
      },
      {
        name: 'SWITCH DISABLED',
        state: 'disabled',
        label: 'Перемикач (Заблоковано)',
        description: 'Неактивний вимкнений стан перемикача: приглушене тло #E5E7EB, сірий повзунок #9CA3AF',
        previewSvg: `<svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="48" height="24" rx="12" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1"/>
          <circle cx="14" cy="16" r="9" fill="#9CA3AF"/>
          <text x="58" y="20" fill="#9CA3AF" font-family="Open Sans, sans-serif" font-size="11" font-weight="600">БЛОК</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'badges-chips',
    title: 'СТАТУСНІ БЕЙДЖІ ТА ЧІПСИ (Badges & Chips)',
    category: 'atoms',
    description: 'Компактні індикатори статусу наявності товару, етапу модерації, безпеки угоди та категорійних фільтрів.',
    doRule: 'Використовувати семантичні кольори: Зелений (#7FE176) — успіх/наявність; Жовтий (#FEDF82) — очікування; Червоний (#AB3336) — скасовано.',
    dontRule: 'Не використовувати статичний статусний бейдж як кнопку без стрілки-шеврона чи чіткої мітки дії — це формує оманливий афорданс (affordance), через що користувачі марно тапають на неклікабельний елемент.',
    variants: [
      {
        name: 'IN STOCK',
        state: 'default',
        label: 'В наявності ✓',
        description: 'Зелений бейдж успіху',
        previewSvg: `<svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="110" height="24" rx="3" fill="#E8F9E6" stroke="#7FE176" stroke-width="1"/>
          <text x="55" y="16" fill="#1C6A15" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">В наявності ✓</text>
        </svg>`,
      },
      {
        name: 'PENDING',
        state: 'default',
        label: 'Очікує дію',
        description: 'Жовтий бейдж очікування',
        previewSvg: `<svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="110" height="24" rx="3" fill="#FEF8E7" stroke="#FEDF82" stroke-width="1"/>
          <text x="55" y="16" fill="#926204" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Очікує дію</text>
        </svg>`,
      },
      {
        name: 'CANCELLED',
        state: 'default',
        label: 'Скасовано',
        description: 'Червоний бейдж анулювання',
        previewSvg: `<svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="110" height="24" rx="3" fill="#FFF5F5" stroke="#AB3336" stroke-width="1"/>
          <text x="55" y="16" fill="#AB3336" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Скасовано</text>
        </svg>`,
      },
      {
        name: 'FILTER CHIP ACTIVE',
        state: 'active',
        label: 'Чіпс: Кераміка',
        description: 'Активний фільтр каталогу',
        previewSvg: `<svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="30" rx="15" fill="#4F6C73"/>
          <text x="60" y="19" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Кераміка</text>
        </svg>`,
      },
      {
        name: 'FILTER CHIP DEFAULT',
        state: 'default',
        label: 'Чіпс: Вінтаж',
        description: 'Неактивний фільтр каталогу',
        previewSvg: `<svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="30" rx="15" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
          <text x="60" y="19" fill="#4B5563" font-family="Open Sans, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Вінтаж</text>
        </svg>`,
      },
    ],
  },

  // 2. МОЛЕКУЛИ (MOLECULES)
  {
    id: 'search-bar-molecule',
    title: 'РЯДОК ПОШУКУ (Search Bar Molecule)',
    category: 'molecules',
    description: 'Компонент пошуку з іконкою лупи, плейсхолдером, введенням тексту та кнопкою очищення (Clear X).',
    doRule: 'Показувати кнопку швидкого очищення хрестиком одразу після вводу першого символу.',
    dontRule: 'Не блокувати інтерфейс синхронними запитами під час набору тексту та не затримувати очищення поля — це викликає підвисання клавіатури, стрибки списку результатів (CLS) і погіршує сприйняття швидкодії застосунку.',
    variants: [
      {
        name: 'EMPTY SEARCH',
        state: 'default',
        label: 'Пошук у спокої',
        description: 'Плейсхолдер та іконка лупи',
        previewSvg: `<svg width="300" height="42" viewBox="0 0 300 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="42" rx="3" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
          <circle cx="22" cy="21" r="6" stroke="#4F6C73" stroke-width="1.5"/>
          <line x1="26" y1="25" x2="31" y2="30" stroke="#4F6C73" stroke-width="1.5" stroke-linecap="round"/>
          <text x="38" y="25" fill="#9CA3AF" font-family="Overpass, sans-serif" font-size="12">Пошук товарів, послуг чи майстрів...</text>
        </svg>`,
      },
      {
        name: 'ACTIVE SEARCH WITH CLEAR',
        state: 'focus',
        label: 'Пошук з текстом',
        description: 'Активний запит з кнопкою очищення',
        previewSvg: `<svg width="300" height="42" viewBox="0 0 300 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="42" rx="3" fill="#FFFFFF" stroke="#4F6C73" stroke-width="2"/>
          <circle cx="22" cy="21" r="6" stroke="#4F6C73" stroke-width="1.5"/>
          <line x1="26" y1="25" x2="31" y2="30" stroke="#4F6C73" stroke-width="1.5" stroke-linecap="round"/>
          <text x="38" y="25" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="12" font-weight="600">The Beatles</text>
          <circle cx="280" cy="21" r="9" fill="#E5E7EB"/>
          <path d="M 277 18 L 283 24 M 283 18 L 277 24" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`,
      },
    ],
  },

  {
    id: 'chat-bubble-molecule',
    title: 'ПОВІДОМЛЕННЯ В ЧАТІ (Chat Bubble Molecule)',
    category: 'molecules',
    description: 'Інформаційні бульбашки чату: вхідні від продавця, вихідні від покупця з індикатором прочитання (дві галочки).',
    doRule: 'Вирівнювати власні повідомлення праворуч з акцентним фоном #4F6C73, повідомлення співрозмовника — ліворуч на світлому фоні.',
    dontRule: 'Не приховувати час відправлення та статус прочитання повідомлення — відсутність таймстемпів дезорієнтує учасників безпечної угоди, створює недовіру між покупцем і продавцем та ускладнює арбітраж суперечок.',
    variants: [
      {
        name: 'INCOMING SELLER',
        state: 'default',
        label: 'Вхідне повідомлення',
        description: 'Від продавця з часом',
        previewSvg: `<svg width="260" height="54" viewBox="0 0 260 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="220" height="54" rx="4" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <text x="12" y="22" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="11">Вітаю! Постер в ідеальному стані.</text>
          <text x="12" y="42" fill="#94A3B8" font-family="Overpass, sans-serif" font-size="9">14:22 · @retro_art</text>
        </svg>`,
      },
      {
        name: 'OUTGOING BUYER',
        state: 'default',
        label: 'Вихідне повідомлення',
        description: 'Від покупця з галочками прочитання',
        previewSvg: `<svg width="260" height="54" viewBox="0 0 260 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(40, 0)">
            <rect width="220" height="54" rx="4" fill="#4F6C73"/>
            <text x="12" y="22" fill="#FFFFFF" font-family="Overpass, sans-serif" font-size="11">Чудово! Оформлюю через картку.</text>
            <text x="160" y="44" fill="#A7E4F2" font-family="Overpass, sans-serif" font-size="9">14:23</text>
            <path d="M 188 41 L 191 44 L 196 38 M 192 41 L 195 44 L 200 38" stroke="#A7E4F2" stroke-width="1.2" stroke-linecap="round"/>
          </g>
        </svg>`,
      },
    ],
  },

  {
    id: 'booking-slot-molecule',
    title: 'СЛОТ БРОНЮВАННЯ (Booking Slot Molecule)',
    category: 'molecules',
    description: 'Картка вибору часу для локальних послуг (манікюр, гончарство, фотосесія).',
    doRule: 'Чітко вказувати час, тривалість сеансу, фіксовану вартість і статус зайнятості.',
    dontRule: 'Не залишати заброньовані іншими клієнтами слоти візуально активними чи клікабельними — це веде до випадкового овербукінгу, конфліктів розкладу майстра та розчарування клієнтів.',
    variants: [
      {
        name: 'SLOT AVAILABLE',
        state: 'default',
        label: 'Вільний слот',
        description: 'Доступно для запису',
        previewSvg: `<svg width="240" height="64" viewBox="0 0 240 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="64" rx="3" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
          <text x="14" y="26" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="700">14:00 – 15:30</text>
          <text x="14" y="46" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="11">Майстер-клас · 450 ₴</text>
          <rect x="150" y="16" width="76" height="32" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
          <text x="188" y="36" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Запис</text>
        </svg>`,
      },
      {
        name: 'SLOT BOOKED',
        state: 'disabled',
        label: 'Зайнятий слот',
        description: 'Вже заброньовано',
        previewSvg: `<svg width="240" height="64" viewBox="0 0 240 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="64" rx="3" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
          <text x="14" y="26" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="13" font-weight="700">10:00 – 11:30</text>
          <text x="14" y="46" fill="#94A3B8" font-family="Overpass, sans-serif" font-size="11">Зайнято (Клієнт: Марія В.)</text>
          <rect x="150" y="16" width="76" height="32" rx="2" fill="#E2E8F0"/>
          <text x="188" y="36" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Зайнято</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'upload-dropzone-molecule',
    title: 'ЗОНА ЗАВАНТАЖЕННЯ МЕДІА (Media Dropzone Molecule)',
    category: 'molecules',
    description: 'Інтерактивна зона Drag-and-drop для фото або відео оголошення з індикацією стану.',
    doRule: 'Показувати допустимі формати (JPG, PNG, MP4 до 100MB) та статус прогресу.',
    dontRule: 'Не приховувати причину невдалого завантаження медіафайлу (ліміт ваги, формат, обрив мережі) — без повідомлення про причину користувач повторюватиме помилкову дію або залишить публікацію незавершеною.',
    variants: [
      {
        name: 'DROPZONE DEFAULT',
        state: 'default',
        label: 'Зона очікування файлу',
        description: 'Пунктирна рамка #4F6C73',
        previewSvg: `<svg width="260" height="90" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="260" height="90" rx="4" fill="#F8FAFC" stroke="#4F6C73" stroke-width="1.5" stroke-dasharray="6 4"/>
          <circle cx="130" cy="32" r="14" fill="#A7E4F2" fill-opacity="0.3"/>
          <path d="M 130 25 L 130 39 M 124 31 L 130 25 L 136 31" stroke="#4F6C73" stroke-width="2" stroke-linecap="round"/>
          <text x="130" y="60" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Перетягніть відео або фото</text>
          <text x="130" y="76" fill="#64748B" font-family="Overpass, sans-serif" font-size="9" text-anchor="middle">MP4 або JPG до 100 MB</text>
        </svg>`,
      },
      {
        name: 'DROPZONE OFFLINE ERROR',
        state: 'error',
        label: 'Помилка з’єднання',
        description: 'Червоний банер обриву зв’язку',
        previewSvg: `<svg width="260" height="90" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="260" height="90" rx="4" fill="#FEF2F2" stroke="#AB3336" stroke-width="1.5"/>
          <text x="130" y="36" fill="#AB3336" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Втрачено з’єднання з інтернетом</text>
          <text x="130" y="54" fill="#991B1B" font-family="Overpass, sans-serif" font-size="9" text-anchor="middle">Завантаження призупинено. Спробуйте знову.</text>
          <rect x="85" y="62" width="90" height="20" rx="2" fill="#AB3336"/>
          <text x="130" y="76" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Повторити</text>
        </svg>`,
      },
    ],
  },

  // 3. ОРГАНІЗМИ (ORGANISMS)
  {
    id: 'product-grid-card-organism',
    title: 'КАРТКА ТОВАРУ У СІТЦІ (Product Grid Card)',
    category: 'organisms',
    description: 'Картка каталогу та пошуку з фотографією товару, бейджем, автором, назвою, ціною та швидким CTA.',
    doRule: 'Зображення займає 65-70% площі; чітка табелярна ціна жирним шрифтом Open Sans.',
    dontRule: 'Не перевантажувати міні-картку у сітці довгими абзацами опису — це погіршує сканування каталогу оком, ламає вирівнювання сітки товарів та відволікає від фото й ціни.',
    variants: [
      {
        name: 'GRID CARD POSTER',
        state: 'default',
        label: 'Картка The Beatles',
        description: 'Постер у каталозі',
        previewSvg: `<svg width="180" height="240" viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="240" rx="4" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <rect x="8" y="8" width="164" height="130" rx="3" fill="#243338"/>
          <text x="90" y="75" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">BEATLES POSTER</text>
          <rect x="14" y="14" width="75" height="18" rx="2" fill="#E8F9E6"/>
          <text x="51" y="27" fill="#166534" font-family="Open Sans, sans-serif" font-size="8" font-weight="700" text-anchor="middle">В наявності</text>
          <text x="10" y="158" fill="#64748B" font-family="Overpass, sans-serif" font-size="9">@retro_art</text>
          <text x="10" y="174" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">The Beatles Poster</text>
          <text x="10" y="196" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="15" font-weight="900">14.99 €</text>
          <rect x="8" y="206" width="164" height="26" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
          <text x="90" y="223" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Купити</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'product-card-modal-organism',
    title: 'ПОВНА КАРТКА ТОВАРУ PDP (Product Detail Modal Variant 2)',
    category: 'organisms',
    description: 'Головна картка товару згідно з Варіантом 2 макетів Figma: шапка, зображення, бейдж наявності, блок майстра з рейтингом, опис, гарантія безпеки та CTA.',
    doRule: 'Обов’язково показувати статус наявності, аватар та рейтинг майстра, умови доставки та гарантію повернення.',
    dontRule: 'Не ховати фінальну вартість та умови доставки до останнього кроку — приховані комісії підривають довіру до платформи Scroll & Buy і є однією з головних причин покинутих кошиків.',
    variants: [
      {
        name: 'PRODUCT PDP MODAL',
        state: 'default',
        label: 'Повна модальна картка PDP',
        description: 'Варіант 2 з макетів Figma',
        previewSvg: `<svg width="340" height="260" viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="340" height="260" rx="4" fill="#FFFFFF" stroke="#4F6C73" stroke-width="2"/>
          <rect width="340" height="34" fill="#4F6C73"/>
          <text x="12" y="22" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">← PRODUCT CARD</text>
          <rect x="12" y="46" width="100" height="130" rx="2" fill="#243338"/>
          <text x="62" y="115" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">BEATLES</text>
          <text x="124" y="64" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="700">The Beatles Poster</text>
          <text x="124" y="80" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="10">В наявності ✓ · Львів, Україна</text>
          <text x="124" y="104" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="18" font-weight="900">14.99 €</text>
          <rect x="124" y="114" width="204" height="28" rx="2" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="132" y="132" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="9">★ 4.9 (128 відгуків) · Захист Scroll &amp; Buy</text>
          <rect x="12" y="186" width="316" height="30" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
          <text x="170" y="205" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">PROCEED TO PURCHASE →</text>
          <text x="170" y="240" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Написати продавцю</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'trade-card-organism',
    title: 'КАРТКА УГОДИ В ЧАТІ (Trade Card #TR-8492)',
    category: 'organisms',
    description: 'Офіційна картка укладання безпечної угоди в чаті згідно з дослідженнями Лабораторної роботи №1. Має 3 задокументовані стани: Очікує підтвердження, Підтверджено та Скасовано (анульовано).',
    doRule: 'Завжди показувати ідентифікатор #TR, статусний бейдж, фіксовану суму та захисний код підтвердження.',
    dontRule: 'Не дозволяти змінювати суму чи реквізити після переходу картки у статус «Підтверджено», а після скасування — не залишати кнопки підтвердження активними — це гарантує фінансову безпеку ескроу, захищає від шахрайських маніпуляцій та запобігає повторному списанню коштів за анульовану угоду.',
    variants: [
      {
        name: 'TRADE PENDING',
        state: 'default',
        label: 'Угода (Очікує підтвердження)',
        description: 'Жовтий статус, активні кнопки дій',
        previewSvg: `<svg width="340" height="190" viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="340" height="190" rx="4" fill="#FFFFFF" stroke="#4F6C73" stroke-width="2"/>
          <rect width="340" height="30" fill="#4F6C73"/>
          <text x="12" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">КАРТКА УГОДИ #TR-8492</text>
          <rect x="220" y="6" width="110" height="18" rx="2" fill="#FEDF82"/>
          <text x="275" y="19" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Очікує дію</text>
          <text x="14" y="54" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">The Beatles Poster (14.99 €)</text>
          <text x="14" y="72" fill="#64748B" font-family="Overpass, sans-serif" font-size="10">Продавець: @retro_art · Покупець: Анна К.</text>
          <rect x="14" y="86" width="312" height="26" rx="2" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="20" y="103" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="9">Кошти депонуються захищеним ескроу Scroll &amp; Buy</text>
          <rect x="14" y="122" width="312" height="34" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
          <text x="170" y="143" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">ПІДТВЕРДИТИ УГОДУ</text>
          <text x="170" y="174" fill="#AB3336" font-family="Overpass, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Скасувати замовлення</text>
        </svg>`,
      },
      {
        name: 'TRADE CONFIRMED',
        state: 'active',
        label: 'Угода (Підтверджено)',
        description: 'Зелена рамка, захисний код С&Б-8492',
        previewSvg: `<svg width="340" height="190" viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="340" height="190" rx="4" fill="#FFFFFF" stroke="#7FE176" stroke-width="2"/>
          <rect width="340" height="30" fill="#4F6C73"/>
          <text x="12" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">КАРТКА УГОДИ #TR-8492</text>
          <rect x="220" y="6" width="110" height="18" rx="2" fill="#7FE176"/>
          <text x="275" y="19" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Підтверджено ✓</text>
          <text x="14" y="54" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">The Beatles Poster (14.99 €)</text>
          <rect x="14" y="70" width="312" height="60" rx="2" fill="#E8F9E6" stroke="#7FE176"/>
          <text x="170" y="94" fill="#166534" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Угоду зафіксовано в системі</text>
          <text x="170" y="114" fill="#4B5563" font-family="Overpass, sans-serif" font-size="9" text-anchor="middle">Код перевірки: С&amp;Б-8492-ЗАХИСТ</text>
          <text x="170" y="160" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="10" text-anchor="middle">Товар готується до відправки</text>
        </svg>`,
      },
      {
        name: 'TRADE CANCELLED',
        state: 'error',
        label: 'Угода (Скасовано)',
        description: 'Червоний статус, повернення коштів ескроу',
        previewSvg: `<svg width="340" height="190" viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="340" height="190" rx="4" fill="#FFFFFF" stroke="#AB3336" stroke-width="2"/>
          <rect width="340" height="30" fill="#4F6C73"/>
          <text x="12" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">КАРТКА УГОДИ #TR-8492</text>
          <rect x="220" y="6" width="110" height="18" rx="2" fill="#AB3336"/>
          <text x="275" y="19" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Скасовано ✕</text>
          <text x="14" y="52" fill="#64748B" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-decoration="line-through">The Beatles Poster (14.99 €)</text>
          <text x="14" y="68" fill="#94A3B8" font-family="Overpass, sans-serif" font-size="10">Продавець: @retro_art · Покупець: Анна К.</text>
          <rect x="14" y="78" width="312" height="62" rx="2" fill="#FEF2F2" stroke="#FECDD3"/>
          <text x="22" y="96" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">✕ Угоду скасовано стороною угоди</text>
          <text x="22" y="112" fill="#B91C1C" font-family="Overpass, sans-serif" font-size="9">Кошти депонованого ескроу розблоковано та повернено покупцю.</text>
          <text x="22" y="128" fill="#7F1D1D" font-family="monospace" font-size="9" font-weight="700">Код транзакції: REFUND-TR-8492-ESCROW</text>
          <rect x="14" y="148" width="190" height="30" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
          <text x="109" y="167" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Повторити замовлення</text>
          <rect x="212" y="148" width="114" height="30" rx="2" fill="#FFFFFF" stroke="#D1D5DB"/>
          <text x="269" y="167" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Підтримка</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'navigation-tabbar-organism',
    title: 'НИЖНЯ ПАНЕЛЬ НАВІГАЦІЇ (Navigation Tab Bar)',
    category: 'organisms',
    description: 'Реальний мобільний таб-бар NavigationTabBar на 5 розділів (H=56px): 1) Стрічка (Home), 2) Пошук (Search), 3) Центральна піднята кругла кнопка (+ Додати) в акцентному колі 40×40px кольору #4F6C73 з білою рамкою 2px та іконкою PlusCircle, 4) Чати (MessageSquare з червоним круглим бейджем #AB3336 очікування угод) та 5) Кабінет (User). Світла тема: фон #FFFFFF, border-t #A6A6A6/30, активний колір #4F6C73. Темна тема: фон #181F22, border-t #2C353D, активний #A7E4F2. Відповідає вимогам мобільної ергономіки з Лекції 5 (Слайд 30: 3–5 головних розділів, завжди під пальцем).',
    doRule: 'Фіксована висота 56px, іконки 20–22px, центральна піднята кнопка 40×40px, підписи шрифтом Open Sans 10px; активний таб підсвічується кольором #4F6C73 (світла) або #A7E4F2 (темна).',
    dontRule: 'Не перекривати нижнім таб-баром кнопки оформлення замовлення, діалогові вікна чи мобільну клавіатуру — користувач втрачає змогу завершити оплату або надіслати повідомлення, що повністю ламає конверсійний сценарій.',
    variants: [
      {
        name: 'TABBAR: FEED ACTIVE',
        state: 'default',
        label: 'Стрічка активна (Світла тема)',
        description: 'Стрічка #4F6C73, центральна піднята кнопка + Додати, чати з бейджем',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          
          <!-- Tab 1: Feed (Active) -->
          <path d="M 35 12 L 25 20 L 28 20 L 28 30 L 32 30 L 32 24 L 38 24 L 38 30 L 42 30 L 42 20 L 45 20 Z" fill="#4F6C73"/>
          <text x="35" y="44" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Стрічка</text>
          
          <!-- Tab 2: Search -->
          <circle cx="102" cy="20" r="6" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <line x1="106.5" y1="24.5" x2="111" y2="29" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>
          <text x="104" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
          
          <!-- Tab 3: Central Elevated + Button -->
          <circle cx="175" cy="16" r="18" fill="#4F6C73" stroke="#FFFFFF" stroke-width="2.5"/>
          <line x1="175" y1="10" x2="175" y2="22" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="169" y1="16" x2="181" y2="16" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="44" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <!-- Tab 4: Chats with Badge -->
          <path d="M 252 23 C 252 24.1 251.1 25 250 25 L 242 25 L 238 29 L 238 15 C 238 13.9 238.9 13 240 13 L 250 13 C 251.1 13 252 13.9 252 15 Z" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="253" cy="12" r="4.5" fill="#AB3336"/>
          <text x="253" y="15.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">1</text>
          <text x="246" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Чати</text>

          <!-- Tab 5: Profile (Кабінет) -->
          <circle cx="315" cy="16" r="3.8" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <path d="M 307 29 C 307 25 310.5 23 315 23 C 319.5 23 323 25 323 29" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
      {
        name: 'TABBAR: SEARCH ACTIVE',
        state: 'active',
        label: 'Пошук активний (Світла тема)',
        description: 'Пошук #4F6C73, Стрічка неактивна',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          
          <path d="M 26 20.5 L 35 13 L 44 20.5 L 44 30 L 39 30 L 39 24 L 31 24 L 31 30 L 26 30 Z" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linejoin="round"/>
          <text x="35" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Стрічка</text>
          
          <circle cx="102" cy="20" r="6" stroke="#4F6C73" stroke-width="2.4" fill="none"/>
          <line x1="106.5" y1="24.5" x2="111" y2="29" stroke="#4F6C73" stroke-width="2.4" stroke-linecap="round"/>
          <text x="104" y="44" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Пошук</text>
          
          <circle cx="175" cy="16" r="18" fill="#4F6C73" stroke="#FFFFFF" stroke-width="2.5"/>
          <line x1="175" y1="10" x2="175" y2="22" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="169" y1="16" x2="181" y2="16" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="44" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <path d="M 252 23 C 252 24.1 251.1 25 250 25 L 242 25 L 238 29 L 238 15 C 238 13.9 238.9 13 240 13 L 250 13 C 251.1 13 252 13.9 252 15 Z" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="253" cy="12" r="4.5" fill="#AB3336"/>
          <text x="253" y="15.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">1</text>
          <text x="246" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Чати</text>

          <circle cx="315" cy="16" r="3.8" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <path d="M 307 29 C 307 25 310.5 23 315 23 C 319.5 23 323 25 323 29" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
      {
        name: 'TABBAR: PROFILE ACTIVE',
        state: 'active',
        label: 'Кабінет активний (Світла тема)',
        description: 'Кабінет підсвічено #4F6C73, перехід до профілю',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          
          <path d="M 26 20.5 L 35 13 L 44 20.5 L 44 30 L 39 30 L 39 24 L 31 24 L 31 30 L 26 30 Z" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linejoin="round"/>
          <text x="35" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Стрічка</text>
          
          <circle cx="102" cy="20" r="6" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <line x1="106.5" y1="24.5" x2="111" y2="29" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>
          <text x="104" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
          
          <circle cx="175" cy="16" r="18" fill="#4F6C73" stroke="#FFFFFF" stroke-width="2.5"/>
          <line x1="175" y1="10" x2="175" y2="22" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="169" y1="16" x2="181" y2="16" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="44" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <path d="M 252 23 C 252 24.1 251.1 25 250 25 L 242 25 L 238 29 L 238 15 C 238 13.9 238.9 13 240 13 L 250 13 C 251.1 13 252 13.9 252 15 Z" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="253" cy="12" r="4.5" fill="#AB3336"/>
          <text x="253" y="15.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">1</text>
          <text x="246" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Чати</text>

          <circle cx="315" cy="16" r="3.8" stroke="#4F6C73" stroke-width="2.4" fill="rgba(79,108,115,0.15)"/>
          <path d="M 307 29 C 307 25 310.5 23 315 23 C 319.5 23 323 25 323 29" stroke="#4F6C73" stroke-width="2.4" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
      {
        name: 'TABBAR: CHATS ACTIVE',
        state: 'active',
        label: 'Чати активні (Світла тема)',
        description: 'Розділ Чати активний, червоний бейдж з цифрою 2',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          
          <path d="M 26 20.5 L 35 13 L 44 20.5 L 44 30 L 39 30 L 39 24 L 31 24 L 31 30 L 26 30 Z" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linejoin="round"/>
          <text x="35" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Стрічка</text>
          
          <circle cx="102" cy="20" r="6" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <line x1="106.5" y1="24.5" x2="111" y2="29" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>
          <text x="104" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
          
          <circle cx="175" cy="16" r="18" fill="#4F6C73" stroke="#FFFFFF" stroke-width="2.5"/>
          <line x1="175" y1="10" x2="175" y2="22" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="169" y1="16" x2="181" y2="16" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="44" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <path d="M 252 23 C 252 24.1 251.1 25 250 25 L 242 25 L 238 29 L 238 15 C 238 13.9 238.9 13 240 13 L 250 13 C 251.1 13 252 13.9 252 15 Z" fill="rgba(79,108,115,0.15)" stroke="#4F6C73" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="253" cy="12" r="4.5" fill="#AB3336"/>
          <text x="253" y="15.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">2</text>
          <text x="246" y="44" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Чати</text>

          <circle cx="315" cy="16" r="3.8" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <path d="M 307 29 C 307 25 310.5 23 315 23 C 319.5 23 323 25 323 29" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
      {
        name: 'TABBAR: DARK THEME',
        state: 'active',
        label: 'Стрічка активна (Темна тема)',
        description: 'Темний фон #161B1E, активний таб Стрічка кольору #A7E4F2',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#161B1E" stroke="#2C353D" stroke-width="1"/>
          
          <path d="M 35 12 L 25 20 L 28 20 L 28 30 L 32 30 L 32 24 L 38 24 L 38 30 L 42 30 L 42 20 L 45 20 Z" fill="#A7E4F2"/>
          <text x="35" y="44" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Стрічка</text>
          
          <circle cx="102" cy="20" r="6" stroke="#94A3B8" stroke-width="1.8" fill="none"/>
          <line x1="106.5" y1="24.5" x2="111" y2="29" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
          <text x="104" y="44" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
          
          <circle cx="175" cy="16" r="18" fill="#4F6C73" stroke="#161B1E" stroke-width="2.5"/>
          <line x1="175" y1="10" x2="175" y2="22" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="169" y1="16" x2="181" y2="16" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="44" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <path d="M 252 23 C 252 24.1 251.1 25 250 25 L 242 25 L 238 29 L 238 15 C 238 13.9 238.9 13 240 13 L 250 13 C 251.1 13 252 13.9 252 15 Z" fill="none" stroke="#94A3B8" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="253" cy="12" r="4.5" fill="#AB3336"/>
          <text x="253" y="15.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">1</text>
          <text x="246" y="44" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Чати</text>

          <circle cx="315" cy="16" r="3.8" stroke="#94A3B8" stroke-width="1.8" fill="none"/>
          <path d="M 307 29 C 307 25 310.5 23 315 23 C 319.5 23 323 25 323 29" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
      {
        name: 'TABBAR: DARK THEME',
        state: 'active',
        label: 'Пошук активний (Темна тема)',
        description: 'Темний фон #161B1E, активний таб Пошук кольору #A7E4F2',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#161B1E" stroke="#2C353D" stroke-width="1"/>
          
          <path d="M 35 13 L 26.5 21 L 28.5 21 L 28.5 31 L 33 31 L 33 24.5 L 37 24.5 L 37 31 L 41.5 31 L 41.5 21 L 43.5 21 Z" fill="#64748B"/>
          <text x="35" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Стрічка</text>
          
          <circle cx="102" cy="21" r="5.5" stroke="#A7E4F2" stroke-width="2.4" fill="none"/>
          <line x1="106" y1="25" x2="111" y2="30" stroke="#A7E4F2" stroke-width="2.4" stroke-linecap="round"/>
          <text x="104" y="44" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Пошук</text>
          
          <circle cx="175" cy="20" r="18" fill="#4F6C73" stroke="#2C353D" stroke-width="2"/>
          <line x1="175" y1="13" x2="175" y2="27" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="168" y1="20" x2="182" y2="20" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="46" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <rect x="238" y="15" width="16" height="12" rx="2" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <path d="M 242 27 L 240 31 L 246 27 Z" fill="#64748B"/>
          <circle cx="254" cy="13" r="4.5" fill="#AB3336"/>
          <text x="254" y="16.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">1</text>
          <text x="246" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Чати</text>

          <circle cx="315" cy="18" r="4.5" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <path d="M 307 31 C 307 26.5 323 26.5 323 31" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
      {
        name: 'TABBAR: DARK THEME',
        state: 'active',
        label: 'Чати активні (Темна тема)',
        description: 'Темний фон #161B1E, активний таб Чати кольору #A7E4F2',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#161B1E" stroke="#2C353D" stroke-width="1"/>
          
          <path d="M 35 13 L 26.5 21 L 28.5 21 L 28.5 31 L 33 31 L 33 24.5 L 37 24.5 L 37 31 L 41.5 31 L 41.5 21 L 43.5 21 Z" fill="#64748B"/>
          <text x="35" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Стрічка</text>
          
          <circle cx="102" cy="21" r="5.5" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <line x1="106" y1="25" x2="111" y2="30" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>
          <text x="104" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
          
          <circle cx="175" cy="20" r="18" fill="#4F6C73" stroke="#2C353D" stroke-width="2"/>
          <line x1="175" y1="13" x2="175" y2="27" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="168" y1="20" x2="182" y2="20" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="46" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <rect x="238" y="15" width="16" height="12" rx="2" stroke="#A7E4F2" stroke-width="2.4" fill="none"/>
          <path d="M 242 27 L 240 31 L 246 27 Z" fill="#A7E4F2"/>
          <circle cx="254" cy="13" r="4.5" fill="#AB3336"/>
          <text x="254" y="16.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">1</text>
          <text x="246" y="44" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Чати</text>

          <circle cx="315" cy="18" r="4.5" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <path d="M 307 31 C 307 26.5 323 26.5 323 31" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
      {
        name: 'TABBAR: DARK THEME',
        state: 'active',
        label: 'Кабінет активний (Темна тема)',
        description: 'Темний фон #161B1E, активний таб Кабінет кольору #A7E4F2',
        previewSvg: `<svg width="350" height="60" viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="350" height="60" fill="#161B1E" stroke="#2C353D" stroke-width="1"/>
          
          <path d="M 35 13 L 26.5 21 L 28.5 21 L 28.5 31 L 33 31 L 33 24.5 L 37 24.5 L 37 31 L 41.5 31 L 41.5 21 L 43.5 21 Z" fill="#64748B"/>
          <text x="35" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Стрічка</text>
          
          <circle cx="102" cy="21" r="5.5" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <line x1="106" y1="25" x2="111" y2="30" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>
          <text x="104" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
          
          <circle cx="175" cy="20" r="18" fill="#4F6C73" stroke="#2C353D" stroke-width="2"/>
          <line x1="175" y1="13" x2="175" y2="27" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="168" y1="20" x2="182" y2="20" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
          <text x="175" y="46" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

          <rect x="238" y="15" width="16" height="12" rx="2" stroke="#64748B" stroke-width="1.8" fill="none"/>
          <path d="M 242 27 L 240 31 L 246 27 Z" fill="#64748B"/>
          <circle cx="254" cy="13" r="4.5" fill="#AB3336"/>
          <text x="254" y="16.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="6.5" font-weight="900" text-anchor="middle">1</text>
          <text x="246" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Чати</text>

          <circle cx="315" cy="18" r="4.5" stroke="#A7E4F2" stroke-width="2.4" fill="none"/>
          <path d="M 307 31 C 307 26.5 323 26.5 323 31" stroke="#A7E4F2" stroke-width="2.4" stroke-linecap="round" fill="none"/>
          <text x="315" y="44" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Кабінет</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'tiktok-profile-header-organism',
    title: 'ШАПКА ПРОФІЛЮ ПРОДАВЦЯ (TikTok-Style Profile Header)',
    category: 'organisms',
    description: 'Шапка кабінету майстра в стилі TikTok з аватаром, нікнеймом, статистикою оголошень/переглядів/угод, біо та кнопками дій.',
    doRule: 'Розміщувати метрики (Оголошення, Перегляди, Угоди) у горизонтальному триколонковому блоці.',
    dontRule: 'Не приховувати перемикач ролей між Кабінетом продавця та Профілем покупця — це змушує майстрів шукати налаштування у глибині меню, викликає плутанину в інтерфейсі та блокує швидкий перехід до власних замовлень.',
    variants: [
      {
        name: 'PROFILE HEADER SELLER',
        state: 'default',
        label: 'Шапка профілю TikTok',
        description: 'Аватар, статистика, біо',
        previewSvg: `<svg width="340" height="150" viewBox="0 0 340 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="340" height="150" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="45" cy="45" r="28" fill="#4F6C73"/>
          <text x="45" y="52" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="16" font-weight="700" text-anchor="middle">RV</text>
          <text x="88" y="34" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="700">Retro Vinyl &amp; Art</text>
          <text x="88" y="50" fill="#64748B" font-family="Overpass, sans-serif" font-size="10">@retro_art · Львів</text>
          <g transform="translate(14, 82)">
            <rect width="312" height="34" rx="2" fill="#F8FAFC" stroke="#E2E8F0"/>
            <text x="52" y="22" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">12 оголошень</text>
            <text x="156" y="22" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">8.4k переглядів</text>
            <text x="260" y="22" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">94 угоди</text>
          </g>
          <rect x="14" y="122" width="150" height="22" rx="2" fill="#4F6C73"/>
          <text x="89" y="137" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Редагувати</text>
          <rect x="176" y="122" width="150" height="22" rx="2" fill="#FFFFFF" stroke="#4F6C73"/>
          <text x="251" y="137" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Поділитись</text>
        </svg>`,
      },
    ],
  },

  {
    id: 'empty-states-organism',
    title: 'ПОРОЖНІ СТАНИ (Empty States Organism)',
    category: 'organisms',
    description: 'Стани інтерфейсу, коли дані відсутні (порожній кошик, немає замовлень, відсутні результати пошуку).',
    doRule: 'Завжди супроводжувати дружньою ілюстрацією та кнопкою прямого переходу до каталогу.',
    dontRule: 'Не залишати порожній екран без тематичної ілюстрації та чіткої підказки наступної дії — це створює враження поломки бази даних застосунку, розриває користувацький флоу та провокує вихід із додатку.',
    variants: [
      {
        name: 'EMPTY ORDERS',
        state: 'empty',
        label: 'Порожній список замовлень',
        description: 'Іконка + підказка + перехід до стрічки',
        previewSvg: `<svg width="300" height="110" viewBox="0 0 300 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="110" rx="3" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
          <circle cx="150" cy="30" r="14" fill="#F2F2F2" stroke="#4F6C73" stroke-width="1.5"/>
          <path d="M 145 30 L 155 30" stroke="#4F6C73" stroke-width="2"/>
          <text x="150" y="60" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Поки що немає замовлень</text>
          <text x="150" y="76" fill="#A6A6A6" font-family="Overpass, sans-serif" font-size="10" text-anchor="middle">Знайдіть цікавий хендмейд у стрічці відео</text>
          <rect x="95" y="85" width="110" height="20" rx="2" fill="#A7E4F2"/>
          <text x="150" y="99" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Знайти товари</text>
        </svg>`,
      },
    ],
  },
];

export const FIGMA_TOKENS_JSON = {
  $name: 'Scroll & Buy Design System Tokens',
  $version: '3.0.0',
  color: {
    primary: {
      600: { value: '#4F6C73', type: 'color', description: 'Основний фірмовий бірюзово-сталевий колір' },
      100: { value: '#A7E4F2', type: 'color', description: 'Світлий акцентний блакитний для кнопок і плашок' },
    },
    neutral: {
      900: { value: '#0D0D0D', type: 'color', description: 'Основний темний текст і контрастні елементи' },
      500: { value: '#F2F2F2', type: 'color', description: 'Світле тло сторінок та карток' },
      400: { value: '#A6A6A6', type: 'color', description: 'Другорядний текст і неактивні рамки' },
    },
    semantic: {
      error: { value: '#AB3336', type: 'color', description: 'Помилки валідації та скасування угод' },
      success: { value: '#7FE176', type: 'color', description: 'Підтвердження угоди та наявність товару' },
      warning: { value: '#FEDF82', type: 'color', description: 'Очікування підтвердження та фокусні рамки' },
    },
  },
  typography: {
    heading: {
      fontFamily: { value: 'Open Sans', type: 'fontFamilies' },
      fontWeight: { bold: 700, black: 900 },
    },
    body: {
      fontFamily: { value: 'Overpass', type: 'fontFamilies' },
      fontWeight: { regular: 400, medium: 500, semibold: 600 },
    },
    subtext: {
      fontFamily: { value: 'Sarala', type: 'fontFamilies' },
      fontWeight: { regular: 400 },
    },
  },
  spacing: {
    xs: { value: '4px', type: 'spacing' },
    sm: { value: '8px', type: 'spacing' },
    md: { value: '16px', type: 'spacing' },
    lg: { value: '24px', type: 'spacing' },
    xl: { value: '32px', type: 'spacing' },
    '2xl': { value: '48px', type: 'spacing' },
  },
  borderRadius: {
    none: { value: '0px', type: 'borderRadius' },
    xs: { value: '2px', type: 'borderRadius' },
    sm: { value: '4px', type: 'borderRadius' },
    full: { value: '9999px', type: 'borderRadius' },
  },
};
