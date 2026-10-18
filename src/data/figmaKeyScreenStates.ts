/**
 * Multi-State Key Screen Specifications
 * Based on Lecture 6: "Поведінка інтерфейсу: Стани системи, зворотний зв'язок, помилки та відновлення"
 * Implementing Scott Hurff's 5 UI Stack states for every screen:
 * 1. Ideal State (Ідеальний стан: усе є, екран повний)
 * 2. Loading State (Стан завантаження: дані в дорозі, скелетони компонентів)
 * 3. Empty State (Порожній стан: перший вхід або нічого не знайдено, дружня графіка)
 * 4. Partial State (Частковий стан: 1 елемент, чернетка, процес публікації)
 * 5. Error & Recovery State (Стан помилки та відновлення: немає зв'язку, модалка підтвердження, аварійний вихід)
 */

export interface ScreenStateVariant {
  id: 'ideal' | 'loading' | 'empty' | 'partial' | 'error';
  name: string;
  label: string;
  lectureReference: string;
  description: string;
  svg: string;
}

/**
 * Renders the real NavigationTabBar (H=56px) matching NavigationTabBar.tsx
 * 5 tabs: Feed, Search, elevated circular + button (40x40 #4F6C73), Chats with badge, Profile
 */
export function getRealTabBarSvg(active: 'feed' | 'search' | 'create' | 'messages' | 'profile' = 'feed', isDark = false): string {
  const bg = isDark ? '#161B1E' : '#FFFFFF';
  const border = isDark ? '#2C353D' : '#E2E8F0';
  const activeColor = isDark ? '#A7E4F2' : '#4F6C73';
  const inactiveColor = isDark ? '#94A3B8' : '#64748B';
  const addTextColor = isDark ? '#FFFFFF' : '#0D0D0D';

  const feedColor = active === 'feed' ? activeColor : inactiveColor;
  const searchColor = active === 'search' ? activeColor : inactiveColor;
  const chatsColor = active === 'messages' ? activeColor : inactiveColor;
  const profileColor = active === 'profile' ? activeColor : inactiveColor;
  const badgeNum = active === 'messages' ? '2' : '1';

  return `
    <g transform="translate(0, 788)">
      <rect width="390" height="56" fill="${bg}" stroke="${border}" stroke-width="1"/>
      
      <!-- Tab 1: Feed (Home) -->
      ${active === 'feed' 
        ? `<path d="M 39 12 L 29 20 L 32 20 L 32 30 L 36 30 L 36 24 L 42 24 L 42 30 L 46 30 L 46 20 L 49 20 Z" fill="${feedColor}"/>`
        : `<path d="M 30 20.5 L 39 13 L 48 20.5 L 48 30 L 43 30 L 43 24 L 35 24 L 35 30 L 30 30 Z" fill="none" stroke="${feedColor}" stroke-width="1.8" stroke-linejoin="round"/>`
      }
      <text x="39" y="44" fill="${feedColor}" font-family="Open Sans, sans-serif" font-size="10" font-weight="${active === 'feed' ? '800' : '600'}" text-anchor="middle">Стрічка</text>
      
      <!-- Tab 2: Search -->
      <circle cx="117" cy="20" r="6" stroke="${searchColor}" stroke-width="${active === 'search' ? '2.4' : '1.8'}" fill="none"/>
      <line x1="121.5" y1="24.5" x2="126" y2="29" stroke="${searchColor}" stroke-width="${active === 'search' ? '2.4' : '1.8'}" stroke-linecap="round"/>
      <text x="117" y="44" fill="${searchColor}" font-family="Open Sans, sans-serif" font-size="10" font-weight="${active === 'search' ? '800' : '600'}" text-anchor="middle">Пошук</text>
      
      <!-- Tab 3: Central Elevated + Button (38x38 circle) -->
      <circle cx="195" cy="16" r="18" fill="#4F6C73" stroke="${isDark ? '#161B1E' : '#FFFFFF'}" stroke-width="2.5"/>
      <line x1="195" y1="10" x2="195" y2="22" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="189" y1="16" x2="201" y2="16" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <text x="195" y="44" fill="${addTextColor}" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>

      <!-- Tab 4: Chats with Red Notification Badge -->
      <path d="M 280 23 C 280 24.1 279.1 25 278 25 L 268 25 L 264 29 L 264 15 C 264 13.9 264.9 13 266 13 L 278 13 C 279.1 13 280 13.9 280 15 Z" fill="${active === 'messages' && !isDark ? 'rgba(79,108,115,0.15)' : 'none'}" stroke="${chatsColor}" stroke-width="${active === 'messages' ? '2.2' : '1.8'}" stroke-linejoin="round"/>
      <circle cx="280" cy="12" r="5" fill="#AB3336"/>
      <text x="280" y="15.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="7" font-weight="900" text-anchor="middle">${badgeNum}</text>
      <text x="272" y="44" fill="${chatsColor}" font-family="Open Sans, sans-serif" font-size="10" font-weight="${active === 'messages' ? '800' : '600'}" text-anchor="middle">Чати</text>

      <!-- Tab 5: Profile (Кабінет) -->
      <circle cx="351" cy="16" r="3.8" stroke="${profileColor}" stroke-width="${active === 'profile' ? '2.2' : '1.8'}" fill="${active === 'profile' && !isDark ? 'rgba(79,108,115,0.15)' : 'none'}"/>
      <path d="M 343 29 C 343 25 346.5 23 351 23 C 355.5 23 359 25 359 29" stroke="${profileColor}" stroke-width="${active === 'profile' ? '2.2' : '1.8'}" stroke-linecap="round" fill="none"/>
      <text x="351" y="44" fill="${profileColor}" font-family="Open Sans, sans-serif" font-size="10" font-weight="${active === 'profile' ? '800' : '600'}" text-anchor="middle">Кабінет</text>
    </g>
  `;
}

