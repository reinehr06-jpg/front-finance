/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🗺️ MAPA DO TESOURO — TELA: Assinatura e Planos
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 📍 ROTA: /configuracoes/assinatura
 * 📁 ARQUIVO: src/app/(menu)/configuracoes/assinatura/page.tsx
 *
 * 🎯 OBJETIVO DESTA TELA:
 *    Acompanhe seu plano atual e limites do sistema.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle2, AlertCircle, Download } from "lucide-react";

export default function AssinaturaPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden font-inter bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col h-screen overflow-hidden">
        <Topbar />
        
        <main className="p-[40px] flex-1 flex flex-col w-full max-w-[900px] mx-auto overflow-y-auto custom-scrollbar">
          
          <div className="mb-[32px]">
            <Link href="/configuracoes" className="inline-flex items-center gap-[8px] text-[#6B7280] hover:text-[#1A1A2E] text-[13px] font-[600] mb-[16px] transition-colors">
              <ArrowLeft className="w-[16px] h-[16px]" strokeWidth={2} />
              Voltar para Configurações
            </Link>
            <h1 className="text-[24px] font-[600] text-[#1A1A2E] tracking-tight">Assinatura e Planos</h1>
            <p className="text-[14px] text-[#6B7280] mt-[4px]">Acompanhe seu plano atual, limites do sistema e histórico de faturas.</p>
          </div>

          <div className="flex flex-col gap-[24px]">
             
             {/* PLANO ATUAL */}
             <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-[16px] p-[32px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[6px] bg-[#6D28D9]"></div>
               <div className="flex items-start justify-between">
                 <div>
                   <span className="inline-flex items-center gap-[6px] px-[12px] py-[4px] bg-[#F3E8FF] text-[#6D28D9] text-[12px] font-[600] rounded-full mb-[12px]">
                     <CheckCircle2 className="w-[14px] h-[14px]" />
                     Plano Ativo
                   </span>
                   <h2 className="text-[24px] font-[700] text-[#1A1A2E]">Plano Pro <span className="text-[16px] font-[400] text-[#6B7280]">/ Mensal</span></h2>
                   <p className="text-[14px] text-[#6B7280] mt-[8px]">Próxima cobrança em 15 de Julho de 2026 (R$ 199,90).</p>
                 </div>
                 <div className="flex flex-col gap-[12px]">
                   <button className="bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors text-white px-[20px] py-[10px] rounded-[8px] text-[14px] font-[600] shadow-sm">
                     Fazer Upgrade de Plano
                   </button>
                   <button className="text-[#6B7280] hover:text-[#DC2626] transition-colors text-[13px] font-[600]">
                     Cancelar assinatura
                   </button>
                 </div>
               </div>
               
               <div className="mt-[32px] pt-[32px] border-t border-[#F1F1F4] grid grid-cols-3 gap-[24px]">
                 <div>
                   <p className="text-[13px] text-[#6B7280] font-[600] mb-[8px]">Usuários (5/10)</p>
                   <div className="w-full h-[8px] bg-[#F3F4F6] rounded-full overflow-hidden">
                     <div className="w-1/2 h-full bg-[#6D28D9] rounded-full"></div>
                   </div>
                 </div>
                 <div>
                   <p className="text-[13px] text-[#6B7280] font-[600] mb-[8px]">Filiais (2/5)</p>
                   <div className="w-full h-[8px] bg-[#F3F4F6] rounded-full overflow-hidden">
                     <div className="w-2/5 h-full bg-[#6D28D9] rounded-full"></div>
                   </div>
                 </div>
                 <div>
                   <p className="text-[13px] text-[#6B7280] font-[600] mb-[8px]">Armazenamento (15GB/50GB)</p>
                   <div className="w-full h-[8px] bg-[#F3F4F6] rounded-full overflow-hidden">
                     <div className="w-[30%] h-full bg-[#6D28D9] rounded-full"></div>
                   </div>
                 </div>
               </div>
             </div>

             {/* FORMA DE PAGAMENTO */}
             <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-[16px] p-[32px]">
               <h3 className="text-[16px] font-[600] text-[#1A1A2E] mb-[20px]">Forma de Pagamento</h3>
               <div className="flex items-center justify-between p-[20px] border border-[#E5E7EB] rounded-[12px]">
                 <div className="flex items-center gap-[16px]">
                   <div className="w-[48px] h-[32px] bg-[#F3F4F6] rounded-[6px] flex items-center justify-center border border-[#E5E7EB]">
                     <CreditCard className="w-[20px] h-[20px] text-[#6B7280]" />
                   </div>
                   <div>
                     <p className="text-[14px] font-[600] text-[#1A1A2E]">Cartão de Crédito final 4321</p>
                     <p className="text-[13px] text-[#6B7280]">Expira em 12/2028</p>
                   </div>
                 </div>
                 <button className="text-[#6D28D9] font-[600] text-[13px] hover:underline">
                   Alterar Cartão
                 </button>
               </div>
             </div>

             {/* HISTÓRICO DE FATURAS */}
             <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-[16px] p-[32px]">
               <h3 className="text-[16px] font-[600] text-[#1A1A2E] mb-[20px]">Histórico de Faturas</h3>
               <table className="w-full">
                 <thead>
                   <tr className="border-b border-[#E5E7EB]">
                     <th className="text-left py-[12px] text-[13px] font-[600] text-[#6B7280]">Data</th>
                     <th className="text-left py-[12px] text-[13px] font-[600] text-[#6B7280]">Valor</th>
                     <th className="text-left py-[12px] text-[13px] font-[600] text-[#6B7280]">Status</th>
                     <th className="text-right py-[12px] text-[13px] font-[600] text-[#6B7280]">Ação</th>
                   </tr>
                 </thead>
                 <tbody>
                   {[
                     { data: "15/06/2026", valor: "R$ 199,90", status: "Pago", color: "text-[#10B981]", bg: "bg-[#D1FAE5]" },
                     { data: "15/05/2026", valor: "R$ 199,90", status: "Pago", color: "text-[#10B981]", bg: "bg-[#D1FAE5]" },
                     { data: "15/04/2026", valor: "R$ 199,90", status: "Pago", color: "text-[#10B981]", bg: "bg-[#D1FAE5]" },
                   ].map((fatura, idx) => (
                     <tr key={idx} className="border-b border-[#F3F4F6] last:border-0">
                       <td className="py-[16px] text-[14px] text-[#1A1A2E] font-[500]">{fatura.data}</td>
                       <td className="py-[16px] text-[14px] text-[#1A1A2E] font-[500]">{fatura.valor}</td>
                       <td className="py-[16px]">
                         <span className={`inline-flex items-center px-[10px] py-[4px] rounded-full text-[12px] font-[600] ${fatura.bg} ${fatura.color}`}>
                           {fatura.status}
                         </span>
                       </td>
                       <td className="py-[16px] text-right">
                         <button className="text-[#6B7280] hover:text-[#6D28D9] transition-colors inline-flex items-center gap-[4px] text-[13px] font-[500]">
                           <Download className="w-[14px] h-[14px]" /> PDF
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>

          </div>

        </main>
      </div>
    </div>
  );
}
