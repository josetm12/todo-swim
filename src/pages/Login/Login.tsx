import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import authService from '@/services/authService';

import { LoginFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { onLogin } = useAuth();

  const onSubmit = async (values: LoginFormData) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = { ...values };
    formData.email.toLowerCase();
    console.log('Clicked Submit', formData);

    try {
      const userData = await authService.login({
        email: values.email,
        password: values.password,
      });
      onLogin(userData);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>TODO App</CardTitle>
          <CardDescription>
            Login /
            <Button
              variant="link"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Signup
            </Button>
            to use todo app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={onSubmit} isLoading={false} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
