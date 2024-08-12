import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Error from '@/pages/Error/ErrorSignup/ErrorSignup';
import SignupForm from './SignupForm';

const Signup = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = useCallback(async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    values.email = values.email.toLowerCase();
    console.log('Submit Register Form', values);
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          {error && <Error>{error}</Error>}
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
