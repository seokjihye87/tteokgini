import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductDetailModal } from './ProductDetailModal';
import { Search, Filter, ShoppingBag, Star, Eye, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product, quantity: number, packaging: 'standard' | 'bojagi') => void;
  searchQuery?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  searchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'gift', label: '선물/답례떡' },
    { id: 'rice_cake', label: '찹쌀떡/경단' },
    { id: 'steamed', label: '찰떡/설기' },
    { id: 'fusion', label: '디저트/퓨전떡' },
    { id: 'meal', label: '간편 한끼' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.badges.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5]" id="products-section">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e8e2d5] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#616a5b] uppercase">
              100% DOMESTIC RICE SELECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight pt-1">
              떡찌니 대표 떡 라인업
            </h2>
            <p className="text-sm text-[#525a4d] pt-2">
              충남 서산 찹쌀과 경기 이천 멥쌀만을 사용하여 매일 아침 정성으로 만듭니다.
            </p>
          </div>

          {/* Search Input Filter */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="제품명, 재료(쑥, 팥, 밤) 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e8e2d5] bg-white text-sm focus:outline-none focus:border-[#2d3a28] transition-colors"
            />
            <Search className="w-4 h-4 text-[#616a5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#2d3a28] text-[#fbf9f5] shadow-xs font-bold'
                  : 'bg-[#f0ebd9]/80 text-[#525a4d] hover:bg-[#e3ded1] hover:text-[#1c2319]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#f0ebd9]/30 rounded-2xl border border-dashed border-[#e8e2d5] space-y-3">
            <p className="text-base text-[#525a4d] font-serif font-medium">
              검색 조건에 맞는 떡찌니 제품이 없습니다.
            </p>
            <p className="text-xs text-[#616a5b]">
              다른 검색어를 입력하시거나 카테고리를 변경해 보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Header */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#f0ebd9]/50">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {p.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#2d3a28]/90 text-[#fbf9f5] text-[10px] font-medium shadow-xs"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    >
                      <span className="px-4 py-2 rounded-full bg-[#fbf9f5] text-[#1c2319] text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        상세 보기
                      </span>
                    </button>
                  </div>

                  {/* Card Info Body */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#616a5b]">
                      <span>{p.categoryLabel}</span>
                      <div className="flex items-center gap-1 text-amber-600 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{p.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(p)}
                      className="font-serif font-bold text-base text-[#1c2319] group-hover:text-[#2d3a28] transition-colors cursor-pointer line-clamp-1"
                    >
                      {p.name}
                    </h3>

                    <p className="text-xs text-[#616a5b] line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-[#e8e2d5]/60 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-base text-[#2d3a28]">
                      {p.price.toLocaleString()}원
                    </span>
                    {p.originalPrice && (
                      <span className="block text-[10px] text-stone-400 line-through font-mono">
                        {p.originalPrice.toLocaleString()}원
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(p, 1, 'standard')}
                    className="p-2.5 rounded-lg bg-[#2d3a28] text-[#fbf9f5] hover:bg-[#1e271a] transition-colors cursor-pointer shadow-xs"
                    title="장바구니 담기"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
