import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductArtwork } from './ProductArtwork';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Music, 
  ChevronUp, 
  ChevronDown, 
  ShoppingBag,
  CheckCircle2,
  X,
  Play,
  Volume2,
  VolumeX,
  Send,
  SlidersHorizontal,
  RotateCcw,
  Tag
} from 'lucide-react';

interface FeedViewProps {
  products: Product[];
  currentProductIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenProduct: (product: Product) => void;
  onToggleLike: (productId: string) => void;
  onToggleBookmark: (productId: string) => void;
  onOpenSellerProfile?: (handle: string) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  products,
  currentProductIndex,
  onSelectIndex,
  onOpenProduct,
  onToggleLike,
  onToggleBookmark,
  onOpenSellerProfile,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState('');
  
  // Price Filtering State (Min & Max in UAH)
  const [showPriceFilterModal, setShowPriceFilterModal] = useState(false);
  const [pricePreset, setPricePreset] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [activeFilterLabel, setActiveFilterLabel] = useState<string | null>(null);
  const [localIndex, setLocalIndex] = useState(0);

  const [commentsList, setCommentsList] = useState([
    {
      id: 'c1',
      author: 'Оксана К.',
      avatar: 'ОК',
      time: '1 год тому',
      text: 'Неймовірна якість! Замовляла у цього автора, відправили того ж дня через картку-трейд.',
    },
    {
      id: 'c2',
      author: 'Тарас_М',
      avatar: 'ТМ',
      time: '3 год тому',
      text: 'Картка-трейд у чаті — це геніально, без зайвих запитань про ціну в дірект!',
    },
    {
      id: 'c3',
      author: 'Ірина Левицька',
      avatar: 'ІЛ',
      time: 'Вчора',
      text: 'Чи можна забронювати цей виріб на подарунок до п\'ятниці?',
    },
  ]);

  // Normalize product price to UAH for comparison (1 EUR ~ 45 UAH)
  const getProductUahPrice = (p: Product) => {
    return p.currency === '€' ? p.price * 45 : p.price;
  };

  // Filtered products list based on price range
  const filteredProducts = useMemo(() => {
    const minVal = minPrice !== '' ? parseFloat(minPrice) : null;
    const maxVal = maxPrice !== '' ? parseFloat(maxPrice) : null;

    return products.filter((p) => {
      const uah = getProductUahPrice(p);
      if (minVal !== null && !isNaN(minVal) && uah < minVal) return false;
      if (maxVal !== null && !isNaN(maxVal) && uah > maxVal) return false;
      return true;
    });
  }, [products, minPrice, maxPrice]);

  // Keep index within bounds
  const safeIndex = filteredProducts.length > 0 
    ? Math.min(localIndex, filteredProducts.length - 1) 
    : 0;

  const currentProduct = filteredProducts.length > 0 ? filteredProducts[safeIndex] : null;

  const handleNext = () => {
    if (filteredProducts.length === 0) return;
    if (safeIndex < filteredProducts.length - 1) {
      setLocalIndex(safeIndex + 1);
    } else {
      setLocalIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (filteredProducts.length === 0) return;
    if (safeIndex > 0) {
      setLocalIndex(safeIndex - 1);
    } else {
      setLocalIndex(filteredProducts.length - 1);
    }
  };

  const handleApplyPreset = (preset: 'all' | 'under-500' | '500-1000' | '1000-2000' | 'above-2000') => {
    setPricePreset(preset);
    setLocalIndex(0);
    if (preset === 'all') {
      setMinPrice('');
      setMaxPrice('');
      setActiveFilterLabel(null);
    } else if (preset === 'under-500') {
      setMinPrice('0');
      setMaxPrice('500');
      setActiveFilterLabel('До 500 ₴');
    } else if (preset === '500-1000') {
      setMinPrice('500');
      setMaxPrice('1000');
      setActiveFilterLabel('500–1000 ₴');
    } else if (preset === '1000-2000') {
      setMinPrice('1000');
      setMaxPrice('2000');
      setActiveFilterLabel('1000–2000 ₴');
    } else if (preset === 'above-2000') {
      setMinPrice('2000');
      setMaxPrice('10000');
      setActiveFilterLabel('Від 2000 ₴');
    }
    setShowPriceFilterModal(false);
  };

  const handleClearPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setPricePreset('all');
    setActiveFilterLabel(null);
    setLocalIndex(0);
    setShowPriceFilterModal(false);
  };

