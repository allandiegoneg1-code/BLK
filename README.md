# BLKF.FIT

Aplicativo web estático de protótipo para BLKF.FIT, com foco em fitness e medicina esportiva.

## O que foi implementado

- Login individual e cadastro de usuários
- Hierarquia de usuários: Usuário comum, Premium, Elite, Médico, Nutricionista, Admin
- Fluxo de telas: Dashboard, Treino, Dieta, Progresso, IA Coach, Área Hormonal, Consultoria Médica, Comunidade, Perfil, Configurações e Plano Master
- Protocolos individuais por usuário armazenados em `localStorage`
- Módulo de treinos com biblioteca e histórico de sessões
- Onboarding inteligente no fluxo de entrada
- Módulo nutricional com cálculo de macros e planos
- Módulo hormonal com registro de sintomas e upload de exames
- Módulo de progresso com histórico de peso/BF
- IA Coach simulado com recomendações básicas
- Agenda de consultas e comunidade de posts
- Visual dark mode premium com estilo médico/performance

## Estrutura do projeto

- `index.html` — interface e fluxo do aplicativo
- `styles.css` — estilo dark premium com layout responsivo
- `script.js` — lógica de autenticação, protocolos individuais, módulos e persistência local

## Banco de dados simulado

Os dados são persistidos no navegador em `localStorage`.

Estrutura principal:

```json
{
  "users": [
    {
      "id": 1,
      "name": "Nome do usuário",
      "email": "...",
      "password": "...",
      "role": "Usuário Premium",
      "profile": { "darkMode": true },
      "protocols": { "training": "...", "nutrition": "...", "hormone": "..." },
      "progress": [],
      "workouts": [],
      "nutrition": {},
      "hormone": { "symptoms": [], "exams": [] },
      "appointments": []
    }
  ],
  "community": [],
  "appointments": []
}
```

## Como usar

1. Abra `index.html` no navegador.
2. Faça login com um dos usuários de teste ou crie sua conta.

Usuários de teste:

- **Admin**: `admin@blkfit.com` / `admin123`
- **Médico**: `medico@blkfit.com` / `medico123`
- **Nutricionista**: `nutri@blkfit.com` / `nutri123`
- **Elite**: `elite@blkfit.com` / `elite123`

3. Navegue pelas telas usando o menu lateral.
4. Use o módulo de treino para registrar sessões.
5. Gere macros no módulo de dieta.
6. Registre medidas no módulo de progresso.
7. Use a IA Coach para sugestões rápidas.
8. Agende consultas e publique na comunidade.

## Próximos passos recomendados

- Adicionar backend real com autenticação segura
- Implementar banco de dados PostgreSQL
- Integrar OpenAI para IA Coach real
- Construir app móvel com React Native
- Adicionar gerenciamento de usuários e administração avançada

## Observações

Este é um protótipo estático que materializa a arquitetura de Fase 1 e parte da Fase 3/4. Ele entrega o esqueleto de um produto premium e já permite validar o fluxo de protocolos individuais.
