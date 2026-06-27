interface FeatureCardProps {
  icon: string
  title: string
  description: string
  tag: string
  fullWidth?: boolean
  dark?: boolean
}

export default function FeatureCard({
  icon,
  title,
  description,
  tag,
  fullWidth = false,
  dark = false,
}: FeatureCardProps) {
  return (
    <article
      className={`card-bordered p-[var(--card-padding)] border-l-2 border-l-cream ${fullWidth ? 'md:col-span-2' : ''} ${dark ? 'bg-bg-dark' : ''}`}
    >
      <div className="mb-3 text-xl" aria-hidden="true">
        {icon}
      </div>
      <h3 className="type-h3 mb-2">{title}</h3>
      <p className="type-body mb-4">{description}</p>
      <span className="type-caption">{tag}</span>
    </article>
  )
}
