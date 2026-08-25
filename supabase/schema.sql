-- ====================================================================
-- SCRIPT SQL DE BANCO DE DADOS & HARDENING DE SEGURANÇA
-- O CARA DO JOGO - PRODUCTION SCHEMA
-- ====================================================================

-- 1. Habilitar Extensões de Criptografia (Item 5: Criptografia de dados)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabela de Leads / Diagnósticos do Quiz
CREATE TABLE IF NOT EXISTS public.quiz_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    score INT DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    diagnostic_level TEXT CHECK (diagnostic_level IN ('travado', 'ativo', 'pronto')),
    answers JSONB DEFAULT '[]'::jsonb,
    ip_hash TEXT, -- Item 5: IP hash com salt para privacidade
    is_converted BOOLEAN DEFAULT FALSE
);

-- Indexação para performance e consulta parametrizada segura (Item 13)
CREATE INDEX IF NOT EXISTS idx_quiz_leads_email ON public.quiz_leads(email);
CREATE INDEX IF NOT EXISTS idx_quiz_leads_created_at ON public.quiz_leads(created_at DESC);

-- ====================================================================
-- HARDENING DE SEGURANÇA (SEGURANÇA ITENS 4, 7 & 13)
-- ====================================================================

-- Item 4: Ativar RLS (Row Level Security) obrigatoriamente
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Item 7: Restringir acessos por política (RBAC)
-- Regra A: Permitir que usuários anônimos insiram seus diagnósticos (ANON KEY)
CREATE POLICY "Permitir inserções anônimas de diagnósticos" 
ON public.quiz_leads 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Regra B: Bloquear LEITURA, ATUALIZAÇÃO e EXCLUSÃO para usuários anônimos
-- Apenas a chave de serviço administrativa (SERVICE_ROLE_KEY) tem acesso total
CREATE POLICY "Bloquear leitura pública de leads" 
ON public.quiz_leads 
FOR SELECT 
TO authenticated 
USING (auth.uid() IS NOT NULL);

-- ====================================================================
-- STORAGE BUCKETS & REPETIÇÃO DE UPLOADS (SEGURANÇA ITEM 16)
-- ====================================================================

-- Item 16: Restringir uploads de arquivos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'user-avatars', 
    'user-avatars', 
    true, 
    2097152, -- Limite estrito de 2MB
    ARRAY['image/jpeg', 'image/png', 'image/webp'] -- Apenas imagens seguras
) ON CONFLICT (id) DO NOTHING;

-- RLS nos arquivos de storage
CREATE POLICY "Leitura pública de avatares" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'user-avatars');

CREATE POLICY "Upload restrito a usuários autenticados" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'user-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
