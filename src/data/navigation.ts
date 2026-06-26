import {
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowRightLeft,
  BarChart3,
  Wallet,
  Settings,
  Layers,
  UsersRound,
  Calculator,
  FileSpreadsheet
} from "lucide-react";

export const navSections = [
  {
    title: "CADASTROS",
    items: [
      {
        label: "Pessoas",
        icon: UsersRound,
        isAccordion: true,
        subItems: [
          { label: "Fornecedores", href: "/cadastros/fornecedores" },
          { label: "Funcionários", href: "/cadastros/funcionarios" },
        ],
      },
      {
        label: "Estrutura",
        icon: Layers,
        isAccordion: true,
        subItems: [
          { label: "Departamentos", href: "/cadastros/departamentos" },
          { label: "Centros de Custo", href: "/cadastros/centros-de-custo" },
        ],
      },
      {
        label: "Financeiro",
        icon: Wallet,
        isAccordion: true,
        subItems: [
          { label: "Contas Bancárias", href: "/cadastros/contas" },
          { label: "Categorias", href: "/cadastros/categorias" },
        ],
      },
    ],
  },
  {
    title: "GESTÃO FINANCEIRA",
    items: [
      {
        label: "Recebimentos",
        icon: ArrowUpCircle,
        isAccordion: true,
        subItems: [
          { label: "Receitas", href: "/gestao-financeira/receitas" },
          { label: "Contas a Receber", href: "/gestao-financeira/contas-a-receber" },
        ],
      },
      {
        label: "Pagamentos",
        icon: ArrowDownCircle,
        isAccordion: true,
        subItems: [
          { label: "Despesas", href: "/gestao-financeira/despesas" },
          { label: "Contas a Pagar", href: "/gestao-financeira/contas-a-pagar" },
          { label: "Compras", href: "/gestao-financeira/compras" },
        ],
      },
      {
        label: "Movimentações",
        icon: ArrowRightLeft,
        isAccordion: true,
        subItems: [
          { label: "Transferências", href: "/gestao-financeira/transferencias" },
          { label: "Conciliação OFX", href: "/gestao-financeira/importacao" },
        ],
      },
    ],
  },
  {
    title: "ANÁLISES E CONTÁBIL",
    items: [
      { label: "Contabilidade", icon: Calculator, href: "/analises-e-contabil/dashboard" },
      {
        label: "Relatórios e DRE",
        icon: BarChart3,
        isAccordion: true,
        subItems: [
          { label: "Relatórios Gerais", href: "/analises-e-contabil/relatorios" },
          { label: "Demonstrativo (DRE)", href: "/analises-e-contabil/dre" },
        ],
      },
    ],
  },
  {
    title: "CONFIGURAÇÕES",
    items: [
      { label: "Configurações", icon: Settings, href: "/configuracoes" },
    ],
  }
];
