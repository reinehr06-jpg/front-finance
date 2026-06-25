/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🗺️ MAPA DO TESOURO — TELA: DASHBOARD FINANCEIRO (Página Inicial)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 📍 ROTA: / (raiz do sistema — primeira tela que o usuário vê ao logar)
 * 📁 ARQUIVO: src/app/page.tsx
 *
 * 🎯 OBJETIVO DESTA TELA:
 *    Exibir um resumo visual e rápido da situação financeira da igreja/instituição.
 *    O usuário (tesoureiro, pastor, admin) deve bater o olho e entender:
 *      - Quanto entrou de receita este mês
 *      - Quanto saiu de despesa este mês
 *      - Qual o saldo total em todas as contas
 *      - O que precisa pagar hoje (urgente)
 *      - Gráficos de fluxo de caixa e categorias de despesa
 *      - Tabela de ações prioritárias do dia
 *
 * 🔗 INTEGRAÇÕES COM O BACK-END:
 *    1. GET /api/dashboard/resumo → Retorna os 4 KPIs (receitas, despesas, saldo, a pagar)
 *    2. GET /api/dashboard/fluxo-caixa?periodo=30d → Retorna dados do gráfico de área
 *    3. GET /api/dashboard/categorias-despesa → Retorna dados do gráfico de barras
 *    4. GET /api/dashboard/acoes-prioritarias → Retorna as contas a pagar do dia
 *    5. GET /api/dashboard/proximo-vencimento → Retorna o próximo vencimento (card no banner)
 *
 * 🎨 PALETA DE CORES OBRIGATÓRIA:
 *    - Roxo principal: #6D28D9 (botões, destaques, gráficos)
 *    - Roxo hover: #5B21B6
 *    - Variações gráficos: #6D28D9, #8B5CF6, #A78BFA, #C4B5FD
 *    - Cinzas: #1A1A2E (textos), #6B7280 (labels), #9CA3AF (placeholders)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

"use client"; // Obrigatório: indica ao Next.js que este componente roda no navegador (client-side)

// ─── IMPORTAÇÕES ─────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";   // Menu lateral fixo (navegação principal)
import Topbar from "@/components/Topbar";     // Barra superior (busca global + seletor de sistemas)
import { 
  ArrowUp,        // Ícone de seta pra cima (usado no KPI de receitas)
  ArrowDown,      // Ícone de seta pra baixo (usado no KPI de despesas)
  Wallet,         // Ícone de carteira (usado no KPI de saldo total)
  Sun,            // Ícone de sol (saudação "Bom dia")
  SunDim,         // Ícone de sol parcial (saudação "Boa tarde")
  Moon,           // Ícone de lua (saudação "Boa noite")
  CalendarDays,   // Ícone de calendário (card de próximo vencimento + KPI de "A Pagar")
  ChevronRight,   // Seta direita (link "Ver todas" na tabela)
  TrendingUp,     // Ícone de tendência (variação % nos KPIs)
  AlertTriangle   // Ícone de alerta (contas pendentes)
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, // Gráfico de Área (fluxo de caixa)
  BarChart, Bar, Cell // Gráfico de Barras Horizontal (despesas por categoria)
} from "recharts";
import { useTranslation } from "react-i18next"; // Internacionalização (i18n)

// ─── DADOS MOCKADOS (SUBSTITUIR POR CHAMADAS AO BACK-END) ───────────────────

/*
 * 📊 MOCK: Dados do gráfico de Fluxo de Caixa (Receitas vs Despesas)
 * 🔗 BACK-END: GET /api/dashboard/fluxo-caixa?periodo=30d
 *    Deve retornar um array com objetos { name: "DD/MM", receitas: number, despesas: number }
 *    O campo "name" é o label do eixo X (data), e receitas/despesas são valores em reais (centavos ou inteiro).
 */
const fluxoCaixaData = [
  { name: "01/06", receitas: 4000, despesas: 2400 },
  { name: "05/06", receitas: 3000, despesas: 1398 },
  { name: "10/06", receitas: 2000, despesas: 9800 },
  { name: "15/06", receitas: 2780, despesas: 3908 },
  { name: "20/06", receitas: 1890, despesas: 4800 },
  { name: "25/06", receitas: 2390, despesas: 3800 },
  { name: "30/06", receitas: 3490, despesas: 4300 },
];

