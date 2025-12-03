import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import { StepIndicator } from './components/StepIndicator';
import { DashboardView } from './components/DashboardView';
import { InputView } from './components/InputView';
import { SelectionView } from './components/SelectionView';
import { ResultView } from './components/ResultView';
import { analyzeTextAndSuggest, generateScript } from './services/geminiService';
import { storageService } from './services/storageService';
import { AppState, AnalysisResult, ScriptResult, Suggestion, SavedScript } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.DASHBOARD);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewingScript, setViewingScript] = useState<SavedScript | null>(null);

  // 결과 화면에서 임시 저장 처리
  useEffect(() => {
    if (appState === AppState.RESULT && scriptResult && analysisResult) {
      storageService.saveTempScript({
        title: scriptResult.title,
        content: scriptResult.content,
        tone: analysisResult.tone,
        targetAudience: analysisResult.targetAudience,
      });
    }
  }, [appState, scriptResult, analysisResult]);

  const handleAnalyze = async (inputText: string) => {
    try {
      setAppState(AppState.ANALYZING);
      setError(null);
      const result = await analyzeTextAndSuggest(inputText);
      setAnalysisResult(result);
      setAppState(AppState.SELECTION);
    } catch (err) {
      console.error(err);
      setError("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setAppState(AppState.INPUT);
    }
  };

  const handleSelectTopic = async (suggestion: Suggestion) => {
    if (!analysisResult) return;
    
    try {
      setAppState(AppState.GENERATING);
      setError(null);
      const result = await generateScript(
        suggestion.title, 
        analysisResult.tone, 
        analysisResult.targetAudience
      );
      setScriptResult(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("대본 생성 중 오류가 발생했습니다. 다른 주제를 선택해보세요.");
      setAppState(AppState.SELECTION);
    }
  };

  const handleReset = () => {
    setAppState(AppState.DASHBOARD);
    setAnalysisResult(null);
    setScriptResult(null);
    setViewingScript(null);
    setError(null);
    storageService.clearTempScript();
  };

  const handleCreateNew = () => {
    setAppState(AppState.INPUT);
    setAnalysisResult(null);
    setScriptResult(null);
    setViewingScript(null);
    setError(null);
    storageService.clearTempScript();
  };

  const handleViewScript = (script: SavedScript) => {
    setViewingScript(script);
    setScriptResult({
      title: script.title,
      content: script.content,
    });
    if (script.tone && script.targetAudience) {
      setAnalysisResult({
        tone: script.tone,
        targetAudience: script.targetAudience,
        suggestions: [],
      });
    }
    setAppState(AppState.RESULT);
  };

  const handleSaveScript = (title: string, content: string) => {
    try {
      storageService.saveScript({
        title,
        content,
        tone: analysisResult?.tone,
        targetAudience: analysisResult?.targetAudience,
      });
      storageService.clearTempScript();
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <Layout>
      {appState !== AppState.DASHBOARD && <StepIndicator currentStep={appState} />}
      
      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 text-center text-sm font-medium animate-pulse">
          ⚠️ {error}
        </div>
      )}

      {appState === AppState.DASHBOARD && (
        <DashboardView onCreateNew={handleCreateNew} onViewScript={handleViewScript} />
      )}

      {(appState === AppState.INPUT || appState === AppState.ANALYZING) && (
        <InputView onAnalyze={handleAnalyze} isLoading={appState === AppState.ANALYZING} />
      )}

      {(appState === AppState.SELECTION || appState === AppState.GENERATING) && analysisResult && (
        <SelectionView 
          analysis={analysisResult} 
          onSelectTopic={handleSelectTopic} 
          isLoading={appState === AppState.GENERATING}
        />
      )}

      {appState === AppState.RESULT && scriptResult && (
        <ResultView 
          scriptData={scriptResult} 
          onReset={handleReset}
          onSave={!viewingScript ? handleSaveScript : undefined}
          tone={analysisResult?.tone}
          targetAudience={analysisResult?.targetAudience}
        />
      )}
    </Layout>
  );
};

export default App;
