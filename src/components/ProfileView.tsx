import React, { useState } from 'react';
import { 
  SellerPublication, 
  BookingSlot, 
  BuyerOrder, 
  Product, 
  BuyerProfile, 
  SellerProfile,
  AppLanguage,
  AppTheme
} from '../types';
import { getTranslation } from '../data/translations';
import { ProductArtwork } from './ProductArtwork';
import { 
  User, 
  Store, 
  Film, 
  FileText, 
  Calendar as CalendarIcon, 
  ShoppingBag, 
  Heart, 
  Clock, 
  CheckCircle, 
  Plus, 
  Bookmark, 
  Share2, 
  Play, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Settings,
  Edit3,
  Trash2,
  PowerOff,
  Globe,
  Sun,
  Moon,
  Monitor,
  Bell,
  X,
  Truck,
  Copy,
  Check,
  Search,
  AlertCircle,
  Package,
  RotateCcw,
  Receipt,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  XCircle,
  CheckCircle2
} from 'lucide-react';

interface ProfileViewProps {
  buyerProfile: BuyerProfile;
  sellerProfile: SellerProfile;
  onUpdateBuyerProfile: (profile: BuyerProfile) => void;
  onUpdateSellerProfile: (profile: SellerProfile) => void;
  publications: SellerPublication[];
  bookingSlots: BookingSlot[];
  buyerOrders: BuyerOrder[];
  sellerProducts: Product[];
  onCreateClick: () => void;
  onOpenProduct: (product: Product) => void;
  onWatchVideo: (product: Product) => void;
  onDeletePublication: (id: string) => void;
  onDeleteSellerProduct: (id: string) => void;
  onAddSellerProduct: (product: Product) => void;
  onDeleteBookingSlot: (id: string) => void;
  onAddBookingSlot: (slot: BookingSlot) => void;
  savedProducts: Product[];
  appLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  appTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  buyerProfile,
  sellerProfile,
  onUpdateBuyerProfile,
  onUpdateSellerProfile,
  publications,
  bookingSlots,
  buyerOrders,
  sellerProducts,
  onCreateClick,
  onOpenProduct,
  onWatchVideo,
  onDeletePublication,
  onDeleteSellerProduct,
  onAddSellerProduct,
  onDeleteBookingSlot,
  onAddBookingSlot,
  savedProducts,
  appLanguage,
  onLanguageChange,
  appTheme,
  onThemeChange,
}) => {
  const t = getTranslation(appLanguage);

  // Main Role Switcher: Кабінет покупця vs Кабінет продавця
  const [roleMode, setRoleMode] = useState<'buyer' | 'seller'>('buyer');

  // Buyer Subtabs: orders, saved, bookings, settings
  const [buyerTab, setBuyerTab] = useState<'orders' | 'saved' | 'bookings' | 'settings'>('orders');

  // Seller Subtabs: posts (video + text), vitrine (products + calendar management)
  const [sellerTab, setSellerTab] = useState<'posts' | 'vitrine'>('posts');
  const [vitrineType, setVitrineType] = useState<'products' | 'calendar'>('products');

  // Modals for editing profiles
  const [showEditBuyerModal, setShowEditBuyerModal] = useState(false);
  const [showEditSellerModal, setShowEditSellerModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [selectedPub, setSelectedPub] = useState<SellerPublication | null>(null);

  // Edit Buyer Form State
  const [editBuyerName, setEditBuyerName] = useState(buyerProfile.name);
  const [editBuyerPhone, setEditBuyerPhone] = useState(buyerProfile.phone);
  const [editBuyerCity, setEditBuyerCity] = useState(buyerProfile.city);

  // Edit Seller Form State
  const [editSellerName, setEditSellerName] = useState(sellerProfile.name);
  const [editSellerHandle, setEditSellerHandle] = useState(sellerProfile.handle);
  const [editSellerBio, setEditSellerBio] = useState(sellerProfile.bio);
  const [editSellerAddress, setEditSellerAddress] = useState(sellerProfile.address);

  // New Seller Product Form State
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Шкіра та аксесуари');

  // New Booking Slot Form State
  const [newSlotDate, setNewSlotDate] = useState('20 Жовтня, Пн');
  const [newSlotTime, setNewSlotTime] = useState('14:00 - 16:30');
  const [newSlotTitle, setNewSlotTitle] = useState('Індивідуальний воркшоп з крафту');
  const [newSlotPrice, setNewSlotPrice] = useState('950');

  // Settings Modal State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveSettingsToast, setSaveSettingsToast] = useState(false);

  // Buyer Order History Filter & Tracking State
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'in_transit' | 'delivered' | 'cancelled'>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<BuyerOrder | null>(null);
  const [trackingToast, setTrackingToast] = useState<string | null>(null);
  const [expandedTrackingIds, setExpandedTrackingIds] = useState<Record<string, boolean>>({
    'ORD-8492': true,
  });

  const showTrackingToast = (msg: string) => {
    setTrackingToast(msg);
    setTimeout(() => setTrackingToast(null), 2500);
  };

  const handleCopyTrackingNumber = (trackingNumber: string) => {
    navigator.clipboard.writeText(trackingNumber);
    showTrackingToast(`✓ ТТН ${trackingNumber} скопійовано!`);
  };

  const toggleExpandTracking = (orderId: string) => {
    setExpandedTrackingIds(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleSaveBuyerProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBuyerProfile({
      ...buyerProfile,
      name: editBuyerName,
      phone: editBuyerPhone,
      city: editBuyerCity,
      avatar: editBuyerName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'НК',
    });
    setShowEditBuyerModal(false);
  };

  const handleSaveSellerProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSellerProfile({
      ...sellerProfile,
      name: editSellerName,
      handle: editSellerHandle,
      bio: editSellerBio,
      address: editSellerAddress,
      avatar: editSellerName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'LL',
    });
    setShowEditSellerModal(false);
  };

  const handleCreateSellerProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle || !newProdPrice) return;
    const newProduct: Product = {
      id: `seller-prod-${Date.now()}`,
      title: newProdTitle,
      author: sellerProfile.name,
      authorHandle: sellerProfile.handle,
      authorAvatar: sellerProfile.avatar,
      price: Number(newProdPrice),
      currency: 'грн',
      description: 'Новий крафтовий виріб ручної роботи з гарантією якості.',
      category: newProdCategory,
      tags: ['#новийвиріб', '#шкіра', '#хендмейд'],
      inStock: true,
      type: 'product',
      condition: 'new',
      rating: 5.0,
      reviewsCount: 0,
      location: sellerProfile.address,
      videoTitle: newProdTitle,
      soundTitle: 'Майстерня звуку',
      likes: 0,
      comments: 0,
      shares: 0,
      imageBgColor: '#2D1F18',
    };
    onAddSellerProduct(newProduct);
    setNewProdTitle('');
    setNewProdPrice('');
    setShowAddProductModal(false);
  };

  const handleCreateBookingSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotTitle || !newSlotPrice) return;
    const newSlot: BookingSlot = {
      id: `slot-seller-${Date.now()}`,
      date: newSlotDate,
      time: newSlotTime,
      serviceTitle: newSlotTitle,
      price: Number(newSlotPrice),
      currency: 'грн',
      masterName: `${sellerProfile.name} (Майстер)`,
      isBooked: false,
    };
    onAddBookingSlot(newSlot);
    setShowAddSlotModal(false);
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 overflow-y-auto no-scrollbar transition-colors">
      {/* Top Bar with Mode Switcher */}
      <div className="sticky top-0 z-20 p-3 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs space-y-2.5 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black tracking-wider text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
            ОСОБИСТИЙ КАБІНЕТ
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
            {roleMode === 'buyer' ? 'Режим: Наталія (Покупець)' : 'Режим: Lviv Leather Craft'}
          </span>
        </div>

        {/* Clear Mode Switcher: Кабінет покупця vs Кабінет продавця */}
        <div className="grid grid-cols-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xs border border-neutral-200 dark:border-neutral-700 text-xs font-bold font-heading">
          <button
            onClick={() => setRoleMode('buyer')}
            className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              roleMode === 'buyer'
                ? 'bg-[#4F6C73] text-white shadow-xs'
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Кабінет покупця</span>
          </button>

          <button
            onClick={() => setRoleMode('seller')}
            className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              roleMode === 'seller'
                ? 'bg-[#4F6C73] text-white shadow-xs'
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Кабінет продавця</span>
          </button>
        </div>
      </div>

      {/* ===================== BUYER MODE ===================== */}
      {roleMode === 'buyer' ? (
        <div className="p-4 space-y-4 pb-20">
          {/* Buyer Profile Badge */}
          <div className="p-3.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-full bg-[#4F6C73] text-white flex items-center justify-center font-bold text-sm border-2 border-[#A7E4F2] shadow-xs shrink-0">
                {buyerProfile.avatar}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-bold text-[#0D0D0D] dark:text-neutral-100 font-heading truncate">
                    {buyerProfile.name}
                  </h3>
                  <span className="text-[10px] bg-[#A7E4F2] text-[#0D0D0D] font-bold px-1.5 py-0.2 rounded-xs shrink-0">
                    {t.buyerRoleBadge}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">{buyerProfile.city} · {buyerProfile.phone}</p>
              </div>
            </div>

            {/* Actions: "Редагувати" and directly under it "Налаштування" */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                onClick={() => setShowEditBuyerModal(true)}
                className="py-1 px-3 text-[#4F6C73] hover:bg-[#A7E4F2]/20 dark:text-[#A7E4F2] dark:hover:bg-neutral-700 rounded-xs border border-[#4F6C73]/30 dark:border-[#A7E4F2]/40 transition-colors cursor-pointer flex items-center justify-center gap-1 text-[11px] font-bold"
                title={t.editBtn}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.editBtn}</span>
              </button>

              <button
                onClick={() => setBuyerTab('settings')}
                className={`py-1 px-3 rounded-xs border transition-colors cursor-pointer flex items-center justify-center gap-1 text-[11px] font-bold ${
                  buyerTab === 'settings'
                    ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
                title={t.settingsBtn}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t.settingsBtn}</span>
              </button>
            </div>
          </div>

          {/* Buyer Navigation Subtabs with High Contrast Darker Text when inactive */}
          <div className="flex border-b border-[#A6A6A6]/30 dark:border-neutral-700 text-xs font-bold font-heading bg-white dark:bg-[#1A2024] rounded-xs overflow-hidden shadow-2xs">
            <button
              onClick={() => setBuyerTab('orders')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer border-b-2 ${
                buyerTab === 'orders'
                  ? 'border-[#4F6C73] text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/15'
                  : 'border-transparent text-[#2D3748] dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              {t.ordersTab} ({buyerOrders.length})
            </button>
            <button
              onClick={() => setBuyerTab('saved')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer border-b-2 ${
                buyerTab === 'saved'
                  ? 'border-[#4F6C73] text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/15'
                  : 'border-transparent text-[#2D3748] dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              {t.savedTab} ({savedProducts.length})
            </button>
            <button
              onClick={() => setBuyerTab('bookings')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer border-b-2 ${
                buyerTab === 'bookings'
                  ? 'border-[#4F6C73] text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/15'
                  : 'border-transparent text-[#2D3748] dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              {t.bookingsTab}
            </button>
          </div>

          {/* 1. Buyer Orders & Detailed Delivery Tracking History */}
          {buyerTab === 'orders' && (
            <div className="space-y-3.5">
              {/* Copy Tracking Number Toast */}
              {trackingToast && (
                <div className="p-2.5 bg-[#0D0D0D] text-[#7FE176] rounded-xs border border-[#7FE176] text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-fadeIn">
                  <Check className="w-4 h-4 text-[#7FE176]" />
                  <span>{trackingToast}</span>
                </div>
              )}

              {/* Prominent Search Bar for Buyer Orders */}
              <div className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="buyer-order-search" className="text-[11px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] uppercase tracking-wider flex items-center gap-1.5 font-heading">
                    <Search className="w-3.5 h-3.5" />
                    <span>Пошук замовлень та покупок</span>
                  </label>
                  {orderSearchQuery && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A7E4F2]/20 text-[#4F6C73] dark:text-[#A7E4F2] font-semibold border border-[#A7E4F2]/30 flex items-center gap-1">
                      <span>Активний пошук</span>
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="buyer-order-search"
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Пошук за назвою товару або номером замовлення (ORD-8492, ТТН)..."
                    className="w-full pl-9 pr-9 py-2 bg-neutral-50 dark:bg-[#121618] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 text-xs text-[#0D0D0D] dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2] focus:bg-white dark:focus:bg-[#1A2024] shadow-inner transition-colors"
                  />
                  {orderSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setOrderSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer p-0.5 rounded-full transition-colors"
                      title="Очистити рядок пошуку"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Quick search suggestions */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 text-[10px]">
                  <span className="text-neutral-400 shrink-0 font-medium">Швидко:</span>
                  {['ORD-8492', 'Глиняне горнятко', 'Шкіряний гаманець', 'ORD-7310', 'Нова Пошта'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setOrderSearchQuery(chip)}
                      className={`px-2 py-0.5 rounded-2xs border shrink-0 transition-all cursor-pointer active:scale-95 ${
                        orderSearchQuery === chip
                          ? 'bg-[#4F6C73] text-white border-[#4F6C73] font-bold shadow-2xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-[#4F6C73]'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                  {orderSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setOrderSearchQuery('')}
                      className="text-rose-500 hover:text-rose-600 dark:text-rose-400 underline shrink-0 font-semibold ml-1 cursor-pointer"
                    >
                      Скинути
                    </button>
                  )}
                </div>
              </div>

              {/* Status Summary KPI Cards (Filter Triggers) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('all')}
                  className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer ${
                    orderStatusFilter === 'all'
                      ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                      : 'bg-white dark:bg-[#1A2024] text-[#0D0D0D] dark:text-neutral-100 border-[#A6A6A6]/30 dark:border-neutral-700 hover:border-[#4F6C73]'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80">
                    Усі замовлення
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-base font-black font-heading tabular-nums">
                      {buyerOrders.length}
                    </span>
                    <Package className="w-4 h-4 opacity-75" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('in_transit')}
                  className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer ${
                    orderStatusFilter === 'in_transit'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-white dark:bg-[#1A2024] text-[#0D0D0D] dark:text-neutral-100 border-[#A6A6A6]/30 dark:border-neutral-700 hover:border-sky-500'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                    В дорозі
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-base font-black font-heading text-sky-600 dark:text-sky-400 tabular-nums">
                      {buyerOrders.filter(o => o.status === 'In Transit' || o.status === 'В дорозі' || o.status === 'Підтверджено' || o.status === 'В обробці').length}
                    </span>
                    <Truck className="w-4 h-4 text-sky-500" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('delivered')}
                  className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer ${
                    orderStatusFilter === 'delivered'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-[#1A2024] text-[#0D0D0D] dark:text-neutral-100 border-[#A6A6A6]/30 dark:border-neutral-700 hover:border-emerald-500'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80">
                    Доставлено
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-base font-black font-heading text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {buyerOrders.filter(o => o.status === 'Delivered' || o.status === 'Доставлено').length}
                    </span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('cancelled')}
                  className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer ${
                    orderStatusFilter === 'cancelled'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white dark:bg-[#1A2024] text-[#0D0D0D] dark:text-neutral-100 border-[#A6A6A6]/30 dark:border-neutral-700 hover:border-rose-500'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80">
                    Скасовано
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-base font-black font-heading text-rose-600 dark:text-rose-400 tabular-nums">
                      {buyerOrders.filter(o => o.status === 'Cancelled' || o.status === 'Скасовано').length}
                    </span>
                    <XCircle className="w-4 h-4 text-rose-500" />
                  </div>
                </button>
              </div>

              {/* Order Cards List */}
              {(() => {
                const filtered = buyerOrders.filter((ord) => {
                  // Filter by status tab
                  if (orderStatusFilter === 'in_transit') {
                    if (!(ord.status === 'In Transit' || ord.status === 'В дорозі' || ord.status === 'Підтверджено' || ord.status === 'В обробці')) return false;
                  } else if (orderStatusFilter === 'delivered') {
                    if (!(ord.status === 'Delivered' || ord.status === 'Доставлено')) return false;
                  } else if (orderStatusFilter === 'cancelled') {
                    if (!(ord.status === 'Cancelled' || ord.status === 'Скасовано')) return false;
                  }

                  // Search query
                  if (orderSearchQuery.trim()) {
                    const q = orderSearchQuery.toLowerCase();
                    const matchId = ord.id.toLowerCase().includes(q);
                    const matchTitle = ord.title.toLowerCase().includes(q);
                    const matchAuthor = ord.author.toLowerCase().includes(q);
                    const matchTracking = (ord.trackingNumber || '').toLowerCase().includes(q);
                    const matchCarrier = (ord.carrier || '').toLowerCase().includes(q);
                    if (!matchId && !matchTitle && !matchAuthor && !matchTracking && !matchCarrier) return false;
                  }

                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-8 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 text-center space-y-2.5 shadow-2xs">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                        <Search className="w-6 h-6 text-neutral-400" />
                      </div>
                      <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                        {orderSearchQuery 
                          ? `За запитом «${orderSearchQuery}» замовлень не знайдено` 
                          : 'Замовлень за обраними фільтрами не знайдено'}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-sarala max-w-xs mx-auto">
                        {orderSearchQuery
                          ? 'Перевірте правильність написання назви або спробуйте ввести номер ORD чи трекінг ТТН'
                          : 'Спробуйте змінити статус замовлення або скинути фільтри'}
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        {orderSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setOrderSearchQuery('')}
                            className="px-3 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-[11px] font-bold rounded-xs cursor-pointer shadow-xs"
                          >
                            Очистити пошук
                          </button>
                        )}
                        {orderStatusFilter !== 'all' && (
                          <button
                            type="button"
                            onClick={() => setOrderStatusFilter('all')}
                            className="px-3 py-1.5 bg-neutral-200 dark:bg-neutral-700 text-[#0D0D0D] dark:text-white text-[11px] font-bold rounded-xs cursor-pointer"
                          >
                            Показати всі статуси
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    {orderSearchQuery && (
                      <div className="flex items-center justify-between px-1 text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Search className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                          <span>Результати пошуку: <strong className="text-[#0D0D0D] dark:text-white font-bold">{filtered.length}</strong> {filtered.length === 1 ? 'замовлення' : 'замовлень'}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setOrderSearchQuery('')}
                          className="text-[#4F6C73] dark:text-[#A7E4F2] hover:underline font-bold text-[11px] cursor-pointer"
                        >
                          Скинути пошук
                        </button>
                      </div>
                    )}
                    {filtered.map((ord) => {
                  const isDelivered = ord.status === 'Delivered' || ord.status === 'Доставлено';
                  const isInTransit = ord.status === 'In Transit' || ord.status === 'В дорозі' || ord.status === 'Підтверджено' || ord.status === 'В обробці';
                  const isCancelled = ord.status === 'Cancelled' || ord.status === 'Скасовано';
                  const isExpanded = !!expandedTrackingIds[ord.id];

                  return (
                    <div
                      key={ord.id}
                      className={`p-3.5 bg-white dark:bg-[#1A2024] rounded-xs border shadow-2xs space-y-3 transition-colors ${
                        isCancelled 
                          ? 'border-rose-200 dark:border-rose-900/60' 
                          : isInTransit 
                          ? 'border-sky-200 dark:border-sky-900/60' 
                          : 'border-[#A6A6A6]/30 dark:border-neutral-700'
                      }`}
                    >
                      {/* Order Card Top Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-black text-xs text-[#0D0D0D] dark:text-white tracking-wider">
                            #{ord.id}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-sarala">
                            · {ord.date}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#4F6C73]/15 text-[#4F6C73] dark:text-[#A7E4F2] font-mono font-semibold rounded-2xs">
                            Ескроу-захист ✓
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isDelivered && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>Доставлено (Delivered)</span>
                            </span>
                          )}

                          {isInTransit && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-xs bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                              </span>
                              <Truck className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                              <span>В дорозі (In Transit)</span>
                            </span>
                          )}

                          {isCancelled && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-xs bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                              <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                              <span>Скасовано (Cancelled)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Overview Row */}
                      <div className="flex items-center gap-3">
                        <div className="w-13 h-13 bg-neutral-100 dark:bg-neutral-800 rounded-xs overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700">
                          <ProductArtwork
                            type={ord.imageType}
                            aspectRatio="thumb"
                            className="w-full h-full scale-110"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white truncate font-heading">
                            {ord.title}
                          </h4>
                          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 truncate">
                            {ord.author}
                          </p>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="text-xs font-black text-[#0D0D0D] dark:text-white tabular-nums">
                              {ord.price} {ord.currency}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-sarala">
                              · 1 шт · Оплачено
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Individual Delivery Tracking Box */}
                      <div className={`p-3 rounded-xs border space-y-2.5 transition-colors ${
                        isCancelled
                          ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                          : isInTransit
                          ? 'bg-sky-50/60 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/60'
                          : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/80'
                      }`}>
                        {/* Tracking Number & Carrier Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] px-1.5 py-0.5 bg-[#4F6C73] text-white font-bold rounded-xs font-mono uppercase">
                              {ord.carrier || 'Нова Пошта'}
                            </span>
                            <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 font-heading">
                              Трек-номер відстеження:
                            </span>
                            <span className="font-mono font-bold text-xs text-[#0D0D0D] dark:text-white bg-white dark:bg-[#121618] px-2 py-0.5 rounded-xs border border-neutral-300 dark:border-neutral-600 select-all tracking-wider">
                              {ord.trackingNumber || 'NP20450918472911'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {ord.trackingNumber && (
                              <button
                                type="button"
                                onClick={() => handleCopyTrackingNumber(ord.trackingNumber || '')}
                                className="px-2 py-1 bg-white dark:bg-[#121618] hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-[10px] font-bold rounded-xs border border-neutral-300 dark:border-neutral-600 flex items-center gap-1 cursor-pointer transition-colors"
                                title="Скопіювати індивідуальний трекінг-номер ТТН"
                              >
                                <Copy className="w-3 h-3 text-[#4F6C73] dark:text-[#A7E4F2]" />
                                <span>Копіювати ТТН</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => toggleExpandTracking(ord.id)}
                              className="px-2 py-1 bg-white dark:bg-[#121618] hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-[10px] font-bold rounded-xs border border-neutral-300 dark:border-neutral-600 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>{isExpanded ? 'Згорнути' : 'Маршрут'}</span>
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>

                        {/* Delivery Meta Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                          <div className="flex items-start gap-1.5 text-neutral-600 dark:text-neutral-300">
                            <MapPin className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-neutral-800 dark:text-neutral-200 block text-[10px] uppercase">
                                Адреса доставки:
                              </span>
                              <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                                {ord.deliveryAddress || 'м. Львів, Відділення №24'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-1.5 text-neutral-600 dark:text-neutral-300">
                            <Clock className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-neutral-800 dark:text-neutral-200 block text-[10px] uppercase">
                                Статус доставки:
                              </span>
                              <p className="mt-0.5 font-bold text-[#0D0D0D] dark:text-white">
                                {ord.estimatedDelivery || (isDelivered ? 'Успішно вручено' : isInTransit ? 'Очікується найближчим часом' : 'Операцію скасовано')}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Tracking Timeline / Stepper */}
                        {isExpanded && ord.trackingSteps && ord.trackingSteps.length > 0 && (
                          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700/80 space-y-2">
                            <span className="text-[10px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase tracking-wider block">
                              Хронологія доставки посилки:
                            </span>

                            <div className="space-y-2 pl-2">
                              {ord.trackingSteps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 relative">
                                  {idx < ord.trackingSteps!.length - 1 && (
                                    <div className={`absolute left-2 top-3 bottom-0 w-[1.5px] -mb-2 ${
                                      step.completed ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-600'
                                    }`} />
                                  )}
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 z-10 text-[9px] font-bold ${
                                    step.completed
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 border border-neutral-300'
                                  }`}>
                                    {step.completed ? '✓' : idx + 1}
                                  </div>
                                  <div className="min-w-0 flex-1 text-[11px]">
                                    <div className="flex items-baseline justify-between gap-2">
                                      <span className={`font-semibold ${step.completed ? 'text-[#0D0D0D] dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                                        {step.title}
                                      </span>
                                      <span className="text-[10px] text-neutral-400 shrink-0 font-mono">
                                        {step.date}
                                      </span>
                                    </div>
                                    {step.location && (
                                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block font-sarala">
                                        Локація: {step.location}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cancelled Notice Details */}
                        {isCancelled && ord.cancelReason && (
                          <div className="p-2.5 bg-rose-100/70 dark:bg-rose-950/40 rounded-xs border border-rose-300 dark:border-rose-800 text-[11px] space-y-1">
                            <div className="flex items-center gap-1.5 text-rose-900 dark:text-rose-200 font-bold text-[10px] uppercase">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Причина скасування та повернення:</span>
                            </div>
                            <p className="text-rose-950 dark:text-rose-100 font-sarala">
                              {ord.cancelReason}
                            </p>
                          </div>
                        )}

                        {/* Card Bottom Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-neutral-200 dark:border-neutral-700/80">
                          <button
                            type="button"
                            onClick={() => setSelectedTrackingOrder(ord)}
                            className="px-2.5 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs text-[10px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Truck className="w-3 h-3 text-[#A7E4F2]" />
                            <span>Повний трекінг &amp; штрихкод</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            {isDelivered && (
                              <button
                                type="button"
                                onClick={() => showTrackingToast(`✓ Повторне замовлення ${ord.title} додано в кошик!`)}
                                className="px-2 py-1 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] rounded-xs text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Повторити замовлення</span>
                              </button>
                            )}

                            {isInTransit && (
                              <button
                                type="button"
                                onClick={() => setSelectedTrackingOrder(ord)}
                                className="px-2 py-1 bg-sky-100 hover:bg-sky-200 dark:bg-sky-950/80 text-sky-900 dark:text-sky-200 rounded-xs text-[10px] font-bold border border-sky-300 dark:border-sky-800 flex items-center gap-1 cursor-pointer"
                              >
                                <span>Штрихкод видачі</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
            </div>
          )}

          {/* 2. Saved Items */}
          {buyerTab === 'saved' && (
            <div className="space-y-2.5">
              {savedProducts.length === 0 ? (
                <div className="p-6 bg-white dark:bg-[#1A2024] rounded-xs border dark:border-neutral-700 text-center text-xs text-neutral-500 dark:text-neutral-400">
                  У вас поки немає збережених товарів. Натискайте на іконку закладки у стрічці!
                </div>
              ) : (
                savedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onOpenProduct(p)}
                    className="p-2.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 flex items-center justify-between gap-3 shadow-2xs hover:shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-xs overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700">
                        <ProductArtwork
                          type={p.id.replace('prod-', '')}
                          aspectRatio="thumb"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white truncate font-heading">
                          {p.title}
                        </h4>
                        <p className="text-[10px] text-neutral-600 dark:text-neutral-400">{p.author}</p>
                        <span className="text-xs font-black text-[#0D0D0D] dark:text-white">
                          {p.price} {p.currency}
                        </span>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-[11px] font-bold rounded-xs uppercase">
                      Купити
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 3. Buyer Bookings */}
          {buyerTab === 'bookings' && (
            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D0D0D] dark:text-white flex items-center gap-1.5 font-heading">
                    <CalendarIcon className="w-4 h-4 text-[#4F6C73] dark:text-[#A7E4F2]" />
                    18 Жовтня, 12:00 - 14:00
                  </span>
                  <span className="text-[10px] font-bold bg-[#7FE176]/30 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-xs">
                    Заброньовано
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white">
                  Майстер-клас з ручного ліплення та глазурування
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Майстерня: Гончарна майстерня «Глина» · Львів, вул. Вірменська, 14
                </p>
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#0D0D0D] dark:text-white">850 грн (Передплата внесена)</span>
                  <span className="text-[#4F6C73] dark:text-[#A7E4F2] font-semibold">Підтверджено майстром ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Settings Tab */}
          {buyerTab === 'settings' && (
            <div className="space-y-3 bg-white dark:bg-[#1A2024] p-4 rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2">
                <h3 className="text-xs font-bold text-[#0D0D0D] dark:text-neutral-100 uppercase tracking-wider font-heading flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-[#4F6C73] dark:text-[#A7E4F2]" />
                  <span>{t.appSettingsTitle}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setBuyerTab('orders')}
                  className="text-[11px] font-semibold text-[#4F6C73] dark:text-[#A7E4F2] hover:underline cursor-pointer"
                >
                  ← {t.backToProfile}
                </button>
              </div>

              {/* Language Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0D0D0D] dark:text-neutral-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                  <span>{t.languageLabel}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('uk');
                      setSaveSettingsToast(true);
                      setTimeout(() => setSaveSettingsToast(false), 2000);
                    }}
                    className={`py-2 px-3 text-xs font-bold rounded-xs border text-center transition-all cursor-pointer ${
                      appLanguage === 'uk'
                        ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    🇺🇦 Українська
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('en');
                      setSaveSettingsToast(true);
                      setTimeout(() => setSaveSettingsToast(false), 2000);
                    }}
                    className={`py-2 px-3 text-xs font-bold rounded-xs border text-center transition-all cursor-pointer ${
                      appLanguage === 'en'
                        ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              {/* Theme Selection: Світла vs Темна */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                <label className="text-xs font-semibold text-[#0D0D0D] dark:text-neutral-200 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                  <span>{t.themeLabel}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onThemeChange('light');
                      setSaveSettingsToast(true);
                      setTimeout(() => setSaveSettingsToast(false), 2000);
                    }}
                    className={`py-2 text-xs font-bold rounded-xs border text-center flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      appTheme === 'light'
                        ? 'bg-[#A7E4F2] text-[#0D0D0D] border-[#4F6C73] shadow-xs font-black'
                        : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>{t.lightTheme}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onThemeChange('dark');
                      setSaveSettingsToast(true);
                      setTimeout(() => setSaveSettingsToast(false), 2000);
                    }}
                    className={`py-2 text-xs font-bold rounded-xs border text-center flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      appTheme === 'dark'
                        ? 'bg-neutral-900 text-white border-[#A7E4F2] shadow-xs ring-1 ring-[#A7E4F2] font-black'
                        : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>{t.darkTheme}</span>
                  </button>
                </div>
              </div>

              {/* Notification Toggle */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0D0D0D] dark:text-neutral-200 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                  <span>{t.notificationsLabel}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ${
                    notificationsEnabled ? 'bg-[#4F6C73]' : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                  aria-label="Перемикач сповіщень"
                >
                  <div
                    className={`w-5 h-5 rounded-full shadow-xs transform transition-transform duration-200 ${
                      notificationsEnabled ? 'translate-x-5 bg-[#A7E4F2]' : 'translate-x-0 bg-white'
                    }`}
                  />
                </button>
              </div>

              {saveSettingsToast && (
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[11px] font-bold rounded-xs text-center border border-emerald-300 dark:border-emerald-700">
                  {t.settingsApplied}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ===================== SELLER MODE (TIKTOK STYLE) ===================== */
        <div className="flex-1 flex flex-col pb-20">
          {/* TikTok-Style Seller Profile Header */}
          <div className="p-4 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700 space-y-3 text-center transition-colors">
            {/* Avatar & Edit */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#3D251A] to-[#8D5B3A] text-white flex items-center justify-center font-bold text-2xl border-2 border-white dark:border-neutral-700 shadow-md">
                  {sellerProfile.avatar}
                </div>
                <button
                  onClick={() => setShowEditSellerModal(true)}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-[#4F6C73] text-white rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-700 shadow-xs cursor-pointer hover:bg-[#3d555b]"
                  title="Редагувати профіль продавця"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>

              <h2 className="text-base font-bold text-[#0D0D0D] dark:text-white font-heading flex items-center justify-center gap-1">
                <span>{sellerProfile.name}</span>
                <CheckCircle className="w-4 h-4 text-[#4F6C73] fill-[#A7E4F2]" />
              </h2>
              <p className="text-xs text-[#A6A6A6] dark:text-neutral-400 font-mono">{sellerProfile.handle}</p>
            </div>

            {/* TikTok Stats Row */}
            <div className="flex items-center justify-center gap-6 py-1">
              <div className="text-center">
                <span className="text-sm font-black text-[#0D0D0D] dark:text-white block font-heading tabular-nums">
                  {publications.length}
                </span>
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">Публікацій</span>
              </div>
              <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />
              <div className="text-center">
                <span className="text-sm font-black text-[#0D0D0D] dark:text-white block font-heading tabular-nums">
                  {sellerProfile.followers}
                </span>
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">Читачі</span>
              </div>
              <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />
              <div className="text-center">
                <span className="text-sm font-black text-[#0D0D0D] dark:text-white block font-heading tabular-nums">
                  {sellerProfile.likes}
                </span>
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">Вподобайки</span>
              </div>
            </div>

            {/* Bio & Location */}
            <p className="text-xs text-[#0D0D0D] dark:text-neutral-200 font-sarala leading-relaxed max-w-xs mx-auto">
              {sellerProfile.bio}
            </p>
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#4F6C73] dark:text-[#A7E4F2]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{sellerProfile.address}</span>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-col gap-2 pt-1 max-w-xs mx-auto w-full">
              <div className="flex gap-2">
                <button
                  onClick={onCreateClick}
                  className="flex-1 py-2 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-xs font-bold rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#4F6C73]/40 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addPublication}</span>
                </button>
                <button
                  onClick={() => setShowEditSellerModal(true)}
                  className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#0D0D0D] dark:text-neutral-100 text-xs font-bold rounded-xs border border-neutral-300 dark:border-neutral-600 transition-colors cursor-pointer flex items-center gap-1"
                  title={t.editBtn}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{t.editBtn}</span>
                </button>
              </div>

              {/* Кнопка "Налаштування" під кнопкою "Редагувати" */}
              <button
                onClick={() => setShowSettingsModal(true)}
                className="w-full py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 text-xs font-bold rounded-xs border border-neutral-300 dark:border-neutral-600 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                title={t.settingsBtn}
              >
                <Settings className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
                <span>{t.settingsBtn}</span>
              </button>
            </div>
          </div>

          {/* Seller Subtabs: 1 - Публікації, 2 - Управління вітриною та датами */}
          <div className="sticky top-28 z-10 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700 flex shadow-2xs transition-colors">
            <button
              onClick={() => setSellerTab('posts')}
              className={`flex-1 py-3 text-xs font-bold font-heading flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                sellerTab === 'posts'
                  ? 'border-[#4F6C73] dark:border-[#A7E4F2] text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/10 dark:bg-[#4F6C73]/20'
                  : 'border-transparent text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Публікації ({publications.length})</span>
            </button>

            <button
              onClick={() => setSellerTab('vitrine')}
              className={`flex-1 py-3 text-xs font-bold font-heading flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                sellerTab === 'vitrine'
                  ? 'border-[#4F6C73] dark:border-[#A7E4F2] text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/10 dark:bg-[#4F6C73]/20'
                  : 'border-transparent text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Управління вітриною & Датами</span>
            </button>
          </div>

          {/* SELLER TAB 1: Publications Grid */}
          {sellerTab === 'posts' && (
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 font-heading">
                  Відео та текстові оголошення в одній стрічці:
                </span>
                <button
                  onClick={onCreateClick}
                  className="text-xs font-bold text-[#4F6C73] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Додати</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {publications.map((pub) => (
                  <div
                    key={pub.id}
                    onClick={() => setSelectedPub(pub)}
                    className="relative aspect-[3/4] bg-neutral-900 rounded-xs overflow-hidden cursor-pointer group shadow-2xs border border-neutral-300"
                  >
                    <ProductArtwork
                      type={pub.imageType}
                      aspectRatio="poster"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Badge: Video vs Text Listing */}
                    <div className="absolute top-1.5 left-1.5 z-10">
                      {pub.type === 'video' ? (
                        <span className="flex items-center gap-0.5 text-[8px] font-bold bg-black/60 text-[#A7E4F2] px-1.5 py-0.5 rounded-xs">
                          <Film className="w-2.5 h-2.5" /> Відео
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-[8px] font-bold bg-[#4F6C73] text-white px-1.5 py-0.5 rounded-xs">
                          <FileText className="w-2.5 h-2.5" /> Оголошення
                        </span>
                      )}
                    </div>

                    {/* Bottom views count / price */}
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10 flex items-center justify-between text-[10px] text-white font-mono">
                      <span className="flex items-center gap-0.5 truncate">
                        {pub.type === 'video' ? (
                          <>
                            <Play className="w-2.5 h-2.5 fill-white" />
                            {pub.views > 999 ? `${(pub.views / 1000).toFixed(1)}k` : pub.views}
                          </>
                        ) : (
                          <>
                            <Heart className="w-2.5 h-2.5 fill-[#AB3336] text-[#AB3336]" />
                            {pub.likes}
                          </>
                        )}
                      </span>
                      {pub.price && (
                        <span className="text-[10px] font-black text-[#A7E4F2]">
                          {pub.price} {pub.currency}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SELLER TAB 2: Vitrine & Booking Management (Seller manages their own goods/slots) */}
          {sellerTab === 'vitrine' && (
            <div className="p-3 space-y-4">
              {/* Vitrine Mode Selector */}
              <div className="grid grid-cols-2 p-1 bg-white dark:bg-[#181F22] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 text-xs font-bold font-heading shadow-2xs transition-colors">
                <button
                  onClick={() => setVitrineType('products')}
                  className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    vitrineType === 'products'
                      ? 'bg-[#A7E4F2] text-[#0D0D0D] font-black'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Товари на продаж ({sellerProducts.length})</span>
                </button>
                <button
                  onClick={() => setVitrineType('calendar')}
                  className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    vitrineType === 'calendar'
                      ? 'bg-[#A7E4F2] text-[#0D0D0D] font-black'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Вільні дати ({bookingSlots.length})</span>
                </button>
              </div>

              {/* A. SELLER PRODUCTS MANAGEMENT */}
              {vitrineType === 'products' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-heading">
                      Ваші активні позиції на вітрині:
                    </span>
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="px-2.5 py-1 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-[11px] font-bold rounded-xs flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#A7E4F2]" />
                      <span>Додати товар</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {sellerProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 flex items-center justify-between gap-3 shadow-2xs transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xs overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700">
                            <ProductArtwork
                              type="leather"
                              aspectRatio="thumb"
                              className="w-full h-full scale-110"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white truncate font-heading">
                              {p.title}
                            </h4>
                            <span className="text-[10px] text-[#7FE176] font-semibold block">
                              На вітрині ✓
                            </span>
                            <span className="text-xs font-black text-[#0D0D0D] dark:text-white tabular-nums font-heading">
                              {p.price} {p.currency}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onDeleteSellerProduct(p.id)}
                            className="p-1.5 text-[#AB3336] hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xs border border-red-200 dark:border-red-800 cursor-pointer transition-colors"
                            title="Видалити товар з продажу"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* B. SELLER BOOKING CALENDAR MANAGEMENT */
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-heading">
                      Управління слотами календаря:
                    </span>
                    <button
                      onClick={() => setShowAddSlotModal(true)}
                      className="px-2.5 py-1 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-[11px] font-bold rounded-xs flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#A7E4F2]" />
                      <span>Додати дату/час</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {bookingSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`p-3 rounded-xs border transition-all ${
                          slot.isBooked
                            ? 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60'
                            : 'bg-white dark:bg-[#1A2024] border-[#4F6C73]/40 dark:border-neutral-700 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] block font-heading">
                              {slot.date} · {slot.time}
                            </span>
                            <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white mt-0.5 font-heading">
                              {slot.serviceTitle}
                            </h4>
                            {slot.isBooked ? (
                              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold mt-0.5">
                                ✓ Заброньовано клієнтом: {slot.clientName || 'Клієнт'}
                              </p>
                            ) : (
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Вільний слот для бронювання</p>
                            )}
                          </div>

                          <div className="text-right shrink-0 space-y-1">
                            <span className="text-xs font-black text-[#0D0D0D] dark:text-white block tabular-nums">
                              {slot.price} {slot.currency}
                            </span>
                            <button
                              onClick={() => onDeleteBookingSlot(slot.id)}
                              className="px-2.5 py-1 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-[#AB3336] dark:text-red-300 text-[10px] font-bold rounded-xs border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                              title="Зняти вільну дату з розкладу"
                            >
                              Зняти дату
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===================== MODALS ===================== */}

      {/* 1. Edit Buyer Profile Modal */}
      {showEditBuyerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <form onSubmit={handleSaveBuyerProfile} className="bg-white dark:bg-[#1A2024] w-full max-w-sm rounded-xs p-4 space-y-3 border border-[#4F6C73] dark:border-neutral-700 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-2">
              <h3 className="text-xs font-bold text-[#0D0D0D] dark:text-white uppercase tracking-wider font-heading">
                Редагувати профіль покупця
              </h3>
              <button
                type="button"
                onClick={() => setShowEditBuyerModal(false)}
                className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Ім'я та прізвище:
                </label>
                <input
                  type="text"
                  value={editBuyerName}
                  onChange={(e) => setEditBuyerName(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Номер телефону:
                </label>
                <input
                  type="text"
                  value={editBuyerPhone}
                  onChange={(e) => setEditBuyerPhone(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Місто доставки:
                </label>
                <input
                  type="text"
                  value={editBuyerCity}
                  onChange={(e) => setEditBuyerCity(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-xs font-bold rounded-xs cursor-pointer shadow-xs"
              >
                Зберегти зміни
              </button>
              <button
                type="button"
                onClick={() => setShowEditBuyerModal(false)}
                className="py-2 px-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Edit Seller Profile Modal */}
      {showEditSellerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <form onSubmit={handleSaveSellerProfile} className="bg-white dark:bg-[#1A2024] w-full max-w-sm rounded-xs p-4 space-y-3 border border-[#4F6C73] dark:border-neutral-700 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-2">
              <h3 className="text-xs font-bold text-[#0D0D0D] dark:text-white uppercase tracking-wider font-heading">
                Редагувати профіль продавця
              </h3>
              <button
                type="button"
                onClick={() => setShowEditSellerModal(false)}
                className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Назва бренду / майстерні:
                </label>
                <input
                  type="text"
                  value={editSellerName}
                  onChange={(e) => setEditSellerName(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Нікнейм (@handle):
                </label>
                <input
                  type="text"
                  value={editSellerHandle}
                  onChange={(e) => setEditSellerHandle(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Біографія / Опис:
                </label>
                <textarea
                  rows={2}
                  value={editSellerBio}
                  onChange={(e) => setEditSellerBio(e.target.value)}
                  className="w-full p-2 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Адреса майстерні:
                </label>
                <input
                  type="text"
                  value={editSellerAddress}
                  onChange={(e) => setEditSellerAddress(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-xs font-bold rounded-xs cursor-pointer shadow-xs"
              >
                Зберегти зміни
              </button>
              <button
                type="button"
                onClick={() => setShowEditSellerModal(false)}
                className="py-2 px-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Add Seller Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <form onSubmit={handleCreateSellerProduct} className="bg-white dark:bg-[#1A2024] w-full max-w-sm rounded-xs p-4 space-y-3 border border-[#4F6C73] dark:border-neutral-700 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-2">
              <h3 className="text-xs font-bold text-[#0D0D0D] dark:text-white uppercase tracking-wider font-heading">
                Додати новий товар на вітрину
              </h3>
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Назва товару:
                </label>
                <input
                  type="text"
                  value={newProdTitle}
                  onChange={(e) => setNewProdTitle(e.target.value)}
                  placeholder="Наприклад: Шкіряний ключниця-футляр"
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Ціна (грн):
                </label>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  placeholder="380"
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Категорія:
                </label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full h-9 px-2 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                >
                  <option value="Шкіра та аксесуари">Шкіра та аксесуари</option>
                  <option value="Кераміка та посуд">Кераміка та посуд</option>
                  <option value="Прикраси ручної роботи">Прикраси ручної роботи</option>
                  <option value="Вінтаж та постери">Вінтаж та постери</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-xs font-bold rounded-xs cursor-pointer shadow-xs"
              >
                Опублікувати на вітрині
              </button>
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="py-2 px-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Add Booking Slot Modal */}
      {showAddSlotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <form onSubmit={handleCreateBookingSlot} className="bg-white dark:bg-[#1A2024] w-full max-w-sm rounded-xs p-4 space-y-3 border border-[#4F6C73] dark:border-neutral-700 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-2">
              <h3 className="text-xs font-bold text-[#0D0D0D] dark:text-white uppercase tracking-wider font-heading">
                Додати вільну дату для запису
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSlotModal(false)}
                className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Дата (наприклад: 21 Жовтня, Вт):
                </label>
                <input
                  type="text"
                  value={newSlotDate}
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Час проведення (наприклад: 15:00 - 17:30):
                </label>
                <input
                  type="text"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Назва послуги / майстер-класу:
                </label>
                <input
                  type="text"
                  value={newSlotTitle}
                  onChange={(e) => setNewSlotTitle(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0D0D0D] dark:text-neutral-200 block mb-1">
                  Вартість (грн):
                </label>
                <input
                  type="number"
                  value={newSlotPrice}
                  onChange={(e) => setNewSlotPrice(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 text-[#0D0D0D] dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-xs focus:outline-hidden focus:border-[#4F6C73] dark:focus:border-[#A7E4F2]"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-xs font-bold rounded-xs cursor-pointer shadow-xs"
              >
                Додати в розклад
              </button>
              <button
                type="button"
                onClick={() => setShowAddSlotModal(false)}
                className="py-2 px-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. Selected Publication Detail Sheet */}
      {selectedPub && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-[#1A2024] w-full max-w-sm rounded-t-lg sm:rounded-lg p-4 space-y-3 border border-[#A6A6A6]/40 dark:border-neutral-700 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-2">
              <span className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] uppercase tracking-wider flex items-center gap-1">
                {selectedPub.type === 'video' ? <Film className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                {selectedPub.type === 'video' ? 'Відео публікація' : 'Оголошення'}
              </span>
              <button
                onClick={() => setSelectedPub(null)}
                className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video bg-neutral-900 rounded-xs overflow-hidden">
              <ProductArtwork
                type={selectedPub.imageType}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#0D0D0D] dark:text-white font-heading">
                {selectedPub.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sarala">{selectedPub.description}</p>
              {selectedPub.price && (
                <p className="text-sm font-black text-[#0D0D0D] dark:text-white pt-1">
                  Ціна: {selectedPub.price} {selectedPub.currency}
                </p>
              )}
            </div>

            <div className="pt-2 flex gap-2">
              {selectedPub.type === 'video' && (
                <button
                  onClick={() => {
                    const matchProd = sellerProducts.find(p => p.id === selectedPub.id) || sellerProducts[0];
                    setSelectedPub(null);
                    onWatchVideo(matchProd);
                  }}
                  className="flex-1 py-2 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-xs font-bold rounded-xs cursor-pointer uppercase flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-[#0D0D0D]" />
                  <span>Дивитися у стрічці</span>
                </button>
              )}
              <button
                onClick={() => {
                  onDeletePublication(selectedPub.id);
                  setSelectedPub(null);
                }}
                className="py-2 px-3 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-[#AB3336] dark:text-red-300 text-xs font-bold rounded-xs cursor-pointer border border-red-200 dark:border-red-800"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal (usable from seller mode or any mode) */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1A2024] rounded-sm max-w-sm w-full p-4 space-y-4 shadow-2xl border border-neutral-300 dark:border-neutral-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2">
              <h3 className="text-xs font-bold text-[#0D0D0D] dark:text-neutral-100 uppercase tracking-wider font-heading flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#4F6C73] dark:text-[#A7E4F2]" />
                <span>{t.appSettingsTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0D0D0D] dark:text-neutral-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                <span>{t.languageLabel}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('uk');
                    setSaveSettingsToast(true);
                    setTimeout(() => setSaveSettingsToast(false), 2000);
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-xs border text-center transition-all cursor-pointer ${
                    appLanguage === 'uk'
                      ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  🇺🇦 Українська
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('en');
                    setSaveSettingsToast(true);
                    setTimeout(() => setSaveSettingsToast(false), 2000);
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-xs border text-center transition-all cursor-pointer ${
                    appLanguage === 'en'
                      ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>

            {/* Theme Selection: Світла vs Темна */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-700">
              <label className="text-xs font-semibold text-[#0D0D0D] dark:text-neutral-200 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                <span>{t.themeLabel}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onThemeChange('light');
                    setSaveSettingsToast(true);
                    setTimeout(() => setSaveSettingsToast(false), 2000);
                  }}
                  className={`py-2 text-xs font-bold rounded-xs border text-center flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    appTheme === 'light'
                      ? 'bg-[#A7E4F2] text-[#0D0D0D] border-[#4F6C73] shadow-xs font-black'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{t.lightTheme}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onThemeChange('dark');
                    setSaveSettingsToast(true);
                    setTimeout(() => setSaveSettingsToast(false), 2000);
                  }}
                  className={`py-2 text-xs font-bold rounded-xs border text-center flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    appTheme === 'dark'
                      ? 'bg-neutral-900 text-white border-[#A7E4F2] shadow-xs ring-1 ring-[#A7E4F2] font-black'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{t.darkTheme}</span>
                </button>
              </div>
            </div>

            {/* Notification Toggle */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0D0D0D] dark:text-neutral-200 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                <span>{t.notificationsLabel}</span>
              </span>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ${
                  notificationsEnabled ? 'bg-[#4F6C73]' : 'bg-neutral-300 dark:bg-neutral-600'
                }`}
                aria-label="Перемикач сповіщень"
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-xs transform transition-transform duration-200 ${
                    notificationsEnabled ? 'translate-x-5 bg-[#A7E4F2]' : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>

            {saveSettingsToast && (
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[11px] font-bold rounded-xs text-center border border-emerald-300 dark:border-emerald-700">
                {t.settingsApplied}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2 bg-[#4F6C73] text-white rounded-xs text-xs font-bold cursor-pointer hover:bg-[#3d555b] transition-colors"
            >
              {appLanguage === 'en' ? 'Close' : 'Закрити'}
            </button>
          </div>
        </div>
      )}

      {/* DETAILED PARCEL TRACKING MODAL */}
      {selectedTrackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#1A2024] text-[#0D0D0D] dark:text-neutral-100 w-full max-w-lg rounded-sm border-2 border-[#4F6C73] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-4 py-3 bg-[#4F6C73] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#A7E4F2]" />
                <h3 className="text-xs font-bold font-heading uppercase">
                  Відстеження доставки · {selectedTrackingOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTrackingOrder(null)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs no-scrollbar">
              {/* Digital Parcel Barcode Card */}
              <div className="p-4 bg-white dark:bg-black rounded-xs border border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center space-y-2 shadow-2xs">
                <span className="text-[10px] font-mono uppercase text-neutral-500">
                  Штрихкод для сканування оператором у відділенні:
                </span>

                {/* Vector Barcode Graphics */}
                <div className="py-1">
                  <svg viewBox="0 0 320 60" className="w-64 h-12" fill="currentColor">
                    <g className="text-[#0D0D0D] dark:text-white">
                      <rect x="0" y="0" width="4" height="60" />
                      <rect x="8" y="0" width="2" height="60" />
                      <rect x="14" y="0" width="6" height="60" />
                      <rect x="24" y="0" width="3" height="60" />
                      <rect x="30" y="0" width="2" height="60" />
                      <rect x="36" y="0" width="5" height="60" />
                      <rect x="45" y="0" width="2" height="60" />
                      <rect x="50" y="0" width="7" height="60" />
                      <rect x="61" y="0" width="3" height="60" />
                      <rect x="68" y="0" width="2" height="60" />
                      <rect x="74" y="0" width="5" height="60" />
                      <rect x="83" y="0" width="2" height="60" />
                      <rect x="89" y="0" width="6" height="60" />
                      <rect x="98" y="0" width="3" height="60" />
                      <rect x="105" y="0" width="2" height="60" />
                      <rect x="111" y="0" width="6" height="60" />
                      <rect x="121" y="0" width="4" height="60" />
                      <rect x="129" y="0" width="2" height="60" />
                      <rect x="135" y="0" width="6" height="60" />
                      <rect x="145" y="0" width="3" height="60" />
                      <rect x="152" y="0" width="5" height="60" />
                      <rect x="161" y="0" width="2" height="60" />
                      <rect x="167" y="0" width="7" height="60" />
                      <rect x="178" y="0" width="3" height="60" />
                      <rect x="185" y="0" width="2" height="60" />
                      <rect x="191" y="0" width="5" height="60" />
                      <rect x="200" y="0" width="6" height="60" />
                      <rect x="210" y="0" width="2" height="60" />
                      <rect x="216" y="0" width="4" height="60" />
                      <rect x="224" y="0" width="3" height="60" />
                      <rect x="231" y="0" width="7" height="60" />
                      <rect x="242" y="0" width="2" height="60" />
                      <rect x="248" y="0" width="5" height="60" />
                      <rect x="257" y="0" width="3" height="60" />
                      <rect x="264" y="0" width="6" height="60" />
                      <rect x="274" y="0" width="2" height="60" />
                      <rect x="280" y="0" width="5" height="60" />
                      <rect x="289" y="0" width="6" height="60" />
                      <rect x="299" y="0" width="2" height="60" />
                      <rect x="305" y="0" width="6" height="60" />
                      <rect x="315" y="0" width="5" height="60" />
                    </g>
                  </svg>
                </div>

                {/* Monospace Tracking Code */}
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm tracking-widest text-[#0D0D0D] dark:text-white">
                    {selectedTrackingOrder.trackingNumber || 'NP20450918472911'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyTrackingNumber(selectedTrackingOrder.trackingNumber || '')}
                    className="p-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-[#4F6C73] dark:text-[#A7E4F2] rounded-xs cursor-pointer"
                    title="Скопіювати ТТН"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Status and Carrier Summary */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/70 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono text-[#4F6C73] dark:text-[#A7E4F2] uppercase">
                    Служба доставки:
                  </span>
                  <span className="px-2 py-0.5 bg-[#4F6C73] text-white font-mono font-bold text-[10px] rounded-xs">
                    {selectedTrackingOrder.carrier || 'Нова Пошта (Global)'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                    Очікуване прибуття:
                  </span>
                  <span className="font-bold text-[#0D0D0D] dark:text-white">
                    {selectedTrackingOrder.estimatedDelivery || selectedTrackingOrder.date}
                  </span>
                </div>

                <div className="flex items-start gap-1.5 pt-1.5 border-t border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold block text-neutral-800 dark:text-neutral-200 uppercase">
                      Пункт видачі:
                    </span>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {selectedTrackingOrder.deliveryAddress || 'м. Львів, Відділення №24 (вул. Стрийська, 45)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Milestones Stepper */}
              {selectedTrackingOrder.trackingSteps && selectedTrackingOrder.trackingSteps.length > 0 && (
                <div className="space-y-2.5 p-3 bg-white dark:bg-[#15191C] rounded-xs border border-neutral-200 dark:border-neutral-700">
                  <span className="text-[10px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase tracking-wider block">
                    Повна історія руху посилки:
                  </span>

                  <div className="space-y-3 pl-2">
                    {selectedTrackingOrder.trackingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 relative">
                        {idx < selectedTrackingOrder.trackingSteps!.length - 1 && (
                          <div className={`absolute left-2.5 top-4 bottom-0 w-[2px] -mb-3 ${
                            step.completed ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'
                          }`} />
                        )}
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 text-[10px] font-bold ${
                          step.completed
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 border border-neutral-300 dark:border-neutral-600'
                        }`}>
                          {step.completed ? '✓' : idx + 1}
                        </div>
                        <div className="min-w-0 flex-1 text-[11px]">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className={`font-semibold ${step.completed ? 'text-[#0D0D0D] dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                              {step.title}
                            </span>
                            <span className="text-[10px] text-neutral-400 shrink-0 font-mono">
                              {step.date}
                            </span>
                          </div>
                          {step.location && (
                            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block font-sarala">
                              Місцезнаходження: {step.location}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cancellation Box if Cancelled */}
              {selectedTrackingOrder.status === 'Cancelled' && selectedTrackingOrder.cancelReason && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xs border border-rose-300 dark:border-rose-800 text-[11px] space-y-1">
                  <span className="font-bold text-rose-800 dark:text-rose-200 block text-[10px] uppercase">
                    Причина анулювання доставки:
                  </span>
                  <p className="text-rose-900 dark:text-rose-100 font-sarala">
                    {selectedTrackingOrder.cancelReason}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-neutral-100 dark:bg-[#15191C] border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-2">
              <span className="text-[10px] text-neutral-500 font-sarala">
                Служба підтримки: 0 800 500 609 (Безкоштовно)
              </span>
              <button
                type="button"
                onClick={() => setSelectedTrackingOrder(null)}
                className="px-4 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs text-xs font-bold cursor-pointer"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
