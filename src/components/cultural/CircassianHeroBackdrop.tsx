import React from 'react';

export const CircassianHeroBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Atmospheric Deep Green Sky Gradient */}
          <linearGradient id="skyAtmosphere" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#04130F" />
            <stop offset="25%" stopColor="#0B2B22" />
            <stop offset="60%" stopColor="#134234" />
            <stop offset="85%" stopColor="#0D3025" />
            <stop offset="100%" stopColor="#051712" />
          </linearGradient>

          {/* Caucasus Snow & Mountain Gradients */}
          <linearGradient id="snowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EBF4F0" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#BACDC5" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1B4235" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="rockShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A3B31" />
            <stop offset="50%" stopColor="#102E24" />
            <stop offset="100%" stopColor="#081E17" />
          </linearGradient>

          <linearGradient id="forestRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D4E3D" />
            <stop offset="100%" stopColor="#092019" />
          </linearGradient>

          {/* Grassy Meadow Hill on Right */}
          <linearGradient id="grassyHillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D664F" />
            <stop offset="40%" stopColor="#1E4D3B" />
            <stop offset="80%" stopColor="#0F3024" />
            <stop offset="100%" stopColor="#051610" />
          </linearGradient>

          {/* Stone Tower Masonry Gradients */}
          <linearGradient id="towerLitFace" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A8ACA4" />
            <stop offset="35%" stopColor="#7E877E" />
            <stop offset="80%" stopColor="#4F5850" />
            <stop offset="100%" stopColor="#2F3830" />
          </linearGradient>

          <linearGradient id="towerShadowFace" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#505A52" />
            <stop offset="60%" stopColor="#2E3730" />
            <stop offset="100%" stopColor="#141C17" />
          </linearGradient>

          {/* Flag Fabric Wave Gradients */}
          <linearGradient id="flagSilkBase" x1="0%" y1="0%" x2="100%" y2="60%">
            <stop offset="0%" stopColor="#0A2A20" />
            <stop offset="20%" stopColor="#1B5643" />
            <stop offset="40%" stopColor="#0B3024" />
            <stop offset="60%" stopColor="#266D57" />
            <stop offset="80%" stopColor="#113B2E" />
            <stop offset="100%" stopColor="#08221A" />
          </linearGradient>

          <linearGradient id="flagFoldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32886E" stopOpacity="0" />
            <stop offset="50%" stopColor="#3FA284" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B3024" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="goldStarShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E2A2" />
            <stop offset="40%" stopColor="#D4B263" />
            <stop offset="80%" stopColor="#9C792E" />
            <stop offset="100%" stopColor="#6E5116" />
          </linearGradient>

          {/* Vignette Shadow */}
          <radialGradient id="vignetteShadow" cx="50%" cy="50%" r="70%">
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#020A07" stopOpacity="0.75" />
          </radialGradient>
        </defs>

        {/* 1. Base Sky Atmosphere */}
        <rect width="1920" height="1080" fill="url(#skyAtmosphere)" />

        {/* Atmospheric Cloud Streaks */}
        <path d="M0,280 Q600,180 1200,290 T1920,240 L1920,600 L0,600 Z" fill="#144234" opacity="0.25" />
        <path d="M400,180 Q1000,100 1600,220 T1920,170 L1920,500 L400,500 Z" fill="#1E5C49" opacity="0.18" />

        {/* 2. Majestic Distant Caucasus Mountain Ridge */}
        <g id="distant-caucasus-peaks">
          {/* Back Rocky Base */}
          <path
            d="M600,600 L760,400 L840,460 L980,300 L1080,410 L1200,250 L1310,390 L1440,290 L1560,420 L1680,320 L1800,430 L1920,380 L1920,750 L600,750 Z"
            fill="url(#rockShade)"
            opacity="0.95"
          />

          {/* Snow Slopes & Glaciers */}
          {/* Peak 1 */}
          <polygon points="980,300 930,370 1020,360" fill="url(#snowGlow)" />
          <path d="M980,300 L950,380 L970,410 L990,370 Z" fill="#FFFFFF" opacity="0.6" />

          {/* Main Massive Center Peak */}
          <polygon points="1200,250 1130,350 1250,340" fill="url(#snowGlow)" />
          <path d="M1200,250 L1170,360 L1210,400 L1240,330 Z" fill="#FFFFFF" opacity="0.75" />
          <line x1="1200" y1="250" x2="1190" y2="390" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.8" />

          {/* Peak 3 */}
          <polygon points="1440,290 1390,380 1480,370" fill="url(#snowGlow)" />
          <line x1="1440" y1="290" x2="1430" y2="400" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />

          {/* Peak 4 */}
          <polygon points="1680,320 1630,400 1720,390" fill="url(#snowGlow)" />
        </g>

        {/* 3. Mid-Ground Alpine Slopes & Conifer Forests */}
        <g id="alpine-foothills">
          <path
            d="M480,680 Q800,520 1150,620 T1920,540 L1920,950 L480,950 Z"
            fill="url(#forestRidgeGrad)"
            opacity="0.9"
          />
          <path
            d="M750,750 Q1100,590 1500,670 T1920,630 L1920,1080 L750,1080 Z"
            fill="#123B2D"
          />
        </g>

        {/* 4. Grassy Meadow & Hillside with Watchtower on Right */}
        <g id="foreground-meadow-hill">
          {/* Sloping lush green knoll */}
          <path
            d="M1000,1080 Q1300,780 1920,700 L1920,1080 Z"
            fill="url(#grassyHillGrad)"
          />
        </g>

        {/* 5. Ancient Stone Circassian Watchtower (Koshk) on Grassy Knoll */}
        <g id="circassian-watchtower-detailed" transform="translate(1560, 270)">
          {/* Base shadow on turf */}
          <ellipse cx="90" cy="560" rx="140" ry="35" fill="#020B08" opacity="0.75" />

          {/* Stone Annex / Lower Defensive Wall */}
          <polygon points="0,560 60,560 60,430 0,450" fill="url(#towerLitFace)" stroke="#1A241E" strokeWidth="1" />
          <polygon points="30,560 60,560 60,430 30,440" fill="url(#towerShadowFace)" opacity="0.85" />
          {/* Lower wall window slit */}
          <rect x="18" y="470" width="8" height="20" rx="2" fill="#040D09" />

          {/* Main Stone Watchtower Body (Tapering upwards) */}
          {/* Lit Face (Left) */}
          <polygon points="50,560 170,560 158,160 62,160" fill="url(#towerLitFace)" stroke="#16201A" strokeWidth="1.5" />
          {/* Shadow Face (Right) */}
          <polygon points="110,560 170,560 158,160 110,160" fill="url(#towerShadowFace)" opacity="0.88" />

          {/* Stone Masonry Courses Lines */}
          {[520, 480, 440, 400, 360, 320, 280, 240, 200].map((y, idx) => (
            <line
              key={idx}
              x1={62 + (160 - y) * 0.03}
              y1={y}
              x2={158 - (160 - y) * 0.03}
              y2={y}
              stroke="#1C2720"
              strokeWidth="1.75"
              opacity="0.7"
            />
          ))}

          {/* Defense Overhang / Machicolation Tier */}
          <polygon points="48,160 172,160 178,135 42,135" fill="url(#towerLitFace)" stroke="#16201A" strokeWidth="1.5" />
          <polygon points="110,160 172,160 178,135 110,135" fill="url(#towerShadowFace)" opacity="0.9" />

          {/* Top Parapet Section */}
          <polygon points="52,135 168,135 165,80 55,80" fill="url(#towerLitFace)" stroke="#16201A" strokeWidth="1" />
          <polygon points="110,135 168,135 165,80 110,80" fill="url(#towerShadowFace)" opacity="0.88" />

          {/* Stepped Stone Slate Pyramid Roof */}
          <polygon points="110,5 45,80 175,80" fill="url(#towerLitFace)" stroke="#0E1612" strokeWidth="2" />
          <polygon points="110,5 110,80 175,80" fill="url(#towerShadowFace)" opacity="0.92" />
          {/* Stepped slate slate lines */}
          <line x1="60" y1="62" x2="160" y2="62" stroke="#16201A" strokeWidth="2" />
          <line x1="75" y1="44" x2="145" y2="44" stroke="#16201A" strokeWidth="2" />
          <line x1="92" y1="25" x2="128" y2="25" stroke="#16201A" strokeWidth="2" />

          {/* Pinnacle Spire on Roof */}
          <line x1="110" y1="5" x2="110" y2="-12" stroke="#D4B263" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="110" cy="-12" r="4.5" fill="#F9E2A2" stroke="#9C792E" strokeWidth="1" />

          {/* Windows, Balcony & Openings */}
          {/* Ground Arched Entry Doorway */}
          <path d="M98,555 L98,495 Q110,480 122,495 L122,555 Z" fill="#040C08" stroke="#3A463E" strokeWidth="2.5" />

          {/* Lower Defensive Slit */}
          <rect x="105" y="380" width="10" height="34" rx="3" fill="#040C08" stroke="#3A463E" strokeWidth="1.5" />

          {/* Cantilevered Wooden Balcony / Window on Upper Level */}
          <rect x="96" y="250" width="28" height="42" rx="3" fill="#040C08" stroke="#3A463E" strokeWidth="2" />
          <rect x="90" y="288" width="40" height="8" fill="#1C1810" stroke="#000000" strokeWidth="1" />
          <rect x="92" y="270" width="36" height="4" fill="#3D3425" />
          <line x1="96" y1="274" x2="96" y2="288" stroke="#3D3425" strokeWidth="2" />
          <line x1="124" y1="274" x2="124" y2="288" stroke="#3D3425" strokeWidth="2" />

          {/* Top Machicolation Window */}
          <rect x="104" y="98" width="12" height="24" rx="2" fill="#040C08" />
        </g>

        {/* 6. Magnificent Waving Circassian Flag on Left */}
        <g id="circassian-waving-flag" opacity="0.95">
          {/* Silk Flag Flow Shape */}
          <path
            d="M0,0 L980,0 Q880,240 960,440 T840,860 Q720,1020 0,1080 Z"
            fill="url(#flagSilkBase)"
          />

          {/* Fabric Wave Shading / Folds Highlights */}
          <path
            d="M0,0 L600,0 Q680,260 560,520 T720,1080 L0,1080 Z"
            fill="url(#flagFoldHighlight)"
          />
          <path
            d="M300,0 Q460,300 380,620 T520,1080 L0,1080 Z"
            fill="url(#flagFoldHighlight)"
            opacity="0.6"
          />

          {/* Authentic Circassian Traditional Geometric Lace / Embroidery on Left Margin */}
          <g transform="translate(30, 30)" opacity="0.32" stroke="#D4B263" strokeWidth="2" fill="none">
            {/* Traditional Tamga / Circassian ornamental diamond hooks */}
            <path d="M10,20 L35,45 L10,70 L35,95 L10,120 L35,145 L10,170 L35,195 L10,220 L35,245 L10,270 L35,295 L10,320 L35,345 L10,370 L35,395 L10,420 L35,445 L10,470 L35,495 L10,520 L35,545 L10,570 L35,595 L10,620 L35,645 L10,670 L35,695 L10,720 L35,745 L10,770 L35,795 L10,820 L35,845 L10,870 L35,895 L10,920 L35,945 L10,970 L35,995" />
            <path d="M45,20 L70,45 L45,70 L70,95 L45,120 L70,145 L45,170 L70,195 L45,220 L70,245 L45,270 L70,295 L45,320 L70,345 L45,370 L70,395 L45,420 L70,445 L45,470 L70,495 L45,520 L70,545 L45,570 L70,595 L45,620 L70,645 L45,670 L70,695 L45,720 L70,745 L45,770 L70,795 L45,820 L70,845 L45,870 L70,895 L45,920 L70,945 L45,970 L70,995" />
            <line x1="25" y1="0" x2="25" y2="1020" strokeWidth="1.5" />
            <line x1="58" y1="0" x2="58" y2="1020" strokeWidth="1.5" />

            {/* Cross-woven diamond ornaments */}
            {[60, 160, 260, 360, 460, 560, 660, 760, 860, 960].map((y, idx) => (
              <polygon key={idx} points={`25,${y} 42,${y+15} 25,${y+30} 8,${y+15}`} fill="#D4B263" opacity="0.2" />
            ))}
          </g>

          {/* Golden Circassian Emblem: 12 Stars and 3 Crossed Arrows */}
          <g id="flag-gold-stars-and-arrows" transform="translate(560, 460) scale(1.45)">
            {/* 3 Crossed Arrows in Center */}
            <g stroke="url(#goldStarShimmer)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Vertical Center Arrow (Pointing downwards into apex) */}
              <line x1="0" y1="-80" x2="0" y2="90" />
              {/* Central Arrow Point */}
              <polygon points="0,95 -14,68 0,76 14,68" fill="url(#goldStarShimmer)" stroke="none" />
              {/* Central Arrow Feathers / Nock at top */}
              <line x1="0" y1="-65" x2="-14" y2="-78" />
              <line x1="0" y1="-65" x2="14" y2="-78" />
              <line x1="0" y1="-50" x2="-14" y2="-63" />
              <line x1="0" y1="-50" x2="14" y2="-63" />

              {/* Diagonal Arrow 1: Left to Right */}
              <line x1="-70" y1="-60" x2="65" y2="70" />
              <polygon points="70,75 42,66 54,58 56,44" fill="url(#goldStarShimmer)" stroke="none" />
              <line x1="-55" y1="-48" x2="-68" y2="-40" />
              <line x1="-55" y1="-48" x2="-52" y2="-62" />

              {/* Diagonal Arrow 2: Right to Left */}
              <line x1="70" y1="-60" x2="-65" y2="70" />
              <polygon points="-70,75 -42,66 -54,58 -56,44" fill="url(#goldStarShimmer)" stroke="none" />
              <line x1="55" y1="-48" x2="68" y2="-40" />
              <line x1="55" y1="-48" x2="52" y2="-62" />
            </g>

            {/* 12 Golden 5-Pointed Stars in Classic Arc */}
            {/* Top Outer Arc (9 Stars) + Inner Row (3 Stars) */}
            {[
              // Outer Arc (9 stars from left to right)
              { x: -160, y: -45, s: 12, rot: -40 },
              { x: -130, y: -90, s: 13, rot: -30 },
              { x: -90, y: -125, s: 13.5, rot: -20 },
              { x: -46, y: -145, s: 14, rot: -10 },
              { x: 0, y: -152, s: 15, rot: 0 },
              { x: 46, y: -145, s: 14, rot: 10 },
              { x: 90, y: -125, s: 13.5, rot: 20 },
              { x: 130, y: -90, s: 13, rot: 30 },
              { x: 160, y: -45, s: 12, rot: 40 },
              // Inner Row (3 stars beneath apex)
              { x: -55, y: -92, s: 12, rot: -15 },
              { x: 0, y: -100, s: 13, rot: 0 },
              { x: 55, y: -92, s: 12, rot: 15 },
            ].map((star, idx) => (
              <g key={idx} transform={`translate(${star.x}, ${star.y}) rotate(${star.rot}) scale(${star.s})`}>
                <polygon
                  points="0,-1 0.29,-0.3 0.95,-0.3 0.42,0.1 0.62,0.7 0,0.3 -0.62,0.7 -0.42,0.1 -0.95,-0.3 -0.29,-0.3"
                  fill="url(#goldStarShimmer)"
                  stroke="#573E0F"
                  strokeWidth="0.05"
                />
              </g>
            ))}
          </g>
        </g>

        {/* 7. Atmospheric Volumetric Light Beams */}
        <g opacity="0.14">
          <polygon points="1920,0 900,1080 1250,1080 1920,250" fill="#F9E2A2" />
          <polygon points="1700,0 500,1080 800,1080 1920,120" fill="#F9E2A2" />
        </g>

        {/* 8. Vignette Edge Shadows */}
        <rect width="1920" height="1080" fill="url(#vignetteShadow)" />
      </svg>
    </div>
  );
};
