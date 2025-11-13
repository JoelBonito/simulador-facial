# 🎯 Simulador Facial - MVP

Sistema de simulação de procedimentos estéticos com IA para clínicas e profissionais da área de estética.

## 📋 Sobre o Projeto

O **Simulador Facial** é uma aplicação web que permite a profissionais de estética realizarem simulações realistas de procedimentos usando Inteligência Artificial. O sistema gera visualizações de "antes e depois", orçamentos automáticos e relatórios técnicos para auxiliar na tomada de decisão dos pacientes.

### ✨ Procedimentos Suportados

- 🦷 **Facetas Dentárias** - Simulação de laminados cerâmicos ou resina
- ✨ **Clareamento Dentário** - Visualização do branqueamento dental
- 🦷 **Implantes Dentários** - Simulação de reposição de dentes
- 💉 **Botox** - Visualização do efeito da toxina botulínica
- 💆 **Harmonização Facial** - Simulação de preenchimentos faciais
- 👃 **Rinomodelação** - Correção estética do nariz sem cirurgia
- 💇 **Implantes Capilares** - Simulação de transplante capilar

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Formulários**: React Hook Form
- **Estado**: Zustand
- **Backend/DB**: Supabase (PostgreSQL + Storage + Auth)
- **IA**: Google Gemini 2.5 Flash

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase
- API Key do Google Gemini

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/simulador-facial.git
cd simulador-facial
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
VITE_GEMINI_API_KEY=sua_chave_da_api_gemini
```

4. **Configure o Supabase**

Execute o script SQL do arquivo `supabase/schema.sql` no SQL Editor do Supabase para criar as tabelas necessárias.

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **patients** - Dados dos pacientes
- **simulations** - Simulações realizadas
- **simulation_images** - Imagens das simulações
- **budgets** - Orçamentos gerados
- **technical_reports** - Relatórios técnicos

Veja o schema completo em `/supabase/schema.sql`

## 📖 Como Usar

### 1. Nova Simulação

1. Clique em "Nova Simulação"
2. Selecione o tipo de procedimento
3. Preencha os dados do paciente
4. Faça upload das fotos necessárias
5. Preencha o formulário técnico
6. Aguarde a IA gerar a simulação

### 2. Consultar Simulações

- Acesse a aba "Simulações"
- Use a busca para filtrar resultados
- Clique em "Visualizar" para ver detalhes

### 3. Gerenciar Pacientes

- Acesse a aba "Pacientes"
- Veja o histórico de simulações de cada paciente
- Clique em "Ver Ficha" para detalhes completos

## 🎨 Componentes Principais

### Estrutura de Pastas

```
src/
├── components/
│   ├── layout/           # Header e layout base
│   └── simulator/        # Componentes do simulador
│       ├── forms/        # Formulários específicos por procedimento
│       └── steps/        # Etapas do wizard de simulação
├── config/               # Configurações e constantes
├── types/                # Definições TypeScript
└── App.tsx              # Componente principal
```

## 🔐 Segurança

- Autenticação via Supabase Auth (em desenvolvimento)
- Row Level Security (RLS) no banco de dados
- Validação de uploads de imagens
- Sanitização de inputs

## 🚧 Roadmap

### MVP (Versão Atual)
- [x] Interface básica com 1 aba
- [x] 7 tipos de procedimentos
- [x] Upload de imagens
- [x] Formulários técnicos
- [x] Listagem de simulações e pacientes
- [ ] Integração com Gemini API
- [ ] Geração de orçamentos automáticos
- [ ] Geração de relatórios técnicos
- [ ] Export de PDFs

### Versão Premium (Futuro)
- [ ] Agente IA conversacional
- [ ] Integração com WhatsApp
- [ ] ERP completo para clínicas
- [ ] Multi-tenancy
- [ ] Análise de métricas
- [ ] Agendamento de consultas

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do email: suporte@simuladorfacial.com

---

**Desenvolvido com ❤️ para profissionais de estética**