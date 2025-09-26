import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import { toast } from "sonner@2.0.3";
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  Hand, 
  Type,
  Contrast,
  Download,
  Play,
  Pause,
  Settings,
  Headphones,
  Vibrate,
  ZoomIn,
  Sun,
  Moon,
  VolumeX,
  MousePointer,
  Keyboard,
  Languages,
  Globe,
  Mic,
  BookOpen,
  Users,
  Star,
  CheckCircle,
  Save
} from 'lucide-react';

const AccessibilityPage: React.FC = () => {
  const { settings, updateSettings, translations } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', completed: 100 },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', completed: 95 },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', completed: 90 },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', completed: 75 },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', completed: 80 },
  ];

  const culturalTerms = [
    {
      term: 'Kolam',
      english: 'Kolam',
      tamil: 'கோலம்',
      telugu: 'కోలం',
      hindi: 'कोलम',
      malayalam: 'കോലം',
      meaning: 'Traditional floor art pattern',
      pronunciation: 'ko-lam'
    },
    {
      term: 'Pulli',
      english: 'Dot',
      tamil: 'புள்ளி',
      telugu: 'చుక్క',
      hindi: 'बिंदु',
      malayalam: 'പുള്ളി',
      meaning: 'The dots that form the grid base',
      pronunciation: 'pul-li'
    },
    {
      term: 'Sikku',
      english: 'Interlocked',
      tamil: 'சிக்கு',
      telugu: 'చిక్కు',
      hindi: 'जुड़ा हुआ',
      malayalam: 'ചിക്കു',
      meaning: 'Complex interwoven pattern style',
      pronunciation: 'sik-ku'
    }
  ];

  const accessibilityFeatures = [
    {
      category: 'Visual',
      icon: Eye,
      features: [
        'High contrast mode',
        'Adjustable text size',
        'Color blind friendly palettes',
        'Focus indicators',
        'Reduced motion options',
        'Screen reader optimization'
      ]
    },
    {
      category: 'Audio',
      icon: Volume2,
      features: [
        'Pattern narration',
        'Step-by-step audio guide',
        'Cultural context explanations',
        'Adjustable speech speed',
        'Audio descriptions',
        'Multiple language support'
      ]
    },
    {
      category: 'Language',
      icon: Languages,
      features: [
        'Multi-language interface',
        'Cultural terms dictionary',
        'Regional pronunciation guides',
        'Community translations',
        'Offline language packs',
        'Voice navigation'
      ]
    },
    {
      category: 'Motor',
      icon: MousePointer,
      features: [
        'Keyboard navigation',
        'Large click targets',
        'Gesture alternatives',
        'Voice commands',
        'Sticky keys support',
        'Customizable controls'
      ]
    }
  ];

  const exportFormats = [
    {
      type: 'Braille',
      icon: Hand,
      description: 'Braille descriptions of patterns and instructions',
      formats: ['BRF', 'PEF', 'Text']
    },
    {
      type: '3D Print',
      icon: Hand,
      description: 'Raised tactile patterns for physical exploration',
      formats: ['STL', 'OBJ', 'PLY']
    },
    {
      type: 'Audio',
      icon: Headphones,
      description: 'Complete audio guides and pattern narration',
      formats: ['MP3', 'WAV', 'DAISY']
    },
    {
      type: 'Large Print',
      icon: ZoomIn,
      description: 'High contrast, large text pattern guides',
      formats: ['PDF', 'PNG', 'SVG']
    }
  ];

  const currentLang = translations[settings.language] || translations['en'];
  const selectedLangData = languages.find(lang => lang.code === settings.language);

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!', {
      description: 'Your accessibility and language preferences have been applied globally.'
    });
  };

  const getTranslatedText = (category: string, key: string) => {
    return currentLang[category]?.[key] || key;
  };

  return (
    <div className={`min-h-screen py-8 transition-all duration-300 ${
      settings.highContrast 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-background to-muted/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-4 ${
            settings.highContrast ? 'text-white' : 'text-foreground'
          }`}>
            {getTranslatedText('accessibility', 'title')}
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            settings.highContrast ? 'text-gray-300' : 'text-muted-foreground'
          }`}>
            Inclusive design features that make Kolam art accessible to everyone, with multi-language support and comprehensive accessibility options.
          </p>
        </motion.div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 rounded-xl">
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
            <TabsTrigger value="language" className="rounded-xl">Language</TabsTrigger>
            <TabsTrigger value="features" className="rounded-xl">Features</TabsTrigger>
            <TabsTrigger value="exports" className="rounded-xl">Exports</TabsTrigger>
            <TabsTrigger value="demo" className="rounded-xl">Demo</TabsTrigger>
          </TabsList>

          {/* Accessibility Settings */}
          <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Visual Settings */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className={`rounded-2xl border-0 shadow-lg ${
                  settings.highContrast ? 'bg-gray-900 border-white' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      settings.highContrast ? 'text-white' : ''
                    }`}>
                      <Eye className="w-5 h-5 text-primary" />
                      <span>Visual Accessibility</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* High Contrast */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className={settings.highContrast ? 'text-white' : ''}>
                          {getTranslatedText('accessibility', 'highContrast')}
                        </Label>
                        <p className={`text-sm ${
                          settings.highContrast ? 'text-gray-300' : 'text-muted-foreground'
                        }`}>
                          Enhanced contrast for better visibility
                        </p>
                      </div>
                      <Switch
                        checked={settings.highContrast}
                        onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                      />
                    </div>

                    {/* Text Size */}
                    <div className="space-y-3">
                      <Label className={settings.highContrast ? 'text-white' : ''}>
                        {getTranslatedText('accessibility', 'textSize')}: {getTranslatedText('accessibility', settings.textSize)}
                      </Label>
                      <Select value={settings.textSize} onValueChange={(value: any) => updateSettings({ textSize: value })}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">{getTranslatedText('accessibility', 'small')}</SelectItem>
                          <SelectItem value="medium">{getTranslatedText('accessibility', 'medium')}</SelectItem>
                          <SelectItem value="large">{getTranslatedText('accessibility', 'large')}</SelectItem>
                          <SelectItem value="extra-large">{getTranslatedText('accessibility', 'extraLarge')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reduced Motion */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className={settings.highContrast ? 'text-white' : ''}>
                          {getTranslatedText('accessibility', 'reducedMotion')}
                        </Label>
                        <p className={`text-sm ${
                          settings.highContrast ? 'text-gray-300' : 'text-muted-foreground'
                        }`}>
                          Minimize animations and transitions
                        </p>
                      </div>
                      <Switch
                        checked={settings.reducedMotion}
                        onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Language Settings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <Card className={`rounded-2xl border-0 shadow-lg ${
                  settings.highContrast ? 'bg-gray-900 border-white' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      settings.highContrast ? 'text-white' : ''
                    }`}>
                      <Languages className="w-5 h-5 text-primary" />
                      <span>{getTranslatedText('accessibility', 'language')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className={settings.highContrast ? 'text-white' : ''}>Interface Language</Label>
                      <Select value={settings.language} onValueChange={(value) => updateSettings({ language: value })}>
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
                    {selectedLangData && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-muted/50 rounded-xl p-4"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl">{selectedLangData.flag}</span>
                          <div>
                            <div className="font-medium">{selectedLangData.native}</div>
                            <div className="text-sm text-muted-foreground">{selectedLangData.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Translation Progress</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${selectedLangData.completed}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{selectedLangData.completed}%</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Audio Settings */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <Label className={settings.highContrast ? 'text-white' : ''}>Audio Pronunciation</Label>
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Test
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label className={settings.highContrast ? 'text-white' : ''}>Voice Navigation</Label>
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Mic className="w-4 h-4 mr-2" />
                          Enable
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Settings Button */}
                <Card className={`rounded-2xl border-0 shadow-lg ${
                  settings.highContrast ? 'bg-gray-900 border-white' : ''
                }`}>
                  <CardContent className="pt-6">
                    <Button 
                      onClick={handleSaveSettings}
                      className="w-full rounded-xl"
                      size="lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {getTranslatedText('common', 'save')} Settings
                    </Button>
                    <p className={`text-xs text-center mt-2 ${
                      settings.highContrast ? 'text-gray-400' : 'text-muted-foreground'
                    }`}>
                      Changes apply globally across all pages
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Language & Translation */}
          <TabsContent value="language">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Language Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Live Preview */}
                <Card className={`rounded-2xl border-0 shadow-lg ${
                  settings.highContrast ? 'bg-gray-900 border-white' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      settings.highContrast ? 'text-white' : ''
                    }`}>
                      <Globe className="w-5 h-5 text-primary" />
                      <span>Live Translation Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      key={settings.language}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Header Preview */}
                      <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold">
                          {getTranslatedText('home', 'title')}
                        </h1>
                        <p className="text-muted-foreground">
                          {getTranslatedText('home', 'subtitle')}
                        </p>
                      </div>

                      {/* Sample UI Elements */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-xl p-4">
                          <h3 className="font-medium mb-2">Navigation</h3>
                          <div className="space-y-2 text-sm">
                            <div>🏠 {getTranslatedText('navigation', 'home')}</div>
                            <div>🔍 {getTranslatedText('navigation', 'scan')}</div>
                            <div>🎨 {getTranslatedText('navigation', 'generator')}</div>
                            <div>📚 {getTranslatedText('navigation', 'guide')}</div>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-xl p-4">
                          <h3 className="font-medium mb-2">Actions</h3>
                          <div className="space-y-2">
                            <Button size="sm" className="w-full rounded-xl">
                              {getTranslatedText('home', 'getStarted')}
                            </Button>
                            <Button variant="outline" size="sm" className="w-full rounded-xl">
                              {getTranslatedText('common', 'next')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Cultural Terms Dictionary */}
                <Card className={`rounded-2xl border-0 shadow-lg ${
                  settings.highContrast ? 'bg-gray-900 border-white' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      settings.highContrast ? 'text-white' : ''
                    }`}>
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
                              <span className="text-muted-foreground">Hindi: </span>
                              <span className="font-medium">{term.hindi}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Malayalam: </span>
                              <span className="font-medium">{term.malayalam}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Translation Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <Card className={`rounded-2xl border-0 shadow-lg ${
                  settings.highContrast ? 'bg-gray-900 border-white' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      settings.highContrast ? 'text-white' : ''
                    }`}>
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Translation Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {languages.map((lang, index) => (
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
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className={`rounded-2xl border-0 shadow-lg ${
                  settings.highContrast ? 'bg-gray-900 border-white' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${
                      settings.highContrast ? 'text-white' : ''
                    }`}>
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
            </div>
          </TabsContent>

          {/* Feature Overview */}
          <TabsContent value="features">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {accessibilityFeatures.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`rounded-2xl border-0 shadow-lg h-full ${
                    settings.highContrast ? 'bg-gray-900 border-white' : ''
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${
                        settings.highContrast ? 'text-white' : ''
                      }`}>
                        <category.icon className="w-5 h-5 text-primary" />
                        <span>{category.category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.features.map((feature, i) => (
                          <li key={i} className={`text-sm flex items-start space-x-2 ${
                            settings.highContrast ? 'text-gray-300' : 'text-muted-foreground'
                          }`}>
                            <span className="text-primary">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Export Formats */}
          <TabsContent value="exports">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className={`rounded-2xl border-0 shadow-lg ${
                settings.highContrast ? 'bg-gray-900 border-white' : ''
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${
                    settings.highContrast ? 'text-white' : ''
                  }`}>
                    <Download className="w-5 h-5 text-primary" />
                    <span>Accessible Export Formats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {exportFormats.map((format, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-xl p-6 hover:shadow-lg transition-shadow ${
                          settings.highContrast ? 'border-white bg-gray-800' : 'border-border'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                            <format.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className={`font-medium ${
                              settings.highContrast ? 'text-white' : 'text-foreground'
                            }`}>
                              {format.type} Export
                            </h3>
                            <p className={`text-sm ${
                              settings.highContrast ? 'text-gray-300' : 'text-muted-foreground'
                            }`}>
                              {format.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className={`text-sm font-medium ${
                              settings.highContrast ? 'text-white' : 'text-foreground'
                            }`}>
                              Available Formats:
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {format.formats.map((fmt, i) => (
                                <Badge key={i} variant="outline" className="text-xs rounded-full">
                                  {fmt}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full rounded-xl">
                            <Download className="w-4 h-4 mr-2" />
                            Export {format.type}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Demo & Preview */}
          <TabsContent value="demo">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className={`rounded-2xl border-0 shadow-lg ${
                settings.highContrast ? 'bg-gray-900 border-white' : ''
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${
                    settings.highContrast ? 'text-white' : ''
                  }`}>
                    <Settings className="w-5 h-5 text-primary" />
                    <span>Accessibility Demo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Interactive Demo */}
                  <div className={`rounded-xl p-8 text-center ${
                    settings.highContrast ? 'bg-gray-800 border-white border' : 'bg-muted/30'
                  }`}>
                    <h3 className={`text-xl font-medium mb-4 ${
                      settings.highContrast ? 'text-white' : 'text-foreground'
                    }`}>
                      Sample Kolam Pattern
                    </h3>
                    
                    {/* Demo Pattern Grid */}
                    <div className="w-64 h-64 mx-auto mb-6 relative">
                      <div className="absolute inset-0 grid grid-cols-5 gap-4 p-4">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`w-6 h-6 rounded-full ${
                              settings.highContrast ? 'bg-white' : 'bg-primary'
                            } focus:ring-4 focus:ring-accent`}
                            tabIndex={0}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="rounded-xl"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isPlaying ? 'Pause' : 'Play'} Audio
                      </Button>
                      
                      <Button variant="outline" className="rounded-xl">
                        <Hand className="w-4 h-4 mr-2" />
                        Tactile Mode
                      </Button>
                    </div>
                  </div>

                  {/* Accessibility Checklist */}
                  <div className={`border rounded-xl p-6 ${
                    settings.highContrast ? 'border-white bg-gray-800' : 'border-border'
                  }`}>
                    <h3 className={`font-medium mb-4 ${
                      settings.highContrast ? 'text-white' : 'text-foreground'
                    }`}>
                      Accessibility Features Active
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { feature: 'High Contrast Mode', active: settings.highContrast },
                        { feature: 'Large Text Size', active: settings.textSize !== 'small' },
                        { feature: 'Multi-Language Support', active: settings.language !== 'en' },
                        { feature: 'Reduced Motion', active: settings.reducedMotion },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${
                            item.active ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          <span className={`text-sm ${
                            settings.highContrast ? 'text-gray-300' : 'text-muted-foreground'
                          }`}>
                            {item.feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccessibilityPage;