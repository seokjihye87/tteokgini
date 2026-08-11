import React, { useState } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { BrandCoreValues } from './components/BrandCoreValues';
import { SignatureProducts } from './components/SignatureProducts';
import { ManufacturingPhilosophy } from './components/ManufacturingPhilosophy';
import { OrganicProducts } from './components/OrganicProducts';
import { MealKits } from './components/MealKits';
import { BrandStory } from './components/BrandStory';
import { EasyCookingGuide } from './components/EasyCookingGuide';
import { UsageScenarios } from './components/UsageScenarios';
import { ReviewSection } from './components/ReviewSection';
import { RecipeSection } from './components/RecipeSection';
import { OrderGuide } from './components/OrderGuide';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickAskDrawer } from './components/QuickAskDrawer';
import { AiRecommender } from './components/AiRecommender';
import { BlogSection } from './components/BlogSection';
import { ProductCatalog } from './components/ProductCatalog';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickAskOpen, setIsQuickAskOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1c2319] font-sans antialiased selection:bg-[#2d3a28] selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'signature') scrollToSection('signature-section');
          if (tab === 'organic') scrollToSection('organic-section');
          if (tab === 'mealkit') scrollToSection('mealkit-section');
          if (tab === 'recipe') scrollToSection('recipe-section');
          if (tab === 'story') scrollToSection('story-section');
          if (tab === 'cs') scrollToSection('cs-section');
        }}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        setIsAiModalOpen={setIsAiModalOpen}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Homepage Flow (Orchestrated according to the 13 recommended exposure sections) */}
      {activeTab === 'story' ? (
        <main className="max-w-7xl mx-auto px-4 py-12">
          <BrandStory onOpenBlog={() => setActiveTab('blog')} />
          <div className="pt-12">
            <BlogSection />
          </div>
        </main>
      ) : activeTab === 'products' ? (
        <main className="max-w-7xl mx-auto px-4 py-12">
          <ProductCatalog
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        </main>
      ) : (
        <main>
          {/* Section 1: 메인 비주얼 */}
          <HeroBanner
            onExploreProducts={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReadStory={() => scrollToSection('story-section')}
            onOpenAi={() => setIsAiModalOpen(true)}
          />

          {/* Section 2: 브랜드 핵심 소개 */}
          <BrandCoreValues />

          {/* Section 3: 대표 제품 (시그니처: 하트, 행운꽃, 오색) */}
          <SignatureProducts
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />

          {/* Section 4: 떡찌니가 좋은 떡을 만드는 방법 */}
          <ManufacturingPhilosophy />

          {/* Section 5: 유기농 제품 */}
          <OrganicProducts
            onAddToCart={handleAddToCart}
            onExploreCategory={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Section 6: 지역의 좋은 재료를 담은 밀키트 */}
          <MealKits
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />

          {/* Section 7: 떡찌니 이야기 */}
          <BrandStory onOpenBlog={() => setActiveTab('products')} />

          {/* Section 8: 간편한 조리 */}
          <EasyCookingGuide />

          {/* Section 9: 활용 상황 */}
          <UsageScenarios
            onExploreProducts={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Section 10: 고객 후기 */}
          <ReviewSection />

          {/* Section 11: 레시피 콘텐츠 */}
          <RecipeSection />

          {/* Section 12: 구매 안내 */}
          <OrderGuide onOpenQuickAsk={() => setIsQuickAskOpen(true)} />
        </main>
      )}

      {/* Section 13: 푸터 */}
      <Footer setActiveTab={setActiveTab} />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      <QuickAskDrawer
        isOpen={isQuickAskOpen}
        onClose={() => setIsQuickAskOpen(false)}
      />

      {isAiModalOpen && (
        <AiRecommender
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setIsSearchOpen(false);
          }}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

    </div>
  );
}
