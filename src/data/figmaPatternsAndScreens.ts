import { DetailedComponentGroup, ComponentVariant } from './figmaExportData';
import { 
  ScreenStateVariant, 
  FEED_SCREEN_STATES, 
  FEED_SCREEN_LIGHT_STATES,
  SEARCH_SCREEN_STATES, 
  CHAT_TRADE_SCREEN_STATES, 
  SELLER_PROFILE_SCREEN_STATES, 
  PRODUCT_DETAIL_SCREEN_STATES 
} from './figmaKeyScreenStates';

export type { ScreenStateVariant };
export { 
  FEED_SCREEN_STATES, 
  FEED_SCREEN_LIGHT_STATES,
  SEARCH_SCREEN_STATES, 
  CHAT_TRADE_SCREEN_STATES, 
  SELLER_PROFILE_SCREEN_STATES, 
  PRODUCT_DETAIL_SCREEN_STATES 
};

export interface UIPatternSpec {
  id: string;
  title: string;
  category: 'patterns';
  purpose: string;
  description: string;
  specs: {
    padding: string;
    radius: string;
    animation?: string;
    tokens: string[];
  };
  doRule: string;
  dontRule: string;
  variants: ComponentVariant[];
}

export interface KeyScreenSpec {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  componentsUsed: {
    atoms: string[];
    molecules: string[];
    organisms: string[];
  };
  doRule: string;
  dontRule: string;
  screenSvg: string;
  darkScreenSvg: string;
  states: ScreenStateVariant[];
}

