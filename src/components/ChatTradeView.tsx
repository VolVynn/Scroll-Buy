import React, { useState } from 'react';
import { ChatMessage, Product } from '../types';
import { ProductArtwork } from './ProductArtwork';
import { 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileCheck2,
  Phone,
  Info,
  X
} from 'lucide-react';

interface ChatTradeViewProps {
  product: Product;
  messages: ChatMessage[];
  onBack: () => void;
  onConfirmTrade: (cardId: string) => void;
  onCancelTrade: (cardId: string, reason: string) => void;
  onSendMessage: (text: string) => void;
  onOpenSellerProfile?: (handle: string) => void;
}

export const ChatTradeView: React.FC<ChatTradeViewProps> = ({
  product,
  messages,
  onBack,
  onConfirmTrade,
  onCancelTrade,
  onSendMessage,
  onOpenSellerProfile,
}) => {
  const [inputText, setInputText] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleConfirm = (cardId: string) => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      onConfirmTrade(cardId);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 500);
  };

  const handleCancelSubmit = (cardId: string) => {
    onCancelTrade(cardId, cancelReason || 'Передумав(-ла) купувати');
    setShowCancelDialog(false);
    setCancelReason('');
  };

  const handleAvatarClick = () => {
    if (onOpenSellerProfile) {
      onOpenSellerProfile(product.authorHandle);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 animate-fadeIn transition-colors">
      {/* Chat Top Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-transform cursor-pointer"
            aria-label="Назад"
          >
            <ArrowLeft className="w-5 h-5 text-[#0D0D0D] dark:text-white" />
          </button>

          {/* Partner Avatar - Clickable to open Profile */}
          <div 
            onClick={handleAvatarClick}
            className="relative cursor-pointer group"
            title="Переглянути профіль продавця"
          >
            <div className="w-9 h-9 rounded-full bg-[#4F6C73] text-[#F2F2F2] flex items-center justify-center font-bold text-xs border border-transparent group-hover:border-[#A7E4F2] transition-all">
              {product.authorAvatar}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#7FE176] border-2 border-white dark:border-neutral-900 rounded-full" />
          </div>

          <div 
            onClick={handleAvatarClick}
            className="cursor-pointer group"
            title="Переглянути профіль продавця"
          >
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading group-hover:text-[#4F6C73] dark:group-hover:text-[#A7E4F2] transition-colors">
                {product.author}
              </span>
              <span className="text-[10px] text-[#A7E4F2] bg-[#4F6C73] px-1 rounded-xs font-mono">
                Продавець
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
              {product.authorHandle} · <span className="text-[#7FE176] font-sans">онлайн</span>
            </p>
          </div>
        </div>

        {/* Call / Action Icon */}
        <button
          onClick={() => alert(`Дзвінок продавцю ${product.author} (+380 67 123 45 67)`)}
          className="p-2 text-[#4F6C73] dark:text-[#A7E4F2] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full cursor-pointer transition-colors"
          title="Зателефонувати"
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>

      {showSuccessToast && (
        <div className="bg-[#7FE176] text-[#0D0D0D] px-4 py-2 text-xs font-bold text-center border-b border-emerald-600 animate-fadeIn flex items-center justify-center gap-1.5 shadow-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Угоду зафіксовано! Кошти депоновано на безпечний Escrow.</span>
        </div>
      )}

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar text-xs">
        <div className="text-center my-1">
          <span className="text-[10px] text-[#A6A6A6] dark:text-neutral-500 font-mono">
            Початок офіційної угоди через Scroll &amp; Buy
          </span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender === 'buyer';

          // Regular text message
          if (!msg.tradeCard) {
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-sm text-xs leading-relaxed shadow-2xs ${
                    isMe
                      ? 'bg-[#4F6C73] text-white rounded-br-none'
                      : 'bg-white dark:bg-[#1A2024] text-[#0D0D0D] dark:text-neutral-100 border border-[#A6A6A6]/30 dark:border-neutral-700 rounded-bl-none'
                  }`}
                >
                  <p className="font-body">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isMe ? 'text-[#A7E4F2]' : 'text-[#A6A6A6] dark:text-neutral-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          }

          // Trade Card Message
          if (msg.tradeCard) {
            const card = msg.tradeCard;
            const isConfirmed = card.status === 'confirmed';
            const isCancelled = card.status === 'cancelled';
            const isPending = card.status === 'pending';

            return (
              <div key={msg.id} className="w-full my-2">
                <div className="bg-white dark:bg-[#1A2024] rounded-sm border-2 border-[#4F6C73] overflow-hidden shadow-sm">
                  {/* Card Header */}
                  <div className="bg-[#4F6C73] text-white px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-[#A7E4F2]" />
                      <span className="text-xs font-bold tracking-wider uppercase font-heading">
                        КАРТКА УГОДИ #{card.id}
                      </span>
                    </div>
                    {isPending && (
                      <span className="text-[10px] font-bold bg-[#FEDF82] text-[#0D0D0D] px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Очікує підтвердження
                      </span>
                    )}
                    {isConfirmed && (
                      <span className="text-[10px] font-bold bg-[#7FE176] text-[#0D0D0D] px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Угода підтверджена
                      </span>
                    )}
                    {isCancelled && (
                      <span className="text-[10px] font-bold bg-[#AB3336] text-white px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Скасовано
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-3 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-xs overflow-hidden shrink-0 border border-[#A6A6A6]/30 dark:border-neutral-700">
                        <ProductArtwork
                          type={card.productId === 'prod-beatles' ? 'beatles' : 'ceramic'}
                          aspectRatio="poster"
                          className="w-full h-full scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white truncate font-heading">
                          {card.productTitle}
                        </h4>
                        <p className="text-[11px] text-[#A6A6A6] dark:text-neutral-400">
                          Автор: <span className="font-semibold text-[#0D0D0D] dark:text-white">{card.authorHandle}</span>
                        </p>
                        <p className="text-[11px] text-[#A6A6A6] dark:text-neutral-400">
                          Покупець: <span className="font-semibold text-[#0D0D0D] dark:text-white">{card.buyerName}</span>
                        </p>
                        <div className="text-sm font-black text-[#0D0D0D] dark:text-white pt-1 font-heading tabular-nums">
                          {card.price.toFixed(card.currency === '€' ? 2 : 0)} {card.currency}
                        </div>
                      </div>
                    </div>

                    {/* Legal Clause / Trust Note */}
                    <div className="text-[10px] text-[#A6A6A6] dark:text-neutral-400 bg-neutral-50 dark:bg-[#121618] p-2 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-0.5 font-sarala">
                      <p className="font-semibold text-[#0D0D0D] dark:text-neutral-200">Офіційне підтвердження умов:</p>
                      <p>
                        Кнопка фіксує вартість і резервує позицію. Оплата депонується безпечним ескроу до перевірки товару.
                      </p>
                      {card.confirmationCode && (
                        <p className="font-mono text-[#4F6C73] dark:text-[#A7E4F2] pt-0.5">
                          Код фіксації: {card.confirmationCode}
                        </p>
                      )}
                      {card.cancelReason && (
                        <p className="text-[#AB3336] dark:text-red-400 font-medium pt-0.5">
                          Причина скасування: {card.cancelReason}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons for Pending State */}
                    {isPending && (
                      <div className="space-y-2 pt-1">
                        {/* Primary Confirm Button */}
                        <button
                          onClick={() => handleConfirm(card.id)}
                          disabled={isConfirming}
                          className="w-full h-11 bg-[#A7E4F2] hover:bg-[#92d8e8] active:bg-[#7dcfe2] text-[#0D0D0D] font-bold text-xs tracking-wider uppercase border border-[#4F6C73] rounded-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 shadow-2xs"
                        >
                          {isConfirming ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin" />
                              <span>ФІКСАЦІЯ УГОДИ...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 text-[#0D0D0D]" />
                              <span>ПІДТВЕРДИТИ УГОДУ</span>
                            </>
                          )}
                        </button>

                        {/* Two equal sized buttons: Скасувати & Переглянути умови */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setShowCancelDialog(true)}
                            className="h-10 px-2 flex items-center justify-center text-center text-xs font-bold text-[#AB3336] dark:text-red-300 bg-red-50/70 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-xs transition-colors cursor-pointer"
                          >
                            <span>Скасувати</span>
                          </button>

                          <button
                            onClick={() => setShowTermsModal(true)}
                            className="h-10 px-2 flex items-center justify-center text-center text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/15 dark:bg-[#4F6C73]/25 hover:bg-[#A7E4F2]/30 dark:hover:bg-[#4F6C73]/40 border border-[#4F6C73]/40 dark:border-neutral-600 rounded-xs transition-colors cursor-pointer"
                          >
                            <span>Переглянути умови</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white dark:bg-[#181F22] border-t border-[#A6A6A6]/30 dark:border-neutral-700">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Напишіть повідомлення продавцю..."
            className="flex-1 h-10 px-3 bg-neutral-100 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs text-xs focus:outline-hidden focus:border-[#4F6C73] font-body"
          />
          <button
            type="submit"
            className="w-10 h-10 bg-[#4F6C73] hover:bg-[#3d555b] active:scale-95 text-white rounded-xs flex items-center justify-center transition-transform cursor-pointer"
            aria-label="Надіслати"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#1A2024] w-full max-w-sm rounded-xs p-4 space-y-3 border border-[#AB3336] shadow-xl text-[#0D0D0D] dark:text-white">
            <h3 className="text-xs font-bold text-[#AB3336] uppercase tracking-wider font-heading">
              Скасування замовлення
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sarala">
              Вкажіть причину для повідомлення продавця:
            </p>
            <input
              type="text"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Наприклад: Знайшов інший варіант / зміна планів"
              className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-xs focus:outline-hidden focus:border-[#AB3336]"
            />
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  const pendingMsg = messages.find(m => m.tradeCard?.status === 'pending');
                  if (pendingMsg && pendingMsg.tradeCard) {
                    handleCancelSubmit(pendingMsg.tradeCard.id);
                  } else {
                    setShowCancelDialog(false);
                  }
                }}
                className="flex-1 py-2 bg-[#AB3336] text-white text-xs font-bold rounded-xs cursor-pointer hover:bg-red-700"
              >
                Підтвердити скасування
              </button>
              <button
                onClick={() => setShowCancelDialog(false)}
                className="py-2 px-3 border border-neutral-300 dark:border-neutral-600 text-xs font-semibold rounded-xs cursor-pointer dark:text-neutral-300"
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Escrow Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#1A2024] w-full max-w-sm rounded-xs p-4 space-y-3 border border-[#4F6C73] shadow-xl text-[#0D0D0D] dark:text-white">
            <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-2">
              <div className="flex items-center gap-1.5 text-[#4F6C73] dark:text-[#A7E4F2]">
                <ShieldCheck className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-heading">
                  Умови безпечної угоди Scroll &amp; Buy
                </h3>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-neutral-700 dark:text-neutral-300 space-y-2 font-sarala max-h-64 overflow-y-auto no-scrollbar">
              <div className="p-2.5 bg-[#A7E4F2]/20 dark:bg-[#4F6C73]/30 rounded-xs border border-[#4F6C73]/20 dark:border-neutral-700 space-y-1">
                <p className="font-bold text-[#0D0D0D] dark:text-white">1. Безпечний Escrow-депозит</p>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">Кошти за товар або бронювання блокуються на незалежному рахунку й виплачуються майстру лише після фактичного отримання посилки або надання послуги.</p>
              </div>

              <div className="p-2.5 bg-neutral-50 dark:bg-[#121618] rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-1">
                <p className="font-bold text-[#0D0D0D] dark:text-white">2. Право на повернення</p>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">У разі невідповідності товару опису ви маєте право оформити повернення протягом 14 днів через модератора платформи.</p>
              </div>

              <div className="p-2.5 bg-neutral-50 dark:bg-[#121618] rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-1">
                <p className="font-bold text-[#0D0D0D] dark:text-white">3. Фіксація ціни</p>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">Після створення картки-трейду продавець не має права в односторонньому порядку збільшувати вартість чи додавати приховані платежі.</p>
              </div>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2 bg-[#4F6C73] text-white text-xs font-bold rounded-xs cursor-pointer uppercase hover:bg-[#3d555b]"
            >
              Зрозуміло, закрити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
