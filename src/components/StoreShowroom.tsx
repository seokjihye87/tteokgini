import React, { useState } from 'react';
import { STORES } from '../data/brandStory';
import { MapPin, Phone, Clock, Calendar, CheckCircle2, Sparkles, X } from 'lucide-react';

export const StoreShowroom: React.FC = () => {
  const store = STORES[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-08-15');
  const [people, setPeople] = useState('2명');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setIsModalOpen(false);
      setName('');
      setPhone('');
    }, 2500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9f5] border-b border-[#e8e2d5]" id="store-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#616a5b] uppercase">
            FLAGSHIP SHOWROOM & TEA CAFE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c2319] tracking-tight">
            떡찌니 도곡본점 & 브랜드 다도 공간
          </h2>
          <p className="text-sm sm:text-base text-[#525a4d] leading-relaxed">
            매일 아침 찌어내는 떡의 피어오르는 김과 향긋한 온기를 경험할 수 있는 도심 속 차분한 안식처.
          </p>
        </div>

        {/* Store Card Showcase */}
        <div className="bg-[#f0ebd9]/40 border border-[#e3ded1] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xs">
          
          {/* Image Side */}
          <div className="lg:col-span-6 relative h-[320px] lg:h-auto overflow-hidden">
            <img
              src={store.image}
              alt={store.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#2d3a28] text-[#fbf9f5] text-xs font-bold">
              SINCE 2010 SHOWROOM
            </div>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-2xl text-[#1c2319]">
                {store.name}
              </h3>

              <p className="text-sm text-[#525a4d] leading-relaxed">
                {store.description}
              </p>

              {/* Info Table */}
              <div className="space-y-2.5 pt-2 text-xs text-[#4e5648] border-t border-[#e3ded1]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8fa980] flex-shrink-0" />
                  <span className="font-bold text-[#1c2319]">주소:</span>
                  <span>{store.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8fa980] flex-shrink-0" />
                  <span className="font-bold text-[#1c2319]">전화:</span>
                  <span>{store.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8fa980] flex-shrink-0" />
                  <span className="font-bold text-[#1c2319]">운영시간:</span>
                  <span>{store.hours}</span>
                </div>
              </div>

              {/* Features Badges */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#1c2319] block pb-1.5">제공 서비스</span>
                <div className="flex flex-wrap gap-1.5">
                  {store.features.map((f, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-[#e3ded1] text-[#2d3a28] text-xs font-medium"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-[#e3ded1]">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-[#2d3a28] text-[#fbf9f5] font-bold text-sm hover:bg-[#1e271a] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                <span>시식 & 다도 페어링 코스 예약하기</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Reservation Modal Simulation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#f0ebd9] cursor-pointer"
            >
              <X className="w-5 h-5 text-[#1c2319]" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl text-[#1c2319]">
                떡찌니 다도 & 시식 코스 예약
              </h3>
              <p className="text-xs text-[#616a5b]">
                도곡본점에서 갓 찐 시그니처 떡과 수제 차 코스를 즐기세요.
              </p>
            </div>

            {booked ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-[#8fa980] mx-auto" />
                <h4 className="font-bold text-base text-[#1c2319]">예약 신청이 완료되었습니다!</h4>
                <p className="text-xs text-[#525a4d]">
                  신청하신 연락처({phone})로 담당자가 확인 문자를 발송해 드립니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#1c2319] block mb-1">성함</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#e8e2d5] bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1c2319] block mb-1">연락처</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#e8e2d5] bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#1c2319] block mb-1">방문 희망일</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#e8e2d5] bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1c2319] block mb-1">인원</label>
                    <select
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#e8e2d5] bg-white"
                    >
                      <option value="1명">1명</option>
                      <option value="2명">2명</option>
                      <option value="3~4명">3~4명</option>
                      <option value="5명 이상">5명 이상 (단체)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2d3a28] text-white font-bold text-sm hover:bg-[#1e271a] transition-all cursor-pointer pt-2"
                >
                  예약 확정하기
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
