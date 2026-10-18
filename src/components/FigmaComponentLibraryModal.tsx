import React, { useState } from 'react';
import { 
  STATES_SPEC_TABLE, 
  COMPREHENSIVE_COMPONENT_GROUPS, 
  FIGMA_TOKENS_JSON,
  DetailedComponentGroup 
} from '../data/figmaExportData';
import {
  UI_PATTERNS_SPEC,
  KEY_SCREENS_SPEC,
  generateComponentFigmaDocSvg,
  UIPatternSpec,
  KeyScreenSpec
} from '../data/figmaPatternsAndScreens';
import { 
  X, 
  Copy, 
  Download, 
  Layers, 
  Palette, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  Info,
  Check,
  Smartphone,
  Eye,
  Sliders,
  Maximize2,
  FileCode,
  Grid
} from 'lucide-react';

interface FigmaComponentLibraryModalProps {
  onClose: () => void;
}

export const FigmaComponentLibraryModal: React.FC<FigmaComponentLibraryModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'atoms' | 'molecules' | 'organisms' | 'patterns' | 'screens' | 'states-table' | 'dodont' | 'export'>('matrix');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [screenPreviewTheme, setScreenPreviewTheme] = useState<'light' | 'dark'>('light');
  const [selectedScreenStates, setSelectedScreenStates] = useState<Record<string, string>>({
    'screen-feed': 'ideal',
    'screen-feed-light': 'ideal',
    'screen-search': 'ideal',
    'screen-chat-trade': 'ideal',
    'screen-profile': 'ideal',
    'screen-detail': 'ideal',
  });

  const showToast = (message: string) => {
    setCopyToast(message);
    setTimeout(() => setCopyToast(null), 2500);
  };

  const copyToClipboard = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(`✓ ${label} скопійовано! Вставте через Ctrl+V у Figma`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFullFigmaSvg = () => {
    const fullSvg = `<svg width="1440" height="3200" viewBox="0 0 1440 3200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Artboard Background: 03 Компоненти -->
  <rect width="1440" height="3200" fill="#F8FAFC"/>
  
  <!-- Header Bar -->
  <rect width="1440" height="120" fill="#4F6C73"/>
  <text x="60" y="55" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="14" font-weight="700" letter-spacing="2">SCROLL &amp; BUY · ДИЗАЙН-СИСТЕМА</text>
  <text x="60" y="90" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="28" font-weight="900">03 КОМПОНЕНТИ — ПОВНА БІБЛІОТЕКА, ПАТЕРНИ ТА ЕКРАНИ</text>
  <text x="1000" y="75" fill="#A7E4F2" font-family="Overpass, sans-serif" font-size="13">Лабораторна робота №3 · UI Kit для Figma</text>

  <!-- ==================== СЕКЦІЯ 1: АТОМИ ==================== -->
  <text x="60" y="165" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="18" font-weight="900">1. РІВЕНЬ АТОМІВ (КНОПКИ, ПОЛЯ, ЧЕКБОКСИ, БЕЙДЖІ, ЗАКЛАДКА #A7E4F2)</text>

  <!-- Кнопка Primary (6 станів) -->
  <rect x="60" y="185" width="1320" height="130" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="80" y="212" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" letter-spacing="1">КНОПКА · PRIMARY · LARGE (6 СТАНІВ З РИС. 4 МЕТОДИЧКИ)</text>
  
  <!-- Default -->
  <text x="80" y="235" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">DEFAULT</text>
  <rect x="80" y="245" width="180" height="44" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="1.5"/>
  <text x="170" y="272" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>

  <!-- Hover -->
  <text x="290" y="235" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">HOVER</text>
  <rect x="290" y="245" width="180" height="44" rx="2" fill="#92D8E8" stroke="#3D555B" stroke-width="1.5"/>
  <text x="380" y="272" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>

  <!-- Pressed -->
  <text x="500" y="235" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">PRESSED</text>
  <rect x="502" y="247" width="176" height="40" rx="2" fill="#7DCFE2" stroke="#30454A" stroke-width="2"/>
  <text x="590" y="271" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>

  <!-- Focus -->
  <text x="710" y="235" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">FOCUS</text>
  <rect x="710" y="245" width="180" height="44" rx="2" fill="#A7E4F2" stroke="#4F6C73" stroke-width="2"/>
  <rect x="707" y="242" width="186" height="50" rx="4" fill="none" stroke="#FEDF82" stroke-width="2"/>
  <text x="800" y="272" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>

  <!-- Disabled -->
  <text x="920" y="235" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">DISABLED</text>
  <rect x="920" y="245" width="180" height="44" rx="2" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1"/>
  <text x="1010" y="272" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Забронювати</text>

  <!-- Loading -->
  <text x="1130" y="235" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">LOADING</text>
  <rect x="1130" y="245" width="180" height="44" rx="2" fill="#4F6C73"/>
  <circle cx="1165" cy="267" r="6" stroke="#A7E4F2" stroke-width="2" stroke-dasharray="25 8"/>
  <text x="1225" y="271" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Бронюємо...</text>

  <!-- Bookmark Active in Library (#A7E4F2) -->
  <rect x="60" y="335" width="1320" height="90" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="80" y="360" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" letter-spacing="1">ЗАКЛАДКА (BOOKMARK) · АКТИВНИЙ СТАН #A7E4F2</text>
  <circle cx="100" cy="390" r="16" fill="rgba(0,0,0,0.5)"/>
  <path d="M 95 384 L 105 384 L 105 397 L 100 394 L 95 397 Z" fill="#A7E4F2"/>
  <text x="130" y="394" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">Закладка активна: fill="#A7E4F2" (Токен primary-100 для збережених товарів)</text>

  <!-- Checkbox & Switch: Switch OFF, Switch ON, Switch Disabled -->
  <rect x="60" y="445" width="1320" height="120" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="80" y="472" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" letter-spacing="1">ЧЕКБОКС ТА ПЕРЕМИКАЧ (CHECKBOX &amp; SWITCH: OFF, ON, DISABLED З РИС. 4)</text>

  <!-- Switch OFF -->
  <text x="80" y="498" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">SWITCH OFF (ВИМКНЕНО)</text>
  <rect x="80" y="508" width="48" height="24" rx="12" fill="#D1D5DB" stroke="#9CA3AF" stroke-width="1"/>
  <circle cx="92" cy="520" r="9" fill="#FFFFFF"/>
  <text x="136" y="524" fill="#6B7280" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">ВИМК</text>

  <!-- Switch ON -->
  <text x="240" y="498" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">SWITCH ON (УВІМКНЕНО)</text>
  <rect x="240" y="508" width="48" height="24" rx="12" fill="#4F6C73" stroke="#3D555B" stroke-width="1"/>
  <circle cx="276" cy="520" r="9" fill="#A7E4F2"/>
  <text x="296" y="524" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">УВІМК</text>

  <!-- Switch Disabled -->
  <text x="400" y="498" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">SWITCH DISABLED</text>
  <rect x="400" y="508" width="48" height="24" rx="12" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1"/>
  <circle cx="412" cy="520" r="9" fill="#9CA3AF"/>
  <text x="456" y="524" fill="#9CA3AF" font-family="Open Sans, sans-serif" font-size="11" font-weight="600">БЛОК</text>

  <!-- Checkbox Unchecked -->
  <text x="560" y="498" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">CHECKBOX UNCHECKED</text>
  <rect x="560" y="510" width="20" height="20" rx="3" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
  <text x="588" y="524" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="11">Погоджуюсь</text>

  <!-- Checkbox Checked -->
  <text x="760" y="498" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600">CHECKBOX CHECKED</text>
  <rect x="760" y="510" width="20" height="20" rx="3" fill="#4F6C73" stroke="#4F6C73" stroke-width="1.5"/>
  <path d="M 765 520 L 769 524 L 775 515" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  <text x="788" y="524" fill="#0D0D0D" font-family="Overpass, sans-serif" font-size="11" font-weight="600">Погоджуюсь</text>

  <!-- ==================== СЕКЦІЯ 2: КАРТКА УГОДИ (3 СТАНИ) ==================== -->
  <text x="60" y="595" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="18" font-weight="900">2. ОФІЦІЙНА КАРТКА УГОДИ (TRADE CARD: ОЧІКУЄ, ПІДТВЕРДЖЕНО, СКАСОВАНО)</text>
  <rect x="60" y="615" width="1320" height="235" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>

  <!-- Trade 1: Pending -->
  <g transform="translate(80, 635) scale(0.95)">
    <rect width="380" height="200" rx="4" fill="#FFFFFF" stroke="#4F6C73" stroke-width="1.5"/>
    <rect width="380" height="30" fill="#4F6C73"/>
    <text x="12" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">КАРТКА УГОДИ #TR-8492</text>
    <rect x="250" y="6" width="115" height="18" rx="2" fill="#FEDF82"/>
    <text x="307" y="19" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Очікує дію</text>
    <text x="14" y="52" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">The Beatles Poster (14.99 €)</text>
    <text x="14" y="68" fill="#64748B" font-family="Overpass, sans-serif" font-size="10">Продавець: @retro_art · Покупець: Анна К.</text>
    <rect x="14" y="80" width="352" height="26" rx="2" fill="#F8FAFC" stroke="#E2E8F0"/>
    <text x="20" y="97" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="9">Кошти депонуються захищеним ескроу Scroll &amp; Buy</text>
    <rect x="14" y="116" width="352" height="34" rx="2" fill="#A7E4F2" stroke="#4F6C73"/>
    <text x="190" y="137" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">ПІДТВЕРДИТИ УГОДУ</text>
    <text x="190" y="170" fill="#AB3336" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Скасувати замовлення</text>
  </g>

  <!-- Trade 2: Confirmed -->
  <g transform="translate(490, 635) scale(0.95)">
    <rect width="380" height="200" rx="4" fill="#FFFFFF" stroke="#7FE176" stroke-width="2"/>
    <rect width="380" height="30" fill="#4F6C73"/>
    <text x="12" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">КАРТКА УГОДИ #TR-8492</text>
    <rect x="250" y="6" width="115" height="18" rx="2" fill="#7FE176"/>
    <text x="307" y="19" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Підтверджено ✓</text>
    <text x="14" y="52" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="12" font-weight="700">The Beatles Poster (14.99 €)</text>
    <rect x="14" y="68" width="352" height="66" rx="2" fill="#E8F9E6" stroke="#7FE176"/>
    <text x="190" y="92" fill="#166534" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Угоду зафіксовано в системі</text>
    <text x="190" y="112" fill="#4B5563" font-family="Overpass, sans-serif" font-size="9" text-anchor="middle">Код перевірки: С&amp;Б-8492-ЗАХИСТ</text>
    <text x="190" y="165" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="10" text-anchor="middle">Товар готується до відправки</text>
  </g>

  <!-- Trade 3: Cancelled -->
  <g transform="translate(900, 635) scale(0.95)">
    <rect width="380" height="200" rx="4" fill="#FFFFFF" stroke="#AB3336" stroke-width="2"/>
    <rect width="380" height="30" fill="#4F6C73"/>
    <text x="12" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">КАРТКА УГОДИ #TR-8492</text>
    <rect x="250" y="6" width="115" height="18" rx="2" fill="#AB3336"/>
    <text x="307" y="19" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Скасовано ✕</text>
    <text x="14" y="52" fill="#64748B" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-decoration="line-through">The Beatles Poster (14.99 €)</text>
    <rect x="14" y="68" width="352" height="66" rx="2" fill="#FEF2F2" stroke="#FECDD3"/>
    <text x="190" y="92" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">✕ Угоду скасовано стороною угоди</text>
    <text x="190" y="110" fill="#B91C1C" font-family="Overpass, sans-serif" font-size="9" text-anchor="middle">Депоновані кошти повернуто на картку покупця.</text>
    <text x="190" y="126" fill="#7F1D1D" font-family="monospace" font-size="9" font-weight="700" text-anchor="middle">REFUND-TR-8492-ESCROW</text>
    <text x="190" y="165" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" text-anchor="middle">Операцію анульовано</text>
  </g>

  <!-- ==================== СЕКЦІЯ 3: UI ПАТЕРНИ ==================== -->
  <text x="60" y="885" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="18" font-weight="900">3. UI-ПАТЕРНИ (ХОТБАР, СКЕЛЕТОНИ, EMPTY STATES, КАРТКА ТОВАРУ)</text>
  <g transform="translate(60, 910)">
    <rect width="1320" height="110" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
    <text x="20" y="32" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="12" font-weight="800">8 ОСНОВНИХ UI-ПАТЕРНІВ ДИЗАЙН-СИСТЕМИ</text>
    <text x="20" y="55" fill="#64748B" font-family="Open Sans, sans-serif" font-size="11">Хотбар стрічки · Скелетон стрічки · Скелетон трейд-картки · Скелетон чату · Скелетон профілю · Empty state вітрини · Empty state пошуку · Картка товару</text>
    <text x="20" y="78" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="10">Відповідають вимогам Лабораторної №3: консистентна сітка 8px, фірмові токени #4F6C73, #A7E4F2, радіуси rx=2..4px.</text>
  </g>

  <!-- ==================== СЕКЦІЯ 4: РЕАЛЬНА НИЖНЯ ПАНЕЛЬ НАВІГАЦІЇ ==================== -->
  <text x="60" y="1060" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="18" font-weight="900">4. РЕАЛЬНА НИЖНЯ ПАНЕЛЬ НАВІГАЦІЇ (NAVIGATION TAB BAR · 5 РОЗДІЛІВ)</text>
  <g transform="translate(60, 1085)">
    <rect width="1320" height="200" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
    
    <!-- Light Theme Real Nav Bar -->
    <text x="20" y="28" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">СВІТЛА ТЕМА (LIGHT THEME) · АКТИВНА «СТРІЧКА»</text>
    <g transform="translate(20, 38)">
      <rect width="600" height="56" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
      <line x1="0" y1="0" x2="600" y2="0" stroke="#E2E8F0" stroke-width="1.5"/>
      <!-- Tab 1: Home Active -->
      <g transform="translate(30, 8)">
        <path d="M 30 6 L 16 18 L 20 18 L 20 30 L 26 30 L 26 22 L 34 22 L 34 30 L 40 30 L 40 18 L 44 18 Z" fill="#4F6C73"/>
        <text x="30" y="42" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Стрічка</text>
      </g>
      <!-- Tab 2: Search Inactive -->
      <g transform="translate(145, 8)">
        <circle cx="30" cy="17" r="7" fill="none" stroke="#94A3B8" stroke-width="1.8"/>
        <line x1="35" y1="22" x2="41" y2="28" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
        <text x="30" y="42" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
      </g>
      <!-- Tab 3: Center Elevated Create Button (40x40 circle #4F6C73 with white +) -->
      <g transform="translate(270, 4)">
        <circle cx="30" cy="18" r="18" fill="#4F6C73" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="22" y1="18" x2="38" y2="18" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="30" y1="10" x2="30" y2="26" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
        <text x="30" y="46" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>
      </g>
      <!-- Tab 4: Chats Inactive with Red Badge -->
      <g transform="translate(395, 8)">
        <rect x="20" y="10" width="20" height="15" rx="3" fill="none" stroke="#94A3B8" stroke-width="1.8"/>
        <path d="M 25 25 L 22 29 L 29 25 Z" fill="#94A3B8"/>
        <circle cx="39" cy="9" r="5" fill="#AB3336"/>
        <text x="39" y="12.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="7" font-weight="900" text-anchor="middle">1</text>
        <text x="30" y="42" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Чати</text>
      </g>
      <!-- Tab 5: Profile (Кабінет) Inactive -->
      <g transform="translate(510, 8)">
        <circle cx="30" cy="15" r="5.5" fill="none" stroke="#94A3B8" stroke-width="1.8"/>
        <path d="M 20 29 C 20 24 24 23 30 23 C 36 23 40 24 40 29" fill="none" stroke="#94A3B8" stroke-width="1.8"/>
        <text x="30" y="42" fill="#94A3B8" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
      </g>
    </g>

    <!-- Dark Theme Real Nav Bar -->
    <text x="680" y="28" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">ТЕМНА ТЕМА (DARK THEME) · АКТИВНІ «ЧАТИ»</text>
    <g transform="translate(680, 38)">
      <rect width="600" height="56" rx="4" fill="#161B1E" stroke="#2C353D" stroke-width="1"/>
      <line x1="0" y1="0" x2="600" y2="0" stroke="#334155" stroke-width="1.5"/>
      <!-- Tab 1: Home Inactive -->
      <g transform="translate(30, 8)">
        <path d="M 30 6 L 16 18 L 20 18 L 20 30 L 26 30 L 26 22 L 34 22 L 34 30 L 40 30 L 40 18 L 44 18 Z" fill="#64748B"/>
        <text x="30" y="42" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Стрічка</text>
      </g>
      <!-- Tab 2: Search Inactive -->
      <g transform="translate(145, 8)">
        <circle cx="30" cy="17" r="7" fill="none" stroke="#64748B" stroke-width="1.8"/>
        <line x1="35" y1="22" x2="41" y2="28" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>
        <text x="30" y="42" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Пошук</text>
      </g>
      <!-- Tab 3: Center Elevated Create Button -->
      <g transform="translate(270, 4)">
        <circle cx="30" cy="18" r="18" fill="#4F6C73" stroke="#2C353D" stroke-width="2"/>
        <line x1="22" y1="18" x2="38" y2="18" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="30" y1="10" x2="30" y2="26" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
        <text x="30" y="46" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+ Додати</text>
      </g>
      <!-- Tab 4: Chats Active -->
      <g transform="translate(395, 8)">
        <rect x="20" y="10" width="20" height="15" rx="3" fill="none" stroke="#A7E4F2" stroke-width="2.2"/>
        <path d="M 25 25 L 22 29 L 29 25 Z" fill="#A7E4F2"/>
        <circle cx="39" cy="9" r="5" fill="#AB3336"/>
        <text x="39" y="12.5" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="7" font-weight="900" text-anchor="middle">2</text>
        <text x="30" y="42" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Чати</text>
      </g>
      <!-- Tab 5: Profile Inactive -->
      <g transform="translate(510, 8)">
        <circle cx="30" cy="15" r="5.5" fill="none" stroke="#64748B" stroke-width="1.8"/>
        <path d="M 20 29 C 20 24 24 23 30 23 C 36 23 40 24 40 29" fill="none" stroke="#64748B" stroke-width="1.8"/>
        <text x="30" y="42" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Кабінет</text>
      </g>
    </g>

    <!-- Notes -->
    <text x="20" y="180" fill="#64748B" font-family="Overpass, sans-serif" font-size="10">5 слотів навігації: Стрічка (#4F6C73 / #A7E4F2), Пошук, круглий піднятий тригер додавання + (40×40px, #4F6C73, білий плюс, підпис «+ Додати»), Чати (червоний бейдж #AB3336) та Кабінет.</text>
  </g>
</svg>`;

    const blob = new Blob([fullSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ScrollAndBuy_Complete_Figma_Library_Page03.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✓ Повний векторний файл ScrollAndBuy_Complete_Figma_Library_Page03.svg завантажено!');
  };

  /**
   * Renders component group card with full copy-to-Figma documentation support
   */
  const renderComponentGroupCard = (group: DetailedComponentGroup) => {
    return (
      <div key={group.id} className="p-4 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs space-y-3 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b dark:border-neutral-700 pb-2 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading uppercase">
                {group.title}
              </h4>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#A7E4F2]/30 dark:bg-[#4F6C73]/40 text-[#4F6C73] dark:text-[#A7E4F2] font-bold rounded-xs font-mono">
                {group.category.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala mt-0.5">
              {group.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto shrink-0">
            {/* Primary Action: Copy Full Component Card with Description and Do/Don't into Figma */}
            <button
              onClick={() => {
                const fullDocSvg = generateComponentFigmaDocSvg(group);
                copyToClipboard(fullDocSvg, `${group.id}-fulldoc`, `${group.title} (з описом та Do/Don't)`);
              }}
              className="px-2.5 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] rounded-xs font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-2xs"
              title="Скопіювати картку з описом, варіантами та Do/Don't для вставки у Figma як єдиний фрейм"
            >
              <Copy className="w-3 h-3 text-[#0D0D0D]" />
              <span>Скопіювати з описом та Do/Don't</span>
            </button>

            {/* Secondary Action: Copy Raw SVGs */}
            <button
              onClick={() => {
                const groupSvgs = `<svg width="${group.variants.length * 200}" height="260" viewBox="0 0 ${group.variants.length * 200} 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  ${group.variants.map((v, i) => `<g transform="translate(${i * 200}, 0)">
                    <text x="10" y="20" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">${v.name}</text>
                    <g transform="translate(0, 30)">${v.previewSvg}</g>
                  </g>`).join('')}
                </svg>`;
                copyToClipboard(groupSvgs, group.id, `${group.title} (SVG компонентів)`);
              }}
              className="px-2 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs font-semibold text-[10px] flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-2xs"
              title="Скопіювати чисті SVG компонентів"
            >
              <FileCode className="w-3 h-3 text-[#A7E4F2]" />
              <span>SVG вектор</span>
            </button>
          </div>
        </div>

        {/* Variants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-1">
          {group.variants.map((variant) => (
            <div 
              key={variant.name} 
              className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-2 flex flex-col justify-between hover:border-[#4F6C73]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-mono uppercase">
                    {variant.name}
                  </span>
                  <button
                    onClick={() => copyToClipboard(variant.previewSvg, variant.name, variant.label)}
                    className="text-[9px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] hover:text-[#0D0D0D] dark:hover:text-white flex items-center gap-0.5 cursor-pointer bg-white dark:bg-[#1A2024] px-1.5 py-0.5 rounded-xs border border-neutral-200 dark:border-neutral-700"
                    title="Скопіювати SVG цього варіанту для Figma"
                  >
                    <Copy className="w-2.5 h-2.5 text-[#4F6C73] dark:text-[#A7E4F2]" />
                    <span>SVG</span>
                  </button>
                </div>
                <p className="text-[10px] text-neutral-600 dark:text-neutral-400 font-sarala">{variant.description}</p>
              </div>

              <div className="p-2.5 bg-white dark:bg-[#121618] rounded-xs border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-x-auto min-h-[90px]">
                <div dangerouslySetInnerHTML={{ __html: variant.previewSvg }} />
              </div>
            </div>
          ))}
        </div>

        {/* Do / Don't micro guidelines formatted exactly as Figma cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-700 text-[11px]">
          <div className="flex items-start gap-1.5 text-emerald-800 dark:text-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/30 p-2.5 rounded-xs border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-900 dark:text-emerald-300 uppercase text-[10px]">DO (ПРАВИЛЬНО):</span>
              <p className="mt-0.5">{group.doRule}</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5 text-red-800 dark:text-red-200 bg-red-50/70 dark:bg-red-950/30 p-2.5 rounded-xs border border-red-200 dark:border-red-800">
            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-red-900 dark:text-red-300 uppercase text-[10px]">DON'T (ЗАБОРОНЕНО ТА ЧОМУ):</span>
              <p className="mt-0.5">{group.dontRule}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders UI Pattern Card
   */
  const renderPatternCard = (pattern: UIPatternSpec) => {
    return (
      <div key={pattern.id} className="p-4 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs space-y-3 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b dark:border-neutral-700 pb-2.5 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading uppercase">
                {pattern.title}
              </h4>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#FEDF82] text-[#0D0D0D] font-bold rounded-xs font-mono">
                UI-ПАТЕРН
              </span>
            </div>
            <p className="text-[11px] text-[#4F6C73] dark:text-[#A7E4F2] font-semibold mt-0.5">
              {pattern.purpose}
            </p>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala mt-0.5">
              {pattern.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => {
                // Generate Figma-ready documentation card for pattern
                const dummyGroup: DetailedComponentGroup = {
                  id: pattern.id,
                  title: pattern.title,
                  category: 'patterns',
                  description: `${pattern.purpose} · ${pattern.description}`,
                  doRule: pattern.doRule,
                  dontRule: pattern.dontRule,
                  variants: pattern.variants,
                };
                const patternSvg = generateComponentFigmaDocSvg(dummyGroup);
                copyToClipboard(patternSvg, pattern.id, `${pattern.title} (з Do/Don't для Figma)`);
              }}
              className="px-3 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] rounded-xs font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-2xs"
            >
              <Copy className="w-3 h-3 text-[#0D0D0D]" />
              <span>Скопіювати патерн для Figma</span>
            </button>
          </div>
        </div>

        {/* Specs Tokens Strip */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/60 p-2 rounded-xs border border-neutral-200 dark:border-neutral-700">
          <span className="font-bold text-[#4F6C73] dark:text-[#A7E4F2]">Специфікація:</span>
          <span>Відступи: {pattern.specs.padding}</span>
          <span>·</span>
          <span>Радіус: {pattern.specs.radius}</span>
          <span>·</span>
          <span>Токени: {pattern.specs.tokens.join(', ')}</span>
        </div>

        {/* Pattern Variants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {pattern.variants.map((v) => (
            <div key={v.name} className="p-3 bg-neutral-50 dark:bg-neutral-800/70 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-mono">
                  {v.name} · {v.label}
                </span>
                <button
                  onClick={() => copyToClipboard(v.previewSvg, v.name, v.label)}
                  className="text-[9px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] hover:text-[#0D0D0D] dark:hover:text-white flex items-center gap-0.5 cursor-pointer bg-white dark:bg-[#1A2024] px-1.5 py-0.5 rounded-xs border border-neutral-200 dark:border-neutral-700"
                >
                  <Copy className="w-2.5 h-2.5" />
                  <span>SVG</span>
                </button>
              </div>
              <p className="text-[10px] text-neutral-600 dark:text-neutral-400">{v.description}</p>
              <div className="p-2 bg-white dark:bg-[#121618] rounded-xs border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-x-auto min-h-[140px]">
                <div dangerouslySetInnerHTML={{ __html: v.previewSvg }} />
              </div>
            </div>
          ))}
        </div>

        {/* Do / Don't */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-700 text-[11px]">
          <div className="flex items-start gap-1.5 text-emerald-800 dark:text-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/30 p-2.5 rounded-xs border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-900 dark:text-emerald-300 uppercase text-[10px]">DO (ПРАВИЛЬНО):</span>
              <p className="mt-0.5">{pattern.doRule}</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5 text-red-800 dark:text-red-200 bg-red-50/70 dark:bg-red-950/30 p-2.5 rounded-xs border border-red-200 dark:border-red-800">
            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-red-900 dark:text-red-300 uppercase text-[10px]">DON'T (ЗАБОРОНЕНО ТА ЧОМУ):</span>
              <p className="mt-0.5">{pattern.dontRule}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders Key Assembled Screen Card with multi-state support (Lecture 6: Scott Hurff's 5 UI Stack)
   */
  const renderScreenCard = (screen: KeyScreenSpec) => {
    const states = screen.states && screen.states.length > 0 ? screen.states : [
      {
        id: 'ideal',
        name: 'Ідеальний стан (Ideal State)',
        label: 'Ideal State',
        lectureReference: 'Scott Hurff 5 UI Stack (Лекція 6)',
        description: screen.description,
        svg: screen.screenSvg
      }
    ];

    const activeStateId = selectedScreenStates[screen.id] || states[0].id;
    const currentVariant = states.find(s => s.id === activeStateId) || states[0];

    const getStateIcon = (id: string) => {
      switch (id) {
        case 'ideal': return '🌟';
        case 'loading': return '⏳';
        case 'empty': return '📭';
        case 'partial': return '📝';
        case 'error': return '⚠️';
        default: return '📱';
      }
    };

    const getStateBadgeColor = (id: string) => {
      switch (id) {
        case 'ideal': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700';
        case 'loading': return 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-700';
        case 'empty': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700';
        case 'partial': return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700';
        case 'error': return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700';
        default: return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300';
      }
    };

    return (
      <div key={screen.id} className="p-4 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 shadow-2xs space-y-4 transition-colors">
        {/* Screen Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b dark:border-neutral-700 pb-2.5 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading uppercase">
                {screen.title}
              </h4>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#4F6C73] text-white font-bold rounded-xs font-mono">
                390 × 844 PX
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#A7E4F2] text-[#0D0D0D] font-bold rounded-xs font-mono">
                5 СТАНІВ (ЛЕКЦІЯ 6)
              </span>
            </div>
            <p className="text-[11px] text-[#4F6C73] dark:text-[#A7E4F2] font-semibold mt-0.5">
              {screen.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => copyToClipboard(currentVariant.svg, `${screen.id}-${currentVariant.id}`, `${screen.title} — ${currentVariant.name} (SVG)`)}
              className="px-3 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs font-bold text-[10px] flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-2xs"
              title="Скопіювати SVG поточного обраного стану"
            >
              <Copy className="w-3 h-3 text-[#A7E4F2]" />
              <span>Скопіювати {currentVariant.label} (SVG)</span>
            </button>

            <button
              onClick={() => {
                const screenAllStatesSvg = `<svg width="${states.length * 410}" height="890" viewBox="0 0 ${states.length * 410} 890" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${states.length * 410}" height="890" fill="#F8FAFC"/>
  <text x="30" y="32" fill="#0D0D0D" font-family="Open Sans, sans-serif" font-size="16" font-weight="800">${screen.title}</text>
  <text x="30" y="52" fill="#4F6C73" font-family="Overpass, sans-serif" font-size="11">Scott Hurff's 5 UI Stack (Лекція 6): 5 станів поведінки інтерфейсу</text>
  ${states.map((st, sIdx) => `
    <g transform="translate(${sIdx * 410 + 10}, 65)">
      <rect x="0" y="0" width="390" height="28" rx="4" fill="#4F6C73"/>
      <text x="195" y="19" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${st.name}</text>
      <g transform="translate(0, 36)">${st.svg}</g>
    </g>
  `).join('')}
</svg>`;
                copyToClipboard(screenAllStatesSvg, `${screen.id}-all-5-states`, `${screen.title} — ВСІ 5 СТАНІВ для Figma`);
              }}
              className="px-3 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] rounded-xs font-bold text-[10px] flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-2xs"
              title="Скопіювати всі 5 станів цього екрана в ряд для Figma"
            >
              <Download className="w-3 h-3 text-[#0D0D0D]" />
              <span>Скопіювати всі 5 станів у ряд</span>
            </button>
          </div>
        </div>

        {/* State Selector Bar (Lecture 6: Scott Hurff's 5 UI Stack) */}
        <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800/90 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase tracking-wider">
              Перемикач станів інтерфейсу (Scott Hurff's 5 UI Stack):
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">
              Активний: {currentVariant.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {states.map((st) => {
              const isActive = st.id === activeStateId;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedScreenStates(prev => ({ ...prev, [screen.id]: st.id }))}
                  className={`px-2 py-1.5 rounded-xs text-[10px] font-bold font-heading flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#4F6C73] text-white border-[#4F6C73] shadow-xs'
                      : 'bg-white dark:bg-[#1A2024] text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#4F6C73]'
                  }`}
                >
                  <span>{getStateIcon(st.id)}</span>
                  <span className="truncate">{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Current State Explanation Card */}
          <div className="p-2 bg-white dark:bg-[#14181B] rounded-xs border border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className={`px-1.5 py-0.2 rounded-2xs font-bold text-[9px] border ${getStateBadgeColor(currentVariant.id)}`}>
                  {getStateIcon(currentVariant.id)} {currentVariant.name}
                </span>
                <span className="text-neutral-500 font-mono text-[9px]">
                  · {currentVariant.lectureReference}
                </span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 font-sarala">
                {currentVariant.description}
              </p>
            </div>
          </div>
        </div>

        {/* Screen Visual Mockup & Components Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Mobile Screen Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-3 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-2">
            <div className="w-[280px] sm:w-[320px] max-h-[580px] overflow-hidden rounded-[28px] border-4 border-[#3D4B4F] shadow-xl bg-white">
              <div dangerouslySetInnerHTML={{ __html: currentVariant.svg }} className="scale-[0.72] sm:scale-[0.82] origin-top-left -mr-20 -mb-32" />
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">
              Відображено: {currentVariant.name} (390 × 844 px)
            </span>
          </div>

          {/* Breakdown & Rules */}
          <div className="lg:col-span-7 space-y-3 text-xs">
            {/* Components Used Breakdown */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-2">
              <span className="font-bold text-[#4F6C73] dark:text-[#A7E4F2] uppercase text-[10px] tracking-wider block font-heading">
                Складові компоненти цього екрана:
              </span>
              <div className="space-y-1.5 font-sarala">
                <p>
                  <strong>Атоми:</strong> <span className="text-neutral-700 dark:text-neutral-300">{screen.componentsUsed.atoms.join(', ')}</span>
                </p>
                <p>
                  <strong>Молекули:</strong> <span className="text-neutral-700 dark:text-neutral-300">{screen.componentsUsed.molecules.join(', ')}</span>
                </p>
                <p>
                  <strong>Організми:</strong> <span className="text-neutral-700 dark:text-neutral-300">{screen.componentsUsed.organisms.join(', ')}</span>
                </p>
              </div>
            </div>

            {/* Do / Don't for Screen Layout */}
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-start gap-1.5 text-emerald-800 dark:text-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/30 p-2.5 rounded-xs border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-emerald-900 dark:text-emerald-300 uppercase text-[10px]">DO (ПРАВИЛЬНО):</span>
                  <p className="mt-0.5">{screen.doRule}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5 text-red-800 dark:text-red-200 bg-red-50/70 dark:bg-red-950/30 p-2.5 rounded-xs border border-red-200 dark:border-red-800">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-red-900 dark:text-red-300 uppercase text-[10px]">DON'T (ЗАБОРОНЕНО ТА ЧОМУ):</span>
                  <p className="mt-0.5">{screen.dontRule}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const atomsGroups = COMPREHENSIVE_COMPONENT_GROUPS.filter((g) => g.category === 'atoms');
  const moleculesGroups = COMPREHENSIVE_COMPONENT_GROUPS.filter((g) => g.category === 'molecules');
  const organismsGroups = COMPREHENSIVE_COMPONENT_GROUPS.filter((g) => g.category === 'organisms');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 w-full max-w-6xl rounded-sm border-2 border-[#4F6C73] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden transition-colors">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#4F6C73] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#A7E4F2]" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-tight font-heading uppercase">
                  Повна бібліотека компонентів, UI-патернів та екранів (Лабораторна робота №3)
                </h2>
                <span className="text-[10px] px-1.5 py-0.2 bg-[#A7E4F2] text-[#0D0D0D] font-bold rounded-xs font-mono">
                  v3.5 Figma Kit
                </span>
              </div>
              <p className="text-[11px] text-[#A7E4F2]">
                Атоми, Молекули, Організми, 8 UI-патернів, 5 зібраних екранів, повна документація Do / Don't та експорт у Figma
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Toast Alert */}
        {copyToast && (
          <div className="bg-[#0D0D0D] text-[#7FE176] px-4 py-2 text-xs font-bold text-center border-b border-[#7FE176] shadow-md animate-fadeIn flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-[#7FE176]" />
            <span>{copyToast}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-[#A6A6A6]/30 dark:border-neutral-700 bg-white dark:bg-[#181F22] px-4 overflow-x-auto no-scrollbar shadow-2xs">
          {[
            { id: 'matrix', label: 'Огляд і Рис. 4' },
            { id: 'atoms', label: '1. Атоми' },
            { id: 'molecules', label: '2. Молекули' },
            { id: 'organisms', label: '3. Організми' },
            { id: 'patterns', label: '4. UI-Патерни' },
            { id: 'screens', label: '5. Ключові екрани' },
            { id: 'states-table', label: 'Таблиця 3.3 (8 станів)' },
            { id: 'dodont', label: 'Правила Do / Don\'t' },
            { id: 'export', label: 'Експорт у Figma' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-3 text-xs font-bold font-heading whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#4F6C73] dark:border-[#A7E4F2] text-[#4F6C73] dark:text-[#A7E4F2] bg-[#A7E4F2]/10 dark:bg-[#4F6C73]/20'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 no-scrollbar text-xs">
          
          {/* TAB 1: Visual Matrix exactly matching Image 2 / Figure 4 */}
          {activeTab === 'matrix' && (
            <div className="space-y-5">
              {/* Context Banner */}
              <div className="p-3.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h3 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#4F6C73] dark:text-[#A7E4F2]" />
                    <span>Приклад: компоненти та їхні стани (Точна відповідність Рис. 4 з методички)</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala mt-0.5">
                    Кнопка, поле вводу, чекбокси та закладка як компоненти Figma з варіантами. Кожен стан містить документацію Do/Don't.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadFullFigmaSvg}
                    className="px-3.5 py-2 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] font-bold text-[11px] rounded-xs flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer border border-[#4F6C73]/40 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Завантажити повний артборд (.svg)</span>
                  </button>
                </div>
              </div>

              {/* Bookmark Accent #A7E4F2 Highlight Card */}
              <div className="p-4 bg-white dark:bg-[#1A2024] rounded-xs border-2 border-[#A7E4F2] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                      ЗАКЛАДКА (BOOKMARK) · АКЦЕНТНИЙ КОЛІР #A7E4F2 У ЗАСТОСУНКУ ТА БІБЛІОТЕЦІ
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#A7E4F2] text-[#0D0D0D] font-bold rounded-xs font-mono">
                      АКЦЕНТНИЙ СТАН
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const bookmarkSvg = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="24" r="20" fill="rgba(0,0,0,0.4)"/>
                        <path d="M 24 16 L 36 16 L 36 32 L 30 27 L 24 32 Z" fill="#A7E4F2" stroke="#A7E4F2" stroke-width="1.5"/>
                        <text x="30" y="52" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">382</text>
                      </svg>`;
                      copyToClipboard(bookmarkSvg, 'bookmark-accent', 'Bookmark Active #A7E4F2');
                    }}
                    className="px-2.5 py-1 bg-[#4F6C73] text-white text-[10px] font-bold rounded-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-[#A7E4F2]" />
                    <span>Скопіювати SVG закладки</span>
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  У заповненому стані закладка як у стрічці відео, так і в картці товару та бібліотеці компонентів використовує фірмовий токен <strong className="text-[#4F6C73] dark:text-[#A7E4F2]">#A7E4F2</strong> (Світлий акцентний бірюзово-блакитний), що забезпечує бездоганну видимість на темному та світлому фоні.
                </p>
              </div>

              {/* Switch OFF / ON Component Highlight Card */}
              <div className="p-4 bg-white dark:bg-[#1A2024] rounded-xs border-2 border-[#4F6C73] shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b dark:border-neutral-700 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                      ПЕРЕМИКАЧ (SWITCH) · СТАНИ SWITCH OFF ТА SWITCH ON
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#FEDF82] text-[#0D0D0D] font-bold rounded-xs font-mono">
                      РИС. 4 МЕТОДИЧКИ
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const switchOffSvg = `<svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="4" width="48" height="24" rx="12" fill="#D1D5DB" stroke="#9CA3AF" stroke-width="1"/>
  <circle cx="14" cy="16" r="9" fill="#FFFFFF"/>
  <text x="58" y="20" fill="#6B7280" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">ВИМК</text>
</svg>`;
                        copyToClipboard(switchOffSvg, 'switch-off', 'Switch OFF (Вимкнено)');
                      }}
                      className="px-2.5 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-[#0D0D0D] dark:text-white text-[10px] font-bold rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                      title="Скопіювати SVG перемикача у стані Switch OFF для Figma"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Скопіювати Switch OFF</span>
                    </button>

                    <button
                      onClick={() => {
                        const switchOnSvg = `<svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="4" width="48" height="24" rx="12" fill="#4F6C73" stroke="#3D555B" stroke-width="1"/>
  <circle cx="38" cy="16" r="9" fill="#A7E4F2"/>
  <text x="58" y="20" fill="#4F6C73" font-family="Open Sans, sans-serif" font-size="11" font-weight="700">УВІМК</text>
</svg>`;
                        copyToClipboard(switchOnSvg, 'switch-on', 'Switch ON (Увімкнено)');
                      }}
                      className="px-2.5 py-1 bg-[#4F6C73] hover:bg-[#3d555b] text-white text-[10px] font-bold rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                      title="Скопіювати SVG перемикача у стані Switch ON для Figma"
                    >
                      <Copy className="w-3 h-3 text-[#A7E4F2]" />
                      <span>Скопіювати Switch ON</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Visual preview OFF */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-1.5 text-center">
                    <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block">1. СТАН SWITCH OFF (ВИМКНЕНО)</span>
                    <div className="py-2 flex items-center justify-center">
                      <div className="w-12 h-6 rounded-full bg-neutral-300 dark:bg-neutral-600 border border-neutral-400 dark:border-neutral-500 p-0.5 flex items-center">
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </div>
                      <span className="ml-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 font-heading">ВИМК</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Нейтральний сірий трек #D1D5DB, повзунок ліворуч (Default/Inactive)</p>
                  </div>

                  {/* Visual preview ON */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-1.5 text-center">
                    <span className="text-[10px] font-bold font-mono text-[#4F6C73] dark:text-[#A7E4F2] uppercase block">2. СТАН SWITCH ON (УВІМКНЕНО)</span>
                    <div className="py-2 flex items-center justify-center">
                      <div className="w-12 h-6 rounded-full bg-[#4F6C73] p-0.5 flex items-center justify-end">
                        <div className="w-5 h-5 rounded-full bg-[#A7E4F2] shadow-xs" />
                      </div>
                      <span className="ml-2 text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading">УВІМК</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Фірмовий бірюзово-темний трек #4F6C73 + акцентний бірюзовий #A7E4F2 (Active)</p>
                  </div>

                  {/* Visual preview DISABLED */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-1.5 text-center">
                    <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase block">3. СТАН DISABLED (ЗАБЛОКОВАНО)</span>
                    <div className="py-2 flex items-center justify-center opacity-60">
                      <div className="w-12 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 p-0.5 flex items-center">
                        <div className="w-5 h-5 rounded-full bg-neutral-400 shadow-xs" />
                      </div>
                      <span className="ml-2 text-xs font-bold text-neutral-400 font-heading">БЛОК</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Заблокована опція: приглушений вигляд без можливості перемикання</p>
                  </div>
                </div>
              </div>

              {/* Trade Card 3 States Highlight Card (Pending, Confirmed, Cancelled) */}
              <div className="p-4 bg-white dark:bg-[#1A2024] rounded-xs border-2 border-[#AB3336] shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b dark:border-neutral-700 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#AB3336] dark:text-red-300 font-heading uppercase">
                      КАРТКА УГОДИ (TRADE CARD #TR-8492) · 3 СТАНИ: ОЧІКУЄ, ПІДТВЕРДЖЕНО, СКАСОВАНО
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-red-100 dark:bg-red-950/60 text-[#AB3336] dark:text-red-300 font-bold rounded-xs font-mono">
                      СТАН ПІСЛЯ СКАСУВАННЯ
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => {
                        const tradeCancelledSvg = `<svg width="340" height="190" viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="340" height="190" rx="4" fill="#FFFFFF" stroke="#AB3336" stroke-width="2"/>
  <rect width="340" height="30" fill="#4F6C73"/>
  <text x="12" y="20" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">КАРТКА УГОДИ #TR-8492</text>
  <rect x="220" y="6" width="110" height="18" rx="2" fill="#AB3336"/>
  <text x="275" y="19" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Скасовано ✕</text>
  <text x="14" y="52" fill="#64748B" font-family="Open Sans, sans-serif" font-size="12" font-weight="700" text-decoration="line-through">The Beatles Poster (14.99 €)</text>
  <text x="14" y="68" fill="#94A3B8" font-family="Overpass, sans-serif" font-size="10">Продавець: @retro_art · Покупець: Анна К.</text>
  <rect x="14" y="78" width="312" height="62" rx="2" fill="#FEF2F2" stroke="#FECDD3"/>
  <text x="22" y="96" fill="#991B1B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700">✕ Угоду скасовано стороною угоди</text>
  <text x="22" y="112" fill="#B91C1C" font-family="Overpass, sans-serif" font-size="9">Кошти депонованого ескроу розблоковано та повернено покупцю.</text>
  <text x="22" y="128" fill="#7F1D1D" font-family="monospace" font-size="9" font-weight="700">Код транзакції: REFUND-TR-8492-ESCROW</text>
  <rect x="14" y="148" width="190" height="30" rx="2" fill="#F1F5F9" stroke="#CBD5E1"/>
  <text x="109" y="167" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Повторити замовлення</text>
  <rect x="212" y="148" width="114" height="30" rx="2" fill="#FFFFFF" stroke="#D1D5DB"/>
  <text x="269" y="167" fill="#64748B" font-family="Open Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Підтримка</text>
</svg>`;
                        copyToClipboard(tradeCancelledSvg, 'trade-cancelled', 'Картка угоди (Скасовано ✕)');
                      }}
                      className="px-2.5 py-1.5 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-[10px] font-bold rounded-xs flex items-center gap-1 cursor-pointer transition-transform shadow-2xs"
                      title="Скопіювати векторний SVG картки угоди після скасування"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Скопіювати стан «Скасовано»</span>
                    </button>

                    <button
                      onClick={() => {
                        const tradeGroup = COMPREHENSIVE_COMPONENT_GROUPS.find((g) => g.id === 'trade-card-organism');
                        if (tradeGroup) {
                          const docSvg = generateComponentFigmaDocSvg(tradeGroup);
                          copyToClipboard(docSvg, 'trade-fulldoc', 'Картка угоди з усіма 3 станами та Do/Don\'t');
                        }
                      }}
                      className="px-2.5 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] active:scale-95 text-white text-[10px] font-bold rounded-xs flex items-center gap-1 cursor-pointer transition-transform shadow-2xs"
                      title="Скопіювати повний артборд картки угоди для Figma з описом і Do/Don't"
                    >
                      <Copy className="w-3 h-3 text-[#A7E4F2]" />
                      <span>Скопіювати з описом та Do/Don't</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* State 1: Pending */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xs border border-neutral-200 dark:border-neutral-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono text-neutral-600 dark:text-neutral-300 uppercase">
                        1. PENDING (ОЧІКУЄ)
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#FEDF82] text-[#0D0D0D] font-bold text-[9px] rounded-xs font-mono">
                        Очікує дію
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sarala">
                      Жовтий бейдж, депонування коштів у безпечному ескроу, активні кнопки «Підтвердити угоду» та «Скасувати».
                    </p>
                  </div>

                  {/* State 2: Confirmed */}
                  <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xs border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono text-emerald-700 dark:text-emerald-300 uppercase">
                        2. CONFIRMED (ПІДТВЕРДЖЕНО)
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#7FE176] text-[#0D0D0D] font-bold text-[9px] rounded-xs font-mono">
                        Підтверджено ✓
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-950 dark:text-emerald-200 font-sarala">
                      Зелений статус ✓, захисний код перевірки С&amp;Б-8492, сума зафіксована, товар готується до відправки.
                    </p>
                  </div>

                  {/* State 3: Cancelled (NEW) */}
                  <div className="p-3 bg-red-50/70 dark:bg-red-950/30 rounded-xs border border-red-200 dark:border-red-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono text-[#AB3336] dark:text-red-300 uppercase">
                        3. CANCELLED (СКАСОВАНО)
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#AB3336] text-white font-bold text-[9px] rounded-xs font-mono">
                        Скасовано ✕
                      </span>
                    </div>
                    <p className="text-[10px] text-red-950 dark:text-red-200 font-sarala">
                      Червона обводка та бейдж, перекреслена ціна, сповіщення про повернення коштів з ескроу, код REFUND-TR-8492.
                    </p>
                  </div>
                </div>
              </div>

              {/* Render Primary Button Group Card with full Do/Don't */}
              {atomsGroups.slice(0, 2).map(renderComponentGroupCard)}
            </div>
          )}

          {/* TAB 2: ATOMS */}
          {activeTab === 'atoms' && (
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700">
                <h3 className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                  1. Рівень атомів (Atoms)
                </h3>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala">
                  Базові неподільні елементи інтерфейсу: кнопки всіх типів, поля введення, чекбокси, статусні бейджі, плаваючі кнопки реакцій.
                </p>
              </div>
              {atomsGroups.map(renderComponentGroupCard)}
            </div>
          )}

          {/* TAB 3: MOLECULES */}
          {activeTab === 'molecules' && (
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700">
                <h3 className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                  2. Рівень молекул (Molecules)
                </h3>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala">
                  Комбінації атомів: рядок пошуку з лупою та очищенням, бульбашки повідомлень чату, слоти бронювання дати та часу, блоки завантаження медіа.
                </p>
              </div>
              {moleculesGroups.map(renderComponentGroupCard)}
            </div>
          )}

          {/* TAB 4: ORGANISMS */}
          {activeTab === 'organisms' && (
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700">
                <h3 className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                  3. Рівень організмів (Organisms)
                </h3>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala">
                  Складні функціональні модулі: офіційна картка-трейд угоди в чаті, нижній навігаційний бар NavigationTabBar, плаваюча картка товару у відеострічці.
                </p>
              </div>
              {organismsGroups.map(renderComponentGroupCard)}
            </div>
          )}

          {/* TAB 5: UI PATTERNS (NEW) */}
          {activeTab === 'patterns' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h3 className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    <span>4. Бібліотека UI-патернів (UI Patterns Specification)</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala mt-0.5">
                    8 задокументованих патернів взаємодії: хотбар, скелетони прелоадерів для стрічки, чату та профілю, empty states та композитна картка товару.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const allPatternsMarkdown = `### UI-Патерни Scroll & Buy Design System\n\n${UI_PATTERNS_SPEC.map(p => `#### ${p.title}\n- **Призначення:** ${p.purpose}\n- **Специфікація:** ${p.specs.tokens.join(', ')}\n- **✓ DO:** ${p.doRule}\n- **✕ DON'T:** ${p.dontRule}`).join('\n\n')}`;
                    copyToClipboard(allPatternsMarkdown, 'all-patterns-md', 'Всі UI-патерни (Markdown)');
                  }}
                  className="px-3 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Copy className="w-3 h-3 text-[#A7E4F2]" />
                  <span>Скопіювати опис усіх патернів (MD)</span>
                </button>
              </div>

              {UI_PATTERNS_SPEC.map(renderPatternCard)}
            </div>
          )}

          {/* TAB 6: KEY ASSEMBLED SCREENS WITH 5 UI STACK STATES (LECTURE 6) */}
          {activeTab === 'screens' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-3 shadow-2xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4" />
                        <span>5. Ключові екрани та їхні стани (Scott Hurff's 5 UI Stack · Лекція 6)</span>
                      </h3>
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#4F6C73] text-white font-bold rounded-xs font-mono">
                        {KEY_SCREENS_SPEC.length} ЕКРАНІВ × 5 СТАНІВ = {KEY_SCREENS_SPEC.length * 5} МАКЕТІВ
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala mt-0.5">
                      Кожен із {KEY_SCREENS_SPEC.length} ключових екранів (включно зі стрічкою відео у темній та світлій темах, 390 × 844 px) реалізує повний життєвий цикл станів за моделлю Скотта Герффа (Scott Hurff) згідно з лекцією 6: «Поведінка інтерфейсу: Стани системи, зворотний зв'язок, помилки та відновлення».
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        // Generate SVG grid with all 25 screens (5 screens in 5 rows of states)
                        const all25Svg = `<svg width="2150" height="${KEY_SCREENS_SPEC.length * 940 + 80}" viewBox="0 0 2150 ${KEY_SCREENS_SPEC.length * 940 + 80}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2150" height="${KEY_SCREENS_SPEC.length * 940 + 80}" fill="#0D1117"/>
  <text x="40" y="45" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="24" font-weight="900">SCROLL &amp; BUY · ${KEY_SCREENS_SPEC.length * 5} СТАНІВ КЛЮЧОВИХ ЕКРАНІВ (5 UI STACK · ЛЕКЦІЯ 6)</text>
  <text x="40" y="70" fill="#94A3B8" font-family="Overpass, sans-serif" font-size="13">Ключові екрани (Стрічка темна/світла, Пошук, Чат/Угода, Профіль, Деталі) × 5 станів: Ideal, Loading, Empty, Partial, Error</text>
  ${KEY_SCREENS_SPEC.map((s, screenIdx) => `
    <g transform="translate(30, ${screenIdx * 940 + 90})">
      <rect x="0" y="0" width="2090" height="910" rx="6" fill="#161B22" stroke="#30363D"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="16" font-weight="800">${s.title}</text>
      <text x="24" y="52" fill="#58A6FF" font-family="Overpass, sans-serif" font-size="11">${s.subtitle}</text>
      ${(s.states || []).map((st, stateIdx) => `
        <g transform="translate(${stateIdx * 410 + 20}, 65)">
          <rect x="0" y="0" width="390" height="28" rx="3" fill="#21262D" stroke="#30363D"/>
          <text x="195" y="19" fill="#E6EDF3" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${st.name}</text>
          <g transform="translate(0, 36)">${st.svg}</g>
        </g>
      `).join('')}
    </g>
  `).join('')}
</svg>`;
                        copyToClipboard(all25Svg, 'all-screens-svg', `Всі ${KEY_SCREENS_SPEC.length * 5} станів ключових екранів для Figma`);
                      }}
                      className="px-3 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs text-[10px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title={`Скопіювати всі ${KEY_SCREENS_SPEC.length * 5} макетів у буфер обміну для вставки у Figma`}
                    >
                      <Copy className="w-3 h-3 text-[#A7E4F2]" />
                      <span>Скопіювати ВСІ {KEY_SCREENS_SPEC.length * 5} станів для Figma</span>
                    </button>

                    <button
                      onClick={() => {
                        const all25Svg = `<svg width="2150" height="${KEY_SCREENS_SPEC.length * 940 + 80}" viewBox="0 0 2150 ${KEY_SCREENS_SPEC.length * 940 + 80}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2150" height="${KEY_SCREENS_SPEC.length * 940 + 80}" fill="#0D1117"/>
  <text x="40" y="45" fill="#A7E4F2" font-family="Open Sans, sans-serif" font-size="24" font-weight="900">SCROLL &amp; BUY · 25 СТАНІВ КЛЮЧОВИХ ЕКРАНІВ (5 UI STACK · ЛЕКЦІЯ 6)</text>
  <text x="40" y="70" fill="#94A3B8" font-family="Overpass, sans-serif" font-size="13">5 екранів: Стрічка, Пошук, Чат/Угода, Профіль, Деталі товару × 5 станів: Ideal, Loading, Empty, Partial, Error</text>
  ${KEY_SCREENS_SPEC.map((s, screenIdx) => `
    <g transform="translate(30, ${screenIdx * 940 + 90})">
      <rect x="0" y="0" width="2090" height="910" rx="6" fill="#161B22" stroke="#30363D"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="Open Sans, sans-serif" font-size="16" font-weight="800">${s.title}</text>
      <text x="24" y="52" fill="#58A6FF" font-family="Overpass, sans-serif" font-size="11">${s.subtitle}</text>
      ${(s.states || []).map((st, stateIdx) => `
        <g transform="translate(${stateIdx * 410 + 20}, 65)">
          <rect x="0" y="0" width="390" height="28" rx="3" fill="#21262D" stroke="#30363D"/>
          <text x="195" y="19" fill="#E6EDF3" font-family="Open Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${st.name}</text>
          <g transform="translate(0, 36)">${st.svg}</g>
        </g>
      `).join('')}
    </g>
  `).join('')}
</svg>`;
                        const blob = new Blob([all25Svg], { type: 'image/svg+xml' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'ScrollAndBuy_All_25_Screen_States_Lecture6.svg';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        showToast('✓ Завантажено повний файл ScrollAndBuy_All_25_Screen_States_Lecture6.svg!');
                      }}
                      className="px-3 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] rounded-xs text-[10px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Завантажити всі 25 макетів у форматі .svg"
                    >
                      <Download className="w-3 h-3" />
                      <span>Завантажити 25 станів (.svg)</span>
                    </button>
                  </div>
                </div>

                {/* 5 UI Stack Legend */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-700 text-[10px]">
                  <div className="p-2 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xs border border-emerald-200 dark:border-emerald-800">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 block">🌟 1. Ideal State</span>
                    <p className="text-emerald-800 dark:text-emerald-200 mt-0.5">Повні валідні дані, заповнений контент, активні індикатори.</p>
                  </div>
                  <div className="p-2 bg-sky-50/70 dark:bg-sky-950/30 rounded-xs border border-sky-200 dark:border-sky-800">
                    <span className="font-bold text-sky-900 dark:text-sky-300 block">⏳ 2. Loading State</span>
                    <p className="text-sky-800 dark:text-sky-200 mt-0.5">Скелетони (Shimmering) та індикатори очікування без блокування UI.</p>
                  </div>
                  <div className="p-2 bg-amber-50/70 dark:bg-amber-950/30 rounded-xs border border-amber-200 dark:border-amber-800">
                    <span className="font-bold text-amber-900 dark:text-amber-300 block">📭 3. Empty State</span>
                    <p className="text-amber-800 dark:text-amber-200 mt-0.5">Відсутність результатів або перший візит із чіткою цільовою дією (CTA).</p>
                  </div>
                  <div className="p-2 bg-purple-50/70 dark:bg-purple-950/30 rounded-xs border border-purple-200 dark:border-purple-800">
                    <span className="font-bold text-purple-900 dark:text-purple-300 block">📝 4. Partial State</span>
                    <p className="text-purple-800 dark:text-purple-200 mt-0.5">Частково заповнена інформація, чернетки, проміжні фільтри, вибір слота.</p>
                  </div>
                  <div className="p-2 bg-rose-50/70 dark:bg-rose-950/30 rounded-xs border border-rose-200 dark:border-rose-800">
                    <span className="font-bold text-rose-900 dark:text-rose-300 block">⚠️ 5. Error & Recovery</span>
                    <p className="text-rose-800 dark:text-rose-200 mt-0.5">Офлайн / збій мережі з можливістю повтору (Retry) або скасування дії (Undo).</p>
                  </div>
                </div>
              </div>

              {KEY_SCREENS_SPEC.map(renderScreenCard)}
            </div>
          )}

          {/* TAB 7: States Table 3.3 */}
          {activeTab === 'states-table' && (
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700">
                <h3 className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                  Таблиця 3.3. Обов'язкові стани компонентів (З методички Лабораторної №3)
                </h3>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala">
                  Відповідність вимогам: кожен інтерактивний елемент має 8 задокументованих станів поведінки.
                </p>
              </div>

              <div className="overflow-x-auto bg-white dark:bg-[#1A2024] rounded-xs border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#4F6C73] text-white text-[11px] font-bold">
                      <th className="p-3">Стан (State)</th>
                      <th className="p-3">Значення та тригер</th>
                      <th className="p-3">Приклад у системі Scroll &amp; Buy</th>
                      <th className="p-3">Кольоровий токен</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {STATES_SPEC_TABLE.map((item) => (
                      <tr key={item.state} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <td className="p-3 font-mono font-bold uppercase text-[#4F6C73] dark:text-[#A7E4F2]">
                          {item.state}
                        </td>
                        <td className="p-3 font-medium text-[#0D0D0D] dark:text-neutral-200">
                          {item.meaning}
                        </td>
                        <td className="p-3 text-neutral-600 dark:text-neutral-400 font-sarala">
                          {item.example}
                        </td>
                        <td className="p-3 font-mono font-bold">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.color}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: Do / Don't */}
          {activeTab === 'dodont' && (
            <div className="space-y-5">
              <div className="p-3.5 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h3 className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                    Зведена документація правил використання (Do / Don't) з обґрунтуванням «Чому так не можна робити»
                  </h3>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala mt-0.5">
                    Кожен елемент бібліотеки (16 компонентів, 8 UI-патернів та 5 ключових екранів) супроводжується чіткими правилами DO (рекомендовано) та DON'T (заборонено) з детальним поясненням наслідків для UX та безпеки.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const doDontMarkdown = `# Зведені правила використання (Do / Don't) — Scroll & Buy Design System

## 1. Компоненти дизайн-системи (Атоми, Молекули, Організми)
${COMPREHENSIVE_COMPONENT_GROUPS.map(
  (g) => `### ${g.title} (${g.category.toUpperCase()})
- **✓ DO (Рекомендовано):** ${g.doRule}
- **✕ DON'T (Заборонено та чому):** ${g.dontRule}
`
).join('\n')}

## 2. UI-Патерни (Скелетони, Хотбари, Empty States, Картка товару)
${UI_PATTERNS_SPEC.map(
  (p) => `### ${p.title}
- **Призначення:** ${p.purpose}
- **✓ DO:** ${p.doRule}
- **✕ DON'T (Чому заборонено):** ${p.dontRule}
`
).join('\n')}

## 3. Ключові мобільні екрани
${KEY_SCREENS_SPEC.map(
  (s) => `### ${s.title}
- **Призначення:** ${s.subtitle}
- **✓ DO:** ${s.doRule}
- **✕ DON'T (Чому заборонено):** ${s.dontRule}
`
).join('\n')}`;
                    navigator.clipboard.writeText(doDontMarkdown);
                    showToast('✓ Повний звіт Do / Don\'t з усіма поясненнями скопійовано у буфер обміну!');
                  }}
                  className="px-3.5 py-2 bg-[#4F6C73] text-white text-xs font-bold rounded-xs flex items-center gap-1.5 cursor-pointer hover:bg-[#3d555b] shrink-0 shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5 text-[#A7E4F2]" />
                  <span>Скопіювати повний звіт Do/Don't (Markdown)</span>
                </button>
              </div>

              {/* Subsection 1: 16 Components */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b dark:border-neutral-700 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4F6C73]" />
                  <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading uppercase">
                    1. Правила для 16 компонентів (Атоми, Молекули, Організми)
                  </h4>
                </div>

                <div className="space-y-3">
                  {COMPREHENSIVE_COMPONENT_GROUPS.map((group) => (
                    <div key={group.id} className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-neutral-200 dark:border-neutral-700 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                          {group.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono font-bold rounded-xs">
                          {group.category.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] uppercase">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>DO — РЕКОМЕНДОВАНО</span>
                          </div>
                          <p className="text-emerald-950 dark:text-emerald-200 font-sarala leading-relaxed">{group.doRule}</p>
                        </div>

                        <div className="p-2.5 bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-red-800 dark:text-red-300 font-bold text-[11px] uppercase">
                            <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                            <span>DON'T — ЗАБОРОНЕНО ТА ЧОМУ</span>
                          </div>
                          <p className="text-red-950 dark:text-red-200 font-sarala leading-relaxed">{group.dontRule}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsection 2: 8 UI Patterns */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 border-b dark:border-neutral-700 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A7E4F2]" />
                  <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading uppercase">
                    2. Правила для 8 UI-патернів (Хотбари, Скелетони, Empty States, Картка товару)
                  </h4>
                </div>

                <div className="space-y-3">
                  {UI_PATTERNS_SPEC.map((pattern) => (
                    <div key={pattern.id} className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-neutral-200 dark:border-neutral-700 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                          {pattern.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#A7E4F2]/20 text-[#4F6C73] dark:text-[#A7E4F2] font-mono font-bold rounded-xs">
                          UI PATTERN
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {pattern.purpose}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] uppercase">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>DO — РЕКОМЕНДОВАНО</span>
                          </div>
                          <p className="text-emerald-950 dark:text-emerald-200 font-sarala leading-relaxed">{pattern.doRule}</p>
                        </div>

                        <div className="p-2.5 bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-red-800 dark:text-red-300 font-bold text-[11px] uppercase">
                            <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                            <span>DON'T — ЗАБОРОНЕНО ТА ЧОМУ</span>
                          </div>
                          <p className="text-red-950 dark:text-red-200 font-sarala leading-relaxed">{pattern.dontRule}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsection 3: 5 Key Screens */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 border-b dark:border-neutral-700 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEDF82]" />
                  <h4 className="text-xs font-bold text-[#0D0D0D] dark:text-white font-heading uppercase">
                    3. Правила для 5 ключових екранів (Стрічка, Пошук, Чат угоди, Кабінет, PDP)
                  </h4>
                </div>

                <div className="space-y-3">
                  {KEY_SCREENS_SPEC.map((screen) => (
                    <div key={screen.id} className="p-3 bg-white dark:bg-[#1A2024] rounded-xs border border-neutral-200 dark:border-neutral-700 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#4F6C73] dark:text-[#A7E4F2] font-heading uppercase">
                          {screen.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#FEDF82]/30 text-[#0D0D0D] dark:text-[#FEDF82] font-mono font-bold rounded-xs">
                          SCREEN (390×844)
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] uppercase">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>DO — РЕКОМЕНДОВАНО</span>
                          </div>
                          <p className="text-emerald-950 dark:text-emerald-200 font-sarala leading-relaxed">{screen.doRule}</p>
                        </div>

                        <div className="p-2.5 bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-red-800 dark:text-red-300 font-bold text-[11px] uppercase">
                            <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                            <span>DON'T — ЗАБОРОНЕНО ТА ЧОМУ</span>
                          </div>
                          <p className="text-red-950 dark:text-red-200 font-sarala leading-relaxed">{screen.dontRule}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: Export to Figma (SVG & JSON) */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-[#1A2024] rounded-xs border border-[#A6A6A6]/30 dark:border-neutral-700 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-[#4F6C73] dark:text-[#A7E4F2]">
                  <Sparkles className="w-5 h-5" />
                  <div>
                    <h3 className="text-xs font-bold font-heading">
                      Повний експорт для сторінки «03 Компоненти» у Figma
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sarala">
                      Пряма інтеграція з вашим файлом Figma за посиланням проєкту
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sarala leading-relaxed">
                  Завантажте готовий векторний артборд, який містить усі розділи: Атоми, Молекули, Організми, 8 UI-патернів, 5 ключових екранів, порівняння Do/Don't та Таблицю 3.3. У Figma достатньо перетягнути завантажений файл або скопіювати окремий компонент чи екран через кнопку та натиснути <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xs text-[10px] font-mono">Ctrl+V</kbd>.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={handleDownloadFullFigmaSvg}
                    className="px-4 py-2.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] font-bold text-xs rounded-xs flex items-center gap-2 cursor-pointer border border-[#4F6C73]/40 shadow-xs transition-transform active:scale-95"
                  >
                    <Download className="w-4 h-4 text-[#0D0D0D]" />
                    <span>Завантажити повний Figma SVG Artboard</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(FIGMA_TOKENS_JSON, null, 2));
                      showToast('✓ JSON токенів для Figma Variables скопійовано!');
                    }}
                    className="px-4 py-2.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white font-bold text-xs rounded-xs flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <Copy className="w-4 h-4 text-[#A7E4F2]" />
                    <span>Скопіювати JSON для Figma Variables</span>
                  </button>
                </div>
              </div>

              {/* Tokens Preview */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#A6A6A6] dark:text-neutral-400 uppercase tracking-wider block font-heading">
                  Попередній перегляд Design Tokens JSON (W3C Community Group / Figma Variables format):
                </span>
                <pre className="p-3.5 bg-neutral-900 text-[#A7E4F2] rounded-xs font-mono text-[10px] max-h-72 overflow-y-auto border border-neutral-700 leading-relaxed">
                  {JSON.stringify(FIGMA_TOKENS_JSON, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-neutral-100 dark:bg-[#181F22] border-t border-[#A6A6A6]/30 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sarala">
            Повна бібліотека компонентів за вимогами методички Лабораторної роботи №3 (Розділ 3, Рис. 4, Таблиця 3.3, 8 UI-патернів, 5 ключових екранів)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4F6C73] text-white text-xs font-bold uppercase rounded-xs hover:bg-[#3d555b] transition-colors cursor-pointer w-full sm:w-auto"
          >
            Закрити бібліотеку
          </button>
        </div>
      </div>
    </div>
  );
};
