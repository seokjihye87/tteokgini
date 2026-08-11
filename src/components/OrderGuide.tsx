import React from 'react';
import { Truck, Refrigerator, PhoneCall, HelpCircle, ArrowRight } from 'lucide-react';

interface OrderGuideProps {
  onOpenQuickAsk: () => void;
}

export const OrderGuide: React.FC<OrderGuideProps> = ({ onOpenQuickAsk }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f0ebd9]/40 border-b border-[#e3ded1]" id="cs-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#616a5b] uppercase">
            DELIVERY & CUSTOMER SERVICE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            떡찌니 제품 구매 안내
          </h2>
          <p className="text-sm sm:text-base text-[#525a4d]">
            언제나 신선하고 안전하게 고객님의 식탁까지 배송해 드립니다.
          </p>
        </div>

        {/* 3 Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-[#f0ebd9] text-[#2d3a28] w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1c2319]">
              신선 냉장 배송
            </h3>
            <p className="text-xs text-[#525a4d] leading-relaxed">
              신선한 맛과 쫄깃함을 그대로 보존하기 위해 신선 콜드체인 시스템으로 차가운 상태로 빠르고 안전하게 배송됩니다.
            </p>
            <span className="inline-block text-[11px] font-mono font-bold text-[#8fa980]">
              * 5만원 이상 구매 시 무료배송
            </span>
          </div>

          <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-[#f0ebd9] text-[#2d3a28] w-fit">
              <Refrigerator className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1c2319]">
              수령 후 보관 안내
            </h3>
            <p className="text-xs text-[#525a4d] leading-relaxed">
              수령 후 즉시 냉장 보관(0~5℃)해 주세요. 냉장 떡 특성상 물에 따로 해동할 필요 없이 바로 조리가 가능합니다.
            </p>
            <span className="inline-block text-[11px] font-mono font-bold text-[#8fa980]">
              * 장기 보관 시 냉동 보관 권장
            </span>
          </div>

          <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-[#f0ebd9] text-[#2d3a28] w-fit">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1c2319]">
              대량 및 단체 주문 문의
            </h3>
            <p className="text-xs text-[#525a4d] leading-relaxed">
              명절 선물, 기업 답례품, 행사용 대량 주문은 고객센터로 문의해 주시면 맞춤견적과 친절한 상담을 안내해 드립니다.
            </p>
            <button
              onClick={onOpenQuickAsk}
              className="text-xs font-bold text-[#2d3a28] underline flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>1:1 간편 상담 신청하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* CS Call Center Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#2d3a28] text-[#fbf9f5] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono text-[#d4af37] font-bold tracking-widest uppercase block">
              CUSTOMER SUPPORT CENTER
            </span>
            <div className="flex flex-wrap items-baseline gap-3 justify-center md:justify-start">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                031-768-8313
              </span>
              <span className="text-xs text-stone-300">떡찌니 대표 고객센터</span>
            </div>
            <p className="text-xs text-stone-300 font-mono">
              운영시간: 평일 09:00 - 18:00 (점심시간 12:00 - 13:00 / 토, 일, 공휴일 휴무)
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onOpenQuickAsk}
              className="px-6 py-3.5 rounded-xl bg-[#d4af37] text-[#1c2319] font-bold text-xs sm:text-sm hover:bg-[#c3a030] transition-colors cursor-pointer shadow-xs"
            >
              1:1 간편 문의하기
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
