import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Gift, ShoppingBag, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [giftNote, setGiftNote] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const packagingFee = item.packagingType === 'bojagi' ? 8000 : 0;
    return acc + (item.product.price + packagingFee) * item.quantity;
  }, 0);

  const freeShippingThreshold = 50000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 3500;
  const grandTotal = subtotal + shippingFee;

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClearCart();
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fbf9f5] border-l border-[#e8e2d5] w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#e8e2d5] flex items-center justify-between bg-[#f0ebd9]/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2d3a28]" />
            <h3 className="font-serif font-bold text-lg text-[#1c2319]">
              장바구니 ({cartItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#e3ded1] text-[#1c2319] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#2d3a28] text-white p-3 px-5 text-xs font-mono space-y-1">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#8fa980]" />
              5만원 이상 구매 시 신선 무료배송
            </span>
            <span>
              {subtotal >= freeShippingThreshold ? '무료배송 달성!' : `${(freeShippingThreshold - subtotal).toLocaleString()}원 더 필요`}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-[#8fa980] transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Checkout Completed Overlay */}
        {isOrdered ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fadeIn">
            <div className="p-4 rounded-full bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1c2319]">
              주문이 성공적으로 접수되었습니다!
            </h3>
            <p className="text-xs text-[#525a4d] leading-relaxed">
              100% 국산 쌀로 만든 떡찌니의 건강함이 정성을 담아 안심 신선하게 배송됩니다.
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 space-y-3 text-[#616a5b]">
                  <ShoppingBag className="w-12 h-12 mx-auto text-[#8fa980]/50" />
                  <p className="font-serif text-base text-[#1c2319]">장바구니가 비어 있습니다.</p>
                  <p className="text-xs">떡찌니의 100% 국산 쌀 떡을 담아보세요.</p>
                </div>
              ) : (
                cartItems.map((item) => {
                  const packagingPrice = item.packagingType === 'bojagi' ? 8000 : 0;
                  const itemPrice = (item.product.price + packagingPrice) * item.quantity;

                  return (
                    <div
                      key={item.product.id}
                      className="p-4 rounded-xl bg-white border border-[#e8e2d5] flex gap-4 shadow-2xs relative"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 object-cover rounded-lg border border-[#e8e2d5]"
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-sm text-[#1c2319] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.packagingType === 'bojagi' && (
                          <span className="inline-block text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            실크 보자기 포장 (+8,000원)
                          </span>
                        )}

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center border border-[#e8e2d5] rounded-md overflow-hidden bg-[#fbf9f5]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-0.5 text-xs font-bold hover:bg-[#f0ebd9] cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-mono font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-0.5 text-xs font-bold hover:bg-[#f0ebd9] cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-mono font-bold text-sm text-[#2d3a28]">
                            {itemPrice.toLocaleString()}원
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}

              {/* Free Gift Card Note Input */}
              {cartItems.length > 0 && (
                <div className="p-4 rounded-xl bg-[#f0ebd9]/60 border border-[#e3ded1] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1c2319]">
                    <Gift className="w-4 h-4 text-[#8fa980]" />
                    <span>무료 감사 스티커 문구 입력</span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="예) 감사한 마음 전합니다 / 생신 축하드립니다 (무료 제작)"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#e8e2d5] bg-white text-xs focus:outline-none focus:border-[#2d3a28]"
                  />
                </div>
              )}
            </div>

            {/* Footer Summary & Order CTA */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#e8e2d5] bg-white space-y-3">
                <div className="space-y-1.5 text-xs text-[#525a4d]">
                  <div className="flex justify-between">
                    <span>상품 금액</span>
                    <span className="font-mono">{subtotal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span className="font-mono">
                      {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#1c2319] pt-2 border-t border-[#e8e2d5]">
                    <span>최종 결제 금액</span>
                    <span className="font-mono text-xl text-[#2d3a28]">
                      {grandTotal.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#2d3a28] text-[#fbf9f5] font-bold text-sm hover:bg-[#1e271a] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>주문하기 ({grandTotal.toLocaleString()}원)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
