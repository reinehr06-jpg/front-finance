/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🗺️ MAPA DO TESOURO — TELA: CONFIGURAÇÕES (Painel Geral)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 📍 ROTA: /configuracoes
 * 📁 ARQUIVO: src/app/(menu)/configuracoes/page.tsx
 *
 * 🎯 OBJETIVO DESTA TELA:
 *    Painel central de configurações gerais do sistema (atalhos para sub-telas).
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { 
  Building2, 
  User, 
  Network, 
  CreditCard, 
  ArrowDownUp, 
  FileText, 
  CircleDollarSign,
  Search,
  ChevronRight
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const configuracoes = [
    {
      id: "conta",
      titulo: "Minha Conta",
      descricao: "Nome, e-mail, senha, telefone e dados cadastrais do usuário.",
      icone: <User className="w-[22px] h-[22px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/conta"
    },
    {
      id: "igreja",
      titulo: "Dados da Igreja",
      descricao: "Razão social, nome da igreja, CNPJ, endereço, contatos e responsável.",
      icone: <Building2 className="w-[22px] h-[22px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/igreja"
    },
    {
      id: "filiais",
      titulo: "Gerenciamento de Filiais",
      descricao: "Cadastre, edite e organize sede, congregações e filiais vinculadas.",
      icone: <Network className="w-[22px] h-[22px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/filiais"
    },
    {
      id: "assinatura",
      titulo: "Assinatura e Planos",
      descricao: "Acompanhe plano atual, limites, cobrança e dados da assinatura.",
      icone: <CreditCard className="w-[22px] h-[22px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/assinatura"
    },
    {
      id: "importacao",
      titulo: "Importação e Exportação",
      descricao: "Defina padrões de importação CSV/XML/OFX e exportações contábeis.",
      icone: <ArrowDownUp className="w-[22px] h-[22px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/importacao"
    },
    {
      id: "documentos",
      titulo: "Modelos e Recibos",
      descricao: "Modelos de recibo e prebenda, dados exibidos e configurações de emissão.",
      icone: <FileText className="w-[22px] h-[22px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/modelos"
    },
    {
      id: "preferencias",
      titulo: "Preferências Financeiras",
      descricao: "Moeda, competência ou caixa, padrões de lançamento e regras gerais.",
      icone: <CircleDollarSign className="w-[22px] h-[22px] text-[#6D28D9]" strokeWidth={1.5} />,
      link: "/configuracoes/preferencias"
    }
  ];

  const filteredConfig = configuracoes.filter(config => 
    config.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    config.descricao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden font-inter bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col h-screen overflow-hidden">
        <Topbar />
        
        <main className="p-[40px] flex-1 flex flex-col w-full max-w-[1100px] mx-auto overflow-y-auto custom-scrollbar">
          
          {/* HEADER E BUSCA */}
          <div className="flex flex-col items-center justify-center mb-[56px] mt-[32px]">
            <h1 className="text-[28px] font-[400] text-[#1A1A2E] tracking-tight mb-[24px]">
              Configurações do Sistema
            </h1>
            
            <div className="relative w-full max-w-[500px]">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Encontrar uma configuração..." 
                className="w-full h-[48px] bg-white border border-[#E5E7EB] rounded-[24px] pl-[48px] pr-[24px] text-[15px] text-[#111827] placeholder-[#9CA3AF] shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all" 
              />
              <Search className="w-[18px] h-[18px] text-[#9CA3AF] absolute left-[20px] top-1/2 -translate-y-1/2" strokeWidth={2} />
            </div>
          </div>

          {/* GRID DE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {filteredConfig.map((config, index) => (
              <Link 
                key={config.id} 
                href={config.link}
                className={`group flex items-center gap-[16px] bg-white border border-[#F1F1F4] shadow-[0_2px_8px_rgba(0,0,0,0.03)] rounded-[16px] p-[20px] hover:border-[#6D28D9]/30 hover:shadow-[0_4px_16px_rgba(109,40,217,0.06)] transition-all cursor-pointer ${
                  filteredConfig.length === 7 && index === 6 ? 'lg:col-start-2' : ''
                }`}
              >
                {/* ÍCONE COM BORDA */}
                <div className="flex items-center justify-center w-[52px] h-[52px] bg-white border border-[#E5E7EB] rounded-[12px] group-hover:border-[#6D28D9]/20 group-hover:bg-[#F3E8FF]/30 transition-colors shrink-0">
                  {config.icone}
                </div>
                
                {/* TEXTOS */}
                <div className="flex-1 flex flex-col gap-[4px] pr-[8px]">
                  <h3 className="text-[14px] font-[600] text-[#1A1A2E] group-hover:text-[#6D28D9] transition-colors">
                    {config.titulo}
                  </h3>
                  <p className="text-[12px] text-[#6B7280] leading-[1.4] line-clamp-2">
                    {config.descricao}
                  </p>
                </div>

                {/* CHEVRON INDICADOR */}
                <ChevronRight className="w-[18px] h-[18px] text-[#D1D5DB] group-hover:text-[#6D28D9] transition-colors shrink-0" strokeWidth={2} />
              </Link>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredConfig.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-[60px] text-[#9CA3AF]">
              <Search className="w-[48px] h-[48px] mb-[16px] text-[#E5E7EB]" strokeWidth={1} />
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
