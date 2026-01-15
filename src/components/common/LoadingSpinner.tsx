export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-gray-700 font-medium">이미지 생성 중...</p>
        <p className="text-gray-400 text-sm">잠시만 기다려주세요</p>
      </div>
    </div>
  )
}
