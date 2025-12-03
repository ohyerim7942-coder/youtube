import React, { useState, useEffect } from 'react';
import { SavedScript } from '../types';
import { storageService } from '../services/storageService';

interface DashboardViewProps {
  onCreateNew: () => void;
  onViewScript: (script: SavedScript) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onCreateNew, onViewScript }) => {
  const [scripts, setScripts] = useState<SavedScript[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadScripts();
  }, []);

  const loadScripts = () => {
    const allScripts = storageService.getAllScripts();
    setScripts(allScripts);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('이 대본을 삭제하시겠습니까?')) {
      setDeletingId(id);
      setTimeout(() => {
        storageService.deleteScript(id);
        loadScripts();
        setDeletingId(null);
      }, 300);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes === 0 ? '방금 전' : `${minutes}분 전`;
      }
      return `${hours}시간 전`;
    } else if (days === 1) {
      return '어제';
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const getPreview = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            내 대본 <span className="text-brand-pink">라이브러리</span>
          </h1>
          <p className="text-gray-500 text-lg">
            저장된 대본 {scripts.length}개
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="px-8 py-4 bg-brand-pink text-white font-bold rounded-full hover:bg-pink-600 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-pink-500/30 hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          새 대본 만들기
        </button>
      </div>

      {/* Scripts Grid */}
      {scripts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">아직 저장된 대본이 없습니다</h3>
          <p className="text-gray-500 mb-8">새로운 대본을 만들어보세요!</p>
          <button
            onClick={onCreateNew}
            className="px-8 py-3 bg-brand-pink text-white font-bold rounded-full hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/30"
          >
            첫 대본 만들기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <div
              key={script.id}
              onClick={() => onViewScript(script)}
              className={`
                bg-white rounded-2xl border-2 border-gray-100 p-6 cursor-pointer
                transition-all duration-300 hover:border-brand-pink hover:shadow-xl hover:-translate-y-1
                ${deletingId === script.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              `}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                    {script.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {formatDate(script.createdAt)}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(script.id, e)}
                  className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>

              {/* Tags */}
              {(script.tone || script.targetAudience) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {script.tone && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">
                      {script.tone}
                    </span>
                  )}
                  {script.targetAudience && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                      {script.targetAudience}
                    </span>
                  )}
                </div>
              )}

              {/* Preview */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                {getPreview(script.content)}
              </p>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {script.content.length.toLocaleString()}자
                </span>
                <span className="text-brand-pink text-sm font-semibold flex items-center gap-1">
                  보기
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
