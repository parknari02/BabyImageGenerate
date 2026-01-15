interface StyleSelectorProps {
  styleType: 'realistic' | 'character'
  onStyleChange: (style: 'realistic' | 'character') => void
}

export default function StyleSelector({ styleType, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <h2 className="text-gray-800 font-medium mb-4">스타일 선택</h2>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onStyleChange('realistic')}
          className={`cursor-pointer p-4 rounded-xl border-1 text-center transition-all ${styleType === 'realistic'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200'
            }`}
        >
          <span className={`font-medium ${styleType === 'realistic' ? 'text-primary-500' : 'text-gray-600'}`}>
            실사
          </span>
        </button>
        <button
          onClick={() => onStyleChange('character')}
          className={`cursor-pointer p-4 rounded-xl border-1 text-center transition-all ${styleType === 'character'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200'
            }`}
        >
          <span className={`font-medium ${styleType === 'character' ? 'text-primary-500' : 'text-gray-600'}`}>
            캐릭터
          </span>
        </button>
      </div>
    </div>
  )
}
