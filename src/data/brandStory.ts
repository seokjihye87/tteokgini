import { BrandMilestone, Review, StoreInfo } from '../types';

export const BRAND_MILESTONES: BrandMilestone[] = [
  {
    year: '2010',
    title: '떡찌니 첫 방앗간 개설',
    description: '100% 국산 쌀만을 고집하겠다는 고집 하나로 정직한 떡찌니 브랜드의 첫 발걸음을 뗐습니다.'
  },
  {
    year: '2014',
    title: '제주 생쑥 오메기떡 시그니처 개발',
    description: '제주 한라산 생쑥과 36시간 저온 치댐 공법으로 떡찌니를 대표하는 히트 라인업을 완성하였습니다.'
  },
  {
    year: '2018',
    title: '도곡 / 강남 본점 & 떡찌니 다도 카페 오픈',
    description: '갓 찌어낸 떡과 정갈한 우리 차를 도심 속에서 함께 경험할 수 있는 프리미엄 공간을 만들었습니다.'
  },
  {
    year: '2022',
    title: '무방부제 급속 동결 기술 도입',
    description: '화학 첨가물 없이도 전국 어디서나 갓 방앗간에서 나온 촉촉함을 느낄 수 있는 콜드체인 시스템 구축.'
  },
  {
    year: '2026',
    title: '누적 판매 1,500만 개 돌파 및 AI 맞춤 답례 서비스',
    description: '100% 국산 쌀에 대한 변함없는 사랑으로 16년간 한국 전통 떡 문화의 고급화를 이끌어가고 있습니다.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: '김*희 고객님',
    date: '2026.08.05',
    rating: 5,
    productName: '제주 쑥 찹쌀 오메기떡',
    content: '부모님 생신 선물로 시켜드렸는데 쑥 향이 정말 너무 고급스럽고 통팥이 많이 안 달아서 맛있다고 극찬을 하셨어요! 100% 국산쌀이라 믿고 먹습니다.',
    verified: true
  },
  {
    id: 'rev-02',
    author: '이*우 고객님',
    date: '2026.08.02',
    rating: 5,
    productName: '떡찌니 명품 품격 보자기 선물세트',
    content: '시댁 첫인사 선물로 보자기 포장 옵션 선택했는데 보자기가 너무 영롱하고 노리개 장식까지 고급져서 시어머니께서 대만족하셨어요. 대성공입니다!',
    verified: true
  },
  {
    id: 'rev-03',
    author: '박*진 고객님',
    date: '2026.07.29',
    rating: 5,
    productName: '공주 밤 & 서리태 견과 영양찰떡',
    content: '아침마다 하나씩 상온에 꺼내두었다가 회사 가지고 가서 라떼랑 먹는데 속이 정말 든든해요. 밤이 크게 통째로 박혀있어요.',
    verified: true
  },
  {
    id: 'rev-04',
    author: '최*영 고객님',
    date: '2026.07.20',
    rating: 5,
    productName: '감사 & 기쁨 마음담은 답례떡',
    content: '결혼식 답례떡으로 150세트 주문했습니다. 무료 제작해주신 스티커 문구도 예쁘고 시간 맞춰 정확하게 배송해주셔서 직원분들께 칭찬 많이 들었습니다.',
    verified: true
  }
];

export const STORES: StoreInfo[] = [
  {
    id: 'store-01',
    name: '떡찌니 도곡본점 & 브랜드 다도 카페',
    address: '서울특별시 강남구 도곡로 180 떡찌니 빌딩 1F',
    phone: '02-571-1210',
    hours: '매일 08:00 - 20:00 (명절 당일 휴무)',
    description: '2010년부터 시작된 떡찌니의 뿌리가 되는 장소입니다. 매일 아침 갓 찌어내는 떡의 피어오르는 김과 향긋한 우리 차의 깊은 풍미를 고즈넉한 인테리어 속에서 함께 만나보세요.',
    features: ['당일 생산 떡 시식', '전통 차 & 떡 페어링 코스', '보자기 예단 맞춤 상담', '주차 가능 (발렛)'],
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop'
  }
];
