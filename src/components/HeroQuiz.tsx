import type React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Code2 } from 'lucide-react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    level: 'travado' | 'ativo' | 'pronto';
    points: number;
  }[];
}

interface HeroQuizProps {
  currentQuestion: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onSelectOption: (level: 'travado' | 'ativo' | 'pronto', points: number) => void;
}

export const HeroQuiz: React.FC<HeroQuizProps> = ({
  currentQuestion,
  questionIndex,
  totalQuestions,
  onSelectOption,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center text-center"
    >
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm shadow-primary/20">
        <Code2 className="w-3.5 h-3.5" />
        <span>DIAGNÓSTICO DEVCODE ({questionIndex + 1}/{totalQuestions})</span>
      </div>

      {/* Hero Title */}
      <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide text-foreground leading-[0.95] mb-3">
        {questionIndex === 0 ? 'QUAL É O NÍVEL DO SEU CÓDIGO PRO MERCADO?' : currentQuestion.question}
      </h1>

      {/* Subtitle */}
      <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">
        {questionIndex === 0
          ? 'Descubra em 2 minutos se seu conhecimento em Python, Java e Engenharia de Software está travado no efeito tutorial ou pronto pra vagas de mercado.'
          : 'Selecione a opção que melhor descreve sua experiência com programação e desenvolvimento:'}
      </p>

      {/* Grid de Opções de Pergunta */}
      <div className="w-full space-y-3 mb-6">
        {currentQuestion.options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectOption(opt.level, opt.points)}
            className="w-full rounded-xl bg-card border border-border hover:border-primary/60 p-4 flex items-center justify-between text-left transition-all duration-200 group cursor-pointer shadow-md shadow-black/30"
          >
            <span className="font-body text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors pr-2">
              {opt.label}
            </span>
            <div className="w-8 h-8 rounded-lg bg-secondary group-hover:bg-primary/20 flex items-center justify-center text-muted-foreground group-hover:text-primary shrink-0 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Rodapé de Segurança / Trust */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <ShieldCheck className="w-4 h-4 text-success" />
        <span>100% Gratuito & Avaliação de Código IA</span>
      </div>
    </motion.section>
  );
};
