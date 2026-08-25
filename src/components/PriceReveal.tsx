import type React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Zap, CheckCircle2, ShieldCheck, ArrowRight, Terminal, Coffee, GitBranch } from 'lucide-react';

interface PriceRevealProps {
  onSelectPlan: () => void;
}

const competitorCosts = [
  { label: 'Bootcamp Tradicional de Dev', monthly: 'R$500/mês', yearly: 'R$6.000/ano' },
  { label: 'Mentoria Particular de Código', monthly: 'R$300/mês', yearly: 'R$3.600/ano' },
];

const features = [
  {
    icon: <Terminal className="w-4 h-4 text-primary" />,
    title: 'Trilha Python Full Backend',
    text: 'Scripts, Automação, APIs REST e frameworks Django / FastAPI.',
  },
  {
    icon: <Coffee className="w-4 h-4 text-primary" />,
    title: 'Trilha Java & Spring Boot',
    text: 'POO avançada, Spring Boot, Hibernate, SQL e Microsserviços.',
  },
  {
    icon: <GitBranch className="w-4 h-4 text-primary" />,
    title: 'Portfólio Profissional no GitHub',
    text: 'Projetos reais do mundo corporativo prontos para destacar no LinkedIn.',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

export const PriceReveal: React.FC<PriceRevealProps> = ({ onSelectPlan }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-6 sm:py-8 w-full max-w-md mx-auto px-4 sm:px-6 text-center"
    >
      {/* Badge de Pré-lançamento */}
      <motion.div variants={itemVariants} className="flex justify-center mb-5">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/35 text-primary text-xs sm:text-sm font-bold shadow-sm shadow-primary/20">
          <Zap className="w-4 h-4" />
          <span>PRÉ-LANÇAMENTO DEVCODEMAX — ÚLTIMOS DIAS</span>
        </span>
      </motion.div>

      {/* Eyebrow Label */}
      <motion.div variants={itemVariants} className="mb-3">
        <span className="text-xs font-bold tracking-[0.2em] text-primary/90 uppercase">
          PLANO ANUAL DEVCODEMAX PRO
        </span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 mb-8">
        <p className="text-foreground/90 font-body text-base leading-relaxed">
          Acesso completo ao mentor inteligente <span className="font-bold text-foreground">DevCodeMax</span> por{' '}
          <span className="font-bold text-foreground">1 ANO INTEIRO</span>
        </p>

        {/* Preço Antigo Risca-tudo com Maior Espaçamento */}
        <div className="relative inline-block my-2">
          <span className="text-2xl text-muted-foreground font-medium">R$127/ano</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-destructive origin-left"
          />
        </div>

        {/* Preço Promocional com Glow Radial */}
        <motion.div
          variants={itemVariants}
          className="relative my-4"
        >
          <div className="text-6xl sm:text-7xl font-display font-bold text-primary relative inline-block">
            R$67
            <span className="text-2xl font-semibold text-foreground/80">/ano</span>
            {/* Glow Blur Background */}
            <div className="absolute inset-0 blur-2xl bg-primary/40 -z-10 scale-150 rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Equivalência por Mês */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs bg-primary/10 border border-primary/20">
          <span className="text-muted-foreground">=</span>
          <span className="font-bold text-foreground">R$5,58/mês</span>
          <span className="text-muted-foreground">— menos que um café especial de dev</span>
        </div>
      </motion.div>

      {/* Lista de Recursos com Ícones Vetoriais e Espaçamento Adequado */}
      <motion.div variants={itemVariants} className="space-y-3 mb-8 text-left">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-4 rounded-xl bg-card/80 border border-border/80 shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
              {feat.icon}
            </div>
            <div>
              <h5 className="font-body font-bold text-sm text-foreground mb-0.5">{feat.title}</h5>
              <p className="text-xs font-body text-foreground/80 leading-relaxed">{feat.text}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabela de Comparação com Concorrentes */}
      <motion.div variants={itemVariants} className="space-y-3 mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-left px-1 mb-2">
          Comparação no Mercado Dev:
        </p>

        {competitorCosts.map((comp, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-muted/40 border border-border/70 text-left"
          >
            <div>
              <span className="text-sm font-medium text-foreground/80 block">{comp.label}</span>
              <span className="text-xs text-muted-foreground">{comp.monthly}</span>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">{comp.yearly}</span>
          </div>
        ))}

        {/* Card Destaque DevCodeMax com Maior Espaçamento */}
        <div className="flex items-center justify-between px-4 py-4 rounded-xl bg-primary/15 border-2 border-primary/60 text-left shadow-lg shadow-primary/25">
          <div>
            <span className="text-base font-bold text-primary block">DevCodeMax PRO</span>
            <span className="text-xs text-primary/80">Mentoria & Projetos em Python e Java</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-lg font-extrabold text-primary">R$67/ano</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              89x MAIS BARATO
            </span>
          </div>
        </div>
      </motion.div>

      {/* Botão de Ação do Checkout com Margem Superior Adequada */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSelectPlan}
        className="w-full py-4.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-body font-bold text-lg tracking-wide shadow-xl shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer transition-all mb-6"
      >
        <span>GARANTIR DEVCODEMAX PRO</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* Selos de Confiança com Espaçamento e Divisor Limpo */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-center gap-5 text-xs text-muted-foreground pt-4 border-t border-border/50"
      >
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span>Garantia de 7 Dias</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Acesso Imediato</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
