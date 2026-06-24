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
  Package
} from "lucide-react";

export const navSections = [
  {
    title: "CADASTROS",
    items: [
      { label: "Contas", icon: Wallet, href: "/menu/contas" },
      { label: "Categorias", icon: Tags, href: "/menu/contabilidade/categorias" },
      { label: "Fornecedores", icon: Building2, href: "/menu/pessoas-e-empresas/fornecedores" },
      { label: "Centros de Custo", icon: Layers, href: "/menu/contabilidade/centros-de-custo" },
    ],
  },
  {
    title: "GESTÃO FINANCEIRA",
    items: [
      { label: "Receitas", icon: ArrowUpCircle, href: "/menu/financeiro/receitas" },
      { label: "Despesas", icon: ArrowDownCircle, href: "/menu/financeiro/despesas" },
      { label: "Transferências", icon: ArrowRightLeft, href: "/menu/financeiro/transferencias" },
      { label: "Compras", icon: ShoppingCart, href: "/menu/compras" },
    ],
  },
  {
    title: "ANÁLISES E CONTÁBIL",
    items: [
      { label: "Relatórios", icon: BarChart3, href: "/menu/contabilidade/relatorios" },
      { label: "Contabilidade", icon: Calculator, href: "/menu/contabilidade/dashboard" },
    ],
  },
  {
    title: "CONFIGURAÇÕES",
    items: [
      { label: "Configurações", icon: Settings, href: "/menu/configuracoes" },
    ],
  }
];
