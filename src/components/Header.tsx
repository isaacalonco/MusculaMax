import type React from 'react';
import { Code2, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, totalSteps }) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/80 px-4 sm:px-6 py-3.5 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        {/* DevCodeMax Brand Avatar + Status */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {/* Gradient Icon Badge */}
            <div className="w-10 h-10 rounded-xl border border-primary/40 bg-gradient-to-br from-primary/20 via-card to-card flex items-center justify-center text-primary shadow-inner">
              <Code2 className="w-5 h-5" />
            </div>
            {/* Status Online Pulsante */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full ring-2 ring-background animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h4 className="font-body font-bold text-sm sm:text-base text-foreground leading-tight">
                DevCodeMax IA
              </h4>
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            </div>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              Mentor Python & Java Online
            </p>
          </div>
        </div>

        {/* Barra de Progresso do Quiz */}
        <div className="flex items-center gap-2.5">
          <div className="w-20 sm:w-28 bg-secondary/80 h-2 rounded-full overflow-hidden p-0.5 border border-border/50">
            <div
              className="bg-gradient-to-r from-primary/80 to-primary h-full rounded-full transition-all duration-500 ease-out shadow-sm shadow-primary/30"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-body font-bold text-primary tabular-nums shrink-0">
            {progressPercent}%
          </span>
        </div>
      </div>
    </header>
  );
};
