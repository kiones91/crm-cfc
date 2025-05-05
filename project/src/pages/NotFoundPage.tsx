import { FileX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/AuthStore';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuthStore();
  const homeRoute = isAuthenticated ? '/dashboard' : '/login';
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-error-50 p-6 rounded-full">
            <FileX size={64} className="text-error-500" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
        </p>
        
        <Link to={homeRoute}>
          <Button variant="primary" size="lg">
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;