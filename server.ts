import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: '떡찌니 (Tteokjjini since 2010)' });
  });

  // AI Rice Cake & Gift Recommendation API
  app.post('/api/recommend', async (req, res) => {
    try {
      const { purpose, recipient, budget, flavorPreference, notes } = req.body;

      if (!ai) {
        // Friendly fallback response if Gemini key not set
        return res.json({
          recommendations: [
            {
              productName: '제주 쑥 찹쌀 오메기떡',
              reason: '2010년부터 사랑받아온 떡찌니 시그니처! 100% 국산 찹쌀과 제주 생쑥의 향긋함이 돋보입니다.',
              pairingTea: '우전 세작 수제 녹차',
              giftTip: '실크 보자기 추가 포장으로 품격을 한층 올려보세요.'
            },
            {
              productName: '공주 밤 & 서리태 견과 영양찰떡',
              reason: '알알이 씹히는 공주 알밤과 국산 서리태의 고소함이 일품인 대표 건강 떡입니다.',
              pairingTea: '구수한 우엉차 또는 옥수수수염차',
              giftTip: '개별 포장되어 아침 식사 대용으로 아주 실용적입니다.'
            }
          ],
          overallAdvice: `${recipient || '소중한 분'}을 위한 ${purpose || '선물'}로 100% 국산 쌀과 저당 자연 재료를 활용한 떡찌니 시그니처 라인을 적극 추천해 드립니다.`
        });
      }

      const prompt = `
당신은 2010년에 창립된 100% 국산쌀 프리미엄 건강 떡 브랜드 '떡찌니'의 수석 떡 장인 및 선물 컨시어지 AI입니다.
다음 고객의 조건과 요구사항에 맞추어 가장 잘 어울리는 떡찌니 제품과 선물 제안을 추천해 주세요.

[고객 선물 조건]
- 선물 목적/용도: ${purpose || '일상 건강 선물'}
- 받는 분: ${recipient || '가족 및 지인'}
- 예산대: ${budget || '3~5만원대'}
- 선호 맛/스타일: ${flavorPreference || '고소함 / 은은한 단맛'}
- 추가 고려사항: ${notes || '없음'}

[떡찌니 핵심 라인업 참고]
1. 제주 쑥 찹쌀 오메기떡 (32,000원) - 100% 국산 찹쌀, 제주 생쑥, 통팥
2. 떡찌니 명품 품격 보자기 선물세트 (68,000원) - 영양찰떡 4종+오메기, 수공예 실크 보자기
3. 수제 앙금 수놓은 백설기 세트 (28,000원) - 국산 멥쌀, 천연 분말 수제 앙금
4. 공주 밤 & 서리태 견과 영양찰떡 (34,000원) - 공주 알밤, 서리태, 저당 영양식
5. 프리미엄 흑임자 구구 경단 (29,000원) - 100% 국산 흑임자, 티푸드
6. 감사 & 기쁨 마음담은 답례떡 (4,500원~) - 스티커 무료, 결혼/돌/행사

고객에게 다정하고 품격 있는 떡찌니 장인의 어조(한국어)로 JSON 형식에 맞추어 응답해 주세요.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productName: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    pairingTea: { type: Type.STRING },
                    giftTip: { type: Type.STRING }
                  },
                  required: ['productName', 'reason', 'pairingTea', 'giftTip']
                }
              },
              overallAdvice: { type: Type.STRING }
            },
            required: ['recommendations', 'overallAdvice']
          }
        }
      });

      const jsonText = response.text || '{}';
      const parsed = JSON.parse(jsonText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/recommend:', error);
      res.status(500).json({
        error: 'AI 추천을 불러오는 중 오류가 발생했습니다.',
        fallbackAdvice: '떡찌니 도곡본점 CS 센터(02-571-1210)로 전화 주시면 맞춤 상담을 도와드립니다.'
      });
    }
  });

  // AI Q&A Assistant for Storage, Recipes & Heritage Questions
  app.post('/api/ask-gemini', async (req, res) => {
    try {
      const { question } = req.body;

      if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: '질문 내용이 필요합니다.' });
      }

      if (!ai) {
        return res.json({
          answer: '떡찌니 떡은 무방부제 100% 국산쌀로 만들어지므로 수령 직후 드실 분량 외에는 -18℃ 이하 냉동보관을 권장합니다. 찹쌀떡류는 상온에서 1~2시간 자연해동하시고, 설기류는 전자레인지에 물 한 컵과 함께 30초 데우시면 갓 찐 촉촉함을 즐기실 수 있습니다.'
        });
      }

      const prompt = `
당신은 2010년부터 100% 국산쌀만을 고집해온 '떡찌니'의 브랜딩 Q&A AI 도우미입니다.
고객 질문: "${question}"

[떡찌니 핵심 브랜드 가치 및 지식]
- 2010년 설립된 국산쌀 전문 프리미엄 떡 브랜드
- 100% 국내산 특급 햅쌀(찹쌀/멥쌀)만 사용 (충남 서산, 경기 이천, 전북 김제 등 계약재배)
- 제주 한라산 생쑥, 공주 알밤, 국내산 서리태 및 흑임자 사용
- 무방부제, 무인공색소, 저당 수제 방식
- 36시간 저온 숙성 및 급속 동결 콜드체인 배송
- 떡 보관: 수령 즉시 냉동보관 필수. 찹쌀떡은 상온 자연해동, 설기는 전자레인지/찜기 해동.

고객에게 정중하고 전문적이며 친절한 톤(한국어)으로 답변을 작성해 주세요. (200~300자 내외)
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
      });

      res.json({ answer: response.text });
    } catch (error: any) {
      console.error('Error in /api/ask-gemini:', error);
      res.status(500).json({ error: '답변을 생성하지 못했습니다.' });
    }
  });

  // Setup Vite middleware or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[떡찌니 Tteokjjini] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
