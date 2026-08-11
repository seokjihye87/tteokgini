import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#1c2319] text-[#e8e2d5] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#2d3a28]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Brand Statement & Nav Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2d3a28]">
          
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37] text-[#1c2319] flex items-center justify-center font-serif font-bold text-xl">
                떡
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  떡찌니
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#8fa980] block">
                  SINCE 2010 · TTEOKJJINI
                </span>
              </div>
            </div>

            <p className="font-serif text-lg font-bold text-[#d4af37] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              좋은 재료, 좋은 사람 떡찌니
            </p>

            <p className="text-xs text-[#a39e93] leading-relaxed max-w-md font-light">
              떡찌니는 떡에 진심! 유기농 햅쌀과 계약재배 경기미, 국산 쌀을 바탕으로 맛과 신뢰를 담은 떡을 만듭니다.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              제품 카테고리
            </h4>
            <ul className="space-y-2 text-[#a39e93]">
              <li>
                <button onClick={() => setActiveTab('signature')} className="hover:text-white transition-colors cursor-pointer">
                  시그니처 떡국떡 (하트/행운꽃/오색)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('organic')} className="hover:text-white transition-colors cursor-pointer">
                  유기농 인증 떡 라인업
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('mealkit')} className="hover:text-white transition-colors cursor-pointer">
                  지역 상생 밀키트 (퇴촌/완도)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('recipe')} className="hover:text-white transition-colors cursor-pointer">
                  떡찌니 추천 레시피
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              고객지원 & 문의
            </h4>
            <div className="space-y-1 text-[#a39e93]">
              <p className="font-mono font-bold text-base text-white">031-768-8313</p>
              <p>평일 09:00 - 18:00 (점심 12-13시)</p>
              <p>토/일/공휴일 휴무</p>
              <p className="pt-2 text-stone-300">tteokjjini@naver.com</p>
            </div>
          </div>

        </div>

        {/* Company Legal Metadata & Copyright */}
        <div className="space-y-4 text-xs text-[#827d73] font-mono leading-relaxed">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>상호명: 주식회사 떡찌니</span>
            <span>대표자: 김남혁</span>
            <span>사업자등록번호: 247-87-02451</span>
            <span>통신판매업신고번호: 제 2022-경기광주-1698호</span>
          </div>

          <div>
            <span>사업장 주소: 경기도 광주시 오포읍 오포로 312</span>
            <span className="ml-4">대표전화: 031-768-8313</span>
            <span className="ml-4">이메일: tteokjjini@naver.com</span>
          </div>

          <div className="pt-4 border-t border-[#2d3a28] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6d685e]">
            <p>Copyright © 떡찌니 All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-600 fill-rose-600 inline" /> for healthy food.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
