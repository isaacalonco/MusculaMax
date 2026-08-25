import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { HeroQuiz, type QuizQuestion } from './components/HeroQuiz';
import { StepsTimeline } from './components/StepsTimeline';
import { PriceReveal } from './components/PriceReveal';
import { LeadFormModal } from './components/LeadFormModal';
import { SecurityBadge } from './components/SecurityBadge';
import { CheckCircle2 } from 'lucide-react';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'QUAL É O SEU OBJETIVO PRINCIPAL NA MUSCULAÇÃO HOJE?',
    options: [
      { label: '⚡ Sair do platô e parar de treinar sem ver resultados', level: 'travado', points: 20 },
      { label: '🔥 Ganhar massa muscular (hipertrofia) e definir o shape', level: 'ativo', points: 30 },
      { label: '🏋️‍♂️ Aumentar força máxima e construir densidade muscular', level: 'pronto', points: 40 },
    ],
  },
  {
    id: 2,
    question: 'QUANTAS VEZES VOCÊ VAI À ACADEMIA POR SEMANA?',
    options: [
      { label: '🏃 1 a 2 vezes por semana (sem rotina fixa)', level: 'travado', points: 15 },
      { label: '⚡ 3 a 4 vezes por semana (treino moderado)', level: 'ativo', points: 30 },
      { label: '🏆 5 a 6 vezes por semana (divisão ABCDE / Push-Pull-Legs)', level: 'pronto', points: 45 },
    ],
  },
  {
    id: 3,
    question: 'SENTE DORES ARTICULARES EM EXERCÍCIOS COMO SUPINO OU AGACHAMENTO?',
    options: [
      { label: '😫 Sim, sinto fisgadas no ombro, joelho ou lombar', level: 'travado', points: 10 },
      { label: '🦵 Às vezes sinto desconforto ao subir cargas pesadas', level: 'ativo', points: 25 },
      { label: '💪 Raro, executo os movimentos com mobilidade perfeita', level: 'pronto', points: 40 },
    ],
  },
  {
    id: 4,
    question: 'COMO É A SUA PREPARAÇÃO ANTES DE PEGAR PESO?',
    options: [
      { label: '🚫 Chego na academia e coloco logo a carga máxima', level: 'travado', points: 10 },
      { label: '🏃 Faço 5 min de esteira rápida pra esquentar', level: 'ativo', points: 25 },
      { label: '🔥 Faço mobilidade articular e séries de feed (aquecimento)', level: 'pronto', points: 40 },
    ],
  },
];

export function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [levels, setLevels] = useState<('travado' | 'ativo' | 'pronto')[]>([]);
  const [phase, setPhase] = useState<'quiz' | 'timeline' | 'offer' | 'success'>('quiz');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Define a classificação geral do corpo do praticante
  const travadoCount = levels.filter((l) => l === 'travado').length;
  const prontoCount = levels.filter((l) => l === 'pronto').length;
  const overallDiagnostic: 'travado' | 'ativo' | 'pronto' =
    travadoCount >= 2 ? 'travado' : prontoCount >= 2 ? 'pronto' : 'ativo';

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
                  DIAGNÓSTICO DE HIPERTROFIA CONCLUÍDO
                </span>
                <h2 className="font-display text-3xl font-bold uppercase text-foreground mt-1">
                  STATUS SHAPE: <span className="text-primary uppercase">{overallDiagnostic}</span>
                </h2>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Índice de Prontidão Muscular: <strong className="text-foreground">{calculatedTotalScore}/165</strong>
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
              <PriceReveal onSelectPlan={() => setIsModalOpen(true)} />
            </motion.div>
          )}

          {phase === 'success' && (
            <motion.div
              key="success-phase"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto px-4 py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-success/20 text-success mx-auto flex items-center justify-center mb-4 border border-success/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-display text-4xl font-bold uppercase text-foreground mb-2">
                FICHA DE TREINO GERADA!
              </h2>
              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">
                Sua avaliação biomecânica foi processada. Em instantes nossa equipe enviará sua ficha personalizada de musculação via WhatsApp.
              </p>
              <button
                onClick={() => {
                  setPhase('quiz');
                  setQuestionIndex(0);
                  setScores([]);
                  setLevels([]);
                }}
                className="px-6 py-3 rounded-xl bg-secondary text-foreground font-body font-bold text-sm border border-border hover:border-primary/50 transition-colors"
              >
                Refazer Diagnóstico
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal de Formulário de Lead / Checkout */}
      <LeadFormModal
        isOpen={isModalOpen}
        score={calculatedTotalScore}
        diagnosticLevel={overallDiagnostic}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          setPhase('success');
        }}
      />

      {/* Rodapé com Badges de Segurança */}
      <SecurityBadge />
    </div>
  );
}

export default App;
