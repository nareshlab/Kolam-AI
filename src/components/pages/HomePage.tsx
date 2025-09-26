import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  ArrowRight, 
  Sparkles, 
  Grid3X3, 
  ScanLine, 
  MessageCircle,
  Star,
  Users,
  Zap
} from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string, data?: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];

  const features = [
    {
      icon: ScanLine,
      title: currentLang.features.aiRecognition,
      description: currentLang.features.aiRecognitionDesc,
      color: "bg-primary"
    },
    {
      icon: Grid3X3,
      title: currentLang.features.interactiveGenerator,
      description: currentLang.features.interactiveGeneratorDesc,
      color: "bg-secondary"
    },
    {
      icon: MessageCircle,
      title: currentLang.features.culturalAssistant,
      description: currentLang.features.culturalAssistantDesc,
      color: "bg-accent"
    }
  ];

  const stats = [
    { icon: Star, label: currentLang.stats.traditionalPatterns, value: "500+" },
    { icon: Users, label: currentLang.stats.activeUsers, value: "10K+" },
    { icon: Zap, label: currentLang.stats.patternsCreated, value: "50K+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Cultural Heritage
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {currentLang.home.heroTitle}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {currentLang.home.heroSubtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => onPageChange('generator')}
                  className="group rounded-xl px-8 py-6 text-lg"
                >
                  {currentLang.home.getStarted}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onPageChange('scan')}
                  className="rounded-xl px-8 py-6 text-lg"
                >
                  <ScanLine className="w-5 h-5 mr-2" />
                  {currentLang.home.scanPattern}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-2">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="font-bold text-2xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSws8WsPCCsaGNJwGplz4Pb1_U3sapgbHHidPVw1ruYFvs8dHp2aW2Hk17_mXxTRCSOLmQ&usqp=CAU"
                  alt="Traditional Kolam Pattern"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>

              {/* Floating Animation Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full shadow-lg flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-accent-foreground" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary rounded-full shadow-lg flex items-center justify-center"
              >
                <Grid3X3 className="w-6 h-6 text-secondary-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4-xl font-bold text-foreground mb-4">
              {currentLang.features.poweredByCultural}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {currentLang.features.experienceIntersection}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm rounded-2xl">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cultural Heritage Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1703145219083-6037d97decb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGFydCUyMHBhdHRlcm58ZW58MXx8fHwxNzU3MTU1OTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Traditional Indian Art"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <Badge variant="outline" className="mb-4 rounded-full">
                  {currentLang.home.culturalHeritage}
                </Badge>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  {currentLang.features.preservingTradition}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentLang.features.kolamIsMore}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                  <div>
                    <p className="font-medium text-foreground">{currentLang.features.regionalVariations}</p>
                    <p className="text-muted-foreground">{currentLang.features.regionalVariationsDesc}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-3"></div>
                  <div>
                    <p className="font-medium text-foreground">{currentLang.features.sacredGeometry}</p>
                    <p className="text-muted-foreground">{currentLang.features.sacredGeometryDesc}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3"></div>
                  <div>
                    <p className="font-medium text-foreground">{currentLang.features.culturalContext}</p>
                    <p className="text-muted-foreground">{currentLang.features.culturalContextDesc}</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => onPageChange('metadata')}
                className="rounded-xl"
              >
                {currentLang.features.exploreCultural}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary via-secondary to-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              {currentLang.home.readyToCreate}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {currentLang.home.joinThousands}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => onPageChange('generator')}
                className="rounded-xl px-8 py-6 text-lg"
              >
                {currentLang.home.startCreatingNow}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onPageChange('guide')}
                className="rounded-xl px-8 py-6 text-lg bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {currentLang.home.learnBasics}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;