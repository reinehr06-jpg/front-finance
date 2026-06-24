/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🗺️ MAPA DO TESOURO — TELA: Dados da Igreja
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 📍 ROTA: /configuracoes/igreja
 * 📁 ARQUIVO: src/app/(menu)/configuracoes/igreja/page.tsx
 *
 * 🎯 OBJETIVO DESTA TELA:
 *    Informações gerais da instituição e contatos.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function IgrejaPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden font-inter bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col h-screen overflow-hidden">
        <Topbar />
        
        <main className="p-[40px] flex-1 flex flex-col w-full max-w-[1100px] mx-auto overflow-y-auto custom-scrollbar">
          
          {/* CABEÇALHO DA TELA DE CONFIGURAÇÃO */}
          <div className="mb-[32px]">
            <Link href="/configuracoes" className="inline-flex items-center gap-[8px] text-[#6B7280] hover:text-[#1A1A2E] text-[13px] font-[600] mb-[16px] transition-colors">
              <ArrowLeft className="w-[16px] h-[16px]" strokeWidth={{2}} />
              Voltar para Configurações
            </Link>
            <h1 className="text-[24px] font-[600] text-[#1A1A2E] tracking-tight">Dados da Igreja</h1>
            <p className="text-[14px] text-[#6B7280] mt-[4px]">Informações gerais da instituição e contatos.</p>
          </div>

          {/* ÁREA DE CONTEÚDO (PARA O DESENVOLVEDOR PREENCHER) */}
          <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-[16px] p-[32px] flex flex-col items-center justify-center min-h-[400px]">
             <p className="text-[#9CA3AF] font-[500] text-[15px]">A interface de <strong>Dados da Igreja</strong> será implementada aqui.</p>
          </div>

        </main>
      </div>
    </div>
  );
}
