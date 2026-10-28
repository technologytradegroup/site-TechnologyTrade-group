import type { CSSProperties } from "react";

type MapArtworkProps = {
  variant: "hero" | "ecosystem";
};

const hubs = [
  [90, 125], [155, 146], [205, 173], [246, 142], [272, 190], [302, 128], [330, 168], [355, 205], [375, 248], [260, 230], [224, 270],
] as const;

export function MapArtwork({ variant }: MapArtworkProps) {
  const isHero = variant === "hero";
  const css: CSSProperties = { opacity: isHero ? 1 : 0.92 };

  return (
    <svg
      aria-hidden="true"
      className={`map-art map-art--${variant}`}
      viewBox="0 0 500 340"
      preserveAspectRatio="xMidYMid meet"
      style={css}
    >
      <defs>
        <pattern id={`map-dots-${variant}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.15" className="map-dot" />
        </pattern>
        <clipPath id={`africa-${variant}`}>
          <path d="M189 27 233 16l33 21 25-7 25 31 29 13 7 39 33 24-9 37 18 24-21 27-16 41-39 20-22 42-28-4-18-38-28-26-15-44-27-16-17-37-38-18-13-34-29-23 8-28 29-12 9-32 26-16z" />
        </clipPath>
        <linearGradient id={`map-glow-${variant}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#00a676" stopOpacity=".2" />
          <stop offset="1" stopColor="#3f6bbd" stopOpacity=".02" />
        </linearGradient>
      </defs>
      <circle cx="274" cy="158" r="145" className="map-orbit" />
      <circle cx="274" cy="158" r="113" className="map-orbit map-orbit--second" />
      <path
        d="M189 27 233 16l33 21 25-7 25 31 29 13 7 39 33 24-9 37 18 24-21 27-16 41-39 20-22 42-28-4-18-38-28-26-15-44-27-16-17-37-38-18-13-34-29-23 8-28 29-12 9-32 26-16z"
        fill={`url(#map-glow-${variant})`}
        className="map-land"
      />
      <rect x="0" y="0" width="500" height="340" fill={`url(#map-dots-${variant})`} clipPath={`url(#africa-${variant})`} />
      <g className="map-routes">
        <path d="M90 125 Q142 106 205 173 T302 128 T375 248" />
        <path d="M155 146 Q211 124 246 142 T330 168 Q359 198 375 248" />
        <path d="M205 173 Q220 220 260 230 T355 205" />
        <path d="M90 125 Q184 59 302 128" />
        <path d="M224 270 Q262 236 272 190 T330 168" />
      </g>
      <g className="map-hubs">
        {hubs.map(([cx, cy], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 3 === 0 ? 4 : 3} />
        ))}
      </g>
      <path className="map-globe-link" d="M359 97 Q420 44 474 75M378 162 Q441 160 486 129" />
    </svg>
  );
}
