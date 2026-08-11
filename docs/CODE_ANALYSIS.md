# 떡찌니 홈페이지 코드 분석서

작성일: 2026-08-11  
분석 대상: `tteokgini` 저장소에서 내려받은 현재 소스 코드

## 1. 요약

이 프로젝트는 떡 브랜드 **떡찌니**의 브랜드 소개와 상품 탐색, 장바구니, 레시피·후기·블로그 콘텐츠, Gemini 기반 상품 추천 및 Q&A를 한 화면에 구성한 React 웹 애플리케이션이다.

- 프런트엔드: React 19, TypeScript, Vite, Tailwind CSS 4
- 백엔드: Express
- AI: Google Gemini API (`@google/genai`)
- 아이콘: Lucide React
- 애니메이션: Motion이 의존성에 있으나 현재 소스에서 직접 사용하는 코드는 확인되지 않음
- 데이터 저장: 데이터베이스 없이 TypeScript 정적 데이터 파일 사용
- 앱 규모: TypeScript/TSX 파일 33개, 약 4,298줄

현재 코드는 디자인과 콘텐츠 구성이 풍부한 **쇼핑몰 프로토타입**에 가깝다. 실제 운영용 쇼핑몰에 필요한 회원, 재고, 주문 저장, 결제, 관리자 기능은 구현되어 있지 않다. 또한 여러 파일의 한글이 깨져 있고 컴포넌트 간 타입 계약도 어긋나 있어, 현재 상태 그대로는 빌드 실패 가능성이 매우 높다.

## 2. 디렉터리 구조

```text
.
├─ assets/                    # 별도 정적 자산 폴더(현재 조사 범위에서는 핵심 참조 없음)
├─ src/
│  ├─ assets/images/          # 생성형 이미지 6개
│  ├─ components/             # 화면 섹션, 모달, 드로어 등 React 컴포넌트
│  ├─ data/                   # 상품·후기·레시피·블로그 등의 정적 데이터
│  ├─ App.tsx                 # 전체 화면 조립 및 전역 수준 UI 상태 관리
│  ├─ main.tsx                # React 진입점
│  ├─ index.css               # Tailwind CSS 불러오기
│  └─ types.ts                # 공통 TypeScript 인터페이스
├─ server.ts                  # Express 서버, Gemini API, Vite 미들웨어
├─ index.html                 # 웹 문서 진입점
├─ package.json               # 의존성 및 실행 스크립트
├─ vite.config.ts             # Vite/React/Tailwind 설정
├─ tsconfig.json              # TypeScript 설정
├─ metadata.json              # AI Studio용 앱 메타데이터로 추정
└─ .env.example               # 환경변수 예시
```

## 3. 애플리케이션 실행 구조

### 개발 모드

`npm run dev`는 Vite를 직접 실행하지 않고 `tsx server.ts`를 실행한다. Express 서버가 포트 3000에서 시작되고, 개발 환경에서는 Vite를 미들웨어 모드로 붙여 React 페이지와 HMR을 제공한다.

```text
브라우저
  ├─ 페이지 요청 ───────────────▶ Express + Vite middleware
  ├─ POST /api/recommend ──────▶ Express ─▶ Gemini
  └─ POST /api/ask-gemini ─────▶ Express ─▶ Gemini
```

### 운영 모드

`npm run build`는 다음 두 작업을 수행하도록 정의되어 있다.

1. `vite build`: 프런트엔드를 `dist`에 빌드
2. `esbuild server.ts ...`: 서버를 `dist/server.cjs`로 번들

`npm start`는 `node dist/server.cjs`를 실행한다. 운영 환경에서 Express는 `dist`의 정적 파일을 제공하고, 그 외 경로는 `index.html`로 돌려보내는 SPA fallback을 사용한다.

## 4. 프런트엔드 구조

### 최상위 상태

`src/App.tsx`가 라우터나 전역 상태 라이브러리 없이 주요 상태를 모두 관리한다.

| 상태 | 역할 |
|---|---|
| `activeTab` | 홈, 스토리, 상품 등 현재 화면 결정 |
| `cartItems` | 메모리에만 존재하는 장바구니 |
| `isCartOpen` | 장바구니 드로어 표시 |
| `isQuickAskOpen` | 빠른 질문 UI 표시 의도 |
| `isAiModalOpen` | AI 추천 모달 표시 |
| `isSearchOpen` | 검색 모달 표시 |
| `selectedProduct` | 상품 상세 모달에 표시할 상품 |

