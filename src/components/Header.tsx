import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="h-header border">
      <nav className="p-2 w-full flex flex-row gap-4 justify-end items-center">
        {!!user && <LogoutButton />}
        <ModeToggle />
      </nav>
    </header>
  );
}

function LogoutButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7">
            <LogOut className="h-full w-full p-1" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
