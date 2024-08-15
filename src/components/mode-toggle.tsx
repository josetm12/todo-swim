import { useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const { setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(systemTheme === 'dark');
  const thumbIcon = isChecked ? (
    <Moon className="h-full w-full p-1" />
  ) : (
    <Sun className="h-full w-full p-1" />
  );

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setTheme(isChecked ? 'light' : 'dark');
  };

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={handleToggle}
      thumbIcon={thumbIcon}
    />
  );
}