export const UI_PATTERNS_SPEC: UIPatternSpec[] = [
  // 1. Хотбар (Quick Action Dock / Floating Hotbar)
  {
    id: 'pattern-hotbar',
    title: 'ПАТЕРН: ХОТБАР (Floating Action Hotbar)',
    category: 'patterns',
    purpose: 'Миттєвий доступ до цільових конверсійних дій безпосередньо під час перегляду відео або картки товару без зайвих переходів.',
    description: 'Плаваюча панель швидких дій у нижній третині екрану. Об\'єднує вертикальний стек реакцій (лайк, коментарі, закладка, шер) та інтерактивну плашку товару з кнопкою «Купити / Запис».',
    specs: {
      padding: '12px outer, 8px inner gap',
      radius: 'Rounded-sm (4px) для плашки, Rounded-full (36px) для кнопок реакцій',
      tokens: ['#A7E4F2 (CTA)', '#0D0D0D (Contrast text)', '#4F6C73 (Brand ring)', 'backdrop-blur-md (Glassmorphism)'],
    },
    doRule: 'Тримати площу тапу не менше 44x44px; забезпечувати напівпрозоре розмите тло (backdrop-blur-md) для читабельності поверх будь-якого фонового відео.',
    dontRule: 'Не перекривати ключові титри відео та не розміщувати понад 4 кнопки у вертикальному стеку — перевантажений інтерфейс закриває авторський контент виробу та провокує випадкові натискання під час скролу стрічки.',
    variants: [
      {
        name: 'FEED HOTBAR',
        state: 'default',
        label: 'Хотбар стрічки відео',
        description: 'Плаваючий товарний блок + стек реакцій',
        previewSvg: `<svg width="340" height="150" viewBox="0 0 340 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Glassmorphism Container -->
          <rect width="340" height="150" rx="8" fill="#121619" stroke="#2C353D" stroke-width="1.5"/>
          <text x="16" y="24" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">FLOATING ACTION HOTBAR</text>
          
          <!-- Product card strip -->
          <rect x="16" y="40" width="220" height="64" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)"/>
          <rect x="24" y="48" width="48" height="48" rx="2" fill="#4F6C73"/>
          <circle cx="48" cy="72" r="14" fill="#A7E4F2"/>
          <text x="80" y="62" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Глиняне горнятко</text>
          <text x="80" y="77" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">450 ₴</text>
          <rect x="80" y="85" width="75" height="15" rx="2" fill="#A7E4F2"/>
          <text x="117" y="96" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Купити →</text>

          <!-- Vertical Reactions Rail -->
          <g transform="translate(260, 36)">
            <!-- Like -->
            <circle cx="20" cy="16" r="15" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.2)"/>
            <path d="M 20 20 L 16 16 C 14 14 14 12 16 10 C 18 9 20 10 20 11 C 20 10 22 9 24 10 C 26 12 26 14 24 16 Z" fill="#AB3336"/>
            <!-- Bookmark (accent cyan) -->
            <circle cx="20" cy="54" r="15" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.2)"/>
            <path d="M 16 48 L 24 48 L 24 60 L 20 57 L 16 60 Z" fill="#A7E4F2"/>
            <!-- Share -->
            <circle cx="20" cy="92" r="15" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.2)"/>
            <circle cx="17" cy="92" r="2.5" fill="#FFFFFF"/>
            <circle cx="23" cy="88" r="2.5" fill="#FFFFFF"/>
            <circle cx="23" cy="96" r="2.5" fill="#FFFFFF"/>
            <line x1="17" y1="92" x2="23" y2="88" stroke="#FFFFFF" stroke-width="1"/>
            <line x1="17" y1="92" x2="23" y2="96" stroke="#FFFFFF" stroke-width="1"/>
          </g>
        </svg>`,
      },
      {
        name: 'MODAL STICKY DOCK',
        state: 'active',
        label: 'Фіксований док модалки',
        description: 'Прилипаючий нижній бар з двома кнопками дії',
        previewSvg: `<svg width="340" height="150" viewBox="0 0 340 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="340" height="150" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
          <text x="16" y="24" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">STICKY BOTTOM ACTION DOCK</text>
          
          <rect x="16" y="45" width="308" height="75" rx="4" fill="#F8FAFC" stroke="#CBD5E1"/>
          <text x="30" y="70" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">Разом до сплати:</text>
          <text x="30" y="94" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="18" font-weight="900">450 ₴</text>
          
          <!-- Primary CTA Button -->
          <rect x="165" y="60" width="145" height="44" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
          <text x="237" y="87" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Перейти до чату →</text>
          
          <text x="30" y="112" fill="#7FE176" font-family="Open Sans, sans-serif" font-size="9" font-weight="700">✓ Безпечна угода Escrow</text>
        </svg>`,
      },
    ],
  },

  // 2. Скелетон стрічки (Reels Video Feed Skeleton)
  {
    id: 'pattern-feed-skeleton',
    title: 'ПАТЕРН: СКЕЛЕТОН СТРІЧКИ (Reels Feed Skeleton)',
    category: 'patterns',
    purpose: 'Плавний прелоадер для вертикального відеоконтенту. Запобігає візуальним стрибкам інтерфейсу (Cumulative Layout Shift) під час стрімінгу.',
    description: 'Темні напівпрозорі контури з легкою хвильовою анімацією пульсації (shimmer), що точно відтворюють розташування плашки товару, аватара автора та блоку реакцій.',
    specs: {
      padding: '16px від країв екрана',
      radius: 'Rounded-sm для прямокутників, Rounded-full для аватара й реакцій',
      tokens: ['#1A2024 (Base)', '#2C353D (Highlight)', 'Shimmer linear-gradient 1.5s infinite'],
    },
    doRule: 'Відтворювати точні пропорції реальних компонентів: аватар 40px, кнопки реакцій 44px, плашка товару 68px.',
    dontRule: 'Не залишати порожній чорний екран або круговий спінер замість скелетону — це створює враження зависання застосунку, збільшує суб\'єктивний час очікування (perceived performance) та спричиняє відтік користувачів під час завантаження відео.',
    variants: [
      {
        name: 'FEED SKELETON DARK',
        state: 'loading',
        label: 'Скелетон стрічки відео',
        description: 'Темна вертикальна підкладка з контурами',
        previewSvg: `<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" rx="6" fill="#0D0D0D"/>
          
          <!-- Top bar skeleton -->
          <rect x="16" y="16" width="90" height="12" rx="2" fill="#20292D"/>
          <rect x="230" y="16" width="54" height="20" rx="10" fill="#20292D"/>
          
          <!-- Bottom Product bar skeleton -->
          <rect x="16" y="120" width="200" height="64" rx="4" fill="#181F22" stroke="#2C353D"/>
          <rect x="26" y="128" width="48" height="48" rx="2" fill="#2C353D"/>
          <rect x="84" y="134" width="110" height="12" rx="2" fill="#2C353D"/>
          <rect x="84" y="152" width="70" height="10" rx="2" fill="#20292D"/>
          <rect x="84" y="168" width="50" height="10" rx="2" fill="#4F6C73" opacity="0.6"/>

          <!-- Right reactions rail skeleton -->
          <circle cx="260" cy="80" r="16" fill="#181F22" stroke="#2C353D"/>
          <circle cx="260" cy="120" r="16" fill="#181F22" stroke="#2C353D"/>
          <circle cx="260" cy="160" r="16" fill="#181F22" stroke="#2C353D"/>
        </svg>`,
      },
    ],
  },

  // 3. Скелетон трейд-картки (Trade Card Skeleton)
  {
    id: 'pattern-trade-card-skeleton',
    title: 'ПАТЕРН: СКЕЛЕТОН ТРЕЙД-КАРТКИ (Trade Card Skeleton)',
    category: 'patterns',
    purpose: 'Індикація формування безпечної угоди в чаті під час розрахунку комісії, перевірки резерву товару та генерації умов.',
    description: 'Контурний блок картки-угоди в чаті: шапка з бейджем, прев\'ю артворку, рядки параметрів ціни та скелетони обох кнопок дій.',
    specs: {
      padding: '12px, border-2 #4F6C73',
      radius: 'Rounded-sm (4px)',
      tokens: ['#4F6C73 (Header)', '#F2F2F2 (Body)', '#E2E8F0 (Shimmer boxes)'],
    },
    doRule: 'Показувати скелетон у потоці повідомлень чату саме там, де з\'явиться готова картка.',
    dontRule: 'Не блокувати введення повідомлень і скрол чату під час генерації картки угоди — користувач повинен мати змогу продовжувати діалог із майстром без зависання інтерфейсу розмови.',
    variants: [
      {
        name: 'TRADE SKELETON',
        state: 'loading',
        label: 'Скелетон картки угоди',
        description: 'Очікування генерації ескроу-картки',
        previewSvg: `<svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="180" rx="4" fill="#FFFFFF" stroke="#4F6C73" stroke-width="2"/>
          <!-- Header -->
          <rect width="320" height="34" rx="2" fill="#4F6C73"/>
          <rect x="12" y="10" width="130" height="14" rx="2" fill="#A7E4F2" opacity="0.7"/>
          <rect x="220" y="9" width="88" height="16" rx="2" fill="#FEDF82" opacity="0.7"/>

          <!-- Body -->
          <rect x="12" y="46" width="60" height="70" rx="2" fill="#E2E8F0"/>
          <rect x="82" y="48" width="140" height="14" rx="2" fill="#CBD5E1"/>
          <rect x="82" y="68" width="100" height="10" rx="2" fill="#E2E8F0"/>
          <rect x="82" y="84" width="70" height="14" rx="2" fill="#CBD5E1"/>

          <!-- Buttons skeleton -->
          <rect x="12" y="130" width="140" height="36" rx="2" fill="#A7E4F2" opacity="0.6"/>
          <rect x="164" y="130" width="144" height="36" rx="2" fill="#E2E8F0"/>
        </svg>`,
      },
    ],
  },

  // 4. Скелетон чату (Chat Thread Skeleton)
  {
    id: 'pattern-chat-skeleton',
    title: 'ПАТЕРН: СКЕЛЕТОН ЧАТУ (Chat Thread Skeleton)',
    category: 'patterns',
    purpose: 'Плавне завантаження історії листувань між продавцем та покупцем без стрибків висоти вікна.',
    description: 'Чергування скелетон-бульбашок вхідних (зліва, нейтрально-сірі) та вихідних (справа, акцентні) повідомлень різної ширини.',
    specs: {
      padding: '16px container, 10px message padding',
      radius: 'Rounded-sm з прямим кутом на стороні відправника',
      tokens: ['#E2E8F0 (Вхідні)', '#4F6C73/40 (Вихідні)', 'Staggered delays'],
    },
    doRule: 'Варіювати ширину скелетон-баблів (40%, 75%, 55%), імітуючи реальні речення людей.',
    dontRule: 'Не робити всі скелетон-повідомлення однакової ширини та в один стовпчик — це створює відчуття одноманітного сірого блоку замість живої розмови та не готує мозок користувача до появи реплік різної довжини.',
    variants: [
      {
        name: 'CHAT THREAD SKELETON',
        state: 'loading',
        label: 'Скелетон гілки чату',
        description: 'Чергування лівих та правих реплік',
        previewSvg: `<svg width="320" height="170" viewBox="0 0 320 170" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="170" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
          <!-- Incoming message (Left) -->
          <rect x="16" y="16" width="170" height="38" rx="4" fill="#E2E8F0"/>
          <rect x="24" y="24" width="120" height="8" rx="2" fill="#CBD5E1"/>
          <rect x="24" y="36" width="80" height="8" rx="2" fill="#CBD5E1"/>

          <!-- Outgoing message (Right) -->
          <rect x="140" y="64" width="164" height="42" rx="4" fill="#4F6C73" opacity="0.3"/>
          <rect x="150" y="73" width="140" height="8" rx="2" fill="#4F6C73" opacity="0.5"/>
          <rect x="150" y="87" width="90" height="8" rx="2" fill="#4F6C73" opacity="0.5"/>

          <!-- Incoming short -->
          <rect x="16" y="116" width="120" height="32" rx="4" fill="#E2E8F0"/>
          <rect x="24" y="128" width="90" height="8" rx="2" fill="#CBD5E1"/>
        </svg>`,
      },
    ],
  },

  // 5. Скелетон профілю продавця (Seller Profile Skeleton)
  {
    id: 'pattern-seller-profile-skeleton',
    title: 'ПАТЕРН: СКЕЛЕТОН ПРОФІЛЮ ПРОДАВЦЯ (Seller Profile Skeleton)',
    category: 'patterns',
    purpose: 'Миттєве відображення структури кабінету або публічної сторінки майстра при відкритті профілю.',
    description: 'Круглий скелетон аватарки 80px, рядки імені та біографії, три блоки лічильників статистики та сітка карток вітрини 2x2.',
    specs: {
      padding: '16px, gap 12px',
      radius: 'Avatar 9999px, buttons 2px, cards 4px',
      tokens: ['#E2E8F0 (Light)', '#20292D (Dark)'],
    },
    doRule: 'Зберігати чітку ієрархію: аватар зверху по центру, лічильники в ряд, таби під ними.',
    dontRule: 'Не показувати чистий екран без розмітки шапки й карток — користувач не розуміє, який контент завантажується, і може передчасно закрити профіль майстра через сумнів у працездатності кабінету.',
    variants: [
      {
        name: 'PROFILE SKELETON',
        state: 'loading',
        label: 'Скелетон профілю',
        description: 'Силует шапки, статів та сітки публікацій',
        previewSvg: `<svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
          <!-- Avatar -->
          <circle cx="160" cy="42" r="26" fill="#E2E8F0"/>
          <rect x="110" y="76" width="100" height="12" rx="2" fill="#CBD5E1"/>
          <rect x="130" y="92" width="60" height="8" rx="2" fill="#E2E8F0"/>

          <!-- Stats row -->
          <rect x="50" y="110" width="40" height="14" rx="2" fill="#CBD5E1"/>
          <rect x="140" y="110" width="40" height="14" rx="2" fill="#CBD5E1"/>
          <rect x="230" y="110" width="40" height="14" rx="2" fill="#CBD5E1"/>

          <!-- Grid items skeleton -->
          <rect x="16" y="136" width="138" height="52" rx="3" fill="#F1F5F9" stroke="#E2E8F0"/>
          <rect x="166" y="136" width="138" height="52" rx="3" fill="#F1F5F9" stroke="#E2E8F0"/>
        </svg>`,
      },
    ],
  },

  // 6. Empty state профілю продавця (Seller Profile Empty State)
  {
    id: 'pattern-seller-empty-state',
    title: 'ПАТЕРН: EMPTY STATE ПРОФІЛЮ ПРОДАВЦЯ (No Products/Slots)',
    category: 'patterns',
    purpose: 'Дружнє пояснення користувачу або майстру, що асортимент чи розклад ще порожній, та спонукання до першої дії.',
    description: 'Контейнер із тематичною векторною ілюстрацією (коробка/календар), зрозумілим заголовком, текстом-поясненням та помітною кнопкою «+ Додати перший товар/відео».',
    specs: {
      padding: '24px 16px, text-center',
      radius: 'Rounded-sm (4px)',
      tokens: ['#A7E4F2 (Action CTA)', '#4F6C73 (Icon fill)', '#64748B (Muted explanation)'],
    },
    doRule: 'Обов\'язково надавати конкретну наступну дію (Call to Action) у вигляді помітної кнопки.',
    dontRule: 'Не залишати сухий текст на зразок «Дані відсутні» без підказки та кнопки дії — порожній стан без виходу демотивує продавця, зупиняє онбординг і не дає розуміння, як завантажити перше відео чи товар.',
    variants: [
      {
        name: 'EMPTY VITRINE',
        state: 'empty',
        label: 'Порожня вітрина продавця',
        description: 'Ілюстрація + CTA до створення публікації',
        previewSvg: `<svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="180" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
          <!-- Empty box icon -->
          <circle cx="160" cy="46" r="22" fill="#F0F9FB" stroke="#A7E4F2" stroke-width="1.5"/>
          <path d="M 150 40 L 170 40 L 170 54 L 160 58 L 150 54 Z" stroke="#4F6C73" stroke-width="1.5" fill="none"/>
          
          <text x="160" y="88" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">У вас ще немає товарів на продаж</text>
          <text x="160" y="106" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Опублікуйте перше коротке відео або текстове оголошення</text>

          <!-- Primary CTA Button -->
          <rect x="80" y="124" width="160" height="38" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
          <text x="160" y="148" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">+ Додати публікацію</text>
        </svg>`,
      },
    ],
  },

  // 7. Empty state результатів пошуку (Search Empty State)
  {
    id: 'pattern-search-empty-state',
    title: 'ПАТЕРН: EMPTY STATE РЕЗУЛЬТАТІВ ПОШУКУ (Search Empty State)',
    category: 'patterns',
    purpose: 'Допомога покупцю, якщо за вибраними фільтрами чи пошуковою фразою не знайдено жодної позиції.',
    description: 'Векторна лупа з нейтральним знаком запитання, перелік застосованих критеріїв та кнопка «Скинути всі фільтри».',
    specs: {
      padding: '32px 16px, text-center',
      radius: 'Rounded-sm',
      tokens: ['#FEDF82 (Highlight warm)', '#4F6C73 (Action reset)', '#A6A6A6 (Subtext)'],
    },
    doRule: 'Надавати пряму кнопку очищення фільтрів та альтернативні пошукові підказки («Кераміка», «Вінтаж»).',
    dontRule: 'Не підміняти відсутність результатів пошуку повідомленням про помилку сервера — це викликає хибне враження технічної аварії платформи замість потреби просто скоригувати фільтри чи пошуковий запит.',
    variants: [
      {
        name: 'NO SEARCH RESULTS',
        state: 'empty',
        label: 'Нічого не знайдено',
        description: 'Лупа + кнопка швидкого скидання фільтрів',
        previewSvg: `<svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="180" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
          <circle cx="160" cy="46" r="22" fill="#FEF8E7" stroke="#FEDF82" stroke-width="1.5"/>
          <circle cx="157" cy="43" r="8" stroke="#4F6C73" stroke-width="1.5"/>
          <line x1="163" y1="49" x2="169" y2="55" stroke="#4F6C73" stroke-width="2" stroke-linecap="round"/>

          <text x="160" y="88" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">За вашим фільтром нічого не знайдено</text>
          <text x="160" y="106" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Спробуйте розширити діапазон цін або обрати іншу рубрику</text>

          <rect x="95" y="124" width="130" height="34" rx="2" fill="#4F6C73"/>
          <text x="160" y="145" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Скинути всі фільтри</text>
        </svg>`,
      },
    ],
  },

  // 8. Картка товару (Product Card Pattern)
  {
    id: 'pattern-product-card',
    title: 'ПАТЕРН: КАРТКА ТОВАРУ ТА ПОСЛУГИ (Product Card)',
    category: 'patterns',
    purpose: 'Основна торгова одиниця каталогу, стрічки та пошуку. Представляє як матеріальний хендмейд, так і послуги з календарем.',
    description: 'Композитна молекула/організм із прев\'ю арту 3:4 або 1:1, бейджем типу (Відео / Оголошення / Послуга), автором, рейтингом, ціною та швидким CTA «Купити / Запис».',
    specs: {
      padding: '8px, border 1px #A6A6A6/30',
      radius: 'Rounded-sm (4px)',
      tokens: ['#0D0D0D (Price)', '#A7E4F2 (Button)', '#FEDF82 (Stars rating)', '#7FE176 (In stock)'],
    },
    doRule: 'Розрізняти кнопку дії: «Купити» для фізичного товару та «Запис» для слоту майстер-класу чи б\'юті-послуги.',
    dontRule: 'Не приховувати ціну та не використовувати нечитабельні шрифти менше 10px — покупець не повинен витрачати зусилля на пошук базових характеристик, інакше він проігнорує товар у загальній стрічці.',
    variants: [
      {
        name: 'GOODS IN STOCK',
        state: 'default',
        label: 'Фізичний товар у наявності',
        description: 'Повна картка з ціною, рейтингом та кнопкою «Купити»',
        previewSvg: `<svg width="190" height="230" viewBox="0 0 190 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="190" height="230" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
          <!-- Artwork container -->
          <rect x="8" y="8" width="174" height="110" rx="2" fill="#4F6C73"/>
          <circle cx="95" cy="63" r="28" fill="#A7E4F2"/>
          <rect x="14" y="14" width="75" height="18" rx="2" fill="rgba(0,0,0,0.6)"/>
          <text x="51" y="27" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="8" font-weight="700" text-anchor="middle">В НАЯВНОСТІ ✓</text>

          <!-- Content -->
          <text x="8" y="135" fill="#64748B" font-family="Open Sans, sans-serif" font-size="9">@lviv_clay · Майстерня</text>
          <text x="8" y="152" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Глиняне горнятко ручне</text>
          
          <!-- Rating -->
          <text x="8" y="170" fill="#EAB308" font-family="Open Sans, sans-serif" font-size="10">★ 4.9 <tspan fill="#94A3B8">(42)</tspan></text>

          <!-- Price & Button -->
          <text x="8" y="205" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="900">450 ₴</text>
          <rect x="105" y="186" width="77" height="30" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
          <text x="143" y="205" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Купити</text>
        </svg>`,
      },
      {
        name: 'SERVICE WITH BOOKING',
        state: 'active',
        label: 'Послуга із записом у календар',
        description: 'Картка майстер-класу з кнопкою «Запис»',
        previewSvg: `<svg width="190" height="230" viewBox="0 0 190 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="190" height="230" rx="4" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
          <rect x="8" y="8" width="174" height="110" rx="2" fill="#20292D"/>
          <circle cx="95" cy="63" r="26" fill="#FEDF82"/>
          <rect x="14" y="14" width="70" height="18" rx="2" fill="#4F6C73"/>
          <text x="49" y="27" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="8" font-weight="700" text-anchor="middle">📅 ПОСЛУГА</text>

          <text x="8" y="135" fill="#64748B" font-family="Open Sans, sans-serif" font-size="9">@lviv_clay · Львів</text>
          <text x="8" y="152" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Гончарний майстер-клас</text>
          
          <text x="8" y="170" fill="#EAB308" font-family="Open Sans, sans-serif" font-size="10">★ 5.0 <tspan fill="#94A3B8">(89)</tspan></text>

          <text x="8" y="205" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="900">720 ₴</text>
          <rect x="105" y="186" width="77" height="30" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
          <text x="143" y="205" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Запис</text>
        </svg>`,
      },
    ],
  },
];

