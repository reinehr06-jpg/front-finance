import {
  Home,
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowRightLeft,
  BarChart3,
  Building2,
  Tags,
  Wallet,
  Settings,
  HelpCircle,
  Layers,
  UsersRound,
  ShoppingCart,
  Calculator,
  Package,
  FileText,
  Clock,
  Briefcase
} from "lucide-react";

export const navSections = [
  {
    title: "MENU PRINCIPAL",
    items: [
      { label: "Dashboard", icon: Home, href: "/menu/dashboard" },
      { label: "Contas e Extratos", icon: Wallet, isAccordion: true, subItems: [
          { label: "Minhas Contas", href: "/menu/contas" },
          { label: "Nova Conta", href: "/menu/contas/nova-conta" },
          { label: "Histórico e Extratos", href: "/menu/contas/historico" }
      ]}
    ],
  },
  {
    title: "MÓDULO FINANCEIRO",
    items: [
      { label: "Receitas", icon: ArrowUpCircle, href: "/menu/financeiro/receitas" },
      { label: "Despesas", icon: ArrowDownCircle, href: "/menu/financeiro/despesas" },
      { label: "Contas a Pagar", icon: Clock, href: "/menu/financeiro/contas-a-pagar" },
      { label: "Transferências", icon: ArrowRightLeft, href: "/menu/financeiro/transferencias" },
      { label: "Importação OFX", icon: FileText, href: "/menu/financeiro/importacao" },
    ],
  },
  {
    title: "CONTABILIDADE",
    items: [
      { label: "Dashboard Contábil", icon: Calculator, href: "/menu/contabilidade/dashboard" },
      { label: "DRE", icon: BarChart3, href: "/menu/contabilidade/dre" },
      { label: "Categorias", icon: Tags, href: "/menu/contabilidade/categorias" },
      { label: "Centros de Custo", icon: Layers, href: "/menu/contabilidade/centros-de-custo" },
      { label: "Relatórios", icon: FileText, href: "/menu/contabilidade/relatorios" },
    ],
  },
  {
    title: "PESSOAS E COMPRAS",
    items: [
      { label: "Cadastros", icon: UsersRound, isAccordion: true, subItems: [
        { label: "Fornecedores", href: "/menu/pessoas-e-empresas/fornecedores" },
        { label: "Funcionários", href: "/menu/pessoas-e-empresas/funcionarios" },
        { label: "Departamentos", href: "/menu/pessoas-e-empresas/departamentos" }
      ]},
      { label: "Compras", icon: ShoppingCart, href: "/menu/compras" },
    ],
  },
  {
    title: "SISTEMA",
    items: [
      { label: "Configurações", icon: Settings, href: "/menu/configuracoes" },
    ],
  }
];
