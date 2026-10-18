import React from 'react';

interface ProductArtworkProps {
  type: string;
  className?: string;
  aspectRatio?: 'poster' | 'square' | 'video' | 'thumb';
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  type,
  className = '',
  aspectRatio = 'square',
}) => {
  const getContainerAspect = () => {
    switch (aspectRatio) {
      case 'poster':
        return 'aspect-[3/4]';
      case 'video':
        return 'aspect-[9/16]';
      case 'thumb':
        return 'aspect-square';
      default:
        return 'aspect-[4/3]';
    }
  };

  if (type === 'beatles' || type === 'beatles_poster') {
    return (
      <div
        className={`relative flex flex-col items-center justify-between overflow-hidden bg-[#243338] text-[#F2F2F2] p-4 border border-[#4F6C73]/40 ${getContainerAspect()} ${className}`}
      >
        <div className="absolute inset-0 bg-radial from-[#4F6C73]/30 via-transparent to-black/60 opacity-80 pointer-events-none" />
        
        {/* Заголовок плаката */}
        <div className="relative z-10 w-full text-center border-b border-[#A7E4F2]/30 pb-2">
          <p className="text-[10px] tracking-[0.25em] text-[#A7E4F2] font-semibold uppercase">
            Колекційне видання · 1964
          </p>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white font-heading">
            A Hard Day's Night
          </h2>
          <p className="text-[11px] text-[#A6A6A6] tracking-wider">
            ЛЕГЕНДАРНІ THE BEATLES
          </p>
        </div>

        {/* 4 портрети */}
        <div className="relative z-10 grid grid-cols-2 gap-2 my-auto w-full max-w-[240px]">
          {['ДЖОН', 'ПОЛ', 'ДЖОРДЖ', 'РІНГО'].map((name, idx) => (
            <div
              key={name}
              className="relative aspect-square bg-[#0D0D0D] border border-[#4F6C73] overflow-hidden flex flex-col items-center justify-end p-1.5 shadow-sm group"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#A7E4F2]/80 opacity-90"
                fill="currentColor"
              >
                <circle cx="50" cy="38" r="22" fill="#F2F2F2" />
                {idx === 0 && (
                  <path
                    d="M 26 38 Q 50 12 74 38 Q 72 20 50 20 Q 28 20 26 38 Z"
                    fill="#0D0D0D"
                  />
                )}
                {idx === 1 && (
                  <path
                    d="M 24 40 Q 50 14 76 40 Q 75 18 50 18 Q 25 18 24 40 Z"
                    fill="#0D0D0D"
                  />
                )}
                {idx === 2 && (
                  <path
                    d="M 25 42 Q 50 15 75 42 Q 68 22 50 22 Q 32 22 25 42 Z"
                    fill="#0D0D0D"
                  />
                )}
                {idx === 3 && (
                  <path
                    d="M 27 40 Q 50 16 73 40 Q 70 24 50 24 Q 30 24 27 40 Z"
                    fill="#0D0D0D"
                  />
                )}
                {idx === 0 && (
                  <circle
                    cx="44"
                    cy="40"
                    r="5"
                    stroke="#0D0D0D"
                    strokeWidth="2"
                    fill="none"
                  />
                )}
                {idx === 0 && (
                  <circle
                    cx="56"
                    cy="40"
                    r="5"
                    stroke="#0D0D0D"
                    strokeWidth="2"
                    fill="none"
                  />
                )}
                <path
                  d="M 20 95 C 20 70, 80 70, 80 95 Z"
                  fill="#4F6C73"
                />
                <rect x="46" y="58" width="8" height="12" fill="#F2F2F2" />
                <path d="M 45 68 L 50 82 L 55 68 Z" fill="#0D0D0D" />
              </svg>
              <span className="relative z-10 text-[9px] font-bold tracking-widest text-[#A7E4F2] bg-[#0D0D0D]/90 px-1 rounded-xs">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Нижній підпис */}
        <div className="relative z-10 w-full text-center border-t border-[#4F6C73]/40 pt-2 flex items-center justify-between text-[10px] text-[#A6A6A6]">
          <span>СЕРТИФІКОВАНА РЕЛІКВІЯ</span>
          <span className="text-[#FEDF82] font-semibold">14.99 €</span>
          <span>ЛІМІТОВАНИЙ ДРУК #412</span>
        </div>
      </div>
    );
  }

  if (type === 'ceramic' || type === 'ceramic_mug') {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E8EEF0] to-[#CFDDE0] p-6 border border-[#4F6C73]/20 ${getContainerAspect()} ${className}`}
      >
        <div className="absolute inset-0 bg-radial from-white/70 via-transparent to-[#4F6C73]/20 pointer-events-none" />
        <svg
          viewBox="0 0 200 200"
          className="w-4/5 h-4/5 drop-shadow-lg"
          fill="none"
        >
          <ellipse cx="100" cy="168" rx="55" ry="12" fill="#4F6C73" fillOpacity="0.25" />
          <path
            d="M 60 70 L 68 150 C 70 160, 130 160, 132 150 L 140 70 Z"
            fill="#4F6C73"
          />
          <ellipse cx="100" cy="70" rx="40" ry="10" fill="#A7E4F2" />
          <ellipse cx="100" cy="72" rx="36" ry="8" fill="#3D555B" />
          <circle cx="85" cy="110" r="2.5" fill="#A7E4F2" fillOpacity="0.8" />
          <circle cx="115" cy="125" r="2" fill="#A7E4F2" fillOpacity="0.7" />
          <circle cx="95" cy="138" r="3" fill="#A7E4F2" fillOpacity="0.9" />
          <circle cx="120" cy="95" r="1.5" fill="#F2F2F2" fillOpacity="0.6" />
          <circle cx="78" cy="130" r="2" fill="#F2F2F2" fillOpacity="0.5" />
          <path
            d="M 136 85 C 165 88, 165 130, 130 135"
            stroke="#4F6C73"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 136 85 C 160 88, 160 130, 130 135"
            stroke="#A7E4F2"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="4 6"
          />
          <path
            d="M 90 55 Q 85 40 92 25"
            stroke="#A6A6A6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          <path
            d="M 105 52 Q 112 38 106 22"
            stroke="#A6A6A6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider text-[#4F6C73] font-semibold">
          Крафтова кераміка · Львів
        </span>
      </div>
    );
  }

  if (type === 'jewelry' || type === 'silver_ring') {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#1E2628] to-[#36464B] p-6 border border-[#4F6C73]/30 ${getContainerAspect()} ${className}`}
      >
        <div className="absolute inset-0 bg-radial from-[#A7E4F2]/10 via-transparent to-black/70 pointer-events-none" />
        <svg
          viewBox="0 0 200 200"
          className="w-4/5 h-4/5 drop-shadow-xl"
          fill="none"
        >
          <ellipse cx="100" cy="165" rx="45" ry="10" fill="#0D0D0D" fillOpacity="0.7" />
          <ellipse
            cx="100"
            cy="120"
            rx="46"
            ry="24"
            stroke="#A7E4F2"
            strokeWidth="14"
            fill="none"
          />
          <ellipse
            cx="100"
            cy="118"
            rx="46"
            ry="24"
            stroke="#F2F2F2"
            strokeWidth="3"
            strokeDasharray="6 4"
            fill="none"
          />
          <path
            d="M 85 95 L 115 95 L 122 75 L 78 75 Z"
            fill="#4F6C73"
            stroke="#A7E4F2"
            strokeWidth="2"
          />
          <polygon
            points="100,45 125,70 115,100 85,100 75,70"
            fill="#2E504A"
            stroke="#7FE176"
            strokeWidth="2"
          />
          <polygon points="100,45 110,65 90,65" fill="#42786D" />
          <polygon points="90,65 75,70 85,100" fill="#203934" />
          <polygon points="110,65 125,70 115,100" fill="#5AA697" />
          <path
            d="M 125 50 L 128 58 L 136 61 L 128 64 L 125 72 L 122 64 L 114 61 L 122 58 Z"
            fill="#FEDF82"
          />
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider text-[#A7E4F2]">
          Срібло 925 · Ручна ковка
        </span>
      </div>
    );
  }

  if (type === 'cake' || type === 'craft_cake') {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-[#FBF7F5] p-6 border border-[#FEDF82]/40 ${getContainerAspect()} ${className}`}
      >
        <div className="absolute inset-0 bg-radial from-white via-transparent to-[#FEDF82]/20 pointer-events-none" />
        <svg
          viewBox="0 0 200 200"
          className="w-4/5 h-4/5 drop-shadow-md"
          fill="none"
        >
          <ellipse cx="100" cy="155" rx="60" ry="16" fill="#EADBC8" stroke="#D1BEA8" strokeWidth="2" />
          <path
            d="M 55 105 L 55 145 C 55 160, 145 160, 145 145 L 145 105 Z"
            fill="#EADED5"
          />
          <ellipse cx="100" cy="105" rx="45" ry="16" fill="#FDF9F6" />
          <path
            d="M 60 102 Q 70 94 80 104 Q 90 94 100 104 Q 110 94 120 104 Q 130 94 140 102"
            stroke="#4F6C73"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="100"
            y="112"
            textAnchor="middle"
            fill="#AB3336"
            fontSize="12"
            fontFamily="serif"
            fontStyle="italic"
            fontWeight="bold"
          >
            sweet life
          </text>
          <circle cx="82" cy="98" r="5" fill="#AB3336" />
          <circle cx="118" cy="98" r="5" fill="#AB3336" />
          <path d="M 82 95 Q 88 84 94 90" stroke="#4F6C73" strokeWidth="1.5" fill="none" />
          <path d="M 118 95 Q 112 84 106 90" stroke="#4F6C73" strokeWidth="1.5" fill="none" />
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider text-[#4F6C73] font-semibold">
          Авторська кондитерська · Щодня
        </span>
      </div>
    );
  }

  if (type === 'manicure' || type === 'nail_art') {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F2F0] to-[#E3E7E8] p-6 border border-[#4F6C73]/20 ${getContainerAspect()} ${className}`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-4/5 h-4/5 drop-shadow-sm"
          fill="none"
        >
          <ellipse cx="100" cy="165" rx="50" ry="10" fill="#4F6C73" fillOpacity="0.15" />
          <path
            d="M 65 170 L 68 85 C 68 70, 82 70, 82 85 L 82 170 Z"
            fill="#EAD7CE"
          />
          <path
            d="M 86 170 L 88 65 C 88 50, 102 50, 102 65 L 102 170 Z"
            fill="#E4CFC5"
          />
          <path
            d="M 106 170 L 108 72 C 108 58, 122 58, 122 72 L 122 170 Z"
            fill="#EAD7CE"
          />
          <path
            d="M 126 170 L 128 92 C 128 80, 140 80, 140 92 L 140 170 Z"
            fill="#DFC6BA"
          />
          <path d="M 70 78 C 70 68, 80 68, 80 78 Z" fill="#4F6C73" />
          <path d="M 90 58 C 90 48, 100 48, 100 58 Z" fill="#A7E4F2" />
          <path d="M 110 65 C 110 55, 120 55, 120 65 Z" fill="#4F6C73" />
          <path d="M 130 85 C 130 75, 138 75, 138 85 Z" fill="#FEDF82" />
          <line x1="93" y1="52" x2="97" y2="52" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="113" y1="59" x2="117" y2="59" stroke="#A7E4F2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider text-[#4F6C73] font-semibold">
          Студійний запис · Вільні слоти
        </span>
      </div>
    );
  }

  // Streetwear Hoodie
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#161C1D] text-white p-6 border border-[#4F6C73]/40 ${getContainerAspect()} ${className}`}
    >
      <div className="absolute inset-0 bg-radial from-[#4F6C73]/40 via-transparent to-black/80 pointer-events-none" />
      <svg
        viewBox="0 0 200 200"
        className="w-4/5 h-4/5 drop-shadow-2xl"
        fill="none"
      >
        <path
          d="M 50 70 L 30 110 L 48 118 L 60 90 L 60 160 L 140 160 L 140 90 L 152 118 L 170 110 L 150 70 L 125 55 L 75 55 Z"
          fill="#232C2E"
          stroke="#4F6C73"
          strokeWidth="3"
        />
        <path
          d="M 75 55 C 75 35, 125 35, 125 55 C 115 62, 85 62, 75 55 Z"
          fill="#1A2224"
          stroke="#4F6C73"
          strokeWidth="2"
        />
        <path
          d="M 75 125 L 125 125 L 120 150 L 80 150 Z"
          fill="#1C2426"
          stroke="#3D4B4F"
          strokeWidth="2"
        />
        <text
          x="100"
          y="102"
          textAnchor="middle"
          fill="#A7E4F2"
          fontSize="9"
          fontWeight="900"
          letterSpacing="1.5"
          fontFamily="sans-serif"
        >
          GOOD THINGS
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="#FEDF82"
          fontSize="8"
          fontWeight="bold"
          letterSpacing="1"
          fontFamily="sans-serif"
        >
          AHEAD 2026
        </text>
        <line x1="88" y1="116" x2="112" y2="116" stroke="#A7E4F2" strokeWidth="1" />
      </svg>
      <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider text-[#A7E4F2]">
        Щільна бавовна · Шовкодрук
      </span>
    </div>
  );

  if (type === 'leather' || type.includes('leather')) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#2D1F18] p-4 text-[#F2F2F2] border border-[#7D5A47]/40 ${getContainerAspect()} ${className}`}
      >
        <div className="absolute inset-0 bg-radial from-[#8D5B3A]/30 via-transparent to-black/70 pointer-events-none" />
        <svg viewBox="0 0 200 200" className="w-4/5 h-4/5 drop-shadow-lg">
          {/* Leather Wallet / Cardholder Outline */}
          <rect
            x="35"
            y="45"
            width="130"
            height="110"
            rx="8"
            fill="#5C3826"
            stroke="#382014"
            strokeWidth="3"
          />
          {/* Saddle Stitching along borders */}
          <rect
            x="42"
            y="52"
            width="116"
            height="96"
            rx="6"
            fill="none"
            stroke="#D4A373"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* Card Pocket Curved Layer */}
          <path
            d="M 35 100 Q 100 120 165 100 L 165 155 L 35 155 Z"
            fill="#452718"
            stroke="#382014"
            strokeWidth="2"
          />
          <path
            d="M 42 105 Q 100 125 158 105"
            fill="none"
            stroke="#D4A373"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* Embossed Brand Stamp */}
          <text
            x="100"
            y="140"
            textAnchor="middle"
            fill="#A67C52"
            fontSize="8"
            fontWeight="bold"
            letterSpacing="2"
            fontFamily="sans-serif"
          >
            LVIV CRAFT 1991
          </text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider text-[#FEDF82]">
          Італійська шкіра · Сідельний шов
        </span>
      </div>
    );
  }

  // Fallback for general craft items
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#243338] p-4 text-[#F2F2F2] border border-[#4F6C73]/40 ${getContainerAspect()} ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#4F6C73]/40 border border-[#A7E4F2]/50 flex items-center justify-center text-xl font-bold text-[#A7E4F2] mb-1">
        ✦
      </div>
      <span className="text-xs font-bold text-white uppercase tracking-wider font-heading">
        Крафтовий виріб
      </span>
      <span className="text-[10px] text-[#A6A6A6]">Scroll &amp; Buy · Ручна робота</span>
    </div>
  );
};
