import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Star, 
  Clock,
  Users,
  Palette,
  Globe,
  BookOpen,
  Crown,
  Flower,
  Zap,
  Info,
  History
} from 'lucide-react';

interface CulturalMetadataPageProps {
  patternData?: {
    patternType?: string;
    region?: string;
    selectedPattern?: any;
  };
}

const CulturalMetadataPage: React.FC<CulturalMetadataPageProps> = ({ patternData }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  const [selectedRegion, setSelectedRegion] = useState(
    patternData?.region?.toLowerCase().replace(' ', '-') || 'tamil-nadu'
  );
  const [selectedPeriod, setSelectedPeriod] = useState('modern');

  const regions = [
    {
      id: 'tamil-nadu',
      name: 'Tamil Nadu',
      flag: '🏛️',
      patterns: 245,
      speciality: 'Pulli Kolam',
      description: 'Birthplace of Kolam art with intricate dot-based patterns',
      primaryColors: ['White', 'Red', 'Yellow'],
      occasions: ['Daily rituals', 'Margazhi month', 'Pongal festival']
    },
    {
      id: 'karnataka',
      name: 'Karnataka',
      flag: '🌺',
      patterns: 189,
      speciality: 'Rangoli',
      description: 'Known for colorful flower-based geometric designs',
      primaryColors: ['Red', 'Yellow', 'Orange', 'Pink'],
      occasions: ['Gowri Ganesha', 'Diwali', 'Ugadi']
    },
    {
      id: 'andhra-pradesh',
      name: 'Andhra Pradesh',
      flag: '🎨',
      patterns: 167,
      speciality: 'Muggulu',
      description: 'Features flowing lines and auspicious symbols',
      primaryColors: ['White', 'Turmeric Yellow', 'Vermillion'],
      occasions: ['Sankranti', 'Brahmotsavam', 'Daily worship']
    },
    {
      id: 'kerala',
      name: 'Kerala',
      flag: '🌿',
      patterns: 134,
      speciality: 'Pookalam',
      description: 'Elaborate flower carpets during Onam festival',
      primaryColors: ['Multi-colored flowers', 'Natural petals'],
      occasions: ['Onam', 'Vishu', 'Temple festivals']
    }
  ];

  const historicalPeriods = [
    {
      id: 'ancient',
      name: 'Ancient Period',
      era: '2000 BCE - 500 CE',
      characteristics: ['Geometric simplicity', 'Spiritual symbolism', 'Natural materials'],
      significance: 'Origins in Indus Valley civilization sacred geometry'
    },
    {
      id: 'classical',
      name: 'Classical Period',
      era: '500 - 1500 CE',
      characteristics: ['Temple influences', 'Mathematical precision', 'Regional variations'],
      significance: 'Development of distinct regional styles and techniques'
    },
    {
      id: 'medieval',
      name: 'Medieval Period',
      era: '1500 - 1800 CE',
      characteristics: ['Royal patronage', 'Complex patterns', 'Cultural exchange'],
      significance: 'Flourishing under various kingdoms and cultural synthesis'
    },
    {
      id: 'modern',
      name: 'Modern Era',
      era: '1800 CE - Present',
      characteristics: ['Revival movements', 'Global recognition', 'Digital preservation'],
      significance: 'Adaptation to contemporary contexts while preserving tradition'
    }
  ];

  const festivals = [
    {
      name: 'Pongal',
      region: 'Tamil Nadu',
      month: 'January',
      patterns: ['Thai Kolam', 'Pongal Pot designs', 'Sugarcane motifs'],
      significance: 'Harvest festival celebrating prosperity and gratitude',
      icon: '🌾'
    },
    {
      name: 'Diwali',
      region: 'Pan-Indian',
      month: 'October/November',
      patterns: ['Lakshmi footprints', 'Lotus designs', 'Diya patterns'],
      significance: 'Festival of lights welcoming goddess Lakshmi',
      icon: '🪔'
    },
    {
      name: 'Onam',
      region: 'Kerala',
      month: 'August/September',
      patterns: ['Pookalam circles', 'King Mahabali motifs', 'Floral carpets'],
      significance: 'Welcoming King Mahabali with flower carpets',
      icon: '🌺'
    },
    {
      name: 'Ugadi',
      region: 'Andhra Pradesh',
      month: 'March/April',
      patterns: ['New Year symbols', 'Mango leaf designs', 'Kalash patterns'],
      significance: 'New Year celebration with auspicious designs',
      icon: '🎊'
    }
  ];

  const patternTypes = [
    {
      name: 'Pulli Kolam',
      origin: 'Tamil Nadu',
      complexity: 'Beginner to Expert',
      description: 'Dot-based patterns where lines connect dots without lifting the hand',
      symbolism: 'Unity, continuity, life cycle',
      variations: ['Simple Pulli', 'Complex Pulli', 'Kambi Kolam'],
      gridSize: '3x3 to 15x15'
    },
    {
      name: 'Sikku Kolam',
      origin: 'Tamil Nadu',
      complexity: 'Intermediate to Expert',
      description: 'Interlocked patterns with no beginning or end',
      symbolism: 'Eternal life, interconnectedness',
      variations: ['Simple Sikku', 'Nested Sikku', 'Multi-layer Sikku'],
      gridSize: '5x5 to 21x21'
    },
    {
      name: 'Rangoli',
      origin: 'Karnataka',
      complexity: 'Beginner to Advanced',
      description: 'Colorful geometric and floral designs',
      symbolism: 'Joy, prosperity, welcome',
      variations: ['Geometric Rangoli', 'Floral Rangoli', 'Freehand Rangoli'],
      gridSize: 'Varies'
    },
    {
      name: 'Muggulu',
      origin: 'Andhra Pradesh',
      complexity: 'Beginner to Advanced',
      description: 'Flowing line patterns with auspicious symbols',
      symbolism: 'Protection, prosperity, divine blessings',
      variations: ['Simple Muggulu', 'Sankranti Muggulu', 'Festival Muggulu'],
      gridSize: '3x3 to 11x11'
    }
  ];

  const selectedRegionData = regions.find(region => region.id === selectedRegion);

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
            {currentLang.metadata.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentLang.metadata.subtitle}
          </p>
        </motion.div>

        {/* Highlighted Pattern from Scan & Infer */}
        {patternData?.selectedPattern && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Your Analyzed Pattern: {patternData.selectedPattern.patternType}</CardTitle>
                      <p className="text-muted-foreground">Detailed cultural heritage and historical context</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="rounded-full px-4 py-2">
                    {patternData.selectedPattern.region}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center">
                      <History className="w-4 h-4 mr-2 text-primary" />
                      Historical Timeline
                    </h4>
                    <div className="space-y-2 text-sm">
                      {patternData.selectedPattern.patternType === "Pulli Kolam" && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>300 BCE:</strong> First mentions in Sangam literature</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1000 CE:</strong> Codified in Chola temple traditions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1890s:</strong> First Western documentation</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1960s:</strong> Cultural revival movement</span>
                          </div>
                        </>
                      )}
                      {patternData.selectedPattern.patternType === "Festival Rangoli" && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1500 BCE:</strong> Vedic origins as Rangavalli</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1200 CE:</strong> Islamic geometric influences</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1800s:</strong> Colonial color innovations</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1950s:</strong> Festival standardization</span>
                          </div>
                        </>
                      )}
                      {patternData.selectedPattern.patternType === "Sacred Geometry Mandala" && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>3300 BCE:</strong> Indus Valley sacred symbols</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>500 CE:</strong> Buddhist mandala traditions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1200 CE:</strong> Temple architecture integration</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span><strong>1970s:</strong> Western therapeutic adoption</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      Cultural Transmission
                    </h4>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {patternData.selectedPattern.patternType === "Pulli Kolam" ?
                        "Passed through matrilineal traditions where grandmothers taught granddaughters during pre-dawn hours. Each family maintained secret variations, creating distinctive neighborhood styles that evolved over generations." :
                        patternData.selectedPattern.patternType === "Festival Rangoli" ?
                        "Transmitted through seasonal celebrations where entire communities participated. Knowledge spread through inter-regional marriages, trade routes, and cultural festivals, creating beautiful fusion styles." :
                        "Preserved in temple guilds and spiritual communities through rigorous geometric training. Master craftsmen maintained precise measurements and sacred proportions, ensuring mathematical accuracy across centuries."
                      }
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Globe className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Modern Global Presence:</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {patternData.selectedPattern.patternType === "Pulli Kolam" ?
                        "Active in Tamil diaspora communities across Malaysia, Singapore, UK, USA, and Canada. Digital platforms have created global Kolam challenges and virtual learning communities." :
                        patternData.selectedPattern.patternType === "Festival Rangoli" ?
                        "Celebrated worldwide in Indian communities during Diwali and regional festivals. Adapted to local materials and climate conditions while maintaining core symbolic meanings." :
                        "Adopted by international wellness and meditation communities. Featured in therapeutic art programs, mindfulness practices, and contemporary spiritual movements globally."
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="regions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl">
            <TabsTrigger value="regions" className="rounded-xl">Regional Styles</TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl">History</TabsTrigger>
            <TabsTrigger value="festivals" className="rounded-xl">Festivals</TabsTrigger>
            <TabsTrigger value="patterns" className="rounded-xl">Pattern Types</TabsTrigger>
          </TabsList>

          {/* Regional Styles */}
          <TabsContent value="regions">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Region Selector */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <Card className="rounded-2xl border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>Regions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {regions.map((region) => (
                      <Button
                        key={region.id}
                        variant={selectedRegion === region.id ? "default" : "outline"}
                        className="w-full justify-start rounded-xl h-auto p-4"
                        onClick={() => setSelectedRegion(region.id)}
                      >
                        <div className="text-left w-full">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{region.flag}</span>
                            <span className="font-medium">{region.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {region.patterns} patterns • {region.speciality}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Region Details */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-3 space-y-6"
              >
                {selectedRegionData && (
                  <>
                    {/* Region Overview */}
                    <Card className="rounded-2xl border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{selectedRegionData.flag}</span>
                          <div>
                            <CardTitle className="text-2xl">{selectedRegionData.name}</CardTitle>
                            <p className="text-muted-foreground">{selectedRegionData.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{selectedRegionData.patterns}</div>
                            <div className="text-sm text-muted-foreground">Total Patterns</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-medium text-foreground">{selectedRegionData.speciality}</div>
                            <div className="text-sm text-muted-foreground">Primary Style</div>
                          </div>
                          <div className="text-center">
                            <div className="flex justify-center space-x-1 mb-1">
                              {selectedRegionData.primaryColors.slice(0, 3).map((color, index) => (
                                <div key={index} className="w-4 h-4 rounded-full bg-primary"></div>
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground">Primary Colors</div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Traditional Colors</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedRegionData.primaryColors.map((color, index) => (
                                <Badge key={index} variant="outline" className="rounded-full">
                                  {color}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">Key Occasions</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedRegionData.occasions.map((occasion, index) => (
                                <Badge key={index} variant="secondary" className="rounded-full">
                                  {occasion}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sample Patterns */}
                    <Card className="rounded-2xl border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Palette className="w-5 h-5 text-primary" />
                          <span>Signature Patterns</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          {[1, 2, 3].map((item, index) => (
                            <div key={index} className="group cursor-pointer">
                              <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-xl mb-3 flex items-center justify-center group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
                                <div className="w-16 h-16 grid grid-cols-3 gap-1">
                                  {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="w-4 h-4 bg-primary/30 rounded-full"></div>
                                  ))}
                                </div>
                              </div>
                              <h4 className="font-medium text-foreground">Traditional Pattern {index + 1}</h4>
                              <div className="flex items-center justify-between mt-1">
                                <Badge variant="outline" className="text-xs rounded-full">
                                  {['Beginner', 'Intermediate', 'Advanced'][index]}
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-muted-foreground">4.{5 + index}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </motion.div>
            </div>
          </TabsContent>

          {/* Historical Timeline */}
          <TabsContent value="history">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Historical Evolution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                    
                    <div className="space-y-8">
                      {historicalPeriods.map((period, index) => (
                        <motion.div
                          key={period.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative flex items-start space-x-6"
                        >
                          {/* Timeline dot */}
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold z-10">
                            {index + 1}
                          </div>
                          
                          <div className="flex-1 bg-muted/30 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-xl font-bold text-foreground">{period.name}</h3>
                              <Badge variant="outline" className="rounded-full">
                                {period.era}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground mb-4">{period.significance}</p>
                            
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Key Characteristics:</h4>
                              <div className="flex flex-wrap gap-2">
                                {period.characteristics.map((char, i) => (
                                  <Badge key={i} variant="secondary" className="rounded-full">
                                    {char}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Festival Calendar */}
          <TabsContent value="festivals">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Festival Calendar & Patterns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {festivals.map((festival, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-3xl">{festival.icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{festival.name}</h3>
                            <p className="text-sm text-muted-foreground">{festival.region} • {festival.month}</p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{festival.significance}</p>
                        
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Traditional Patterns:</h4>
                          <div className="flex flex-wrap gap-2">
                            {festival.patterns.map((pattern, i) => (
                              <Badge key={i} variant="outline" className="rounded-full">
                                {pattern}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Pattern Types */}
          <TabsContent value="patterns">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid gap-6">
                {patternTypes.map((pattern, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl">{pattern.name}</CardTitle>
                          <Badge variant="secondary" className="rounded-full">
                            {pattern.origin}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{pattern.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Symbolism</h4>
                            <p className="text-sm text-muted-foreground">{pattern.symbolism}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Details</h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                <span className="text-muted-foreground">Complexity: </span>
                                <span className="font-medium">{pattern.complexity}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Grid Size: </span>
                                <span className="font-medium">{pattern.gridSize}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-foreground mb-3">Common Variations</h4>
                          <div className="flex flex-wrap gap-2">
                            {pattern.variations.map((variation, i) => (
                              <Badge key={i} variant="outline" className="rounded-full">
                                {variation}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-accent/10 rounded-xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Info className="w-4 h-4 text-accent" />
                            <span className="font-medium text-accent-foreground">Cultural Note</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This pattern type represents the unique artistic heritage of {pattern.origin} and 
                            continues to be practiced in daily rituals and special occasions.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CulturalMetadataPage;