import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import exampleImage from 'figma:asset/1ac99dd4beb27ea406a2f5ef2049532ab535a115.png';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Lightbulb,
  Star,
  Timer
} from 'lucide-react';

interface StepGuidePageProps {
  onPageChange?: (page: string, data?: any) => void;
}

const StepGuidePage: React.FC<StepGuidePageProps> = ({ onPageChange }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('pulli-basic');
  const [showHints, setShowHints] = useState(true);

  // Create Basic Pulli Kolam pattern data
  const createBasicPulliKolamPattern = () => {
    return {
      name: 'Basic Pulli Kolam',
      gridSettings: {
        customGrid: true,
        customGridRows: '3,5,7,5,3',
        symmetryType: 'vertical',
        showGrid: true,
        colorScheme: 'traditional'
      },
      drawingHistory: [
        // Center dots
        { type: 'dot', points: [{ x: 300, y: 300 }], color: '#c41e3a', timestamp: 1 },
        
        // Top row dots (3 dots)
        { type: 'dot', points: [{ x: 250, y: 200 }], color: '#c41e3a', timestamp: 2 },
        { type: 'dot', points: [{ x: 300, y: 200 }], color: '#c41e3a', timestamp: 3 },
        { type: 'dot', points: [{ x: 350, y: 200 }], color: '#c41e3a', timestamp: 4 },
        
        // Second row dots (5 dots)
        { type: 'dot', points: [{ x: 200, y: 250 }], color: '#c41e3a', timestamp: 5 },
        { type: 'dot', points: [{ x: 250, y: 250 }], color: '#c41e3a', timestamp: 6 },
        { type: 'dot', points: [{ x: 300, y: 250 }], color: '#c41e3a', timestamp: 7 },
        { type: 'dot', points: [{ x: 350, y: 250 }], color: '#c41e3a', timestamp: 8 },
        { type: 'dot', points: [{ x: 400, y: 250 }], color: '#c41e3a', timestamp: 9 },
        
        // Center row dots (7 dots)
        { type: 'dot', points: [{ x: 150, y: 300 }], color: '#c41e3a', timestamp: 10 },
        { type: 'dot', points: [{ x: 200, y: 300 }], color: '#c41e3a', timestamp: 11 },
        { type: 'dot', points: [{ x: 250, y: 300 }], color: '#c41e3a', timestamp: 12 },
        { type: 'dot', points: [{ x: 350, y: 300 }], color: '#c41e3a', timestamp: 13 },
        { type: 'dot', points: [{ x: 400, y: 300 }], color: '#c41e3a', timestamp: 14 },
        { type: 'dot', points: [{ x: 450, y: 300 }], color: '#c41e3a', timestamp: 15 },
        
        // Fourth row dots (5 dots)
        { type: 'dot', points: [{ x: 200, y: 350 }], color: '#c41e3a', timestamp: 16 },
        { type: 'dot', points: [{ x: 250, y: 350 }], color: '#c41e3a', timestamp: 17 },
        { type: 'dot', points: [{ x: 300, y: 350 }], color: '#c41e3a', timestamp: 18 },
        { type: 'dot', points: [{ x: 350, y: 350 }], color: '#c41e3a', timestamp: 19 },
        { type: 'dot', points: [{ x: 400, y: 350 }], color: '#c41e3a', timestamp: 20 },
        
        // Bottom row dots (3 dots)
        { type: 'dot', points: [{ x: 250, y: 400 }], color: '#c41e3a', timestamp: 21 },
        { type: 'dot', points: [{ x: 300, y: 400 }], color: '#c41e3a', timestamp: 22 },
        { type: 'dot', points: [{ x: 350, y: 400 }], color: '#c41e3a', timestamp: 23 },
        
        // Connecting curves - horizontal loops
        { type: 'curve', points: [
          { x: 250, y: 200 }, { x: 240, y: 190 }, { x: 260, y: 190 }, { x: 300, y: 200 }
        ], color: '#c41e3a', timestamp: 24 },
        { type: 'curve', points: [
          { x: 300, y: 200 }, { x: 310, y: 190 }, { x: 340, y: 190 }, { x: 350, y: 200 }
        ], color: '#c41e3a', timestamp: 25 },
        
        { type: 'curve', points: [
          { x: 200, y: 250 }, { x: 190, y: 240 }, { x: 210, y: 240 }, { x: 250, y: 250 }
        ], color: '#c41e3a', timestamp: 26 },
        { type: 'curve', points: [
          { x: 250, y: 250 }, { x: 240, y: 240 }, { x: 260, y: 240 }, { x: 300, y: 250 }
        ], color: '#c41e3a', timestamp: 27 },
        { type: 'curve', points: [
          { x: 300, y: 250 }, { x: 310, y: 240 }, { x: 340, y: 240 }, { x: 350, y: 250 }
        ], color: '#c41e3a', timestamp: 28 },
        { type: 'curve', points: [
          { x: 350, y: 250 }, { x: 360, y: 240 }, { x: 390, y: 240 }, { x: 400, y: 250 }
        ], color: '#c41e3a', timestamp: 29 },
        
        // Center row loops
        { type: 'curve', points: [
          { x: 150, y: 300 }, { x: 140, y: 290 }, { x: 160, y: 290 }, { x: 200, y: 300 }
        ], color: '#c41e3a', timestamp: 30 },
        { type: 'curve', points: [
          { x: 200, y: 300 }, { x: 190, y: 290 }, { x: 210, y: 290 }, { x: 250, y: 300 }
        ], color: '#c41e3a', timestamp: 31 },
        { type: 'curve', points: [
          { x: 350, y: 300 }, { x: 360, y: 290 }, { x: 390, y: 290 }, { x: 400, y: 300 }
        ], color: '#c41e3a', timestamp: 32 },
        { type: 'curve', points: [
          { x: 400, y: 300 }, { x: 410, y: 290 }, { x: 440, y: 290 }, { x: 450, y: 300 }
        ], color: '#c41e3a', timestamp: 33 },
        
        // Bottom section loops
        { type: 'curve', points: [
          { x: 200, y: 350 }, { x: 190, y: 360 }, { x: 210, y: 360 }, { x: 250, y: 350 }
        ], color: '#c41e3a', timestamp: 34 },
        { type: 'curve', points: [
          { x: 250, y: 350 }, { x: 240, y: 360 }, { x: 260, y: 360 }, { x: 300, y: 350 }
        ], color: '#c41e3a', timestamp: 35 },
        { type: 'curve', points: [
          { x: 300, y: 350 }, { x: 310, y: 360 }, { x: 340, y: 360 }, { x: 350, y: 350 }
        ], color: '#c41e3a', timestamp: 36 },
        { type: 'curve', points: [
          { x: 350, y: 350 }, { x: 360, y: 360 }, { x: 390, y: 360 }, { x: 400, y: 350 }
        ], color: '#c41e3a', timestamp: 37 },
        
        { type: 'curve', points: [
          { x: 250, y: 400 }, { x: 240, y: 410 }, { x: 260, y: 410 }, { x: 300, y: 400 }
        ], color: '#c41e3a', timestamp: 38 },
        { type: 'curve', points: [
          { x: 300, y: 400 }, { x: 310, y: 410 }, { x: 340, y: 410 }, { x: 350, y: 400 }
        ], color: '#c41e3a', timestamp: 39 },
        
        // Vertical connecting curves
        { type: 'curve', points: [
          { x: 250, y: 200 }, { x: 240, y: 225 }, { x: 240, y: 225 }, { x: 250, y: 250 }
        ], color: '#c41e3a', timestamp: 40 },
        { type: 'curve', points: [
          { x: 300, y: 200 }, { x: 290, y: 225 }, { x: 290, y: 225 }, { x: 300, y: 250 }
        ], color: '#c41e3a', timestamp: 41 },
        { type: 'curve', points: [
          { x: 350, y: 200 }, { x: 360, y: 225 }, { x: 360, y: 225 }, { x: 350, y: 250 }
        ], color: '#c41e3a', timestamp: 42 }
      ]
    };
  };

  const patterns = [
    {
      id: 'pulli-basic',
      name: currentLang.guide.basicPulli,
      difficulty: 'Beginner',
      duration: '10 min',
      steps: 8,
      description: 'Learn the fundamental dot-connecting technique'
    },
    {
      id: 'flower-simple',
      name: 'Simple Flower',
      difficulty: 'Beginner',
      duration: '15 min',
      steps: 12,
      description: 'Create a beautiful floral pattern'
    },
    {
      id: 'geometric-star',
      name: 'Geometric Star',
      difficulty: 'Intermediate',
      duration: '25 min',
      steps: 16,
      description: 'Master symmetrical star patterns'
    },
    {
      id: 'traditional-sikku',
      name: 'Traditional Sikku',
      difficulty: 'Advanced',
      duration: '45 min',
      steps: 24,
      description: 'Advanced interlocking pattern technique'
    }
  ];

  const patternSteps = {
    'pulli-basic': [
      {
        title: "Prepare the Surface",
        description: "Clean the floor and sprinkle water to settle dust. Traditional Kolam is drawn on clean, damp ground.",
        hint: "In modern practice, you can use paper or digital canvas",
        duration: 60,
        tools: ["Clean cloth", "Water", "Rice flour"],
        svgPath: "M50,50 Q100,50 100,100 Q100,150 50,150"
      },
      {
        title: "Create Basic Grid",
        description: "Draw a simple 3x3 grid of dots using rice flour. This is the foundation for Pulli Kolam.",
        hint: "Start from the center dot and work outward",
        duration: 90,
        tools: ["Rice flour", "Steady hand"],
        svgPath: "M50,50 L150,50 L150,150 L50,150 Z"
      },
      {
        title: "Connect Corner Dots",
        description: "Begin connecting the corner dots with gentle curved lines.",
        hint: "Keep curves smooth and natural",
        duration: 120,
        tools: ["Continuous motion"],
        svgPath: "M50,50 Q100,75 150,50 Q125,100 150,150 Q100,125 50,150 Q75,100 50,50"
      },
      {
        title: "Form Basic Loops",
        description: "Create loops around each dot to form the characteristic Pulli pattern.",
        hint: "Each dot should be enclosed by the pattern line",
        duration: 180,
        tools: ["Patient practice"],
        svgPath: "M50,50 Q75,25 100,50 Q125,75 150,50 Q175,75 200,100 Q175,125 150,150 Q125,175 100,150 Q75,125 50,100 Q25,75 50,50"
      }
    ],
    'flower-simple': [
      {
        title: "Mark the Center",
        description: "Start by marking the center point where your flower will bloom.",
        hint: "Use a small dot as your reference point",
        duration: 45,
        tools: ["Rice flour", "Finger"],
        svgPath: "M100,100 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0"
      },
      {
        title: "Draw Petal Guidelines",
        description: "Create 8 equally spaced dots around the center to mark where petals will go.",
        hint: "Imagine a clock face - place dots at main positions",
        duration: 75,
        tools: ["Rice flour", "Steady hand"],
        svgPath: "M100,50 M150,100 M100,150 M50,100 M125,75 M125,125 M75,125 M75,75"
      },
      {
        title: "Shape the Petals",
        description: "Draw curved petals connecting the center to each outer dot.",
        hint: "Make petals slightly curved for natural flower appearance",
        duration: 150,
        tools: ["Flowing motion"],
        svgPath: "M100,100 Q110,60 100,50 Q90,60 100,100 Q140,90 150,100 Q140,110 100,100 Q110,140 100,150 Q90,140 100,100 Q60,110 50,100 Q60,90 100,100"
      },
      {
        title: "Add Flower Details",
        description: "Enhance petals with small decorative lines and complete the flower center.",
        hint: "Add small curves inside petals for texture",
        duration: 120,
        tools: ["Fine details"],
        svgPath: "M100,100 Q110,60 100,50 Q90,60 100,100 Q140,90 150,100 Q140,110 100,100 Q110,140 100,150 Q90,140 100,100 Q60,110 50,100 Q60,90 100,100 M100,100 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0"
      }
    ],
    'geometric-star': [
      {
        title: "Create Center Foundation",
        description: "Draw a central square as the foundation for your geometric star pattern.",
        hint: "Keep the square small - it's just the starting point",
        duration: 60,
        tools: ["Rice flour", "Steady hand"],
        svgPath: "M90,90 L110,90 L110,110 L90,110 Z"
      },
      {
        title: "Add Diagonal Points",
        description: "Extend diagonal lines from each corner to create the basic star shape.",
        hint: "Make all diagonal lines equal length",
        duration: 90,
        tools: ["Straight lines"],
        svgPath: "M90,90 L110,90 L110,110 L90,110 Z M100,50 L100,150 M50,100 L150,100 M70,70 L130,130 M130,70 L70,130"
      },
      {
        title: "Form Star Points",
        description: "Connect the diagonal endpoints to form the characteristic 8-pointed star.",
        hint: "Work systematically around the star",
        duration: 180,
        tools: ["Precision"],
        svgPath: "M100,50 L115,75 L150,100 L115,125 L100,150 L85,125 L50,100 L85,75 Z"
      },
      {
        title: "Add Geometric Details",
        description: "Enhance the star with internal geometric patterns and symmetrical details.",
        hint: "Mirror each element across all axes",
        duration: 240,
        tools: ["Symmetrical thinking"],
        svgPath: "M100,50 L115,75 L150,100 L115,125 L100,150 L85,125 L50,100 L85,75 Z M80,80 L120,80 L120,120 L80,120 Z M100,70 L100,130 M70,100 L130,100"
      }
    ],
    'traditional-sikku': [
      {
        title: "Layout Dot Matrix",
        description: "Create an extensive grid of dots - typically 7x7 or larger for Sikku patterns.",
        hint: "Precision in dot placement is crucial for Sikku",
        duration: 120,
        tools: ["Rice flour", "Patience"],
        svgPath: "M40,40 M80,40 M120,40 M160,40 M40,80 M80,80 M120,80 M160,80 M40,120 M80,120 M120,120 M160,120 M40,160 M80,160 M120,160 M160,160"
      },
      {
        title: "Begin Interlocking",
        description: "Start the complex interlocking pattern from one corner, ensuring no dot is left unenclosed.",
        hint: "Plan your path - Sikku requires strategic thinking",
        duration: 200,
        tools: ["Strategy", "Steady hand"],
        svgPath: "M40,40 Q60,20 80,40 Q100,60 120,40 Q140,20 160,40"
      },
      {
        title: "Create Loop Chains",
        description: "Form interconnected loops that weave through the dot matrix.",
        hint: "Each loop must connect smoothly to the next",
        duration: 300,
        tools: ["Flow", "Concentration"],
        svgPath: "M40,40 Q60,20 80,40 Q60,60 40,80 Q20,60 40,40 M80,40 Q100,20 120,40 Q100,60 80,80 Q60,60 80,40"
      },
      {
        title: "Complete the Sikku",
        description: "Finish the intricate pattern ensuring all loops are connected and no loose ends remain.",
        hint: "A true Sikku should be one continuous line",
        duration: 240,
        tools: ["Persistence", "Precision"],
        svgPath: "M40,40 Q60,20 80,40 Q100,20 120,40 Q140,20 160,40 Q180,60 160,80 Q140,100 120,80 Q100,100 80,80 Q60,100 40,80 Q20,60 40,40 M40,80 Q60,60 80,80 Q100,60 120,80 Q140,60 160,80 Q180,100 160,120 Q140,140 120,120 Q100,140 80,120 Q60,140 40,120 Q20,100 40,80"
      }
    ]
  };
  
  const stepData = patternSteps[selectedPattern] || patternSteps['pulli-basic'];

  const currentStepData = stepData[currentStep];
  const totalSteps = stepData.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < totalSteps - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
      }, 3000);
    } else if (currentStep >= totalSteps - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, totalSteps]);

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const resetTutorial = () => {
    setCurrentStep(0);
    setIsPlaying(false);
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
            {currentLang.guide.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentLang.guide.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Pattern Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Choose Pattern</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patterns.map((pattern) => (
                  <motion.div
                    key={pattern.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedPattern === pattern.id ? "default" : "outline"}
                      className="w-full justify-start rounded-xl h-auto p-4 overflow-hidden"
                      onClick={() => {
                        if (pattern.id === 'pulli-basic' && onPageChange) {
                          // Generate Basic Pulli Kolam and navigate to Generator
                          const patternData = createBasicPulliKolamPattern();
                          onPageChange('generator', patternData);
                        } else {
                          setSelectedPattern(pattern.id);
                          resetTutorial();
                        }
                      }}
                    >
                      <div className="text-left w-full min-w-0">
                        <div className="flex items-start justify-between mb-1 gap-2">
                          <span className="font-medium text-wrap break-words leading-tight flex-1">{pattern.name}</span>
                          <Badge 
                            variant="secondary" 
                            className="text-xs rounded-full flex-shrink-0"
                          >
                            {pattern.difficulty}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground leading-tight">
                          {pattern.duration} • {pattern.steps} steps
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 text-wrap break-words leading-tight">
                          {pattern.description}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Tutorial Controls */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-primary" />
                  <span>Tutorial Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="rounded-xl"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={currentStep >= totalSteps - 1}
                    className="rounded-xl px-6"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={nextStep}
                    disabled={currentStep >= totalSteps - 1}
                    className="rounded-xl"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  onClick={resetTutorial}
                  className="w-full rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Tutorial
                </Button>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Settings */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show Hints</label>
                    <input
                      type="checkbox"
                      checked={showHints}
                      onChange={(e) => setShowHints(e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Tutorial Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border-0 shadow-lg h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Circle className="w-5 h-5 text-primary" />
                    <span>Step {currentStep + 1}: {currentStepData.title}</span>
                  </CardTitle>
                  <Badge variant="outline" className="rounded-full">
                    <Timer className="w-3 h-3 mr-1" />
                    {currentStepData.duration}s
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Animation Area */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-white to-muted/30 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        {/* Animated Pattern Preview */}
                        <div className="w-64 h-64 mx-auto mb-4 relative">
                          {/* Pattern-specific grid dots */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {selectedPattern === 'pulli-basic' && (
                              <div className="grid grid-cols-3 gap-8">
                                {Array.from({ length: 9 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-3 h-3 bg-primary rounded-full"
                                  />
                                ))}
                              </div>
                            )}
                            
                            {selectedPattern === 'flower-simple' && (
                              <div className="relative w-32 h-32">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
                                />
                                {Array.from({ length: 8 }).map((_, i) => {
                                  const angle = (i * Math.PI * 2) / 8;
                                  const x = Math.cos(angle) * 48;
                                  const y = Math.sin(angle) * 48;
                                  return (
                                    <motion.div
                                      key={i}
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: (i + 1) * 0.1 }}
                                      className="absolute w-2 h-2 bg-accent rounded-full"
                                      style={{ 
                                        left: `calc(50% + ${x}px)`, 
                                        top: `calc(50% + ${y}px)`,
                                        transform: 'translate(-50%, -50%)'
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            )}
                            
                            {selectedPattern === 'geometric-star' && (
                              <div className="grid grid-cols-5 gap-4">
                                {Array.from({ length: 25 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="w-2 h-2 bg-secondary rounded-full"
                                  />
                                ))}
                              </div>
                            )}
                            
                            {selectedPattern === 'traditional-sikku' && (
                              <div className="grid grid-cols-7 gap-2">
                                {Array.from({ length: 49 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="w-1.5 h-1.5 bg-primary rounded-full"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Pattern lines */}
                          <motion.svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 200 200"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: (currentStep + 1) / totalSteps }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          >
                            <motion.path
                              d={currentStepData.svgPath}
                              stroke="#c41e3a"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </motion.svg>
                        </div>

                        <h3 className="text-lg font-medium text-foreground mb-2">
                          {currentStepData.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Step {currentStep + 1} of {totalSteps}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Step completion indicator */}
                  <div className="absolute top-4 right-4">
                    {currentStep === totalSteps - 1 ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {currentStep + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Example Pattern Reference */}
                  {selectedPattern === 'pulli-basic' && (
                    <div className="absolute bottom-4 left-4">
                      <img 
                        src={exampleImage} 
                        alt="Kolam pattern reference" 
                        className="w-16 h-16 rounded-lg border-2 border-white shadow-md object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Step Description */}
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-foreground leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </div>

                  {/* Tools needed */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground flex items-center">
                      <Star className="w-4 h-4 mr-2 text-accent" />
                      Tools & Materials
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStepData.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="rounded-full">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="rounded-xl"
                    >
                      Previous Step
                    </Button>
                    
                    {currentStep < totalSteps - 1 ? (
                      <Button 
                        onClick={nextStep}
                        className="rounded-xl"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        variant="default"
                        className="rounded-xl bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Complete!
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step Details & Hints */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Current Step Details */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Step Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-medium">{currentStepData.duration} seconds</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Difficulty</div>
                    <Badge variant="secondary" className="rounded-full">
                      {patterns.find(p => p.id === selectedPattern)?.difficulty}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Focus Area</div>
                    <div className="font-medium">{currentStepData.title}</div>
                  </div>
                </div>

                {showHints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-accent/10 rounded-xl p-4"
                  >
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-accent-foreground text-sm mb-1">
                          Pro Tip
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {currentStepData.hint}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stepData.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        index === currentStep ? 'bg-primary/10' : 
                        index < currentStep ? 'bg-green-50' : 'bg-muted/30'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        index < currentStep ? 'bg-green-500 text-white' :
                        index === currentStep ? 'bg-primary text-white' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {step.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StepGuidePage;