export const KEY_SCREENS_SPEC: KeyScreenSpec[] = [
  // Екран 1: Стрічка відео (Feed)
  {
    id: 'screen-feed',
    title: 'ЕКРАН 1: ВІДЕОСТРІЧКА ПОКУПОК (Reels Video Feed)',
    subtitle: 'Основна вітрина відео-комерції (390 × 844 px)',
    description: 'Екран вертикального відео з накладеними інтерактивними шарами: штрихкод-логотип Scroll & Buy, рубрикатор, фільтр цін за діапазоном, бічний рейл реакцій (Лайк, Коментарі, Закладка #A7E4F2, Поділитися), метадані автора, плаваюча картка товару з кнопкою «Купити / Запис» та реальний таб-бар NavigationTabBar.',
    componentsUsed: {
      atoms: ['Логотип Scroll & Buy', 'Кнопка Лайк (активна #AB3336)', 'Кнопка Закладка (активна #A7E4F2)', 'Кнопка звуку', 'Фільтр діапазону цін'],
      molecules: ['Плаваюча картка товару з оверлеєм', 'Бейдж автора з переходом у профіль'],
      organisms: ['Хотбар взаємодій', 'Реальна нижня панель навігації NavigationTabBar'],
    },
    doRule: 'Забезпечити контрастність метаданих поверх темного відео за допомогою gradient overlay; тримати висоту нижньої навігації строго 56px.',
    dontRule: 'Не перекривати товарний хотбар нижньою навігацією та не використовувати неклікабельні плашки — це блокує перехід до оформлення покупки з відео та створює оманливі очікування від інтерфейсу.',
    screenSvg: FEED_SCREEN_STATES[0].svg,
    darkScreenSvg: FEED_SCREEN_STATES[0].svg,
    states: FEED_SCREEN_STATES,
  },

  // Екран 1 (Світла тема): Стрічка відео (Feed Light Theme)
  {
    id: 'screen-feed-light',
    title: 'ЕКРАН 1: ВІДЕОСТРІЧКА ПОКУПОК (Reels Video Feed) в світлій темі',
    subtitle: 'Основна вітрина відео-комерції у світлій темі (390 × 844 px)',
    description: 'Екран вертикальної стрічки покупок у світлій темі (High Contrast Light Mode): світле відео крафтового виробництва, білі плашки з легкими тінями, фільтр цін [Ціна: Всі ▾], бічний рейл реакцій (Лайк 1.4k, Коментарі 89, Закладка #A7E4F2), плаваюча картка товару з кнопкою «Купити / Запис» та світлий таб-бар NavigationTabBar.',
    componentsUsed: {
      atoms: ['Фільтр діапазону цін (Light)', 'Кнопка Лайк (#AB3336)', 'Кнопка Закладка (#A7E4F2)', 'Кнопка звуку', 'Кнопка Купити'],
      molecules: ['Плаваюча світла картка товару з тінню', 'Бейдж автора з переходом у профіль'],
      organisms: ['Світлий хотбар взаємодій', 'Світла нижня панель навігації NavigationTabBar'],
    },
    doRule: 'Забезпечити чітку видимість тексту на світлому фоні за допомогою темних токенів #0D0D0D та #475569; зберігати висоту таб-бару строго 56px.',
    dontRule: 'Не використовувати світло-сірий або білий текст на світлих плашках — порушення коефіцієнта контрастності WCAG AAA знижує читабельність ціни та автора виробу.',
    screenSvg: FEED_SCREEN_LIGHT_STATES[0].svg,
    darkScreenSvg: FEED_SCREEN_LIGHT_STATES[0].svg,
    states: FEED_SCREEN_LIGHT_STATES,
  },

  // Екран 2: Пошук та фільтри (Search & Discovery)
  {
    id: 'screen-search',
    title: 'ЕКРАН 2: ПОШУК ТА РОЗШИРЕНИЙ КАТАЛОГ (Search Screen)',
    subtitle: 'Каталог із пошуком, фільтрами та чіпсами (390 × 844 px)',
    description: 'Екран пошуку з верхнім фіксованим рядком введення, активною кнопкою «Фільтри» з лічильником, чіпсами вибраних параметрів (Відео, Товари, Кераміка), сіткою карток товарів та послуг з бейджами наявності та реальним таб-баром.',
    componentsUsed: {
      atoms: ['Поле введення з іконкою Search', 'Кнопка Фільтри з лічильником', 'Чіпси фільтрів з хрестиком', 'Статусні бейджі'],
      molecules: ['Картка товару', 'Картка послуги з календарем'],
      organisms: ['Сітка товарів 2x2', 'Реальна нижня панель навігації NavigationTabBar'],
    },
    doRule: 'Відображати чіткий лічильник знайдених позицій; давати змогу скинути фільтр в 1 клік.',
    dontRule: 'Не перевантажувати екран багаторівневими модалками без потреби та не залишати порожній пошук без схожих категорій — користувач губиться у фільтрах і залишає застосунок без здійснення покупки.',
    screenSvg: SEARCH_SCREEN_STATES[0].svg,
    darkScreenSvg: SEARCH_SCREEN_STATES[0].svg,
    states: SEARCH_SCREEN_STATES,
  },

  // Екран 3: Чат та картка угоди (Chat & Escrow Trade Deal)
  {
    id: 'screen-chat-trade',
    title: 'ЕКРАН 3: ЧАТ ТА ОФІЦІЙНА КАРТКА УГОДИ (Chat & Trade Deal)',
    subtitle: 'Діалог з автоматизованою карткою фіксації умов (390 × 844 px)',
    description: 'Екран листування між покупцем та продавцем із шапкою (аватар з переходом у профіль), історією повідомлень, розгорнутою офіційною карткою-трейдом з гарантією ескроу, кнопками «Підтвердити угоду» та двома рівнозначними кнопками «Скасувати» / «Переглянути умови», та полем введення повідомлення.',
    componentsUsed: {
      atoms: ['Кнопка Підтвердити угоду', 'Кнопка Скасувати (червона)', 'Кнопка Переглянути умови', 'Поле вводу з кнопкою Send'],
      molecules: ['Повідомлення чату', 'Шапка чату з клікабельним аватаром'],
      organisms: ['Картка угоди з ескроу-депонуванням (Очікує, Підтверджено, Скасовано)'],
    },
    doRule: 'Робити кнопки «Скасувати» та «Переглянути умови» однаковими за розміром (50% / 50% у гріді 2 колонок); вказувати код фіксації угоди.',
    dontRule: 'Не перевантажувати картку зайвим криптографічним жаргоном і не робити кнопку скасування помітнішою за підтвердження — це лякає покупця, викликає підозру щодо складності процесу та знижує конверсію успішного закриття угоди.',
    screenSvg: CHAT_TRADE_SCREEN_STATES[0].svg,
    darkScreenSvg: CHAT_TRADE_SCREEN_STATES[0].svg,
    states: CHAT_TRADE_SCREEN_STATES,
  },

  // Екран 4: Кабінет продавця (Seller Profile)
  {
    id: 'screen-seller-profile',
    title: 'ЕКРАН 4: КАБІНЕТ ПРОДАВЦЯ (Seller Cabinet Screen)',
    subtitle: 'Управління товарами, публікаціями та датами (390 × 844 px)',
    description: 'Особистий кабінет майстра (Львівська майстерня шкіри). Містить шапку профілю з аватаром, лічильниками, кнопку «Додати публікацію», розміщені одна під одною кнопки «Редагувати» та «Налаштування», таби «Публікації», «Вільні дати» (керування розкладом послуг) та «Товари», вітрину та реальний таб-бар.',
    componentsUsed: {
      atoms: ['Аватар продавця', 'Кнопка Додати публікацію', 'Кнопка Редагувати', 'Кнопка Налаштування'],
      molecules: ['Блок статистики (Оголошення, Підписники, Лайки)', 'Слоти вільних дат із можливістю видалення'],
      organisms: ['Вітрина товарів продавця', 'Реальна нижня панель навігації NavigationTabBar'],
    },
    doRule: 'Розміщувати кнопку «Налаштування» безпосередньо під кнопкою «Редагувати»; забезпечити функцію видалення вільних дат та додавання товарів.',
    dontRule: 'Не дозволяти майстру купувати власні товари чи бронювати свої ж слоти та не ховати контакти — це створює можливість для штучної накрутки відгуків і суперечить базовій комерційній логіці платформених правил.',
    screenSvg: SELLER_PROFILE_SCREEN_STATES[0].svg,
    darkScreenSvg: SELLER_PROFILE_SCREEN_STATES[0].svg,
    states: SELLER_PROFILE_SCREEN_STATES,
  },

  // Екран 5: Модальна картка товару (Product Detail Modal)
  {
    id: 'screen-product-detail',
    title: 'ЕКРАН 5: КАРТКА ТОВАРУ ТА ОФОРМЛЕННЯ (Product Detail Modal)',
    subtitle: 'Повна інформація про виріб, майстра та відгуки (390 × 844 px)',
    description: 'Екран детального перегляду товару: навігація «Назад», іконка збереження Закладки кольору #A7E4F2, постер товару високої якості, статус наявності, плашка майстра з рейтингом, опис матеріалів, гарантія безпеки та фіксована кнопка «Перейти до оформлення через чат».',
    componentsUsed: {
      atoms: ['Кнопка Назад', 'Закладка #A7E4F2', 'Зірки рейтингу', 'Кнопка Поділитися'],
      molecules: ['Постер виробу', 'Плашка продавця з локацією'],
      organisms: ['Фіксований блок оформлення покупки'],
    },
    doRule: 'Тримати статус наявності чітко помітним; показувати прямий перехід до чату з продавцем для обговорення кастомізації.',
    dontRule: 'Не закривати художні деталі виробу плаваючими кнопками та не ховати вартість і строки доставки — це позбавляє користувача можливості оцінити естетику хендмейду та призводить до скасування замовлень на етапі логістики.',
    screenSvg: PRODUCT_DETAIL_SCREEN_STATES[0].svg,
    darkScreenSvg: PRODUCT_DETAIL_SCREEN_STATES[0].svg,
    states: PRODUCT_DETAIL_SCREEN_STATES,
  },
];

