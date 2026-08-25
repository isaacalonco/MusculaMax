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
    question: 'QUAL É O SEU OBJETIVO PRINCIPAL EM PROGRAMAÇÃO HOJE?',
    options: [
      { label: '⚡ Sair do efeito tutorial e aprender a criar projetos do zero', level: 'travado', points: 20 },
      { label: '🔥 Migrar de carreira / conseguir vaga Backend em Python ou Java', level: 'ativo', points: 30 },
      { label: '🚀 Dominar Arquitetura de Software, APIs REST e Microsserviços', level: 'pronto', points: 40 },
    ],
  },
  {
    id: 2,
    question: 'QUAL É O SEU NÍVEL DE PRÁTICA EM PYTHON OU JAVA?',
    options: [
      { label: '💻 Sei apenas sintaxe básica, variáveis e laços de repetição', level: 'travado', points: 15 },
      { label: '⚡ Escrevo APIs básicas e me conecto com Banco de Dados SQL', level: 'ativo', points: 30 },
      { label: '🏆 Domino POO avançada, Estrutura de Dados e Padrões de Projeto', level: 'pronto', points: 45 },
    ],
  },
  {
    id: 3,
    question: 'COMO VOCÊ REAGE QUANDO ENCONTRA UM BUG OU EXCEÇÃO NO CÓDIGO?',
    options: [
      { label: '😫 Fico horas travado e não sei por onde começar a corrigir', level: 'travado', points: 10 },
      { label: '🔍 Copio o erro no Google / ChatGPT sem entender a causa raiz', level: 'ativo', points: 25 },
      { label: '⚙️ Leio a stack trace, debugo linha a linha e corrijo a lógica', level: 'pronto', points: 40 },
    ],
  },
  {
    id: 4,
    question: 'COMO É O SEU PROCESSO DE ESTUDOS NO DIA A DIA?',
    options: [
      { label: '🚫 Apenas assisto videoaulas sem digitar nenhuma linha de código', level: 'travado', points: 10 },
      { label: '🏃 Copio projetos de tutoriais sem entender os conceitos profundos', level: 'ativo', points: 25 },
      { label: '🔥 Construo sistemas reais, leio documentação e subo no GitHub', level: 'pronto', points: 40 },
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

  // Define a classificação geral do nível do desenvolvedor
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
                  DIAGNÓSTICO DEV CONCLUÍDO
                </span>
                <h2 className="font-display text-3xl font-bold uppercase text-foreground mt-1">
                  NÍVEL DEV: <span className="text-primary uppercase">{overallDiagnostic === 'travado' ? 'INICIANTE / TRAVADO' : overallDiagnostic === 'ativo' ? 'INTERMEDIÁRIO / EM EVOLUÇÃO' : 'PRONTO PARA VAGAS'}</span>
                </h2>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Score de Prontidão em Código: <strong className="text-foreground">{calculatedTotalScore}/165</strong>
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
