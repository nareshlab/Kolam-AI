import React, { memo, useMemo, useCallback } from 'react';
import { Button } from '../ui/button';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  ScanLine, 
  Grid3X3, 
  BookOpen, 
  Languages, 
  Palette, 
  Accessibility, 
  User,
  GraduationCap,
  Menu,
  LogOut
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = memo(({ currentPage, onPageChange }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];

  const navItems = useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'scan', label: currentLang.navigation?.scan || 'Scan & Infer', icon: ScanLine },
    { id: 'generator', label: currentLang.navigation?.generator || 'Generator', icon: Grid3X3 },
    { id: 'guide', label: currentLang.navigation?.guide || 'Step Guide', icon: BookOpen },
    { id: 'metadata', label: currentLang.navigation?.metadata || 'Cultural Data', icon: Palette },
    { id: 'accessibility', label: currentLang.navigation?.accessibility || 'Settings', icon: Accessibility },
  ], [currentLang]);

  const handleHomeClick = useCallback(() => {
    onPageChange('home');
  }, [onPageChange]);

  const handleLogout = useCallback(() => {
    onPageChange('login');
  }, [onPageChange]);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Clickable for Home */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 rounded-lg p-1 -m-1"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-semibold text-foreground">Kolam AI</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className="flex items-center space-x-2 rounded-xl"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden lg:block">{item.label}</span>
                </Button>
              );
            })}
            
            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 rounded-xl text-muted-foreground hover:text-destructive"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:block">Sign Out</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" aria-label="Open mobile menu">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {navItems.slice(0, 6).map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className="flex flex-col items-center space-y-1 h-auto py-2 rounded-xl"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{item.label.split(' ')[0]}</span>
                </Button>
              );
            })}
          </div>
          {navItems.length > 6 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {navItems.slice(6).map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(item.id)}
                    className="flex flex-col items-center space-y-1 h-auto py-2 rounded-xl"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs">{item.label.split(' ')[0]}</span>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;