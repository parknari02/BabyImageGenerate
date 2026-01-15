interface GenderToggleProps {
  selectedGender: 'girl' | 'boy'
  onGenderChange: (gender: 'girl' | 'boy') => void
}

export default function GenderToggle({ selectedGender, onGenderChange }: GenderToggleProps) {
  return (
    <div className="flex justify-center mb-2">
      <div className="bg-white rounded-full p-1 flex gap-1 border border-gray-200">
        <button
          onClick={() => onGenderChange('girl')}
          className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedGender === 'girl'
              ? 'bg-primary-500 text-white'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          여자아이
        </button>
        <button
          onClick={() => onGenderChange('boy')}
          className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedGender === 'boy'
              ? 'bg-primary-500 text-white'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          남자아이
        </button>
      </div>
    </div>
  )
}
