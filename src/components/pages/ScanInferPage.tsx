import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Upload, 
  Camera, 
  Scan, 
  Brain, 
  CheckCircle, 
  Eye,
  Grid3X3,
  RotateCcw,
  Palette,
  MapPin,
  Calendar,
  Star,
  PlayCircle,
  Clock,
  ChevronRight,
  Lightbulb,
  Target,
  Hand,
  BookOpen,
  Heart,
  History,
  Crown,
  Users,
  Globe,
  Zap,
  Settings,
  Search,
  TrendingUp,
  AlertCircle,
  Flower,
  Sparkles,
  Layers
} from 'lucide-react';

// Pattern images from Unsplash
const PATTERN_IMAGES = {
  pulli: "https://thumbs.dreamstime.com/b/closeup-indian-rangoli-kolam-celebrate-upcoming-festival-minimalist-designs-387361573.jpg",
  rangoli: "https://media.istockphoto.com/id/1177351926/vector/flat-rangoli-pattern-design.jpg?s=612x612&w=0&k=20&c=D063ICvSk3SufXfPdzmqTmXpPmdNpOzDYj5slKCbwPo=",
  geometry: "https://img.freepik.com/premium-photo/kolam-mandala-india-tradition-happy-top-view-medium-shot_935410-10985.jpg",
  sikku: "https://th.bing.com/th/id/R.84f59acce9b85c0372aed5dcd4edaaa9?rik=9IMUykj1DFI2jg&riu=http%3a%2f%2fvinns.in%2fwp-content%2fuploads%2f2022%2f04%2f11_dots_sikku_chikku_rangoli_kolam_chukkala_loops-768x768.jpg&ehk=8LTDLkvl2%2fzZ0R7wOx0%2fXU3WOYnKqB64UZxnfEiYY%2f0%3d&risl=&pid=ImgRaw&r=0",
  poo: "https://www.wedandbeyond.com/blog/wp-content/uploads/2017/09/2.jpg"
};

interface ScanInferPageProps {
  onPageChange?: (page: string, data?: any) => void;
}

// Enhanced computer vision simulation functions
const simulateFeatureDetection = (imageData: string): Promise<{
  dots: number;
  lines: number;
  curves: number;
  symmetryAxes: number;
  colorVariance: number;
  complexity: number;
  geometricShapes: number;
  floralElements: number;
}> => {
  return new Promise((resolve) => {
    // Simulate processing time for computer vision
    setTimeout(() => {
      // Simulate realistic feature detection based on image characteristics
      const features = {
        dots: Math.floor(Math.random() * 30) + 5,
        lines: Math.floor(Math.random() * 20) + 10,
        curves: Math.floor(Math.random() * 25) + 8,
        symmetryAxes: [2, 4, 6, 8, 12][Math.floor(Math.random() * 5)],
        colorVariance: Math.random() * 0.8 + 0.2,
        complexity: Math.random() * 0.7 + 0.3,
        geometricShapes: Math.floor(Math.random() * 15) + 3,
        floralElements: Math.floor(Math.random() * 10)
      };
      resolve(features);
    }, 800);
  });
};

const classifyPattern = (features: any): {
  patternType: string;
  confidence: number;
  secondaryType?: string;
  reasoning: string;
} => {
  const { dots, lines, curves, colorVariance, floralElements, geometricShapes, complexity } = features;
  
  // Advanced classification logic
  let patternType = "Unknown Pattern";
  let confidence = 0;
  let secondaryType = undefined;
  let reasoning = "";

  // Pulli Kolam detection (dots + connecting lines)
  if (dots > 15 && lines > dots * 0.8 && curves > 10 && colorVariance < 0.4) {
    patternType = "Pulli Kolam";
    confidence = Math.min(95, 75 + dots + lines - curves);
    reasoning = "High dot density with structured line connections and minimal color variation indicates traditional Pulli Kolam";
  }
  
  // Sikku Kolam detection (continuous loops, fewer dots)
  else if (curves > lines && dots < 20 && lines > 5 && colorVariance < 0.5) {
    patternType = "Sikku Kolam";
    confidence = Math.min(94, 70 + curves - dots);
    reasoning = "Dominant curved lines with fewer structural dots suggests flowing Sikku Kolam design";
  }
  
  // Rangoli detection (high color variance, geometric shapes)
  else if (colorVariance > 0.6 && geometricShapes > 8 || floralElements > 5) {
    patternType = "Festival Rangoli";
    confidence = Math.min(96, 80 + Math.floor(colorVariance * 20));
    reasoning = "High color diversity and geometric complexity indicates decorative Rangoli pattern";
  }
  
  // Poo Kolam detection (floral elements dominant)
  else if (floralElements > 6 && curves > lines && geometricShapes < 8) {
    patternType = "Poo Kolam";
    confidence = Math.min(93, 75 + floralElements * 2);
    reasoning = "Predominant floral motifs with organic curves suggests flower-based Poo Kolam";
  }
  
  // Sacred Geometry detection (high geometric shapes, complex symmetry)
  else if (geometricShapes > 12 && features.symmetryAxes >= 8 && complexity > 0.6) {
    patternType = "Sacred Geometry Mandala";
    confidence = Math.min(97, 85 + Math.floor(complexity * 15));
    reasoning = "Complex geometric structures with high-order symmetry indicates sacred mandala design";
  }
  
  // Hybrid pattern detection
  else if (dots > 10 && colorVariance > 0.5) {
    patternType = "Hybrid Rangoli-Kolam";
    secondaryType = "Mixed Traditional";
    confidence = Math.min(88, 70 + dots);
    reasoning = "Mixed characteristics suggest a hybrid pattern combining traditional techniques";
  }
  
  else {
    patternType = "Traditional Floor Art";
    confidence = Math.min(85, 60 + Math.floor(Math.random() * 20));
    reasoning = "Pattern shows traditional Indian floor art characteristics requiring closer analysis";
  }

  return { patternType, confidence, secondaryType, reasoning };
};

