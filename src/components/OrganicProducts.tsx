import React from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Leaf, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrganicProductsProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onExploreCategory: () => void;
}

export const OrganicProducts: React.FC<OrganicProductsProps> = ({
  onAddToCart,
  onExploreCategory
}) => {
  const organicList = PRODUCTS.filter((p) => p.category === 'organic');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5] border-b border-[#e8e2d5]" id="organic-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-bold border border-emerald-200">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>ORGANIC CERTIFIED RICE LINEUP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            매일 먹는 떡일수록 재료부터 좋게
          </h2>

          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed">
            가족과 함께 먹는 떡이기에 쌀부터 꼼꼼하게 살폈습니다. 떡국과 떡볶이부터 아이들의 간식까지 다양한 요리에 간편하게 활용해 보세요.
          </p>
        </div>

        {/* 4 Organic Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organicList.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#e8e2d5] rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#f0ebd9]">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-emerald-800 text-white text-[10px] font-bold">
                    유기농 인증 쌀
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-stone-500 font-mono block">
                    {p.subtitle}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#1c2319]">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#616a5b] line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[#e8e2d5] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-extrabold text-lg text-[#2d3a28]">
                      {p.price.toLocaleString()}원
                    </span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#f0ebd9] text-[#2d3a28] font-mono font-bold text-[11px] mt-0.5">
                    {p.weight}
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(p, 1)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#2d3a28] text-white text-xs font-bold hover:bg-[#1e271a] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>담기</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner Quote & Action */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#2d3a28] text-[#fbf9f5] text-center space-y-4 shadow-md">
          <div className="space-y-1">
            <p className="font-serif text-2xl sm:text-3xl font-bold leading-relaxed text-[#d4af37]">
              "좋은 쌀을 고르는 순간부터<br className="sm:hidden" /> 떡찌니의 진심은 시작됩니다."
            </p>
            <p className="text-xs sm:text-sm text-stone-300">
              첨가물 없이 100% 유기농 햅쌀만을 사용하여 안심하고 아이와 즐기실 수 있습니다.
            </p>
          </div>

          <div>
            <button
              onClick={onExploreCategory}
              className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#1c2319] font-bold text-xs sm:text-sm hover:bg-[#c3a030] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>유기농 제품 전체 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
