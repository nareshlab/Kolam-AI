import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { motion } from 'motion/react';
import { 
  Languages, 
  Globe, 
  Volume2, 
  Download, 
  Settings,
  CheckCircle,
  Mic,
  Type,
  BookOpen,
  Users,
  Star
} from 'lucide-react';

const TranslationPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [textSize, setTextSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', completed: 100 },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', completed: 95 },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', completed: 90 },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', completed: 85 },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', completed: 80 },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', completed: 75 },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', completed: 70 },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', completed: 65 },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', completed: 60 },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', completed: 55 },
  ];

  const culturalTerms = [
    {
      term: 'Kolam',
      english: 'Kolam',
      tamil: 'கோலம்',
      telugu: 'కోలం',
      kannada: 'ಕೋಲಂ',
      meaning: 'Traditional floor art pattern',
      pronunciation: 'ko-lam'
    },
    {
      term: 'Pulli',
      english: 'Dot',
      tamil: 'புள்ளி',
      telugu: 'చుక్క',
      kannada: 'ಚುಕ್ಕಿ',
      meaning: 'The dots that form the grid base',
      pronunciation: 'pul-li'
    },
    {
      term: 'Sikku',
      english: 'Interlocked',
      tamil: 'சிக்கு',
      telugu: 'చిక్కు',
      kannada: 'ಸಿಕ್ಕು',
      meaning: 'Complex interwoven pattern style',
      pronunciation: 'sik-ku'
    },
    {
      term: 'Kambi',
      english: 'Line/Rod',
      tamil: 'கம்பி',
      telugu: 'కంబి',
      kannada: 'ಕಂಬಿ',
      meaning: 'Straight line patterns without curves',
      pronunciation: 'kam-bi'
    }
  ];

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      welcome: {
        en: 'Welcome to Kolam AI',
        ta: 'கோலம் ஏஐ-க்கு வரவேற்கிறோம்',
        te: 'కోలం ఏఐకి స్వాగతం',
        kn: 'ಕೋಲಂ ಎಐಗೆ ಸ್ವಾಗತ',
        ml: 'കോലം എഐയിലേക്ക് സ്വാഗതം'
      },
      subtitle: {
        en: 'Preserve and explore traditional floor art through AI',
        ta: 'ஏஐ மூலம் பாரம்பரிய தரை கலையை பாதுகாத்து ஆராயுங்கள்',
        te: 'ఏఐ ద్వారా సాంప్రదాయ నేల కళను సంరక్షించండి మరియు అన్వేషించండి',
        kn: 'ಎಐ ಮೂಲಕ ಸಾಂಪ್ರದಾಯಿಕ ನೆಲದ ಕಲೆಯನ್ನು ಸಂರಕ್ಷಿಸಿ ಮತ್ತು ಅನ್ವೇಷಿಸಿ',
        ml: 'എഐ വഴി പരമ്പരാഗത നിലം കലയെ സംരക്ഷിക്കുകയും പര്യവേക്ഷണം ചെയ്യുകയും ചെയ്യുക'
      }
    };
    return translations[key]?.[selectedLanguage] || translations[key]?.['en'] || key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Translation & Accessibility
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience Kolam AI in your preferred language with full cultural context 
            and accessibility features for inclusive learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Languages className="w-5 h-5 text-primary" />
                  <span>Language Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interface Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{lang.flag}</span>
                            <div className="flex flex-col">
                              <span className="font-medium">{lang.native}</span>
                              <span className="text-xs text-muted-foreground">{lang.name}</span>
                            </div>
                            <Badge 
                              variant={lang.completed === 100 ? "default" : "secondary"}
                              className="ml-auto text-xs rounded-full"
                            >
                              {lang.completed}%
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Language Info */}
                {selectedLang && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted/50 rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{selectedLang.flag}</span>
                      <div>
                        <div className="font-medium">{selectedLang.native}</div>
                        <div className="text-sm text-muted-foreground">{selectedLang.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Translation Progress</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${selectedLang.completed}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{selectedLang.completed}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Audio Settings */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Audio Pronunciation</label>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Voice Navigation</label>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Mic className="w-4 h-4 mr-2" />
                      Enable
                    </Button>
                  </div>
                </div>

                {/* Accessibility */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="font-medium">Accessibility Options</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text Size</label>
                    <Select value={textSize} onValueChange={setTextSize}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="extra-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">High Contrast</label>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full rounded-xl justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Offline Pack
                </Button>
                <Button variant="outline" className="w-full rounded-xl justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Cultural Guide
                </Button>
                <Button variant="outline" className="w-full rounded-xl justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Community Translations
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Live Preview */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>Live Translation Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  key={selectedLanguage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`space-y-6 ${textSize === 'large' ? 'text-lg' : textSize === 'extra-large' ? 'text-xl' : textSize === 'small' ? 'text-sm' : ''} ${highContrast ? 'bg-black text-white p-6 rounded-xl' : ''}`}
                >
                  {/* Header Preview */}
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">
                      {getTranslatedText('welcome')}
                    </h1>
                    <p className="text-muted-foreground">
                      {getTranslatedText('subtitle')}
                    </p>
                  </div>

                  {/* Sample UI Elements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h3 className="font-medium mb-2">Navigation</h3>
                      <div className="space-y-2 text-sm">
                        <div>🏠 {selectedLanguage === 'ta' ? 'முகப்பு' : selectedLanguage === 'te' ? 'హోమ్' : selectedLanguage === 'kn' ? 'ಮುಖಪುಟ' : 'Home'}</div>
                        <div>🔍 {selectedLanguage === 'ta' ? 'ஸ்கான் மற்றும் அனுமானம்' : selectedLanguage === 'te' ? 'స్కాన్ & అనుమానం' : selectedLanguage === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಅನುಮಾನ' : 'Scan & Infer'}</div>
                        <div>🎨 {selectedLanguage === 'ta' ? 'உருவாக்கி' : selectedLanguage === 'te' ? 'జనరేటర్' : selectedLanguage === 'kn' ? 'ಜನರೇಟರ್' : 'Generator'}</div>
                        <div>📚 {selectedLanguage === 'ta' ? 'படிப்படியான வழிகாட்டி' : selectedLanguage === 'te' ? 'దశల గైడ్' : selectedLanguage === 'kn' ? 'ಹಂತದ ಮಾರ್ಗದರ್ಶಿ' : 'Step Guide'}</div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-4">
                      <h3 className="font-medium mb-2">Actions</h3>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full rounded-xl">
                          {selectedLanguage === 'ta' ? 'உருவாக्रण शुरू करें' : selectedLanguage === 'te' ? 'సృష్టించడం ప్రారంభించండి' : selectedLanguage === 'kn' ? 'ಸೃಷ್ಟಿಸಲು ಪ್ರಾರಂಭಿಸಿ' : 'Start Creating'}
                        </Button>
                        <Button variant="outline" size="sm" className="w-full rounded-xl">
                          {selectedLanguage === 'ta' ? 'और जानें' : selectedLanguage === 'te' ? 'మరింత తెలుసుకోండి' : selectedLanguage === 'kn' ? 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ' : 'Learn More'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Sample Content */}
                  <div className="bg-accent/10 rounded-xl p-4">
                    <h3 className="font-medium mb-2">
                      {selectedLanguage === 'ta' ? 'கலாச்चारى महत्व' : selectedLanguage === 'te' ? 'సాంస్కృतिక మહत్వం' : selectedLanguage === 'kn' ? 'ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ' : 'Cultural Significance'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedLanguage === 'ta' ? 'கோലம் ஒரு பாரम্পर्यक தमिழ कला है जो समृद्ध को आमंत्रित करता है...' : 
                       selectedLanguage === 'te' ? 'కోలం ఒక సాంప్రదాయిక తమిళ కళ, ఇది సంపదను ఆహ్వానిస్తుంది...' :
                       selectedLanguage === 'kn' ? 'ಕೋಲಂ ಒಂದು ಸಾಂಪ್ರದಾಯಿಕ ತಮಿಳು ಕಲೆ, ಇದು ಸಮೃದ್ಧಿಯನ್ನು ಆಹ್ವಾನಿಸುತ್ತದೆ...' :
                       'Kolam is a traditional Tamil art form that invites prosperity and positive energy into homes through sacred geometric patterns...'}
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Cultural Terms Dictionary */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Cultural Terms Dictionary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {culturalTerms.map((term, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-muted/30 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-lg">{term.term}</h4>
                          <p className="text-sm text-muted-foreground">/{term.pronunciation}/</p>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{term.meaning}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tamil: </span>
                          <span className="font-medium">{term.tamil}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Telugu: </span>
                          <span className="font-medium">{term.telugu}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Kannada: </span>
                          <span className="font-medium">{term.kannada}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">English: </span>
                          <span className="font-medium">{term.english}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Translation Status */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Translation Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {languages.slice(0, 6).map((lang, index) => (
                    <div key={lang.code} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{lang.flag}</span>
                        <div>
                          <div className="font-medium text-sm">{lang.native}</div>
                          <div className="text-xs text-muted-foreground">{lang.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              lang.completed === 100 ? 'bg-green-500' : 
                              lang.completed >= 80 ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${lang.completed}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium w-10 text-right">{lang.completed}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-accent/10 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="font-medium text-accent-foreground">Community Contribution</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Help us improve translations and make Kolam AI accessible to more communities. 
                    Join our translation program to contribute in your native language.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 rounded-xl">
                    <Star className="w-4 h-4 mr-2" />
                    Become a Translator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TranslationPage;