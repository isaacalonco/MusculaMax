import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import { LeadSchema, sanitizeInput, checkRateLimit, formatPublicError } from '../lib/security';
import { supabase } from '../lib/supabaseClient';

interface LeadFormModalProps {
  isOpen: boolean;
  score: number;
  diagnosticLevel: 'travado' | 'ativo' | 'pronto';
  onClose: () => void;
  onSuccess: () => void;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  score,
  diagnosticLevel,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website_hp: '', // Honeypot field (Item 12)
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  if (!isOpen) return null;

  const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL || 'https://pay.kiwify.com.br/checkout-demo';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    // 1. Rate Limit Check (Item 11)
    if (!checkRateLimit('submit_lead_form', 3, 60000)) {
      setGeneralError('Muitas tentativas em pouco tempo. Aguarde um minuto.');
      return;
    }

    // 2. Validação Zod (Item 8 e 14)
    const validationResult = LeadSchema.safeParse({
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      score,
      website_hp: formData.website_hp,
    });

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. Supabase RLS Insert (Item 3, 4, 13)
      const { error } = await supabase.from('quiz_leads').insert([
        {
          name: validationResult.data.name,
          email: validationResult.data.email,
          phone: validationResult.data.phone,
          score,
          diagnostic_level: diagnosticLevel,
        },
      ]);

      if (error) {
        throw error;
      }

      onSuccess();

      // 4. Redirecionamento automático seguro para o Gateway de Pagamento
      if (checkoutUrl) {
        setTimeout(() => {
          window.location.href = checkoutUrl;
        }, 500);
      }
    } catch (err) {
      // Erros Sanitizados sem vazamentos (Item 15)
      setGeneralError(formatPublicError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl overflow-hidden"
        >
          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Cabeçalho do Modal */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display text-3xl font-bold uppercase text-foreground leading-tight">
              LIBERAR ACESSO MUSCULAMAX
            </h3>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Informe seus dados para salvar sua ficha e ser redirecionado ao checkout seguro:
            </p>
          </div>

          {generalError && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/20 border border-destructive/40 text-destructive text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          {/* Formulário com Hardening */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Honeypot Bot Trap (Security Item 12) */}
            <input
              type="text"
              name="website_hp"
              value={formData.website_hp}
              onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
              className="sr-only tab-index-[-1]"
              autoComplete="off"
            />

            {/* Campo Nome */}
            <div>
              <label className="block text-xs font-bold uppercase text-foreground/80 mb-1">
                Seu Nome Completo:
              </label>
              <input
                type="text"
                placeholder="Ex: Lucas Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-input text-foreground placeholder:text-muted-foreground border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {errors.name && (
                <span className="text-xs text-destructive mt-1 block">{errors.name}</span>
              )}
            </div>

            {/* Campo E-mail */}
            <div>
              <label className="block text-xs font-bold uppercase text-foreground/80 mb-1">
                E-mail Principal:
              </label>
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-input text-foreground placeholder:text-muted-foreground border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {errors.email && (
                <span className="text-xs text-destructive mt-1 block">{errors.email}</span>
              )}
            </div>

            {/* Campo WhatsApp */}
            <div>
              <label className="block text-xs font-bold uppercase text-foreground/80 mb-1">
                WhatsApp com DDD:
              </label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-input text-foreground placeholder:text-muted-foreground border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {errors.phone && (
                <span className="text-xs text-destructive mt-1 block">{errors.phone}</span>
              )}
            </div>

            {/* Botão de Envio para o Gateway */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-body font-bold text-base tracking-wide shadow-lg shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>REDIRECIONANDO AO CHECKOUT...</span>
              ) : (
                <>
                  <span>IR PARA O CHECKOUT SEGURO</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Garantia SSL & Criptografia */}
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span>Dados 100% Protegidos via SSL & RLS</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
