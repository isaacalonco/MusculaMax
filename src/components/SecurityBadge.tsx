import type React from 'react';
import { ShieldCheck, Lock, Database } from 'lucide-react';

export const SecurityBadge: React.FC = () => {
  return (
    <footer className="w-full max-w-md mx-auto px-4 py-6 mt-8 border-t border-border/40 text-center">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground mb-3">
        <div className="flex items-center gap-1.5 bg-card/50 px-2.5 py-1 rounded-full border border-border">
          <Lock className="w-3.5 h-3.5 text-primary" />
          <span>HTTPS / TLS 1.3</span>
        </div>

        <div className="flex items-center gap-1.5 bg-card/50 px-2.5 py-1 rounded-full border border-border">
          <Database className="w-3.5 h-3.5 text-primary" />
          <span>RLS Enforced</span>
        </div>

        <div className="flex items-center gap-1.5 bg-card/50 px-2.5 py-1 rounded-full border border-border">
          <ShieldCheck className="w-3.5 h-3.5 text-success" />
          <span>Bot Protected</span>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed">
        DevCodeMax © 2026. Todos os direitos reservados.
        <br />
        <span className="opacity-70">Plataforma de Engenharia de Software desenvolvida sob arquitetura de alta performance.</span>
      </p>
    </footer>
  );
};
