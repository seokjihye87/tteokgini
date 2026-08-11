import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f0ebd9] cursor-pointer"
        >
          <X className="w-6 h-6 text-[#1c2319]" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden border border-[#e8e2d5] bg-white">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#f0ebd9] text-[#2d3a28] text-xs font-mono font-bold">
              {product.categoryLabel}
            </span>

            <div>
              <h2 className="font-serif font-bold text-2xl text-[#1c2319]">{product.name}</h2>
              <span className="text-xs font-serif text-[#d4af37] font-bold block">{product.subtitle}</span>
            </div>

            <p className="text-xs text-[#525a4d] leading-relaxed">
              {product.longDescription || product.description}
            </p>

            <div className="pt-2 border-t border-[#e8e2d5] space-y-1 text-xs text-[#616a5b]">
              <div>원재료 원산지: <b>{product.originRice}</b></div>
              <div>용량: <b>{product.weight}</b></div>
              <div>보관방법: <b>{product.storageInfo}</b></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono font-bold text-2xl text-[#2d3a28]">
                {product.price.toLocaleString()}원
              </span>

              <div className="flex items-center border border-[#e8e2d5] rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold hover:bg-[#f0ebd9]"
                >
                  -
                </button>
                <span className="px-3 py-1 font-mono text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold hover:bg-[#f0ebd9]"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              className="w-full py-3.5 rounded-xl bg-[#2d3a28] text-white font-bold text-xs hover:bg-[#1e271a] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>장바구니 담기 ({(product.price * quantity).toLocaleString()}원)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
