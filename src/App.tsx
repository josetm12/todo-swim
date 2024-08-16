import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import ProtectedRoute from '@/components/ProtectedRoute';

import { Disc3 } from 'lucide-react';
import Home from '@/pages/Home/Home.tsx';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';

import './App.css';
import Header from '@/components/Header';

const queryClient = new QueryClient();

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="main-loading-ct h-full flex flex-row gap-2 items-center justify-center">
        <div className="text-xl">Loading...</div>
        <Disc3 className="animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/home' : '/login'} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" /> : <Signup />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  console.log('App render');
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="h-app-body">
            <AppContent />
          </main>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
