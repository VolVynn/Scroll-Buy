import React, { useState } from 'react';
import { Product, BookingSlot } from '../types';
import { ProductArtwork } from './ProductArtwork';
import { 
  ArrowLeft, 
  CheckCircle, 
  MapPin, 
  Film, 
  FileText, 
  ShoppingBag, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Share2, 
  Play, 
  Heart,
  Star,
  Sparkles
} from 'lucide-react';

interface PublicSellerProfileModalProps {
  authorHandle: string;
  products: Product[];
  onClose: () => void;
  onOpenChat: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onWatchVideo: (product: Product) => void;
  onBookServiceSlot?: (slotTitle: string, masterName: string, date: string, time: string, price: number) => void;
}

export const PublicSellerProfileModal: React.FC<PublicSellerProfileModalProps> = ({
  authorHandle,
  products,
  onClose,
  onOpenChat,
  onOpenProduct,
  onWatchVideo,
  onBookServiceSlot,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'vitrine'>('posts');
  const [bookedSlotIds, setBookedSlotIds] = useState<Record<string, boolean>>({
    'slot-public-3': true,
  });

  // Find products belonging to this author or matching authorHandle
  const authorProducts = products.filter(
    (p) => p.authorHandle.toLowerCase() === authorHandle.toLowerCase()
  );
  const mainProduct = authorProducts[0] || products[0];

  // Specific seller profiles data map
  const getSellerInfo = (handle: string) => {
    switch (handle.toLowerCase()) {
      case '@retro_art':
        return {
          name: 'Ретро-вініл & Арт',
          avatar: 'РА',
          location: 'Львів · Доставка по всій Україні',
          bio: 'Оригінальні ліцензовані вінтажні постери 60-80х, ретро-платівки та арт-декор 🎬 Колекційний стан з гарантією справжності.',
          followers: '5.8k',
          likes: '34.2k',
          postsCount: 18,
          isService: false,
        };
      case '@lviv_clay':
        return {
          name: 'Гончарна майстерня «Глина»',
          avatar: 'ГМ',
          location: 'Львів, вул. Вірменська, 14',
          bio: 'Автентична кераміка ручного гончарного круга 🏺 Щоденні індивідуальні та парні майстер-класи з ліплення та випалу.',
          followers: '9.4k',
          likes: '58.1k',
          postsCount: 24,
          isService: true,
        };
      case '@silver_craft':
        return {
          name: 'Ювелірна студія «SilvArt»',
          avatar: 'СА',
          location: 'Київ / Львів · Відправка',
          bio: 'Авторські прикраси зі срібла 925 проби та натурального дикого каміння ✨ Моховий агат, місячний камінь, авторське кування.',
          followers: '3.9k',
          likes: '19.4k',
          postsCount: 14,
          isService: false,
        };
      case '@sweet_lviv':
        return {
          name: 'Кондитерська «Sweet Wave»',
          avatar: 'СВ',
          location: 'Львів, самовивіз та кур’єр',
          bio: 'Крафтові бенто-торти з індивідуальними написами за 40 хвилин 🎂 Тільки натуральні інгредієнти, бельгійський шоколад.',
          followers: '14.2k',
          likes: '92.6k',
          postsCount: 38,
          isService: true,
        };
      case '@nails_art_space':
        return {
          name: 'Майстер манікюру Ольга',
          avatar: 'ОМ',
          location: 'Львів, просп. Свободи, 8',
          bio: 'Стерильний авторський манікюр та нарощення 💅 Японський догляд, гіпоалергенні преміум-матеріали.',
          followers: '2.8k',
          likes: '15.3k',
          postsCount: 12,
          isService: true,
        };
      default:
        return {
          name: mainProduct.author,
          avatar: mainProduct.authorAvatar,
          location: mainProduct.location,
          bio: mainProduct.description,
          followers: '3.5k',
          likes: '22.1k',
          postsCount: authorProducts.length || 6,
          isService: mainProduct.type === 'service',
        };
    }
  };

  const seller = getSellerInfo(authorHandle);

  // Generate public booking slots if seller provides services
  const publicSlots = [
    {
      id: 'slot-public-1',
      date: 'Завтра, 12:00 – 14:00',
      title: `${seller.name} · Індивідуальний запис`,
      price: mainProduct.price,
      currency: mainProduct.currency,
    },
    {
      id: 'slot-public-2',
      date: 'Завтра, 15:30 – 17:30',
      title: `${seller.name} · Майстер-клас для двох`,
      price: Math.round(mainProduct.price * 1.6),
      currency: mainProduct.currency,
    },
    {
      id: 'slot-public-3',
      date: 'Післязавтра, 11:00 – 13:00',
      title: `${seller.name} · Студійний сеанс`,
      price: mainProduct.price,
      currency: mainProduct.currency,
    },
    {
      id: 'slot-public-4',
      date: 'Післязавтра, 16:00 – 18:00',
      title: `${seller.name} · Повний курс / консультація`,
      price: mainProduct.price,
      currency: mainProduct.currency,
    },
  ];

  const handleBook = (slot: typeof publicSlots[0]) => {
    setBookedSlotIds((prev) => ({ ...prev, [slot.id]: true }));
    if (onBookServiceSlot) {
      onBookServiceSlot(
        slot.title,
        seller.name,
        slot.date.split(',')[0],
        slot.date.split(',')[1] || '12:00',
        slot.price
      );
    }
    alert(`✓ Ви успішно забронювали «${slot.title}» на ${slot.date}! Запис додано до вашого кабінету покупця.`);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 animate-fadeIn overflow-y-auto no-scrollbar transition-colors">
      {/* Top Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs">
        <button
          onClick={onClose}
          className="p-1.5 -ml-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-transform cursor-pointer"
          aria-label="Назад"
        >
          <ArrowLeft className="w-5 h-5 text-[#0D0D0D] dark:text-white" />
        </button>

        <span className="text-xs font-bold text-[#0D0D0D] dark:text-white font-mono">
          {authorHandle}
        </span>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Посилання на профіль продавця скопійовано!');
          }}
          className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-[#4F6C73] dark:text-[#A7E4F2]"
          title="Поділитися"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Seller TikTok Header */}
      <div className="p-4 bg-white dark:bg-[#1A2024] border-b border-[#A6A6A6]/30 dark:border-neutral-700 text-center space-y-3">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#4F6C73] to-[#A7E4F2] text-white flex items-center justify-center font-bold text-2xl border-2 border-white dark:border-neutral-800 shadow-md mb-2">
            {seller.avatar}
          </div>

          <h1 className="text-base font-bold text-[#0D0D0D] dark:text-white font-heading flex items-center justify-center gap-1">
            <span>{seller.name}</span>
            <CheckCircle className="w-4 h-4 text-[#4F6C73] dark:text-[#A7E4F2] fill-[#A7E4F2]" />
          </h1>
          <p className="text-xs text-[#A6A6A6] dark:text-neutral-400 font-mono">{authorHandle}</p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 py-1">
          <div className="text-center">
            <span className="text-sm font-black text-[#0D0D0D] dark:text-white block font-heading tabular-nums">
              {seller.postsCount}
            </span>
            <span className="text-[10px] text-[#A6A6A6] dark:text-neutral-400 uppercase tracking-wider">Оголошень</span>
          </div>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />
          <div className="text-center">
            <span className="text-sm font-black text-[#0D0D0D] dark:text-white block font-heading tabular-nums">
              {seller.followers}
            </span>
            <span className="text-[10px] text-[#A6A6A6] dark:text-neutral-400 uppercase tracking-wider">Читачі</span>
          </div>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />
          <div className="text-center">
            <span className="text-sm font-black text-[#0D0D0D] dark:text-white block font-heading tabular-nums">
              {seller.likes}
            </span>
            <span className="text-[10px] text-[#A6A6A6] dark:text-neutral-400 uppercase tracking-wider">Вподобайки</span>
          </div>
        </div>

        {/* Bio & Location */}
        <p className="text-xs text-[#0D0D0D] dark:text-neutral-200 font-sarala leading-relaxed max-w-xs mx-auto">
          {seller.bio}
        </p>

        <div className="flex items-center justify-center gap-1 text-[11px] text-[#4F6C73] dark:text-[#A7E4F2]">
          <MapPin className="w-3.5 h-3.5" />
          <span>{seller.location}</span>
        </div>

        {/* Action Button: Direct message */}
        <div className="flex gap-2 max-w-xs mx-auto pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenChat(mainProduct);
            }}
            className="flex-1 py-2.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-xs font-bold rounded-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs uppercase"
          >
            <MessageSquare className="w-4 h-4 text-[#A7E4F2]" />
            <span>Написати продавцю</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-12 z-20 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700 flex">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 text-xs font-bold font-heading flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'posts'
              ? 'border-[#4F6C73] text-[#4F6C73] dark:text-[#A7E4F2] dark:border-[#A7E4F2]'
              : 'border-transparent text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Відео та оголошення</span>
        </button>

        <button
          onClick={() => setActiveTab('vitrine')}
          className={`flex-1 py-3 text-xs font-bold font-heading flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'vitrine'
              ? 'border-[#4F6C73] text-[#4F6C73] dark:text-[#A7E4F2] dark:border-[#A7E4F2]'
              : 'border-transparent text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Товари та бронювання</span>
        </button>
      </div>

      {/* TAB 1: Video and Text Listings Grid */}
      {activeTab === 'posts' && (
        <div className="p-3">
          <div className="grid grid-cols-3 gap-1.5">
            {/* Show author's products and video reels */}
            {authorProducts.concat(products.filter(p => p.id !== mainProduct.id).slice(0, 5)).map((item, index) => {
              const isVideo = index % 2 === 0;

              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => {
                    if (isVideo) {
                      onWatchVideo(item);
                    } else {
                      onOpenProduct(item);
                    }
                  }}
                  className="relative aspect-[3/4] bg-neutral-900 rounded-xs overflow-hidden cursor-pointer group shadow-2xs border border-neutral-300 dark:border-neutral-700"
                >
                  <ProductArtwork
                    type={item.id.replace('prod-', '')}
                    aspectRatio="poster"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Type Badge */}
                  <div className="absolute top-1.5 left-1.5 z-10">
                    {isVideo ? (
                      <span className="flex items-center gap-0.5 text-[8px] font-bold bg-black/60 text-[#A7E4F2] px-1.5 py-0.5 rounded-xs">
                        <Film className="w-2.5 h-2.5" /> Відео
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-[8px] font-bold bg-[#4F6C73] text-white px-1.5 py-0.5 rounded-xs">
                        <FileText className="w-2.5 h-2.5" /> Оголошення
                      </span>
                    )}
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10 flex items-center justify-between text-[10px] text-white font-mono">
                    <span className="flex items-center gap-0.5 truncate">
                      {isVideo ? (
                        <>
                          <Play className="w-2.5 h-2.5 fill-white" />
                          {item.likes > 999 ? `${(item.likes / 1000).toFixed(1)}k` : item.likes}
                        </>
                      ) : (
                        <>
                          <Heart className="w-2.5 h-2.5 fill-[#AB3336] text-[#AB3336]" />
                          {item.comments}
                        </>
                      )}
                    </span>
                    <span className="text-[10px] font-black text-[#A7E4F2]">
                      {item.price} {item.currency}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Vitrine & Booking Calendar */}
      {activeTab === 'vitrine' && (
        <div className="p-3 space-y-4 pb-12">
          {/* Available Goods */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F6C73] dark:text-[#A7E4F2] flex items-center gap-1 font-heading">
              <ShoppingBag className="w-3.5 h-3.5" />
              Доступні товари автора:
            </span>

            {authorProducts.concat(products.filter(p => p.id !== mainProduct.id).slice(0, 2)).map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProduct(p)}
                className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 flex items-center justify-between gap-3 shadow-2xs hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xs overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700">
                    <ProductArtwork
                      type={p.id.replace('prod-', '')}
                      aspectRatio="thumb"
                      className="w-full h-full scale-110"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white truncate font-heading">
                      {p.title}
                    </h4>
                    <span className="text-[10px] text-[#7FE176] font-semibold block">
                      В наявності ✓
                    </span>
                    <span className="text-xs font-black text-[#0D0D0D] dark:text-white tabular-nums font-heading">
                      {p.price} {p.currency}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProduct(p);
                  }}
                  className="px-3.5 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-[11px] font-bold rounded-xs uppercase tracking-wider cursor-pointer border border-[#4F6C73]/40 transition-transform active:scale-95"
                >
                  Купити
                </button>
              </div>
            ))}
          </div>

          {/* Booking Calendar for Services */}
          <div className="space-y-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F6C73] dark:text-[#A7E4F2] flex items-center gap-1 font-heading">
              <CalendarIcon className="w-3.5 h-3.5" />
              Календар бронювання дати та послуг:
            </span>

            <div className="space-y-2">
              {publicSlots.map((slot) => {
                const isBooked = Boolean(bookedSlotIds[slot.id]);

                return (
                  <div
                    key={slot.id}
                    className={`p-3 bg-white dark:bg-[#1A2024] rounded-xs border transition-all ${
                      isBooked
                        ? 'border-neutral-200 dark:border-neutral-700 bg-neutral-100/70 dark:bg-neutral-800/50'
                        : 'border-[#4F6C73]/40 dark:border-neutral-700 shadow-2xs hover:border-[#4F6C73]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] block font-heading">
                          {slot.date}
                        </span>
                        <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white mt-0.5 font-heading">
                          {slot.title}
                        </h4>
                        <span className="text-[10px] text-[#A6A6A6] dark:text-neutral-400">
                          Захищене бронювання Scroll &amp; Buy
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-[#0D0D0D] dark:text-white block tabular-nums">
                          {slot.price} {slot.currency}
                        </span>

                        {isBooked ? (
                          <span className="text-[10px] font-black text-[#0D0D0D] bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 px-2.5 py-1 rounded-xs inline-block mt-1 shadow-2xs">
                            Зайнято
                          </span>
                        ) : (
                          <button
                            onClick={() => handleBook(slot)}
                            className="mt-1 px-3 py-1 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-[11px] font-bold rounded-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-95 border border-[#4F6C73]/40"
                          >
                            Забронювати
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
