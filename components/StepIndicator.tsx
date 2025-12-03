import React from 'react';
import { AppState } from '../types';

interface StepIndicatorProps {
  currentStep: AppState;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { key: AppState.INPUT, label: '입력' },
    { key: AppState.SELECTION, label: '주제 선정' },
    { key: AppState.RESULT, label: '대본 완성' },
  ];

  const getStepStatus = (stepKey: string) => {
    // Helper to determine active/completed state based on enum order logic
    const order = [
      AppState.INPUT, 
      AppState.ANALYZING, 
      AppState.SELECTION, 
      AppState.GENERATING, 
      AppState.RESULT
    ];
    
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepKey as AppState);

    // ANALYZING maps to INPUT visually, GENERATING maps to SELECTION visually
    if (currentStep === AppState.ANALYZING && stepKey === AppState.INPUT) return 'active';
    if (currentStep === AppState.GENERATING && stepKey === AppState.SELECTION) return 'active';

    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-12">
      {steps.map((step, index) => {
        const status = getStepStatus(step.key);
        return (
          <div key={step.key} className="flex flex-col items-center relative flex-1">
             {/* Connector Line */}
            {index !== 0 && (
              <div 
                className={`absolute top-4 -left-1/2 w-full h-[2px] -z-10 transition-colors duration-300
                  ${status === 'completed' || status === 'active' ? 'bg-brand-pink' : 'bg-gray-200'}
                `} 
              />
            )}
            
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2
              ${status === 'completed' ? 'bg-brand-pink border-brand-pink text-white shadow-md' : ''}
              ${status === 'active' ? 'bg-white border-brand-pink text-brand-pink shadow-[0_0_0_4px_rgba(255,0,127,0.1)]' : ''}
              ${status === 'pending' ? 'bg-white border-gray-200 text-gray-300' : ''}
            `}>
              {status === 'completed' ? '✓' : index + 1}
            </div>
            <span className={`
              mt-2 text-xs font-bold transition-colors duration-300
              ${status === 'active' ? 'text-brand-pink' : ''}
              ${status === 'completed' ? 'text-gray-900' : ''}
              ${status === 'pending' ? 'text-gray-300' : ''}
            `}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};