// ============================================================================
// ЕКРАН 1: СТРІЧКА ВІДЕОПОКУПОК (FEED SCREEN) - 5 СТАНІВ
// ============================================================================
export const FEED_SCREEN_STATES: ScreenStateVariant[] = [
  {
    id: 'ideal',
    name: 'ІДЕАЛЬНИЙ СТАН (IDEAL STATE)',
    label: '1. Ідеальний стан',
    lectureReference: 'Лекція 6, Слайд 9: Ідеальний стан (усе є, екран повний)',
    description: 'Повноцінний екран вертикального відео з виробом @lviv_clay, градієнтними оверлеями, штрихкод-логотипом Scroll & Buy, рубрикатором, фільтром цін [Ціна: Всі ▾], бічним рейлом реакцій (Лайк 1.4k, Коментарі 89, Закладка #A7E4F2), плаваючою карткою товару 450 ₴ та кнопкою «Купити».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#0D0D0D"/>
      <rect x="0" y="0" width="390" height="788" fill="#1C272B"/>
      <circle cx="195" cy="380" r="140" fill="#4F6C73" opacity="0.4"/>
      <ellipse cx="195" cy="420" rx="90" ry="40" fill="#A7E4F2" opacity="0.6"/>
      <path d="M 160 360 C 160 300 230 300 230 360 L 220 440 C 220 460 170 460 170 440 Z" fill="#A7E4F2"/>

      <!-- Header & Barcode Logo -->
      <rect width="390" height="110" fill="url(#feedTopFade)"/>
      <defs>
        <linearGradient id="feedTopFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <g transform="translate(20, 42)">
        <g fill="#FFFFFF">
          <rect x="0" y="0" width="2" height="14" />
          <rect x="3" y="0" width="1" height="14" />
          <rect x="5" y="0" width="2" height="14" />
          <rect x="8" y="0" width="3" height="14" />
          <rect x="12" y="0" width="1" height="14" />
          <rect x="14" y="0" width="2" height="14" />
          <rect x="17" y="0" width="1" height="14" />
          <rect x="19" y="0" width="3" height="14" />
          <rect x="23" y="0" width="2" height="14" />
          <rect x="26" y="0" width="1" height="14" />
          <rect x="28" y="0" width="2" height="14" />
          <rect x="31" y="0" width="3" height="14" />
          <rect x="35" y="0" width="1" height="14" />
          <rect x="37" y="0" width="2" height="14" />
          <rect x="40" y="0" width="3" height="14" />
          <rect x="44" y="0" width="1" height="14" />
          <rect x="46" y="0" width="2" height="14" />
          <rect x="49" y="0" width="3" height="14" />
          <rect x="53" y="0" width="1" height="14" />
          <rect x="55" y="0" width="2" height="14" />
          <rect x="58" y="0" width="3" height="14" />
          <rect x="62" y="0" width="1" height="14" />
          <rect x="64" y="0" width="2" height="14" />
          <rect x="67" y="0" width="3" height="14" />
          <rect x="71" y="0" width="1" height="14" />
          <rect x="73" y="0" width="3" height="14" />
        </g>
        <text x="38" y="22" fill="#FFFFFF" font-family="Overpass, Open Sans, sans-serif" font-size="6" font-weight="800" text-anchor="middle" letter-spacing="1.5">SCROLL &amp; BUY</text>
      </g>

      <!-- Price Filter Pill in Feed -->
      <rect x="150" y="44" width="105" height="24" rx="12" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.25)"/>
      <text x="202" y="59" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">🏷️ Ціна: Всі ▾</text>

      <!-- Sound -->
      <circle cx="355" cy="54" r="15" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.2)"/>
      <path d="M 350 54 L 354 50 L 358 50 L 361 47 L 361 61 L 358 58 L 354 58 Z" fill="#A7E4F2"/>

      <!-- Reactions Rail -->
      <g transform="translate(325, 430)">
        <circle cx="22" cy="20" r="18" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)"/>
        <path d="M 22 25 L 17 20 C 15 18 15 15 17 13 C 19 12 21 13 22 14 C 23 13 25 12 27 13 C 29 15 29 18 27 20 Z" fill="#AB3336"/>
        <text x="22" y="48" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1.4k</text>

        <circle cx="22" cy="74" r="18" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)"/>
        <rect x="14" y="68" width="16" height="12" rx="2" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
        <text x="22" y="102" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">89</text>

        <circle cx="22" cy="128" r="18" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)"/>
        <path d="M 17 121 L 27 121 L 27 136 L 22 132 L 17 136 Z" fill="#A7E4F2"/>
        <text x="22" y="156" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">382</text>
      </g>

      <!-- Author info and Hotbar -->
      <g transform="translate(16, 640)">
        <text x="0" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="13" font-weight="700">@lviv_clay · Гончарна майстерня ✓</text>
        <text x="0" y="38" fill="#F2F2F2" font-family="Open Sans, sans-serif" font-size="11">Автентичне ліплення та випал глиняних горняток #львів #кераміка</text>

        <rect x="0" y="52" width="300" height="66" rx="4" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.2)"/>
        <rect x="8" y="60" width="50" height="50" rx="2" fill="#4F6C73"/>
        <circle cx="33" cy="85" r="15" fill="#A7E4F2"/>
        <text x="68" y="76" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="9" font-weight="700">🛍️ КУПИТИ З ВІДЕО</text>
        <text x="68" y="92" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Глиняне горнятко «Карпати»</text>
        <text x="68" y="108" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="12" font-weight="900">450 ₴</text>

        <rect x="220" y="70" width="70" height="32" rx="2" fill="#A7E4F2"/>
        <text x="255" y="90" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Купити →</text>
      </g>

      ${getRealTabBarSvg('feed', true)}
    </svg>`,
  },
  {
    id: 'loading',
    name: 'СТАН ЗАВАНТАЖЕННЯ (LOADING SKELETON)',
    label: '2. Завантаження',
    lectureReference: 'Лекція 6, Слайд 16: Скелетон — сірі блоки на місці майбутнього вмісту',
    description: 'Силуетна структура інтерфейсу замість раптового стрибка або білого екрану. Скелетон відеопотоку, круглі шимери реакцій (лайки, закладки) та скелетон нижньої плашки товару готують користувача до появи контенту.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#0D0D0D"/>
      <rect x="0" y="0" width="390" height="788" fill="#181F22"/>
      
      <!-- Shimmer pulse effect -->
      <circle cx="195" cy="380" r="120" fill="#243036" opacity="0.5"/>
      <rect x="20" y="50" width="100" height="14" rx="3" fill="#2C353D"/>
      <rect x="150" y="44" width="105" height="24" rx="12" fill="#2C353D"/>

      <!-- Right Hand Skeleton Controls -->
      <g transform="translate(325, 430)">
        <circle cx="22" cy="20" r="18" fill="#2C353D"/>
        <rect x="12" y="44" width="20" height="8" rx="2" fill="#243036"/>
        <circle cx="22" cy="74" r="18" fill="#2C353D"/>
        <rect x="12" y="98" width="20" height="8" rx="2" fill="#243036"/>
        <circle cx="22" cy="128" r="18" fill="#2C353D"/>
        <rect x="12" y="152" width="20" height="8" rx="2" fill="#243036"/>
      </g>

      <!-- Bottom Author & Hotbar Skeleton -->
      <g transform="translate(16, 640)">
        <rect x="0" y="10" width="180" height="14" rx="2" fill="#2C353D"/>
        <rect x="0" y="32" width="260" height="10" rx="2" fill="#243036"/>
        
        <rect x="0" y="52" width="300" height="66" rx="4" fill="#1E262A" stroke="#2C353D"/>
        <rect x="8" y="60" width="50" height="50" rx="2" fill="#2C353D"/>
        <rect x="68" y="66" width="90" height="10" rx="2" fill="#3D4B54"/>
        <rect x="68" y="82" width="120" height="12" rx="2" fill="#2C353D"/>
        <rect x="68" y="100" width="50" height="12" rx="2" fill="#3D4B54"/>
        <rect x="220" y="70" width="70" height="32" rx="2" fill="#2C353D"/>
      </g>

      ${getRealTabBarSvg('feed', true)}
    </svg>`,
  },
  {
    id: 'empty',
    name: 'ПОРОЖНІЙ СТАН (EMPTY STATE: NO MATCHING PRICES)',
    label: '3. Порожній стан',
    lectureReference: 'Лекція 6, Слайд 10: Порожній стан — не порожнеча (Перший раз / Нічого не знайдено)',
    description: 'Екран стрічки, коли користувач застосував фільтр цін (наприклад, «Від 2000 ₴»), і в каталозі немає таких відео. Замість чорного екрану показано дружню ілюстрацію, пояснення та кнопку «Скинути фільтр цін».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#0D0D0D"/>
      <rect x="0" y="0" width="390" height="788" fill="#12181B"/>

      <g transform="translate(20, 42)">
        <g fill="#FFFFFF">
          <rect x="0" y="0" width="2" height="14" />
          <rect x="3" y="0" width="1" height="14" />
          <rect x="5" y="0" width="2" height="14" />
          <rect x="8" y="0" width="3" height="14" />
          <rect x="12" y="0" width="1" height="14" />
          <rect x="14" y="0" width="2" height="14" />
          <rect x="17" y="0" width="1" height="14" />
          <rect x="19" y="0" width="3" height="14" />
          <rect x="23" y="0" width="2" height="14" />
          <rect x="26" y="0" width="1" height="14" />
          <rect x="28" y="0" width="2" height="14" />
          <rect x="31" y="0" width="3" height="14" />
          <rect x="35" y="0" width="1" height="14" />
          <rect x="37" y="0" width="2" height="14" />
          <rect x="40" y="0" width="3" height="14" />
          <rect x="44" y="0" width="1" height="14" />
          <rect x="46" y="0" width="2" height="14" />
          <rect x="49" y="0" width="3" height="14" />
          <rect x="53" y="0" width="1" height="14" />
          <rect x="55" y="0" width="2" height="14" />
          <rect x="58" y="0" width="3" height="14" />
          <rect x="62" y="0" width="1" height="14" />
          <rect x="64" y="0" width="2" height="14" />
          <rect x="67" y="0" width="3" height="14" />
          <rect x="71" y="0" width="1" height="14" />
          <rect x="73" y="0" width="3" height="14" />
        </g>
        <text x="38" y="22" fill="#FFFFFF" font-family="Overpass, Open Sans, sans-serif" font-size="6" font-weight="800" text-anchor="middle" letter-spacing="1.5">SCROLL &amp; BUY</text>
      </g>
      <rect x="135" y="44" width="135" height="24" rx="12" fill="#A7E4F2"/>
      <text x="202" y="59" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">🏷️ 2000–5000 ₴ ×</text>

      <!-- Center Friendly Empty State -->
      <g transform="translate(45, 300)">
        <circle cx="150" cy="50" r="45" fill="#1E282D" stroke="#4F6C73" stroke-width="1.5"/>
        <path d="M 130 50 L 170 50 M 150 30 L 150 70" stroke="#A7E4F2" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="160" cy="40" r="10" fill="#FEDF82" opacity="0.6"/>

        <text x="150" y="125" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Немає товарів у діапазоні</text>
        <text x="150" y="145" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">2 000 — 5 000 ₴</text>
        <text x="150" y="170" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">Спробуйте розширити ціновий діапазон</text>
        <text x="150" y="186" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">або оберіть іншу рубрику крафту.</text>

        <!-- CTA Reset Filter -->
        <rect x="50" y="210" width="200" height="42" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
        <text x="150" y="236" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Скинути фільтр цін</text>
      </g>

      ${getRealTabBarSvg('feed', true)}
    </svg>`,
  },
  {
    id: 'partial',
    name: 'ЧАСТКОВИЙ СТАН (IN-PROGRESS: ПУБЛІКУЄТЬСЯ 64%)',
    label: '4. Частковий / Процес',
    lectureReference: 'Лекція 6, Слайд 11: Стан процесу і даних («Що з моїм відео прямо зараз?»)',
    description: 'Користувач опублікував нове відео-оголошення. У верхньому лівому кутку відображається плашка з прогрес-баром «Публікується... 64%», що дає зрозумілий зворотний зв\'язок без блокування перегляду стрічки.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#0D0D0D"/>
      <rect x="0" y="0" width="390" height="788" fill="#1C272B"/>
      <circle cx="195" cy="380" r="140" fill="#4F6C73" opacity="0.3"/>

      <!-- Progress Badge: Публікується 64% from Lecture 6 Slide 11 -->
      <g transform="translate(16, 95)">
        <rect width="130" height="42" rx="4" fill="rgba(0,0,0,0.85)" stroke="#A7E4F2" stroke-width="1.5"/>
        <circle cx="20" cy="21" r="7" stroke="#A7E4F2" stroke-width="2" stroke-dasharray="25 10"/>
        <text x="34" y="18" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700">Публікується...</text>
        <text x="105" y="18" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="9" font-weight="800">64%</text>
        <!-- Progress track -->
        <rect x="34" y="26" width="82" height="4" rx="2" fill="#374151"/>
        <rect x="34" y="26" width="52" height="4" rx="2" fill="#A7E4F2"/>
      </g>

      <!-- Watermark Draft: Чернетка лише на цьому телефоні -->
      <rect x="250" y="98" width="124" height="24" rx="2" fill="#FEDF82"/>
      <text x="312" y="113" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">📝 Локальна чернетка</text>

      <!-- Feed Content Preview -->
      <g transform="translate(16, 640)">
        <text x="0" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="13" font-weight="700">@lviv_clay · Гончарна майстерня</text>
        <text x="0" y="38" fill="#F2F2F2" font-family="Open Sans, sans-serif" font-size="11">Нове відео готується до розміщення на вітрині майстра...</text>
      </g>

      ${getRealTabBarSvg('feed', true)}
    </svg>`,
  },
  {
    id: 'error',
    name: 'СТАН ПОМИЛКИ ТА ВІДНОВЛЕННЯ (OFFLINE GRACEFUL DEGRADATION)',
    label: '5. Помилка / Офлайн',
    lectureReference: 'Лекція 6, Слайди 20, 24, 33: М\'яка деградація та чесне сповіщення про зв\'язок',
    description: 'Зник інтернет. Застосунок не «падає»: вгорі показано банер «Немає з\'єднання з інтернетом», завантажене відео залишається доступним для перегляду з кешу, а дія записується для повтору («Спробувати ще раз»).',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#0D0D0D"/>
      <rect x="0" y="0" width="390" height="788" fill="#1C272B"/>
      
      <!-- Top Offline Banner (Lecture 6 Slide 20 & 33) -->
      <g transform="translate(0, 40)">
        <rect width="390" height="34" fill="#AB3336"/>
        <circle cx="24" cy="17" r="7" fill="#FFFFFF" fill-opacity="0.2"/>
        <line x1="20" y1="13" x2="28" y2="21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <text x="38" y="21" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Немає з'єднання з інтернетом · Працюємо офлайн</text>
      </g>

      <!-- Center Cached Video with Retry overlay -->
      <g transform="translate(45, 340)">
        <rect width="300" height="110" rx="4" fill="rgba(0,0,0,0.85)" stroke="#AB3336" stroke-width="1.5"/>
        <text x="150" y="32" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Зв'язок тимчасово втрачено</text>
        <text x="150" y="50" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Кешовані відео доступні. Дії збережено локально.</text>

        <rect x="85" y="66" width="130" height="30" rx="2" fill="#AB3336"/>
        <text x="150" y="85" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Спробувати ще раз</text>
      </g>

      ${getRealTabBarSvg('feed', true)}
    </svg>`,
  },
];

// ============================================================================
// ЕКРАН 1 (СВІТЛА ТЕМА): ВІДЕОСТРІЧКА ПОКУПОК (FEED SCREEN LIGHT) - 5 СТАНІВ
// ============================================================================
export const FEED_SCREEN_LIGHT_STATES: ScreenStateVariant[] = [
  {
    id: 'ideal',
    name: 'ІДЕАЛЬНИЙ СТАН · СВІТЛА ТЕМА (IDEAL STATE)',
    label: '1. Ідеальний стан',
    lectureReference: 'Лекція 6, Слайд 9: Ідеальний стан у світлій темі інтерфейсу',
    description: 'Вертикальна стрічка покупок у світлій темі: світле крафтове відео, чисті білі плашки з м\'якою тінню, фільтр цін [Ціна: Всі ▾], бічний рейл реакцій (Лайк 1.4k, Коментарі 89, Закладка #A7E4F2), плаваюча картка товару 450 ₴ з кнопкою «Купити» та світлий NavigationTabBar.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <!-- Light Craft Workshop Video Canvas -->
      <rect x="0" y="0" width="390" height="788" fill="#F0F4F7"/>
      <circle cx="195" cy="380" r="140" fill="#E2EBF0" opacity="0.85"/>
      <ellipse cx="195" cy="420" rx="90" ry="40" fill="#D2E4EC" opacity="0.9"/>
      <path d="M 160 360 C 160 300 230 300 230 360 L 220 440 C 220 460 170 460 170 440 Z" fill="#4F6C73"/>
      <ellipse cx="195" cy="360" rx="35" ry="12" fill="#A7E4F2"/>

      <!-- Header Gradient & Controls (No logo in top-left) -->
      <rect width="390" height="110" fill="url(#feedLightTopFade)"/>
      <defs>
        <linearGradient id="feedLightTopFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Center Price Filter Pill in Feed (Light Theme) -->
      <rect x="142" y="44" width="106" height="26" rx="13" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="195" y="61" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">🏷️ Ціна: Всі ▾</text>

      <!-- Sound Toggle (Light) -->
      <circle cx="355" cy="56" r="16" fill="#FFFFFF" stroke="#CBD5E1"/>
      <path d="M 350 56 L 354 52 L 358 52 L 361 49 L 361 63 L 358 60 L 354 60 Z" fill="#4F6C73"/>

      <!-- Light Reactions Rail (Right) -->
      <g transform="translate(325, 430)">
        <!-- Like -->
        <circle cx="22" cy="20" r="18" fill="#FFFFFF" stroke="#CBD5E1"/>
        <path d="M 22 25 L 17 20 C 15 18 15 15 17 13 C 19 12 21 13 22 14 C 23 13 25 12 27 13 C 29 15 29 18 27 20 Z" fill="#AB3336"/>
        <text x="22" y="48" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1.4k</text>

        <!-- Comments -->
        <circle cx="22" cy="74" r="18" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="14" y="68" width="16" height="12" rx="2" stroke="#4F6C73" stroke-width="1.5" fill="none"/>
        <text x="22" y="102" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">89</text>

        <!-- Bookmark (Active #A7E4F2 with dark brand stroke) -->
        <circle cx="22" cy="128" r="18" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
        <path d="M 17 121 L 27 121 L 27 136 L 22 132 L 17 136 Z" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1"/>
        <text x="22" y="156" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">382</text>
      </g>

      <!-- Author Info & Hotbar (Light Theme) -->
      <g transform="translate(16, 636)">
        <text x="0" y="20" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800">@lviv_clay · Гончарна майстерня ✓</text>
        <text x="0" y="38" fill="#475569" font-family="Open Sans, sans-serif" font-size="11">Автентичне ліплення та випал глиняних горняток #львів #кераміка</text>

        <!-- Floating Product Card (Light) -->
        <rect x="0" y="50" width="300" height="68" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="8" y="59" width="50" height="50" rx="2" fill="#4F6C73"/>
        <circle cx="33" cy="84" r="15" fill="#A7E4F2"/>
        <text x="68" y="74" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="9" font-weight="800">🛍️ КУПИТИ З ВІДЕО</text>
        <text x="68" y="90" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Глиняне горнятко «Карпати»</text>
        <text x="68" y="108" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="900">450 ₴</text>

        <!-- Buy Button -->
        <rect x="218" y="68" width="72" height="32" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
        <text x="254" y="88" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Купити →</text>
      </g>

      ${getRealTabBarSvg('feed', false)}
    </svg>`,
  },
  {
    id: 'loading',
    name: 'СТАН ЗАВАНТАЖЕННЯ (LOADING SKELETON · LIGHT)',
    label: '2. Завантаження',
    lectureReference: 'Лекція 6, Слайд 16: Скелетон у світлій темі',
    description: 'Скелетони на світлому фоні (#E2E8F0 та #CBD5E1) готують користувача до появи світлого відео, плашок реакцій та картки товару без візуального мерехтіння.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect x="0" y="0" width="390" height="788" fill="#F1F5F9"/>
      
      <!-- Shimmer Pulse Elements -->
      <circle cx="195" cy="380" r="120" fill="#E2E8F0" opacity="0.8"/>
      <rect x="142" y="44" width="106" height="26" rx="13" fill="#E2E8F0"/>
      <circle cx="355" cy="56" r="16" fill="#E2E8F0"/>

      <!-- Right Hand Skeleton Controls -->
      <g transform="translate(325, 430)">
        <circle cx="22" cy="20" r="18" fill="#E2E8F0"/>
        <rect x="12" y="44" width="20" height="8" rx="2" fill="#CBD5E1"/>
        <circle cx="22" cy="74" r="18" fill="#E2E8F0"/>
        <rect x="12" y="98" width="20" height="8" rx="2" fill="#CBD5E1"/>
        <circle cx="22" cy="128" r="18" fill="#E2E8F0"/>
        <rect x="12" y="152" width="20" height="8" rx="2" fill="#CBD5E1"/>
      </g>

      <!-- Bottom Author & Hotbar Skeleton -->
      <g transform="translate(16, 636)">
        <rect x="0" y="10" width="180" height="14" rx="2" fill="#CBD5E1"/>
        <rect x="0" y="32" width="260" height="10" rx="2" fill="#E2E8F0"/>
        
        <rect x="0" y="50" width="300" height="68" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="8" y="59" width="50" height="50" rx="2" fill="#E2E8F0"/>
        <rect x="68" y="66" width="90" height="10" rx="2" fill="#CBD5E1"/>
        <rect x="68" y="82" width="120" height="12" rx="2" fill="#E2E8F0"/>
        <rect x="68" y="100" width="50" height="12" rx="2" fill="#CBD5E1"/>
        <rect x="218" y="68" width="72" height="32" rx="2" fill="#E2E8F0"/>
      </g>

      ${getRealTabBarSvg('feed', false)}
    </svg>`,
  },
  {
    id: 'empty',
    name: 'ПОРОЖНІЙ СТАН (EMPTY STATE · LIGHT)',
    label: '3. Порожній стан',
    lectureReference: 'Лекція 6, Слайд 10: Порожній стан у світлій темі',
    description: 'Світлий екран після вибору фільтра цін (2000–5000 ₴), коли в каталозі немає таких відео: дружня світла векторна ілюстрація, пояснення та помітна бірюзова кнопка «Скинути фільтр цін».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect x="0" y="0" width="390" height="788" fill="#F8FAFC"/>

      <rect x="135" y="44" width="135" height="26" rx="13" fill="#A7E4F2" stroke="#4F6C73"/>
      <text x="202" y="61" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="800" text-anchor="middle">🏷️ 2000–5000 ₴ ×</text>

      <!-- Center Friendly Empty State -->
      <g transform="translate(45, 290)">
        <circle cx="150" cy="50" r="45" fill="#E2EBF0" stroke="#4F6C73" stroke-width="1.5"/>
        <path d="M 130 50 L 170 50 M 150 30 L 150 70" stroke="#4F6C73" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="160" cy="40" r="10" fill="#FEDF82"/>

        <text x="150" y="125" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Немає товарів у діапазоні</text>
        <text x="150" y="145" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">2 000 — 5 000 ₴</text>
        <text x="150" y="170" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">Спробуйте розширити ціновий діапазон</text>
        <text x="150" y="186" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">або оберіть іншу рубрику крафту.</text>

        <!-- CTA Reset Filter -->
        <rect x="50" y="210" width="200" height="42" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
        <text x="150" y="236" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Скинути фільтр цін</text>
      </g>

      ${getRealTabBarSvg('feed', false)}
    </svg>`,
  },
  {
    id: 'partial',
    name: 'ЧАСТКОВИЙ СТАН (IN-PROGRESS · LIGHT)',
    label: '4. Частковий / Процес',
    lectureReference: 'Лекція 6, Слайд 11: Зворотний зв\'язок про фоновий процес публікації',
    description: 'Світла плашка «Публікується... 64%» з активним бірюзовим прогрес-баром у верхній частині екрана та бейдж чернетки інформують майстра про стан обробки нового відео.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect x="0" y="0" width="390" height="788" fill="#F0F4F7"/>
      <circle cx="195" cy="380" r="140" fill="#E2EBF0" opacity="0.6"/>

      <!-- Progress Badge (Light Theme) -->
      <g transform="translate(16, 95)">
        <rect width="140" height="44" rx="4" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
        <circle cx="20" cy="22" r="7" stroke="#4F6C73" stroke-width="2" stroke-dasharray="25 10"/>
        <text x="34" y="19" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="700">Публікується...</text>
        <text x="110" y="19" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="9" font-weight="800">64%</text>
        <!-- Progress track -->
        <rect x="34" y="27" width="92" height="4" rx="2" fill="#E2E8F0"/>
        <rect x="34" y="27" width="58" height="4" rx="2" fill="#A7E4F2"/>
      </g>

      <!-- Watermark Draft (Light Theme) -->
      <rect x="240" y="98" width="134" height="26" rx="2" fill="#FEDF82" stroke="#D97706" stroke-width="1"/>
      <text x="307" y="115" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">📝 Локальна чернетка</text>

      <!-- Feed Content Preview -->
      <g transform="translate(16, 636)">
        <text x="0" y="20" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800">@lviv_clay · Гончарна майстерня</text>
        <text x="0" y="38" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11">Нове відео готується до розміщення на вітрині майстра...</text>
      </g>

      ${getRealTabBarSvg('feed', false)}
    </svg>`,
  },
  {
    id: 'error',
    name: 'СТАН ПОМИЛКИ ТА ВІДНОВЛЕННЯ (OFFLINE · LIGHT)',
    label: '5. Помилка / Офлайн',
    lectureReference: 'Лекція 6, Слайд 20 & 33: Офлайн-банер та збереження кешу',
    description: 'Світле сповіщення про тимчасову відсутність інтернету: червоно-рожевий банер угорі, збережені в пам\'яті відео для перегляду та кнопка повторної спроби зв\'язку «Спробувати ще раз».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect x="0" y="0" width="390" height="788" fill="#F1F5F9"/>
      
      <!-- Top Offline Banner (Light Theme) -->
      <g transform="translate(0, 40)">
        <rect width="390" height="34" fill="#FEE2E2" stroke="#EF4444" stroke-width="1"/>
        <circle cx="24" cy="17" r="7" fill="#EF4444" fill-opacity="0.2"/>
        <line x1="20" y1="13" x2="28" y2="21" stroke="#B91C1C" stroke-width="2" stroke-linecap="round"/>
        <text x="38" y="21" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Немає з'єднання з інтернетом · Працюємо офлайн</text>
      </g>

      <!-- Center Cached Video with Retry card (Light Theme) -->
      <g transform="translate(45, 340)">
        <rect width="300" height="110" rx="4" fill="#FFFFFF" stroke="#F87171" stroke-width="1.5"/>
        <text x="150" y="32" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Зв'язок тимчасово втрачено</text>
        <text x="150" y="50" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Кешовані відео доступні. Дії збережено локально.</text>

        <rect x="85" y="66" width="130" height="30" rx="2" fill="#AB3336"/>
        <text x="150" y="85" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Спробувати ще раз</text>
      </g>

      ${getRealTabBarSvg('feed', false)}
    </svg>`,
  },
];