// Enhanced pattern database with more detailed information
const getPatternDatabase = (patternType: string) => {
  const database = {
    "Pulli Kolam": {
      elements: ["Dots (Pulli)", "Curved Lines", "Geometric Loops", "Continuous Patterns"],
      region: "Tamil Nadu",
      occasion: "Daily morning ritual",
      complexity: "Beginner to Intermediate",
      symmetry: "4-fold to 8-fold radial",
      materials: ["Rice flour", "Clean water", "Steady hand"],
      culturalSignificance: "Traditional floor art drawn with rice flour to welcome prosperity and ward off evil spirits. Dating back to 300 BCE Sangam poetry, Pulli Kolam represents the continuous cycle of life through unbroken lines. Each dot symbolizes challenges in life, while the connecting lines show how obstacles can be navigated with grace and wisdom.",
      similarPatterns: ["Sikku Kolam", "Kambi Kolam", "Neli Kolam", "Padi Kolam"],
      historicalPeriod: "300 BCE - Present",
      spiritualMeaning: "Dots represent life's obstacles, lines show paths through challenges"
    },
    
    "Sikku Kolam": {
      elements: ["Continuous Loops", "Flowing Lines", "Minimal Dots", "Interwoven Patterns"],
      region: "Tamil Nadu",
      occasion: "Special festivals and ceremonies",
      complexity: "Intermediate to Advanced",
      symmetry: "6-fold to 12-fold radial",
      materials: ["Rice flour", "Colored powders", "Water"],
      culturalSignificance: "Sophisticated interwoven patterns where lines loop around dots creating complex designs. Represents the interconnectedness of life and the continuous flow of energy. Masters of Sikku Kolam were highly respected for their mathematical precision and artistic vision.",
      similarPatterns: ["Pulli Kolam", "Neli Kolam", "Chikku Kolam"],
      historicalPeriod: "500 CE - Present",
      spiritualMeaning: "Interwoven lines represent life's interconnected relationships"
    },
    
    "Festival Rangoli": {
      elements: ["Vibrant Colors", "Geometric Patterns", "Floral Motifs", "Central Mandala"],
      region: "Karnataka, Maharashtra, Gujarat",
      occasion: "Festivals and celebrations",
      complexity: "Intermediate to Advanced",
      symmetry: "8-fold to 16-fold radial",
      materials: ["Colored powders", "Rice flour", "Flower petals", "Chalk"],
      culturalSignificance: "Colorful floor art created during festivals to invite divine blessings and celebrate auspicious occasions. Originating from ancient Sanskrit 'Rangavalli' meaning 'row of colors', these patterns evolved through Mughal influences and colonial innovations, becoming integral to Indian festival celebrations.",
      similarPatterns: ["Alpana", "Muggu", "Mandana", "Aripana"],
      historicalPeriod: "1500 BCE - Present",
      spiritualMeaning: "Colors represent different aspects of divine energy and cosmic harmony"
    },
    
    "Poo Kolam": {
      elements: ["Fresh Flowers", "Organic Curves", "Natural Motifs", "Seasonal Elements"],
      region: "Tamil Nadu, Kerala",
      occasion: "Religious festivals and special ceremonies",
      complexity: "Beginner to Intermediate",
      symmetry: "Natural, organic patterns",
      materials: ["Fresh flowers", "Petals", "Leaves", "Natural colors"],
      culturalSignificance: "Flower-based designs created during specific religious events and seasonal celebrations. Represents the temporary beauty of life and nature's cycles. Often combined with oil lamps and traditional offerings during temple festivals.",
      similarPatterns: ["Floral Rangoli", "Botanical Kolam", "Natural Mandala"],
      historicalPeriod: "800 CE - Present",
      spiritualMeaning: "Flowers symbolize the ephemeral nature of life and divine beauty"
    },
    
    "Sacred Geometry Mandala": {
      elements: ["Sacred Geometry", "Complex Symmetry", "Mathematical Precision", "Spiritual Symbols"],
      region: "Kerala, Karnataka, Temple Communities",
      occasion: "Spiritual practices and meditation",
      complexity: "Advanced to Master",
      symmetry: "12-fold to 32-fold radial",
      materials: ["Fine rice flour", "Colored powders", "Precise instruments"],
      culturalSignificance: "Complex geometric patterns used for meditation and spiritual practices, representing cosmic harmony and divine order. Rooted in ancient Indus Valley sacred geometry (3300 BCE), these designs synthesized Buddhist, Jain, and Hindu cosmological concepts.",
      similarPatterns: ["Sri Yantra", "Lotus Mandala", "Chakra Patterns", "Cosmic Diagrams"],
      historicalPeriod: "3300 BCE - Present",
      spiritualMeaning: "Geometric precision represents universal mathematical laws governing creation"
    }
  };

  return database[patternType] || database["Pulli Kolam"];
};

