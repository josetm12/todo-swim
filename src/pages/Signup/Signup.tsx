import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import SignupForm from './SignupForm';
import { UserData } from '@/lib/types';

const Signup: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (values: UserData) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      const formData = { ...values };
      formData.email.toLowerCase();
      console.log('Submit Register Form', formData);

      try {
        const userData = await authService.register(formData);
        navigate('/login');
        console.log('Signup - ', userData);
      } catch (error) {
        console.error('Login failed:', error);
        setError('ERROR - CHANGE ME');
      }
    },
    [navigate]
  );

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          {error && 'ERROR'}
          <CardTitle className="flex justify-between">
            <span>Sign Up</span>
          </CardTitle>
          <CardDescription>
            <Button
              variant="link"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
            / Sign Up to use the TODO app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm onSubmit={onSubmit} isLoading={false} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
