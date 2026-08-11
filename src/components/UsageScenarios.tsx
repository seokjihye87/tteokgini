import React from 'react';
import { Heart, Sparkles, Smile, ShieldCheck, Utensils, ArrowRight } from 'lucide-react';

interface UsageScenariosProps {
  onExploreProducts: () => void;
}

export const UsageScenarios: React.FC<UsageScenariosProps> = ({ onExploreProducts }) => {
  const scenarios = [
    {
      title: '사랑을 표현하고 싶은 날에는',
      highlight: '하트 떡국떡',
      desc: '생일, 기념일, 고백하고 싶은 식탁에 분홍빛 하트 떡국떡으로 로맨틱한 마음을 담아보세요.',
      icon: Heart,
      color: 'bg-rose-50 border-rose-200 text-rose-700'
    },
    {
      title: '새로운 시작을 응원할 때는',
      highlight: '행운꽃 떡국떡',
      desc: '입학, 졸업, 취업, 개업, 집들이 등 앞으로 꽃길만 걷길 바라는 응원의 메시지를 전합니다.',
      icon: Sparkles,
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      title: '가족과 즐거운 식사를 할 때는',
      highlight: '오색 떡국떡',
      desc: '화려한 오색 천연 빛깔로 아이부터 어르신까지 온 가족 눈과 입을 즐겁게 해줍니다.',
      icon: Smile,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    },
    {
      title: '좋은 쌀을 챙기는 매일에는',
      highlight: '유기농 떡',
      desc: '유기농 햅쌀과 현미로 빚어 우리 아이 첫 간식과 매일의 건강한 식탁을 안심하고 지킵니다.',
      icon: ShieldCheck,
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      title: '간편하고 특별한 한 끼에는',
      highlight: '지역 재료 밀키트',
      desc: '퇴촌 토마토 떡볶이와 완도 매생이 떡국으로 집에서도 간편하게 맛집 별미를 만납니다.',
      icon: Utensils,
      color: 'bg-stone-100 border-stone-200 text-stone-800'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5] border-b border-[#e8e2d5]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#616a5b] uppercase">
            SPECIAL MOMENTS WITH TTEOKJJINI
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            좋은 마음을 전하고 싶은 날, 떡찌니
          </h2>
          <p className="text-sm sm:text-base text-[#525a4d]">
            상황과 대상에 맞춰 마음을 전하는 떡찌니의 추천 가이드입니다.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {scenarios.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-[#f0ebd9]/30 border border-[#e8e2d5] rounded-2xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`p-2.5 rounded-xl w-fit ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-[#616a5b] block font-medium">
                    {s.title}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1c2319]">
                    {s.highlight}
                  </h3>
                  <p className="text-xs text-[#525a4d] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campaign Statement Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#f0ebd9] border border-[#e3ded1] text-center space-y-4">
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1c2319]">
            "사랑도, 응원도, 고마움도<br />
            <span className="text-[#2d3a28]">떡찌니로 맛있게 전하세요.</span>"
          </h3>

          <button
            onClick={onExploreProducts}
            className="px-6 py-3 rounded-xl bg-[#2d3a28] text-white font-bold text-xs sm:text-sm hover:bg-[#1e271a] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>상황별 추천 떡 보러가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
