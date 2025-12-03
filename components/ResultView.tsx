import React, { useState, useEffect } from 'react';
import { ScriptResult } from '../types';

interface ResultViewProps {
  scriptData: ScriptResult;
  onReset: () => void;
  onSave?: (title: string, content: string) => void;
  tone?: string;
  targetAudience?: string;
}

export const ResultView: React.FC<ResultViewProps> = ({ 
  scriptData, 
  onReset, 
  onSave,
  tone,
  targetAudience 
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [editedContent, setEditedContent] = useState(scriptData.content);

  // 자동 임시 저장 (컴포넌트 마운트 시)
  useEffect(() => {
    // 임시 저장 로직은 상위에서 처리
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedContent).then(() => {
      alert('대본이 클립보드에 복사되었습니다!');
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(scriptData.title, editedContent);
      setIsSaved(true);
      setTimeout(() => {
        alert('대본이 저장되었습니다!');
      }, 100);
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 truncate max-w-xl">
          <span className="text-brand-pink mr-2">Draft:</span> {scriptData.title}
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={copyToClipboard}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
            복사하기
          </button>
          {onSave && !isSaved && (
            <button 
              onClick={handleSave}
              className="px-5 py-2.5 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              저장 완료
            </button>
          )}
          {isSaved && (
            <button 
              disabled
              className="px-5 py-2.5 bg-gray-100 text-gray-400 text-sm font-bold rounded-xl cursor-not-allowed flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              저장됨
            </button>
          )}
          <button 
            onClick={onReset}
            className="px-5 py-2.5 bg-brand-pink text-white text-sm font-bold rounded-xl hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20"
          >
            새로 만들기
          </button>
        </div>
      </div>

      {/* 자동 저장 안내 */}
      <div className="mb-4 text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <span>
          이 대본은 임시 저장되었습니다. 메인 화면 리스트에 추가하려면 <strong className="text-blue-600">'저장 완료'</strong> 버튼을 눌러주세요.
        </span>
      </div>

      <div className="w-full bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Mock Window UI Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="ml-4 text-xs font-mono text-gray-400 flex-1 text-center">Final_Script_v1.md</div>
        </div>
        
        <div className="p-8 overflow-auto max-h-[70vh]">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full min-h-[400px] whitespace-pre-wrap font-sans text-base leading-relaxed text-gray-800 bg-transparent border-none outline-none resize-none"
            />
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm">
        * AI가 생성한 대본은 사실 확인이 필요할 수 있습니다. 촬영 전 내용을 검토해주세요.
      </div>
    </div>
  );
};