// src/layouts/DashboardLayout.tsx
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserPlus,
  Car,
  Calendar,
  ClipboardList,
  DollarSign,
  Settings,
  Menu as MenuIcon,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  User,
  HelpCircle
} from 'lucide-react';
import { Menu, MenuItem, MenuDivider } from '../components/ui/Menu';
import { twMerge } from 'tailwind-merge';
import { useAuthStore } from '../stores/authStore';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: '/dashboard',           label: 'Dashboard',    icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/students',  label: 'Alunos',        icon: <Users           size={20} /> },
    { path: '/dashboard/instructors', label: 'Instrutores', icon: <UserPlus        size={20} /> },
    { path: '/dashboard/vehicles',  label: 'Veículos',      icon: <Car             size={20} /> },
    { path: '/dashboard/schedule',  label: 'Agenda',        icon: <Calendar        size={20} /> },
    { path: '/dashboard/exams',     label: 'Exames',        icon: <ClipboardList   size={20} /> },
    { path: '/dashboard/finance',   label: 'Financeiro',    icon: <DollarSign      size={20} /> },
    { path: '/dashboard/settings',  label: 'Configurações', icon: <Settings        size={20} /> },
    { path: '/dashboard/api',       label: 'API',           icon: <ClipboardList   size={20} /> },
    { path: '/dashboard/support',   label: 'Suporte',       icon: <HelpCircle      size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header
        className={twMerge(
          "bg-white border-b border-gray-200 transition-shadow duration-300 z-10 sticky top-0",
          isScrolled ? "shadow-md" : ""
        )}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <MenuIcon size={24} className="text-gray-600" />
              </button>
              <div className="flex items-center">
                <GraduationCap size={28} className="text-primary-500" />
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  Auto Escola CRM
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 mx-8">
              <div className="max-w-lg w-full relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Buscar alunos, aulas, exames..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Notifications & User Menu */}
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              <Menu
                trigger={
                  <div className="flex items-center ml-4 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User size={16} className="text-primary-600" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                      {user?.name}
                    </span>
                    <ChevronDown size={16} className="ml-1 text-gray-500 hidden md:block" />
                  </div>
                }
                align="right"
                width={220}
              >
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-gray-500">{user?.email}</div>
                </div>
                <MenuDivider />
                <MenuItem icon={<User size={16} />} onClick={() => navigate('/dashboard/settings')}>
                  Minha conta
                </MenuItem>
                <MenuItem icon={<Settings size={16} />} onClick={() => navigate('/dashboard/settings')}>
                  Configurações
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<LogOut size={16} />} onClick={handleLogout}>
                  Sair
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        <nav
          className={twMerge(
            "bg-white border-r border-gray-200 w-64 z-10 shadow-sm",
            "transition-all duration-300 ease-in-out transform",
            "lg:translate-x-0 lg:static lg:h-auto",
            "fixed top-16 bottom-0 left-0 h-[calc(100vh-4rem)]",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="px-4 py-5">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      twMerge(
                        "flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    end={item.path === '/dashboard'}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-0 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
