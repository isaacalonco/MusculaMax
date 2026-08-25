import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { HeroQuiz, type QuizQuestion } from './components/HeroQuiz';
import { StepsTimeline } from './components/StepsTimeline';
import { PriceReveal } from './components/PriceReveal';
import { SecurityBadge } from './components/SecurityBadge';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'QUAL É O SEU OBJETIVO PRINCIPAL COM O EXCEL HOJE?',
    options: [
      { label: '⚡ Sair do básico e parar de passar sufoco com planilhas no trabalho', level: 'travado', points: 20 },
      { label: '🔥 Dominar Fórmulas Avançadas (PROCV, XLOOKUP, SE) e Tabelas Dinâmicas', level: 'ativo', points: 30 },
      { label: '📊 Criar Dashboards executivos profissionais de alto impacto visual', level: 'pronto', points: 40 },
    ],
  },
  {
    id: 2,
    question: 'QUAL É O SEU NÍVEL ATUAL EM PLANILHAS ELETRÔNICAS?',
    options: [
      { label: '📈 Básico: Sei apenas SOMAR, MÉDIA e fazer formatação simples', level: 'travado', points: 15 },
      { label: '⚡ Intermediário: Uso PROCV e filtros, mas me travo em fórmulas compostas', level: 'ativo', points: 30 },
      { label: '🏆 Avançado: Crio relatórios dinâmicos, indicadores KPI e automações', level: 'pronto', points: 45 },
    ],
  },
  {
    id: 3,
    question: 'O QUE ACONTECE QUANDO VOCÊ ENCONTRA ERROS DE FÓRMULAS (#N/A, #VALOR!)?',
    options: [
      { label: '😫 Fico horas tentando descobrir e me sinto inseguro nas reuniões', level: 'travado', points: 10 },
      { label: '🔍 Procuro no YouTube ou ChatGPT sem entender o funcionamento real', level: 'ativo', points: 25 },
      { label: '⚙️ Identifico se é erro de busca, sintaxe ou tipo de dado e corrijo rápido', level: 'pronto', points: 40 },
    ],
  },
  {
    id: 4,
    question: 'COMO É O SEU PROCESSO DE TRABALHO COM DADOS NO DIA A DIA?',
    options: [
      { label: '🚫 Faço tudo manualmente e perco horas em tarefas repetitivas', level: 'travado', points: 10 },
      { label: '🏃 Copio planilhas prontas de terceiros mas me travo ao alterar algo', level: 'ativo', points: 25 },
      { label: '📊 Automatizo relatórios, crio visualizações visuais e economizo horas', level: 'pronto', points: 40 },
    ],
  },
];

export function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [levels, setLevels] = useState<('travado' | 'ativo' | 'pronto')[]>([]);
  const [phase, setPhase] = useState<'quiz' | 'timeline' | 'offer'>('quiz');

  const totalQuestions = quizQuestions.length;

  const handleSelectOption = (level: 'travado' | 'ativo' | 'pronto', points: number) => {
    setScores((prev) => [...prev, points]);
    setLevels((prev) => [...prev, level]);

    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz concluído -> ir para a timeline de evolução
      setPhase('timeline');
    }
  };

  const calculatedTotalScore = scores.reduce((acc, curr) => acc + curr, 0);

  // Define a classificação geral do nível de Excel do usuário
  const travadoCount = levels.filter((l) => l === 'travado').length;
  const prontoCount = levels.filter((l) => l === 'pronto').length;
  const overallDiagnostic: 'travado' | 'ativo' | 'pronto' =
    travadoCount >= 2 ? 'travado' : prontoCount >= 2 ? 'pronto' : 'ativo';

  // Redirecionamento DIRETO para o Gateway sem modal intermediário
  const handleDirectCheckout = () => {
    const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL || 'https://pay.kiwify.com.br/checkout-demo';
    window.location.href = checkoutUrl;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-background text-foreground">
      {/* Navbar Superior */}
      <Header currentStep={phase === 'quiz' ? questionIndex + 1 : totalQuestions} totalSteps={totalQuestions} />

      {/* Conteúdo Principal do Fluxo */}
      <main className="w-full flex-1 flex flex-col justify-center items-center px-4 py-4">
        <AnimatePresence mode="wait">
          {phase === 'quiz' && (
            <HeroQuiz
              key="hero-quiz"
              currentQuestion={quizQuestions[questionIndex]}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSelectOption={handleSelectOption}
            />
          )}

          {phase === 'timeline' && (
            <motion.div
              key="timeline-phase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full text-center"
            >
              {/* Diagnóstico em Destaque */}
              <div className="max-w-md mx-auto mb-6 p-4 rounded-xl bg-card border border-border">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  DIAGNÓSTICO EXCELPRO CONCLUÍDO
                </span>
                <h2 className="font-display text-3xl font-bold uppercase text-foreground mt-1">
                  NÍVEL EXCEL: <span className="text-primary uppercase">{overallDiagnostic === 'travado' ? 'INICIANTE / BÁSICO' : overallDiagnostic === 'ativo' ? 'INTERMEDIÁRIO' : 'PRONTO PARA DASHBOARDS'}</span>
                </h2>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Score de Prontidão em Planilhas: <strong className="text-foreground">{calculatedTotalScore}/165</strong>
                </p>
              </div>

              <StepsTimeline onComplete={() => setPhase('offer')} />
            </motion.div>
          )}

          {phase === 'offer' && (
            <motion.div
              key="offer-phase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <PriceReveal onSelectPlan={handleDirectCheckout} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Rodapé com Badges de Segurança */}
      <SecurityBadge />
    </div>
  );
}

export default App;
