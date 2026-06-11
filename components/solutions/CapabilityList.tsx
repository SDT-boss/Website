interface Capability {
  num: string;
  title: string;
  body: string;
}

export function CapabilityList({ capabilities }: { capabilities: Capability[] }) {
  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-8">
          {capabilities.map((cap) => (
            <div key={cap.num} className="flex flex-col gap-3">
              <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
                {cap.num}
              </span>
              <h3 className="text-base font-bold">{cap.title}</h3>
              <p className="text-base font-normal leading-relaxed text-text-secondary">
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
