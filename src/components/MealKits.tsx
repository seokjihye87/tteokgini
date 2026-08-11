import React from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { MapPin, ShoppingBag, ArrowRight, Utensils } from 'lucide-react';

interface MealKitsProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const MealKits: React.FC<MealKitsProps> = ({
  onAddToCart,
  onSelectProduct
}) => {
  const mealkitList = PRODUCTS.filter((p) => p.category === 'mealkit');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f0ebd9]/40 border-b border-[#e3ded1]" id="mealkit-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e3ded1] text-[#2d3a28] text-xs font-mono font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#8fa980]" />
            <span>LOCAL SPECIALTY MEAL KITS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            지역의 좋은 맛을 간편한 한 끼로
          </h2>

          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed">
            떡찌니의 쫄깃한 떡에 우리 지역의 좋은 재료를 더했습니다. 복잡한 재료 준비 없이 집에서 특별한 떡 요리를 즐겨보세요.
          </p>
        </div>

        {/* 2 Meal Kits Large Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mealkitList.map((item) => (
            <div
              key={item.id}
              className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-[#f0ebd9]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#2d3a28] text-[#fbf9f5] text-xs font-bold shadow-xs">
                    {item.categoryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <span className="text-xs font-serif font-bold text-[#d4af37] block uppercase">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1c2319]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#525a4d] leading-relaxed">
                    {item.longDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {item.badges.map((b, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-[#f0ebd9] text-[#2d3a28] text-xs font-medium">
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-8 pt-0 border-t border-[#e8e2d5]/60 mt-4 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-2xl text-[#2d3a28]">
                    {item.price.toLocaleString()}원
                  </span>
                  <span className="block text-xs text-stone-500 font-mono">
                    {item.weight} (2인분)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(item)}
                    className="px-4 py-3 rounded-xl border border-[#2d3a28] text-[#2d3a28] font-bold text-xs hover:bg-[#2d3a28] hover:text-white transition-colors cursor-pointer"
                  >
                    {item.name.includes('토마토') ? '퇴촌 토마토 떡볶이 보기' : '완도 매생이 떡국 보기'}
                  </button>
                  <button
                    onClick={() => onAddToCart(item, 1)}
                    className="p-3 rounded-xl bg-[#2d3a28] text-white hover:bg-[#1e271a] transition-colors cursor-pointer"
                    title="장바구니 담기"
                  >
                    <ShoppingBag className="w-5 h-5" />
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
