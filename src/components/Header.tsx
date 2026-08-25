import type React from 'react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, totalSteps }) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Treinador Avatar + Status */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {/* SVG Avatar Fallback - Programming */}
            <div className="w-10 h-10 rounded-full border border-primary/40 bg-card flex items-center justify-center font-display text-primary font-bold text-lg overflow-hidden">
              <span className="text-xl">👨‍💻</span>
            </div>
            {/* Status Online Pulsante */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full ring-2 ring-background animate-pulse" />
          </div>
          <div>
            <h4 className="font-body font-bold text-sm text-foreground leading-tight">
              DevCodeMax IA
            </h4>
            <p className="font-body text-xs text-muted-foreground">Mentor Python & Java Online</p>
          </div>
        </div>

        {/* Barra de Progresso do Quiz */}
        <div className="flex items-center gap-2">
          <div className="w-20 sm:w-28 bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-body font-bold text-primary tabular-nums">
            {progressPercent}%
          </span>
        </div>
      </div>
    </header>
  );
};
