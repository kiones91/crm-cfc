// src/components/ui/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Car,
  Calendar,
  ClipboardList,
  DollarSign,
  Settings,
  GraduationCap
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { path: '/dashboard/students', label: 'Alunos', icon: <Users size={18} /> },
  { path: '/dashboard/instructors', label: 'Instrutores', icon: <UserPlus size={18} /> },
  { path: '/dashboard/vehicles', label: 'Veículos', icon: <Car size={18} /> },
  { path: '/dashboard/schedule', label: 'Agenda', icon: <Calendar size={18} /> },
  { path: '/dashboard/exams', label: 'Exames', icon: <ClipboardList size={18} /> },
  { path: '/dashboard/finance', label: 'Financeiro', icon: <DollarSign size={18} /> },
  { path: '/dashboard/settings', label: 'Configurações', icon: <Settings size={18} /> },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <GraduationCap size={24} className="text-primary-500" />
        <span className="text-lg font-semibold text-gray-800">Auto Escola CRM</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  twMerge(
                    'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
