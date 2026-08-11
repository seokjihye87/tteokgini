import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';

export const QuickAskDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    {
      sender: 'bot',
      text: '안녕하세요! 2010년부터 100% 국산쌀만을 고집해온 떡찌니 AI 도우미입니다. 떡 보관법, 답례품 상담, 100% 국산 쌀 재료에 대해 무엇이든 편하게 물어보세요.'
    }
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.answer || '답변을 불러오지 못했습니다.' }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '떡찌니 떡은 무방부제 100% 국산쌀로 만듭니다. 수령 후 -18℃ 이하 냉동보관하시고 찹쌀떡은 상온 1~2시간 자연해동하시기 바랍니다.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#2d3a28] text-[#fbf9f5] shadow-xl hover:bg-[#1e271a] transition-all flex items-center gap-2 cursor-pointer border border-[#8fa980]/50 group"
        title="떡찌니 Q&A 문의"
      >
        <Sparkles className="w-5 h-5 text-[#d4af37] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-serif font-bold">떡찌니 AI Q&A</span>
      </button>

      {/* Floating Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-full max-w-sm bg-[#fbf9f5] border border-[#e8e2d5] rounded-2xl shadow-2xl flex flex-col h-[480px] overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#2d3a28] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#d4af37]" />
              <div>
                <h4 className="font-serif font-bold text-sm">떡찌니 AI 도우미</h4>
                <p className="text-[10px] text-stone-300">100% 국산쌀 & 보관법 24시간 상담</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#f0ebd9]/30">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-[#2d3a28] text-[#fbf9f5] rounded-br-none'
                      : 'bg-white border border-[#e8e2d5] text-[#1c2319] shadow-2xs rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-xl bg-white border border-[#e8e2d5] text-[#1c2319] flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2d3a28]" />
                  <span>답변 작성 중...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#e8e2d5] bg-white flex gap-2">
            <input
              type="text"
              placeholder="예) 떡 보관법, 답례떡 스티커 문구..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-[#e8e2d5] bg-white text-xs focus:outline-none focus:border-[#2d3a28]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 rounded-lg bg-[#2d3a28] text-white hover:bg-[#1e271a] cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
