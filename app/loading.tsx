export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-bg">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-gradient shadow-glow-accent">
        <svg fill="none" height="44" viewBox="0 0 24 24" width="44" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Z"
            stroke="#fff"
            strokeWidth="1.4"
          />
          <path d="m10.5 11 4 2.3-4 2.3v-4.6Z" fill="#fff" />
        </svg>
      </div>

      <div className="loader" />

      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-text-2">
          Loading
        </p>
        <p className="text-sm text-text-3">Preparing your next watch…</p>
      </div>
    </div>
  );
}
