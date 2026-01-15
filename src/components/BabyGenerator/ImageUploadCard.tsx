import { useRef } from 'react'

interface ImageUploadCardProps {
  label: string
  image: string | null
  onImageChange: (image: string | null) => void
}

export default function ImageUploadCard({ label, image, onImageChange }: ImageUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onImageChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="bg-white rounded-2xl px-6 py-10 flex flex-col items-center gap-4 border border-[#E3E3E3] cursor-pointer hover:border-primary-300 transition-colors"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden ${image ? '' : 'border-2 border-dashed border-primary-300 bg-primary-100'}`}>
        {image ? (
          <img src={image} alt={label} className="w-full h-full object-cover" />
        ) : (
          <img src="/camera.svg" />
        )}
      </div>
      <span className="font-bold">{label}</span>
    </div>
  )
}
