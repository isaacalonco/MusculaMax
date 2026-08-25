import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const defaultSteps = [
  'Você responde o diagnóstico de treino e mobilidade (2 min)',
  'A IA MusculaMax gera sua ficha de musculação personalizada (ABC, ABCDE ou Upper/Lower)',
  'Você recebe o treino no app com séries, repetições e cargas ideais',
  'Se travar na carga ou sentir dor (ombro, joelho, lombar), o MusculaMax adapta a ficha na hora',
];

interface StepsTimelineProps {
  steps?: string[];
  onComplete?: () => void;
}

export const StepsTimeline: React.FC<StepsTimelineProps> = ({
  steps = defaultSteps,
  onComplete,
}) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-4 w-full max-w-md mx-auto"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-foreground font-body font-bold text-lg mb-6 text-center"
      >
        Como funciona a sua evolução no MusculaMax:
      </motion.p>

      <div className="relative pl-8 text-left mb-8">
        {/* Linha de Progresso Vertical com Gradiente */}
        <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10" />

        {steps.map((stepText, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
            onAnimationComplete={() => {
              if (i === steps.length - 1) {
                setShowButton(true);
              }
            }}
            className="relative mb-6 last:mb-0"
          >
            {/* Badge Numérica Ilustrada */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.35, type: 'spring', stiffness: 300 }}
              className="absolute -left-8 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 font-bold text-white text-sm"
            >
              {i + 1}
            </motion.div>

            {/* Texto do Passo */}
            <div className="text-foreground/90 font-body text-sm leading-relaxed pt-1">
              {stepText}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botão para Avançar no Tempo do Usuário */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-body font-bold text-base tracking-wide shadow-xl shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>VER MEU PLANO PERSONALIZADO</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
