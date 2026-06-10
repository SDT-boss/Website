interface SolutionCardProps {
  icon: string;
  title: string;
  desc: string;
  tag: string;
}

export function SolutionCard({ icon, title, desc, tag }: SolutionCardProps) {
  return (
    <div className="bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 hover:border-cyber-jade transition-colors duration-150 ease-out">
      {/* Icon */}
      <span className="text-2xl" aria-hidden="true">{icon}</span>

      {/* Title */}
      <h3 className="text-lg font-bold tracking-tight leading-snug">{title}</h3>

      {/* Description */}
      <p className="text-base font-medium leading-relaxed text-text-secondary flex-1">{desc}</p>

      {/* Tag — grid-violet soft pill */}
      <span className="self-start text-xs font-medium bg-grid-violet/10 text-grid-violet px-2 py-1 rounded">
        {tag}
      </span>
    </div>
  );
}
