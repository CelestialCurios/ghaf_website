'use client'

interface CursorCloudProps {
  x: number
  y: number
  visible: boolean
}

export default function CursorCloud({ x, y, visible }: CursorCloudProps) {
  return (
    <div
      className="pointer-events-none fixed z-[100] h-5 w-5"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        visibility: visible ? 'visible' : 'hidden',
      }}
      aria-hidden="true"
    >
      <div className="cursor-cloud" />
    </div>
  )
}
