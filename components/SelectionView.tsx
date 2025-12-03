import React from 'react';
import { AnalysisResult, Suggestion } from '../types';

interface SelectionViewProps {
  analysis: AnalysisResult;
  onSelectTopic: (suggestion: Suggestion) => void;
  isLoading: boolean;
}

export const SelectionView: React.FC<SelectionViewProps> = ({ analysis, onSelectTopic, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 animate-pulse">
        <div className="w-16 h-16 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mb-6"></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">대본을 생성하고 있습니다...</h3>
        <p className="text-gray-500">Gemini가 창의력을 발휘하는 중입니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in-up">
      <div className="mb-10 bg-pink-50 border border-pink-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm text-brand-pink">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">분석 결과</h3>
            <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2 text-sm">
              <p className="text-gray-600"><span className="text-brand-pink font-bold">어조:</span> {analysis.tone}</p>
              <p className="text-gray-600"><span className="text-brand-pink font-bold">타겟 시청자:</span> {analysis.targetAudience}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">추천 주제를 <span className="text-brand-pink">선택하세요</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analysis.suggestions.map((suggestion, index) => (
          <div 
            key={index}
            onClick={() => onSelectTopic(suggestion)}
            className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:border-brand-pink hover:shadow-xl hover:-translate-y-2 flex flex-col"
          >
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 group-hover:bg-brand-pink group-hover:text-white transition-colors">
              {index + 1}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4 group-hover:text-brand-pink transition-colors line-clamp-2">
              {suggestion.title}
            </h3>
            
            <p className="text-sm text-gray-500 mb-6 line-clamp-3 min-h-[60px]">
              {suggestion.description}
            </p>
            
            <div className="mt-auto">
              <div className="text-xs text-gray-400 pt-4 border-t border-gray-100">
                <span className="font-semibold text-gray-900 block mb-1">추천 이유:</span>
                {suggestion.reasoning}
              </div>

              <div className="mt-6 w-full py-3 bg-gray-50 rounded-xl text-center text-sm font-bold text-gray-400 group-hover:bg-brand-pink group-hover:text-white transition-colors">
                이 주제로 대본 쓰기
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};