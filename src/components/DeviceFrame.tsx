import React from 'react';
import { DeviceType, AppLanguage, AppTheme } from '../types';
import { getTranslation } from '../data/translations';
import { ScrollAndBuyLogo } from './ScrollAndBuyLogo';
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  Battery, 
  RotateCcw, 
  Sparkles,
  ShoppingBag,
  PlusCircle,
  MessageSquare,
  Layers,
  Palette
} from 'lucide-react';

interface DeviceFrameProps {
  deviceType: DeviceType;
  onDeviceTypeChange: (type: DeviceType) => void;
  onResetDemo: () => void;
  onJumpScenario1: () => void;
  onJumpScenario2: () => void;
  onJumpChats: () => void;
  onOpenDesignSystem: () => void;
  onOpenFigmaLibrary: () => void;
  appLanguage?: AppLanguage;
  appTheme?: AppTheme;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceType,
  onDeviceTypeChange,
  onResetDemo,
  onJumpScenario1,
  onJumpScenario2,
  onJumpChats,
  onOpenDesignSystem,
  onOpenFigmaLibrary,
  appLanguage = 'uk',
  appTheme = 'light',
  children,
}) => {
  const t = getTranslation(appLanguage);
  return (
    <div className={`min-h-screen flex flex-col items-center justify-start py-4 px-2 sm:px-4 transition-colors ${
      appTheme === 'dark' ? 'bg-[#0E1315]' : 'bg-[#2A3538]'
    }`}>
      {/* Top Scenario & Device Control Bar */}
      <header className={`w-full max-w-4xl border rounded-sm p-3 mb-4 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-3 transition-colors ${
        appTheme === 'dark' ? 'bg-[#161E21] border-[#4F6C73]/50' : 'bg-[#1D2527] border-[#4F6C73]/40'
      }`}>
        {/* Official SCROLL & BUY Barcode Logo in Top-Left Corner */}
        <div className="flex items-center gap-3">
          <div className="flex items-center py-0.5 group cursor-default" title="SCROLL & BUY">
            <ScrollAndBuyLogo 
              variant="adaptive" 
              className="h-10 sm:h-11 w-auto text-white group-hover:text-[#A7E4F2] transition-colors drop-shadow-xs" 
            />
          </div>
          <div className="hidden lg:flex flex-col border-l border-[#4F6C73]/40 pl-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A7E4F2]">
              Відео-комерція
            </span>
            <span className="text-[10px] text-[#A6A6A6]">
              Замовлення з трекінгом
            </span>
          </div>
        </div>

        {/* Quick Scenario Triggers & Figma Library */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <button
            onClick={onJumpScenario1}
            className="px-2.5 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer text-[11px]"
            title={t.scenario1}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#A7E4F2]" />
            <span>{t.scenario1}</span>
          </button>

          <button
            onClick={onJumpScenario2}
            className="px-2.5 py-1.5 bg-[#4F6C73] hover:bg-[#3d555b] text-white rounded-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer text-[11px]"
            title={t.scenario2}
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#A7E4F2]" />
            <span>{t.scenario2}</span>
          </button>

          <button
            onClick={onJumpChats}
            className="px-2.5 py-1.5 bg-[#1D2527] hover:bg-neutral-800 border border-[#4F6C73]/60 text-white rounded-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer text-[11px]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#A7E4F2]" />
            <span>{t.navChats}</span>
          </button>

          {/* New Figma Component Library Button */}
          <button
            onClick={onOpenFigmaLibrary}
            className="px-2.5 py-1.5 bg-[#A7E4F2] hover:bg-[#92d8e8] text-[#0D0D0D] rounded-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer text-[11px]"
            title={t.figmaComponents}
          >
            <Layers className="w-3.5 h-3.5 text-[#0D0D0D]" />
            <span>{t.figmaComponents}</span>
          </button>

          <button
            onClick={onOpenDesignSystem}
            className="px-2.5 py-1.5 bg-[#1D2527] hover:bg-neutral-800 border border-[#4F6C73]/60 text-white rounded-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer text-[11px]"
            title="Перевірка палітри, шрифтів та контрасту WCAG"
          >
            <Palette className="w-3.5 h-3.5 text-[#A7E4F2]" />
            <span>WCAG</span>
          </button>

          <button
            onClick={onResetDemo}
            className="p-1.5 text-[#A6A6A6] hover:text-white rounded-xs hover:bg-white/10 transition-colors cursor-pointer"
            title={t.resetDemo}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xs border border-white/10 text-xs">
          <button
            onClick={() => onDeviceTypeChange('android')}
            className={`px-2.5 py-1 rounded-xs flex items-center gap-1 transition-colors cursor-pointer text-[11px] font-semibold ${
              deviceType === 'android'
                ? 'bg-[#4F6C73] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>
          <button
            onClick={() => onDeviceTypeChange('iphone')}
            className={`px-2.5 py-1 rounded-xs flex items-center gap-1 transition-colors cursor-pointer text-[11px] font-semibold ${
              deviceType === 'iphone'
                ? 'bg-[#4F6C73] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 13</span>
          </button>
          <button
            onClick={() => onDeviceTypeChange('fluid')}
            className={`px-2.5 py-1 rounded-xs flex items-center gap-1 transition-colors cursor-pointer text-[11px] font-semibold ${
              deviceType === 'fluid'
                ? 'bg-[#4F6C73] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Адаптивний</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      {deviceType === 'fluid' ? (
        <div className={`w-full max-w-md h-[844px] rounded-sm overflow-hidden shadow-2xl relative border border-[#4F6C73]/40 flex flex-col transition-colors ${
          appTheme === 'dark' ? 'bg-[#121618] text-white' : 'bg-white text-[#0D0D0D]'
        }`}>
          {children}
        </div>
      ) : (
        /* Phone Frame Shell (iPhone 13 390x844 or Android) */
        <div className="relative p-3 bg-[#0D0D0D] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-[#3D4B4F] transition-all">
          <div className="absolute -left-[7px] top-28 w-[3px] h-10 bg-[#4F6C73] rounded-l-sm" />
          <div className="absolute -left-[7px] top-42 w-[3px] h-10 bg-[#4F6C73] rounded-l-sm" />
          <div className="absolute -right-[7px] top-32 w-[3px] h-14 bg-[#4F6C73] rounded-r-sm" />

          {/* Screen Bezel Viewport */}
          <div className="w-[390px] h-[844px] bg-[#0D0D0D] rounded-[38px] overflow-hidden relative flex flex-col">
            {/* Top Device Notch / Punch Hole */}
            {deviceType === 'iphone' ? (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-800" />
              </div>
            ) : (
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-neutral-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#111]" />
              </div>
            )}

            {/* Device Status Bar */}
            <div className="h-8 px-6 pt-1.5 flex items-center justify-between text-[11px] font-bold text-white z-40 select-none bg-black/40 backdrop-blur-xs">
              <span className="font-mono">9:41</span>
              <div className="flex items-center gap-1.5 text-white">
                <Wifi className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono">5G</span>
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* App Viewport Container */}
            <div className={`flex-1 relative overflow-hidden flex flex-col transition-colors ${
              appTheme === 'dark' ? 'bg-[#121618] text-white' : 'bg-[#F2F2F2] text-[#0D0D0D]'
            }`}>
              {children}
            </div>

            {/* Bottom Home Indicator */}
            {deviceType === 'iphone' ? (
              <div className="h-4 bg-black flex items-center justify-center select-none z-40">
                <div className="w-32 h-1 bg-white/70 rounded-full" />
              </div>
            ) : (
              <div className="h-4 bg-black flex items-center justify-center select-none z-40">
                <div className="w-20 h-1 bg-neutral-500 rounded-full" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
