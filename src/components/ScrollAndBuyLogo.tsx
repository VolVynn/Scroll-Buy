import React from 'react';

interface ScrollAndBuyLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'adaptive' | 'accent';
  height?: number | string;
  showText?: boolean;
}

/**
 * Official SCROLL & BUY Barcode Logo
 * Faithfully matches the uploaded SCROLL&BUY brand asset:
 * Dense authentic retail barcode on top, and widely spaced "SCROLL & BUY" typography underneath.
 */
export const ScrollAndBuyLogo: React.FC<ScrollAndBuyLogoProps> = ({
  className = 'h-9 w-auto',
  variant = 'adaptive',
  height,
  showText = true,
}) => {
  const fillColor = 
    variant === 'light' 
      ? '#FFFFFF' 
      : variant === 'dark' 
      ? '#0D0D0D' 
      : variant === 'accent'
      ? '#A7E4F2'
      : 'currentColor';

  return (
    <svg
      viewBox="0 0 420 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={height ? { height } : undefined}
      aria-label="SCROLL & BUY"
      role="img"
    >
      {/* Barcode Vertical Bars */}
      <g fill={fillColor} shapeRendering="crispEdges">
        <rect x="8" y="8" width="7" height="70" />
        <rect x="19" y="8" width="3" height="70" />
        <rect x="26" y="8" width="5" height="70" />
        <rect x="35" y="8" width="6" height="70" />
        <rect x="45" y="8" width="2" height="70" />
        <rect x="51" y="8" width="4" height="70" />
        <rect x="59" y="8" width="2" height="70" />
        <rect x="65" y="8" width="2" height="70" />
        <rect x="71" y="8" width="5" height="70" />
        <rect x="80" y="8" width="8" height="70" />
        <rect x="92" y="8" width="5" height="70" />
        <rect x="101" y="8" width="2" height="70" />
        <rect x="107" y="8" width="6" height="70" />
        <rect x="117" y="8" width="3" height="70" />
        <rect x="124" y="8" width="6" height="70" />
        <rect x="134" y="8" width="7" height="70" />
        <rect x="145" y="8" width="2" height="70" />
        <rect x="151" y="8" width="5" height="70" />
        <rect x="160" y="8" width="7" height="70" />
        <rect x="171" y="8" width="2" height="70" />
        <rect x="177" y="8" width="2" height="70" />
        <rect x="183" y="8" width="7" height="70" />
        <rect x="194" y="8" width="5" height="70" />
        <rect x="203" y="8" width="7" height="70" />
        <rect x="214" y="8" width="2" height="70" />
        <rect x="220" y="8" width="4" height="70" />
        <rect x="228" y="8" width="6" height="70" />
        <rect x="238" y="8" width="2" height="70" />
        <rect x="244" y="8" width="2" height="70" />
        <rect x="250" y="8" width="7" height="70" />
        <rect x="261" y="8" width="7" height="70" />
        <rect x="272" y="8" width="2" height="70" />
        <rect x="278" y="8" width="5" height="70" />
        <rect x="287" y="8" width="8" height="70" />
        <rect x="299" y="8" width="2" height="70" />
        <rect x="305" y="8" width="5" height="70" />
        <rect x="314" y="8" width="6" height="70" />
        <rect x="324" y="8" width="2" height="70" />
        <rect x="330" y="8" width="2" height="70" />
        <rect x="336" y="8" width="7" height="70" />
        <rect x="347" y="8" width="5" height="70" />
        <rect x="356" y="8" width="2" height="70" />
        <rect x="362" y="8" width="6" height="70" />
        <rect x="372" y="8" width="2" height="70" />
        <rect x="378" y="8" width="4" height="70" />
        <rect x="386" y="8" width="7" height="70" />
        <rect x="397" y="8" width="3" height="70" />
        <rect x="404" y="8" width="7" height="70" />
      </g>

      {/* S C R O L L & B U Y Text Below Barcode */}
      {showText && (
        <text
          x="210"
          y="107"
          fill={fillColor}
          fontFamily="'Overpass', 'Open Sans', system-ui, -apple-system, sans-serif"
          fontSize="23"
          fontWeight="800"
          textAnchor="middle"
          letterSpacing="0.28em"
        >
          SCROLL &amp; BUY
        </text>
      )}
    </svg>
  );
};
