# Lava-Autos

## Setup

1. `npm install`
2. Criar um projeto em supabase.com, abrir o SQL Editor e correr `supabase/schema.sql`.
3. Copiar `.env.example` para `.env` e preencher com o URL e a anon key do projeto Supabase.
4. Criar o utilizador administrador em Authentication > Users (email + password).
5. `npm run dev`

## Estrutura

```
src/
  lib/            # supabase client + auth context
  routes/         # layouts e proteção de rotas
  pages/public/   # landing page e agendamento
  pages/admin/    # painel administrativo (6 menus)
```
