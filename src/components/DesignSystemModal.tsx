import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ShieldCheck, Layers, Type, Palette, Maximize2 } from 'lucide-react';

interface DesignSystemModalProps {
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'spacing' | 'components'>('tokens');

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto">
      <div className="bg-[#F2F2F2] dark:bg-[#121618] text-[#0D0D0D] dark:text-neutral-100 w-full max-w-2xl rounded-sm border-2 border-[#4F6C73] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-colors">
        {/* Header */}
        <div className="px-5 py-4 bg-[#4F6C73] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#A7E4F2]" />
            <div>
              <h2 className="text-sm font-bold tracking-tight font-heading uppercase">
                Дизайн-система «Scroll & Buy» (Лабораторна робота №3)
              </h2>
              <p className="text-[11px] text-[#A7E4F2]">
                Базові стилі, токени та перевірка доступності WCAG 2.1 AA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#A6A6A6]/30 dark:border-neutral-700 bg-white dark:bg-[#181F22] px-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'tokens', label: 'Кольори & WCAG AA', icon: Palette },
            { id: 'typography', label: 'Типографіка', icon: Type },
            { id: 'spacing', label: 'Шкала відступів & Сітка', icon: Maximize2 },
            { id: 'components', label: 'Компоненти & Стани', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold font-heading whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#4F6C73] dark:border-[#A7E4F2] text-[#4F6C73] dark:text-[#A7E4F2]'
                    : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 no-scrollbar text-xs">
          {activeTab === 'tokens' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6] mb-2 font-heading">
                  1. Кольорова палітра (Design Tokens)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xs border border-[#A6A6A6]/30 bg-white space-y-1">
                    <div className="h-10 rounded-xs bg-[#4F6C73] flex items-center justify-center text-white font-mono font-bold text-[10px]">
                      #4F6C73
                    </div>
                    <p className="font-bold text-[11px] text-[#0D0D0D]">primary-600</p>
                    <p className="text-[10px] text-neutral-500">Кнопки дій, шапки</p>
                  </div>
                  <div className="p-3 rounded-xs border border-[#A6A6A6]/30 bg-white space-y-1">
                    <div className="h-10 rounded-xs bg-[#A7E4F2] flex items-center justify-center text-[#0D0D0D] font-mono font-bold text-[10px]">
                      #A7E4F2
                    </div>
                    <p className="font-bold text-[11px] text-[#0D0D0D]">primary-100</p>
                    <p className="text-[10px] text-neutral-500">Акцентні CTA, бейджі</p>
                  </div>
                  <div className="p-3 rounded-xs border border-[#A6A6A6]/30 bg-white space-y-1">
                    <div className="h-10 rounded-xs bg-[#0D0D0D] flex items-center justify-center text-white font-mono font-bold text-[10px]">
                      #0D0D0D
                    </div>
                    <p className="font-bold text-[11px] text-[#0D0D0D]">neutral-900</p>
                    <p className="text-[10px] text-neutral-500">Текст, глибокий фон</p>
                  </div>
                  <div className="p-3 rounded-xs border border-[#A6A6A6]/30 bg-white space-y-1">
                    <div className="h-10 rounded-xs bg-[#F2F2F2] border border-neutral-300 flex items-center justify-center text-[#0D0D0D] font-mono font-bold text-[10px]">
                      #F2F2F2
                    </div>
                    <p className="font-bold text-[11px] text-[#0D0D0D]">neutral-500</p>
                    <p className="text-[10px] text-neutral-500">Основний фон екрана</p>
                  </div>
                </div>
              </div>

              {/* WCAG Table from Figma page */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6] mb-2 font-heading">
                  2. Таблиця перевірки контрасту за WCAG 2.1 AA
                </h3>
                <div className="border border-[#A6A6A6]/40 rounded-xs overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 border-b border-neutral-200 text-[10px] uppercase font-bold text-[#4F6C73]">
                        <th className="p-2">Пара (текст / фон)</th>
                        <th className="p-2">Контраст</th>
                        <th className="p-2">Норма AA</th>
                        <th className="p-2">Результат</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-[11px]">
                      <tr>
                        <td className="p-2 font-mono">#0D0D0D на #A7E4F2</td>
                        <td className="p-2 font-bold tabular-nums">13.9:1</td>
                        <td className="p-2">≥ 4.5:1</td>
                        <td className="p-2 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Пройдено
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">#F2F2F2 на #4F6C73</td>
                        <td className="p-2 font-bold tabular-nums">5.03:1</td>
                        <td className="p-2">≥ 4.5:1</td>
                        <td className="p-2 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Пройдено
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">#0D0D0D на #F2F2F2</td>
                        <td className="p-2 font-bold tabular-nums">17.36:1</td>
                        <td className="p-2">≥ 4.5:1</td>
                        <td className="p-2 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Пройдено (AAA)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">#F2F2F2 на #AB3336</td>
                        <td className="p-2 font-bold tabular-nums">5.75:1</td>
                        <td className="p-2">≥ 4.5:1</td>
                        <td className="p-2 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Пройдено (Error)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">#0D0D0D на #FEDF82</td>
                        <td className="p-2 font-bold tabular-nums">14.89:1</td>
                        <td className="p-2">≥ 4.5:1</td>
                        <td className="p-2 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Пройдено (Warning)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">#0D0D0D на #7FE176</td>
                        <td className="p-2 font-bold tabular-nums">11.97:1</td>
                        <td className="p-2">≥ 4.5:1</td>
                        <td className="p-2 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Пройдено (Success)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6] font-heading">
                Типографічна шкала з макетів
              </h3>
              <div className="border border-[#A6A6A6]/40 rounded-xs overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 border-b border-neutral-200 text-[10px] uppercase font-bold text-[#4F6C73]">
                      <th className="p-2">Стиль</th>
                      <th className="p-2">Шрифт</th>
                      <th className="p-2">Розмір / Інтервал</th>
                      <th className="p-2">Жирність</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    <tr>
                      <td className="p-2 font-bold">H1</td>
                      <td className="p-2">Open Sans</td>
                      <td className="p-2 font-mono">32 / 40 px</td>
                      <td className="p-2 font-bold">Bold 700</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">H2</td>
                      <td className="p-2">Open Sans</td>
                      <td className="p-2 font-mono">26 / 32 px</td>
                      <td className="p-2 font-bold">Bold 700</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">H3</td>
                      <td className="p-2">Open Sans</td>
                      <td className="p-2 font-mono">22 / 26 px</td>
                      <td className="p-2 font-semibold">Semibold 600</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">H4</td>
                      <td className="p-2">Open Sans</td>
                      <td className="p-2 font-mono">18 / 24 px</td>
                      <td className="p-2 font-semibold">Semibold 600</td>
                    </tr>
                    <tr>
                      <td className="p-2">Body</td>
                      <td className="p-2">Overpass / Sarala</td>
                      <td className="p-2 font-mono">16 / 24 px</td>
                      <td className="p-2">Regular 400</td>
                    </tr>
                    <tr>
                      <td className="p-2">Body S</td>
                      <td className="p-2">Overpass / Sarala</td>
                      <td className="p-2 font-mono">14 / 20 px</td>
                      <td className="p-2">Regular 400</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-neutral-500">Caption</td>
                      <td className="p-2">Overpass</td>
                      <td className="p-2 font-mono">12 / 16 px</td>
                      <td className="p-2">Regular 400</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'spacing' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6] font-heading">
                Шкала відступів (Spacing Scale)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: 'space-1', px: '4 px', use: 'між іконкою і підписом' },
                  { name: 'space-2', px: '8 px', use: 'усередині карток' },
                  { name: 'space-3', px: '12 px', use: 'між блоками' },
                  { name: 'space-4', px: '16 px', use: 'відступ від країв екрана (margins)' },
                  { name: 'space-5', px: '24 px', use: 'між великими секціями' },
                  { name: 'space-6', px: '32 px', use: 'великі внутрішні відступи' },
                  { name: 'space-7', px: '48 px', use: 'відступи між групами секцій' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-2.5 bg-white border border-[#A6A6A6]/30 rounded-xs">
                    <div>
                      <span className="font-bold text-[#4F6C73] font-mono">{s.name}</span>
                      <span className="text-[10px] text-neutral-500 block">{s.use}</span>
                    </div>
                    <span className="font-bold font-mono bg-neutral-100 px-2 py-0.5 rounded-xs text-[#0D0D0D]">
                      {s.px}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-white border border-[#A6A6A6]/30 rounded-xs">
                <span className="font-bold text-[#0D0D0D] block mb-1">Модульна сітка:</span>
                <p className="text-[11px] text-neutral-600">
                  Мобільний екран 390×844 px (Iphone 13 / Android), 4 колонки, gutter 12 px, margins 16 px.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6] font-heading">
                Атомарні компоненти та їх стани (Крок 3 методички)
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white border border-[#A6A6A6]/30 rounded-xs space-y-2">
                  <span className="text-xs font-bold text-[#0D0D0D]">Кнопка (Primary):</span>
                  <div className="flex flex-wrap gap-2 items-center">
                    <button className="px-4 py-2 bg-[#A7E4F2] text-[#0D0D0D] text-xs font-bold tracking-wider uppercase border border-[#4F6C73] rounded-xs">
                      Default
                    </button>
                    <button className="px-4 py-2 bg-[#92d8e8] text-[#0D0D0D] text-xs font-bold tracking-wider uppercase border border-[#4F6C73] rounded-xs ring-2 ring-[#4F6C73]">
                      Hover / Focus
                    </button>
                    <button disabled className="px-4 py-2 bg-[#A7E4F2]/40 text-[#0D0D0D]/40 text-xs font-bold tracking-wider uppercase border border-[#A6A6A6] rounded-xs cursor-not-allowed">
                      Disabled
                    </button>
                    <button className="px-4 py-2 bg-[#4F6C73] text-white text-xs font-bold tracking-wider uppercase rounded-xs flex items-center gap-1.5">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#A6A6A6]/30 rounded-xs space-y-2">
                  <span className="text-xs font-bold text-[#0D0D0D]">Поле вводу (Input):</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      readOnly
                      value="Звичайний стан"
                      className="h-9 px-3 text-xs bg-neutral-50 border border-[#A6A6A6]/40 rounded-xs"
                    />
                    <input
                      readOnly
                      value="Помилка валідації"
                      className="h-9 px-3 text-xs bg-red-50 border border-[#AB3336] text-[#AB3336] rounded-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-100 border-t border-[#A6A6A6]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4F6C73] text-white text-xs font-bold uppercase rounded-xs hover:bg-[#3d555b] transition-colors cursor-pointer"
          >
            Закрити панель
          </button>
        </div>
      </div>
    </div>
  );
};
