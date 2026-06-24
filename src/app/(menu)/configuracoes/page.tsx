/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🗺️ MAPA DO TESOURO — TELA: CONFIGURAÇÕES (Painel Geral)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 📍 ROTA: /configuracoes
 * 📁 ARQUIVO: src/app/configuracoes/page.tsx
 *
 * 🎯 OBJETIVO DESTA TELA:
 *    Painel central de configurações gerais do sistema (atalhos para sub-telas).
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

"use client";

// ─── IMPORTAÇÕES ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { 
  Building2, Users, Layers, Wallet, Palette, ShieldCheck, RefreshCw, CreditCard, Search, Bell, HardDrive
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const configuracoes = [
    {
      id: "filiais",
      titulo: "Instituição / Filiais",
      descricao: "Gerencie a Igreja Sede, congregações, filiais e dados de CNPJ.",
      icone: <Building2 className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/filiais"
    },
    {
      id: "usuarios",
      titulo: "Usuários e Acessos",
      descricao: "Controle de administradores, tesoureiros, operadores e permissões de acesso.",
      icone: <Users className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/usuarios"
    },
    {
      id: "plano-contas",
      titulo: "Plano de Contas",
      descricao: "Estrutura contábil, categorias financeiras padrão para receitas e despesas.",
      icone: <Layers className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/contabilidade/categorias" // Redireciona para categorias
    },
    {
      id: "contas-bancarias",
      titulo: "Contas e Caixas",
      descricao: "Configuração dos bancos, carteiras digitais, saldos iniciais e caixas físicos.",
      icone: <Wallet className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/contas" // Redireciona para contas
    },
    {
      id: "personalizacao",
      titulo: "Personalização",
      descricao: "Logotipo da Igreja, informações nos recibos, cores e preferências de sistema.",
      icone: <Palette className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/personalizacao"
    },
    {
      id: "seguranca",
      titulo: "Segurança e Auditoria",
      descricao: "Logs de acesso, autenticação em duas etapas (2FA) e rotinas de backup.",
      icone: <ShieldCheck className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/seguranca"
    },
    {
      id: "integracoes",
      titulo: "Integrações e IA",
      descricao: "Regras de conciliação por IA, chaves de API, webhooks e automações.",
      icone: <RefreshCw className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/integracoes"
    },
    {
      id: "armazenamento",
      titulo: "Armazenamento e Arquivos",
      descricao: "Gerenciamento de espaço, documentos anexados e notas fiscais em nuvem.",
      icone: <HardDrive className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/armazenamento"
    },
    {
      id: "notificacoes",
      titulo: "Alertas e Notificações",
      descricao: "Configuração de e-mails, alertas de vencimento e avisos do sistema.",
      icone: <Bell className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/notificacoes"
    },
    {
      id: "assinatura",
      titulo: "Assinatura e Planos",
      descricao: "Gerencie seu plano atual do Basiléia, faturas, limites e formas de pagamento.",
      icone: <CreditCard className="w-[28px] h-[28px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/assinatura"
    }
  ];

  const filteredConfig = configuracoes.filter(config => 
    config.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    config.descricao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden font-inter bg-[#F5F5F7]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col h-screen overflow-hidden">
        <Topbar />
        
        <main className="p-[40px] flex-1 flex flex-col w-full max-w-[1200px] mx-auto overflow-y-auto custom-scrollbar">
          
          <div className="flex flex-col items-center justify-center mb-[48px] mt-[24px]">
            <h1 className="text-[32px] font-[300] text-[#1A1A2E] tracking-tight mb-[24px]">Configurações do Sistema</h1>
            
            <div className="relative w-full max-w-[500px]">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Encontrar uma configuração..." 
                className="w-full h-[48px] bg-white border border-[#E5E7EB] rounded-[24px] pl-[48px] pr-[24px] text-[15px] text-[#111827] placeholder-[#9CA3AF] shadow-sm outline-none hover:border-[#D1D5DB] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition-all" 
              />
              <Search className="w-[18px] h-[18px] text-[#9CA3AF] absolute left-[20px] top-1/2 -translate-y-1/2" strokeWidth={2} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {filteredConfig.map((config) => (
              <Link 
                key={config.id} 
                href={config.link}
                className="group flex items-start gap-[16px] bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] hover:border-[#6D28D9] hover:shadow-[0_4px_20px_rgba(109,40,217,0.08)] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-center w-[52px] h-[52px] bg-[#F9FAFB] rounded-[10px] group-hover:bg-[#F3E8FF] transition-colors shrink-0">
                  {config.icone}
                </div>
                <div className="flex flex-col gap-[4px] pt-[2px]">
                  <h3 className="text-[15px] font-[600] text-[#1A1A2E] group-hover:text-[#6D28D9] transition-colors">
                    {config.titulo}
                  </h3>
                  <p className="text-[13px] text-[#6B7280] leading-[1.4] line-clamp-2">
                    {config.descricao}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filteredConfig.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-[60px] text-[#9CA3AF]">
              <Search className="w-[48px] h-[48px] mb-[16px] text-[#D1D5DB]" strokeWidth={1} />
              <p className="text-[16px] font-[500]">Nenhuma configuração encontrada para "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-[16px] text-[#6D28D9] font-[600] text-[14px] hover:underline"
              >
                Limpar busca
              </button>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}
