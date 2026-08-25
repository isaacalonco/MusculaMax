import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileCheck, Cpu, Code2, Wrench } from 'lucide-react';

const defaultSteps = [
  {
    title: 'Diagnóstico de Código',
    text: 'Você responde a avaliação rápida de sintaxe, lógica e arquitetura (2 min).',
    icon: <FileCheck className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Plano Dev Personalizado',
    text: 'A IA DevCodeMax mapeia sua trilha prática (Python, Java, APIs REST e SQL).',
    icon: <Cpu className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Construção de Projetos Reais',
    text: 'Você constrói sistemas do zero com orientação de código linha por linha.',
    icon: <Code2 className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Feedback & Correção Instantânea',
    text: 'Se travar em um bug, o DevCodeMax analisa a stack trace e corrige o código na hora.',
    icon: <Wrench className="w-4 h-4 text-primary" />,
  },
];

interface StepsTimelineProps {
  steps?: typeof defaultSteps;
  onComplete?: () => void;
}

export const StepsTimeline: React.FC<StepsTimelineProps> = ({
  steps = defaultSteps,
  onComplete,
}) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="py-6 w-full max-w-md mx-auto px-4 sm:px-6"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-foreground font-body font-bold text-lg sm:text-xl mb-8 text-center"
      >
        Como funciona a sua evolução no DevCodeMax:
      </motion.p>

      <div className="relative pl-9 text-left mb-8 space-y-6">
        {/* Linha de Progresso Vertical com Gradiente */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              if (i === steps.length - 1) {
                setShowButton(true);
              }
            }}
            className="relative pl-3"
          >
            {/* Badge Numérica Vetorial Animada */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute -left-9 top-0.5 w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 font-bold text-white text-xs border border-primary-foreground/20"
            >
              {i + 1}
            </motion.div>

            {/* Conteúdo do Passo */}
            <div className="bg-card/60 border border-border/70 rounded-xl p-4 shadow-sm space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h4 className="font-body font-bold text-sm text-foreground">
                  {step.title}
                </h4>
              </div>
              <p className="text-foreground/80 font-body text-xs sm:text-sm leading-relaxed pl-6">
                {step.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botão para Avançar no Tempo do Usuário */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-body font-bold text-base tracking-wide shadow-xl shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
          >
            <span>VER MEU PLANO DEV PERSONALIZADO</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
