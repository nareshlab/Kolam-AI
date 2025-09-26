import React, { useState, Suspense, lazy } from 'react';
import Navigation from './components/layout/Navigation';
import FloatingKolamBot from './components/layout/FloatingKolamBot';
import { Toaster } from './components/ui/sonner';
import { AccessibilityProvider } from './components/context/AccessibilityContext';

// Lazy load page components to improve performance
const HomePage = lazy(() => import('./components/pages/HomePage'));
const ScanInferPage = lazy(() => import('./components/pages/ScanInferPage'));
const GeneratorPage = lazy(() => import('./components/pages/GeneratorPage'));
const StepGuidePage = lazy(() => import('./components/pages/StepGuidePage'));
const CulturalMetadataPage = lazy(() => import('./components/pages/CulturalMetadataPage'));
const AccessibilityPage = lazy(() => import('./components/pages/AccessibilityPage'));
const KolamBotPage = lazy(() => import('./components/pages/KolamBotPage'));
const UserDashboard = lazy(() => import('./components/pages/UserDashboard'));
const CoursesPage = lazy(() => import('./components/pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./components/pages/CourseDetailPage'));
const LoginPage = lazy(() => import('./components/pages/LoginPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
      </div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [patternData, setPatternData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  // Load username from localStorage on mount
  React.useEffect(() => {
    const storedUsername = localStorage.getItem('kolamUsername');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handlePageChange = React.useCallback((page: string, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setPatternData(data);
    } else {
      setPatternData(null);
    }
    
    // Handle authentication
    if (page === 'dashboard' && !isAuthenticated) {
      setIsAuthenticated(true);
      const storedUsername = localStorage.getItem('kolamUsername');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
    
    // Handle logout
    if (page === 'login') {
      setIsAuthenticated(false);
      setUsername('');
      localStorage.removeItem('kolamUsername');
    }
  }, [isAuthenticated]);

  const renderCurrentPage = React.useCallback(() => {
    const pageProps = { onPageChange: handlePageChange, username };
    
    switch (currentPage) {
      case 'login':
        return <LoginPage {...pageProps} />;
      case 'home':
        return <HomePage {...pageProps} />;
      case 'scan':
        return <ScanInferPage {...pageProps} />;
      case 'generator':
        return <GeneratorPage preloadedPattern={patternData} username={username} />;
      case 'guide':
        return <StepGuidePage {...pageProps} />;
      case 'metadata':
        return <CulturalMetadataPage patternData={patternData} username={username} />;
      case 'accessibility':
        return <AccessibilityPage username={username} />;
      case 'bot':
        return <KolamBotPage username={username} />;
      case 'dashboard':
        return <UserDashboard {...pageProps} />;
      case 'courses':
        return <CoursesPage {...pageProps} />;
      case 'course-detail':
        return <CourseDetailPage courseData={patternData} onPageChange={handlePageChange} username={username} />;
      default:
        return <LoginPage {...pageProps} />;
    }
  }, [currentPage, patternData, handlePageChange, username]);

  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <div className="min-h-screen bg-background">
          {isAuthenticated && <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />}
          <main>
            <Suspense fallback={<PageLoader />}>
              {renderCurrentPage()}
            </Suspense>
          </main>
          {isAuthenticated && <FloatingKolamBot onPageChange={handlePageChange} />}
          <Toaster />
        </div>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}