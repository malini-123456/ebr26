import { Icons } from "./icons";
import { ExpandableTabs } from "./ui/bottom-menu";
import { FileText, HomeIcon, LucideIcon, Mail, SettingsIcon, User } from "lucide-react";

interface Tab {
  title: string;
  icon: keyof typeof Icons;
  type?: never;
  url: string;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}
type TabItem = Tab | Separator;

export default function MenuBawah() {

  const tabs: TabItem[] = [
    {
      title: "Home",
      icon: "home",
      url: "/home",
    },
    {
      title: 'Batch Record',
      url: '/bets',
      icon: 'post',
    },
    {
      title: 'Produk',
      url: '/produk',
      icon: 'product',
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center md:hidden px-5">
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-primary"
      // className="border-blue-200 dark:border-blue-800"
      />
    </div>
  )
}