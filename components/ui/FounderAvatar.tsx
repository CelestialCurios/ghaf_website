interface FounderAvatarProps {
  initials: string
  name: string
}

export default function FounderAvatar({ initials, name }: FounderAvatarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-dim bg-dim-bg font-grotesk text-[11px] font-bold text-cream"
        aria-hidden="true"
      >
        {initials}
      </div>
      <span className="type-caption normal-case tracking-normal">{name}</span>
    </div>
  )
}
