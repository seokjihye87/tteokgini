import React from 'react';
import { Leaf, Users, Heart, Sparkles } from 'lucide-react';

export const BrandCoreValues: React.FC = () => {
  const values = [
    {
      icon: Leaf,
      title: '좋은 재료',
      subtitle: '국산 쌀 & 지역 농산물',
      description: '우리 땅에서 자란 유기농 햅쌀과 계약재배 경기미, 지역의 좋은 농산물을 꼼꼼하게 선택합니다.',
    },
    {
      icon: Users,
      title: '좋은 사람',
      subtitle: '정성과 진심의 이음',
      description: '떡을 만드는 사람의 정성과 먹는 사람을 생각하는 마음을 하나하나 제품에 담습니다.',
    },
    {
      icon: Heart,
      title: '좋은 떡',
      subtitle: '정직한 제조 & 간편한 즐거움',
      description: '좋은 재료와 정직한 제조를 바탕으로 맛있고 간편하게 즐길 수 있는 특별한 떡을 만듭니다.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f0ebd9]/40 border-b border-[#e3ded1]" id="core-values">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e3ded1] text-[#2d3a28] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>TTEOKJJINI CORE PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            좋은 떡을 향한 떡찌니의 진심
          </h2>

          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed font-light max-w-2xl mx-auto">
            좋은 떡은 좋은 재료와 좋은 사람의 정성에서 시작된다고 믿습니다.<br />
            떡찌니는 부모님의 떡집에서 배운 정직한 마음을 이어받아 유기농 햅쌀, 계약재배한 경기미, 국산 쌀로 다양한 떡을 만들고 있습니다.<br />
            좋은 재료를 고르는 일부터 맛있고 안전하게 제품을 전하는 순간까지, 떡찌니는 떡에 진심을 다합니다.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl p-8 space-y-4 shadow-xs hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#2d3a28] text-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-[#8fa980] uppercase block tracking-wider">
                    {v.subtitle}
                  </span>

                  <h3 className="font-serif font-bold text-2xl text-[#1c2319]">
                    {v.title}
                  </h3>

                  <p className="text-sm text-[#525a4d] leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="w-12 h-0.5 bg-[#e8e2d5] group-hover:w-20 group-hover:bg-[#2d3a28] transition-all pt-2" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
