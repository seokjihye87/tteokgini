import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsAiModalOpen: (open: boolean) => void;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  setIsAiModalOpen,
  onSearchClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'story', label: '떡찌니 이야기' },
    { id: 'products', label: '전체 제품' },
    { id: 'signature', label: '시그니처 떡' },
    { id: 'organic', label: '유기농 떡' },
    { id: 'mealkit', label: '밀키트' },
    { id: 'recipe', label: '레시피' },
    { id: 'cs', label: '고객센터' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fbf9f5]/95 backdrop-blur-md shadow-xs border-b border-[#e8e2d5]'
          : 'bg-[#fbf9f5] border-b border-[#e8e2d5]'
      }`}
    >
      {/* Top Banner Notice */}
      <div className="bg-[#2d3a28] text-[#fbf9f5] px-4 py-1.5 text-center text-xs font-mono flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          좋은 재료, 좋은 사람 떡찌니
        </span>
        <span className="hidden md:inline text-stone-300">|</span>
        <span className="hidden md:inline text-[11px] text-[#d0cbbe]">
          유기농 햅쌀 & 경기미 100% 국산 떡 · 냉장 신선 무료배송 (5만원 이상)
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Slogan */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#2d3a28] text-[#fbf9f5] flex items-center justify-center font-serif font-bold text-xl group-hover:bg-[#1e271a] transition-colors shadow-xs">
              떡
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1c2319] block leading-none">
                떡찌니
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#616a5b] block pt-1">
                TTEOKJJINI · SINCE 2010
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 relative ${
                  activeTab === item.id
                    ? 'text-[#2d3a28] font-bold'
                    : 'text-[#525a4d] hover:text-[#1c2319]'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2d3a28] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Utility Actions (Search, AI Curator, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2.5 rounded-full hover:bg-[#f0ebd9] text-[#1c2319] transition-colors cursor-pointer"
              title="검색하기"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* AI Curator Modal Trigger */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f0ebd9] text-[#2d3a28] hover:bg-[#e3ded1] text-xs font-bold transition-all cursor-pointer border border-[#e3ded1]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>AI 떡 큐레이터</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#2d3a28] text-[#fbf9f5] hover:bg-[#1e271a] transition-all cursor-pointer shadow-xs"
              title="장바구니"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1c2319] hover:bg-[#f0ebd9] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f5] border-b border-[#e8e2d5] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 text-base font-serif font-medium border-b border-[#e8e2d5]/60 cursor-pointer ${
                  activeTab === item.id ? 'text-[#2d3a28] font-bold' : 'text-[#525a4d]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsAiModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-[#2d3a28] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>AI 맞춤 떡 큐레이터 사용하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
