import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { motion, AnimatePresence } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import WelcomePopup from '../ui/welcome-popup';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User, 
  Lock, 
  Sparkles,
  ChevronRight,
  Flower,
  Mail,
  UserPlus,
  LogIn
} from 'lucide-react';

interface LoginPageProps {
  onPageChange: (page: string) => void;
}

// Simulated taken usernames for validation
const takenUsernames = ['admin', 'user', 'test', 'kolam', 'demo', 'guest'];

const kolamFacts = [
  {
    id: 1,
    text: "Kolam designs are drawn daily by women in front of their homes to welcome prosperity and ward off evil spirits."
  },
  {
    id: 2,
    text: "The patterns are made with rice flour, symbolizing sharing food with ants and birds as an act of compassion."
  },
  {
    id: 3,
    text: "Kolam designs date back thousands of years and are part of ancient South Indian traditions from the Indus Valley."
  },
  {
    id: 4,
    text: "Different festivals feature unique Kolam patterns that represent spiritual themes and seasonal celebrations."
  },
  {
    id: 5,
    text: "Traditional Kolam patterns follow mathematical principles and sacred geometry found in nature."
  },
  {
    id: 6,
    text: "The art form is passed down from grandmother to granddaughter, preserving cultural knowledge across generations."
  },
  {
    id: 7,
    text: "Kolam patterns are drawn without lifting the hand, symbolizing the continuity and interconnectedness of life."
  },
  {
    id: 8,
    text: "Each region in South India has distinctive Kolam styles - from Tamil Nadu's Pulli to Kerala's Poo Kolam."
  },
  {
    id: 9,
    text: "The early morning ritual of drawing Kolam is considered a form of meditation and spiritual practice."
  },
  {
    id: 10,
    text: "Kolam patterns are temporary art, swept away each day to symbolize the impermanence of beauty and life."
  }
];

const LoginPage: React.FC<LoginPageProps> = ({ onPageChange }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('admin'); // Default to 'admin'
  const [password, setPassword] = useState('admin'); // Default to 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [authenticatedUsername, setAuthenticatedUsername] = useState('');

  // Username validation
  const validateUsername = useCallback((username: string) => {
    if (!username.trim()) {
      setUsernameError('');
      return false;
    }
    
    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      return false;
    }
    
    if (username.length > 20) {
      setUsernameError('Username must be less than 20 characters');
      return false;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return false;
    }
    
    if (takenUsernames.includes(username.toLowerCase())) {
      setUsernameError('This username is already taken. Please choose a different one.');
      return false;
    }
    
    setUsernameError('');
    return true;
  }, []);

  // Handle username change with validation
  const handleUsernameChange = useCallback((value: string) => {
    setUsername(value);
    if (isSignUp && value.trim()) {
      validateUsername(value);
    } else {
      setUsernameError('');
    }
  }, [isSignUp, validateUsername]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (isSignUp) {
      if (!email.trim() || !username.trim() || !password.trim()) {
        setError('Please fill in all fields');
        return;
      }
      
      if (!validateUsername(username)) {
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
    } else {
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password');
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      // Store username for personalization
      setAuthenticatedUsername(username);
      localStorage.setItem('kolamUsername', username);
      
      if (isSignUp) {
        // Show welcome popup for new users
        setShowWelcomePopup(true);
      } else {
        // Direct login - go to dashboard
        onPageChange('dashboard');
      }
      setIsLoading(false);
    }, 1000);
  }, [email, username, password, isSignUp, onPageChange, validateUsername]);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcomePopup(false);
    onPageChange('dashboard');
  }, [onPageChange]);

  const nextFact = useCallback(() => {
    setCurrentFactIndex(prev => (prev + 1) % kolamFacts.length);
  }, []);

  const currentFact = kolamFacts[currentFactIndex];

  // Auto-cycle facts every 15 seconds (reduced from 10 to prevent performance issues)
  useEffect(() => {
    const interval = setInterval(nextFact, 15000);
    return () => clearInterval(interval);
  }, [nextFact]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}
              className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
            >
              <Flower className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Kolam AI
              </h1>
              <p className="text-muted-foreground text-sm">
                Traditional Art, Modern Technology
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto">
            Welcome to your journey through the sacred art of Kolam patterns
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center text-foreground">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </CardTitle>
              <p className="text-center text-muted-foreground">
                {isSignUp 
                  ? 'Join Kolam AI and start your artistic journey' 
                  : 'Enter your credentials to access Kolam AI'
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field (Sign Up Only) */}
                {isSignUp && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="text-foreground flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl border-border/50 focus:border-primary/50 transition-colors"
                      required={isSignUp}
                    />
                  </motion.div>
                )}

                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{isSignUp ? 'Choose a username' : 'Username'}</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={isSignUp ? 'Choose a unique username' : 'Enter your username'}
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    className="rounded-xl border-border/50 focus:border-primary/50 transition-colors"
                    required
                  />
                  {/* Username Error */}
                  <AnimatePresence>
                    {usernameError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm text-destructive">{usernameError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={isSignUp ? 'Create a strong password (min. 6 characters)' : 'Enter your password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl border-border/50 focus:border-primary/50 transition-colors pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Alert variant="destructive" className="rounded-xl">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || (isSignUp && usernameError !== '')}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                      <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Toggle Sign Up/Sign In */}
              <div className="text-center pt-2 space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setUsernameError('');
                    setEmail('');
                    setUsername('admin'); // Reset to default 'admin'
                    setPassword('admin'); // Reset to default 'admin'
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Create one"
                  }
                </Button>
                
                {!isSignUp && (
                  <p className="text-xs text-muted-foreground">
                    Default credentials: admin/admin
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Kolam Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-foreground">
                <Sparkles className="w-5 h-5 text-accent" />
                <span>Did You Know?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Fact Display */}
              <div className="min-h-[3rem] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentFact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-foreground leading-relaxed"
                  >
                    {currentFact.text}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress Indicators */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {kolamFacts.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentFactIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <Button
                  onClick={nextFact}
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:bg-primary/10 hover:border-primary/50 transition-colors group"
                  aria-label="Next fact"
                >
                  <span className="text-xs mr-1">Next</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>

              {/* Fact Counter */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Fact {currentFactIndex + 1} of {kolamFacts.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground"
        >
          <p>© 2024 Kolam AI. Preserving tradition through technology.</p>
        </motion.div>

        {/* Welcome Popup */}
        <WelcomePopup 
          isOpen={showWelcomePopup}
          onClose={handleWelcomeComplete}
          username={authenticatedUsername}
        />
      </div>
    </div>
  );
};

export default LoginPage;