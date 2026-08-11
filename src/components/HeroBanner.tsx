import React from 'react';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface HeroBannerProps {
  onExploreProducts: () => void;
  onReadStory: () => void;
  onOpenAi: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreProducts,
  onReadStory,
  onOpenAi
}) => {
  return (
    <section className="relative overflow-hidden bg-[#fbf9f5] pt-8 pb-16 lg:py-20 border-b border-[#e8e2d5]">
      
      {/* Delicate background ambient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e8e2d5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Messaging Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0ebd9] border border-[#e3ded1] text-[#2d3a28] text-xs sm:text-sm font-bold tracking-tight shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>좋은 재료, 좋은 사람 떡찌니</span>
            </div>

            {/* Campaign Title & Headline */}
            <div className="space-y-3">
              <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#d4af37] tracking-tight">
                떡찌니는 떡에 진심!
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#1c2319] leading-[1.15] tracking-tight">
                유기농 햅쌀과 계약재배 경기미,<br />
                <span className="text-[#2d3a28] underline decoration-[#d4af37]/60 decoration-wavy decoration-2 font-bold inline-block">
                  국산 쌀로 빚은 정직한 떡
                </span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-[#525a4d] leading-relaxed font-light max-w-2xl">
              유기농 햅쌀과 계약재배 경기미, 국산 쌀을 바탕으로 맛있고 믿을 수 있는 떡을 정성껏 만듭니다. 사랑스러운 하트, 행운의 꽃, 알록달록 오색 빛깔로 사랑과 고마움을 따뜻하게 전해보세요.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-7 py-4 rounded-xl bg-[#2d3a28] text-[#fbf9f5] font-bold text-sm sm:text-base hover:bg-[#1e271a] transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>떡찌니 제품 만나보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onReadStory}
                className="px-7 py-4 rounded-xl bg-[#f0ebd9] text-[#1c2319] border border-[#e3ded1] font-bold text-sm sm:text-base hover:bg-[#e3ded1] transition-all duration-200 cursor-pointer"
              >
                떡찌니 이야기
              </button>

              <button
                onClick={onOpenAi}
                className="px-5 py-4 rounded-xl bg-white border border-[#e8e2d5] text-[#2d3a28] font-bold text-xs sm:text-sm hover:bg-[#f0ebd9]/50 transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>AI 추천 Curator</span>
              </button>
            </div>

            {/* Core Badges Row */}
            <div className="pt-6 border-t border-[#e8e2d5] grid grid-cols-3 gap-4 text-xs text-[#616a5b] font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8fa980] flex-shrink-0" />
                <span>100% 국산 유기농/경기미</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>하트·꽃·오색 특허모양</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>2010년부터 지켜온 진심</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#e8e2d5] bg-white shadow-xl group">
              <img
                src="/src/assets/images/regenerated_image_1786432713865.png"
                alt="하트 떡국떡, 행운꽃 떡국떡, 오색 떡국떡이 가득한 떡찌니 상차림"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Highlight Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#fbf9f5]/95 backdrop-blur-md border border-[#e8e2d5] rounded-2xl p-4 shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#616a5b] uppercase tracking-wider">
                    SIGNATURE RICE CAKE COLLECTION
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2d3a28] text-white text-[10px] font-bold">
                    냉장 바로조리
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#1c2319]">
                  하트 떡국떡 · 행운꽃 떡국떡 · 오색 떡국떡
                </h3>
                <p className="text-xs text-[#525a4d] line-clamp-1">
                  해동 기다릴 필요 없는 100% 국산 햅쌀의 몰랑한 식감!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
