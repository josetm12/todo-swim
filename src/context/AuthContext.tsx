import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { User, AuthContextType } from '@/lib/types';
import authService from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onLogin = (userData: User) => {
    setUser(userData);
  };

  const onLogout = () => {
    setUser(null);
  };

  const checkAuth = useCallback(async () => {
    try {
      await authService.getCSRFToken();
      const responseData = await authService.checkAuth();
      const userData: User = {
        id: responseData.id,
        email: responseData.email,
        first_name: responseData.first_name,
        last_name: responseData.last_name,
      };
      setUser(userData);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, onLogin, onLogout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
