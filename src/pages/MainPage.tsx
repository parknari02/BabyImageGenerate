import FeatureCard from '../components/Main/FeatureCard'
import ComingSoonCard from '../components/Main/ComingSoonCard'

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-[500px] bg-black min-h-screen flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <header className="fixed w-full max-w-[500px] top-0 z-10 bg-black flex items-center gap-1 px-5 py-4 pt-8">
          <h1 className="text-xl font-semibold text-white">
            LOVEY-PHOTOBOOTH
          </h1>
          <img src="/logo.svg" alt="로고"/>
        </header>
        {/* Feature Cards */}
        <div className="flex-1 px-6 pt-21 pb-8 flex flex-col gap-4">
          {/* Intro Box */}
          <div className="bg-white/15 rounded-2xl px-5 py-4">
            <p className="text-white text-[15px] leading-relaxed">
              좋아하는 캐릭터와 함께하는 AI 포토부스✨<br />
              <span className="text-white/60">특별한 순간을 만들어보세요!</span>
            </p>
          </div>
          {/* 미래 2세 만들기 카드 */}
          <FeatureCard
            title="미래 2세 만들기"
            description="캐릭터와 나의 아이는 어떤 모습일까?"
            backgroundColor="bg-gradient-to-br from-primary-300 to-primary-600"
            to="/baby-generator"
          >
            <div className="absolute inset-0 flex items-center justify-center pb-8">
              <img
                src="/baby1.png"
                alt=""
                className="w-[30%] aspect-[4/5] object-cover rounded-xl shadow-lg -rotate-6 translate-x-1"
              />
              <img
                src="/baby2.png"
                alt=""
                className="w-[30%] aspect-[4/5] object-cover rounded-xl shadow-lg rotate-6 -translate-x-1 mt-8"
              />
            </div>
          </FeatureCard>

          {/* Coming Soon 카드들 */}
          <ComingSoonCard
            title="포토부스 세컷"
            description="최애랑 포토부스 3컷 찍어 드려요!"
          />
          <ComingSoonCard
            title="커플 프레임"
            description="최애와 함께하는 특별한 순간"
          />
        </div>
      </div>
    </div>
  )
}
