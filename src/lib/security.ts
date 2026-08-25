import { z } from 'zod';

// Security Item 14 & 8: Input Validation & Prevenção de Mass Assignment via Zod Schemas
export const LeadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100, 'Nome muito longo').trim(),
  email: z.string().email('E-mail inválido').toLowerCase().trim(),
  phone: z.string().min(10, 'Telefone inválido').max(20, 'Telefone muito longo').trim(),
  score: z.number().min(0).max(100).optional(),
  answers: z.array(z.string()).max(20, 'Muitas respostas').optional(),
  // Security Item 12: Honeypot bot protection field (deve ser sempre string vazia)
  website_hp: z.string().max(0, 'Bot detectado').optional().or(z.literal('')),
});

export type LeadPayload = z.infer<typeof LeadSchema>;

// Security Item 14: Sanitização contra XSS
export function sanitizeInput(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Security Item 11: Rate Limit simples no Client-Side
const requestLog = new Map<string, number[]>();

export function checkRateLimit(actionKey: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(actionKey) || [];
  const validTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false; // Bloqueado por Rate Limit
  }

  validTimestamps.push(now);
  requestLog.set(actionKey, validTimestamps);
  return true; // Permitido
}

// Security Item 15 & 17: Sanitização de Erros & Trim de Respostas
export function formatPublicError(error: unknown): string {
  console.error('[Internal Security Log]:', error);
  // Nunca vaza detalhes do banco, stack trace ou erro interno para o cliente
  return 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente em instantes.';
}

export function sanitizeUserOutput<T extends Record<string, unknown>>(data: T): Partial<T> {
  const sensitiveKeys = ['password', 'password_hash', 'secret', 'service_role_key', 'token', 'auth_token'];
  const sanitized = { ...data };
  for (const key of sensitiveKeys) {
    delete sanitized[key];
  }
  return sanitized;
}
