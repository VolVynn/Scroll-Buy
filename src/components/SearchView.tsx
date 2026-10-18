import React, { useState } from 'react';
import { Product, AppLanguage, AppTheme } from '../types';
import { getTranslation } from '../data/translations';
import { ProductArtwork } from './ProductArtwork';
import { 
  Search as SearchIcon, 
  X, 
  SlidersHorizontal, 
  Star, 
  Sparkles,
  Film,
  FileText,
  Calendar as CalendarIcon,
  ShoppingBag,
  CheckCircle2,
  Filter,
  Check
} from 'lucide-react';

interface SearchViewProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onOpenSellerProfile?: (handle: string) => void;
  appLanguage?: AppLanguage;
  appTheme?: AppTheme;
}

export const SearchView: React.FC<SearchViewProps> = ({
  products,
  onOpenProduct,
  onOpenSellerProfile,
  appLanguage = 'uk',
  appTheme = 'light',
}) => {
  const t = getTranslation(appLanguage);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Filter States
  const [filterPubType, setFilterPubType] = useState<'all' | 'video' | 'text'>('all');
  const [filterType, setFilterType] = useState<'all' | 'product' | 'service'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'inStock' | 'used' | 'new' | 'custom'>('all');

  const categories = [
    { id: 'all', label: 'Усі рубрики' },
    { id: 'Кераміка та посуд', label: 'Кераміка та посуд' },
    { id: 'Вінтаж та постери', label: 'Вінтаж та постери' },
    { id: 'Шкіра та аксесуари', label: 'Шкіра та аксесуари' },
    { id: 'Прикраси ручної роботи', label: 'Прикраси ручної роботи' },
    { id: 'Кондитерські послуги', label: 'Кондитерські послуги' },
    { id: 'Б\'юті-послуги', label: 'Б\'юті-послуги' },
    { id: 'Одяг та стрітвір', label: 'Одяг та стрітвір' },
  ];

  const resetAllFilters = () => {
    setFilterPubType('all');
    setFilterType('all');
    setFilterCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setFilterAvailability('all');
    setSearchQuery('');
  };

  const activeFiltersCount = 
    (filterPubType !== 'all' ? 1 : 0) +
    (filterType !== 'all' ? 1 : 0) +
    (filterCategory !== 'all' ? 1 : 0) +
    (minPrice !== '' || maxPrice !== '' ? 1 : 0) +
    (filterAvailability !== 'all' ? 1 : 0);

  const filteredProducts = products.filter((p) => {
    // 1. Search Query
    const matchesQuery =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Publication Type: Video vs Text
    const matchesPubType =
      filterPubType === 'all' ||
      (filterPubType === 'video' && p.publicationFormat !== 'text') ||
      (filterPubType === 'text' && p.publicationFormat === 'text');

    // 3. Service (calendar booking) vs Goods
    const matchesType =
      filterType === 'all' || p.type === filterType;

    // 4. Rubric / Category
    const matchesCategory =
      filterCategory === 'all' || p.category.includes(filterCategory);

    // 5. Price range
    const numPrice = p.price;
    const matchesMin = minPrice === '' || numPrice >= Number(minPrice);
    const matchesMax = maxPrice === '' || numPrice <= Number(maxPrice);

    // 6. Availability / Condition
    let matchesAvail = true;
    if (filterAvailability === 'inStock') {
      matchesAvail = Boolean(p.inStock);
    } else if (filterAvailability === 'used') {
      matchesAvail = p.condition === 'used';
    } else if (filterAvailability === 'new') {
      matchesAvail = p.condition !== 'used';
    }

    return matchesQuery && matchesPubType && matchesType && matchesCategory && matchesMin && matchesMax && matchesAvail;
  });

  return (
    <div className={`absolute inset-0 z-20 flex flex-col overflow-y-auto no-scrollbar pb-16 transition-colors ${
      appTheme === 'dark' ? 'bg-[#121618] text-neutral-100' : 'bg-[#F2F2F2] text-[#0D0D0D]'
    }`}>
      {/* Sticky Search & Discovery Header with Dark Mode */}
      <div className={`sticky top-0 z-20 p-3.5 border-b shadow-2xs space-y-2.5 transition-colors ${
        appTheme === 'dark' ? 'bg-[#181F22] border-neutral-700' : 'bg-white border-[#A6A6A6]/30'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-widest text-[#4F6C73] dark:text-[#A7E4F2] font-bold">
              ПОШУК ТА РОЗШИРЕНИЙ КАТАЛОГ
            </span>
            <h2 className="text-lg font-bold tracking-tight text-[#0D0D0D] dark:text-white font-heading">
              Пошук товарів і послуг
            </h2>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-[#4F6C73] dark:text-[#A7E4F2] hover:underline cursor-pointer"
            >
              Скинути ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Search Bar + Filters Action Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <SearchIcon className="absolute left-3 w-4 h-4 text-[#A6A6A6] dark:text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Шукати кераміку, постер, манікюр, шкіру..."
              className="w-full h-10 pl-9 pr-8 text-xs bg-neutral-100 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs focus:outline-hidden focus:border-[#4F6C73] font-body"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-[#A6A6A6] hover:text-black dark:hover:text-white cursor-pointer"
                aria-label="Очистити"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Prominent Filters Button */}
          <button
            onClick={() => setShowFiltersModal(true)}
            className={`h-10 px-3 rounded-xs font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 border ${
              activeFiltersCount > 0
                ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                : 'bg-white dark:bg-[#1A2024] text-[#0D0D0D] dark:text-white border-[#4F6C73]/40 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Фільтри</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#A7E4F2] text-[#0D0D0D] text-[10px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filter Chips Preview */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {filterPubType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#A7E4F2]/30 dark:bg-[#4F6C73]/40 text-[#4F6C73] dark:text-[#A7E4F2] border border-[#4F6C73]/30 dark:border-neutral-600 rounded-xs text-[10px] font-bold">
                {filterPubType === 'video' ? '🎬 Відео' : '📝 Оголошення'}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setFilterPubType('all')} />
              </span>
            )}
            {filterType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#A7E4F2]/30 dark:bg-[#4F6C73]/40 text-[#4F6C73] dark:text-[#A7E4F2] border border-[#4F6C73]/30 dark:border-neutral-600 rounded-xs text-[10px] font-bold">
                {filterType === 'product' ? '🛍️ Товари' : '📅 Послуги з бронью'}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setFilterType('all')} />
              </span>
            )}
            {filterCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#A7E4F2]/30 dark:bg-[#4F6C73]/40 text-[#4F6C73] dark:text-[#A7E4F2] border border-[#4F6C73]/30 dark:border-neutral-600 rounded-xs text-[10px] font-bold">
                {filterCategory}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setFilterCategory('all')} />
              </span>
            )}
            {filterAvailability !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#A7E4F2]/30 dark:bg-[#4F6C73]/40 text-[#4F6C73] dark:text-[#A7E4F2] border border-[#4F6C73]/30 dark:border-neutral-600 rounded-xs text-[10px] font-bold">
                {filterAvailability === 'inStock' && '✓ В наявності'}
                {filterAvailability === 'used' && 'Вінтаж / Б/В'}
                {filterAvailability === 'new' && 'Нове'}
                {filterAvailability === 'custom' && 'Під замовлення'}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setFilterAvailability('all')} />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="p-3.5 space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
          <span>Знайдено позицій: <strong className="text-[#0D0D0D] dark:text-white">{filteredProducts.length}</strong></span>
          <span className="text-[11px] text-[#4F6C73] dark:text-[#A7E4F2] font-medium">Львів &amp; вся Україна</span>
        </div>

        {/* Results Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center space-y-3 bg-white dark:bg-[#1A2024] rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs">
            <div className="w-12 h-12 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#4F6C73] dark:text-[#A7E4F2]">
              <SearchIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#0D0D0D] dark:text-white font-heading">
                За вибраними фільтрами нічого не знайдено
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                Спробуйте очистити фільтри або ввести інше ключове слово.
              </p>
            </div>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-[#4F6C73] text-white rounded-xs text-xs font-bold hover:bg-[#3d555b] transition-colors cursor-pointer"
            >
              Скинути всі фільтри
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProduct(p)}
                className="bg-white dark:bg-[#1A2024] rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Visual Artwork Thumbnail */}
                  <div className="relative aspect-4/3 bg-neutral-100 dark:bg-neutral-900 overflow-hidden border-b border-[#A6A6A6]/20 dark:border-neutral-700">
                    <ProductArtwork
                      type={p.id === 'prod-beatles' ? 'beatles' : p.id.replace('prod-', '')}
                      aspectRatio="video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Format Tag */}
                    <div className="absolute top-1.5 left-1.5 z-10 flex gap-1">
                      {p.publicationFormat === 'text' ? (
                        <span className="text-[8px] font-bold bg-[#0D0D0D]/80 text-white px-1.5 py-0.5 rounded-xs flex items-center gap-0.5">
                          <FileText className="w-2.5 h-2.5" /> Оголошення
                        </span>
                      ) : (
                        <span className="text-[8px] font-bold bg-[#4F6C73]/90 text-white px-1.5 py-0.5 rounded-xs flex items-center gap-0.5">
                          <Film className="w-2.5 h-2.5 text-[#A7E4F2]" /> Відео
                        </span>
                      )}

                      {p.type === 'service' && (
                        <span className="text-[8px] font-bold bg-[#FEDF82] text-[#0D0D0D] px-1.5 py-0.5 rounded-xs">
                          📅 Послуга
                        </span>
                      )}

                      {p.condition === 'used' && (
                        <span className="text-[8px] font-bold bg-amber-100 text-amber-900 px-1 py-0.2 rounded-xs">
                          Б/В (Вінтаж)
                        </span>
                      )}
                    </div>

                    {/* Stock status */}
                    <div className="absolute bottom-1.5 right-1.5 z-10">
                      <span className="text-[8px] font-bold bg-black/70 text-[#7FE176] px-1.5 py-0.5 rounded-xs">
                        {p.inStock ? 'В наявності ✓' : 'Під замовлення'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-2.5 space-y-1">
                    {/* Author block - Clickable to open profile */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSellerProfile && onOpenSellerProfile(p.authorHandle);
                      }}
                      className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-[#4F6C73] dark:hover:text-[#A7E4F2] transition-colors"
                      title="Відкрити профіль продавця"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#4F6C73] text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                        {p.authorAvatar}
                      </div>
                      <span className="text-[10px] font-medium truncate">{p.author}</span>
                    </div>

                    <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white line-clamp-1 font-heading group-hover:text-[#4F6C73] dark:group-hover:text-[#A7E4F2] transition-colors">
                      {p.title}
                    </h4>

                    <div className="flex items-center gap-1 text-[10px] text-[#A6A6A6]">
                      <Star className="w-3 h-3 fill-[#FEDF82] text-[#FEDF82]" />
                      <span className="font-bold text-[#0D0D0D] dark:text-neutral-200">{p.rating}</span>
                      <span>({p.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="p-2.5 pt-0 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between">
                  <span className="text-xs font-black text-[#0D0D0D] dark:text-white tabular-nums font-heading">
                    {p.price.toFixed(p.currency === '€' ? 2 : 0)} {p.currency}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProduct(p);
                    }}
                    className="px-2.5 py-1 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] text-[10px] font-bold uppercase rounded-xs transition-transform active:scale-95"
                  >
                    {p.type === 'service' ? 'Запис' : 'Купити'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===================== FILTERS MODAL WITH DARK THEME ===================== */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#1A2024] w-full max-w-md rounded-t-xl sm:rounded-sm max-h-[85vh] flex flex-col border border-[#4F6C73] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-[#4F6C73] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#A7E4F2]" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-heading">
                  Фільтри пошуку товарів та послуг
                </h3>
              </div>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="p-1 text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Controls Scrollable Content */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs font-body no-scrollbar dark:text-neutral-200">
              {/* 1. Тип оголошення: Відео vs Оголошення */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0D0D0D] dark:text-white block font-heading">
                  Тип публікації:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'Усі' },
                    { id: 'video', label: '🎬 Відео' },
                    { id: 'text', label: '📝 Оголошення' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilterPubType(item.id as any)}
                      className={`py-2 text-[11px] font-bold rounded-xs border text-center transition-all cursor-pointer ${
                        filterPubType === item.id
                          ? 'bg-[#4F6C73] text-white border-[#4F6C73]'
                          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Формат: Товари чи Послуги (з календарем) */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                <label className="text-xs font-bold text-[#0D0D0D] dark:text-white block font-heading">
                  Що шукаємо:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'Усі' },
                    { id: 'product', label: '🛍️ Товари' },
                    { id: 'service', label: '📅 Послуги (з бронью)' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilterType(item.id as any)}
                      className={`py-2 text-[11px] font-bold rounded-xs border text-center transition-all cursor-pointer ${
                        filterType === item.id
                          ? 'bg-[#4F6C73] text-white border-[#4F6C73]'
                          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Рубрика товарів */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                <label className="text-xs font-bold text-[#0D0D0D] dark:text-white block font-heading">
                  Рубрика товару або послуги:
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-xs text-xs font-medium focus:outline-hidden focus:border-[#4F6C73]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="dark:bg-[#1A2024] dark:text-white">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Діапазон цін */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                <label className="text-xs font-bold text-[#0D0D0D] dark:text-white block font-heading">
                  Діапазон цін:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mb-0.5">Від (грн/€):</span>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-xs text-xs focus:outline-hidden focus:border-[#4F6C73]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mb-0.5">До (грн/€):</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="3000"
                      className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-xs text-xs focus:outline-hidden focus:border-[#4F6C73]"
                    />
                  </div>
                </div>

                {/* Quick Price presets */}
                <div className="flex gap-1.5 pt-1">
                  {[
                    { label: '< 500', min: '', max: '500' },
                    { label: '500 - 1500', min: '500', max: '1500' },
                    { label: '> 1500', min: '1500', max: '' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setMinPrice(preset.min);
                        setMaxPrice(preset.max);
                      }}
                      className="text-[10px] font-bold px-2 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xs text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Наявність та стан товару */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                <label className="text-xs font-bold text-[#0D0D0D] dark:text-white block font-heading">
                  Наявність та стан:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'Усі варіанти' },
                    { id: 'inStock', label: '✓ Тільки в наявності' },
                    { id: 'new', label: 'Нове' },
                    { id: 'used', label: 'Б/В (Вінтаж/Колекція)' },
                  ].map((avail) => (
                    <button
                      key={avail.id}
                      type="button"
                      onClick={() => setFilterAvailability(avail.id as any)}
                      className={`py-2 px-2 text-[10px] font-bold rounded-xs border text-center transition-all cursor-pointer ${
                        filterAvailability === avail.id
                          ? 'bg-[#A7E4F2] text-[#0D0D0D] border-[#4F6C73]'
                          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {avail.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/90 border-t border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFiltersModal(false)}
                className="flex-1 py-2.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-xs font-bold rounded-xs cursor-pointer shadow-xs uppercase tracking-wider flex items-center justify-center gap-1.5 font-heading"
              >
                <span>Застосувати</span>
                <span className="bg-[#A7E4F2] text-[#0D0D0D] px-2 py-0.5 rounded-full text-[10px] font-black font-mono">
                  {filteredProducts.length} знайдено
                </span>
              </button>

              <button
                type="button"
                onClick={resetAllFilters}
                className="px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 text-xs font-bold rounded-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
              >
                Скинути
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
