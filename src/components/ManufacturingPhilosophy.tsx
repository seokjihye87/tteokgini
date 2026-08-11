import React from 'react';
import { Wheat, HeartHandshake, Smile, Zap } from 'lucide-react';

export const ManufacturingPhilosophy: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '쌀부터 꼼꼼하게',
      description: '유기농 햅쌀과 계약재배 경기미, 국산 쌀을 바탕으로 제품을 만듭니다.',
      icon: Wheat,
    },
    {
      num: '02',
      title: '정직한 마음으로',
      description: '부모님의 떡집에서 이어받은 정성과 책임감을 제조 과정에 담습니다.',
      icon: HeartHandshake,
    },
    {
      num: '03',
      title: '맛과 모양까지 즐겁게',
      description: '하트, 꽃, 오색 떡처럼 먹는 즐거움과 보는 기쁨을 함께 전합니다.',
      icon: Smile,
    },
    {
      num: '04',
      title: '간편하게 즐기도록',
      description: '냉장고에서 꺼내 간편하게 요리할 수 있는 제품과 밀키트를 개발합니다.',
      icon: Zap,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f0ebd9]/30 border-b border-[#e3ded1]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#616a5b] uppercase">
            TTEOKJJINI MANUFACTURING PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            좋은 재료, 좋은 사람이 만드는 좋은 떡
          </h2>
          <p className="text-sm sm:text-base text-[#525a4d]">
            떡찌니가 2010년부터 지켜온 4가지 고집스러운 떡 제조 원칙입니다.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#fbf9f5] border border-[#e8e2d5] space-y-4 shadow-2xs hover:shadow-md transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold text-[#d4af37]">
                    {step.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#f0ebd9] text-[#2d3a28] group-hover:bg-[#2d3a28] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-[#1c2319]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#525a4d] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