  const handleCustomApply = () => {
    setPricePreset('custom');
    setLocalIndex(0);
    const minVal = minPrice.trim();
    const maxVal = maxPrice.trim();
    if (minVal && maxVal) {
      setActiveFilterLabel(`${minVal}–${maxVal} ₴`);
    } else if (minVal) {
      setActiveFilterLabel(`Від ${minVal} ₴`);
    } else if (maxVal) {
      setActiveFilterLabel(`До ${maxVal} ₴`);
    } else {
      setActiveFilterLabel(null);
    }
    setShowPriceFilterModal(false);
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;
    setCommentsList((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        author: 'Наталія Ковальчук',
        avatar: 'НК',
        time: 'Щойно',
        text: newCommentInput.trim(),
      },
    ]);
    setNewCommentInput('');
  };

  return (
    <div className="relative w-full h-full bg-[#0D0D0D] flex flex-col overflow-hidden select-none">
      {/* Top Floating Branding, Price Filter Pill & Sound Status */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 pointer-events-auto bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        {/* Left balance spacer (no logo) */}
        <div className="w-9" />

        {/* Central Price Filter Pill with Interactive Modal Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPriceFilterModal(true)}
            className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs ${
              activeFilterLabel
                ? 'bg-[#A7E4F2] text-[#0D0D0D] border-[#A7E4F2]'
                : 'bg-black/50 text-white border-white/20 hover:border-white/40'
            }`}
            title="Фільтрувати товари за діапазоном цін"
          >
            <Tag className={`w-3 h-3 ${activeFilterLabel ? 'text-[#0D0D0D]' : 'text-[#A7E4F2]'}`} />
            <span>{activeFilterLabel ? activeFilterLabel : 'Ціна: Всі'}</span>
            <span className="text-[10px] opacity-75">▾</span>
          </button>

          {activeFilterLabel && (
            <button
              onClick={handleClearPriceFilter}
              className="w-5 h-5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer text-xs"
              title="Скинути фільтр ціни"
            >
              ×
            </button>
          )}
        </div>

        {/* Sound toggle button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white cursor-pointer active:scale-90 transition-transform"
          aria-label={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#A7E4F2]" />}
        </button>
      </div>

      {showShareToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0D0D0D] text-white text-xs px-3.5 py-1.5 rounded-sm border border-[#A7E4F2] shadow-xl animate-fadeIn">
          Посилання на відео скопійовано!
        </div>
      )}

      {/* Main Video Viewport or Empty Filter State */}
      {currentProduct ? (
        <div 
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative flex-1 w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Fullscreen Video Artwork Simulation */}
          <div className="absolute inset-0 w-full h-full">
            <ProductArtwork
              type={currentProduct.id.replace('prod-', '')}
              aspectRatio="video"
              className="w-full h-full object-cover"
            />
            {/* Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 opacity-80" />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/70" />
          </div>

          {/* Ambient Pulsing Play State Indicator when paused */}
          {!isPlaying && (
            <div className="relative z-10 w-14 h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-xs animate-scaleIn">
              <Play className="w-6 h-6 ml-1 fill-white" />
            </div>
          )}

          {/* Next / Prev Chevrons & Filter Counter */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="absolute left-3 top-20 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 text-white text-[10px] font-mono"
          >
            <button 
              onClick={handlePrev}
              className="p-1 hover:text-[#A7E4F2] active:scale-90 transition-transform cursor-pointer"
              title="Попереднє відео"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <span className="tabular-nums px-1 font-bold">{safeIndex + 1}/{filteredProducts.length}</span>
            <button 
              onClick={handleNext}
              className="p-1 hover:text-[#A7E4F2] active:scale-90 transition-transform cursor-pointer"
              title="Наступне відео"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Hand Controls (TikTok style) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-4 text-white"
          >
            {/* Creator Avatar - Clickable to open Profile */}
            <div 
              onClick={() => onOpenSellerProfile && onOpenSellerProfile(currentProduct.authorHandle)}
              className="relative mb-2 cursor-pointer group"
              title="Переглянути профіль продавця"
            >
              <div className="w-11 h-11 rounded-full bg-[#4F6C73] border-2 border-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
                {currentProduct.authorAvatar}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#A7E4F2] text-[#0D0D0D] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black shadow-xs">
                +
              </span>
            </div>

            {/* Like Button */}
            <button
              onClick={() => onToggleLike(currentProduct.id)}
              className="flex flex-col items-center gap-0.5 group cursor-pointer"
              aria-label="Вподобайка"
            >
              <div className={`p-2.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 transition-transform active:scale-75 ${
                currentProduct.isLiked ? 'text-[#AB3336]' : 'text-white'
              }`}>
                <Heart className={`w-6 h-6 ${currentProduct.isLiked ? 'fill-[#AB3336]' : ''}`} />
              </div>
              <span className="text-[11px] font-semibold tracking-wider font-mono tabular-nums">
                {(currentProduct.likes + (currentProduct.isLiked ? 1 : 0)).toLocaleString()}
              </span>
            </button>

            {/* Comments Button */}
            <button
              onClick={() => setShowCommentsModal(true)}
              className="flex flex-col items-center gap-0.5 group cursor-pointer"
              aria-label="Коментарі"
            >
              <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 transition-transform active:scale-75">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider font-mono tabular-nums">
                {commentsList.length}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-0.5 group cursor-pointer"
              aria-label="Поділитися"
            >
              <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 transition-transform active:scale-75">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider font-mono tabular-nums">
                {currentProduct.shares}
              </span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => onToggleBookmark(currentProduct.id)}
              className="flex flex-col items-center gap-0.5 group cursor-pointer"
              aria-label="Зберегти"
            >
              <div className={`p-2.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 transition-transform active:scale-75 ${
                currentProduct.isBookmarked ? 'text-[#A7E4F2]' : 'text-white'
              }`}>
                <Bookmark className={`w-6 h-6 ${currentProduct.isBookmarked ? 'fill-[#A7E4F2] text-[#A7E4F2]' : ''}`} />
              </div>
            </button>
          </div>

          {/* Bottom Metadata & Interactive Product Card */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute left-3 right-16 bottom-3 z-20 space-y-2 pointer-events-auto"
          >
            {/* Creator & Audio Info */}
            <div className="space-y-1">
              <div 
                onClick={() => onOpenSellerProfile && onOpenSellerProfile(currentProduct.authorHandle)}
                className="flex items-center gap-1.5 cursor-pointer group w-fit"
              >
                <span className="font-bold text-sm text-white font-heading group-hover:text-[#A7E4F2] transition-colors">
                  {currentProduct.authorHandle}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#A7E4F2]" />
              </div>

              <p className="text-xs text-white/90 line-clamp-2 font-sarala">
                {currentProduct.videoTitle}{' '}
                {currentProduct.tags.map((t) => (
                  <span key={t} className="text-[#A7E4F2] font-semibold mr-1">
                    {t}
                  </span>
                ))}
              </p>

              {/* Audio Track marquee simulation */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#F2F2F2]/80">
                <Music className="w-3.5 h-3.5 text-[#A7E4F2] animate-spin" style={{ animationDuration: '6s' }} />
                <span className="truncate max-w-[200px]">{currentProduct.soundTitle}</span>
              </div>
            </div>

            {/* Bottom Floating Miniature Product Card */}
            <div 
              onClick={() => onOpenProduct(currentProduct)}
              className="flex items-center justify-between p-2.5 bg-black/75 backdrop-blur-md rounded-xs border border-white/20 hover:border-[#A7E4F2] transition-colors cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xs bg-[#4F6C73]/40 border border-white/20 overflow-hidden shrink-0">
                  <ProductArtwork
                    type={currentProduct.id.replace('prod-', '')}
                    aspectRatio="thumb"
                    className="w-full h-full scale-125"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3 text-[#A7E4F2]" />
                    <span className="text-[10px] text-[#A7E4F2] font-bold uppercase tracking-wider">
                      {currentProduct.badgeText || 'Купити з відео'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate max-w-[170px] font-heading">
                    {currentProduct.title}
                  </h4>
                  <p className="text-xs font-black text-white tabular-nums">
                    {currentProduct.price.toFixed(currentProduct.currency === '€' ? 2 : 0)} {currentProduct.currency}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProduct(currentProduct);
                }}
                className="px-3 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] active:scale-95 text-[#0D0D0D] font-bold text-xs uppercase tracking-wider rounded-xs shrink-0 flex items-center gap-1 transition-transform cursor-pointer font-heading"
              >
                <span>{currentProduct.type === 'service' ? 'Запис' : 'Купити'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State when no products match price filter (Lecture 6, Slide 10) */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#FEDF82]">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-xs">
            <h3 className="text-base font-bold font-heading text-white">
              Немає товарів у діапазоні {activeFilterLabel}
            </h3>
            <p className="text-xs text-neutral-400 font-sarala">
              За вашим фільтром цін не знайдено жодного відео. Спробуйте розширити діапазон цін або скинути фільтр.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={handleClearPriceFilter}
              className="px-4 py-2 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-xs font-bold rounded-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md font-heading uppercase"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Скинути фільтр цін</span>
            </button>
            <button
              onClick={() => setShowPriceFilterModal(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xs flex items-center justify-center gap-1.5 cursor-pointer border border-white/20 font-heading"
            >
              <Tag className="w-3.5 h-3.5 text-[#A7E4F2]" />
              <span>Змінити діапазон</span>
            </button>
          </div>
        </div>
      )}

      {/* Price Range Filter Bottom Sheet Modal */}
      {showPriceFilterModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#181F22] text-white rounded-t-xl p-4 space-y-4 shadow-2xl border-t border-[#4F6C73]">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#A7E4F2]" />
                <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-white">
                  Фільтр товарів у стрічці за ціною
                </h3>
              </div>
              <button
                onClick={() => setShowPriceFilterModal(false)}
                className="p-1 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Preset Buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                Швидкі діапазони:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'Всі ціни' },
                  { id: 'under-500', label: 'До 500 ₴' },
                  { id: '500-1000', label: '500 – 1 000 ₴' },
                  { id: '1000-2000', label: '1 000 – 2 000 ₴' },
                  { id: 'above-2000', label: 'Від 2 000 ₴' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleApplyPreset(p.id as any)}
                    className={`py-2 px-3 text-xs font-bold rounded-xs border text-center transition-colors cursor-pointer ${
                      pricePreset === p.id
                        ? 'bg-[#A7E4F2] text-[#0D0D0D] border-[#A7E4F2]'
                        : 'bg-neutral-800/80 text-neutral-200 border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Range Inputs */}
            <div className="space-y-2 pt-1 border-t border-neutral-700/80">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                Або точний діапазон (грн):
              </span>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-2.5 top-2 text-xs text-neutral-400">Від</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full h-9 pl-10 pr-2 bg-neutral-800 border border-neutral-700 rounded-xs text-xs text-white focus:outline-hidden focus:border-[#A7E4F2] font-mono"
                  />
                </div>
                <span className="text-neutral-500">—</span>
                <div className="flex-1 relative">
                  <span className="absolute left-2.5 top-2 text-xs text-neutral-400">До</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="5000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full h-9 pl-10 pr-2 bg-neutral-800 border border-neutral-700 rounded-xs text-xs text-white focus:outline-hidden focus:border-[#A7E4F2] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Matching Count Preview & Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
              <span className="text-[11px] text-[#A7E4F2] font-bold">
                Знайдено: {filteredProducts.length} з {products.length} відео
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearPriceFilter}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer font-bold"
                >
                  Скинути
                </button>
                <button
                  onClick={handleCustomApply}
                  className="px-4 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-xs font-bold rounded-xs cursor-pointer active:scale-95 transition-transform"
                >
                  Застосувати
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Drawer Simulation with Clean Aligned Round Avatars & Dark Mode */}
      {showCommentsModal && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#F2F2F2] dark:bg-[#181F22] text-[#0D0D0D] dark:text-neutral-100 rounded-t-xl max-h-[75%] flex flex-col shadow-2xl border-t border-[#A6A6A6]/40 dark:border-neutral-700">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#A6A6A6]/30 dark:border-neutral-700 bg-white dark:bg-[#1A2024] rounded-t-xl">
              <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-[#0D0D0D] dark:text-white">
                Коментарі ({commentsList.length})
              </h3>
              <button
                onClick={() => setShowCommentsModal(false)}
                className="p-1 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of comments with round avatars and uniform alignment */}
            <div className="p-4 overflow-y-auto space-y-3.5 flex-1 no-scrollbar text-xs">
              {commentsList.map((c) => (
                <div key={c.id} className="flex items-start gap-3 w-full">
                  <div className="w-8 h-8 rounded-full bg-[#4F6C73] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs border border-white dark:border-neutral-700">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0 bg-white dark:bg-[#1A2024] p-2.5 rounded-xs border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-xs text-[#0D0D0D] dark:text-white font-heading">{c.author}</span>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-normal shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-snug mt-1 font-sarala">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="p-3 bg-white dark:bg-[#1A2024] border-t border-[#A6A6A6]/30 dark:border-neutral-700 flex gap-2">
              <input
                type="text"
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                placeholder="Додати коментар від імені Наталії..."
                className="flex-1 h-9 px-3 bg-neutral-100 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/30 dark:border-neutral-700 rounded-xs text-xs focus:outline-hidden font-body"
              />
              <button
                type="submit"
                className="px-3 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-xs font-bold rounded-xs cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Надіслати</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
