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
      { label: "Contas", icon: Wallet, href: "/contas" },
      { label: "Categorias", icon: Tags, href: "/contabilidade/categorias" },
      { label: "Fornecedores", icon: Building2, href: "/pessoas-e-empresas/fornecedores" },
      { label: "Centros de Custo", icon: Layers, href: "/contabilidade/centros-de-custo" },
    ],
  },
  {
    title: "GESTÃO FINANCEIRA",
    items: [
      { label: "Receitas", icon: ArrowUpCircle, href: "/financeiro/receitas" },
      { label: "Despesas", icon: ArrowDownCircle, href: "/financeiro/despesas" },
      { label: "Transferências", icon: ArrowRightLeft, href: "/financeiro/transferencias" },
      { label: "Compras", icon: ShoppingCart, href: "/compras" },
    ],
  },
  {
    title: "ANÁLISES E CONTÁBIL",
    items: [
      { label: "Relatórios", icon: BarChart3, href: "/contabilidade/relatorios" },
      { label: "Contabilidade", icon: Calculator, href: "/contabilidade/dashboard" },
    ],
  },
  {
    title: "CONFIGURAÇÕES",
    items: [
      { label: "Configurações", icon: Settings, href: "/configuracoes" },
    ],
  }
];
