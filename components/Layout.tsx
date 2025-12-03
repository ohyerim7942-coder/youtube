import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-brand-black selection:bg-brand-pink selection:text-white flex flex-col items-center font-sans">
      <header className="w-full max-w-4xl p-6 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-pink rounded-lg flex items-center justify-center shadow-[0_4px_10px_rgba(255,0,127,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Creator <span className="text-brand-pink">AI</span> Studio
          </h1>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Gemini Powered
        </div>
      </header>
      
      <main className="w-full max-w-4xl p-6 flex-1 flex flex-col">
        {children}
      </main>

      <footer className="w-full py-8 text-center text-gray-400 text-xs border-t border-gray-100 mt-auto">
        &copy; {new Date().getFullYear()} YouTube Creator AI Generator
      </footer>
    </div>
  );
};