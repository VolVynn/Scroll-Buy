import React from 'react';
import { ActiveTab, AppLanguage, AppTheme } from '../types';
import { getTranslation } from '../data/translations';

interface NavigationTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  pendingTradeCount?: number;
  appLanguage?: AppLanguage;
  appTheme?: AppTheme;
}

/**
 * НИЖНЯ ПАНЕЛЬ НАВІГАЦІЇ (Navigation Tab Bar)
 * Повна відповідність макету та фото мобільного додатку:
 * - Фіксована висота 56px (h-[56px] min-h-[56px])
 * - 5 розділів з рівномірним розподілом (flex-1):
 *   1) Стрічка (Home) — силует/контур будинку
 *   2) Пошук (Search) — лупа пошуку
 *   3) Центральна піднята кнопка (+ Додати) — коло 38×38px кольору #4F6C73 з білим плюсом, білою рамкою 2px та підписом
 *   4) Чати (MessageSquare) — хмаринка повідомлення з червоним круглим бейджем #AB3336
 *   5) Кабінет (User) — аватар користувача
 * - Світла тема: фон #FFFFFF, border-t #E2E8F0, активний #4F6C73, неактивний #64748B
 * - Темна тема: фон #161B1E, border-t #2C353D, активний #A7E4F2, неактивний #94A3B8
 */
export const NavigationTabBar: React.FC<NavigationTabBarProps> = ({
  activeTab,
  onTabChange,
  pendingTradeCount = 0,
  appLanguage = 'uk',
  appTheme = 'light',
}) => {
  const t = getTranslation(appLanguage);
  const isDark = appTheme === 'dark';

  // Badge count: matches the spec (1 for default, 2 if messages is active, or actual count)
  const badgeNumber = pendingTradeCount > 0 
    ? pendingTradeCount 
    : (activeTab === 'messages' ? 2 : 1);

  // Active / inactive WCAG AA compliant colors
  const activeColor = isDark ? '#A7E4F2' : '#4F6C73';
  const inactiveColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <nav 
      className={`relative h-[56px] min-h-[56px] max-h-[56px] border-t px-1 flex items-stretch justify-around z-30 select-none shadow-xs transition-colors shrink-0 ${
        isDark 
          ? 'bg-[#161B1E] border-[#2C353D]' 
          : 'bg-white border-[#E2E8F0]'
      }`}
      style={{ fontFamily: "'Open Sans', system-ui, -apple-system, sans-serif" }}
      aria-label="Нижня панель навігації"
    >
      {/* 1. Стрічка (Home / Feed) */}
      <button
        type="button"
        onClick={() => onTabChange('feed')}
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors cursor-pointer group ${
          activeTab === 'feed' ? 'font-bold' : 'font-medium'
        }`}
        style={{ color: activeTab === 'feed' ? activeColor : inactiveColor }}
        title={t.navFeed}
      >
        <svg 
          className="w-[22px] h-[22px] transition-transform group-hover:scale-105" 
          viewBox="0 0 24 24" 
          fill={activeTab === 'feed' ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={activeTab === 'feed' ? '0' : '1.9'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {activeTab === 'feed' ? (
            <path d="M12 3L2 12h3v8a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-8h3L12 3z" />
          ) : (
            <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
          )}
        </svg>
        <span className="text-[10px] leading-tight mt-0.5 tracking-tight">
          {t.navFeed}
        </span>
      </button>

      {/* 2. Пошук (Search) */}
      <button
        type="button"
        onClick={() => onTabChange('search')}
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors cursor-pointer group ${
          activeTab === 'search' ? 'font-bold' : 'font-medium'
        }`}
        style={{ color: activeTab === 'search' ? activeColor : inactiveColor }}
        title={t.navSearch}
      >
        <svg 
          className="w-[22px] h-[22px] transition-transform group-hover:scale-105" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={activeTab === 'search' ? '2.4' : '1.9'} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="6.8" />
          <line x1="16.2" y1="16.2" x2="21.2" y2="21.2" />
        </svg>
        <span className="text-[10px] leading-tight mt-0.5 tracking-tight">
          {t.navSearch}
        </span>
      </button>

      {/* 3. Центральна піднята кнопка (+ Додати / Create) */}
      <button
        type="button"
        onClick={() => onTabChange('create')}
        className="relative flex flex-col items-center justify-start flex-1 h-full cursor-pointer group pt-1"
        aria-label="Створити публікацію чи товар"
        title="+ Додати"
      >
        {/* Floating elevated 38x38 button with white border & shadow */}
        <div 
          className="w-[38px] h-[38px] -mt-3.5 rounded-full bg-[#4F6C73] hover:bg-[#3D555B] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-active:scale-95 transition-all border-2 border-white dark:border-[#161B1E] shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <span 
          className={`text-[10px] font-bold mt-0.5 tracking-tight transition-colors ${
            activeTab === 'create'
              ? (isDark ? 'text-[#A7E4F2]' : 'text-[#4F6C73]')
              : (isDark ? 'text-white' : 'text-[#0D0D0D]')
          }`}
        >
          + Додати
        </span>
      </button>

      {/* 4. Чати (Message bubble with red notification badge) */}
      <button
        type="button"
        onClick={() => onTabChange('messages')}
        className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors cursor-pointer group ${
          activeTab === 'messages' ? 'font-bold' : 'font-medium'
        }`}
        style={{ color: activeTab === 'messages' ? activeColor : inactiveColor }}
        title={t.navChats}
      >
        <div className="relative flex items-center justify-center">
          <svg 
            className="w-[22px] h-[22px] transition-transform group-hover:scale-105" 
            viewBox="0 0 24 24" 
            fill={activeTab === 'messages' ? (isDark ? 'rgba(167, 228, 242, 0.15)' : 'rgba(79, 108, 115, 0.15)') : 'none'} 
            stroke="currentColor" 
            strokeWidth={activeTab === 'messages' ? '2.3' : '1.9'}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>

          {/* Red circular notification badge with white number */}
          <span 
            className="absolute -top-1.5 -right-2 min-w-4 h-4 px-0.5 rounded-full bg-[#AB3336] text-white text-[9px] font-extrabold flex items-center justify-center leading-none border border-white dark:border-[#161B1E] shadow-2xs pointer-events-none"
          >
            {badgeNumber}
          </span>
        </div>
        <span className="text-[10px] leading-tight mt-0.5 tracking-tight">
          {t.navChats}
        </span>
      </button>

      {/* 5. Кабінет (User Profile) */}
      <button
        type="button"
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors cursor-pointer group ${
          activeTab === 'profile' ? 'font-bold' : 'font-medium'
        }`}
        style={{ color: activeTab === 'profile' ? activeColor : inactiveColor }}
        title={t.navProfile}
      >
        <svg 
          className="w-[22px] h-[22px] transition-transform group-hover:scale-105" 
          viewBox="0 0 24 24" 
          fill={activeTab === 'profile' ? (isDark ? 'rgba(167, 228, 242, 0.15)' : 'rgba(79, 108, 115, 0.15)') : 'none'} 
          stroke="currentColor" 
          strokeWidth={activeTab === 'profile' ? '2.3' : '1.9'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[10px] leading-tight mt-0.5 tracking-tight">
          {t.navProfile}
        </span>
      </button>
    </nav>
  );
};
