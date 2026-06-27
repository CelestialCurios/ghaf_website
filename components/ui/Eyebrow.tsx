interface EyebrowProps {
  children: string
}

export default function Eyebrow({ children }: EyebrowProps) {
  return <p className="type-eyebrow">{children}</p>
}
