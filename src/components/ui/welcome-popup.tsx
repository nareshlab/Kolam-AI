import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';
import { Badge } from './badge';
import { Progress } from './progress';
import { 
  Star, 
  Trophy, 
  Crown, 
  ArrowRight, 
  ArrowLeft, 
  SkipForward, 
  Sparkles,
  Circle,
  Hexagon,
  Flower2,
  X
} from 'lucide-react';

interface LearningStage {
  id: string;
  title: string;
  level: string;
  description: string;
  features: string[];
  patterns: string[];
  unlocks: string[];
  icon: React.ReactNode;
  bgGradient: string;
  iconBg: string;
}

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const learningStages: LearningStage[] = [
  {
    id: 'beginner',
    title: 'Beginner Stage',
    level: 'Foundation Level',
    description: 'Start your Kolam journey with simple pulli patterns. Learn the basics of dot placement, line drawing, and symmetry while creating beautiful geometric designs.',
    features: [
      'Simple dot-based patterns (pulli Kolam)',
      'Basic line drawing techniques',
      'Understanding symmetry and balance',
      'Practice with 3x3 and 5x5 grids'
    ],
    patterns: ['Simple squares', 'Basic diamonds', 'Elementary flowers'],
    unlocks: ['Pattern library access', 'Basic tutorials', 'Practice challenges'],
    icon: <Circle className="w-6 h-6" />,
    bgGradient: 'from-green-50 to-emerald-50',
    iconBg: 'bg-green-100 text-green-700'
  },
  {
    id: 'intermediate',
    title: 'Intermediate Stage',
    level: 'Building Complexity',
    description: 'Advance to more intricate patterns with curves and multi-layered designs. Master the art of connecting dots with flowing lines and create stunning symmetrical compositions.',
    features: [
      'Complex curved patterns',
      'Multi-layered designs',
      'Advanced symmetry techniques',
      'Color and decoration basics'
    ],
    patterns: ['Curved flowers', 'Interlocking patterns', 'Festival designs'],
    unlocks: ['Advanced pattern library', 'Cultural context lessons', 'Community challenges'],
    icon: <Hexagon className="w-6 h-6" />,
    bgGradient: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'advanced',
    title: 'Advanced Stage',
    level: 'Master Artisan',
    description: 'Create masterpiece rangoli patterns with intricate details, vibrant colors, and complex geometric compositions. Explore regional variations and festival-specific designs.',
    features: [
      'Intricate rangoli patterns',
      'Complex geometric compositions',
      'Regional style variations',
      'Festival-specific designs'
    ],
    patterns: ['Temple rangoli', 'Wedding designs', 'Festival masterpieces'],
    unlocks: ['Master pattern collection', 'Cultural stories', 'Teaching tools'],
    icon: <Flower2 className="w-6 h-6" />,
    bgGradient: 'from-purple-50 to-pink-50',
    iconBg: 'bg-purple-100 text-purple-700'
  }
];

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose, username }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showAllStages, setShowAllStages] = useState(false);

  const handleNext = () => {
    if (currentStage < learningStages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      setShowAllStages(true);
    }
  };

  const handlePrevious = () => {
    if (showAllStages) {
      setShowAllStages(false);
      setCurrentStage(learningStages.length - 1);
    } else if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const progress = ((currentStage + 1) / learningStages.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          
          <div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Welcome to Kolam AI, {username}!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Let's explore your journey through the beautiful art of Kolam patterns
            </DialogDescription>
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!showAllStages ? (
            // Individual Stage View
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your Learning Path</span>
                  <span className="text-sm text-muted-foreground">{currentStage + 1} of {learningStages.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Stage Card */}
              <div className={`rounded-2xl p-6 bg-gradient-to-br ${learningStages[currentStage].bgGradient} border border-border/50`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${learningStages[currentStage].iconBg} flex items-center justify-center flex-shrink-0`}>
                    {learningStages[currentStage].icon}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-semibold text-foreground">
                          {learningStages[currentStage].title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {learningStages[currentStage].level}
                        </Badge>
                      </div>
                      <p className="text-foreground/80 leading-relaxed">
                        {learningStages[currentStage].description}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-accent" />
                        What You'll Learn
                      </h4>
                      <ul className="space-y-1">
                        {learningStages[currentStage].features.map((feature, index) => (
                          <li key={index} className="text-sm text-foreground/70 flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sample Patterns */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-accent" />
                        Pattern Examples
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {learningStages[currentStage].patterns.map((pattern, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {pattern}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Unlocks */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <Crown className="w-4 h-4 mr-2 text-accent" />
                        What You'll Unlock
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {learningStages[currentStage].unlocks.map((unlock, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {unlock}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // All Stages Overview
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Your Complete Learning Journey</h3>
                <p className="text-muted-foreground">You can access these stages anytime from your dashboard</p>
              </div>

              <div className="grid gap-4">
                {learningStages.map((stage, index) => (
                  <div key={stage.id} className={`rounded-xl p-4 bg-gradient-to-r ${stage.bgGradient} border border-border/50`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${stage.iconBg} flex items-center justify-center`}>
                        {stage.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{stage.title}</h4>
                        <p className="text-sm text-foreground/70 line-clamp-2">{stage.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {stage.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip for now
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {(currentStage > 0 || showAllStages) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            
            {!showAllStages ? (
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                {currentStage < learningStages.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    View All Stages
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={onClose}
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Start Learning
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;