URL 라우팅은 없으며 `activeTab` 값에 따라 조건부 렌더링한다. 새로고침하면 홈으로 돌아가고 장바구니도 사라진다. 브라우저 뒤로 가기, 상품 상세 URL 공유, 검색엔진별 페이지 수집에는 불리하다.

### 홈 화면 섹션

홈은 다음 순서로 구성된다.

1. 헤더
2. 메인 배너
3. 브랜드 핵심 가치
4. 시그니처 상품
5. 제조 철학
6. 유기농 상품
7. 밀키트
8. 브랜드 스토리
9. 간편 조리 가이드
10. 사용 상황 제안
11. 고객 후기
12. 레시피
13. 주문 안내
14. 푸터

별도 화면 형태로 상품 카탈로그와 브랜드 스토리/블로그가 렌더링된다. 검색, 상품 상세, AI 추천은 모달이며 장바구니는 오른쪽 드로어 형태다.

### 주요 사용자 흐름

- 상품 탐색: 홈의 상품 섹션 또는 상품 카탈로그 → 상품 상세 모달
- 장바구니: 상품 추가 → 수량 변경/삭제 → 주문 완료 애니메이션
- 검색: 헤더 검색 버튼 → 상품명·설명·배지 기반 필터 → 상세 모달
- 콘텐츠: 후기 필터, 레시피 상세 모달, 블로그 카테고리 및 상세 모달
- AI 추천: 용도·수령인·예산·맛 선호 입력 → `/api/recommend`
- AI 질문: 질문 입력 → `/api/ask-gemini`

## 5. 데이터 구조

모든 비즈니스 데이터는 `src/data` 아래에 하드코딩되어 있다.

| 데이터 | 파일 | 확인된 수량 |
|---|---|---:|
| 상품 | `products.ts` | 9개 |
| 레시피 | `recipes.ts` | 6개 |
| 화면용 후기 | `reviews.ts` | 6개 |
| 블로그 | `blogPosts.ts` | 4개 |
| 브랜드 연혁·별도 후기·매장 | `brandStory.ts` | 정적 데이터 |
| 떡·차 페어링 | `pairings.ts` | 정적 데이터 |

상품 모델에는 가격, 카테고리, 설명, 이미지, 배지, 중량, 보관법, 원재료, 쌀 원산지, 평점 등이 포함된다. 상품 이미지는 로컬 생성 이미지와 Unsplash 외부 URL을 혼합 사용한다.

`TeaPairing`, `StoreShowroom`, `BRAND_MILESTONES`, `STORES` 관련 코드와 데이터는 존재하지만 현재 `App.tsx` 화면 흐름에는 연결되지 않았다. 향후 기능용 코드이거나 이전 화면 구성에서 제외된 잔여 코드로 보인다.

## 6. 서버와 API

### `GET /api/health`

서버 상태를 JSON으로 반환한다. 현재 응답의 브랜드 한글 문자열이 깨져 있다.

### `POST /api/recommend`

입력값:

- `purpose`: 선물 목적
- `recipient`: 받는 사람
- `budget`: 예산
- `flavorPreference`: 맛 선호
- `notes`: 추가 요청

Gemini에 브랜드·상품 정보와 사용자 조건을 전달하고 JSON 스키마 기반 응답을 요구한다. API 키가 없으면 서버에 정의한 고정 추천 결과를 반환한다.

예상 응답 필드는 다음과 같다.

```json
{
  "recommendations": [
    {
      "productName": "상품명",
      "reason": "추천 이유",
      "pairingTea": "추천 차",
      "giftTip": "선물 팁"
    }
  ],
  "overallAdvice": "종합 조언"
}
```

### `POST /api/ask-gemini`

`question` 문자열을 받아 브랜드, 원재료, 보관법 관련 답변을 생성한다. API 키가 없으면 고정 안내문을 반환한다.

### 환경변수

- `GEMINI_API_KEY`: Gemini 호출에 사용
- `APP_URL`: 예시 파일에는 있으나 현재 서버 코드에서 사용하지 않음
- `NODE_ENV`: 개발/운영 정적 파일 제공 방식을 결정
- `DISABLE_HMR`: Vite HMR 및 파일 감시 설정에 사용

## 7. 잘된 점

- 브랜드 소개부터 상품, 활용법, 후기, 콘텐츠까지 구매 전환 흐름이 한 페이지에 잘 배치되어 있다.
- 상품·레시피·후기·블로그 데이터를 컴포넌트와 분리해 콘텐츠 수정이 비교적 쉽다.
- 상품 타입이 가격, 보관법, 원재료, 원산지 등 식품 판매에 필요한 정보를 폭넓게 포함한다.
- AI 키가 없을 때 fallback 응답을 제공하여 UI 시연 자체는 가능하도록 설계했다.
- Gemini 키를 브라우저에 노출하지 않고 서버에서 호출하는 방향은 적절하다.
- 모바일 메뉴, 반응형 그리드, 모달·드로어 등 기본적인 반응형 UI가 고려되어 있다.

