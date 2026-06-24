/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🗺️ MAPA DO TESOURO — TELA: Preferências Financeiras
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 📍 ROTA: /configuracoes/preferencias
 * 📁 ARQUIVO: src/app/(menu)/configuracoes/preferencias/page.tsx
 *
 * 🎯 OBJETIVO DESTA TELA:
 *    Moeda, regras de caixa e padrões de lançamentos.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import { ArrowLeft, Save, Coins, Calculator, LayoutTemplate } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";

export default function PreferenciasPage() {
  const [moeda, setMoeda] = useState("BRL");
  const [regime, setRegime] = useState("caixa");
  const [contaPadrao, setContaPadrao] = useState("caixa_geral");

  return (
    <div className="flex h-screen w-screen overflow-hidden font-inter bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col h-screen overflow-hidden">
        <Topbar />
        
        <main className="p-[40px] flex-1 flex flex-col w-full max-w-[800px] mx-auto overflow-y-auto custom-scrollbar">
          
          <div className="mb-[32px] flex items-center justify-between">
            <div>
              <Link href="/configuracoes" className="inline-flex items-center gap-[8px] text-[#6B7280] hover:text-[#1A1A2E] text-[13px] font-[600] mb-[16px] transition-colors">
                <ArrowLeft className="w-[16px] h-[16px]" strokeWidth={2} />
                Voltar para Configurações
              </Link>
              <h1 className="text-[24px] font-[600] text-[#1A1A2E] tracking-tight">Preferências Financeiras</h1>
              <p className="text-[14px] text-[#6B7280] mt-[4px]">Configurações gerais de moeda, contabilidade e padrões de lançamentos.</p>
            </div>
            <button className="bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors text-white px-[20px] py-[10px] rounded-[8px] text-[14px] font-[600] flex items-center gap-[8px] shadow-sm">
              <Save className="w-[16px] h-[16px]" />
              Salvar Configurações
            </button>
          </div>

          <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-[16px] p-[32px] flex flex-col gap-[32px]">
             
             {/* REGIME E MOEDA */}
             <div>
               <div className="flex items-center gap-[12px] mb-[16px]">
                 <div className="w-[32px] h-[32px] bg-[#F3E8FF] rounded-[8px] flex items-center justify-center text-[#6D28D9]">
                   <Calculator className="w-[16px] h-[16px]" />
                 </div>
                 <h3 className="text-[16px] font-[600] text-[#1A1A2E]">Base Contábil e Moeda</h3>
               </div>
               
               <div className="grid grid-cols-2 gap-[24px]">
                 <div className="col-span-2 md:col-span-1 flex flex-col gap-[8px]">
                   <label className="text-[13px] font-[600] text-[#374151]">Moeda Padrão</label>
                   <CustomSelect 
                     value={moeda} 
                     onChange={setMoeda} 
                     searchable={false}
                     className="h-[42px]"
                     options={[
                       { value: "BRL", label: "Real Brasileiro (R$)" },
                       { value: "USD", label: "Dólar Americano (US$)" },
                       { value: "EUR", label: "Euro (€)" },
                     ]} 
                     placeholder="Selecione a moeda" 
                   />
                 </div>
                 <div className="col-span-2 md:col-span-1 flex flex-col gap-[8px]">
                   <label className="text-[13px] font-[600] text-[#374151]">Regime de Apuração</label>
                   <CustomSelect 
                     value={regime} 
                     onChange={setRegime} 
                     searchable={false}
                     className="h-[42px]"
                     options={[
                       { value: "caixa", label: "Regime de Caixa" },
                       { value: "competencia", label: "Regime de Competência" },
                     ]} 
                     placeholder="Selecione o regime" 
                   />
                 </div>
                 <div className="col-span-2">
                   <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] p-[16px] text-[13px] text-[#6B7280] leading-[1.5]">
                     No <strong className="text-[#1A1A2E]">Regime de Caixa</strong>, os relatórios mostram os valores apenas quando são efetivamente pagos ou recebidos. No <strong className="text-[#1A1A2E]">Regime de Competência</strong>, os valores constam no mês do fato gerador (data de emissão), independentemente do pagamento.
                   </div>
                 </div>
               </div>
             </div>

             {/* PADRÕES DE LANÇAMENTO */}
             <div className="pt-[32px] border-t border-[#F1F1F4]">
               <div className="flex items-center gap-[12px] mb-[16px]">
                 <div className="w-[32px] h-[32px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[8px] flex items-center justify-center text-[#6B7280]">
                   <LayoutTemplate className="w-[16px] h-[16px]" />
                 </div>
                 <h3 className="text-[16px] font-[600] text-[#1A1A2E]">Padrões de Lançamento</h3>
               </div>
               
               <div className="grid grid-cols-2 gap-[24px]">
                 <div className="col-span-2 md:col-span-1 flex flex-col gap-[8px]">
                   <label className="text-[13px] font-[600] text-[#374151]">Conta Bancária/Caixa Padrão</label>
                   <CustomSelect 
                     value={contaPadrao} 
                     onChange={setContaPadrao} 
                     searchable={false}
                     className="h-[42px]"
                     options={[
                       { value: "caixa_geral", label: "Caixa Geral da Igreja" },
                       { value: "bradesco", label: "Bradesco C/C" },
                       { value: "itau", label: "Itaú Poupança" },
                     ]} 
                     placeholder="Selecione a conta" 
                   />
                   <p className="text-[12px] text-[#9CA3AF] mt-[4px]">Esta conta virá pré-selecionada nas telas de Nova Receita e Despesa.</p>
                 </div>
               </div>

               <div className="mt-[24px] flex flex-col gap-[16px]">
                 <div className="flex items-center justify-between p-[16px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px]">
                   <div>
                     <p className="text-[14px] font-[600] text-[#1A1A2E]">Alerta de Saldo Negativo</p>
                     <p className="text-[13px] text-[#6B7280]">Bloquear pagamentos se a conta não tiver saldo suficiente.</p>
                   </div>
                   <div className="relative inline-block w-[40px] h-[24px] shrink-0 cursor-pointer">
                     <input type="checkbox" className="peer sr-only" id="block-saldo" />
                     <div className="w-[40px] h-[24px] bg-[#E5E7EB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-[#6D28D9]"></div>
                   </div>
                 </div>

                 <div className="flex items-center justify-between p-[16px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px]">
                   <div>
                     <p className="text-[14px] font-[600] text-[#1A1A2E]">Baixa Automática</p>
                     <p className="text-[13px] text-[#6B7280]">Marcar como "Pago" automaticamente ao criar um lançamento com data retroativa ou de hoje.</p>
                   </div>
                   <div className="relative inline-block w-[40px] h-[24px] shrink-0 cursor-pointer">
                     <input type="checkbox" className="peer sr-only" id="auto-baixa" defaultChecked />
                     <div className="w-[40px] h-[24px] bg-[#E5E7EB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-[#6D28D9]"></div>
                   </div>
                 </div>
               </div>

             </div>

          </div>

        </main>
      </div>
    </div>
  );
}
