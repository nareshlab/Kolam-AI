import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface AccessibilitySettings {
  language: string;
  textSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  translations: Record<string, any>;
}

const defaultSettings: AccessibilitySettings = {
  language: 'en',
  textSize: 'medium',
  highContrast: false,
  reducedMotion: false,
};

// Optimized translation data - memoized to prevent recreations
const translations = {
  en: {
    navigation: {
      home: 'Home',
      scan: 'Scan & Infer',
      generator: 'Generator',
      guide: 'Step Guide',
      metadata: 'Cultural Metadata',
      accessibility: 'Accessibility & Translation',
      bot: 'Kolam Bot'
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    },
    accessibility: {
      title: 'Accessibility & Translation Settings',
      language: 'Language',
      textSize: 'Text Size',
      highContrast: 'High Contrast Mode',
      reducedMotion: 'Reduce Motion',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      extraLarge: 'Extra Large'
    },
    home: {
      title: 'Kolam AI',
      subtitle: 'Create Beautiful Traditional Patterns with AI',
      getStarted: 'Get Started',
      features: 'Features',
      heroTitle: 'Discover the Art of Kolam with AI',
      heroSubtitle: 'Explore traditional South Indian floor art through modern AI technology. Scan, create, and learn about the sacred geometry and cultural significance of Kolam patterns.',
      scanPattern: 'Scan Pattern',
      startCreating: 'Start Creating',
      culturalHeritage: 'Cultural Heritage',
      readyToCreate: 'Ready to Create Your First Kolam?',
      joinThousands: 'Join thousands of artists and cultural enthusiasts in exploring the beautiful world of Kolam patterns.',
      startCreatingNow: 'Start Creating Now',
      learnBasics: 'Learn the Basics'
    },
    features: {
      aiRecognition: 'AI Pattern Recognition',
      aiRecognitionDesc: 'Upload any Kolam image and get instant AI-powered analysis of patterns, cultural significance, and historical context.',
      interactiveGenerator: 'Interactive Pattern Generator',
      interactiveGeneratorDesc: 'Create stunning Kolam patterns with our intuitive tools featuring traditional grids, sacred geometry, and cultural elements.',
      culturalAssistant: 'Cultural Heritage Assistant',
      culturalAssistantDesc: 'Learn about the rich history, regional variations, and spiritual significance of different Kolam traditions.',
      poweredByCultural: 'Powered by Cultural AI Technology',
      experienceIntersection: 'Experience the intersection of ancient wisdom and modern technology in our comprehensive Kolam platform.',
      preservingTradition: 'Preserving Tradition Through Technology',
      kolamIsMore: 'Kolam is more than art—it\'s a living tradition that connects us to our cultural roots and spiritual heritage.',
      regionalVariations: 'Regional Variations',
      regionalVariationsDesc: 'Explore unique styles from Tamil Nadu, Karnataka, Andhra Pradesh, and Kerala.',
      sacredGeometry: 'Sacred Geometry',
      sacredGeometryDesc: 'Understand the mathematical principles and spiritual symbolism in traditional patterns.',
      culturalContext: 'Cultural Context',
      culturalContextDesc: 'Learn about festivals, rituals, and meanings behind different Kolam designs.',
      exploreCultural: 'Explore Cultural Heritage'
    },
    stats: {
      traditionalPatterns: 'Traditional Patterns',
      activeUsers: 'Active Users',
      patternsCreated: 'Patterns Created'
    },
    generator: {
      title: 'Pattern Generator',
      subtitle: 'Create beautiful Kolam patterns with our interactive tools',
      tools: 'Tools',
      canvas: 'Canvas',
      grid: 'Grid',
      clear: 'Clear',
      undo: 'Undo',
      redo: 'Redo',
      export: 'Export',
      save: 'Save Pattern'
    },
    scan: {
      title: 'Scan & Infer',
      subtitle: 'Upload a Kolam image to analyze its patterns and cultural significance',
      uploadImage: 'Upload Image',
      analyzePattern: 'Analyze Pattern',
      results: 'Analysis Results',
      confidence: 'Confidence',
      patternType: 'Pattern Type'
    },
    guide: {
      title: 'Step Guide',
      subtitle: 'Learn to create traditional Kolam patterns step by step',
      selectPattern: 'Select Pattern',
      difficulty: 'Difficulty',
      steps: 'Steps',
      nextStep: 'Next Step',
      prevStep: 'Previous Step',
      basicPulli: 'Basic Pulli Kolam'
    },
    metadata: {
      title: 'Cultural Metadata',
      subtitle: 'Explore the rich cultural heritage and significance of Kolam patterns',
      regions: 'Regions',
      festivals: 'Festivals',
      meanings: 'Meanings',
      history: 'History'
    },
    bot: {
      title: 'Kolam Bot',
      subtitle: 'Ask questions about Kolam patterns, techniques, and cultural significance',
      askQuestion: 'Ask a Question',
      examples: 'Example Questions',
      send: 'Send',
      placeholder: 'Type your question about Kolam...',
      thinking: 'Thinking...',
      welcomeMessage: 'Welcome! I can help you learn about Kolam patterns, cultural significance, and drawing techniques. What would you like to know?'
    }
  },
  ta: {
    navigation: {
      home: 'முகப்பு',
      scan: 'ஸ்கேன் & அனுமான',
      generator: 'உருவாக்கி',
      guide: 'படி வழிகாட்டி',
      metadata: 'கலாச்சார தரவு',
      accessibility: 'அணுகல் & மொழிபெயர்ப்பு',
      bot: 'கோலம் பாட்'
    },
    common: {
      save: 'சேமிக்க',
      cancel: 'ரத்து',
      close: 'மூடு',
      next: 'அடுத்து',
      previous: 'முந்தைய',
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை',
      success: 'வெற்றி'
    },
    home: {
      title: 'கோலம் AI',
      subtitle: 'AI உடன் அழகான பாரம்பரிய வடிவங்களை உருவாக்குங்கள்',
      getStarted: 'தொடங்குங்கள்',
      features: 'அம்சங்கள்',
      heroTitle: 'AI உடன் கோலம் கலையை கண்டறியுங்கள்',
      heroSubtitle: 'நவீன AI தொழில்நுட்பத்தின் மூலம் பாரம்பரிய தென்னிந்திய தரை கலையை ஆராயுங்கள். கோலம் வடிவங்களின் புனித வடிவியல் மற்றும் கலாச்சார முக்கியத்துவத்தை ஸ்கேன் செய்து, உருவாக்கி, கற்றுக்கொள்ளுங்கள்.',
      scanPattern: 'வடிவத்தை ஸ்கேன் செய்யுங்கள்',
      startCreating: 'உருவாக்க தொடங்குங்கள்',
      culturalHeritage: 'கலாச்சார பாரம்பரியம்',
      readyToCreate: 'உங்கள் முதல் கோலத்தை உருவாக்க தயாரா?',
      joinThousands: 'கோலம் வடிவங்களின் அழகான உலகத்தை ஆராயும் ஆயிரக்கணக்கான கலைஞர்கள் மற்றும் கலாச்சார ஆர்வலர்களுடன் சேருங்கள்.',
      startCreatingNow: 'இப்போதே உருவாக்க தொடங்குங்கள்',
      learnBasics: 'அடிப்படைகளை கற்றுக்கொள்ளுங்கள்'
    },
    features: {
      aiRecognition: 'AI வடிவ அங்கீகாரம்',
      aiRecognitionDesc: 'எந்த கோலம் படத்தையும் பதிவேற்றி, வடிவங்கள், கலாச்சார முக்கியத்துவம் மற்றும் வரலாற்று சூழலின் உடனடி AI-இயங்கும் பகுப்பாய்வைப் பெறுங்கள்.',
      interactiveGenerator: 'ஊடாடும் வடிவ உருவாக்கி',
      interactiveGeneratorDesc: 'பாரம்பரிய கட்டங்கள், புனித வடிவியல் மற்றும் கலாச்சார கூறுகளைக் கொண்ட எங்கள் உள்ளுணர்வு கருவிகளுடன் அதிர்ச்சிகரமான கோலம் வடிவங்களை உருவாக்குங்கள்.',
      culturalAssistant: 'கலாச்சார பாரம்பரிய உதவியாளர்',
      culturalAssistantDesc: 'வெவ்வேறு கோலம் பாரம்பரியங்களின் வளமான வரலாறு, பிராந்திய மாறுபாடுகள் மற்றும் ஆன்மீக முக்கியத்துவத்தைப் பற்றி அறியுங்கள்.',
      poweredByCultural: 'கலாச்சார AI தொழில்நுட்பத்தால் இயக்கப்படுகிறது',
      experienceIntersection: 'எங்கள் விரிவான கோலம் தளத்தில் பழங்கால ஞானம் மற்றும் நவீன தொழில்நுட்பத்தின் சந்திப்பை அனுபவிக்கவும்.',
      preservingTradition: 'தொழில்நுட்பத்தின் மூலம் பாரம்பரியத்தைப் பாதுகாத்தல்',
      kolamIsMore: 'கோலம் கலையை விட அதிகம்—இது நம்மை நமது கலாச்சார வேர்கள் மற்றும் ஆன்மீக பாரம்பரியத்துடன் இணைக்கும் ஒரு வாழும் பாரம்பரியம்.',
      regionalVariations: 'பிராந்திய மாறுபாடுகள்',
      regionalVariationsDesc: 'தமிழ்நாடு, கர்நாடகா, ஆந்திர பிரதேசம் மற்றும் கேரளாவில் இருந்து தனித்துவமான பாணிகளை ஆராயுங்கள்.',
      sacredGeometry: 'புனித வடிவியல்',
      sacredGeometryDesc: 'பாரம்பரிய வடிவங்களில் உள்ள கணித கொள்கைகள் மற்றும் ஆன்மீக அடையாளங்களைப் புரிந்துகொள்ளுங்கள்.',
      culturalContext: 'கலாச்சார சூழல்',
      culturalContextDesc: 'வெவ்வேறு கோலம் வடிவமைப்புகளின் பின்னால் உள்ள திருவிழாக்கள், சடங்குகள் மற்றும் அர்த்தங்களைப் பற்றி அறியுங்கள்.',
      exploreCultural: 'கலாச்சார பாரம்பரியத்தை ஆராயுங்கள்'
    },
    stats: {
      traditionalPatterns: 'பாரம்பரிய வடிவங்கள்',
      activeUsers: 'செயலில் உள்ள பயனர்கள்',
      patternsCreated: 'வடிவங்கள் உருவாக்கப்பட்டன'
    }
  }
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load settings from localStorage with error handling
    try {
      const saved = localStorage.getItem('kolam-accessibility-settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (error) {
      console.warn('Failed to load accessibility settings:', error);
      return defaultSettings;
    }
  });

  const updateSettings = useCallback((newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('kolam-accessibility-settings', JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save accessibility settings:', error);
      }
      return updated;
    });
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    settings,
    updateSettings,
    translations
  }), [settings, updateSettings]);

  // Apply accessibility settings to document with throttling
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply text size
    const textSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    };
    root.style.setProperty('--font-size', textSizeMap[settings.textSize]);
    
    // Apply high contrast
    root.classList.toggle('high-contrast', settings.highContrast);
    
    // Apply reduced motion
    root.classList.toggle('reduced-motion', settings.reducedMotion);
    
    // Set language attribute
    document.documentElement.lang = settings.language;
  }, [settings]);

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};