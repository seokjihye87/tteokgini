import React, { useState } from 'react';
import { RECIPES } from '../data/recipes';
import { RecipeItem } from '../types';
import { Utensils, Clock, BookOpen, X, CheckCircle2, ArrowRight } from 'lucide-react';

export const RecipeSection: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5] border-b border-[#e8e2d5]" id="recipe-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ebd9] text-[#2d3a28] text-xs font-mono font-bold">
            <Utensils className="w-3.5 h-3.5 text-[#8fa980]" />
            <span>TTEOKJJINI DELICIOUS RECIPES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            떡찌니를 더 맛있게 즐기는 방법
          </h2>

          <p className="text-sm sm:text-base text-[#525a4d]">
            하트/꽃 떡국부터 아이들 특식 간식, 지역 밀키트 200% 활용 레시피까지.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECIPES.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedRecipe(r)}
              className="group cursor-pointer bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#f0ebd9]">
                  <img
                    src={r.image}
                    alt={r.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#2d3a28] text-white text-[10px] font-bold">
                    {r.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#616a5b]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8fa980]" />
                      조리시간 {r.prepTime}
                    </span>
                    <span>난이도: {r.difficulty}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#1c2319] group-hover:text-[#2d3a28] transition-colors leading-snug">
                    {r.title}
                  </h3>

                  <p className="text-xs text-[#525a4d] line-clamp-2 leading-relaxed">
                    {r.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#e8e2d5]/60 flex items-center justify-between text-xs font-bold text-[#2d3a28]">
                <span>레시피 상세 조리법 보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6">
            
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#f0ebd9] cursor-pointer"
            >
              <X className="w-6 h-6 text-[#1c2319]" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#8fa980] font-bold uppercase">
                {selectedRecipe.category} · PREP {selectedRecipe.prepTime}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#1c2319]">
                {selectedRecipe.title}
              </h3>
              <p className="text-xs text-[#525a4d]">
                {selectedRecipe.subtitle}
              </p>
            </div>

            <div className="aspect-16/9 rounded-xl overflow-hidden border border-[#e8e2d5]">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ingredients */}
            <div className="p-4 rounded-xl bg-[#f0ebd9]/60 border border-[#e3ded1] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#1c2319] flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-[#2d3a28]" />
                <span>준비 재료</span>
              </h4>
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#4e5648]">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-white border border-[#e8e2d5]">
                    • {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#1c2319]">
                단계별 요리 순서
              </h4>
              <div className="space-y-2">
                {selectedRecipe.steps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-[#e8e2d5] text-xs text-[#1c2319] flex gap-3">
                    <span className="font-mono font-bold text-[#2d3a28] flex-shrink-0">
                      STEP {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            {selectedRecipe.tip && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 italic font-serif">
                💡 <b>떡찌니 셰프 TIP:</b> {selectedRecipe.tip}
              </div>
            )}

            <button
              onClick={() => setSelectedRecipe(null)}
              className="w-full py-3 rounded-xl bg-[#2d3a28] text-white font-bold text-xs hover:bg-[#1e271a] cursor-pointer"
            >
              닫기
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
