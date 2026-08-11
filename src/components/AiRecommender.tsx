import React, { useState } from 'react';
import { Sparkles, X, Gift, Coffee, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { AiRecommendationResponse } from '../types';

interface AiRecommenderProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const AiRecommender: React.FC<AiRecommenderProps> = ({
  isOpen,
  onClose,
  onExploreProducts
}) => {
  const [purpose, setPurpose] = useState('부모님/어르신 선물');
  const [recipient, setRecipient] = useState('부모님 및 친척');
  const [budget, setBudget] = useState('3~5만원대');
  const [flavorPreference, setFlavorPreference] = useState('고소하고 은은한 저당 맛');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiRecommendationResponse | null>(null);

  if (!isOpen) return null;

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose,
          recipient,
          budget,
          flavorPreference,
          notes
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        recommendations: [
          {
            productName: '제주 쑥 찹쌀 오메기떡',
            reason: '2010년부터 지켜온 100% 국산 찹쌀과 제주 생쑥의 은은한 향이 일품입니다.',
            pairingTea: '우전 세작 수제 녹차',
            giftTip: '실크 보자기 추가 포장을 추천해 드립니다.'
          }
        ],
        overallAdvice: '소중한 분을 위한 선물로 100% 국산 쌀의 건강함이 담긴 떡찌니 시그니처 떡 세트를 추천해 드립니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e8e2d5] pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[#2d3a28] text-[#d4af37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1c2319]">
                떡찌니 AI 떡 & 선물 추천 Curator
              </h3>
              <p className="text-xs text-[#616a5b]">
                100% 국산 쌀과 상황에 맞는 맞춤 떡찌니 라인업을 추천해 드립니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0ebd9] text-[#1c2319] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRecommend} className="space-y-4 text-xs">
          
          {/* Purpose */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1c2319]">선물 용도 / 목적</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['부모님/어르신 선물', '결혼/돌 답례품', '아침 식사 대용', '다도/티타임 디저트', '기업/단체 행사', '명절 예단'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    purpose === p
                      ? 'bg-[#2d3a28] text-white font-bold border-[#2d3a28]'
                      : 'bg-white border-[#e8e2d5] text-[#4e5648] hover:bg-[#f0ebd9]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#1c2319]">받으시는 분</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#e8e2d5] bg-white text-xs text-[#1c2319] focus:outline-none focus:border-[#2d3a28]"
              >
                <option value="부모님 및 어르신">부모님 및 어르신</option>
                <option value="직장 동료 / 상사">직장 동료 / 상사</option>
                <option value="아이들 / 학생">아이들 / 학생</option>
                <option value="외국인 손님">외국인 손님</option>
                <option value="나 자신 (건강 간식)">나 자신 (건강 간식)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1c2319]">예산대</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#e8e2d5] bg-white text-xs text-[#1c2319] focus:outline-none focus:border-[#2d3a28]"
              >
                <option value="2~3만원대">2~3만원대 (실속형)</option>
                <option value="3~5만원대">3~5만원대 (인기형)</option>
                <option value="6~10만원대">6~10만원대 (명품 보자기)</option>
                <option value="10만원 이상">10만원 이상 (예단/대량)</option>
              </select>
            </div>
          </div>

          {/* Flavor Preference */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1c2319]">선호하는 맛 / 스타일</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                '고소하고 은은한 저당 맛 (쑥/흑임자)',
                '달콤한 수제 통팥 앙금',
                '공주 알밤 & 견과류 영양',
                '현대적 퓨전 크림치즈 / 와플'
              ].map((fl) => (
                <button
                  type="button"
                  key={fl}
                  onClick={() => setFlavorPreference(fl)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    flavorPreference === fl
                      ? 'bg-[#2d3a28] text-white font-bold border-[#2d3a28]'
                      : 'bg-white border-[#e8e2d5] text-[#4e5648] hover:bg-[#f0ebd9]'
                  }`}
                >
                  {fl}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#2d3a28] text-[#fbf9f5] font-bold text-sm hover:bg-[#1e271a] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                <span>떡찌니 장인 AI가 최선의 추천을 계산 중입니다...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>AI 맞춤 떡 추천받기</span>
              </>
            )}
          </button>
        </form>

        {/* AI Result View */}
        {result && (
          <div className="space-y-4 p-5 rounded-xl bg-[#f0ebd9]/80 border border-[#e3ded1] animate-fadeIn">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#616a5b] uppercase">AI CURATION ADVICE</span>
              <p className="text-xs text-[#1c2319] font-serif font-bold leading-relaxed">
                "{result.overallAdvice}"
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-lg bg-white border border-[#e8e2d5] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#2d3a28] flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#8fa980]" />
                      <span>{rec.productName}</span>
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#f0ebd9] text-[#2d3a28] font-mono">
                      추천 {i + 1}
                    </span>
                  </div>

                  <p className="text-xs text-[#4e5648] leading-relaxed">
                    {rec.reason}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-[#616a5b] border-t border-[#e8e2d5]/60">
                    <div className="flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5 text-[#8fa980]" />
                      <span>추천 차: {rec.pairingTea}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-[#8fa980]" />
                      <span>선물 팁: {rec.giftTip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="w-full py-2.5 rounded-lg bg-[#2d3a28] text-white text-xs font-bold hover:bg-[#1e271a] transition-colors cursor-pointer"
              >
                추천된 떡찌니 상품 둘러보기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