// ============================================================================
// ЕКРАН 2: ПОШУК ТА РОЗШИРЕНИЙ КАТАЛОГ (SEARCH SCREEN) - 5 СТАНІВ
// ============================================================================
export const SEARCH_SCREEN_STATES: ScreenStateVariant[] = [
  {
    id: 'ideal',
    name: 'ІДЕАЛЬНИЙ СТАН КАТАЛОГУ (12 ПОЗИЦІЙ)',
    label: '1. Ідеальний стан',
    lectureReference: 'Лекція 6, Слайд 9: Повний екран пошуку з фільтрами та чіпсами',
    description: 'Екран пошуку з верхнім полем введення, кнопкою фільтрів з лічильником «3», активними чіпсами (🎬 Відео ×, 🛍️ Товари ×, Кераміка ×), лічильником «Знайдено: 12 позицій» та сіткою карток товарів та послуг з бейджами наявності.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      
      <!-- Top Search Header -->
      <rect width="390" height="130" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="16" y="45" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" letter-spacing="1">ПОШУК ТА РОЗШИРЕНИЙ КАТАЛОГ</text>
      <text x="16" y="65" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="16" font-weight="800">Пошук товарів і послуг</text>

      <rect x="16" y="80" width="270" height="38" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
      <circle cx="34" cy="99" r="6" stroke="#4F6C73" stroke-width="1.5"/>
      <line x1="39" y1="104" x2="44" y2="109" stroke="#4F6C73" stroke-width="1.5"/>
      <text x="50" y="103" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11">Кераміка ручної роботи</text>

      <rect x="294" y="80" width="80" height="38" rx="2" fill="#4F6C73"/>
      <text x="328" y="103" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Фільтри</text>
      <circle cx="362" cy="88" r="8" fill="#A7E4F2"/>
      <text x="362" y="91" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="800" text-anchor="middle">3</text>

      <!-- Active Filter Chips -->
      <g transform="translate(16, 138)">
        <rect x="0" y="0" width="85" height="24" rx="2" fill="#E0F2FE" stroke="#7DD3FC"/>
        <text x="8" y="16" fill="#0369A1" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">🎬 Відео ×</text>
        <rect x="95" y="0" width="90" height="24" rx="2" fill="#E0F2FE" stroke="#7DD3FC"/>
        <text x="103" y="16" fill="#0369A1" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">🛍️ Товари ×</text>
        <rect x="195" y="0" width="105" height="24" rx="2" fill="#E0F2FE" stroke="#7DD3FC"/>
        <text x="203" y="16" fill="#0369A1" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Кераміка ×</text>
      </g>

      <text x="16" y="190" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11">Знайдено: <tspan fill="#0D0D0D" font-weight="700">12 позицій</tspan></text>

      <!-- Cards Grid 2x2 -->
      <g transform="translate(16, 205)">
        <rect width="170" height="260" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="8" y="8" width="154" height="130" rx="2" fill="#4F6C73"/>
        <circle cx="85" cy="73" r="30" fill="#A7E4F2"/>
        <text x="14" y="24" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="8" font-weight="700">В НАЯВНОСТІ ✓</text>
        <text x="8" y="156" fill="#64748B" font-family="Open Sans, sans-serif" font-size="9">@lviv_clay</text>
        <text x="8" y="174" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Чашка глиняна</text>
        <text x="8" y="192" fill="#EAB308" font-family="Open Sans, sans-serif" font-size="10">★ 4.9 (42)</text>
        <text x="8" y="235" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="900">450 ₴</text>
        <rect x="95" y="218" width="67" height="28" rx="2" fill="#A7E4F2"/>
        <text x="128" y="236" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Купити</text>
      </g>

      <g transform="translate(204, 205)">
        <rect width="170" height="260" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="8" y="8" width="154" height="130" rx="2" fill="#20292D"/>
        <circle cx="85" cy="73" r="30" fill="#FEDF82"/>
        <text x="14" y="24" fill="#FEDF82" font-family="Open Sans, sans-serif" font-size="8" font-weight="700">📅 ПОСЛУГА</text>
        <text x="8" y="156" fill="#64748B" font-family="Open Sans, sans-serif" font-size="9">@lviv_clay</text>
        <text x="8" y="174" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Воркшоп з глини</text>
        <text x="8" y="192" fill="#EAB308" font-family="Open Sans, sans-serif" font-size="10">★ 5.0 (89)</text>
        <text x="8" y="235" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="900">720 ₴</text>
        <rect x="95" y="218" width="67" height="28" rx="2" fill="#A7E4F2"/>
        <text x="128" y="236" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Запис</text>
      </g>

      ${getRealTabBarSvg('search', false)}
    </svg>`,
  },
  {
    id: 'loading',
    name: 'СКЕЛЕТОН КАТАЛОГУ (LOADING GRID)',
    label: '2. Завантаження',
    lectureReference: 'Лекція 6, Слайд 16: Скелетон каталогу із шимерами замість стрибків сітки',
    description: 'Під час запиту на сервер каталог не залишає користувача перед порожнім полем, а відображає скелетони пошукових чіпсів та сітку 2x2 з сірими блоками цін та кнопок дій.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="130" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="16" y="80" width="358" height="38" rx="2" fill="#F1F5F9"/>

      <g transform="translate(16, 138)">
        <rect x="0" y="0" width="75" height="24" rx="2" fill="#E2E8F0"/>
        <rect x="85" y="0" width="85" height="24" rx="2" fill="#E2E8F0"/>
        <rect x="180" y="0" width="95" height="24" rx="2" fill="#E2E8F0"/>
      </g>

      <rect x="16" y="178" width="130" height="12" rx="2" fill="#E2E8F0"/>

      <g transform="translate(16, 205)">
        <rect width="170" height="250" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="8" y="8" width="154" height="120" rx="2" fill="#E2E8F0"/>
        <rect x="8" y="140" width="80" height="10" rx="2" fill="#CBD5E1"/>
        <rect x="8" y="156" width="130" height="12" rx="2" fill="#E2E8F0"/>
        <rect x="8" y="215" width="50" height="16" rx="2" fill="#CBD5E1"/>
        <rect x="95" y="210" width="67" height="26" rx="2" fill="#E2E8F0"/>
      </g>

      <g transform="translate(204, 205)">
        <rect width="170" height="250" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="8" y="8" width="154" height="120" rx="2" fill="#E2E8F0"/>
        <rect x="8" y="140" width="80" height="10" rx="2" fill="#CBD5E1"/>
        <rect x="8" y="156" width="130" height="12" rx="2" fill="#E2E8F0"/>
        <rect x="8" y="215" width="50" height="16" rx="2" fill="#CBD5E1"/>
        <rect x="95" y="210" width="67" height="26" rx="2" fill="#E2E8F0"/>
      </g>

      ${getRealTabBarSvg('search', false)}
    </svg>`,
  },
  {
    id: 'empty',
    name: 'ПОРОЖНІЙ СТАН: НІЧОГО НЕ ЗНАЙДЕНО (SEARCH EMPTY STATE)',
    label: '3. Порожній стан',
    lectureReference: 'Лекція 6, Слайд 10: Нічого не знайдено (Лупа + підказки «Можливо, ви мали на увазі»)',
    description: 'Векторна лупа зі знаком запитання, сповіщення «За вашим фільтром нічого не знайдено», розумні підказки (Кераміка, Шкіра, Постери) та пряма кнопка «Скинути всі фільтри».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="130" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="16" y="80" width="358" height="38" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
      <text x="30" y="104" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12">невідомий запит 12345</text>

      <g transform="translate(35, 260)">
        <circle cx="160" cy="50" r="36" fill="#FEF8E7" stroke="#FEDF82" stroke-width="2"/>
        <circle cx="156" cy="46" r="14" stroke="#4F6C73" stroke-width="2.5" fill="none"/>
        <line x1="166" y1="56" x2="176" y2="66" stroke="#4F6C73" stroke-width="3" stroke-linecap="round"/>

        <text x="160" y="120" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Нічого не знайдено</text>
        <text x="160" y="140" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">Перевірте правильність написання або спробуйте:</text>

        <!-- Suggested tags from Slide 10 -->
        <rect x="40" y="160" width="70" height="26" rx="13" fill="#E2E8F0"/>
        <text x="75" y="177" fill="#475569" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Кераміка</text>
        <rect x="120" y="160" width="80" height="26" rx="13" fill="#E2E8F0"/>
        <text x="160" y="177" fill="#475569" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Шкіра ручна</text>
        <rect x="210" y="160" width="70" height="26" rx="13" fill="#E2E8F0"/>
        <text x="245" y="177" fill="#475569" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Постери</text>

        <rect x="85" y="210" width="150" height="38" rx="2" fill="#4F6C73"/>
        <text x="160" y="234" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Скинути всі фільтри</text>
      </g>

      ${getRealTabBarSvg('search', false)}
    </svg>`,
  },
  {
    id: 'partial',
    name: 'ЧАСТКОВА ВИДАЧА (PARTIAL RESULTS: 1 ITEM FOUND)',
    label: '4. Частковий стан',
    lectureReference: 'Лекція 6, Слайд 9: Частковий стан (даних трохи, часто забувають)',
    description: 'Пошук за специфічним фільтром цін повернув тільки 1 ексклюзивний товар. Застосунок показує повну картку цього товару та додає блок «Рекомендоване від схожих майстрів» для заповнення порожнечі.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="130" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="16" y="80" width="358" height="38" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
      <text x="30" y="104" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12">Вінтажний постер Beatles 1969</text>

      <text x="16" y="155" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11">Знайдено: <tspan fill="#0D0D0D" font-weight="700">1 ексклюзивна позиція</tspan></text>

      <!-- Single item featured card -->
      <g transform="translate(16, 175)">
        <rect width="358" height="120" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="10" y="10" width="100" height="100" rx="2" fill="#3D555B"/>
        <circle cx="60" cy="60" r="24" fill="#A7E4F2"/>
        <text x="125" y="32" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">@retro_art · Львів</text>
        <text x="125" y="52" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800">Постер The Beatles 1969</text>
        <text x="125" y="70" fill="#EAB308" font-family="Open Sans, sans-serif" font-size="10">★ 4.9 (38 відгуків)</text>
        <text x="125" y="98" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="15" font-weight="900">1 200 ₴</text>
        <rect x="250" y="75" width="95" height="32" rx="2" fill="#A7E4F2"/>
        <text x="297" y="96" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Купити →</text>
      </g>

      <!-- Section: Схожі товари -->
      <text x="16" y="325" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800">Схожі товари майстрів</text>
      <rect x="16" y="340" width="170" height="180" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="204" y="340" width="170" height="180" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>

      ${getRealTabBarSvg('search', false)}
    </svg>`,
  },
  {
    id: 'error',
    name: 'ПОМИЛКА ЗАПИТУ КАТАЛОГУ (ERROR STATE)',
    label: '5. Помилка / Офлайн',
    lectureReference: 'Лекція 6, Слайд 24: Помилки системи (Сервер не відповідає / Зник інтернет)',
    description: 'Збій з\'єднання із сервером товарів під час фільтрації. Користувач бачить чітке пояснення без технічного сміття («Error 0x800...») та кнопку повторного запиту.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="130" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(35, 280)">
        <circle cx="160" cy="50" r="34" fill="#FEF2F2" stroke="#FECDD3" stroke-width="2"/>
        <line x1="150" y1="40" x2="170" y2="60" stroke="#AB3336" stroke-width="3" stroke-linecap="round"/>
        <line x1="170" y1="40" x2="150" y2="60" stroke="#AB3336" stroke-width="3" stroke-linecap="round"/>

        <text x="160" y="115" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Не вдалося завантажити каталог</text>
        <text x="160" y="135" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">Сервер не відповідає або зник інтернет.</text>
        <text x="160" y="152" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">Ваші збережені закладки залишаються доступними.</text>

        <rect x="90" y="175" width="140" height="38" rx="2" fill="#AB3336"/>
        <text x="160" y="199" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Спробувати ще раз</text>
      </g>

      ${getRealTabBarSvg('search', false)}
    </svg>`,
  },
];

// ============================================================================
// ЕКРАН 3: ЧАТ ТА ОФІЦІЙНА КАРТКА УГОДИ (CHAT & TRADE DEAL SCREEN) - 5 СТАНІВ
// ============================================================================
export const CHAT_TRADE_SCREEN_STATES: ScreenStateVariant[] = [
  {
    id: 'ideal',
    name: 'ІДЕАЛЬНИЙ СТАН: КАРТКА УГОДИ ОЧІКУЄ ПІДТВЕРДЖЕННЯ',
    label: '1. Ідеальний стан',
    lectureReference: 'Лекція 6, Слайд 9: Повний діалог з офіційною карткою фіксації умов',
    description: 'Розгорнута картка угоди #TR-8821 у стані «Очікує фіксації» з ескроу, кнопками «Підтвердити угоду» та рівнозначними «Скасувати» / «Переглянути умови», клікабельним аватаром автора та полем вводу.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      
      <!-- Top Chat Bar -->
      <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
      <path d="M 20 45 L 28 37 M 20 45 L 28 53" stroke="#0D0D0D" stroke-width="2" stroke-linecap="round"/>
      <circle cx="56" cy="45" r="18" fill="#4F6C73"/>
      <text x="56" y="49" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">РА</text>
      <circle cx="70" cy="57" r="4" fill="#7FE176" stroke="#FFFFFF" stroke-width="1.5"/>

      <text x="84" y="42" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">Ретро-вініл &amp; Арт ✓</text>
      <text x="84" y="55" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">@retro_art · Онлайн</text>

      <!-- Message Bubbles -->
      <g transform="translate(16, 95)">
        <rect width="260" height="42" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="12" y="20" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11">Вітаю! Платівка оригінальна, стан ідеальний.</text>
        <text x="215" y="34" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="9">14:15</text>
      </g>

      <g transform="translate(114, 150)">
        <rect width="260" height="42" rx="4" fill="#4F6C73"/>
        <text x="14" y="22" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11">Чудово! Сформуйте картку угоди, будь ласка.</text>
        <text x="210" y="34" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="9">14:16 ✓✓</text>
      </g>

      <!-- OFFICIAL TRADE CARD #TR-8821 -->
      <g transform="translate(16, 205)">
        <rect width="358" height="340" rx="4" fill="#FFFFFF" stroke="#4F6C73" stroke-width="2"/>
        <rect width="358" height="38" rx="2" fill="#4F6C73"/>
        <text x="16" y="24" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" letter-spacing="1">КАРТКА УГОДИ #TR-8821</text>
        <rect x="235" y="9" width="110" height="20" rx="2" fill="#FEDF82"/>
        <text x="290" y="23" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Очікує фіксації</text>

        <rect x="16" y="52" width="60" height="74" rx="2" fill="#20292D"/>
        <circle cx="46" cy="89" r="18" fill="#A7E4F2"/>
        <text x="88" y="68" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">The Beatles · Abbey Road (1969)</text>
        <text x="88" y="86" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">Продавець: @retro_art</text>
        <text x="88" y="102" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">Покупець: Наталія Ковальчук</text>
        <text x="88" y="120" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="15" font-weight="900">1 200 ₴</text>

        <rect x="16" y="136" width="326" height="66" rx="2" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="26" y="152" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Офіційне підтвердження умов:</text>
        <text x="26" y="168" fill="#64748B" font-family="Open Sans, sans-serif" font-size="9">Кошти депонуються на ескроу до перевірки товару.</text>
        <text x="26" y="184" fill="#4F6C73" font-family="monospace" font-size="9" font-weight="700">Код: ESCROW-S&amp;B-9942</text>

        <rect x="16" y="214" width="326" height="44" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
        <text x="179" y="241" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">✓ ПІДТВЕРДИТИ УГОДУ</text>

        <rect x="16" y="268" width="158" height="40" rx="2" fill="#FFF1F2" stroke="#FECDD3"/>
        <text x="95" y="293" fill="#AB3336" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Скасувати</text>

        <rect x="184" y="268" width="158" height="40" rx="2" fill="#F0F9FB" stroke="#4F6C73"/>
        <text x="263" y="293" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Переглянути умови</text>
      </g>

      <!-- Bottom Chat Input Bar -->
      <g transform="translate(0, 770)">
        <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="14" width="305" height="42" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="28" y="39" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="11">Напишіть повідомлення...</text>
        <rect x="331" y="14" width="43" height="42" rx="2" fill="#4F6C73"/>
        <path d="M 346 35 L 358 28 L 358 42 Z" fill="#FFFFFF"/>
      </g>
    </svg>`,
  },
  {
    id: 'loading',
    name: 'СКЕЛЕТОН ГІЛКИ ЧАТУ ТА УГОДИ (LOADING SKELETON)',
    label: '2. Завантаження',
    lectureReference: 'Лекція 6, Слайд 16: Чергування лівих і правих блоків різної довжини',
    description: 'Завантаження історії повідомлень та структури картки угоди без ривків висоти. Скелетон лівої та правої репліки і прямокутники скелетону трейд-картки.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
      <circle cx="56" cy="45" r="18" fill="#E2E8F0"/>
      <rect x="84" y="38" width="120" height="12" rx="2" fill="#CBD5E1"/>

      <!-- Message Skeletons -->
      <g transform="translate(16, 95)">
        <rect width="220" height="38" rx="4" fill="#E2E8F0"/>
        <rect x="12" y="14" width="140" height="10" rx="2" fill="#CBD5E1"/>
      </g>

      <g transform="translate(154, 145)">
        <rect width="220" height="38" rx="4" fill="#4F6C73" opacity="0.25"/>
        <rect x="14" y="14" width="130" height="10" rx="2" fill="#4F6C73" opacity="0.4"/>
      </g>

      <!-- Trade card skeleton -->
      <g transform="translate(16, 205)">
        <rect width="358" height="260" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect width="358" height="34" rx="2" fill="#CBD5E1"/>
        <rect x="16" y="50" width="60" height="70" rx="2" fill="#E2E8F0"/>
        <rect x="86" y="55" width="140" height="14" rx="2" fill="#CBD5E1"/>
        <rect x="86" y="78" width="90" height="10" rx="2" fill="#E2E8F0"/>
        <rect x="16" y="140" width="326" height="40" rx="2" fill="#E2E8F0"/>
        <rect x="16" y="195" width="158" height="36" rx="2" fill="#E2E8F0"/>
        <rect x="184" y="195" width="158" height="36" rx="2" fill="#E2E8F0"/>
      </g>

      <!-- Bottom Chat Input Bar -->
      <g transform="translate(0, 770)">
        <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="14" width="358" height="42" rx="2" fill="#F1F5F9"/>
      </g>
    </svg>`,
  },
  {
    id: 'empty',
    name: 'ПОРОЖНІЙ ЧАТ: ПОЧАТОК ДІАЛОГУ (EMPTY STATE)',
    label: '3. Порожній стан',
    lectureReference: 'Лекція 6, Слайд 9: Порожній стан — коли даних ще немає (новий діалог)',
    description: 'Новий діалог, що відкрився після кліку «Написати продавцю». Привітний системний блок, посилання на виріб та кнопка швидкої відправки запитання щодо наявності.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
      <circle cx="56" cy="45" r="18" fill="#4F6C73"/>
      <text x="56" y="49" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">РА</text>
      <text x="84" y="42" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">Ретро-вініл &amp; Арт</text>
      <text x="84" y="55" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">Діалог розпочато</text>

      <g transform="translate(35, 260)">
        <circle cx="160" cy="50" r="34" fill="#F0F9FB" stroke="#A7E4F2" stroke-width="2"/>
        <rect x="146" y="38" width="28" height="24" rx="2" stroke="#4F6C73" stroke-width="2" fill="none"/>

        <text x="160" y="115" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Поки що немає повідомлень</text>
        <text x="160" y="135" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">Напишіть продавцю, щоб узгодити умови</text>
        <text x="160" y="150" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">доставки або сформувати безпечну картку угоди.</text>

        <!-- Quick Question Chips -->
        <rect x="25" y="180" width="270" height="32" rx="16" fill="#FFFFFF" stroke="#CBD5E1"/>
        <text x="160" y="200" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">«Чи є постер у наявності для відправки?»</text>
      </g>

      <g transform="translate(0, 770)">
        <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="14" width="305" height="42" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="28" y="39" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="11">Напишіть повідомлення...</text>
        <rect x="331" y="14" width="43" height="42" rx="2" fill="#4F6C73"/>
        <path d="M 346 35 L 358 28 L 358 42 Z" fill="#FFFFFF"/>
      </g>
    </svg>`,
  },
  {
    id: 'partial',
    name: 'ПІДТВЕРДЖЕНА УГОДА (TRADE CONFIRMED)',
    label: '4. Підтверджено ✓',
    lectureReference: 'Лекція 6, Слайд 11 & 15: Успішна дія та статус депонування ескроу',
    description: 'Картка угоди перейшла у статус «Підтверджено ✓». Рамка стала зеленою (#7FE176), суму зафіксовано в системі, згенеровано захисний код С&Б-8492-ЗАХИСТ, а кнопки замінено на статус підготовки до відправки.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
      <circle cx="56" cy="45" r="18" fill="#4F6C73"/>
      <text x="56" y="49" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">РА</text>

      <!-- CONFIRMED TRADE CARD -->
      <g transform="translate(16, 120)">
        <rect width="358" height="280" rx="4" fill="#FFFFFF" stroke="#7FE176" stroke-width="2.5"/>
        <rect width="358" height="38" rx="2" fill="#4F6C73"/>
        <text x="16" y="24" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">КАРТКА УГОДИ #TR-8821</text>
        <rect x="235" y="9" width="110" height="20" rx="2" fill="#7FE176"/>
        <text x="290" y="23" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Підтверджено ✓</text>

        <rect x="16" y="52" width="60" height="74" rx="2" fill="#20292D"/>
        <text x="88" y="72" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">The Beatles · Abbey Road (1969)</text>
        <text x="88" y="92" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="16" font-weight="900">1 200 ₴</text>

        <rect x="16" y="140" width="326" height="66" rx="2" fill="#E8F9E6" stroke="#7FE176"/>
        <text x="179" y="164" fill="#166534" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">✓ Угоду зафіксовано в системі</text>
        <text x="179" y="184" fill="#4B5563" font-family="monospace" font-size="9" text-anchor="middle">Код перевірки: С&amp;Б-8492-ЗАХИСТ</text>

        <text x="179" y="235" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Товар готується майстром до відправки</text>
      </g>

      <g transform="translate(0, 770)">
        <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="14" width="305" height="42" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="28" y="39" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="11">Напишіть повідомлення...</text>
        <rect x="331" y="14" width="43" height="42" rx="2" fill="#4F6C73"/>
        <path d="M 346 35 L 358 28 L 358 42 Z" fill="#FFFFFF"/>
      </g>
    </svg>`,
  },
  {
    id: 'error',
    name: 'СКАСОВАНА УГОДА ТА ПОВЕРНЕННЯ КОШТІВ (TRADE CANCELLED)',
    label: '5. Скасовано ✕',
    lectureReference: 'Лекція 6, Слайд 31: Аварійний вихід, безпечне скасування дії без втрат',
    description: 'Угоду скасовано однією зі сторін. Червоний бейдж, закреслена ціна, офіційне сповіщення про повернення коштів з ескроу покупцю з кодом транзакції REFUND-TR-8821.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
      <circle cx="56" cy="45" r="18" fill="#4F6C73"/>
      <text x="56" y="49" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">РА</text>

      <!-- CANCELLED TRADE CARD -->
      <g transform="translate(16, 120)">
        <rect width="358" height="300" rx="4" fill="#FFFFFF" stroke="#AB3336" stroke-width="2"/>
        <rect width="358" height="38" rx="2" fill="#4F6C73"/>
        <text x="16" y="24" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">КАРТКА УГОДИ #TR-8821</text>
        <rect x="235" y="9" width="110" height="20" rx="2" fill="#AB3336"/>
        <text x="290" y="23" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Скасовано ✕</text>

        <rect x="16" y="52" width="60" height="74" rx="2" fill="#20292D"/>
        <text x="88" y="70" fill="#64748B" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-decoration="line-through">The Beatles · Abbey Road</text>
        <text x="88" y="90" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="14" font-weight="900" text-decoration="line-through">1 200 ₴</text>

        <!-- Refund Explanation box -->
        <rect x="16" y="136" width="326" height="74" rx="2" fill="#FEF2F2" stroke="#FECDD3"/>
        <text x="26" y="156" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">✕ Угоду анульовано</text>
        <text x="26" y="174" fill="#B91C1C" font-family="Open Sans, sans-serif" font-size="9">Кошти ескроу розблоковано та повернено на рахунок покупця.</text>
        <text x="26" y="194" fill="#7F1D1D" font-family="monospace" font-size="9" font-weight="700">REFUND-TR-8821-ESCROW</text>

        <rect x="16" y="230" width="200" height="38" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="116" y="254" fill="#475569" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Повторити замовлення</text>

        <rect x="224" y="230" width="118" height="38" rx="2" fill="#FFFFFF" stroke="#CBD5E1"/>
        <text x="283" y="254" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Підтримка</text>
      </g>

      <g transform="translate(0, 770)">
        <rect width="390" height="74" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="14" width="358" height="42" rx="2" fill="#F1F5F9"/>
      </g>
    </svg>`,
  },
];

