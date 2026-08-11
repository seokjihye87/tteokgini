import React from 'react';
import { TEA_PAIRINGS } from '../data/pairings';
import { Coffee, Sparkles, ArrowRight } from 'lucide-react';

interface TeaPairingProps {
  onExploreProducts: () => void;
}

export const TeaPairing: React.FC<TeaPairingProps> = ({ onExploreProducts }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f0ebd9]/40 border-y border-[#e3ded1]" id="pairing-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e3ded1] text-[#2d3a28] text-xs font-mono font-medium">
            <Coffee className="w-3.5 h-3.5" />
            <span>TEA & RICE CAKE HARMONY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            차(茶)와 떡찌니의 정갈한 어울림
          </h2>
          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed">
            좋은 차 한 잔과 100% 국산 쌀로 만든 떡 한 조각이 선사하는 오감의 안식.
          </p>
        </div>

        {/* Pairing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEA_PAIRINGS.map((p) => (
            <div
              key={p.id}
              className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Images side-by-side or stacked */}
                <div className="grid grid-cols-2 gap-3 relative rounded-xl overflow-hidden">
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-[#e8e2d5]">
                    <img
                      src={p.tteokImage}
                      alt={p.tteokName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                      떡찌니 떡
                    </span>
                  </div>

                  <div className="relative aspect-square rounded-lg overflow-hidden border border-[#e8e2d5]">
                    <img
                      src={p.teaImage}
                      alt={p.teaName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#2d3a28]/80 text-white text-[10px] font-bold">
                      어울리는 차
                    </span>
                  </div>
                </div>

                {/* Names */}
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-[#1c2319]">
                    {p.tteokName}
                  </h3>
                  <p className="text-xs font-bold text-[#8fa980] flex items-center gap-1">
                    <span>+ {p.teaName}</span>
                  </p>
                </div>

                {/* Flavor Profile Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.flavorProfile.map((f, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-[#f0ebd9] text-[#2d3a28] text-[11px] font-mono"
                    >
                      #{f}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-[#525a4d] leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Recommendation Note */}
              <div className="pt-4 border-t border-[#e8e2d5] space-y-3">
                <p className="text-[11px] text-[#616a5b] italic bg-[#f0ebd9]/60 p-3 rounded-lg border-l-2 border-[#8fa980]">
                  "{p.recommendationNote}"
                </p>

                <button
                  onClick={onExploreProducts}
                  className="w-full py-2 rounded-lg border border-[#2d3a28] text-[#2d3a28] text-xs font-bold hover:bg-[#2d3a28] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>상품 확인하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
