import { ISidebarItem } from '../../interfaces/Sidebar';

export const menuItems: ISidebarItem[] = [
  { id: 1, label: 'Dashboard', icon: 'Chart_fill', link: '/dashboard' },
  { id: 2, label: 'Home', link: '/home', icon: 'Chat' },
  { id: 3, label: 'Accounts', link: '', icon: 'User', gap: true },
  { id: 4, label: 'Schedule ', link: '', icon: 'Calendar' },
  { id: 5, label: 'Search', link: '', icon: 'Search' },
  { id: 6, label: 'Analytics', link: '', icon: 'Chart' },
  { id: 7, label: 'Files ', link: '', icon: 'Folder', gap: true },
  { id: 8, label: 'Setting', link: '', icon: 'Setting' },
];
