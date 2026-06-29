'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'
import { type MouseEvent, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'accent'

interface ButtonProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  variant: ButtonVariant
  children: ReactNode
  href?: string
  submit?: boolean
  fullWidth?: boolean
  label?: string
}

export function Button({
  variant,
  children,
  href,
  submit,
  fullWidth,
  label,
  className = '',
  onClick,
  ...rest
}: ButtonProps) {
  const baseClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'accent'
        ? 'hero-waitlist-btn'
        : 'btn-ghost'
  const widthClass = fullWidth ? 'w-full block' : ''
  const combined = `${baseClass} ${widthClass} ${className}`.trim()

  if (submit && typeof children === 'string') {
    return (
      <motion.input
        type="submit"
        value={children}
        aria-label={label ?? children}
        className={combined}
        whileHover={{ opacity: 0.9 }}
        {...(rest as HTMLMotionProps<'input'>)}
      />
    )
  }

  if (href) {
    return (
      <motion.span whileHover={{ opacity: 0.9 }} className={fullWidth ? 'block w-full' : 'inline-block'}>
        <Link href={href} className={combined} onClick={onClick as undefined}>
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.span
      role="button"
      tabIndex={0}
      className={combined}
      whileHover={{ opacity: 0.9 }}
      onClick={onClick}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && onClick) {
          event.preventDefault()
          onClick(event as unknown as MouseEvent<HTMLSpanElement>)
        }
      }}
      {...rest}
    >
      {children}
    </motion.span>
  )
}

export default Button
