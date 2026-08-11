import React from 'react';
import { Calendar, MapPin, Heart, ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  onOpenBlog: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onOpenBlog }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5] border-b border-[#e8e2d5]" id="story-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="bg-[#f0ebd9]/50 border border-[#e3ded1] rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-xs">
          
          {/* Visual Side */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#e8e2d5] aspect-4/3 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
                alt="떡찌니의 전통 정성과 떡빚기 역사"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-mono text-[#d4af37] font-bold">SEOUL DOGOK TO GWANGJU</span>
                  <p className="font-serif font-bold text-lg">부모님의 강남 도곡동 떡집에서 2010년 제조 전문 브랜드로</p>
                </div>
              </div>
            </div>

            {/* Timeline Highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#4e5648] font-mono">
              <div className="p-3 rounded-xl bg-white border border-[#e8e2d5] space-y-1">
                <span className="text-[#8fa980] font-bold block">1st Step</span>
                <span>서울 강남 도곡동 떡집</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#e8e2d5] space-y-1">
                <span className="text-[#8fa980] font-bold block">Since 2010</span>
                <span>경기 광주 제조 전문 확장</span>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#616a5b] uppercase block">
                BRAND HERITAGE STORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
                부모님의 떡집에서 시작된 진심
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#4e5648] leading-relaxed font-light">
              <p>
                떡찌니의 시작은 서울 강남구 도곡동에 문을 연 부모님의 떡집이었습니다. 떡집을 이어받으며 좋은 재료를 고르는 법과 떡 하나에도 정성을 다하는 마음을 배웠습니다. 이렇게 만든 좋은 떡을 전국의 더 많은 사람에게 전하고 싶었습니다.
              </p>
              <p>
                2010년, 경기도 광주에서 본격적으로 떡 제조를 시작했습니다. 유기농 햅쌀과 계약재배 경기미, 국산 쌀로 떡국떡과 떡볶이떡을 만들고, 하트와 꽃 모양에는 사랑과 행운의 마음을 담았습니다.
              </p>
              <p className="font-serif font-bold text-[#1c2319] italic pt-1 border-l-2 border-[#2d3a28] pl-4">
                "전통의 정성은 그대로 지키면서 오늘의 식탁에서는 더욱 간편하고 즐겁게. 좋은 재료와 좋은 사람의 마음으로 떡을 만드는 것, 그것이 떡찌니가 떡에 진심인 방법입니다."
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBlog}
                className="px-6 py-3.5 rounded-xl bg-[#2d3a28] text-[#fbf9f5] text-xs sm:text-sm font-bold hover:bg-[#1e271a] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>떡찌니 이야기 자세히 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
