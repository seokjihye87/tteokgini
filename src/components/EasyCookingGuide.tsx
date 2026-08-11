import React from 'react';
import { Refrigerator, Clock, UtensilsCrossed, Heart, Check } from 'lucide-react';

export const EasyCookingGuide: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '냉장고에서 꺼내기',
      desc: '복잡한 해동 대기 시간 없이 냉장고에서 꺼내 바로 사용합니다.',
      icon: Refrigerator
    },
    {
      num: '02',
      title: '필요한 만큼 분량 준비',
      desc: '제품 안내에 따라 조리할 분량을 그릇에 가볍게 덜어냅니다.',
      icon: Clock
    },
    {
      num: '03',
      title: '원하는 요리에 넣기',
      desc: '사골 육수, 멸치 국물, 떡볶이 양념에 떡을 넣고 2~3분간 조리합니다.',
      icon: UtensilsCrossed
    },
    {
      num: '04',
      title: '따뜻할 때 즐기기',
      desc: '하트와 꽃 모양의 쫄깃함이 살아있을 때 온 가족과 맛있게 즐깁니다.',
      icon: Heart
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f0ebd9]/30 border-b border-[#e3ded1]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#616a5b] uppercase">
            EASY 4-STEP REFRIGERATED COOKING
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            냉장고에서 꺼내 간편하게
          </h2>
          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed">
            떡찌니의 냉장 떡은 복잡한 해동 과정 없이 간편하게 요리할 수 있습니다. 따뜻한 떡국부터 맛있는 떡볶이까지, 필요한 순간 손쉽게 준비해 보세요.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl p-6 space-y-4 relative shadow-2xs hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-[#2d3a28]">
                    STEP {s.num}
                  </span>
                  <div className="p-2 rounded-xl bg-[#f0ebd9] text-[#2d3a28]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-[#1c2319]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#616a5b] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-[#616a5b] font-mono italic">
          ※ 정확한 조리법과 보관 방법은 각 제품의 포장 뒷면 표시사항을 확인해 주세요.
        </p>

      </div>
    </section>
  );
};
