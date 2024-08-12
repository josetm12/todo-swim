import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = { ...values };
    formData.email.toLowerCase();
    console.log('Clicked Submit', formData);
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
