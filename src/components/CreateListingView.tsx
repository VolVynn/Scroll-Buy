import React, { useState, useEffect } from 'react';
import { PublicationType, SellerPublication } from '../types';
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  WifiOff, 
  RefreshCw, 
  Sparkles, 
  Film, 
  FileText, 
  Music,
  Video,
  X
} from 'lucide-react';

interface CreateListingViewProps {
  onBack: () => void;
  onPublicationCreated: (publication: SellerPublication) => void;
}

export const CreateListingView: React.FC<CreateListingViewProps> = ({
  onBack,
  onPublicationCreated,
}) => {
  // Publication Mode Selection: Video Reel vs Text Listing
  const [pubType, setPubType] = useState<PublicationType>('video');

  // Shared Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isCategoryConfirmed, setIsCategoryConfirmed] = useState(false);
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('грн');
  const [description, setDescription] = useState('');

  // Video Specific State
  const [soundTitle, setSoundTitle] = useState('Оригінальний звук автора · Майстерня');
  const [videoPreviewStyle, setVideoPreviewStyle] = useState<'ceramic' | 'beatles' | 'jewelry' | 'cake' | 'manicure' | 'hoodie'>('ceramic');

  // Text Listing Specific State
  const [contactName, setContactName] = useState('Анна Корнійчук');
  const [phone, setPhone] = useState('+380 67 123 45 67');
  const [photos, setPhotos] = useState<string[]>([
    'фото_1_лицьова_сторона',
    'фото_2_деталі',
    'фото_3_зворот',
  ]);

  // Errors & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);
  const [offlineUploadFailed, setOfflineUploadFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdItem, setCreatedItem] = useState<SellerPublication | null>(null);

  // Auto-category suggestion
  useEffect(() => {
    const lower = title.toLowerCase();
    if (lower.includes('cd') || lower.includes('диск') || lower.includes('lennon') || lower.includes('платівк') || lower.includes('постер')) {
      setCategory('Вінтаж, постери та музика');
      setVideoPreviewStyle('beatles');
    } else if (lower.includes('чашк') || lower.includes('керамік') || lower.includes('глин') || lower.includes('посуд')) {
      setCategory('Кераміка та посуд ручної роботи');
      setVideoPreviewStyle('ceramic');
    } else if (lower.includes('торт') || lower.includes('бенто') || lower.includes('кондитер')) {
      setCategory('Кондитерські послуги · Випічка');
      setVideoPreviewStyle('cake');
    } else if (lower.includes('манікюр') || lower.includes('нігт') || lower.includes('б\'юті')) {
      setCategory('Б\'юті-послуги майстрів');
      setVideoPreviewStyle('manicure');
    } else if (lower.includes('перстен') || lower.includes('срібл') || lower.includes('прикрас')) {
      setCategory('Прикраси ручної роботи');
      setVideoPreviewStyle('jewelry');
    } else if (lower.includes('худі') || lower.includes('одяг') || lower.includes('стрітвір')) {
      setCategory('Одяг та авторський стрітвір');
      setVideoPreviewStyle('hoodie');
    } else if (title.trim().length > 3) {
      setCategory('Крафтові вироби та локальні послуги');
    }
  }, [title]);

  const handlePresetSelect = (presetTitle: string, type: PublicationType) => {
    setPubType(type);
    setTitle(presetTitle);
    setIsCategoryConfirmed(false);
    setErrors({});
  };

  const handleSimulateUpload = () => {
    if (isSimulatingOffline) {
      setOfflineUploadFailed(true);
    } else {
      setOfflineUploadFailed(false);
      setPhotos((prev) => [...prev, `фото_${prev.length + 1}`]);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Обов\'язково вкажіть назву публікації';
    }
    if (pubType === 'text') {
      if (!isCategoryConfirmed && category) {
        newErrors.categoryConfirmed = 'Будь ласка, підтвердіть правильність категорії';
      }
      if (!description.trim()) {
        newErrors.description = 'Додайте короткий опис стану та матеріалів';
      }
    }
    if (!price || Number(price) <= 0) {
      newErrors.price = 'Вкажіть коректну вартість';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newPub: SellerPublication = {
        id: `pub-${Date.now()}`,
        type: pubType,
        title: title.trim(),
        category: category || 'Крафтові вироби',
        price: Number(price),
        currency,
        description: description.trim() || 'Нова публікація у профілі автора.',
        views: 1,
        likes: 0,
        createdAt: 'Щойно',
        soundTitle: pubType === 'video' ? soundTitle : undefined,
        imageType: videoPreviewStyle,
        status: 'active',
      };
      setCreatedItem(newPub);
      setIsSuccess(true);
      onPublicationCreated(newPub);
    }, 600);
  };

  if (isSuccess && createdItem) {
    return (
      <div className="absolute inset-0 z-40 flex flex-col bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 p-5 justify-center items-center text-center space-y-4 animate-fadeIn transition-colors">
        <div className="w-16 h-16 rounded-full bg-[#7FE176]/20 border-2 border-[#7FE176] flex items-center justify-center text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1 max-w-xs">
          <h2 className="text-xl font-bold text-[#0D0D0D] dark:text-white font-heading">
            {createdItem.type === 'video' ? 'Відео опубліковано!' : 'Оголошення опубліковано!'}
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sarala">
            Публікацію успішно розміщено у вашому профілі продавця та додано у відповідні розділи.
          </p>
        </div>

        <div className="w-full max-w-xs bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 text-left space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/30 dark:bg-[#4F6C73]/40 px-2 py-0.5 rounded-xs flex items-center gap-1">
              {createdItem.type === 'video' ? <Film className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
              {createdItem.type === 'video' ? 'Відео у стрічці' : 'Текстове оголошення'}
            </span>
            <span className="text-xs font-black text-[#0D0D0D] dark:text-white">
              {createdItem.price} {createdItem.currency}
            </span>
          </div>
          <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
            {createdItem.title}
          </h4>
          <p className="text-[11px] text-[#A6A6A6] dark:text-neutral-400">{createdItem.category}</p>
        </div>

        <div className="w-full max-w-xs pt-2 space-y-2">
          <button
            onClick={onBack}
            className="w-full h-11 bg-[#4F6C73] hover:bg-[#3d555b] text-white font-bold text-xs tracking-wider uppercase rounded-xs transition-transform active:scale-[0.98] cursor-pointer"
          >
            Перейти до профілю продавця
          </button>
          <button
            onClick={() => {
              setIsSuccess(false);
              setTitle('');
              setDescription('');
              setPrice('');
              setIsCategoryConfirmed(false);
            }}
            className="w-full py-2 text-xs font-semibold text-[#4F6C73] dark:text-[#A7E4F2] hover:underline cursor-pointer"
          >
            Опублікувати ще щось
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 overflow-y-auto no-scrollbar transition-colors">
      {/* Top Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-transform cursor-pointer"
          aria-label="Назад"
        >
          <ArrowLeft className="w-5 h-5 text-[#0D0D0D] dark:text-white" />
        </button>
        <h2 className="text-sm font-bold text-[#0D0D0D] dark:text-white font-heading">
          Створити публікацію
        </h2>
        <span className="w-5" />
      </div>

      {/* Selector: Video vs Text Listing */}
      <div className="p-3 bg-white dark:bg-[#181F22] border-b border-[#A6A6A6]/30 dark:border-neutral-700">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6A6A6] dark:text-neutral-400 block mb-2 font-heading">
          Оберіть формат публікації:
        </span>
        <div className="grid grid-cols-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xs border border-neutral-200 dark:border-neutral-700 text-xs font-bold font-heading">
          <button
            type="button"
            onClick={() => setPubType('video')}
            className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              pubType === 'video'
                ? 'bg-[#4F6C73] text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Відео</span>
          </button>
          <button
            type="button"
            onClick={() => setPubType('text')}
            className={`py-2 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              pubType === 'text'
                ? 'bg-[#4F6C73] text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Оголошення</span>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-4 pb-20">
        {/* Quick Presets for fast testing */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-[#A6A6A6] dark:text-neutral-400 uppercase tracking-wider">
            Швидкі ідеї для тестування:
          </span>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => handlePresetSelect('Процес гончарного випалу чашки з крижаною глазур’ю', 'video')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-white dark:bg-[#1A2024] border border-[#4F6C73]/30 text-[#4F6C73] dark:text-[#A7E4F2] rounded-xs hover:bg-[#A7E4F2]/20 active:scale-95 transition-all cursor-pointer font-medium"
            >
              🎥 Відео: Гончарство
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('Срібний перстень з натуральним моховим агатом 925 проби', 'text')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-white dark:bg-[#1A2024] border border-[#4F6C73]/30 text-[#4F6C73] dark:text-[#A7E4F2] rounded-xs hover:bg-[#A7E4F2]/20 active:scale-95 transition-all cursor-pointer font-medium"
            >
              📝 Оголошення: Срібло
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('Естетичний дизайн манікюру «glazed donut»', 'video')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-white dark:bg-[#1A2024] border border-[#4F6C73]/30 text-[#4F6C73] dark:text-[#A7E4F2] rounded-xs hover:bg-[#A7E4F2]/20 active:scale-95 transition-all cursor-pointer font-medium"
            >
              🎥 Відео: Манікюр
            </button>
          </div>
        </div>

        {/* Video Mode Specific Controls */}
        {pubType === 'video' ? (
          <div className="space-y-4">
            {/* Video File / Camera Simulation Container - Vertical Aspect */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                  Відеоряд публікації (вертикальний формат) *
                </label>
                <span className="text-[10px] bg-[#A7E4F2] text-[#0D0D0D] font-bold px-1.5 py-0.2 rounded-xs">
                  Вертикальне 9:16 HD
                </span>
              </div>

              <div className="relative w-full max-w-[210px] mx-auto aspect-[9/16] bg-neutral-900 rounded-sm overflow-hidden flex flex-col items-center justify-between p-3 text-white border-2 border-[#4F6C73] shadow-md">
                <div className="w-full flex items-center justify-between text-[10px] text-white/70">
                  <span className="flex items-center gap-1 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#AB3336] animate-pulse" />
                    REC
                  </span>
                  <span className="font-mono">1080×1920</span>
                </div>

                <div className="text-center my-auto space-y-1">
                  <Video className="w-10 h-10 text-[#A7E4F2] mx-auto" />
                  <span className="text-xs font-bold block">Вертикальне відео</span>
                  <span className="text-[10px] text-neutral-300 block">Готово для стрічки</span>
                </div>

                <div className="w-full space-y-1">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {(['ceramic', 'beatles', 'jewelry', 'cake', 'manicure', 'hoodie', 'leather'] as const).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setVideoPreviewStyle(style as any)}
                        className={`text-[8px] px-1.5 py-0.5 rounded-xs uppercase font-mono transition-colors cursor-pointer ${
                          videoPreviewStyle === style
                            ? 'bg-[#A7E4F2] text-[#0D0D0D] font-bold'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Title & Audio */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-white font-heading mb-1">
                  Заголовок та опис відео *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Наприклад: Нова партія глиняних чашок з випалу 🔥 #кераміка #львів"
                  className="w-full h-11 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs focus:outline-hidden focus:border-[#4F6C73] font-body"
                />
                {errors.title && (
                  <p className="text-[11px] text-[#AB3336] mt-1 font-medium">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-white font-heading mb-1 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                  <span>Аудіо-доріжка відео</span>
                </label>
                <input
                  type="text"
                  value={soundTitle}
                  onChange={(e) => setSoundTitle(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs font-mono"
                />
              </div>
            </div>

            {/* Attached Product / Service with Direct Buy Button */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F6C73] dark:text-[#A7E4F2] flex items-center gap-1 font-heading">
                <Sparkles className="w-3.5 h-3.5" />
                Прикріплена картка для миттєвої покупки з відео:
              </span>
              <div className="flex gap-2">
                <div className="flex-1">
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mb-1">Вартість для глядачів *</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="480"
                    className="w-full h-10 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs font-bold tabular-nums"
                  />
                </div>
                <div className="w-24">
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mb-1">Валюта</span>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-10 px-2 bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs text-xs font-bold text-[#0D0D0D]"
                  >
                    <option value="грн">грн</option>
                    <option value="€">€</option>
                    <option value="$">$</option>
                  </select>
                </div>
              </div>
              {errors.price && (
                <p className="text-[11px] text-[#AB3336] font-medium">{errors.price}</p>
              )}
            </div>
          </div>
        ) : (
          /* Text Listing Mode Controls */
          <div className="space-y-4">
            {/* Title & Auto-category */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2">
              <label className="block text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                Назва товару або послуги *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Наприклад: CD диск John Lennon - Imagine"
                className={`w-full h-11 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 dark:text-white border rounded-xs focus:outline-hidden font-body ${
                  errors.title ? 'border-[#AB3336] bg-red-50/30 dark:bg-red-950/20' : 'border-[#A6A6A6]/40 dark:border-neutral-700 focus:border-[#4F6C73]'
                }`}
              />
              {errors.title && (
                <p className="text-[11px] text-[#AB3336] flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.title}</span>
                </p>
              )}

              {/* Auto Category Box */}
              {category && (
                <div className="mt-2 p-2.5 bg-[#A7E4F2]/15 dark:bg-[#4F6C73]/30 border border-[#4F6C73]/30 dark:border-neutral-600 rounded-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                      Рубрика:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const custom = prompt('Введіть категорію вручну:', category);
                        if (custom) setCategory(custom);
                      }}
                      className="text-[11px] font-semibold text-[#4F6C73] dark:text-[#A7E4F2] hover:underline cursor-pointer"
                    >
                      Змінити
                    </button>
                  </div>
                  <p className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">{category}</p>

                  <label className="flex items-start gap-2 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCategoryConfirmed}
                      onChange={(e) => setIsCategoryConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#4F6C73] accent-[#4F6C73] rounded-xs cursor-pointer"
                    />
                    <span className="text-[11px] text-[#0D0D0D] dark:text-neutral-200 font-medium leading-tight">
                      Я підтверджую правильність обраної рубрики
                    </span>
                  </label>
                  {errors.categoryConfirmed && (
                    <p className="text-[11px] text-[#AB3336] font-medium">
                      {errors.categoryConfirmed}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Photos */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                  Фотографії товару ({photos.length})
                </label>
                <span className="text-[10px] text-[#A6A6A6] dark:text-neutral-400">Перше фото — обкладинка</span>
              </div>

              {offlineUploadFailed && (
                <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-[#AB3336] rounded-xs flex items-center justify-between text-xs text-[#AB3336]">
                  <div className="flex items-center gap-1.5">
                    <WifiOff className="w-4 h-4 shrink-0" />
                    <span>Втрата з'єднання. Фото не завантажено.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOfflineUploadFailed(false);
                      setPhotos((prev) => [...prev, `фото_${prev.length + 1}`]);
                    }}
                    className="flex items-center gap-1 px-2 py-1 bg-[#AB3336] text-white text-[10px] font-bold rounded-xs cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Повторити</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2 pt-1">
                {photos.map((item, index) => (
                  <div
                    key={item}
                    className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs flex flex-col items-center justify-center p-1 group"
                  >
                    {index === 0 && (
                      <span className="absolute top-1 left-1 z-10 text-[8px] font-bold bg-[#4F6C73] text-white px-1 py-0.5 rounded-xs tracking-wider">
                        ГОЛОВНЕ
                      </span>
                    )}
                    <FileText className="w-6 h-6 text-[#4F6C73]/60 dark:text-[#A7E4F2]/60" />
                    <span className="text-[9px] text-[#A6A6A6] dark:text-neutral-400 mt-1 font-mono">#{index + 1}</span>
                    {photos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setPhotos(photos.filter((p) => p !== item))}
                        className="absolute top-1 right-1 p-0.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleSimulateUpload}
                  className="aspect-square border-2 border-dashed border-[#4F6C73]/40 hover:border-[#4F6C73] rounded-xs flex flex-col items-center justify-center text-[#4F6C73] dark:text-[#A7E4F2] p-2 hover:bg-[#A7E4F2]/10 transition-colors cursor-pointer"
                >
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-[9px] font-bold">Додати</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2">
              <label className="block text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                Ціна *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="700"
                  className="flex-1 h-11 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs focus:outline-hidden font-body tabular-nums"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-24 h-11 px-2 bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs text-xs font-bold text-[#0D0D0D]"
                >
                  <option value="грн">грн</option>
                  <option value="€">€</option>
                  <option value="$">$</option>
                </select>
              </div>
              {errors.price && (
                <p className="text-[11px] text-[#AB3336] font-medium">{errors.price}</p>
              )}
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2">
              <label className="block text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                Опис та параметри товару *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Опишіть стан, розміри, особливості виготовлення або доставки..."
                className="w-full p-3 text-xs bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs focus:outline-hidden font-sarala"
              />
              {errors.description && (
                <p className="text-[11px] text-[#AB3336] font-medium">{errors.description}</p>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white dark:bg-[#1A2024] p-3.5 rounded-sm border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-2">
              <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading">
                Контактні дані продавця
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mb-1">Контактна особа</span>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs text-xs"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mb-1">Номер телефону</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 dark:text-white border border-[#A6A6A6]/40 dark:border-neutral-700 rounded-xs text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#4F6C73] hover:bg-[#3d555b] active:bg-[#30454a] text-white font-bold text-xs tracking-wider uppercase rounded-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>ОПУБЛІКУВАННЯ...</span>
              </>
            ) : (
              <span>{pubType === 'video' ? 'ОПУБЛІКУВАТИ ВІДЕО У СТРІЧКУ' : 'ОПУБЛІКУВАТИ ОГОЛОШЕННЯ'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
