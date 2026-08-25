import type React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Zap, CheckCircle2, ShieldCheck, ArrowRight, FileSpreadsheet, BarChart3, Table } from 'lucide-react';

interface PriceRevealProps {
  onSelectPlan: () => void;
}

const competitorCosts = [
  { label: 'Curso Presencial de Excel', monthly: 'R$450/mês', yearly: 'R$2.700/curso' },
  { label: 'Treinamento Corporativo de Planilhas', monthly: 'R$250/mês', yearly: 'R$1.500/curso' },
];

const features = [
  {
    icon: <FileSpreadsheet className="w-4 h-4 text-primary" />,
    title: 'Fórmulas Avançadas Sem Mistério',
    text: 'Domine XLOOKUP, PROCV, SEERRO, SOMASE e Projeções Financeiras com facilidade.',
  },
  {
    icon: <BarChart3 className="w-4 h-4 text-primary" />,
    title: 'Dashboards Executivos Interativos',
    text: 'Crie relatórios gráficos visuais de alto impacto para impressionar gestores.',
  },
  {
    icon: <Table className="w-4 h-4 text-primary" />,
    title: 'Tabelas Dinâmicas & Power Query',
    text: 'Automatize dados brutos e reduza relatórios de 4 horas para 5 minutos.',
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
      {/* Badge de Pré-lançamento Vitalício Formatado */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md shadow-primary/10 max-w-full text-center">
          <Zap className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
          <span className="leading-tight">OFERTA VITALÍCIA EXCELMAX • ÚLTIMAS VAGAS</span>
        </div>
      </motion.div>

      {/* Eyebrow Label */}
      <motion.div variants={itemVariants} className="mb-3">
        <span className="text-xs font-bold tracking-[0.2em] text-primary/90 uppercase">
          ACESSO VITALÍCIO PRO
        </span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 mb-8">
        <p className="text-foreground/90 font-body text-base leading-relaxed">
          Acesso completo e permanente ao mentor de planilhas <span className="font-bold text-foreground">ExcelMax</span> com{' '}
          <span className="font-bold text-foreground">PAGAMENTO ÚNICO</span>
        </p>

        {/* Preço Antigo Risca-tudo */}
        <div className="relative inline-block my-2">
          <span className="text-2xl text-muted-foreground font-medium">R$97,00</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-destructive origin-left"
          />
        </div>

        {/* Preço Promocional Vitalício com Glow Radial */}
        <motion.div
          variants={itemVariants}
          className="relative my-4 flex flex-col items-center justify-center"
        >
          <div className="text-5xl sm:text-6xl font-display font-bold text-primary relative inline-block">
            R$ 27,90
            {/* Glow Blur Background */}
            <div className="absolute inset-0 blur-2xl bg-primary/40 -z-10 scale-150 rounded-full animate-pulse" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary/90 mt-1">
            PAGAMENTO ÚNICO • VITALÍCIO
          </span>
        </motion.div>

        {/* Pagamento Único Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs bg-primary/10 border border-primary/20">
          <span className="font-bold text-foreground">R$ 27,90 à vista</span>
          <span className="text-muted-foreground">— Sem mensalidades!</span>
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
          Comparação no Mercado de Cursos:
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

        {/* Card Destaque ExcelMax Vitalício */}
        <div className="flex items-center justify-between px-4 py-4 rounded-xl bg-primary/15 border-2 border-primary/60 text-left shadow-lg shadow-primary/25">
          <div>
            <span className="text-base font-bold text-primary block">ExcelMax VITALÍCIO</span>
            <span className="text-xs text-primary/80">Fórmulas, Dashboards & Power Query</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-lg font-extrabold text-primary">R$ 27,90</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              PAGAMENTO ÚNICO
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
        <span>GARANTIR ACESSO VITALÍCIO POR R$ 27,90</span>
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
