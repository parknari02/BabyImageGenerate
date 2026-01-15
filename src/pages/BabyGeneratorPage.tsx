import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUploadCard from '../components/BabyGenerator/ImageUploadCard'
import StyleSelector from '../components/BabyGenerator/StyleSelector'
import GenderToggle from '../components/BabyGenerator/GenderToggle'
import LoadingSpinner from '../components/common/LoadingSpinner'

const API_URL = import.meta.env.VITE_API_URL

export default function BabyGeneratorPage() {
  const navigate = useNavigate()
  const [dadImage, setDadImage] = useState<string | null>(null)
  const [momImage, setMomImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [girlImage, setGirlImage] = useState<string | null>(null)
  const [boyImage, setBoyImage] = useState<string | null>(null)
  const [styleType, setStyleType] = useState<'realistic' | 'character'>('realistic')
  const [selectedGender, setSelectedGender] = useState<'girl' | 'boy'>('girl')

  const generateBabyImage = async () => {
    if (!dadImage || !momImage) {
      alert('아빠와 엄마 사진을 모두 업로드해주세요!')
      return
    }

    setIsLoading(true)

    try {
      const characterImage = dadImage.split(',')[1]
      const userImage = momImage.split(',')[1]

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
                <span className="absolute inset-0 bg-primary-500/30 blur-xl pointer-events-none" />
                <span className="relative">우리 아이의 모습이에요!</span>
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">AI가 예측한 사진입니다</p>
          </div>
          {/* Result */}
          <div className="flex flex-col items-center justify-center gap-4 mt-12">
            <GenderToggle
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
            />

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
      {isLoading && <LoadingSpinner />}

      <div className="w-full max-w-[500px] min-h-screen bg-primary-50 flex flex-col gap-4 px-5 py-8">
        {/* Header */}
        <div className="flex items-center mb-14">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
          >
            <img src="/left-arrow.svg" alt="뒤로가기" className='mb-[2px]' />
          </button>
          <span className="text-lg font-semibold ml-2">
            미래 2세 만들기
          </span>
          <img src="/logo.svg" alt="로고"/>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="relative text-[20px] font-bold text-black leading-normal tracking-[-0.54px]">
            <span className="relative">
              <span className="absolute inset-0 bg-primary-500/30 blur-xl pointer-events-none" />
              <span className="relative">캐릭터와 나의 2세는 어떻게 생겼을까?</span>
            </span>
            <br />
            <span className="relative">
              <span className="absolute inset-0 bg-primary-500/30 blur-xl pointer-events-none" />
              <span className="relative">AI가 예측하는 우리 아이 얼굴을 확인해보세요!</span>
            </span>
          </h1>
        </div>

        {/* Photo Upload Cards */}
        <div className="grid grid-cols-2 gap-4">
          <ImageUploadCard
            label="캐릭터"
            image={dadImage}
            onImageChange={setDadImage}
          />
          <ImageUploadCard
            label="내 얼굴"
            image={momImage}
            onImageChange={setMomImage}
          />
        </div>

        {/* Info Message */}
        <div className="bg-primary-100 rounded-xl px-3 py-4 flex items-center gap-1">
          <img src="/info.svg" />
          <span className="text-primary-600 text-sm">이목구비가 선명하게 나온 사진을 업로드해주세요!</span>
        </div>

        {/* Style Type Selection */}
        <StyleSelector
          styleType={styleType}
          onStyleChange={setStyleType}
        />

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
