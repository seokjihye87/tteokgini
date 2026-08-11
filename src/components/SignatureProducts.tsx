import React from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Heart, Sparkles, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SignatureProductsProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const SignatureProducts: React.FC<SignatureProductsProps> = ({
  onAddToCart,
  onSelectProduct
}) => {
  const signatureList = PRODUCTS.filter((p) => p.category === 'signature');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5] border-b border-[#e8e2d5]" id="signature-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ebd9] text-[#2d3a28] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>TTEOKJJINI SIGNATURE LINEUP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1c2319] tracking-tight leading-snug">
            떡찌니가 정성껏 빚은 <span className="relative inline-block text-[#2d3a28]">특별한 떡<span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#d4af37]/25 -z-10 rounded-sm"></span></span>
          </h2>

          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed">
            좋은 우리 쌀에 사랑스러운 모양과 다채로운 색을 더했습니다. 평범한 식탁부터 마음을 전하고 싶은 특별한 날까지 함께합니다.
          </p>
        </div>

        {/* 3 Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureList.map((item) => (
            <div
              key={item.id}
              className="group bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#f0ebd9]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {item.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#2d3a28]/90 text-[#fbf9f5] text-[10px] font-bold shadow-xs"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#fbf9f5]/90 text-[#1c2319] text-[11px] font-bold font-mono shadow-xs">
                    냉장 보관 (바로조리)
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-serif font-bold text-[#d4af37] block">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-[#1c2319] group-hover:text-[#2d3a28] transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#525a4d] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet Spec Highlights */}
                  <div className="pt-2 border-t border-[#e8e2d5] space-y-1.5 text-xs text-[#616a5b]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8fa980]" />
                      <span>용량: <b>{item.weight}</b></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8fa980]" />
                      <span>추천: {item.recommendedFor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Price & Button */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-baseline justify-between border-t border-[#e8e2d5] pt-4">
                  <div>
                    <span className="text-xs text-[#616a5b]">권장 소비자가</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xl text-[#2d3a28]">
                        {item.price.toLocaleString()}원
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-stone-400 line-through font-mono">
                          {item.originalPrice.toLocaleString()}원
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onSelectProduct(item)}
                    className="py-2.5 rounded-xl border border-[#2d3a28] text-[#2d3a28] font-bold text-xs hover:bg-[#2d3a28] hover:text-white transition-colors cursor-pointer"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => onAddToCart(item, 1)}
                    className="py-2.5 rounded-xl bg-[#2d3a28] text-[#fbf9f5] font-bold text-xs hover:bg-[#1e271a] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{item.name} 담기</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