## 8. 확인된 문제와 위험

### P0: 한글 인코딩 및 소스 문법 손상

`server.ts`, 여러 `src/components/*.tsx`, `metadata.json`, `vite.config.ts` 주석 등에서 `?≪컡`, `援?궛`, `留뚯썝` 형태의 깨진 문자열이 대량으로 보인다. 단순 표시 문제뿐 아니라 따옴표와 JSX 종료 태그가 손상된 부분도 있어 TypeScript/JSX 구문 오류가 발생할 수 있다.

반면 `src/data/products.ts`, `recipes.ts`, `reviews.ts`, `blogPosts.ts`의 주요 한글은 정상이다. 따라서 저장소 전체가 아니라 일부 파일이 잘못된 문자 인코딩으로 저장되거나 변환된 것으로 보인다.

영향:

- 화면에 한글이 깨져 표시됨
- AI 프롬프트와 fallback 답변의 의미가 훼손됨
- 일부 파일은 빌드 자체가 실패할 가능성
- 손상된 원문을 현재 파일만으로 정확히 자동 복원하기 어려움

### P0: 컴포넌트 props 계약 불일치

`App.tsx`와 하위 컴포넌트의 인터페이스가 서로 맞지 않는다.

- `QuickAskDrawer`는 props를 받지 않지만 `App.tsx`는 `isOpen`, `onClose`를 전달한다. 또한 컴포넌트 내부에서 별도의 `isOpen` 상태를 관리한다.
- `AiRecommender`는 `onExploreProducts`를 요구하지만 `App.tsx`는 존재하지 않는 `onAddToCart`를 전달한다.
- `ProductCatalog`은 `onAddToCart(product, quantity, packaging)`만 정의하지만 `App.tsx`는 `onSelectProduct`도 전달한다.
- `CartDrawer`는 `cartItems`, `onClearCart`를 요구하지만 `App.tsx`는 `items`를 전달하고 `onClearCart`는 전달하지 않는다.

이 문제들은 TypeScript 검사에서 오류가 될 가능성이 높다.

### P0: 장바구니 타입 불일치

`CartItem` 타입에는 `product`, `quantity`만 있지만 `CartDrawer`는 `item.packagingType`을 읽는다. `App.tsx`의 장바구니 추가 로직도 포장 유형을 저장하지 않는다. 보자기 포장 가격 계산과 표시가 타입 및 상태 모델에 반영되지 않은 상태다.

### P1: 상품 카테고리 필터 불일치

`Product` 타입의 카테고리는 `signature`, `organic`, `mealkit`, `tteokguk`, `gift`인데 `ProductCatalog` 필터 버튼은 `rice_cake`, `steamed`, `fusion`, `meal`을 사용한다. `all` 이외의 여러 필터가 실제 상품과 일치하지 않아 결과가 비어 보일 수 있다.

### P1: AI 응답 타입 불일치

`AiRecommendationResponse` 타입은 추천 항목에 `cookingTip`을 선언하지만, 서버와 UI는 `pairingTea`, `giftTip`을 사용한다. 타입 정의를 서버 응답 스키마에 맞춰야 한다.

### P1: 주문·결제는 시뮬레이션

장바구니의 주문 버튼은 서버에 주문을 저장하거나 결제하지 않는다. 3초간 성공 화면을 보여준 뒤 장바구니를 비우는 동작만 의도되어 있다. 현재 props 불일치 때문에 이 흐름도 정상 작동하지 않을 수 있다.

### P1: API 입력 검증과 운영 보호 부족

- `/api/recommend`는 요청 필드의 타입·길이·허용값을 검증하지 않는다.
- `/api/ask-gemini`는 문자열 여부만 검사하고 길이 제한이 없다.
- 인증, 호출 횟수 제한, 비용 제한, CSRF/악용 방어가 없다.
- 내부 오류를 콘솔에 출력하지만 구조화된 로깅이나 요청 추적이 없다.
- 포트가 3000으로 고정되어 있어 일부 호스팅 환경의 `PORT` 환경변수와 맞지 않을 수 있다.

### P1: AI 답변의 신뢰성 관리 부족

식품 원재료·알레르기·보관법은 사용자 안전과 관련될 수 있으나, AI 답변을 실제 상품 데이터와 강제 연결하거나 주의 문구를 표시하는 장치가 없다. 프롬프트에만 브랜드 정보를 넣는 방식이므로 잘못된 답변 가능성이 있다.

