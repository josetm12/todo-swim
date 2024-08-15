export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  onLogin: (userData: User) => void;
  onLogout: () => void;
  checkAuth: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

//TODO types
export interface TodoData {
  title: string;
  status: string;
  is_priority: boolean;
}

export interface ListTodosParams {
  status?: string;
  is_priority?: boolean;
  // Add other possible filter parameters here
}

export interface UpdateTodoParams {
  title?: string;
  status?: string;
  is_priority?: boolean;
}
