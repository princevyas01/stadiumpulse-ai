interface Props {
  briefing: string;
  isLoading: boolean;
}

export function ExecutiveBriefingCard({ briefing, isLoading }: Props) {
  return (
    <section aria-label="AI executive briefing" aria-live="polite" className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 mt-6 shadow-soft">
      <p className="text-xs font-mono uppercase text-theme-text-secondary opacity-70 mb-2">Executive Briefing</p>
      {isLoading ? (
        <p className="text-sm text-theme-text-secondary opacity-70">Generating briefing…</p>
      ) : (
        <p className="text-base text-theme-text-primary dark:text-theme-light leading-relaxed">{briefing}</p>
      )}
    </section>
  );
}
