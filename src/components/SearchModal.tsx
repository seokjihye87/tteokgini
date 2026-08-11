import React, { useState } from 'react';
import { Product } from '../types';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.name.includes(searchTerm) ||
      p.subtitle.includes(searchTerm) ||
      p.description.includes(searchTerm) ||
      p.categoryLabel.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d5]">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#2d3a28]" />
            <h3 className="font-serif font-bold text-lg text-[#1c2319]">떡찌니 제품 검색</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#f0ebd9] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="하트, 행운꽃, 오색, 유기농, 토마토, 매생이 등 입력..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#e8e2d5] text-sm focus:outline-none focus:ring-2 focus:ring-[#2d3a28]"
          autoFocus
        />

        <div className="max-h-80 overflow-y-auto space-y-2 pt-2">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-xs text-stone-500 font-mono">
              검색 결과가 없습니다.
            </p>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="p-3 rounded-xl bg-white border border-[#e8e2d5] hover:bg-[#f0ebd9]/50 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1c2319]">{p.name}</h4>
                    <span className="text-xs text-stone-500">{p.subtitle}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-xs text-[#2d3a28]">
                  {p.price.toLocaleString()}원
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