/**
 * Builds a complete Figma-ready SVG Documentation Card for a component group.
 * When pasted into Figma, this generates an artboard containing:
 * - Component Title & Category badge
 * - Description & tokens
 * - Variants grid with states (DEFAULT, HOVER, PRESSED, FOCUS, DISABLED, ERROR, LOADING)
 * - Do & Don't rule boxes with emerald & rose color coding
 */
function wrapSvgTextLines(text: string, maxLineChars = 56): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current ? current + ' ' + word : word).length <= maxLineChars) {
      current = current ? current + ' ' + word : word;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function generateComponentFigmaDocSvg(group: DetailedComponentGroup): string {
  const isTabBar = group.id === 'navigation-tabbar-organism' || group.id.includes('tabbar');
  const cardWidth = 920;
  const colCount = isTabBar ? 2 : Math.min(group.variants.length, 4);
  const rowCount = Math.ceil(group.variants.length / colCount);
  const variantBoxWidth = Math.floor((cardWidth - 60 - (colCount - 1) * 16) / colCount);
  const rowHeight = isTabBar ? 135 : 180;
  const variantBoxHeight = isTabBar ? 120 : 165;
  const variantsSectionHeight = rowCount * rowHeight + 30;

  const doLines = wrapSvgTextLines(group.doRule, 54);
  const dontLines = wrapSvgTextLines(group.dontRule, 54);
  const maxRuleLines = Math.max(doLines.length, dontLines.length, 2);
  const doDontBoxHeight = Math.max(90, maxRuleLines * 16 + 46);
  const doDontSectionHeight = doDontBoxHeight + 20;

  const totalHeight = 120 + variantsSectionHeight + doDontSectionHeight + 40;

  let variantsSvg = '';
  group.variants.forEach((v, idx) => {
    const col = idx % colCount;
    const row = Math.floor(idx / colCount);
    const x = 30 + col * (variantBoxWidth + 16);
    const y = 120 + row * rowHeight;

    const previewOffsetX = isTabBar 
      ? Math.max(10, Math.floor((variantBoxWidth - 350) / 2)) 
      : Math.max(12, Math.floor((variantBoxWidth - 200) / 2));
    const previewOffsetY = isTabBar ? 44 : 62;
    const tagWidth = isTabBar ? Math.min(variantBoxWidth - 20, 190) : Math.min(variantBoxWidth - 20, 120);

    variantsSvg += `
      <g transform="translate(${x}, ${y})">
        <!-- Variant Frame Box -->
        <rect width="${variantBoxWidth}" height="${variantBoxHeight}" rx="4" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        
        <!-- Variant Header Tag -->
        <rect x="10" y="10" width="${tagWidth}" height="18" rx="2" fill="#4F6C73"/>
        <text x="${10 + tagWidth / 2}" y="22.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">${escapeXml(v.name)}</text>
        ${!isTabBar ? `<text x="10" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="9">${escapeXml(v.description.slice(0, 32))}</text>` : ''}

        <!-- Preview canvas -->
        ${!isTabBar ? `<rect x="10" y="54" width="${variantBoxWidth - 20}" height="100" rx="3" fill="#FFFFFF" stroke="#CBD5E1"/>` : ''}
        <g transform="translate(${previewOffsetX}, ${previewOffsetY})">
          ${v.previewSvg}
        </g>
      </g>
    `;
  });

  const doDontY = 120 + variantsSectionHeight;
  const boxWidth = Math.floor((cardWidth - 76) / 2);
  const dontBoxX = boxWidth + 16;

  return `<svg width="${cardWidth}" height="${totalHeight}" viewBox="0 0 ${cardWidth} ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Artboard Base Frame -->
  <rect width="${cardWidth}" height="${totalHeight}" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>

  <!-- Top Documentation Header -->
  <rect width="${cardWidth}" height="64" rx="8" fill="#4F6C73"/>
  <rect y="56" width="${cardWidth}" height="8" fill="#4F6C73"/>
  
  <!-- Category Badge -->
  <rect x="24" y="18" width="85" height="24" rx="2" fill="#A7E4F2"/>
  <text x="66" y="34" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">${group.category.toUpperCase()}</text>

  <!-- Component Title -->
  <text x="120" y="35" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="15" font-weight="800">${escapeXml(group.title)}</text>
  <text x="24" y="85" fill="#475569" font-family="Open Sans, sans-serif" font-size="11">${escapeXml(group.description)}</text>

  <!-- Variants Grid -->
  ${variantsSvg}

  <!-- DO & DON'T Section with deep rationale -->
  <g transform="translate(30, ${doDontY})">
    <!-- DO Box -->
    <rect x="0" y="0" width="${boxWidth}" height="${doDontBoxHeight}" rx="4" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.5"/>
    <circle cx="24" cy="22" r="10" fill="#22C55E"/>
    <path d="M 20 22 L 23 25 L 29 19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <text x="42" y="26" fill="#15803D" font-family="Open Sans, sans-serif" font-size="11" font-weight="800">ПРАВИЛЬНО / DO (РЕКОМЕНДОВАНО):</text>
    <text x="24" y="48" fill="#166534" font-family="Open Sans, sans-serif" font-size="10">
      ${doLines.map((line, i) => `<tspan x="24" dy="${i === 0 ? 0 : 16}">${escapeXml(line)}</tspan>`).join('')}
    </text>

    <!-- DON'T Box with rationale why -->
    <rect x="${dontBoxX}" y="0" width="${boxWidth}" height="${doDontBoxHeight}" rx="4" fill="#FFF1F2" stroke="#FECDD3" stroke-width="1.5"/>
    <circle cx="${dontBoxX + 24}" cy="22" r="10" fill="#EF4444"/>
    <path d="M ${dontBoxX + 20} 18 L ${dontBoxX + 28} 26 M ${dontBoxX + 28} 18 L ${dontBoxX + 20} 26" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <text x="${dontBoxX + 42}" y="26" fill="#B91C1C" font-family="Open Sans, sans-serif" font-size="11" font-weight="800">НЕПРАВИЛЬНО / DON'T (ЗАБОРОНЕНО ТА ЧОМУ):</text>
    <text x="${dontBoxX + 24}" y="48" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="10">
      ${dontLines.map((line, i) => `<tspan x="${dontBoxX + 24}" dy="${i === 0 ? 0 : 16}">${escapeXml(line)}</tspan>`).join('')}
    </text>
  </g>

  <!-- Specs Footer -->
  <text x="30" y="${totalHeight - 12}" fill="#94A3B8" font-family="monospace" font-size="9">SCROLL &amp; BUY DESIGN SYSTEM · FIGMA COMPONENT SPECIFICATION · WCAG 2.1 AAA</text>
</svg>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