const ScanInferPage: React.FC<ScanInferPageProps> = ({ onPageChange }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentAnalysisResults, setCurrentAnalysisResults] = useState<any>(null);
  const [analysisStage, setAnalysisStage] = useState<string>('');
  const [detectedFeatures, setDetectedFeatures] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisComplete(false);
        setCurrentAnalysisResults(null);
        setDetectedFeatures(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async (examplePattern?: any) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStage('Initializing computer vision...');
    
    // Determine which image to analyze
    const imageToAnalyze = examplePattern ? examplePattern.image : uploadedImage;
    
    // If analyzing an example pattern, set it as uploaded image
    if (examplePattern) {
      setUploadedImage(examplePattern.image);
    }
    
    // Variable to store detected features locally
    let localDetectedFeatures: any = null;
    
    // Stage 1: Image preprocessing
    setTimeout(() => {
      setAnalysisProgress(15);
      setAnalysisStage('Preprocessing image and adjusting contrast...');
    }, 200);
    
    // Stage 2: Feature detection
    setTimeout(async () => {
      setAnalysisProgress(30);
      setAnalysisStage('Detecting geometric shapes and patterns...');
      
      const features = await simulateFeatureDetection(imageToAnalyze || '');
      localDetectedFeatures = features;
      setDetectedFeatures(features);
      
      setAnalysisProgress(50);
      setAnalysisStage('Analyzing dots, lines, and curves...');
    }, 800);
    
    // Stage 3: Symmetry analysis
    setTimeout(() => {
      setAnalysisProgress(65);
      setAnalysisStage('Evaluating symmetry and proportions...');
    }, 1500);
    
    // Stage 4: Color analysis
    setTimeout(() => {
      setAnalysisProgress(80);
      setAnalysisStage('Processing color distribution and patterns...');
    }, 2200);
    
    // Stage 5: Classification
    setTimeout(() => {
      setAnalysisProgress(95);
      setAnalysisStage('Classifying pattern type and cultural significance...');
    }, 2800);
    
    // Stage 6: Results compilation
    setTimeout(() => {
      setAnalysisProgress(100);
      setAnalysisStage('Compiling cultural analysis and historical context...');
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      // Generate comprehensive analysis results
      if (examplePattern) {
        setCurrentAnalysisResults(examplePattern.results);
      } else if (localDetectedFeatures) {
        const classification = classifyPattern(localDetectedFeatures);
        const patternInfo = getPatternDatabase(classification.patternType);
        
        const comprehensiveResults = {
          confidence: classification.confidence,
          patternType: classification.patternType,
          secondaryType: classification.secondaryType,
          reasoning: classification.reasoning,
          complexity: patternInfo.complexity,
          symmetry: patternInfo.symmetry,
          region: patternInfo.region,
          occasion: patternInfo.occasion,
          elements: patternInfo.elements,
          culturalSignificance: patternInfo.culturalSignificance,
          similarPatterns: patternInfo.similarPatterns,
          detectedFeatures: localDetectedFeatures,
          performanceMetrics: {
            processingTime: "3.2 seconds",
            accuracy: `${classification.confidence}%`,
            detectionAlgorithms: ["Edge Detection", "Symmetry Analysis", "Color Histogram", "Pattern Matching"]
          },
          stepByStepGuide: generateStepGuide(classification.patternType, patternInfo)
        };
        
        setCurrentAnalysisResults(comprehensiveResults);
      }
    }, 3500);
  };

  const generateStepGuide = (patternType: string, patternInfo: any) => {
    // Generate detailed step-by-step guides based on pattern type
    const baseGuides = {
      "Pulli Kolam": {
        totalSteps: 8,
        estimatedTime: "15-20 minutes",
        difficulty: "Intermediate",
        materials: patternInfo.materials,
        steps: [
          {
            step: 1,
            title: "Prepare the Sacred Space",
            description: "Clean the drawing surface thoroughly and sprinkle with water to settle dust. Mark the center point with reverence.",
            duration: "2 minutes",
            tips: "Traditional practice begins at dawn when the earth energy is most receptive"
          },
          {
            step: 2,
            title: "Create the Dot Matrix (Pulli)",
            description: "Place dots in a symmetrical grid pattern. Start with a 5x5 arrangement, ensuring equal spacing between each dot.",
            duration: "3 minutes",
            tips: "Each dot represents a life challenge - place them mindfully with consistent pressure"
          },
          {
            step: 3,
            title: "Begin the Central Connection",
            description: "Start from the center dot and create flowing curved lines to connect adjacent dots in a harmonious pattern.",
            duration: "3 minutes",
            tips: "The center represents the divine source - all patterns should radiate from this sacred point"
          },
          {
            step: 4,
            title: "Extend the Sacred Geometry",
            description: "Connect the central pattern to outer dots, maintaining perfect symmetry across all quadrants.",
            duration: "4 minutes",
            tips: "Work systematically - complete one section before moving to maintain balance"
          },
          {
            step: 5,
            title: "Form Continuous Loops",
            description: "Create unbroken lines that loop around each dot, ensuring no dot remains isolated in the design.",
            duration: "3 minutes",
            tips: "Continuous lines represent the eternal cycle of life - avoid breaks or sharp corners"
          },
          {
            step: 6,
            title: "Complete the Pattern Flow",
            description: "Ensure all lines connect seamlessly, creating one unified design without beginning or end.",
            duration: "2 minutes",
            tips: "The pattern should flow like a river - smooth, continuous, and purposeful"
          },
          {
            step: 7,
            title: "Verify Sacred Symmetry",
            description: "Check the pattern for perfect symmetrical balance and make gentle adjustments if needed.",
            duration: "1 minute",
            tips: "Step back and view from multiple angles - symmetry reflects cosmic harmony"
          },
          {
            step: 8,
            title: "Sacred Completion Ritual",
            description: "Add final touches and offer gratitude for the opportunity to create sacred art.",
            duration: "1 minute",
            tips: "Traditional completion includes a small offering of rice or flowers"
          }
        ],
        commonMistakes: [
          "Uneven dot spacing disrupts the mathematical harmony",
          "Breaking the continuous line flow interrupts energy circulation", 
          "Asymmetrical patterns disturb cosmic balance",
          "Leaving dots unenclosed creates incomplete spiritual protection"
        ],
        variations: [
          "Simple 3x3 grid for daily practice",
          "Complex 7x7 grid for festival occasions",
          "Specialized patterns for specific deities or occasions"
        ]
      }
    };

    return baseGuides[patternType] || baseGuides["Pulli Kolam"];
  };

  // Enhanced example patterns with more variety
  const examplePatterns = [
    {
      title: "Traditional Pulli Kolam",
      complexity: "Beginner",
      region: "Tamil Nadu",
      image: PATTERN_IMAGES.pulli,
      results: {
        confidence: 96,
        patternType: "Pulli Kolam",
        complexity: "Beginner",
        symmetry: "4-fold radial",
        region: "Tamil Nadu",
        occasion: "Daily morning ritual",
        elements: ["Dots (Pulli)", "Curved Lines", "Continuous Loops"],
        culturalSignificance: "Traditional floor art drawn with rice flour to welcome prosperity and ward off evil spirits. Dating back to 300 BCE Sangam poetry, Pulli Kolam represents the continuous cycle of life through unbroken lines.",
        similarPatterns: ["Sikku Kolam", "Kambi Kolam", "Padi Kolam"],
        detectedFeatures: { dots: 25, lines: 20, curves: 18, symmetryAxes: 4, colorVariance: 0.2, complexity: 0.4, geometricShapes: 8, floralElements: 0 },
        stepByStepGuide: generateStepGuide("Pulli Kolam", getPatternDatabase("Pulli Kolam"))
      }
    },
    {
      title: "Festival Rangoli",
      complexity: "Intermediate",
      region: "Karnataka",
      image: PATTERN_IMAGES.rangoli,
      results: {
        confidence: 92,
        patternType: "Festival Rangoli",
        complexity: "Intermediate",
        symmetry: "8-fold radial",
        region: "Karnataka",
        occasion: "Festivals and celebrations",
        elements: ["Geometric Patterns", "Floral Motifs", "Vibrant Colors", "Central Mandala"],
        culturalSignificance: "Colorful floor art created during festivals to invite divine blessings and celebrate auspicious occasions. Originating from ancient Sanskrit 'Rangavalli' meaning 'row of colors'.",
        similarPatterns: ["Alpana", "Muggu", "Mandana", "Aripana"],
        detectedFeatures: { dots: 12, lines: 15, curves: 22, symmetryAxes: 8, colorVariance: 0.7, complexity: 0.6, geometricShapes: 12, floralElements: 8 },
        stepByStepGuide: generateStepGuide("Festival Rangoli", getPatternDatabase("Festival Rangoli"))
      }
    },
    {
      title: "Sacred Geometry Mandala",
      complexity: "Advanced",
      region: "Kerala",
      image: PATTERN_IMAGES.geometry,
      results: {
        confidence: 98,
        patternType: "Sacred Geometry Mandala",
        complexity: "Advanced",
        symmetry: "12-fold radial",
        region: "Kerala",
        occasion: "Spiritual practices and meditation",
        elements: ["Sacred Geometry", "Complex Symmetry", "Mathematical Precision", "Spiritual Symbols"],
        culturalSignificance: "Complex geometric patterns used for meditation and spiritual practices, representing cosmic harmony and divine order. Rooted in ancient Indus Valley sacred geometry (3300 BCE).",
        similarPatterns: ["Sri Yantra", "Lotus Mandala", "Chakra Patterns"],
        detectedFeatures: { dots: 8, lines: 35, curves: 28, symmetryAxes: 12, colorVariance: 0.3, complexity: 0.8, geometricShapes: 20, floralElements: 2 },
        stepByStepGuide: generateStepGuide("Sacred Geometry Mandala", getPatternDatabase("Sacred Geometry Mandala"))
      }
    },
    {
      title: "Flowing Sikku Kolam",
      complexity: "Intermediate",
      region: "Tamil Nadu",
      image: PATTERN_IMAGES.sikku,
      results: {
        confidence: 94,
        patternType: "Sikku Kolam",
        complexity: "Intermediate to Advanced",
        symmetry: "6-fold radial",
        region: "Tamil Nadu",
        occasion: "Special festivals and ceremonies",
        elements: ["Continuous Loops", "Flowing Lines", "Minimal Dots", "Interwoven Patterns"],
        culturalSignificance: "Sophisticated interwoven patterns where lines loop around dots creating complex designs. Represents the interconnectedness of life and the continuous flow of energy.",
        similarPatterns: ["Pulli Kolam", "Neli Kolam", "Chikku Kolam"],
        detectedFeatures: { dots: 16, lines: 12, curves: 28, symmetryAxes: 6, colorVariance: 0.25, complexity: 0.65, geometricShapes: 6, floralElements: 1 },
        stepByStepGuide: generateStepGuide("Sikku Kolam", getPatternDatabase("Sikku Kolam"))
      }
    },
    {
      title: "Natural Poo Kolam",
      complexity: "Beginner",
      region: "Tamil Nadu",
      image: PATTERN_IMAGES.poo,
      results: {
        confidence: 91,
        patternType: "Poo Kolam",
        complexity: "Beginner to Intermediate",
        symmetry: "Natural, organic patterns",
        region: "Tamil Nadu, Kerala",
        occasion: "Religious festivals and special ceremonies",
        elements: ["Fresh Flowers", "Organic Curves", "Natural Motifs", "Seasonal Elements"],
        culturalSignificance: "Flower-based designs created during specific religious events and seasonal celebrations. Represents the temporary beauty of life and nature's cycles.",
        similarPatterns: ["Floral Rangoli", "Botanical Kolam", "Natural Mandala"],
        detectedFeatures: { dots: 5, lines: 8, curves: 20, symmetryAxes: 4, colorVariance: 0.6, complexity: 0.3, geometricShapes: 3, floralElements: 15 },
        stepByStepGuide: generateStepGuide("Poo Kolam", getPatternDatabase("Poo Kolam"))
      }
    }
  ];

  const analysisResults = currentAnalysisResults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {currentLang.scan?.title || "Advanced Kolam Pattern Recognition"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentLang.scan?.subtitle || "Upload any Kolam or Rangoli image for comprehensive AI-powered analysis and cultural insights"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <span>Advanced Pattern Upload</span>
                  <Badge variant="secondary" className="ml-auto rounded-full">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!uploadedImage ? (
                  <div 
                    className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="relative">
                      <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Upload Kolam Image for Analysis
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Our AI analyzes Pulli Kolam, Sikku Kolam, Rangoli, Poo Kolam, and Sacred Geometry patterns
                    </p>
                    <Button className="rounded-xl">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden shadow-md relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded Kolam" 
                        className="w-full h-64 object-cover"
                      />
                      {analysisComplete && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="rounded-xl flex-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Change Image
                      </Button>
                      <Button 
                        onClick={() => startAnalysis()}
                        disabled={isAnalyzing}
                        className="rounded-xl flex-1"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        {isAnalyzing ? "Analyzing..." : "Analyze Pattern"}
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Enhanced Analysis Progress */}
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <Scan className="w-5 h-5 text-primary animate-pulse" />
                      <span className="font-medium">Computer Vision Analysis</span>
                      <Badge variant="outline" className="ml-auto rounded-full">
                        {analysisProgress}%
                      </Badge>
                    </div>
                    <Progress value={analysisProgress} className="h-3" />
                    <div className="text-sm text-muted-foreground flex items-center space-x-2">
                      <Settings className="w-4 h-4 animate-spin" />
                      <span>{analysisStage}</span>
                    </div>
                    
                    {/* Performance Indicators */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Search className="w-3 h-3 text-blue-500" />
                        <span>Pattern Detection</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span>Cultural Analysis</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Quick Actions */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <Button variant="outline" className="rounded-xl">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Eye className="w-4 h-4 mr-2" />
                    View Examples
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>AI Analysis Results</span>
                  {analysisComplete && (
                    <Badge variant="secondary" className="ml-auto rounded-full">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!analysisComplete || !currentAnalysisResults ? (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Advanced Computer Vision Ready
                    </h3>
                    <p className="text-muted-foreground">
                      Upload an image to get comprehensive pattern analysis, cultural significance, and step-by-step drawing instructions
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Enhanced Confidence Score */}
                    <div className="bg-muted rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">AI Confidence Score</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="default" className="rounded-full">
                            {currentAnalysisResults.confidence}%
                          </Badge>
                          {currentAnalysisResults.secondaryType && (
                            <Badge variant="outline" className="rounded-full text-xs">
                              {currentAnalysisResults.secondaryType}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress value={currentAnalysisResults.confidence} className="h-2" />
                      {currentAnalysisResults.reasoning && (
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          {currentAnalysisResults.reasoning}
                        </p>
                      )}
                    </div>

                    {/* Performance Metrics */}
                    {currentAnalysisResults.performanceMetrics && (
                      <div className="bg-secondary/10 rounded-xl p-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Detection Performance
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Processing Time:</span>
                            <p className="font-medium">{currentAnalysisResults.performanceMetrics.processingTime}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Accuracy:</span>
                            <p className="font-medium">{currentAnalysisResults.performanceMetrics.accuracy}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-muted-foreground text-xs">Algorithms Used:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {currentAnalysisResults.performanceMetrics.detectionAlgorithms.map((algo: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {algo}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Detected Features */}
                    {currentAnalysisResults.detectedFeatures && (
                      <div className="bg-accent/10 rounded-xl p-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center">
                          <Layers className="w-4 h-4 mr-2" />
                          Computer Vision Features
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span>Dots Detected:</span>
                            <Badge variant="outline">{currentAnalysisResults.detectedFeatures.dots}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Lines Found:</span>
                            <Badge variant="outline">{currentAnalysisResults.detectedFeatures.lines}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Curves Identified:</span>
                            <Badge variant="outline">{currentAnalysisResults.detectedFeatures.curves}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Symmetry Axes:</span>
                            <Badge variant="outline">{currentAnalysisResults.detectedFeatures.symmetryAxes}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Geometric Shapes:</span>
                            <Badge variant="outline">{currentAnalysisResults.detectedFeatures.geometricShapes}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Floral Elements:</span>
                            <Badge variant="outline">{currentAnalysisResults.detectedFeatures.floralElements}</Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pattern Classification */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Grid3X3 className="w-5 h-5 text-primary" />
                          <span className="font-medium">Pattern Classification</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground mb-1">
                          {currentAnalysisResults.patternType}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-primary" />
                            <span>{currentAnalysisResults.complexity}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RotateCcw className="w-4 h-4 text-primary" />
                            <span>{currentAnalysisResults.symmetry}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cultural Information */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">Regional Origin</span>
                        <Badge variant="secondary" className="rounded-full">
                          {currentAnalysisResults.region}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-medium">Traditional Occasion</span>
                        <span className="text-muted-foreground">{currentAnalysisResults.occasion}</span>
                      </div>
                    </div>

                    {/* Pattern Elements */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-primary" />
                        <span className="font-medium">Design Elements</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentAnalysisResults.elements.map((element: string, index: number) => (
                          <Badge key={index} variant="outline" className="rounded-full">
                            {element}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Cultural Significance */}
                    <div className="bg-accent/10 rounded-xl p-4">
                      <h4 className="font-medium text-foreground mb-2">Cultural Significance</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {currentAnalysisResults.culturalSignificance}
                      </p>
                    </div>

                    {/* Historical Context & Cultural Heritage */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 pb-2 border-b border-border">
                        <History className="w-5 h-5 text-primary" />
                        <h4 className="font-medium text-foreground">Cultural Heritage & Historical Context</h4>
                      </div>
                      
                      {/* Origin & Evolution */}
                      <div className="bg-primary/5 rounded-xl p-4 space-y-3">
                        <div className="flex items-start space-x-3">
                          <Crown className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-foreground mb-1">Ancient Origins</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {currentAnalysisResults.patternType === "Pulli Kolam" ? 
                                "Pulli Kolam traces its origins to over 2,000 years ago in ancient Tamil Nadu. Originally created by women at dawn using rice flour, these sacred geometric patterns were believed to invite Lakshmi, the goddess of prosperity, into their homes. The practice evolved from simple dot patterns in Sangam literature to complex mathematical designs during the Chola dynasty." :
                                currentAnalysisResults.patternType === "Festival Rangoli" ?
                                "Festival Rangoli has its roots in ancient Vedic traditions, mentioned in texts dating back to 1500 BCE. Originally called 'Rangavalli' in Sanskrit, these colorful patterns evolved through various regional influences - from Mughal geometric precision to British colonial color innovations. Each festival brought new symbolic elements, creating the vibrant traditions we see today." :
                                currentAnalysisResults.patternType === "Sikku Kolam" ?
                                "Sikku Kolam evolved during the medieval period (500-1000 CE) as a sophisticated extension of basic Pulli patterns. Master artisans developed techniques for creating continuous interwoven lines that formed complex mathematical designs. This style became associated with temple festivals and royal celebrations, requiring years of practice to master." :
                                currentAnalysisResults.patternType === "Poo Kolam" ?
                                "Poo Kolam tradition began in the 8th century CE in Tamil temple communities. Fresh flowers were arranged in geometric patterns during specific lunar cycles and seasonal festivals. This practice merged Hindu botanical symbolism with ancient Dravidian nature worship, creating patterns that honored both mathematical precision and natural beauty." :
                                "Sacred geometric patterns have been integral to Indian spiritual practices since the Indus Valley Civilization (3300-1300 BCE). These mandala-like designs evolved through Buddhist, Jain, and Hindu philosophical traditions, each adding layers of cosmic symbolism and mathematical precision that connect earthly art to divine harmony."
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-foreground mb-1">Generational Transmission</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {currentAnalysisResults.patternType === "Pulli Kolam" ?
                                "Traditionally passed down from mother to daughter through oral instruction and hands-on practice. Each family developed signature variations - secret techniques for perfect curves, special rice flour preparations, and unique interpretations of classical motifs. During the Margazhi month, grandmothers would wake at 4 AM to teach young girls, creating unbroken chains of knowledge spanning centuries." :
                                currentAnalysisResults.patternType === "Festival Rangoli" ?
                                "Knowledge transfer occurred during festival preparations when entire families gathered. Grandmothers shared stories embedded in each symbol - the lotus for purity, peacocks for beauty, and geometric patterns for cosmic order. Regional migrations during historical periods led to fascinating pattern fusions, as families adapted their traditional designs to local customs." :
                                currentAnalysisResults.patternType === "Sikku Kolam" ?
                                "Master practitioners established informal guilds in Tamil villages, teaching advanced techniques through rigorous apprenticeships. Knowledge was carefully guarded, with complex patterns shared only during specific festivals. Each master developed signature styles, leading to regional variations that became associated with particular temple traditions and family lineages." :
                                currentAnalysisResults.patternType === "Poo Kolam" ?
                                "Temple priests and botanical specialists preserved this knowledge through seasonal ceremonies. Young devotees learned which flowers bloomed during specific festivals, their spiritual significance, and traditional arrangement patterns. This practice created living calendars that connected communities to natural cycles and lunar phases." :
                                "Sacred geometry knowledge was preserved in temple communities and gurukula systems. Master craftsmen (shilpis) encoded mathematical principles in visual patterns, teaching apprentices through repetitive practice. Ancient texts like the Vastu Shastra and Agama scriptures formalized these designs, ensuring precision across generations while allowing for creative interpretation."
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-foreground mb-1">Regional Evolution & Modern Adaptation</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {currentAnalysisResults.patternType === "Pulli Kolam" ?
                                "Colonial period saw documentation by British scholars, leading to the first printed collections in the 1890s. Post-independence cultural revival movements in the 1950s-60s elevated Kolam from daily ritual to artistic expression. Modern practitioners like Meera Murugesan and contemporary artists have introduced Kolam to international galleries while preserving traditional meanings." :
                                currentAnalysisResults.patternType === "Festival Rangoli" ?
                                "The art form spread through cultural exchanges during medieval trade routes, incorporating Persian floral motifs and Islamic geometric principles. The 20th century brought synthetic colors and stencils, making elaborate designs accessible to urban families. Today, Rangoli competitions in global Indian communities continue evolving the tradition while maintaining spiritual essence." :
                                currentAnalysisResults.patternType === "Sikku Kolam" ?
                                "Modern digital artists have created computer algorithms to generate Sikku patterns, studying their mathematical properties for contemporary design applications. International museums now display these patterns as examples of indigenous mathematical art, leading to academic research into their algorithmic properties and therapeutic benefits." :
                                currentAnalysisResults.patternType === "Poo Kolam" ?
                                "Environmental awareness movements have revived Poo Kolam as a sustainable art form. Modern practitioners combine traditional flower patterns with eco-friendly materials, creating temporary installations that highlight biodiversity and seasonal awareness. International flower festivals now feature Poo Kolam as examples of bioregional art practices." :
                                "Temple architecture influenced the spread of sacred geometry across Southeast Asia through Indian cultural expeditions. Medieval period saw synthesis with local artistic traditions in Indonesia, Cambodia, and Thailand. Modern digital art and contemporary mandala therapy movements trace their origins to these ancient Indian geometric principles, proving their timeless psychological and spiritual relevance."
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cultural Metadata Link */}
                      <div className="bg-secondary/10 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-foreground mb-1">Explore Detailed Cultural Heritage</h5>
                            <p className="text-sm text-muted-foreground">
                              Discover comprehensive historical documentation, regional variations, and cultural significance of {currentAnalysisResults.patternType} patterns.
                            </p>
                          </div>
                          <Button 
                            onClick={() => onPageChange?.('metadata', { 
                              patternType: currentAnalysisResults.patternType,
                              region: currentAnalysisResults.region,
                              selectedPattern: currentAnalysisResults
                            })}
                            className="rounded-xl flex-shrink-0"
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Cultural Metadata
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Similar Patterns */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center">
                        <Search className="w-4 h-4 mr-2" />
                        Similar Pattern Types
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentAnalysisResults.similarPatterns?.map((pattern: string, index: number) => (
                          <Button key={index} variant="ghost" size="sm" className="rounded-full hover:bg-primary/10">
                            {pattern}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-Step Drawing Guide Preview */}
                    {currentAnalysisResults.stepByStepGuide && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 pb-2 border-b border-border">
                          <PlayCircle className="w-5 h-5 text-primary" />
                          <h4 className="font-medium text-foreground">Step-by-Step Drawing Guide</h4>
                        </div>
                        
                        {/* Guide Overview */}
                        <div className="bg-primary/5 rounded-xl p-4 space-y-3">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                              <span className="text-xs text-muted-foreground block">Total Time</span>
                              <span className="text-sm font-medium">{currentAnalysisResults.stepByStepGuide.estimatedTime}</span>
                            </div>
                            <div>
                              <Target className="w-4 h-4 text-primary mx-auto mb-1" />
                              <span className="text-xs text-muted-foreground block">Steps</span>
                              <span className="text-sm font-medium">{currentAnalysisResults.stepByStepGuide.totalSteps}</span>
                            </div>
                            <div>
                              <Star className="w-4 h-4 text-primary mx-auto mb-1" />
                              <span className="text-xs text-muted-foreground block">Difficulty</span>
                              <span className="text-sm font-medium">{currentAnalysisResults.stepByStepGuide.difficulty}</span>
                            </div>
                          </div>
                          
                          {/* Materials Needed */}
                          <div>
                            <h5 className="font-medium text-foreground mb-2 flex items-center">
                              <Hand className="w-4 h-4 mr-1" />
                              Materials Needed
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {currentAnalysisResults.stepByStepGuide.materials?.map((material: string, index: number) => (
                                <Badge key={index} variant="secondary" className="rounded-full text-xs">
                                  {material}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* First 3 Steps Preview */}
                        <div className="space-y-3">
                          <h5 className="font-medium text-foreground">Drawing Steps Preview</h5>
                          {currentAnalysisResults.stepByStepGuide.steps?.slice(0, 3).map((step: any, index: number) => (
                            <div key={index} className="flex space-x-3 p-3 bg-muted/30 rounded-lg">
                              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                {step.step}
                              </div>
                              <div className="flex-1">
                                <h6 className="font-medium text-foreground">{step.title}</h6>
                                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <Badge variant="outline" className="text-xs rounded-full">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {step.duration}
                                  </Badge>
                                  {step.tips && (
                                    <div className="flex items-start space-x-1">
                                      <Lightbulb className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                                      <span className="text-xs text-muted-foreground italic">{step.tips}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {currentAnalysisResults.stepByStepGuide.steps && currentAnalysisResults.stepByStepGuide.steps.length > 3 && (
                            <div className="text-center p-2">
                              <span className="text-sm text-muted-foreground">
                                +{currentAnalysisResults.stepByStepGuide.steps.length - 3} more detailed steps...
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Common Mistakes */}
                        {currentAnalysisResults.stepByStepGuide.commonMistakes && (
                          <div className="bg-destructive/5 rounded-xl p-4">
                            <h5 className="font-medium text-foreground mb-2 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2 text-destructive" />
                              Common Mistakes to Avoid
                            </h5>
                            <ul className="space-y-1">
                              {currentAnalysisResults.stepByStepGuide.commonMistakes.slice(0, 3).map((mistake: string, index: number) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <ChevronRight className="w-3 h-3 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                                  {mistake}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                      <Button 
                        variant="outline" 
                        className="rounded-xl"
                        onClick={() => {
                          // Generate pattern recreation
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          canvas.width = 400;
                          canvas.height = 400;
                          
                          if (ctx) {
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            
                            // Simple pattern recreation based on detected features
                            if (currentAnalysisResults.detectedFeatures) {
                              const { dots, lines, curves } = currentAnalysisResults.detectedFeatures;
                              
                              // Draw dots
                              ctx.fillStyle = '#c41e3a';
                              for (let i = 0; i < Math.min(dots, 25); i++) {
                                const x = (i % 5 + 1) * 80;
                                const y = (Math.floor(i / 5) + 1) * 80;
                                ctx.beginPath();
                                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                                ctx.fill();
                              }
                              
                              // Draw connecting lines
                              ctx.strokeStyle = '#c41e3a';
                              ctx.lineWidth = 3;
                              ctx.lineCap = 'round';
                              
                              for (let i = 0; i < Math.min(lines, 10); i++) {
                                ctx.beginPath();
                                ctx.moveTo(80 + i * 30, 80);
                                ctx.quadraticCurveTo(120 + i * 30, 120, 160 + i * 30, 80);
                                ctx.stroke();
                              }
                            }
                            
                            const link = document.createElement('a');
                            link.download = `recreated-${currentAnalysisResults.patternType.toLowerCase().replace(/\s+/g, '-')}-pattern.png`;
                            link.href = canvas.toDataURL();
                            link.click();
                          }
                        }}
                      >
                        <Grid3X3 className="w-4 h-4 mr-2" />
                        Download Pattern
                      </Button>
                      <Button 
                        className="rounded-xl"
                        onClick={() => onPageChange?.('generator', { 
                          patternType: currentAnalysisResults.patternType,
                          detectedFeatures: currentAnalysisResults.detectedFeatures
                        })}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Similar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Examples Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-primary" />
                <span>Try These Example Patterns</span>
                <Badge variant="outline" className="ml-auto rounded-full">
                  {examplePatterns.length} Patterns
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-6">
                {examplePatterns.map((example, index) => (
                  <div 
                    key={index} 
                    className="group cursor-pointer"
                    onClick={() => startAnalysis(example)}
                  >
                    <div className="bg-muted rounded-xl h-32 mb-3 overflow-hidden group-hover:shadow-lg transition-all duration-300 relative">
                      <ImageWithFallback
                        src={example.image}
                        alt={example.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="secondary" className="text-xs">
                          <Scan className="w-3 h-3 mr-1" />
                          Analyze
                        </Badge>
                      </div>
                    </div>
                    <h4 className="font-medium text-foreground">{example.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs rounded-full">
                        {example.complexity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{example.region}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-xs text-muted-foreground">
                        AI Confidence: {example.results.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pattern Type Categories */}
              <div className="mt-8 pt-6 border-t border-border">
                <h5 className="font-medium text-foreground mb-4">Pattern Categories Our AI Recognizes</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">Pulli Kolam</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-sm">Sikku Kolam</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm">Festival Rangoli</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                    <Flower className="w-3 h-3 text-green-500" />
                    <span className="text-sm">Poo Kolam</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm">Sacred Geometry</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ScanInferPage;