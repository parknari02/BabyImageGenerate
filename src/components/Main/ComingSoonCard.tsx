interface ComingSoonCardProps {
  title: string
  description: string
}

export default function ComingSoonCard({ title, description }: ComingSoonCardProps) {
  return (
    <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/60 text-lg font-medium">Coming Soon</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white/60 text-xl font-bold mb-1">{title}</h3>
        <p className="text-white/40 text-sm">{description}</p>
      </div>
    </div>
  )
}