/*
 * 📊 MOCK: Dados do gráfico de barras horizontais (Despesas por Categoria)
 * 🔗 BACK-END: GET /api/dashboard/categorias-despesa
 *    Deve retornar um array com objetos { name: "NomeCategoria", value: number }
 *    O value é o total gasto naquela categoria no mês atual.
 *    Os dados devem vir ordenados por valor (menor → maior) para o layout do gráfico.
 */
const categoriasData = [
  { name: "Manutenção", value: 400 },
  { name: "Marketing", value: 300 },
  { name: "Salários", value: 300 },
  { name: "Impostos", value: 200 },
].sort((a, b) => a.value - b.value); // Ordena de menor para maior (exibição no gráfico de barras)

/*
 * 🎨 Paleta de cores para o gráfico de barras (4 tons de roxo)
 *    Cada barra do gráfico recebe uma cor diferente, todas dentro da família roxa.
 */
const COLORS = ["#6D28D9", "#8B5CF6", "#A78BFA", "#C4B5FD"];

// ═══════════════════════════════════════════════════════════════════════════════
// 🏠 COMPONENTE PRINCIPAL: DashboardPage
// ═══════════════════════════════════════════════════════════════════════════════

export default function DashboardPage() {
  const { t } = useTranslation(); // Hook de tradução (i18n)

  /*
   * 🕐 Estado: Saudação dinâmica baseada na hora do dia
   *    - 05h às 11h59: "Bom dia"
   *    - 12h às 17h59: "Boa tarde"
   *    - 18h às 04h59: "Boa noite"
   *    🔗 BACK-END: O nome do usuário ("Vini") deve vir de GET /api/auth/me → { nome: "Vini" }
   */
  const [greeting, setGreeting] = useState("Bom dia");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Bom dia");
    else if (hour >= 12 && hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  /*
   * 🌤️ Configuração visual da saudação:
   *    Muda o ícone e a cor de fundo do quadradinho ao lado da saudação
   *    dependendo do horário do dia.
   */
  const getGreetingConfig = () => {
    if (greeting === "Bom dia") {
      return {
        icon: <Sun className="text-white drop-shadow-sm" strokeWidth={2} />,
        bg: "bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_4px_14px_rgba(245,158,11,0.3)]"
      }
    }
    if (greeting === "Boa tarde") {
      return {
        icon: <SunDim className="text-white drop-shadow-sm" strokeWidth={2} />,
        bg: "bg-gradient-to-br from-sky-400 to-blue-500 shadow-[0_4px_14px_rgba(56,187,248,0.3)]"
      }
    }
    return {
      icon: <Moon className="text-white drop-shadow-sm" strokeWidth={2.2} />,
      bg: "bg-gradient-to-br from-[#3B0764] to-[#0F172A] shadow-[0_4px_14px_rgba(59,7,100,0.3)]"
    }
  };
  const greetingConfig = getGreetingConfig();

  // ═══════════════════════════════════════════════════════════════════════════
  // 🖼️ RENDERIZAÇÃO DA TELA
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="flex min-h-screen font-inter bg-[#F5F5F7]">
      {/* ────── SIDEBAR: Menu lateral fixo com navegação para todas as telas ────── */}
      <Sidebar />

      {/* ────── ÁREA PRINCIPAL (tudo à direita da sidebar) ────── */}
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen transition-all duration-300">
        {/* ────── TOPBAR: Busca global + seletor de sistemas ────── */}
        <Topbar />
        
        <main className="flex-1 flex flex-col p-[20px_32px] min-h-0 relative">
          
          {/*
           * ══════════════════════════════════════════════════════════════
           * 🟣 SEÇÃO 1: BANNER DE SAUDAÇÃO (HEADER ROXO)
           * ══════════════════════════════════════════════════════════════
           * Exibe: Saudação personalizada ("Bom dia, Vini") + card de próximo vencimento
           * 🔗 BACK-END:
           *    - Nome do usuário: GET /api/auth/me → { nome }
           *    - Próximo vencimento: GET /api/dashboard/proximo-vencimento → { titulo, data_vencimento }
           */}
          <div className="bg-gradient-to-br from-[#6D28D9] to-[#5B21B6] rounded-[16px] p-[16px_24px] flex items-center justify-between shadow-[0_4px_16px_rgba(124,58,237,0.3)] shrink-0 mb-[16px]">
            {/* LADO ESQUERDO: Ícone do horário + Saudação + Subtítulo */}
            <div className="flex items-center gap-[16px]">
              {/* Ícone dinâmico: Sol (manhã), Sol parcial (tarde), Lua (noite) */}
              <div className={`w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0 [&>svg]:!w-[28px] [&>svg]:!h-[28px] ${greetingConfig.bg}`}>
                {greetingConfig.icon}
              </div>
              <div className="flex flex-col">
                {/* 🔗 BACK-END: Substituir "Vini" pelo nome do usuário logado */}
                <h1 className="text-[28px] font-[800] text-white leading-tight drop-shadow-sm tracking-tight">
                  {greeting}, Vini
                </h1>
                <p className="text-[14px] text-purple-200 mt-1">{t("Aqui estão os indicadores financeiros mais importantes de hoje.")}</p>
              </div>
            </div>
            
            {/*
             * LADO DIREITO: Card de Próximo Vencimento
             * 🔗 BACK-END: GET /api/dashboard/proximo-vencimento
             *    Deve retornar: { titulo: "Aluguel Sede", data_vencimento: "2024-06-25", valor: 2450 }
             *    O front calcula se é "Hoje", "Amanhã" ou mostra a data formatada.
             */}
            <div className="bg-white/10 backdrop-blur-md rounded-[12px] p-[12px_16px] flex items-center gap-[12px] border border-white/20 text-white w-[280px] shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-white/15 transition-colors cursor-default">
              <div className="w-[40px] h-[40px] rounded-[10px] bg-white/20 flex items-center justify-center shrink-0 shadow-sm">
                <CalendarDays className="w-[20px] h-[20px] text-white drop-shadow-sm" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-[10px] font-[700] text-[#E9D5FF] uppercase tracking-[0.06em]">{t("Próximo Vencimento")}</span>
                {/* 🔗 BACK-END: Título da conta a vencer */}
                <span className="text-[14px] font-[800] text-white leading-snug mt-0.5 truncate drop-shadow-sm">{t("Aluguel Sede")}</span>
                <div className="flex items-center gap-1.5 mt-0.5 text-[#E9D5FF]">
                  {/* 🔗 BACK-END: Prazo calculado (ex: "Vence Amanhã", "Vence em 3 dias") */}
                  <span className="text-[11px] font-[500] opacity-90 truncate">{t("Vence Amanhã")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ────── ÁREA DE CONTEÚDO ABAIXO DO BANNER ────── */}
          <div className="flex-1 flex flex-col gap-[12px] min-h-0 pb-4">
            
            {/*
             * ══════════════════════════════════════════════════════════════
             * 📊 SEÇÃO 2: LINHA DE KPIs (4 CARDS DE INDICADORES)
             * ══════════════════════════════════════════════════════════════
             * Exibe: Receitas no mês | Despesas no mês | Saldo Total | A Pagar Hoje
             * 🔗 BACK-END: GET /api/dashboard/resumo
             *    Deve retornar: {
             *      receitas_mes: { valor: 45230.00, variacao_percentual: 12 },
             *      despesas_mes: { valor: 12450.00, variacao_percentual: -5 },
             *      saldo_total: { valor: 138900.00, qtd_contas_ativas: 3 },
             *      a_pagar_hoje: { valor: 3200.00, qtd_pendentes: 2 }
             *    }
             */}
            <div className="grid grid-cols-4 gap-[16px] min-h-[85px] shrink-0">
              
              {/* ── KPI 1: RECEITAS NO MÊS ── */}
              {/* 🔗 BACK-END: resumo.receitas_mes.valor e resumo.receitas_mes.variacao_percentual */}
              <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-[16px_18px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-slate-50 transition-colors">
                <div className="flex flex-col overflow-hidden w-full">
                  <span className="text-[12px] font-[600] text-[#6B7280] truncate">{t("Receitas no mês")}</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    {/* 🔗 BACK-END: Valor formatado em R$ (ex: 45.230,00) */}
                    <span className="text-[24px] font-[800] text-[#1A1A2E]">45.230<span className="text-[14px]">,00</span></span>
                  </div>
                  {/* 🔗 BACK-END: Variação percentual em relação ao mês anterior */}
                  <span className="text-[11px] font-[600] text-[#10B981] mt-0.5 flex items-center gap-1 truncate">
                    <TrendingUp className="w-[12px] h-[12px] shrink-0" strokeWidth={3} /> +12% vs. mês passado
                  </span>
                </div>
                {/* Ícone decorativo: Seta para cima (receita = entrada de dinheiro) */}
                <div className="w-[42px] h-[42px] rounded-[10px] bg-[#F3E8FF] flex items-center justify-center shrink-0 ml-2">
                  <ArrowUp className="w-[20px] h-[20px] text-[#6D28D9]" strokeWidth={2.4} />
                </div>
              </div>

              {/* ── KPI 2: DESPESAS NO MÊS ── */}
              {/* 🔗 BACK-END: resumo.despesas_mes.valor e resumo.despesas_mes.variacao_percentual */}
              <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-[16px_18px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-slate-50 transition-colors">
                <div className="flex flex-col overflow-hidden w-full">
                  <span className="text-[12px] font-[600] text-[#6B7280] truncate">{t("Despesas no mês")}</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    {/* 🔗 BACK-END: Valor formatado em R$ */}
                    <span className="text-[24px] font-[800] text-[#1A1A2E]">12.450<span className="text-[14px]">,00</span></span>
                  </div>
                  {/* 🔗 BACK-END: Variação percentual (-5% = despesas caíram = bom) */}
                  <span className="text-[11px] font-[600] text-[#10B981] mt-0.5 flex items-center gap-1 truncate">
                    <TrendingUp className="w-[12px] h-[12px] shrink-0" strokeWidth={3} /> -5% vs. mês passado
                  </span>
                </div>
                {/* Ícone decorativo: Seta para baixo (despesa = saída de dinheiro) */}
                <div className="w-[42px] h-[42px] rounded-[10px] bg-[#EDE9FE] flex items-center justify-center shrink-0 ml-2">
                  <ArrowDown className="w-[20px] h-[20px] text-[#7C3AED]" strokeWidth={2.4} />
                </div>
              </div>

              {/* ── KPI 3: SALDO TOTAL ── */}
              {/* 🔗 BACK-END: resumo.saldo_total.valor e resumo.saldo_total.qtd_contas_ativas */}
              <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-[16px_18px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-slate-50 transition-colors">
                <div className="flex flex-col overflow-hidden w-full">
                  <span className="text-[12px] font-[600] text-[#6B7280] truncate">{t("Saldo Total")}</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    {/* 🔗 BACK-END: Soma de todas as contas ativas */}
                    <span className="text-[24px] font-[800] text-[#1A1A2E]">138.900<span className="text-[14px]">,00</span></span>
                  </div>
                  {/* 🔗 BACK-END: Quantidade de contas bancárias ativas */}
                  <span className="text-[11px] font-[600] text-[#6B7280] mt-0.5 flex items-center gap-1 truncate">
                    Em 3 contas ativas
                  </span>
                </div>
                {/* Ícone decorativo: Carteira */}
                <div className="w-[42px] h-[42px] rounded-[10px] bg-[#F4EEFF] flex items-center justify-center shrink-0 ml-2">
                  <Wallet className="w-[20px] h-[20px] text-[#6D28D9]" strokeWidth={2.4} />
                </div>
              </div>

              {/* ── KPI 4: A PAGAR HOJE ── */}
              {/* 🔗 BACK-END: resumo.a_pagar_hoje.valor e resumo.a_pagar_hoje.qtd_pendentes */}
              <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-[16px_18px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-slate-50 transition-colors">
                <div className="flex flex-col overflow-hidden w-full">
                  <span className="text-[12px] font-[600] text-[#6B7280] truncate">{t("A Pagar (Hoje)")}</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    {/* 🔗 BACK-END: Total em R$ que vence hoje */}
                    <span className="text-[24px] font-[800] text-[#1A1A2E]">3.200<span className="text-[14px]">,00</span></span>
                  </div>
                  {/* 🔗 BACK-END: Quantidade de boletos/contas pendentes pra hoje */}
                  <span className="text-[11px] font-[600] text-yellow-600 mt-0.5 flex items-center gap-1 truncate">
                    <AlertTriangle className="w-[12px] h-[12px] shrink-0" strokeWidth={3} /> 2 pendentes
                  </span>
                </div>
                {/* Ícone decorativo: Calendário com alerta */}
                <div className="w-[42px] h-[42px] rounded-[10px] bg-[#FFFBEB] flex items-center justify-center shrink-0 ml-2">
                  <CalendarDays className="w-[20px] h-[20px] text-[#F59E0B]" strokeWidth={2.4} />
                </div>
              </div>

            </div>

            {/*
             * ══════════════════════════════════════════════════════════════
             * 📈 SEÇÃO 3: GRÁFICOS (2 gráficos lado a lado)
             * ══════════════════════════════════════════════════════════════
             */}
            <div className="flex gap-[12px] h-[250px] shrink-0">
              
              {/*
               * 📈 GRÁFICO 1: Fluxo de Caixa (Gráfico de Área — Receitas vs Despesas)
               * Ocupa a maior parte da largura (~70%).
               * 🔗 BACK-END: GET /api/dashboard/fluxo-caixa?periodo=30d
               *    Resposta: Array de { name: "DD/MM", receitas: number, despesas: number }
               *    O select de período (ex: "Últimos 30 dias") deve enviar o parâmetro "periodo".
               */}
              <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-[16px_20px] flex-1 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-[12px] shrink-0">
                  <span className="text-[14px] font-[700] text-[#1A1A2E]">{t("Fluxo de Caixa (Receitas vs Despesas)")}</span>
                  {/* 🔗 BACK-END: Ao trocar o período, refazer a chamada com o novo filtro */}
                  <select className="text-[11px] border border-[#E5E7EB] px-2 py-1 rounded-[6px] text-[#4B5563] outline-none">
                    <option>{t("Últimos 30 dias")}</option>
                  </select>
                </div>
                <div className="flex-1 w-full min-h-0 ml-[-24px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fluxoCaixaData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      {/* Gradientes de preenchimento das áreas (roxo escuro = receitas, roxo claro = despesas) */}
                      <defs>
                        <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6D28D9" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} dy={5} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={(val) => `R$ ${val/1000}k`} />
                      <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 500 }} />
                      {/* Linha de Receitas: roxo escuro (#6D28D9) */}
                      <Area type="monotone" dataKey="receitas" name="Receitas" stroke="#6D28D9" strokeWidth={2} fillOpacity={1} fill="url(#colorReceitas)" />
                      {/* Linha de Despesas: roxo claro (#A78BFA) */}
                      <Area type="monotone" dataKey="despesas" name="Despesas" stroke="#A78BFA" strokeWidth={2} fillOpacity={1} fill="url(#colorDespesas)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/*
               * 📊 GRÁFICO 2: Despesas por Categoria (Gráfico de Barras Horizontal)
               * Mostra o ranking das categorias de despesa mais caras do mês.
               * 🔗 BACK-END: GET /api/dashboard/categorias-despesa
               *    Resposta: Array de { name: "NomeCategoria", value: number }
               *    Ordenar de menor para maior para o layout do gráfico.
               */}
              <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-[16px_20px] w-[340px] flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-0">
                <span className="text-[14px] font-[700] text-[#1A1A2E] mb-[12px] shrink-0">{t("Despesas por Categoria")}</span>
                <div className="flex-1 w-full min-h-0 ml-[-20px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoriasData} layout="vertical" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} width={80} />
                      <Tooltip cursor={{fill: '#F4EEFF'}} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '11px' }} formatter={(value) => `R$ ${value}`} />
                      <Bar dataKey="value" fill="#6D28D9" radius={[0, 4, 4, 0]} maxBarSize={20}>
                        {/* Cada barra recebe uma cor diferente (tons de roxo) */}
                        {categoriasData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/*
             * ══════════════════════════════════════════════════════════════
             * 📋 SEÇÃO 4: TABELA DE AÇÕES PRIORITÁRIAS DO DIA
             * ══════════════════════════════════════════════════════════════
             * Exibe as contas a pagar mais urgentes (vencendo hoje ou amanhã).
             * 🔗 BACK-END: GET /api/dashboard/acoes-prioritarias
             *    Resposta: Array de {
             *      descricao: "Imobiliária Souza Ltda",
             *      categoria: "Infraestrutura",
             *      vencimento: "2024-06-24",  // O front converte para "Hoje", "Amanhã", etc.
             *      valor: 2450.00,
             *      status: "pendente" | "atencao" | "pago"
             *    }
             * 📌 REGRA DE NEGÓCIO: Mostrar no máximo 5 itens. Se houver mais, o link "Ver todas"
             *    redireciona para /despesas com filtro de vencimento = hoje.
             */}
            <div className="flex gap-[12px] shrink-0 h-[220px]">
              
              <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-[16px_20px] flex-1 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-0 overflow-hidden">
                <div className="flex justify-between items-center mb-[8px] shrink-0">
                  <span className="text-[14px] font-[700] text-[#1A1A2E]">{t("Ações prioritárias de hoje")}</span>
                  {/* 🔗 NAVEGAÇÃO: Link para a listagem completa de despesas */}
                  <a href="/gestao-financeira/despesas" className="text-[11px] font-[600] text-[#6D28D9] hover:underline flex items-center gap-1">
                    {t("Ver todas")} <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#F1F1F4]">
                        <th className="pb-2 text-[10px] font-[700] text-[#9CA3AF] uppercase sticky top-0 bg-white">{t("Descrição")}</th>
                        <th className="pb-2 text-[10px] font-[700] text-[#9CA3AF] uppercase sticky top-0 bg-white">{t("Categoria")}</th>
                        <th className="pb-2 text-[10px] font-[700] text-[#9CA3AF] uppercase sticky top-0 bg-white">{t("Vencimento")}</th>
                        <th className="pb-2 text-[10px] font-[700] text-[#9CA3AF] uppercase text-right sticky top-0 bg-white">{t("Valor")}</th>
                        <th className="pb-2 text-[10px] font-[700] text-[#9CA3AF] uppercase text-center sticky top-0 bg-white">{t("Status")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 🔗 BACK-END: Cada <tr> abaixo representa um item retornado pela API */}

                      {/* ITEM 1: Conta urgente (status "Pendente" = vermelho) */}
                      <tr className="border-b border-[#F1F1F4] last:border-0 hover:bg-[#F9FAFB] cursor-pointer">
                        <td className="py-2.5 text-[12px] font-[600] text-[#1A1A2E]">Imobiliária Souza Ltda</td>
                        <td className="py-2.5 text-[11px] font-[500] text-[#4B5563]">Infraestrutura</td>
                        <td className="py-2.5 text-[11px] font-[500] text-[#4B5563]">Hoje</td>
                        <td className="py-2.5 text-[11px] font-[700] text-[#1A1A2E] text-right">R$ 2.450,00</td>
                        <td className="py-2.5 text-center">
                          {/* Badge "Pendente": fundo vermelho claro, texto vermelho */}
                          <span className="inline-block px-1.5 py-0.5 rounded-[4px] text-[10px] font-[700] tracking-wide text-red-500 bg-red-50">
                            Pendente
                          </span>
                        </td>
                      </tr>

                      {/* ITEM 2: Conta que precisa de atenção (status "Atenção" = amarelo) */}
                      <tr className="border-b border-[#F1F1F4] last:border-0 hover:bg-[#F9FAFB] cursor-pointer">
                        <td className="py-2.5 text-[12px] font-[600] text-[#1A1A2E]">Enel Distribuição</td>
                        <td className="py-2.5 text-[11px] font-[500] text-[#4B5563]">Utilidades</td>
                        <td className="py-2.5 text-[11px] font-[500] text-[#4B5563]">Amanhã</td>
                        <td className="py-2.5 text-[11px] font-[700] text-[#1A1A2E] text-right">R$ 530,00</td>
                        <td className="py-2.5 text-center">
                          {/* Badge "Atenção": fundo amarelo claro, texto amarelo */}
                          <span className="inline-block px-1.5 py-0.5 rounded-[4px] text-[10px] font-[700] tracking-wide text-yellow-600 bg-yellow-50">
                            Atenção
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
          
          {/*
           * ══════════════════════════════════════════════════════════════
           * 📝 RODAPÉ: Copyright do sistema
           * ══════════════════════════════════════════════════════════════
           */}
          <div className="mt-[22px] pb-[12px]">
            <p className="text-[14px] text-[#6B7280]">
              {t("COPYRIGHT © 2026")} <span className="font-[700] text-[#6D28D9]">{t("Basiléia Finance OS")}</span>{t(", Todos os direitos reservados")}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
