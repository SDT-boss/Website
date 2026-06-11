export function WhoThisIsFor({ text, label }: { text: string; label: string }) {
  return (
    <section className="py-12 md:py-16 px-6 bg-background">
      <div className="mx-auto max-w-content">
        <div className="border-l-2 border-cyber-jade pl-4 py-2">
          <p className="text-xs font-normal tracking-widest uppercase text-text-secondary mb-2">
            {label}
          </p>
          <p className="text-base font-normal leading-relaxed text-text-secondary">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
