'use client';

function FilmReel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const inner = r * 0.76;
  const hub = r * 0.3;
  const holeRad = r * 0.55;
  const holeR = r * 0.09;

  return (
    <g opacity={0.55}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#a0a0d0" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={inner} fill="none" stroke="#a0a0d0" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={hub} fill="#2a2560" stroke="#a0a0d0" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={hub * 0.38} fill="#10102a" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={cx + hub * Math.cos(rad)}
            y1={cy + hub * Math.sin(rad)}
            x2={cx + inner * Math.cos(rad)}
            y2={cy + inner * Math.sin(rad)}
            stroke="#a0a0d0"
            strokeWidth={1.8}
          />
        );
      })}
      {[30, 90, 150, 210, 270, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle
            key={angle}
            cx={cx + holeRad * Math.cos(rad)}
            cy={cy + holeRad * Math.sin(rad)}
            r={holeR}
            fill="#10102a"
            stroke="#a0a0d0"
            strokeWidth={1.2}
          />
        );
      })}
    </g>
  );
}

export default function CinemaBackground() {
  const bgStars: [number, number, number, number][] = [
    [45, 28, 1.2, 0.8], [115, 75, 1.8, 0.9], [195, 18, 1, 0.65],
    [275, 55, 1.2, 0.85], [345, 28, 2.2, 0.9], [415, 48, 1, 0.55],
    [175, 115, 1.6, 0.75], [88, 145, 1.2, 0.65], [238, 165, 1, 0.8],
    [308, 138, 1.6, 0.7], [1095, 38, 1.6, 0.82], [1198, 18, 1, 0.6],
    [1298, 68, 1, 0.9], [1378, 38, 2.2, 0.72], [1048, 98, 1, 0.55],
    [1148, 128, 1.6, 0.8], [1248, 148, 1, 0.62], [1348, 158, 1, 0.72],
    [68, 218, 1, 0.52], [158, 258, 1.6, 0.72], [1278, 218, 1, 0.62],
    [1368, 248, 1.6, 0.82], [478, 38, 1, 0.72], [558, 18, 1.6, 0.62],
    [62, 320, 1.2, 0.45], [1380, 320, 1.2, 0.45], [1410, 420, 1, 0.35],
    [28, 420, 1, 0.35],
  ];

  const screenStars: [number, number, number][] = [
    [488, 103, 1], [578, 86, 1.6], [678, 116, 1], [788, 91, 1],
    [888, 106, 1.6], [988, 126, 1], [538, 146, 1], [638, 96, 1],
    [838, 136, 1], [938, 86, 1.6], [748, 73, 1], [1048, 98, 1.2],
    [468, 135, 1], [1075, 128, 1],
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 810"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        {/* Background */}
        <linearGradient id="ci-bg" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#0a0618" />
          <stop offset="45%" stopColor="#0d1030" />
          <stop offset="100%" stopColor="#150820" />
        </linearGradient>

        {/* Screen sky gradient */}
        <linearGradient id="ci-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080e28" />
          <stop offset="100%" stopColor="#0a1530" />
        </linearGradient>

        {/* Screen soft aura */}
        <radialGradient id="ci-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3858c8" stopOpacity={0.38} />
          <stop offset="100%" stopColor="#3858c8" stopOpacity={0} />
        </radialGradient>

        {/* Projector beam */}
        <linearGradient id="ci-beam" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffae0" stopOpacity={0.28} />
          <stop offset="100%" stopColor="#fffae0" stopOpacity={0} />
        </linearGradient>

        {/* Seat gradient */}
        <linearGradient id="ci-seat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221e52" />
          <stop offset="100%" stopColor="#130f35" />
        </linearGradient>

        {/* Vignette */}
        <radialGradient id="ci-vig" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stopColor="#000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={0.6} />
        </radialGradient>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width={1440} height={810} fill="url(#ci-bg)" />

      {/* ── AMBIENT STARFIELD ── */}
      {bgStars.map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#e8e8ff" opacity={o} />
      ))}

      {/* ── SCREEN GLOW ── */}
      <ellipse cx={720} cy={300} rx={440} ry={310} fill="url(#ci-aura)" />

      {/* ── CURTAINS ── */}
      <path
        d="M305 55 Q270 210 292 460 L335 460 Q318 210 348 55Z"
        fill="#1c0a38"
        opacity={0.9}
      />
      <path
        d="M1135 55 Q1170 210 1148 460 L1105 460 Q1122 210 1092 55Z"
        fill="#1c0a38"
        opacity={0.9}
      />
      {/* Curtain top rod */}
      <rect x={270} y={48} width={900} height={16} rx={5} fill="#2a2060" />
      <circle cx={270} cy={56} r={9} fill="#3a3080" />
      <circle cx={1170} cy={56} r={9} fill="#3a3080" />

      {/* ── SCREEN ── */}
      <rect x={330} y={58} width={780} height={395} fill="#070e24" />
      {/* Sky */}
      <rect x={330} y={58} width={780} height={290} fill="url(#ci-sky)" />
      {/* Ground */}
      <rect x={330} y={348} width={780} height={105} fill="#05080f" />

      {/* Mountain silhouettes */}
      <polygon points="330,388 450,182 572,388" fill="#0c1828" />
      <polygon points="458,388 605,152 750,388" fill="#101d32" />
      <polygon points="625,388 768,168 910,388" fill="#0c1828" />
      <polygon points="805,388 928,208 1048,388" fill="#101d32" />
      <polygon points="975,388 1065,242 1110,388" fill="#0c1828" />

      {/* Moon */}
      <circle cx={432} cy={132} r={50} fill="#18284a" />
      <circle cx={452} cy={118} r={43} fill="#070e24" />

      {/* Stars on screen */}
      {screenStars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#7090d0" opacity={0.85} />
      ))}

      {/* Screen border */}
      <rect
        x={330} y={58} width={780} height={395}
        fill="none" stroke="#2840a8" strokeWidth={3}
      />
      <rect
        x={333} y={61} width={774} height={389}
        fill="none" stroke="#5070d8" strokeWidth={0.8} opacity={0.45}
      />

      {/* Speaker bar below screen */}
      <rect x={565} y={455} width={310} height={9} rx={3} fill="#151030" />
      <rect x={572} y={458} width={296} height={3} rx={2} fill="#201c48" />

      {/* ── PROJECTOR BEAM ── */}
      <polygon points="1405,0 692,418 772,458" fill="url(#ci-beam)" />

      {/* ── PROJECTOR ── */}
      <rect x={1342} y={-8} width={104} height={62} rx={11} fill="#181438" stroke="#3030a8" strokeWidth={1.5} />
      {/* Lens rings */}
      <circle cx={1358} cy={23} r={22} fill="#1e1a50" stroke="#3838b8" strokeWidth={1.5} />
      <circle cx={1358} cy={23} r={15} fill="#2e2ea0" stroke="#5050c8" strokeWidth={1} />
      <circle cx={1358} cy={23} r={8} fill="#5858d8" opacity={0.9} />
      <circle cx={1358} cy={23} r={3.5} fill="#b8b8ff" opacity={0.95} />
      {/* Lens glint */}
      <circle cx={1352} cy={17} r={3.5} fill="#fff" opacity={0.22} />
      {/* Vent lines */}
      {[10, 17, 24, 31, 38, 45].map((ly) => (
        <line key={ly} x1={1383} y1={ly} x2={1435} y2={ly} stroke="#2828a8" strokeWidth={0.9} opacity={0.65} />
      ))}
      {/* Stand */}
      <rect x={1385} y={54} width={16} height={30} rx={2} fill="#181438" />
      <rect x={1375} y={84} width={36} height={7} rx={3} fill="#181438" />

      {/* ── SEATS ── */}
      {/* Row 1 */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 80 + i * 54;
        return (
          <g key={i}>
            <rect x={x} y={528} width={40} height={27} rx={5} fill="url(#ci-seat)" />
            <rect x={x + 2} y={552} width={36} height={14} rx={3} fill="#181540" />
            <rect x={x + 6} y={566} width={4} height={9} rx={1} fill="#0e0c2a" />
            <rect x={x + 30} y={566} width={4} height={9} rx={1} fill="#0e0c2a" />
          </g>
        );
      })}
      {/* Row 2 */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x = 65 + i * 60;
        return (
          <g key={i}>
            <rect x={x} y={592} width={46} height={31} rx={6} fill="url(#ci-seat)" />
            <rect x={x + 2} y={620} width={42} height={16} rx={4} fill="#181540" />
            <rect x={x + 7} y={636} width={5} height={11} rx={1} fill="#0e0c2a" />
            <rect x={x + 34} y={636} width={5} height={11} rx={1} fill="#0e0c2a" />
          </g>
        );
      })}
      {/* Row 3 */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 50 + i * 67;
        return (
          <g key={i}>
            <rect x={x} y={662} width={52} height={35} rx={7} fill="url(#ci-seat)" />
            <rect x={x + 3} y={694} width={46} height={18} rx={5} fill="#181540" />
          </g>
        );
      })}

      {/* ── FLOOR ── */}
      <rect x={0} y={728} width={1440} height={82} fill="#060610" />
      <rect x={0} y={728} width={1440} height={2} fill="#2020508a" />

      {/* ── FILM REELS ── */}
      <FilmReel cx={108} cy={388} r={84} />
      <FilmReel cx={1332} cy={388} r={84} />

      {/* ── FILM STRIPS (bottom) ── */}
      {/* Left */}
      <rect x={0} y={462} width={298} height={48} fill="#10103a" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={8 + i * 42} y={470} width={32} height={32} rx={2} fill="#0a0a28" stroke="#282868" strokeWidth={1} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x={4 + i * 37} y={462} width={9} height={5} rx={1.5} fill="#060618" />
          <rect x={4 + i * 37} y={505} width={9} height={5} rx={1.5} fill="#060618" />
        </g>
      ))}
      {/* Right */}
      <rect x={1142} y={462} width={298} height={48} fill="#10103a" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={1150 + i * 42} y={470} width={32} height={32} rx={2} fill="#0a0a28" stroke="#282868" strokeWidth={1} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x={1145 + i * 37} y={462} width={9} height={5} rx={1.5} fill="#060618" />
          <rect x={1145 + i * 37} y={505} width={9} height={5} rx={1.5} fill="#060618" />
        </g>
      ))}

      {/* ── CLAPPERBOARD (decorative) ── */}
      <g transform="translate(148,252) rotate(-13)">
        <rect x={0} y={28} width={90} height={70} rx={4} fill="#18143a" stroke="#3030a8" strokeWidth={1.5} />
        {[44, 56, 68, 80].map((ly) => (
          <line key={ly} x1={5} y1={ly} x2={85} y2={ly} stroke="#202060" strokeWidth={1} />
        ))}
        <rect x={0} y={11} width={90} height={19} rx={3} fill="#18143a" stroke="#3030a8" strokeWidth={1.5} />
        {[0, 1, 2, 3, 4, 5].map((j) => (
          <rect
            key={j}
            x={j * 15}
            y={11}
            width={8}
            height={19}
            fill={j % 2 === 0 ? '#ffffff' : '#18143a'}
            opacity={j % 2 === 0 ? 0.2 : 1}
          />
        ))}
        <rect x={0} y={9} width={90} height={3} rx={1.5} fill="#3030a8" />
      </g>

      {/* ── POPCORN (decorative) ── */}
      <g transform="translate(1258,220)">
        <path d="M0 44 L12 94 L58 94 L70 44 Z" fill="#c03c16" />
        <path d="M12 44 L17 94 L27 94 L22 44 Z" fill="#e04820" opacity={0.75} />
        <path d="M32 44 L35 94 L45 94 L42 44 Z" fill="#e04820" opacity={0.75} />
        <path d="M52 44 L53 94 L63 94 L62 44 Z" fill="#e04820" opacity={0.75} />
        <rect x={-4} y={40} width={78} height={8} rx={3} fill="#9a2e10" />
        <ellipse cx={14} cy={34} rx={13} ry={11} fill="#ede05a" />
        <ellipse cx={35} cy={26} rx={15} ry={13} fill="#f5e570" />
        <ellipse cx={57} cy={32} rx={13} ry={11} fill="#ede05a" />
        <ellipse cx={24} cy={19} rx={11} ry={10} fill="#f5e570" />
        <ellipse cx={47} cy={15} rx={12} ry={11} fill="#fad848" />
        <ellipse cx={7} cy={24} rx={9} ry={8} fill="#f5e570" />
        <ellipse cx={64} cy={22} rx={9} ry={8} fill="#ede05a" />
      </g>

      {/* ── VIGNETTE ── */}
      <rect width={1440} height={810} fill="url(#ci-vig)" />
    </svg>
  );
}
