"use client";

import React, { useState, use } from "react";
import { UserX, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import CustomSelect from "@/components/CustomSelect";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Pencil,
  Calendar,
  Activity,
  Heart,
  AlertTriangle,
  Search,
  Edit2,
  CheckCircle2,
  Users,
  GraduationCap,
  CalendarDays,
  Smartphone,
  MessageSquare,
  DollarSign,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail
} from "lucide-react";

// ============================================================
// MAPA DO TESOURO — Cadastros / Membros (Perfil / Histórico)
// ============================================================
// PROPÓSITO:
//   Exibir o perfil completo do membro com histórico de eventos,
//   filtros por categoria e geração de relatório PDF.
//
// INPUTS / FILTROS:
//   [select] Filtro por categoria → "Todos", "Alterações cadastrais",
//            "Atendimentos", "Célula", "Cursos", "Eventos", "Contribuições"
//   [button] Gerar PDF → exporta histórico como PDF
//
// BOTÕES DE AÇÃO:
//   [button Pencil] → editar membro (/cadastros/membros/[id]/editar)
//   [button AlertTriangle] → desativar membro (abre modal)
//   [button] Gerar PDF → gera relatório via jsPDF
//
// COMPORTAMENTOS:
//   - Timeline de eventos com ícones por tipo
//   - Modal de desativação com motivo obrigatório
//   - Filtro altera lista de eventos em tempo real
//
// #pag14 — Membros (Perfil)
// ============================================================
export default function MembroHistoricoPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { t } = useTranslation();
  const params = use(paramsPromise);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState("");
  const [deactivateError, setDeactivateError] = useState(false);
  const [memberDeactivated, setMemberDeactivated] = useState(false);
  const [timelinePeriod, setTimelinePeriod] = useState("30dias");

  const filters = [
    "Todos", "Alterações cadastrais", "Atendimentos", "Célula", 
    "Cursos", "Eventos", "Contribuições"
  ];

  const MOCK_EVENTS = [
    { id: 1, type: "Alterações cadastrais", date: "24/05/2026", time: "20:14", title: "Telefone atualizado", desc: "O número foi alterado de (47) 99111-2233 para (47) 99987-1234.", author: "Secretaria", authorName: "Por Ana Souza", icon: "edit", color: "#8B5CF6", bgTag: "#F4EEFF", textTag: "#6D28D9" },
    { id: 2, type: "Presença", date: "24/05/2026", time: "19:05", title: "Presença confirmada no Culto da Família", desc: "Participou do culto de domingo às 19:00.", author: "Sistema", authorName: "Registro automático", icon: "check", color: "#10B981", bgTag: "#10B981/10", textTag: "#059669" },
    { id: 3, type: "Atendimentos", date: "22/05/2026", time: "16:30", title: "Acompanhamento realizado", desc: "Conversa pastoral registrada com observação interna.", author: "Pr. João Silva", authorName: "Pastor responsável", icon: "heart", color: "#3B82F6", bgTag: "#EFF6FF", textTag: "#2563EB" },
    { id: 4, type: "Ocorrência", date: "13/05/2026", time: "19:00", title: "Ausente há 3 cultos consecutivos", desc: "Última presença registrada no dia 04/05/2026.", author: "Sistema", authorName: "Alerta automático", icon: "alert", color: "#F59E0B", bgTag: "#FEF3C7", textTag: "#B45309", isWarning: true }
  ];

  const filteredEvents = activeFilter === "Todos" ? MOCK_EVENTS : MOCK_EVENTS.filter(e => e.type === activeFilter || (activeFilter === "Ocorrências" && e.type === "Ocorrência"));

  const generatePDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;
    
    const doc = new jsPDF();
    const purple: [number, number, number] = [109, 40, 217];
    const purpleLight: [number, number, number] = [244, 238, 255];
    const gray: [number, number, number] = [107, 114, 128];
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ', ' + now.toLocaleTimeString('pt-BR');

    // Header
    doc.setFontSize(22);
    doc.setTextColor(...purple);
    doc.text('Basiléia Church OS', 14, 25);
    doc.setFontSize(11);
    doc.setTextColor(...purple);
    doc.text('Relatório Completo do Membro', 14, 33);

    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(`Membro: João Pedro Silva`, 14, 44);
    doc.text(`Rede: Rede Esperança  |  Célula: Norte`, 14, 50);
    doc.text(`Data de Geração: ${dateStr}`, 14, 56);
    doc.text(`Filtro: ${activeFilter}`, 120, 44);
    doc.text(`Período: Todo período`, 120, 50);

    // Line
    doc.setDrawColor(...purple);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60);

    let startY = 68;

    // Section: Dados Cadastrais
    doc.setFontSize(13);
    doc.setTextColor(...purple);
    doc.text('Dados Cadastrais', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Campo', 'Valor']],
      body: [
        ['Nome completo', 'João Pedro Silva'],
        ['Telefone', '(47) 99987-1234'],
        ['E-mail', 'joaopedro.silva@email.com'],
        ['Rede', 'Rede Esperança'],
        ['Célula', 'Norte'],
        ['Data de ingresso', '15/03/2021'],
        ['Batismo', '22/08/2021'],
        ['Ministério', 'Louvor'],
        ['Status', 'Ativo'],
      ],
      headStyles: { fillColor: purple, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: purpleLight },
      margin: { left: 14, right: 14 },
    });

    // Section: Histórico de Alterações
    startY = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(13);
    doc.setTextColor(...purple);
    doc.text('Histórico de Alterações Cadastrais', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Data', 'Alteração', 'Descrição', 'Responsável']],
      body: [
        ['24/05/2026 20:14', 'Telefone atualizado', 'De (47) 99111-2233 para (47) 99987-1234', 'Ana Souza'],
        ['10/04/2026 14:30', 'Endereço atualizado', 'Rua das Flores, 123 → Av. Brasil, 456', 'Secretaria'],
      ],
      headStyles: { fillColor: purple, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: purpleLight },
      margin: { left: 14, right: 14 },
    });

    // Section: Presenças
    startY = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(13);
    doc.setTextColor(...purple);
    doc.text('Presenças em Cultos', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Data', 'Culto / Evento', 'Status', 'Registrado por']],
      body: [
        ['24/05/2026', 'Culto da Família', 'Presente', 'Sistema'],
        ['17/05/2026', 'Culto de Domingo', 'Presente', 'Sistema'],
        ['10/05/2026', 'Culto de Domingo', 'Ausente', 'Sistema'],
        ['04/05/2026', 'Culto da Família', 'Presente', 'Sistema'],
      ],
      headStyles: { fillColor: purple, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: purpleLight },
      margin: { left: 14, right: 14 },
    });

    // Section: Cursos
    startY = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(13);
    doc.setTextColor(...purple);
    doc.text('Cursos Realizados', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Curso', 'Início', 'Conclusão', 'Status', 'Nota']],
      body: [
        ['Fundamentos da Fé', '01/02/2022', '15/03/2022', 'Concluído', '9.5'],
        ['Escola de Líderes', '01/06/2022', '30/08/2022', 'Concluído', '8.7'],
        ['Batismo nas Águas', '10/07/2021', '10/07/2021', 'Concluído', '-'],
      ],
      headStyles: { fillColor: purple, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: purpleLight },
      margin: { left: 14, right: 14 },
    });

    // Section: Eventos
    startY = (doc as any).lastAutoTable.finalY + 12;
    if (startY > 250) { doc.addPage(); startY = 20; }
    doc.setFontSize(13);
    doc.setTextColor(...purple);
    doc.text('Eventos Participados', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Evento', 'Data', 'Local', 'Tipo']],
      body: [
        ['Conferência de Louvor 2025', '15/11/2025', 'Templo Central', 'Conferência'],
        ['Retiro de Jovens', '20/07/2025', 'Sítio Refúgio', 'Retiro'],
        ['Encontro de Casais', '14/02/2025', 'Templo Central', 'Encontro'],
      ],
      headStyles: { fillColor: purple, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: purpleLight },
      margin: { left: 14, right: 14 },
    });

    // Section: Atendimentos
    startY = (doc as any).lastAutoTable.finalY + 12;
    if (startY > 250) { doc.addPage(); startY = 20; }
    doc.setFontSize(13);
    doc.setTextColor(...purple);
    doc.text('Atendimentos Pastorais', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Data', 'Tipo', 'Responsável', 'Observação']],
      body: [
        ['22/05/2026', 'Acompanhamento', 'Pr. João Silva', 'Conversa pastoral registrada'],
        ['15/04/2026', 'Visita domiciliar', 'Pr. João Silva', 'Visita ao lar do membro'],
      ],
      headStyles: { fillColor: purple, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: purpleLight },
      margin: { left: 14, right: 14 },
    });

    // Section: Célula
    startY = (doc as any).lastAutoTable.finalY + 12;
    if (startY > 250) { doc.addPage(); startY = 20; }
    doc.setFontSize(13);
    doc.setTextColor(...purple);
    doc.text('Participação na Célula', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Data', 'Célula', 'Presença', 'Observação']],
      body: [
        ['20/05/2026', 'Célula Norte', 'Presente', 'Participou ativamente'],
        ['13/05/2026', 'Célula Norte', 'Ausente', 'Sem justificativa'],
        ['06/05/2026', 'Célula Norte', 'Presente', '-'],
      ],
      headStyles: { fillColor: purple, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: purpleLight },
      margin: { left: 14, right: 14 },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text(`Basiléia Church OS • Relatório gerado em ${dateStr}`, 14, 290);
      doc.text(`Página ${i} de ${pageCount}`, 180, 290);
    }

    doc.save('relatorio_joao_pedro_silva.pdf');
  };

  return (
    <div className="flex min-h-screen font-inter bg-[#F8F9FA]">
      <Sidebar />

      <div className="flex-1 ml-[240px] flex flex-col min-h-screen transition-all duration-300 overflow-x-hidden">
        <Topbar />

        <main className="p-[20px_32px_20px_32px] flex-1 flex flex-col max-w-[1400px] mx-auto w-full h-[calc(100vh-64px)] overflow-hidden">
          
          {/* BREADCRUMBS & TOP ACTIONS */}
          <div className="flex flex-col gap-4 mb-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[13px] font-[500] text-[#6B7280]">
                  <Link href="/cadastros/membros" className="hover:text-[#1A1A2E] transition-colors">{t("Membros")}</Link>
                  <span>/</span>
                  <span className="text-[#1A1A2E]">{t("João Pedro Silva")}</span>
                </div>
                
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F4EEFF] flex items-center justify-center shrink-0">
                    <FileText className="w-[16px] h-[16px] text-[#7C3AED]" strokeWidth={2.4} />
                  </div>
                  <h1 className="text-[24px] font-[800] text-[#1A1A2E] tracking-tight">{t("Histórico do membro")}</h1>
                </div>
                <p className="text-[13px] text-[#6B7280] font-[400] mt-0.5">{t("Acompanhe todas as alterações, interações, movimentações e registros relacionados a este membro.")}</p>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/cadastros/membros/${params.id || 1}/editar`} className="flex items-center gap-2 px-[20px] py-[10px] bg-[#6D28D9] text-white text-[13px] font-[600] rounded-[8px] hover:bg-[#5B21B6] transition-colors shadow-sm shadow-[#6D28D9]/20">
                  <Pencil className="w-[14px] h-[14px]" strokeWidth={2.4} />
                  {t("Editar membro")}
                </Link>
              </div>
            </div>
          </div>

          {/* PERFIL SUPERIOR (Compacto) */}
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] mb-4 flex flex-col xl:flex-row gap-5 shrink-0 items-center">
            
            {/* Info do Membro */}
            <div className="flex items-center gap-4 flex-1 border-b xl:border-b-0 xl:border-r border-[#F1F1F4] pb-4 xl:pb-0 xl:pr-4">
              <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-[2px] border-white shadow-sm shrink-0 bg-gray-100 relative">
                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h2 className="text-[16px] font-[800] text-[#1A1A2E] leading-none">{t("João Pedro Silva")}</h2>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#10B981]/10 rounded-full">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#10B981]"></div>
                    <span className="text-[10px] font-[700] text-[#10B981] uppercase tracking-wide">{t("Ativo")}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563]">
                    <Phone className="w-[12px] h-[12px] text-[#9CA3AF]" />
                    (47) 99987-1234
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563]">
                    <span className="text-[#9CA3AF]">{t("Rede:")}</span> <span className="font-[600] text-[#1A1A2E]">{t("Rede Esperança")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563]">
                    <span className="text-[#9CA3AF]">{t("Célula:")}</span> <span className="font-[600] text-[#1A1A2E]">{t("Norte")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563]">
                    <span className="text-[#9CA3AF]">{t("Ingresso:")}</span> <span className="font-[600] text-[#1A1A2E]">15/03/2021</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563]">
                    <span className="text-[#9CA3AF]">{t("Batismo:")}</span> <span className="font-[600] text-[#1A1A2E]">22/08/2021</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563]">
                    <span className="text-[#9CA3AF]">{t("Min:")}</span> <span className="font-[600] text-[#1A1A2E]">{t("Louvor")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="flex gap-3 xl:w-[460px] shrink-0 h-[68px]">
              <div className="flex-1 bg-[#FAFAFC] rounded-[10px] p-3 flex flex-col justify-center border border-[#F1F1F4] relative overflow-hidden group hover:border-[#8B5CF6]/30 transition-colors">
                <Calendar className="absolute right-[-8px] bottom-[-8px] w-[32px] h-[32px] text-[#8B5CF6]/10 group-hover:text-[#8B5CF6]/20 transition-colors" strokeWidth={2} />
                <p className="text-[10px] font-[700] text-[#6B7280] uppercase tracking-wider mb-0.5">{t("Tempo igreja")}</p>
                <p className="text-[15px] font-[800] text-[#1A1A2E] leading-none">{t("4a 2m")}</p>
              </div>
              <div className="flex-1 bg-[#FAFAFC] rounded-[10px] p-3 flex flex-col justify-center border border-[#F1F1F4] relative overflow-hidden group hover:border-[#10B981]/30 transition-colors">
                <Activity className="absolute right-[-8px] bottom-[-8px] w-[32px] h-[32px] text-[#10B981]/10 group-hover:text-[#10B981]/20 transition-colors" strokeWidth={2} />
                <p className="text-[10px] font-[700] text-[#6B7280] uppercase tracking-wider mb-0.5">{t("Presença 3m")}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-[15px] font-[800] text-[#10B981] leading-none">82%</p>
                  <p className="text-[10px] font-[600] text-[#6B7280]">32/39</p>
                </div>
              </div>
              <div className="flex-1 bg-[#FFFBEB] rounded-[10px] p-3 flex flex-col justify-center border border-[#FEF3C7] relative overflow-hidden group hover:border-[#F59E0B]/30 transition-colors">
                <AlertTriangle className="absolute right-[-8px] bottom-[-8px] w-[32px] h-[32px] text-[#F59E0B]/10 group-hover:text-[#F59E0B]/20 transition-colors" strokeWidth={2} />
                <p className="text-[10px] font-[700] text-[#B45309] uppercase tracking-wider mb-0.5">{t("Pendências")}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-[800] text-[#92400E] leading-none">2</p>
                  <button className="text-[10px] font-[700] text-[#D97706] hover:underline leading-none relative z-10">{t("Visualizar")}</button>
                </div>
              </div>
            </div>

          </div>

          {/* FILTROS EM PÍLULAS (FULL WIDTH, ACIMA DO SPLIT) */}
          <div className="flex items-center gap-2 mb-4 shrink-0 overflow-x-auto scrollbar-hide flex-nowrap pb-1 max-w-full">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-[14px] py-[6px] rounded-full text-[12px] font-[600] transition-colors border whitespace-nowrap ${
                  activeFilter === f 
                    ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-sm' 
                    : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-[#FAFAFC]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* MAIN CONTENT SPLIT */}
          <div className="flex flex-col xl:flex-row gap-5 flex-1 min-h-0">
            
            {/* ESQUERDA: TIMELINE */}
            <div className="flex-1 flex flex-col min-h-0 min-w-0">
              
              {/* Busca e Data */}
              <div className="flex items-center gap-4 mb-4 shrink-0">
                <div className="relative flex items-center flex-1 h-[42px] bg-white border border-[#E5E7EB] rounded-[10px] px-[14px] shadow-sm  transition-all">
                  <Search className="text-[#9CA3AF] w-[16px] h-[16px] mr-[8px]" />
                  <input
                    type="text"
                    placeholder={t("Pesquisar no histórico...")}
                    className="bg-transparent border-none outline-none text-[13px] text-[#1A1A2E] placeholder-[#9CA3AF] w-full"
                  />
                </div>
                <div className="shrink-0 w-[160px]">
                  <CustomSelect
                    options={[
                      { value: "30dias", label: t("Últimos 30 dias") },
                      { value: "6meses", label: t("Últimos 6 meses") },
                      { value: "1ano", label: t("Último ano") },
                      { value: "todo", label: t("Todo período") },
                    ]}
                    value={timelinePeriod}
                    onChange={setTimelinePeriod}
                    className="h-[42px]"
                  />
                </div>
              </div>

              {/* TIMELINE LIST (SCROLLABLE) */}
              <div className="relative flex-1 overflow-y-auto overflow-x-hidden pr-4 custom-scrollbar pb-10">
                {/* Linha vertical central */}
                <div className="absolute left-[104px] top-2 bottom-0 w-[2px] bg-[#F1F1F4] border-l border-dashed border-[#D1D5DB]"></div>

                {filteredEvents.map(event => (
                  <div key={event.id} className="relative flex items-start mb-6">
                    {/* Data & Hora */}
                    <div className="w-[104px] pr-5 text-right mt-1 shrink-0 relative z-10">
                      <p className={`text-[12px] font-[600] ${event.isWarning ? 'text-[#F59E0B]' : 'text-[#1A1A2E]'}`}>{event.date}</p>
                      <p className={`text-[11px] font-[500] ${event.isWarning ? 'text-[#D97706]' : 'text-[#6B7280]'}`}>{event.time}</p>
                    </div>
                    {/* Ícone Redondo */}
                    <div className="absolute left-[104px] -ml-[12px] w-[24px] h-[24px] rounded-full bg-white border-2 flex items-center justify-center shadow-sm z-20 mt-1" style={{ borderColor: event.color }}>
                      {event.icon === "edit" && <Edit2 className="w-[10px] h-[10px]" style={{ color: event.color }} strokeWidth={3} />}
                      {event.icon === "check" && <CheckCircle2 className="w-[10px] h-[10px]" style={{ color: event.color }} strokeWidth={3} />}
                      {event.icon === "heart" && <Heart className="w-[10px] h-[10px]" style={{ color: event.color }} strokeWidth={3} />}
                      {event.icon === "alert" && <AlertTriangle className="w-[10px] h-[10px]" style={{ color: event.color }} strokeWidth={3} />}
                    </div>
                    
                    {/* Card Content */}
                    <div className="flex-1 pl-6">
                      <div className={`w-full bg-white border rounded-[10px] p-3 shadow-sm hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow ${event.isWarning ? 'bg-[#FFFBEB] border-[#FDE68A]' : 'border-[#E5E7EB]'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2 py-0.5 rounded-[4px] text-[9px] font-[800] uppercase tracking-wide border" style={{ backgroundColor: event.bgTag, color: event.textTag, borderColor: event.isWarning ? '#FDE68A' : 'transparent' }}>{event.type}</span>
                            <h3 className={`text-[13px] font-[800] ${event.isWarning ? 'text-[#92400E]' : 'text-[#1A1A2E]'}`}>{event.title}</h3>
                          </div>
                          <button className="text-[11px] font-[700] hover:underline shrink-0 ml-2" style={{ color: event.isWarning ? '#B45309' : '#6D28D9' }}>{t("Ver detalhes")}</button>
                        </div>
                        <div className="flex items-start justify-between">
                          <p className={`text-[12px] leading-relaxed max-w-[80%] ${event.isWarning ? 'text-[#B45309]' : 'text-[#4B5563]'}`}>{event.desc}</p>
                          <div className="text-right shrink-0 ml-4">
                            <p className={`text-[11px] font-[700] ${event.isWarning ? 'text-[#92400E]' : 'text-[#374151]'}`}>{event.author}</p>
                            <p className={`text-[10px] font-[500] ${event.isWarning ? 'text-[#B45309]' : 'text-[#9CA3AF]'}`}>{event.authorName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredEvents.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-[#E5E7EB] rounded-[12px] mt-4 bg-[#FAFAFC]">
                    <Search className="w-[24px] h-[24px] text-[#9CA3AF] mb-3" />
                    <p className="text-[14px] font-[700] text-[#1A1A2E]">{t("Nenhum registro encontrado")}</p>
                    <p className="text-[12px] text-[#6B7280] mt-1">Não há dados para o filtro "{activeFilter}".</p>
                  </div>
                )}
              </div>

            </div>

            {/* DIREITA: SIDEBAR DO HISTÓRICO */}
            <div className="w-full xl:w-[300px] shrink-0 flex flex-col gap-5">
              
              {/* Resumo do histórico */}
              <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-5 shadow-sm">
                <h3 className="text-[14px] font-[800] text-[#1A1A2E] mb-4">{t("Resumo do histórico")}</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-3 border-b border-[#F1F1F4]">
                    <div className="flex items-center gap-2 text-[13px] text-[#4B5563]">
                      <FileText className="w-[14px] h-[14px] text-[#9CA3AF]" />
                      {t("Total de registros")}
                    </div>
                    <span className="font-[700] text-[#1A1A2E]">128</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#F1F1F4]">
                    <div className="flex items-center gap-2 text-[13px] text-[#4B5563]">
                      <Edit2 className="w-[14px] h-[14px] text-[#8B5CF6]" />
                      {t("Alterações cadastrais")}
                    </div>
                    <span className="font-[700] text-[#1A1A2E]">18</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#F1F1F4]">
                    <div className="flex items-center gap-2 text-[13px] text-[#4B5563]">
                      <Heart className="w-[14px] h-[14px] text-[#3B82F6]" />
                      {t("Atendimentos")}
                    </div>
                    <span className="font-[700] text-[#1A1A2E]">12</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#F1F1F4]">
                    <div className="flex items-center gap-2 text-[13px] text-[#4B5563]">
                      <CheckCircle2 className="w-[14px] h-[14px] text-[#10B981]" />
                      {t("Presenças")}
                    </div>
                    <span className="font-[700] text-[#1A1A2E]">32</span>
                  </div>
                </div>
                <button onClick={generatePDF} className="mt-4 flex items-center gap-1.5 text-[12px] font-[700] text-[#6D28D9] hover:underline">
                  {t("Ver relatório completo")} <ExternalLink className="w-[12px] h-[12px]" />
                </button>
              </div>

              {/* WhatsApp direto */}
              <a href="https://wa.me/5547999871234" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 p-3 bg-[#25D366] text-white rounded-[10px] hover:bg-[#1EBE5A] transition-colors shadow-sm shadow-[#25D366]/20 cursor-pointer">
                <MessageSquare className="w-[16px] h-[16px]" strokeWidth={2.4} />
                <span className="text-[13px] font-[700]">{t("Conversar no WhatsApp")}</span>
              </a>

              {/* Desativar membro */}
              <button
                onClick={() => { setShowDeactivateModal(true); setDeactivateReason(""); setDeactivateError(false); }}
                disabled={memberDeactivated}
                className={`flex items-center justify-center gap-2.5 p-3 border rounded-[10px] transition-colors text-[13px] font-[700] ${
                  memberDeactivated
                    ? 'bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                    : 'bg-white border-[#FCA5A5] text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer'
                }`}
              >
                <UserX className="w-[16px] h-[16px]" strokeWidth={2.4} />
                {memberDeactivated ? 'Membro desativado' : 'Desativar membro'}
              </button>

            </div>

          </div>



        
          {/* RODAPÉ COPYRIGHT */}
          <div className="mt-[22px] pb-[12px]">
            <p className="text-[14px] text-[#6B7280]">
              {t("COPYRIGHT © 2026")} <span className="font-[700] text-[#6D28D9]">{t("Basiléia")}</span>{t(", Todos os direitos reservados")}
            </p>
          </div>
        </main>
      </div>
      {/* MODAL DE DESATIVAÇÃO */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-6" onClick={() => setShowDeactivateModal(false)}>
          <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[480px] overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB] bg-gradient-to-r from-[#6D28D9]/[0.06] to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#F4EEFF] flex items-center justify-center shadow-sm shadow-[#6D28D9]/10">
                  <UserX className="w-[18px] h-[18px] text-[#6D28D9]" strokeWidth={2.4} />
                </div>
                <div>
                  <h2 className="text-[16px] font-[800] text-[#1A1A2E]">Desativar membro</h2>
                  <p className="text-[12px] text-[#6B7280]">{t("João Pedro Silva")}</p>
                </div>
              </div>
              <button onClick={() => setShowDeactivateModal(false)} className="w-[32px] h-[32px] rounded-[8px] hover:bg-[#F4EEFF] flex items-center justify-center transition-colors">
                <X className="w-[16px] h-[16px] text-[#6B7280]" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="bg-[#F4EEFF] border border-[#DDD6FE] rounded-[10px] p-3 mb-5">
                <p className="text-[12px] text-[#5B21B6] font-[600] leading-relaxed">
                  <strong>{t("Atenção:")}</strong> Esta ação irá desativar o membro do sistema. O registro será mantido no histórico, mas o membro não aparecerá mais nas listagens ativas.
                </p>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[13px] font-[600] text-[#4B5563]">{t("Motivo do desligamento")} <span className="text-[#EF4444] ml-0.5">*</span></label>
                <CustomSelect
                  value={deactivateReason}
                  onChange={(val: string) => { setDeactivateReason(val); if (val) setDeactivateError(false); }}
                  placeholder={t("Selecione um motivo")}
                  searchable={true}
                  className="h-[42px]"
                  options={[
                    { value: "transferencia", label: t("Transferência para outra igreja") },
                    { value: "mudanca", label: t("Mudança de cidade") },
                    { value: "ausencia", label: t("Ausência prolongada") },
                    { value: "pedido_proprio", label: t("Pedido próprio") },
                    { value: "disciplina", label: t("Disciplina eclesiástica") },
                    { value: "falecimento", label: t("Falecimento") },
                    { value: "duplicata", label: t("Inscrição duplicada") },
                    { value: "incompatibilidade", label: t("Incompatibilidade de visão") },
                  ]}
                />
              </div>
              {deactivateError && (
                <p className="text-[11px] font-[600] text-[#EF4444] mt-2">{t("Selecione um motivo para o desligamento.")}</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-[#E5E7EB] bg-[#FAFAFC]">
              <button onClick={() => setShowDeactivateModal(false)} className="px-[20px] py-[10px] text-[13px] font-[600] text-[#6B7280] bg-white border border-[#E5E7EB] rounded-[8px] hover:bg-[#F3F4F6] transition-colors">
                {t("Cancelar")}
              </button>
              <button
                onClick={() => {
                  if (!deactivateReason) { setDeactivateError(true); return; }
                  // 🗺️ MAPA DO TESOURO (BACKEND):
                  // Quando um membro é desativado, o backend DEVE:
                  //   1. Atualizar o status do membro para "Inativo" no banco
                  //   2. 🚫 BLOQUEAR automaticamente TODAS as notificações para este membro
                  //      (WhatsApp, e-mail, push) — setar notificacao = "Inativo"
                  //      Isso inclui: lembretes de culto, avisos de eventos, mensagens da assistente, etc.
                  //   3. Manter o registro no histórico, mas ocultar das listagens ativas
                  //   4. Opcional: notificar o líder da célula sobre a desativação
                  //   5. IMPORTANTE: Ao reativar o membro, as notificações devem voltar ao normal
                  setMemberDeactivated(true);
                  setShowDeactivateModal(false);
                }}
                className="px-[20px] py-[10px] text-[13px] font-[700] text-white bg-[#6D28D9] rounded-[8px] hover:bg-[#5B21B6] transition-colors shadow-sm shadow-[#6D28D9]/20"
              >
                {t("Confirmar desativação")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
