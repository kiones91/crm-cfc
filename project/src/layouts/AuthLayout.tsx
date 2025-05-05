import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Auto Escola CRM</h1>
          <p className="text-gray-600 mt-2">Gestão completa para sua auto escola</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <Outlet />
        </div>
        
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Auto Escola CRM. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;