// ============================================================================
// ЕКРАН 4: КАБІНЕТ ПРОДАВЦЯ (SELLER PROFILE SCREEN) - 5 СТАНІВ
// ============================================================================
export const SELLER_PROFILE_SCREEN_STATES: ScreenStateVariant[] = [
  {
    id: 'ideal',
    name: 'ІДЕАЛЬНИЙ СТАН: ПОВНИЙ КАБІНЕТ МАЙСТРА',
    label: '1. Ідеальний стан',
    lectureReference: 'Лекція 6, Слайд 6: Кілька відео, заповнений профіль та активна вітрина',
    description: 'Шапка профілю з аватаром, нікнеймом @lviv_leather_craft, статистикою (14 оголошень, 4.2k підписників, 28.9k лайків), кнопками «+ Додати публікацію», «Редагувати профіль», «⚙ Налаштування» під нею, табами та вітриною.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="16" y="38" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="9" font-weight="700">КАБІНЕТ ПРОДАВЦЯ</text>
      <text x="195" y="38" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800" text-anchor="middle">@lviv_leather_craft</text>

      <!-- Profile Header -->
      <g transform="translate(16, 75)">
        <rect width="358" height="240" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <circle cx="179" cy="45" r="28" fill="#4F6C73"/>
        <text x="179" y="52" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="16" font-weight="900" text-anchor="middle">ЛШ</text>
        <circle cx="201" cy="65" r="7" fill="#7FE176" stroke="#FFFFFF" stroke-width="2"/>

        <text x="179" y="90" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800" text-anchor="middle">Львівська майстерня шкіри ✓</text>
        <text x="179" y="105" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Львів, вул. Вірменська, 14 · Власне виробництво</text>

        <g transform="translate(50, 115)">
          <text x="25" y="14" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="900" text-anchor="middle">14</text>
          <text x="25" y="26" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="9" text-anchor="middle">ОГОЛОШЕНЬ</text>
          <text x="130" y="14" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="900" text-anchor="middle">4.2k</text>
          <text x="130" y="26" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="9" text-anchor="middle">ПІДПИСНИКІВ</text>
          <text x="235" y="14" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="900" text-anchor="middle">28.9k</text>
          <text x="235" y="26" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="9" text-anchor="middle">ЛАЙКІВ</text>
        </g>

        <!-- Actions -->
        <g transform="translate(20, 155)">
          <rect x="0" y="0" width="154" height="34" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
          <text x="77" y="22" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати публікацію</text>

          <rect x="164" y="0" width="154" height="34" rx="2" fill="#FFFFFF" stroke="#4F6C73"/>
          <text x="241" y="22" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Редагувати профіль</text>

          <rect x="0" y="42" width="318" height="32" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
          <text x="159" y="62" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">⚙ Налаштування (Мова / Тема)</text>
        </g>
      </g>

      <!-- Vitrine Grid -->
      <g transform="translate(16, 335)">
        <rect x="0" y="0" width="172" height="180" rx="3" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="8" y="8" width="156" height="100" rx="2" fill="#4F6C73"/>
        <text x="8" y="125" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Шкіряний ремінь ручний</text>
        <text x="8" y="145" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="900">890 ₴</text>

        <rect x="186" y="0" width="172" height="180" rx="3" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="194" y="8" width="156" height="100" rx="2" fill="#3D555B"/>
        <text x="194" y="125" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Кардхолдер Pueblo</text>
        <text x="194" y="145" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="900">420 ₴</text>
      </g>

      ${getRealTabBarSvg('profile', false)}
    </svg>`,
  },
  {
    id: 'loading',
    name: 'СКЕЛЕТОН ПРОФІЛЮ ТА ВІТРИНИ',
    label: '2. Завантаження',
    lectureReference: 'Лекція 6, Слайд 16: Скелетон профілю з колом аватара та лічильниками',
    description: 'Круглий скелетон аватарки 80px, прямокутні блоки лічильників, кнопки-плейсхолдери та сітка карток вітрини 2x2.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(16, 75)">
        <rect width="358" height="240" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <circle cx="179" cy="45" r="28" fill="#E2E8F0"/>
        <rect x="119" y="86" width="120" height="14" rx="2" fill="#CBD5E1"/>
        <rect x="139" y="106" width="80" height="10" rx="2" fill="#E2E8F0"/>

        <g transform="translate(50, 125)">
          <rect x="10" y="0" width="30" height="14" rx="2" fill="#CBD5E1"/>
          <rect x="115" y="0" width="30" height="14" rx="2" fill="#CBD5E1"/>
          <rect x="220" y="0" width="30" height="14" rx="2" fill="#CBD5E1"/>
        </g>

        <rect x="20" y="160" width="154" height="34" rx="2" fill="#E2E8F0"/>
        <rect x="184" y="160" width="154" height="34" rx="2" fill="#E2E8F0"/>
      </g>

      <g transform="translate(16, 335)">
        <rect x="0" y="0" width="172" height="180" rx="3" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="8" y="8" width="156" height="100" rx="2" fill="#E2E8F0"/>
        <rect x="186" y="0" width="172" height="180" rx="3" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="194" y="8" width="156" height="100" rx="2" fill="#E2E8F0"/>
      </g>

      ${getRealTabBarSvg('profile', false)}
    </svg>`,
  },
  {
    id: 'empty',
    name: 'ПОРОЖНІЙ СТАН: ПЕРШИЙ ВХІД БЕЗ ПУБЛІКАЦІЙ',
    label: '3. Порожній стан',
    lectureReference: 'Лекція 6, Слайд 6 & 10: Свій без відео / Перший раз (Ілюстрація + CTA додати)',
    description: 'Майстер щойно створив обліковий запис. Лічильники по нулях, замість порожнього білого простору показано тематичну ілюстрацію та головну кнопку «+ Завантажити перше відео».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(16, 75)">
        <rect width="358" height="190" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <circle cx="179" cy="45" r="28" fill="#4F6C73"/>
        <text x="179" y="52" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="16" font-weight="900" text-anchor="middle">ЛШ</text>
        <text x="179" y="90" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800" text-anchor="middle">@lviv_leather_craft</text>
        
        <g transform="translate(60, 110)">
          <text x="20" y="14" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="900">0</text>
          <text x="20" y="26" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="9">Оголошень</text>
          <text x="120" y="14" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="900">0</text>
          <text x="120" y="26" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="9">Підписників</text>
          <text x="210" y="14" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="900">0</text>
          <text x="210" y="26" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="9">Лайків</text>
        </g>
      </g>

      <!-- Friendly Empty State from Slide 10 -->
      <g transform="translate(35, 290)">
        <rect width="320" height="230" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <circle cx="160" cy="50" r="26" fill="#F0F9FB" stroke="#A7E4F2" stroke-width="2"/>
        <path d="M 148 44 L 172 44 L 172 58 L 160 64 L 148 58 Z" stroke="#4F6C73" stroke-width="1.8" fill="none"/>

        <text x="160" y="105" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="13" font-weight="800" text-anchor="middle">У вас ще немає товарів на продаж</text>
        <text x="160" y="125" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Опублікуйте перше відео майстерні та відкрийте</text>
        <text x="160" y="140" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">можливість замовлення через чат-трейд.</text>

        <rect x="60" y="165" width="200" height="42" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
        <text x="160" y="191" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">+ Додати публікацію</text>
      </g>

      ${getRealTabBarSvg('profile', false)}
    </svg>`,
  },
  {
    id: 'partial',
    name: 'ЧАСТКОВИЙ СТАН: 1 ТОВАР ТА ЧЕРНЕТКА',
    label: '4. Частковий / Чернетка',
    lectureReference: 'Лекція 6, Слайд 11: Чернетка (лише на цьому телефоні) та 1 товар',
    description: 'Майстер має 1 активне відео та 1 незавершену локальну чернетку. Вітрина показує бейджі статусу «Чернетка» та прогрес публікації.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(16, 75)">
        <rect width="358" height="170" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <circle cx="179" cy="40" r="24" fill="#4F6C73"/>
        <text x="179" y="46" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="14" font-weight="900" text-anchor="middle">ЛШ</text>
        <text x="179" y="80" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">@lviv_leather_craft</text>
        <text x="179" y="100" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Оголошень: 1 · Чернеток: 1</text>
      </g>

      <!-- Vitrine with Draft and Live Product -->
      <g transform="translate(16, 260)">
        <rect x="0" y="0" width="172" height="190" rx="3" fill="#FFFFFF" stroke="#CBD5E1"/>
        <rect x="8" y="8" width="156" height="100" rx="2" fill="#4F6C73"/>
        <text x="14" y="24" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="8" font-weight="700">ОПУБЛІКОВАНО ✓</text>
        <text x="8" y="125" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Шкіряний ремінь</text>
        <text x="8" y="145" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="900">890 ₴</text>

        <!-- Draft Card from Slide 11 -->
        <rect x="186" y="0" width="172" height="190" rx="3" fill="#FFFBEB" stroke="#FEDF82" stroke-dasharray="4 2"/>
        <rect x="194" y="8" width="156" height="100" rx="2" fill="#20292D"/>
        <rect x="200" y="14" width="90" height="18" rx="2" fill="#FEDF82"/>
        <text x="245" y="26" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="8" font-weight="800" text-anchor="middle">📝 ЧЕРНЕТКА</text>
        <text x="194" y="125" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Воркшоп з тиснення</text>
        <text x="194" y="145" fill="#B45309" font-family="Open Sans, sans-serif" font-size="9" font-weight="700">Лише на цьому телефоні</text>
      </g>

      ${getRealTabBarSvg('profile', false)}
    </svg>`,
  },
  {
    id: 'error',
    name: 'ПІДТВЕРДЖЕННЯ ВИДАЛЕННЯ ТА ВІДНОВЛЕННЯ (MODAL & UNDO)',
    label: '5. Модалка & Undo',
    lectureReference: 'Лекція 6, Слайди 20, 26, 32: «Ви впевнені?» при видаленні відео + снекбар відновлення',
    description: 'Майстер ініціював видалення відео. Система запитує підтвердження незворотної дії у модальному вікні («Видалити це відео? [Видалити] [Скасувати]») та показує снекбар з можливістю скасування на 30 днів (Кошик «Нещодавно видалені»).',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <!-- Dimmed Background Overlay -->
      <rect x="0" y="60" width="390" height="728" fill="rgba(0,0,0,0.6)"/>

      <!-- Modal Dialog from Slide 20 & 26 -->
      <g transform="translate(35, 300)">
        <rect width="320" height="190" rx="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
        <text x="160" y="38" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Видалити це відео?</text>
        <text x="160" y="60" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11" text-anchor="middle">Відео зникне з вашого профілю та пошуку.</text>
        <text x="160" y="78" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Ви зможете відновити його з кошика протягом 30 днів.</text>

        <!-- Red Delete Button -->
        <rect x="24" y="100" width="272" height="38" rx="4" fill="#AB3336"/>
        <text x="160" y="124" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Видалити</text>

        <!-- Cancel Emergency Exit from Slide 31 -->
        <rect x="24" y="146" width="272" height="34" rx="4" fill="#F1F5F9"/>
        <text x="160" y="168" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Скасувати</text>
      </g>

      <!-- Floating Snackbar with Undo from Slide 1 & 32 -->
      <g transform="translate(20, 720)">
        <rect width="350" height="46" rx="6" fill="#0D0D0D" stroke="#A7E4F2" stroke-width="1"/>
        <text x="16" y="28" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11">Відео переміщено до кошика</text>
        <text x="280" y="28" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="11" font-weight="800">СКАСУВАТИ</text>
      </g>

      ${getRealTabBarSvg('profile', false)}
    </svg>`,
  },
];

// ============================================================================
// ЕКРАН 5: МОДАЛЬНА КАРТКА ТОВАРУ PDP (PRODUCT DETAIL MODAL) - 5 СТАНІВ
// ============================================================================
export const PRODUCT_DETAIL_SCREEN_STATES: ScreenStateVariant[] = [
  {
    id: 'ideal',
    name: 'ІДЕАЛЬНИЙ СТАН: ПОВНА КАРТКА ТОВАРУ В НАЯВНОСТІ',
    label: '1. Ідеальний стан',
    lectureReference: 'Лекція 6, Слайд 9: Повний PDP з ціною, рейтингом, описом та CTA чату',
    description: 'Екран товару «Постер The Beatles 1969»: великий постер, статус «✓ В наявності для замовлення», рейтинг ★ 4.9, блок майстра @retro_art, характеристики та кнопка «Перейти до оформлення через чат →».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>
      <path d="M 20 35 L 28 27 M 20 35 L 28 43" stroke="#0D0D0D" stroke-width="2" stroke-linecap="round"/>
      <text x="195" y="38" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Картка товару</text>
      
      <circle cx="320" cy="35" r="15" fill="#F0F9FB"/>
      <path d="M 315 29 L 325 29 L 325 41 L 320 38 L 315 41 Z" fill="#A7E4F2"/>

      <g transform="translate(16, 75)">
        <text x="179" y="16" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="15" font-weight="800" text-anchor="middle">The Beatles · Abbey Road Poster</text>
        <text x="179" y="34" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">✓ В наявності для замовлення</text>

        <rect x="0" y="46" width="358" height="260" rx="4" fill="#20292D"/>
        <circle cx="179" cy="176" r="60" fill="#4F6C73"/>
        <circle cx="179" cy="176" r="30" fill="#A7E4F2"/>

        <g transform="translate(0, 320)">
          <text x="0" y="24" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="22" font-weight="900">1 200 ₴</text>
          <text x="358" y="20" fill="#EAB308" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="end">★ 4.9 <tspan fill="#64748B">(38 відгуків)</tspan></text>
        </g>

        <!-- Seller strip -->
        <g transform="translate(0, 360)">
          <rect width="358" height="60" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
          <circle cx="30" cy="30" r="18" fill="#4F6C73"/>
          <text x="30" y="35" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">РА</text>
          <text x="60" y="26" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Ретро-вініл &amp; Арт ✓</text>
          <text x="60" y="42" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">Львів · Відправка Новою Поштою</text>
        </g>

        <!-- Specs -->
        <g transform="translate(0, 435)">
          <rect width="358" height="90" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
          <text x="16" y="24" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Характеристики:</text>
          <text x="16" y="44" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">• Розмір: 60 × 90 см, щільний папір 250 г/м²</text>
          <text x="16" y="62" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10">• Стан: Колекційний (Mint condition)</text>
        </g>
      </g>

      <g transform="translate(0, 750)">
        <rect width="390" height="94" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="16" width="358" height="48" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
        <text x="195" y="45" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Перейти до оформлення через чат →</text>
      </g>
    </svg>`,
  },
  {
    id: 'loading',
    name: 'СКЕЛЕТОН КАРТКИ ТОВАРУ PDP',
    label: '2. Завантаження',
    lectureReference: 'Лекція 6, Слайд 16: Скелетон великого медіа-блоку та характеристик',
    description: 'Плавне завантаження детальної інформації про виріб. Шимований прямокутник постера, сірий скелетон ціни та плашки майстра.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(16, 75)">
        <rect x="60" y="8" width="238" height="16" rx="2" fill="#CBD5E1"/>
        <rect x="0" y="46" width="358" height="260" rx="4" fill="#E2E8F0"/>

        <g transform="translate(0, 320)">
          <rect x="0" y="8" width="100" height="20" rx="2" fill="#CBD5E1"/>
          <rect x="270" y="8" width="88" height="16" rx="2" fill="#E2E8F0"/>
        </g>

        <rect x="0" y="360" width="358" height="60" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="0" y="435" width="358" height="90" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
      </g>

      <g transform="translate(0, 750)">
        <rect width="390" height="94" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="16" width="358" height="48" rx="2" fill="#E2E8F0"/>
      </g>
    </svg>`,
  },
  {
    id: 'empty',
    name: 'ТОВАР РОЗПРОДАНО: ОЧІКУВАННЯ НОВОГО ТИРАЖУ',
    label: '3. Немає в наявності',
    lectureReference: 'Лекція 6, Слайд 10: Порожній залишок із чіткою дією передзамовлення',
    description: 'Виріб тимчасово розпродано. Повідомлення про орієнтовний час виготовлення наступної партії та кнопка «Повідомити про наявність» замість звичайної неробочої кнопки «Купити».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(16, 75)">
        <text x="179" y="16" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="15" font-weight="800" text-anchor="middle">The Beatles · Abbey Road Poster</text>
        <text x="179" y="34" fill="#AB3336" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">✕ Тимчасово розпродано</text>

        <rect x="0" y="46" width="358" height="260" rx="4" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="179" y="180" fill="#64748B" font-family="Open Sans, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Автор виготовляє новий тираж</text>

        <!-- Availability box -->
        <rect x="0" y="330" width="358" height="80" rx="4" fill="#FEF8E7" stroke="#FEDF82"/>
        <text x="16" y="355" fill="#B45309" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Очікується у майстерні через 3–5 днів</text>
        <text x="16" y="375" fill="#78350F" font-family="Open Sans, sans-serif" font-size="10">Залиште запит на сповіщення, і ми надішлемо вам повідомлення в чат одразу після надходження виробу.</text>
      </g>

      <g transform="translate(0, 750)">
        <rect width="390" height="94" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="16" width="358" height="48" rx="2" fill="#FEDF82" stroke="#4F6C73" stroke-width="1.5"/>
        <text x="195" y="45" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">🔔 Повідомити про наявність</text>
      </g>
    </svg>`,
  },
  {
    id: 'partial',
    name: 'ПОСЛУГА З КАЛЕНДАРЕМ ТА БРОНЮВАННЯМ СЛОТУ',
    label: '4. Послуга / Запис',
    lectureReference: 'Лекція 6, Слайд 9: Частковий стан форми з вибором вільного часу',
    description: 'Картка послуги (гончарний майстер-клас). Замість прямої кнопки купівлі представлено інтерактивний календар вибору дат та кнопку «Запис на обраний слот 720 ₴».',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(16, 75)">
        <text x="179" y="16" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="15" font-weight="800" text-anchor="middle">Індивідуальний воркшоп з глини</text>
        <text x="179" y="34" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">📅 Послуга з відкритим розкладом</text>

        <!-- Mini Calendar Selection -->
        <rect x="0" y="50" width="358" height="120" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
        <text x="16" y="74" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">Оберіть дату сеансу (Львів):</text>
        
        <rect x="16" y="85" width="75" height="36" rx="4" fill="#4F6C73"/>
        <text x="53" y="102" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Пт, 24 бер</text>
        <text x="53" y="114" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="8" text-anchor="middle">14:00 ✓</text>

        <rect x="100" y="85" width="75" height="36" rx="4" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="137" y="102" fill="#475569" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Сб, 25 бер</text>
        <text x="137" y="114" fill="#64748B" font-family="Open Sans, sans-serif" font-size="8" text-anchor="middle">11:00</text>

        <rect x="185" y="85" width="75" height="36" rx="4" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="222" y="102" fill="#475569" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Сб, 25 бер</text>
        <text x="222" y="114" fill="#64748B" font-family="Open Sans, sans-serif" font-size="8" text-anchor="middle">16:30</text>

        <!-- Price -->
        <text x="0" y="200" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="20" font-weight="900">720 ₴ / 2 год</text>
      </g>

      <g transform="translate(0, 750)">
        <rect width="390" height="94" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="16" width="358" height="48" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
        <text x="195" y="45" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Записатися на Пт, 24 бер (14:00) →</text>
      </g>
    </svg>`,
  },
  {
    id: 'error',
    name: 'ПОМИЛКА ОФОРМЛЕННЯ (ERROR STATE & RETRY)',
    label: '5. Помилка / Офлайн',
    lectureReference: 'Лекція 6, Слайд 27 & 29: Анатомія доброго повідомлення про помилку',
    description: 'Збій перевірки резерву виробу або відсутність інтернет-з\'єднання. Інлайн-попередження поруч із дією (Слайд 20 & 29) та кнопка швидкого повтору.',
    svg: `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="390" height="844" rx="36" fill="#F8FAFC"/>
      <rect width="390" height="60" fill="#FFFFFF" stroke="#E2E8F0"/>

      <g transform="translate(16, 75)">
        <text x="179" y="16" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="15" font-weight="800" text-anchor="middle">The Beatles · Abbey Road Poster</text>

        <!-- Inline error notification from Slide 27 & 29 -->
        <rect x="0" y="40" width="358" height="64" rx="4" fill="#FEF2F2" stroke="#AB3336" stroke-width="1.5"/>
        <circle cx="24" cy="62" r="8" fill="#AB3336"/>
        <text x="24" y="66" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="900" text-anchor="middle">!</text>
        <text x="40" y="58" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">Не вдалося зарезервувати товар</text>
        <text x="40" y="74" fill="#B91C1C" font-family="Open Sans, sans-serif" font-size="9">Немає зв'язку з ескроу-сервером. Ми зберегли ваш запит.</text>
        <rect x="250" y="50" width="95" height="24" rx="2" fill="#AB3336"/>
        <text x="297" y="66" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Спробувати ще</text>

        <rect x="0" y="115" width="358" height="240" rx="4" fill="#F1F5F9" stroke="#CBD5E1"/>
      </g>

      <g transform="translate(0, 750)">
        <rect width="390" height="94" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="16" y="16" width="358" height="48" rx="2" fill="#E2E8F0" stroke="#CBD5E1"/>
        <text x="195" y="45" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Очікування відновлення зв'язку...</text>
      </g>
    </svg>`,
  },
];
