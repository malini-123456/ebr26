import { NavItem } from "@/types"

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Super Admin',
    url: '/dashboard/admin',
    icon: 'user2',
    isActive: false,
    items: []
  },
  {
    title: 'Inventaris',
    url: '/dashboard/inventaris',
    icon: 'workspace',
    isActive: false,
    items: []
  },
  {
    title: 'Ruangan',
    url: '/dashboard/ruangan',
    icon: 'media',
    isActive: false,
    items: []
  },

  // {
  //   title: 'Teams',
  //   url: '/dashboard/workspaces/team',
  //   icon: 'teams',
  //   isActive: false,
  //   items: [],
  //   // Require organization to be active
  //   access: { requireOrg: true }
  //   // Alternative: require specific permission
  //   // access: { requireOrg: true, permission: 'org:teams:view' }
  // },
  // {
  //   title: 'Product',
  //   url: '/dashboard/product',
  //   icon: 'product',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: []
  // },
  // {
  //   title: 'Kanban',
  //   url: '/dashboard/kanban',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: []
  // },
  // {
  //   title: 'Pemeliharaan',
  //   url:'#',
  //   icon:'laptop',
  //   items: [
  //     {
  //       title: '2025',
  //       url:'/dashboard/appsheet',
  //     },
  //     {
  //       title:'2026',
  //       url:'/dashboard/ipm',
  //     }
  //   ]
  // },
  {
    title: 'Pemeliharaan',
    url: '/dashboard/ipm',
    icon: 'laptop',
    items: []
  },
  {
    title: 'MMEL',
    url: '/dashboard/mmel',
    icon: 'workspace',
    items: []
  }
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'account',
  //   isActive: true,
  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'profile',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Billing',
  //       url: '/dashboard/billing',
  //       icon: 'billing',
  //       shortcut: ['b', 'b'],
  //       // Only show billing if in organization context
  //       access: { requireOrg: true }
  //       // Alternative: require billing management permission
  //       // access: { requireOrg: true, permission: 'org:manage:billing' }
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // }
];
