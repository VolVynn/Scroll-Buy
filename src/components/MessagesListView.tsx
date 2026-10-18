import React, { useState } from 'react';
import { Product, ChatMessage, AppLanguage, AppTheme } from '../types';
import { getTranslation } from '../data/translations';
import { ShieldCheck, ChevronRight, Clock, CheckCircle, XCircle, Store, User } from 'lucide-react';

interface MessagesListViewProps {
  products: Product[];
  chatHistory: Record<string, ChatMessage[]>;
  onSelectChat: (product: Product) => void;
  appLanguage?: AppLanguage;
  appTheme?: AppTheme;
}

export const MessagesListView: React.FC<MessagesListViewProps> = ({
  products,
  chatHistory,
  onSelectChat,
  appLanguage = 'uk',
  appTheme = 'light',
}) => {
  const t = getTranslation(appLanguage);

  // Two subtabs: "Чати з продавцями" vs "Чати з покупцями"
  const [chatCategory, setChatCategory] = useState<'sellers' | 'buyers'>('sellers');

  // Chats with sellers: dialogs with @retro_art, @lviv_clay, etc.
  const sellerChats = products.filter((p) => p.authorHandle === '@retro_art' || p.authorHandle === '@lviv_clay');

  // Customer inquiries to our Lviv Leather Craft shop
  const buyerDialogs = [
    {
      id: 'chat-buyer-1',
      title: 'Марта Клименко (@marta_buyer)',
      avatar: 'МК',
      subtitle: appLanguage === 'en' ? 'Order: Leather cardholder with initials' : 'Замовлення: Шкіряний кардхолдер з ініціалами',
      lastMessage: appLanguage === 'en' ? 'Hello! Can I order this in cognac leather?' : 'Вітаю! Чи можна виготовити кардхолдер у коньячному кольорі з ініціалами?',
      time: '11:42',
      productRef: products.find(p => p.id === 'prod-leather-cardholder') || products[0],
      badge: appLanguage === 'en' ? 'New message' : 'Нове повідомлення',
    },
    {
      id: 'chat-buyer-2',
      title: 'Андрій Левицький (@andriy_buyer)',
      avatar: 'АЛ',
      subtitle: appLanguage === 'en' ? 'Workshop booking: Crafting belt' : 'Запис на воркшоп: створення ременя',
      lastMessage: appLanguage === 'en' ? 'Hello! Booked for Saturday workshop.' : 'Добрий день! Записався до вас на суботу на воркшоп з виготовлення ременя.',
      time: appLanguage === 'en' ? 'Yesterday' : 'Вчора',
      productRef: products.find(p => p.id === 'prod-leather-cardholder') || products[0],
      badge: appLanguage === 'en' ? 'Booking' : 'Бронювання',
    },
  ];

  return (
    <div className={`absolute inset-0 z-20 flex flex-col overflow-y-auto no-scrollbar pb-16 transition-colors ${
      appTheme === 'dark' ? 'bg-[#121618] text-neutral-100' : 'bg-[#F2F2F2] text-[#0D0D0D]'
    }`}>
      {/* Messages Header - Updated Title and Subtitle */}
      <div className={`sticky top-0 z-20 p-4 border-b shadow-2xs space-y-3 transition-colors ${
        appTheme === 'dark' ? 'bg-[#181F22] border-neutral-700/80' : 'bg-white border-[#A6A6A6]/30'
      }`}>
        <div>
          <span className="text-[9px] font-mono tracking-widest text-[#4F6C73] dark:text-[#A7E4F2] font-bold">
            {appLanguage === 'en' ? 'MESSAGES & TRADES' : 'ПОВІДОМЛЕННЯ ТА ТРЕЙДИ'}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-[#0D0D0D] dark:text-white font-heading">
            {t.chatsTitle}
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sarala">
            {t.chatsSubtitle}
          </p>
        </div>

        {/* Two Tabs: Чати з продавцями vs Чати з покупцями */}
        <div className={`grid grid-cols-2 p-1 rounded-xs border text-xs font-bold font-heading ${
          appTheme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            onClick={() => setChatCategory('sellers')}
            className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              chatCategory === 'sellers'
                ? 'bg-[#4F6C73] text-white shadow-xs'
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>{t.chatsWithSellers}</span>
          </button>

          <button
            onClick={() => setChatCategory('buyers')}
            className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              chatCategory === 'buyers'
                ? 'bg-[#4F6C73] text-white shadow-xs'
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.chatsWithBuyers}</span>
          </button>
        </div>
      </div>

      {/* Chats Content List */}
      <div className="p-4 space-y-3">
        {chatCategory === 'sellers' ? (
          sellerChats.map((p) => {
            const msgs = chatHistory[p.authorHandle] || [];
            const lastMsg = msgs[msgs.length - 1];
            const tradeMsg = msgs.find((m) => Boolean(m.tradeCard));
            const tradeStatus = tradeMsg?.tradeCard?.status;

            return (
              <div
                key={p.id}
                onClick={() => onSelectChat(p)}
                className={`p-3.5 rounded-xs border shadow-2xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between gap-3 ${
                  appTheme === 'dark' ? 'bg-[#181F22] border-neutral-700 hover:bg-[#20292D]' : 'bg-white border-[#A6A6A6]/30 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#4F6C73] text-white flex items-center justify-center font-bold text-sm">
                      {p.authorAvatar}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#7FE176] border-2 border-white rounded-full" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                        {p.author}
                      </h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">{p.authorHandle}</p>

                    <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate mt-1">
                      {lastMsg ? lastMsg.text || (lastMsg.tradeCard ? (appLanguage === 'en' ? 'Trade Card Attachment' : 'Прикріплено картку-трейд') : '') : p.title}
                    </p>

                    {/* Trade Status Pill */}
                    {tradeStatus && (
                      <div className="flex items-center gap-1 mt-1.5">
                        {tradeStatus === 'confirmed' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#7FE176]/30 text-emerald-800 dark:text-emerald-300 rounded-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>{appLanguage === 'en' ? 'Deal Confirmed' : 'Угоду підтверджено'}</span>
                          </span>
                        ) : tradeStatus === 'cancelled' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-[#AB3336] dark:text-red-300 rounded-xs flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            <span>{appLanguage === 'en' ? 'Deal Cancelled' : 'Угоду скасовано'}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#FEDF82] text-[#0D0D0D] rounded-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{appLanguage === 'en' ? 'Trade card awaiting' : 'Очікує картка-трейд'}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {lastMsg?.timestamp || '12:40'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            );
          })
        ) : (
          /* Buyer Inquiries to Seller */
          buyerDialogs.map((bd) => (
            <div
              key={bd.id}
              onClick={() => onSelectChat(bd.productRef)}
              className={`p-3.5 rounded-xs border shadow-2xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between gap-3 ${
                appTheme === 'dark' ? 'bg-[#181F22] border-neutral-700 hover:bg-[#20292D]' : 'bg-white border-[#A6A6A6]/30 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-full bg-[#8D5B3A] text-white flex items-center justify-center font-bold text-sm shrink-0 border-2 border-[#FEDF82]">
                  {bd.avatar}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                      {bd.title}
                    </h4>
                    <span className="text-[9px] bg-[#A7E4F2] text-[#0D0D0D] font-bold px-1.5 py-0.2 rounded-xs">
                      {bd.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4F6C73] dark:text-[#A7E4F2] font-semibold truncate mt-0.5">
                    {bd.subtitle}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate mt-1">
                    «{bd.lastMessage}»
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-[10px] text-neutral-400 font-mono">{bd.time}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
