import { useState, useRef } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [dadImage, setDadImage] = useState<string | null>(null)
  const [momImage, setMomImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [girlImage, setGirlImage] = useState<string | null>(null)
  const [boyImage, setBoyImage] = useState<string | null>(null)
  const [styleType, setStyleType] = useState<'realistic' | 'character'>('realistic')
  const [selectedGender, setSelectedGender] = useState<'girl' | 'boy'>('girl')

  const dadInputRef = useRef<HTMLInputElement>(null)
  const momInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (image: string | null) => void
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateBabyImage = async () => {
    if (!dadImage || !momImage) {
      alert('아빠와 엄마 사진을 모두 업로드해주세요!')
      return
    }

    setIsLoading(true)

    try {
      // data URL에서 base64 부분만 추출
      const characterImage = dadImage.split(',')[1]
      const userImage = momImage.split(',')[1]

      console.log(styleType)

      const response = await fetch(`${API_URL}/generateBaby`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterImage,
          userImage,
          style: styleType,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGirlImage(`data:image/jpeg;base64,${data.girlImage}`)
        setBoyImage(`data:image/jpeg;base64,${data.boyImage}`)
        setSelectedGender('girl')
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('이미지 생성 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setGirlImage(null)
    setBoyImage(null)
    setDadImage(null)
    setMomImage(null)
  }

  const currentImage = selectedGender === 'girl' ? girlImage : boyImage

  // 결과 페이지
  if (girlImage && boyImage) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[500px] min-h-screen bg-primary-50 flex flex-col gap-4 px-5 py-8">
          {/* Title */}
          <div className="text-center mt-10">
            <h1 className="relative text-[20px] font-bold text-black leading-normal tracking-[-0.54px]">
              <span className="relative">
                <span className="absolute inset-0 bg-primary-300/20 blur-xl pointer-events-none" />
                <span className="relative">우리 아이의 모습이에요!</span>
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">AI가 예측한 사진입니다</p>
          </div>
          {/* Result */}
          <div className="flex flex-col items-center justify-center gap-4 mt-12">
            {/* Gender Toggle */}
            <div className="flex justify-center mb-2">
              <div className="bg-white rounded-full p-1 flex gap-1 border border-gray-200">
                <button
                  onClick={() => setSelectedGender('girl')}
                  className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedGender === 'girl'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  여자아이
                </button>
                <button
                  onClick={() => setSelectedGender('boy')}
                  className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedGender === 'boy'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  남자아이
                </button>
              </div>
            </div>

            <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={currentImage!}
                alt={`생성된 ${selectedGender === 'girl' ? '여자' : '남자'}아이 이미지`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* 업로드한 사진 */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500">
                  <img src={dadImage!} alt="캐릭터" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-500">캐릭터</span>
              </div>
              <span className="text-primary-500 text-2xl">+</span>
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500">
                  <img src={momImage!} alt="내 얼굴" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-500">내 얼굴</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-auto pt-8">
            <div className="grid grid-cols-2 gap-3">
              <button
                className="cursor-pointer w-full bg-white border border-[#E3E3E3] hover:bg-gray-50 text-[15px] text-gray-700 font-medium py-4 rounded-[10px] transition-colors"
              >
                저장하기
              </button>
              <button
                className="cursor-pointer w-full bg-white border border-[#E3E3E3] hover:bg-gray-50 text-[15px] text-gray-700 font-medium py-4 rounded-[10px] transition-colors"
              >
                공유하기
              </button>
            </div>
            <button
              onClick={handleReset}
              className="cursor-pointer w-full bg-primary-500 hover:bg-primary-600 text-[15px] text-white font-medium py-4 rounded-[10px] transition-colors"
            >
              다시 만들기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* 로딩 스피너 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
            <p className="text-gray-700 font-medium">이미지 생성 중...</p>
            <p className="text-gray-400 text-sm">잠시만 기다려주세요</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-[500px] min-h-screen bg-primary-50 flex flex-col gap-4 px-5 py-8">
        {/* Header */}
        <div className="flex items-center mb-14">
          <span className="text-lg font-semibold">
            미래 2세 만들기
          </span>
          <img src="/logo.svg" />
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="relative text-[20px] font-bold text-black leading-normal tracking-[-0.54px]">
            <span className="relative">
              <span className="absolute inset-0 bg-primary-300/20 blur-xl pointer-events-none" />
              <span className="relative">캐릭터와 나의 2세는 어떻게 생겼을까?</span>
            </span>
            <br />
            <span className="relative">
              <span className="absolute inset-0 bg-primary-300/20 blur-xl pointer-events-none" />
              <span className="relative">AI가 예측하는 우리 아이 얼굴을 확인해보세요!</span>
            </span>
          </h1>
        </div>

        {/* Photo Upload Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* 아빠 카드 */}
          <div
            onClick={() => dadInputRef.current?.click()}
            className="bg-white rounded-2xl px-6 py-10 flex flex-col items-center gap-4 border border-[#E3E3E3] cursor-pointer hover:border-primary-300 transition-colors"
          >
            <input
              ref={dadInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setDadImage)}
              className="hidden"
            />
            <div className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden ${dadImage ? '' : 'border-2 border-dashed border-primary-300 bg-primary-100'}`}>
              {dadImage ? (
                <img src={dadImage} alt="아빠" className="w-full h-full object-cover" />
              ) : (
                <img src="/camera.svg" />
              )}
            </div>
            <span className="font-bold">캐릭터</span>
          </div>

          {/* 엄마 카드 */}
          <div
            onClick={() => momInputRef.current?.click()}
            className="bg-white rounded-2xl px-6 py-10 flex flex-col items-center gap-4 border border-[#E3E3E3] cursor-pointer hover:border-primary-300 transition-colors"
          >
            <input
              ref={momInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setMomImage)}
              className="hidden"
            />
            <div className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden ${momImage ? '' : 'border-2 border-dashed border-primary-300 bg-primary-100'}`}>
              {momImage ? (
                <img src={momImage} alt="엄마" className="w-full h-full object-cover" />
              ) : (
                <img src="/camera.svg" />
              )}
            </div>
            <span className="font-bold">내 얼굴</span>
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-primary-100 rounded-xl px-3 py-4 flex items-center gap-1">
          <img src="/info.svg" />
          <span className="text-primary-600 text-sm">이목구비가 선명하게 나온 사진을 업로드해주세요!</span>
        </div>

        {/* Style Type Selection */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-gray-800 font-medium mb-4">스타일 선택</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStyleType('realistic')}
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
              onClick={() => setStyleType('character')}
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
        {/* Model Selection */}
        {/* <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-gray-800 font-medium mb-4">생성 모델 선택</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedModel('imagen2.5')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${selectedModel === 'imagen2.5'
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-200'
                }`}
            >
              <span className={`font-medium ${selectedModel === 'imagen2.5' ? 'text-primary-500' : 'text-gray-600'}`}>
                Imagen 2.5
              </span>
            </button>
            <button
              onClick={() => setSelectedModel('imagen3')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${selectedModel === 'imagen3'
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-200'
                }`}
            >
              <span className={`font-medium ${selectedModel === 'imagen3' ? 'text-primary-500' : 'text-gray-600'}`}>
                Imagen 3
              </span>
            </button>
          </div>
        </div> */}

        {/* Generate Button */}
        <div className="mt-auto pt-8">
          <button
            onClick={generateBabyImage}
            disabled={isLoading}
            className="cursor-pointer w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-[15px] text-white font-medium py-4 rounded-[10px] transition-colors"
          >
            미래 2세 생성하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
