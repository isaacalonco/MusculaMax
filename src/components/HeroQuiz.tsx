import type React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronRight, ShieldCheck, Code2, Terminal, Cpu, Rocket, Sparkles } from 'lucide-react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    level: 'travado' | 'ativo' | 'pronto';
    points: number;
    icon?: React.ReactNode;
  }[];
}

interface HeroQuizProps {
  currentQuestion: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onSelectOption: (level: 'travado' | 'ativo' | 'pronto', points: number) => void;
}

const optionIconsMap = [
  <Terminal key="0" className="w-5 h-5 text-primary shrink-0" />,
  <Cpu key="1" className="w-5 h-5 text-primary shrink-0" />,
  <Rocket key="2" className="w-5 h-5 text-primary shrink-0" />,
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

export const HeroQuiz: React.FC<HeroQuizProps> = ({
  currentQuestion,
  questionIndex,
  totalQuestions,
  onSelectOption,
}) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center text-center"
    >
      {/* Pill Badge Animado */}
      <motion.div variants={itemVariants} className="mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/35 text-primary text-xs font-bold tracking-[0.2em] uppercase shadow-sm shadow-primary/20">
          <Code2 className="w-4 h-4 text-primary" />
          <span>DIAGNÓSTICO DEVCODE ({questionIndex + 1}/{totalQuestions})</span>
        </div>
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide text-foreground leading-[0.95] mb-4"
      >
        {questionIndex === 0 ? 'QUAL É O NÍVEL DO SEU CÓDIGO PRO MERCADO?' : currentQuestion.question}
      </motion.h1>

      {/* Subtitle com Margem Adequada */}
      <motion.p
        variants={itemVariants}
        className="font-body text-sm sm:text-base text-foreground/80 leading-relaxed mb-8 max-w-sm"
      >
        {questionIndex === 0
          ? 'Descubra em 2 minutos se seu conhecimento em Python, Java e Engenharia de Software está travado ou pronto pra vagas de mercado.'
          : 'Selecione a opção que melhor descreve sua rotina de código e prática:'}
      </motion.p>

      {/* Grid de Opções com Espaçamento Ajustado */}
      <div className="w-full space-y-3.5 mb-8">
        {currentQuestion.options.map((opt, idx) => (
          <motion.button
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelectOption(opt.level, opt.points)}
            className="w-full rounded-2xl bg-card/90 border border-border/80 hover:border-primary/60 p-4 sm:p-5 flex items-center justify-between text-left transition-all duration-200 group cursor-pointer shadow-md shadow-black/40 hover:shadow-primary/20"
          >
            <div className="flex items-center gap-3.5 pr-2">
              <div className="w-9 h-9 rounded-xl bg-secondary/80 group-hover:bg-primary/20 border border-border/60 group-hover:border-primary/40 flex items-center justify-center text-primary shrink-0 transition-colors">
                {optionIconsMap[idx % optionIconsMap.length]}
              </div>
              <span className="font-body text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                {opt.label}
              </span>
            </div>

            <div className="w-8 h-8 rounded-lg bg-secondary/60 group-hover:bg-primary/20 flex items-center justify-center text-muted-foreground group-hover:text-primary shrink-0 transition-colors ml-2">
              <ChevronRight className="w-5 h-5" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Rodapé de Confiança com Ícones */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/40 w-full"
      >
        <ShieldCheck className="w-4 h-4 text-success shrink-0" />
        <span>100% Gratuito & Avaliação de Código por IA</span>
        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 ml-1" />
      </motion.div>
    </motion.section>
  );
};
