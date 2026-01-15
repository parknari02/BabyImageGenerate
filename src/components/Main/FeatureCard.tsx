import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface FeatureCardProps {
  title: string
  description: string
  backgroundImage?: string
  backgroundColor?: string
  to: string
  children?: ReactNode
}

export default function FeatureCard({
  title,
  description,
  backgroundImage,
  backgroundColor = 'bg-white',
  to,
  children,
}: FeatureCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(to)}
      className={`relative w-full aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] ${backgroundColor}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Decorative content */}
      {children}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  )
}