### P2: URL 라우팅·상태 보존·SEO 부족

- React Router가 없어 콘텐츠와 상품별 URL이 없다.
- 새로고침 시 현재 화면과 장바구니가 초기화된다.
- `index.html`의 언어가 `en`이고 제목이 `My Google AI Studio App`이다.
- 상품별 메타태그, Open Graph, 구조화 데이터가 없다.

### P2: 이미지 운영 문제

- 상품/콘텐츠 일부가 Unsplash 외부 이미지에 의존한다.
- 로컬 이미지를 `/src/assets/...` 문자열 경로로 참조한다. Vite 개발 모드에서는 보일 수 있으나 운영 빌드에서 안정적인 자산 처리를 위해 import 또는 `public` 경로 사용을 검토해야 한다.
- 실제 상품과 무관한 스톡 이미지일 가능성이 있어 상용 공개 전 검수해야 한다.

### P2: 코드 정리와 테스트 부족

- 사용되지 않는 것으로 보이는 컴포넌트와 데이터가 있다.
- `Motion` 패키지는 현재 코드에서 사용 흔적이 없다.
- 단위 테스트, 컴포넌트 테스트, E2E 테스트가 없다.
- ESLint/Prettier 설정이 없고 `lint` 스크립트는 실제로 TypeScript 검사만 수행한다.
- `clean` 스크립트의 `rm -rf`는 기본 Windows 셸에서 호환되지 않을 수 있다.

## 9. 권장 개선 순서

### 1단계: 빌드 가능한 상태 복구

1. 깨지지 않은 원본 파일 또는 이전 커밋에서 한글 텍스트 복원
2. 손상된 따옴표와 JSX 태그 복구
3. `App.tsx`와 컴포넌트 props 인터페이스 통일
4. `CartItem`에 포장 유형을 넣을지 기능을 제거할지 결정
5. AI 응답 타입을 `pairingTea`, `giftTip` 기준으로 통일
6. 상품 카테고리 값 통일
7. `npm run lint`, `npm run build` 통과

### 2단계: 프로토타입 기능 안정화

1. API 오류 응답 처리와 로딩·재시도 UI 개선
2. 장바구니를 `localStorage`에 저장
3. React Router로 상품·블로그별 URL 추가
4. 미사용 코드 및 의존성 정리
5. 핵심 흐름 테스트 추가

### 3단계: 실제 판매 기능 도입

1. 상품·재고·주문 데이터베이스 설계
2. 관리자 상품/콘텐츠 관리 화면
3. 회원 또는 비회원 주문자 정보 처리
4. 결제대행사 연동 및 주문 상태 관리
5. 배송비·포장비 계산을 서버에서 재검증
6. 개인정보처리방침, 이용약관, 환불/배송 정책 반영

### 4단계: 운영 품질 강화

1. Gemini 요청 검증, rate limit, 비용 상한, 모니터링
2. 식품 정보 답변을 승인된 상품 데이터 기반으로 제한
3. SEO 메타데이터, `lang="ko"`, 브랜드 제목/설명 적용
4. 이미지 최적화 및 실제 상품 이미지 교체
5. 접근성, 모바일, 브라우저 호환성 점검

## 10. 실행 방법(코드 복구 후)

필요 조건: Node.js 20 이상 권장, npm

```bash
npm install
copy .env.example .env
npm run dev
```

그다음 브라우저에서 `http://localhost:3000`으로 접속한다. AI 기능을 실제로 사용하려면 `.env`의 `GEMINI_API_KEY`를 유효한 키로 설정해야 한다. 키가 없으면 fallback 응답이 반환되도록 작성되어 있다.

운영 빌드 확인:

```bash
npm run lint
npm run build
npm start
```

## 11. 분석 검증 범위와 제한

이번 분석은 내려받은 소스 파일 전체의 구조, 의존성, 컴포넌트 연결, 데이터, API를 정적으로 조사해 작성했다. 현재 컴퓨터 셸에서 `node`, `npm`, `git` 실행 파일이 인식되지 않아 다음 항목은 수행하지 못했다.

- 패키지 설치
- TypeScript 실제 컴파일
- Vite 빌드
- 브라우저 렌더링 확인
- API 실호출

따라서 빌드 오류 평가는 소스 코드상의 명백한 타입·props·문법 불일치를 근거로 한 것이다. Node.js 환경을 준비한 뒤 실제 오류 목록을 다시 수집하는 것이 다음 기술 작업으로 적절하다.
