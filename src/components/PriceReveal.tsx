import type React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface PriceRevealProps {
  onSelectPlan: () => void;
}

const competitorCosts = [
  { label: 'Personal Trainer Presencial', monthly: 'R$400/mês', yearly: 'R$4.800/ano' },
  { label: 'Consultoria Online Fitness', monthly: 'R$200/mês', yearly: 'R$2.400/ano' },
];

const features = [
  { emoji: '🏋️‍♂️', text: 'Fichas completas adaptadas pro seu objetivo (Hipertrofia ou Definição)' },
  { emoji: '🦾', text: 'Correção de execução e técnicas para não lesionar articulações' },
  { emoji: '⚡', text: 'Protocolos de aquecimento e mobilidade pré-treino inclusos' },
];

export const PriceReveal: React.FC<PriceRevealProps> = ({ onSelectPlan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6 w-full max-w-md mx-auto px-4 text-center"
    >
      {/* Badge de Pré-lançamento */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-4"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs sm:text-sm font-bold">
          <Zap className="w-4 h-4" />
          <span>PRÉ-LANÇAMENTO MUSCULAMAX — ÚLTIMOS DIAS</span>
        </span>
      </motion.div>

      {/* Eyebrow Label */}
      <div className="mb-2">
        <span className="text-xs font-bold tracking-[0.2em] text-primary/80 uppercase">
          PLANO ANUAL MUSCULAMAX PRO
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-foreground/90 font-body text-base">
          Acesso completo à plataforma inteligente <span className="font-bold text-foreground">MusculaMax</span> por{' '}
          <span className="font-bold text-foreground">1 ANO INTEIRO</span>
        </p>

        {/* Preço Antigo Risca-tudo */}
        <div className="relative inline-block">
          <span className="text-2xl text-muted-foreground font-medium">R$127/ano</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-destructive origin-left"
          />
        </div>

        {/* Preço Promocional com Glow Radial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
          className="relative my-3"
        >
          <div className="text-6xl sm:text-7xl font-display font-bold text-primary relative inline-block">
            R$67
            <span className="text-2xl font-semibold text-foreground/80">/ano</span>
            {/* Glow Blur Background */}
            <div className="absolute inset-0 blur-2xl bg-primary/40 -z-10 scale-150 rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Equivalência por Mês */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-primary/[0.06] border border-primary/[0.12]">
          <span className="text-muted-foreground">=</span>
          <span className="font-bold text-foreground">R$5,58/mês</span>
          <span className="text-muted-foreground">— menos que uma dose de pré-treino</span>
        </div>
      </div>

      {/* Lista de Recursos / Benefícios */}
      <div className="space-y-2.5 mb-6 text-left">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + idx * 0.1 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card/60 border border-border"
          >
            <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-sm shrink-0">
              {feat.emoji}
            </div>
            <span className="text-sm font-body text-foreground/90">{feat.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Tabela de Comparação com Concorrentes */}
      <div className="space-y-3 mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-left px-1">
          Comparação no Mercado de Academias:
        </p>

        {competitorCosts.map((comp, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/40 border border-border text-left"
          >
            <div>
              <span className="text-sm font-medium text-foreground/80 block">{comp.label}</span>
              <span className="text-xs text-muted-foreground">{comp.monthly}</span>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">{comp.yearly}</span>
          </div>
        ))}

        {/* Card Destaque MusculaMax */}
        <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-primary/15 border-2 border-primary/50 text-left shadow-lg shadow-primary/20">
          <div>
            <span className="text-base font-bold text-primary block">MusculaMax PRO</span>
            <span className="text-xs text-primary/80">Fichas & Biomecânica Inteligente</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-lg font-extrabold text-primary">R$67/ano</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              54x MAIS BARATO
            </span>
          </div>
        </div>
      </div>

      {/* Botão de Ação do Checkout */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSelectPlan}
        className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-body font-bold text-lg tracking-wide shadow-xl shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer transition-all mb-4"
      >
        <span>GARANTIR MUSCULAMAX PRO</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* Selos de Confiança */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          <span>Garantia de 7 Dias</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Acesso Imediato</span>
        </div>
      </div>
    </motion.div>
  );
};
