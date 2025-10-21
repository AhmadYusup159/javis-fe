import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DarkModeToggle = ({ isDark, setIsDark }) => {
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <Button
      data-testid="dark-mode-toggle"
      onClick={toggleDarkMode}
      variant="outline"
      size="icon"
      className="rounded-full transition-all duration-300 hover:scale-110"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
