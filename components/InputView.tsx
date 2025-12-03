import React, { useState } from 'react';

interface InputViewProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export const InputView: React.FC<InputViewProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
          무엇을 만들고 <span className="text-brand-pink">싶으신가요?</span>
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto text-lg">
          아이디어나 스타일을 적어주세요.<br/>
          AI가 채널의 성향을 분석하고 킬러 콘텐츠를 제안합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative group">
          {/* Decorative shadow/glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-pink to-purple-400 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
          
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="예시: 저는 주로 IT 기기 리뷰를 합니다. 최근 출시된 스마트폰에 대해 다루고 싶은데, 너무 뻔하지 않게 비교 분석하는 대본을 쓰고 싶어요..."
              className="w-full h-64 bg-white text-gray-900 p-8 rounded-xl border-2 border-gray-100 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 outline-none resize-none text-lg leading-relaxed placeholder-gray-300 shadow-sm transition-all"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`
              px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg
              ${!text.trim() || isLoading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-brand-pink text-white hover:bg-pink-600 hover:shadow-pink-500/30 hover:-translate-y-1'
              }
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                스타일 분석 중...
              </>
            ) : (
              <>
                분석 및 주제 추천 받기
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};