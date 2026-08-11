import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { ReviewItem } from '../types';
import { Star, ThumbsUp, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const ReviewSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 후기' },
    { id: '아이와 함께', label: '아이와 함께 먹은 이야기' },
    { id: '특별한 날 선물', label: '특별한 날 선물한 이야기' },
    { id: '하트와 꽃 모양', label: '하트와 꽃 모양 이야기' },
    { id: '간편 조리', label: '간편한 조리 이야기' },
    { id: '맛과 식감', label: '떡의 맛과 식감 이야기' },
  ];

  const filteredReviews = REVIEWS.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5] border-b border-[#e8e2d5]" id="reviews-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ebd9] text-[#2d3a28] text-xs font-mono font-bold">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>AUTHENTIC CUSTOMER STORIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            좋은 사람들이 함께한 떡찌니의 식탁
          </h2>

          <p className="text-sm sm:text-base text-[#525a4d]">
            떡찌니를 직접 맛본 고객들의 솔직하고 따뜻한 이야기를 만나보세요.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 justify-center overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-[#2d3a28] text-[#fbf9f5] font-bold shadow-xs'
                  : 'bg-[#f0ebd9]/60 text-[#525a4d] hover:bg-[#e3ded1]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-2xl bg-[#f0ebd9]/40 border border-[#e3ded1] shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e3ded1] text-[#2d3a28] font-bold">
                    {r.category}
                  </span>
                </div>

                <span className="text-xs font-serif font-bold text-[#2d3a28] block">
                  [{r.productName}]
                </span>

                <p className="text-xs text-[#4e5648] leading-relaxed italic">
                  "{r.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#e3ded1] flex items-center justify-between text-xs text-[#616a5b]">
                <span className="font-bold">{r.author}</span>
                <span className="font-mono text-[11px]">{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-6 py-3 rounded-xl border border-[#2d3a28] text-[#2d3a28] font-bold text-xs hover:bg-[#2d3a28] hover:text-white transition-colors cursor-pointer"
          >
            고객 후기 더 보기 (전체 15,000건+)
          </button>
        </div>

      </div>
    </section>
  );
};
