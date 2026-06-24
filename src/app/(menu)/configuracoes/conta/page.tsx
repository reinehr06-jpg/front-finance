/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🗺️ MAPA DO TESOURO — TELA: Minha Conta
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 📍 ROTA: /configuracoes/conta
 * 📁 ARQUIVO: src/app/(menu)/configuracoes/conta/page.tsx
 *
 * 🎯 OBJETIVO DESTA TELA:
 *    Gerencie seus dados pessoais, senha e acesso.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, Lock, Upload, Save } from "lucide-react";

export default function ContaPage() {
  const [formData, setFormData] = useState({
    nome: "João Silva",
    email: "joao.silva@igreja.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00"
  });

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
              <h1 className="text-[24px] font-[600] text-[#1A1A2E] tracking-tight">Minha Conta</h1>
              <p className="text-[14px] text-[#6B7280] mt-[4px]">Gerencie seus dados pessoais, foto de perfil e credenciais de acesso.</p>
            </div>
            <button className="bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors text-white px-[20px] py-[10px] rounded-[8px] text-[14px] font-[600] flex items-center gap-[8px] shadow-sm">
              <Save className="w-[16px] h-[16px]" />
              Salvar Alterações
            </button>
          </div>

          <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-[16px] p-[32px] flex flex-col gap-[32px]">
             
             {/* FOTO DE PERFIL */}
             <div className="flex items-center gap-[24px] pb-[32px] border-b border-[#F1F1F4]">
               <div className="w-[80px] h-[80px] bg-[#F3E8FF] rounded-full flex items-center justify-center text-[#6D28D9] text-[32px] font-[600]">
                 JS
               </div>
               <div className="flex flex-col gap-[8px]">
                 <h3 className="text-[15px] font-[600] text-[#1A1A2E]">Foto de Perfil</h3>
                 <p className="text-[13px] text-[#6B7280]">Recomendado formato quadrado (1:1), tamanho máximo 2MB.</p>
                 <div className="flex items-center gap-[12px] mt-[4px]">
                   <button className="px-[16px] py-[8px] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-[8px] text-[13px] font-[600] text-[#374151] flex items-center gap-[8px] transition-colors">
                     <Upload className="w-[14px] h-[14px]" />
                     Fazer Upload
                   </button>
                   <button className="px-[16px] py-[8px] text-[#DC2626] hover:bg-[#FEF2F2] rounded-[8px] text-[13px] font-[600] transition-colors">
                     Remover foto
                   </button>
                 </div>
               </div>
             </div>

             {/* FORMULÁRIO DE DADOS */}
             <div className="grid grid-cols-2 gap-[24px]">
               <div className="col-span-2 md:col-span-1 flex flex-col gap-[8px]">
                 <label className="text-[13px] font-[600] text-[#374151]">Nome Completo</label>
                 <div className="relative">
                   <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full h-[42px] border border-[#E5E7EB] rounded-[8px] px-[16px] pl-[40px] text-[14px] text-[#1A1A2E] outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all" />
                   <User className="w-[16px] h-[16px] text-[#9CA3AF] absolute left-[16px] top-1/2 -translate-y-1/2" />
                 </div>
               </div>

               <div className="col-span-2 md:col-span-1 flex flex-col gap-[8px]">
                 <label className="text-[13px] font-[600] text-[#374151]">E-mail de Acesso</label>
                 <div className="relative">
                   <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full h-[42px] border border-[#E5E7EB] rounded-[8px] px-[16px] pl-[40px] text-[14px] text-[#1A1A2E] outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all" />
                   <Mail className="w-[16px] h-[16px] text-[#9CA3AF] absolute left-[16px] top-1/2 -translate-y-1/2" />
                 </div>
               </div>

               <div className="col-span-2 md:col-span-1 flex flex-col gap-[8px]">
                 <label className="text-[13px] font-[600] text-[#374151]">Telefone</label>
                 <div className="relative">
                   <input type="text" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} className="w-full h-[42px] border border-[#E5E7EB] rounded-[8px] px-[16px] pl-[40px] text-[14px] text-[#1A1A2E] outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all" />
                   <Phone className="w-[16px] h-[16px] text-[#9CA3AF] absolute left-[16px] top-1/2 -translate-y-1/2" />
                 </div>
               </div>

               <div className="col-span-2 md:col-span-1 flex flex-col gap-[8px]">
                 <label className="text-[13px] font-[600] text-[#374151]">CPF</label>
                 <input type="text" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} className="w-full h-[42px] border border-[#E5E7EB] rounded-[8px] px-[16px] text-[14px] text-[#1A1A2E] outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all bg-[#F9FAFB] cursor-not-allowed" disabled />
                 <span className="text-[11px] text-[#9CA3AF]">Para alterar o CPF, entre em contato com o suporte.</span>
               </div>
             </div>

             {/* SEGURANÇA */}
             <div className="mt-[8px] pt-[32px] border-t border-[#F1F1F4] flex items-center justify-between">
               <div>
                 <h3 className="text-[15px] font-[600] text-[#1A1A2E]">Segurança e Senha</h3>
                 <p className="text-[13px] text-[#6B7280]">Proteja sua conta atualizando sua senha periodicamente.</p>
               </div>
               <button className="px-[16px] py-[10px] border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-[8px] text-[13px] font-[600] text-[#374151] flex items-center gap-[8px] transition-colors">
                 <Lock className="w-[14px] h-[14px]" />
                 Alterar Minha Senha
               </button>
             </div>

          </div>

        </main>
      </div>
    </div>
  );
}
