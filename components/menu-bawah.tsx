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
      icon: "dashboard",
      url: "/dashboard/overview",
    },
    {
      title: 'Super Admin',
      url: '/dashboard/admin',
      icon: 'user2',
    },
    {
      title: 'Inventaris',
      url: '/dashboard/inventaris',
      icon: 'workspace',
    },
    {
      title: 'Ruangan',
      url: '/dashboard/ruangan',
      icon: 'media',
    },
    {
      title: 'Pemeliharaan',
      url: '/dashboard/ipm',
      icon: 'laptop',
    },
  ];

  return (
    <div className="fixed bottom-0">
      <div className="flex flex-col gap-4 md:hidden overflow-auto px-5">
        <ExpandableTabs
          tabs={tabs}
          activeColor="text-primary"
        // className="border-blue-200 dark:border-blue-800"
        />
      </div>
    </div>
  )
}