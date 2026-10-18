import React, { useState } from 'react';
import { Product } from '../types';
import { ProductArtwork } from './ProductArtwork';
import { ArrowLeft, Share2, Bookmark, CheckCircle2, ShieldCheck, MapPin, Star, MessageSquare } from 'lucide-react';

interface ProductCardModalProps {
  product: Product;
  onClose: () => void;
  onProceedToPurchase: (product: Product) => void;
  onOpenChat: (product: Product) => void;
  onOpenSellerProfile?: (handle: string) => void;
}

export const ProductCardModal: React.FC<ProductCardModalProps> = ({
  product,
  onClose,
  onProceedToPurchase,
  onOpenChat,
  onOpenSellerProfile,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(product.isBookmarked || false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const handleProceed = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onProceedToPurchase(product);
    }, 250);
  };

  const isBeatles = product.id === 'prod-beatles';

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 overflow-y-auto no-scrollbar animate-fadeIn transition-colors">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#F2F2F2]/95 dark:bg-[#181F22]/95 backdrop-blur-md border-b border-[#A6A6A6]/30 dark:border-neutral-700">
        <button
          onClick={onClose}
          className="p-2 -ml-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 active:scale-95 transition-transform cursor-pointer"
          aria-label="Назад"
        >
          <ArrowLeft className="w-5 h-5 text-[#0D0D0D] dark:text-white" />
        </button>
        <h2 className="text-sm font-bold tracking-tight text-[#0D0D0D] dark:text-white font-heading">
          Картка товару
        </h2>
        <div className="flex items-center gap-1">
          {/* Bookmark Button - Matching Library Accent #A7E4F2 */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 active:scale-95 transition-all text-[#0D0D0D] dark:text-neutral-200 cursor-pointer"
            aria-label="Зберегти"
          >
            <Bookmark className={`w-5 h-5 transition-colors ${isBookmarked ? 'fill-[#A7E4F2] text-[#A7E4F2]' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 active:scale-95 transition-all text-[#0D0D0D] dark:text-neutral-200 cursor-pointer"
            aria-label="Поділитися"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showShareToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0D0D0D] text-white text-xs px-3 py-1.5 rounded-md shadow-lg transition-all animate-bounce">
          Посилання на позицію скопійовано!
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-4 space-y-4 pb-28">
        {/* Title & Availability Header */}
        <div className="text-center space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0D0D0D] dark:text-white font-heading">
            {product.title}
          </h1>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F6C73] dark:text-[#A7E4F2]">
            <span>В наявності для замовлення</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
          </div>
        </div>

        {/* Product Visual Container */}
        <div className="relative rounded-sm overflow-hidden shadow-sm border border-[#A6A6A6]/40 dark:border-neutral-700 bg-white dark:bg-[#1A2024]">
          <ProductArtwork
            type={
              isBeatles
                ? 'beatles'
                : product.id.replace('prod-', '')
            }
            aspectRatio="poster"
            className="w-full"
          />
        </div>

        {/* Price & Rating Row */}
        <div className="flex items-baseline justify-between pt-1">
          <div className="text-2xl font-black tracking-tight text-[#0D0D0D] dark:text-white font-heading tabular-nums">
            {product.price.toFixed(product.currency === '€' ? 2 : 0)} {product.currency}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#0D0D0D] dark:text-neutral-200 font-semibold">
            <Star className="w-4 h-4 fill-[#FEDF82] text-[#FEDF82]" />
            <span>{product.rating}</span>
            <span className="text-[#A6A6A6] dark:text-neutral-400 font-normal">({product.reviewsCount} відгуків)</span>
          </div>
        </div>

        {/* Seller Info Strip - Clickable to open Public Seller Profile */}
        <div className="flex items-center justify-between p-3 bg-white dark:bg-[#1A2024] rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs">
          <div 
            onClick={() => onOpenSellerProfile && onOpenSellerProfile(product.authorHandle)}
            className="flex items-center gap-2.5 cursor-pointer group"
            title="Переглянути профіль продавця"
          >
            <div className="w-9 h-9 rounded-full bg-[#4F6C73] text-[#F2F2F2] flex items-center justify-center font-bold text-xs border border-transparent group-hover:border-[#A7E4F2] transition-colors">
              {product.authorAvatar}
            </div>
            <div>
              <p className="text-xs font-bold text-[#0D0D0D] dark:text-white leading-tight group-hover:text-[#4F6C73] dark:group-hover:text-[#A7E4F2] transition-colors flex items-center gap-1">
                <span>{product.author}</span>
                <span className="text-[10px] text-[#A7E4F2] bg-[#4F6C73] px-1 rounded-xs">Профіль →</span>
              </p>
              <p className="text-[11px] text-[#A6A6A6] dark:text-neutral-400">{product.authorHandle}</p>
            </div>
          </div>
          <button
            onClick={() => onOpenChat(product)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#4F6C73] dark:text-[#A7E4F2] hover:bg-[#A7E4F2]/20 border border-[#4F6C73]/30 dark:border-neutral-700 rounded-xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Чат з автором</span>
          </button>
        </div>

        {/* Description Block */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6] dark:text-neutral-400 font-heading">
            Опис позиції
          </h3>
          <p className="text-sm leading-relaxed text-[#0D0D0D]/90 dark:text-neutral-200 font-sarala">
            {product.description}
          </p>
        </div>

        {/* Guarantee & Location */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-1">
            <div className="flex items-center gap-1.5 text-[#4F6C73] dark:text-[#A7E4F2] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Безпечна угода</span>
            </div>
            <p className="text-[11px] text-[#A6A6A6] dark:text-neutral-400">Кошти захищені платформою до перевірки отримання</p>
          </div>
          <div className="p-2.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-1">
            <div className="flex items-center gap-1.5 text-[#4F6C73] dark:text-[#A7E4F2] font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Локація майстра</span>
            </div>
            <p className="text-[11px] text-[#A6A6A6] dark:text-neutral-400 truncate">{product.location}</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#F2F2F2]/95 dark:bg-[#181F22]/95 backdrop-blur-md border-t border-[#A6A6A6]/30 dark:border-neutral-700 space-y-1.5 max-w-[390px] mx-auto">
        <button
          onClick={handleProceed}
          disabled={isSubmitting}
          className="w-full h-12 flex items-center justify-center gap-3 bg-[#A7E4F2] hover:bg-[#92d8e8] active:bg-[#7fcbdc] text-[#0D0D0D] font-bold text-xs tracking-wider uppercase border border-[#4F6C73]/50 rounded-xs transition-all active:scale-[0.98] cursor-pointer shadow-sm disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin" />
              ФОРМУВАННЯ КАРТКИ-ТРЕЙДУ...
            </span>
          ) : (
            <>
              <span>ПЕРЕЙТИ ДО ОФОРМЛЕННЯ</span>
              <span className="text-base font-bold">→</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-[#A6A6A6] dark:text-neutral-400">
          Сформує офіційну картку-трейд у чаті з автором позиції
        </p>
      </div>
    </div>
  );
};
