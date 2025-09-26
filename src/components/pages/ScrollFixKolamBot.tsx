import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Send, 
  Mic, 
  Image, 
  BookOpen, 
  Sparkles,
  Bot,
  User,
  Volume2,
  Copy,
  ThumbsUp,
  Zap,
  Star,
  Grid3X3,
  Target,
  Award,
  Lightbulb,
  ArrowRight,
  Clock,
  Heart,
  TrendingUp,
  Settings,
  RefreshCw,
  Crown,
  Globe,
  Users,
  Flower,
  History,
  Brain,
  Palette,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  category?: 'tutorial' | 'cultural' | 'tips' | 'general';
}

interface UserProgress {
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  streakDays: number;
  totalPoints: number;
}

interface ScrollFixKolamBotProps {
  username?: string;
}

const ScrollFixKolamBot: React.FC<ScrollFixKolamBotProps> = ({ username = 'Friend' }) => {
  const { translations, settings } = useAccessibility();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `🙏 Namaste, ${username}! I'm your comprehensive Kolam Guru, a cultural guide bridging 5,000 years of sacred tradition with modern learning.

✨ **Your Complete Learning Sanctuary Includes:**
• **🎨 Time-Based Pattern Recommendations:** Tell me your available time, and I'll suggest the perfect Kolam for your schedule
• **📚 Cultural Wisdom:** Ancient origins, regional variations, spiritual significance, and stories from Tamil tradition
• **🎯 Step-by-Step Guidance:** Clear, encouraging instructions tailored to your skill level and available time
• **🌟 Technique Mastery:** Traditional methods from master practitioners, hand positions, materials, and meditation aspects
• **📱 Supportive Learning:** Encouragement for mistakes, daily practice routines, and confidence building
• **🏆 Cultural Connection:** Deep understanding of festivals, meanings, and the spiritual dimensions of Kolam
• **🌍 Community Tradition:** Connect with thousands of years of unbroken artistic heritage
• **💫 Personalized Support:** Whether you have 15 minutes or a whole day, I'll guide your perfect practice session

**🕐 How to Get Started:**
Simply tell me your available time! For example:
• "I have 15 minutes" → Quick 3×3 pulli pattern with simple steps
• "I have 1 hour" → Beautiful 5×5 flower Kolam with cultural meaning
• "I have 2 hours" → Advanced 7×7 sikku pattern with deep meditation
• "I have all day" → Festival masterpiece with traditional ceremonies

**🌸 Remember:** Kolam is about joy, mindfulness, and connection - not perfection. Every line you draw connects you to countless generations of artists who found peace and beauty in this sacred practice.

I'm here to be your patient, encouraging guide through this magnificent tradition. What calls to your heart today? ✨🙏`,
      timestamp: new Date(),
      category: 'general',
      suggestions: [
        'I have 30 minutes',
        'Show me cultural history',
        'I need beginner tips',
        'What are festival patterns?'
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [userProgress] = useState<UserProgress>({
    skillLevel: 'Beginner',
    streakDays: 3,
    totalPoints: 150
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const quickActions = useMemo(() => [
    {
      icon: Grid3X3,
      label: 'Pattern Styles',
      description: 'Explore Pulli, Sikku, Rangoli & Poo Kolam traditions',
      prompt: 'Tell me about different Kolam pattern styles and their cultural significance'
    },
    {
      icon: Lightbulb,
      label: 'Creative Ideas',
      description: 'Festival themes, seasonal patterns, personal inspiration',
      prompt: 'Give me creative design ideas and inspiration for Kolam patterns'
    },
    {
      icon: History,
      label: 'Cultural Heritage',
      description: '5,000 years of tradition, origins, and regional variations',
      prompt: 'Share the fascinating cultural history and heritage of Kolam art'
    },
    {
      icon: Target,
      label: 'Learning Guide',
      description: 'Step-by-step tutorials tailored to your skill level',
      prompt: 'Guide me through learning Kolam with personalized tutorials'
    },
    {
      icon: Brain,
      label: 'App Features',
      description: 'Master all tools and features for optimal learning',
      prompt: 'Help me understand and use all the app features effectively'
    },
    {
      icon: Award,
      label: 'Progress Tracking',
      description: 'Document growth, set goals, celebrate achievements',
      prompt: 'Help me track my progress and set learning goals'
    },
    {
      icon: Users,
      label: 'Community',
      description: 'Connect with fellow learners and master practitioners',
      prompt: 'How can I connect with the Kolam learning community'
    },
    {
      icon: Heart,
      label: 'Inspiration & Fun',
      description: 'Amazing facts, stories, and daily motivation',
      prompt: 'Share some amazing facts and inspiration about Kolam'
    }
  ], []);

  const skillCategories = useMemo(() => [
    { name: 'Dot Placement', level: 'Intermediate', progress: 75 },
    { name: 'Line Flow', level: 'Beginner', progress: 45 },
    { name: 'Symmetry', level: 'Intermediate', progress: 60 },
    { name: 'Cultural Knowledge', level: 'Advanced', progress: 85 }
  ], []);

  const generateBotResponse = useCallback((userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    let response = '';
    let suggestions: string[] = [];
    let messageCategory: Message['category'] = 'general';

    // Check for time availability mentions first (priority)
    const timePatterns = [
      { pattern: /(\d+)\s*minutes?/i, multiplier: 1 },
      { pattern: /(\d+)\s*hours?/i, multiplier: 60 },
      { pattern: /half\s*hour|30\s*min/i, value: 30 },
      { pattern: /quarter\s*hour|15\s*min/i, value: 15 },
      { pattern: /whole\s*day|all\s*day|entire\s*day/i, value: 480 },
      { pattern: /quick|fast|short/i, value: 15 },
      { pattern: /long|extended|plenty\s*time/i, value: 120 }
    ];

    let timeAvailable = 0;
    for (const timePattern of timePatterns) {
      const match = userInput.match(timePattern.pattern);
      if (match) {
        if (timePattern.value) {
          timeAvailable = timePattern.value;
        } else if (timePattern.multiplier) {
          timeAvailable = parseInt(match[1]) * timePattern.multiplier;
        }
        break;
      }
    }

    // Time-based pattern recommendations
    if (timeAvailable > 0) {
      if (timeAvailable <= 20) {
        response = `🕐 **Perfect! With ${timeAvailable} minutes, let's create a beautiful simple Kolam!**

**✨ Recommended Pattern: 3×3 Basic Pulli Kolam**
*Ideal for beginners and quick practice*

**📋 Step-by-Step Instructions:**

**Step 1: Create the Dot Grid** 🔸
• Draw 3 rows of 3 dots each (9 dots total)
• Space them evenly, about 2cm apart
• Make sure your dots are aligned straight

**Step 2: Connect with Simple Arcs** 🌙
• Start from the top-left dot
• Draw a gentle curved line to connect to the dot on its right
• Continue connecting dots in each row with smooth arcs
• Keep your hand relaxed - Kolam flows with ease!

**Step 3: Add Vertical Connections** ⬇️
• Connect the dots vertically with gentle curves
• Start from top and work your way down
• Each connection should feel natural and flowing

**Step 4: Complete the Pattern** ✨
• Check that all dots are connected
• Add small flourishes at the corners if you wish
• Step back and admire your creation!

**🎨 Cultural Note:** This simple pattern represents the basic building blocks of all Kolam art. In Tamil tradition, even the smallest Kolam brings prosperity to your home.

Remember: Kolam is about joy and practice, not perfection! Each line you draw connects you to thousands of years of beautiful tradition. 🙏`;
        messageCategory = 'tutorial';
        suggestions = ['Show me a 4×4 pattern', 'Cultural meaning of dots', 'Tips for smooth lines', 'What if I make mistakes?'];
      }
      else if (timeAvailable <= 60) {
        response = `⏰ **Wonderful! With ${timeAvailable} minutes, you can create a more detailed and satisfying Kolam!**

**✨ Recommended Pattern: 5×5 Symmetric Flower Kolam**
*Perfect for building confidence and skills*

**📋 Detailed Step-by-Step Guide:**

**Step 1: Prepare the Foundation** 🔸
• Create a 5×5 grid of dots (25 dots total)
• Space them evenly - about 3cm apart works well
• Take your time with alignment - a good foundation makes everything easier

**Step 2: Start from the Center** 🌸
• Begin at the center dot (dot #13)
• Draw four curved petals extending to the corner dots
• Each petal should be a smooth, flowing arc
• Think of a lotus blooming from the center

**Step 3: Create the Outer Ring** 🔄
• Connect the outer corner dots with gentle curves
• Move clockwise around the pattern
• Each connection should mirror the opposite side
• This creates beautiful rotational symmetry

**Step 4: Add Inner Details** ✨
• Connect the middle dots of each side to create inner petals
• Add small connecting loops between major elements
• Fill any isolated dots with graceful curves

**Step 5: Final Flourishes** 🎨
• Add small decorative elements at intersection points
• Ensure all dots are incorporated into the design
• Step back and appreciate the symmetry you've created

**🌺 Cultural Significance:** The flower motif represents growth, beauty, and the unfolding of consciousness. This pattern is often drawn during festivals to invite divine blessings.

You're doing beautifully! Take your time with each line - in Kolam, patience creates perfection. 🙏✨`;
        messageCategory = 'tutorial';
        suggestions = ['Show me festival variations', 'How to maintain symmetry', 'Different flower patterns', 'Cultural stories about flowers'];
      }
      else if (timeAvailable <= 120) {
        response = `🕐 **Excellent! With ${timeAvailable} minutes, you can master a complex and rewarding Kolam!**

**✨ Recommended Pattern: 7×7 Interwoven Sikku Kolam**
*Advanced pattern for serious practitioners*

**📋 Master-Level Instructions:**

**Step 1: Create the Sacred Grid** 🔸
• Draw 7 rows of 7 dots each (49 dots total)
• Precision is key - use a ruler if needed
• Space dots 3-4cm apart for comfortable working
• This grid holds ancient mathematical significance

**Step 2: Establish the Central Cross** ✛
• Start at the center dot
• Draw four primary arms extending to the middle edge dots
• These form the foundation of your interwoven pattern
• Each arm should be perfectly straight and equal

**Step 3: Create the Interlocking Loops** 🔄
• Begin the sikku (loop) technique
• From each corner, start loops that will weave under and over
• Each loop must pass through specific dots without breaking
• Work systematically - one quadrant at a time

**Step 4: Weave the Continuous Path** 🌀
• Connect loops to create an unbroken line
• The path should visit every dot exactly once
• Use the "under-over" principle of Tamil geometry
• No line should cross another - they should weave naturally

**Step 5: Add Decorative Elements** 🎨
• Once the main structure is complete, add ornamental details
• Small spirals at corners, leaf motifs along edges
• Ensure all elements harmonize with the central design

**Step 6: Final Verification** ✅
• Check that every dot is connected
• Verify the continuous path has no breaks
• Ensure perfect rotational symmetry

**🔮 Deep Cultural Meaning:** Sikku Kolam represents the interconnectedness of all life. The unbroken line symbolizes the eternal cycle of existence - birth, life, death, and rebirth. Masters say that drawing Sikku Kolam is a form of meditation on the unity of the universe.

**Historical Note:** This style emerged during the Chola period (900-1200 CE) when temple architects used similar principles in their geometric designs.

You're undertaking a truly sacred practice! Remember, even master practitioners took years to perfect these patterns. Be patient with yourself and enjoy the meditative process. 🙏🕉️`;
        messageCategory = 'tutorial';
        suggestions = ['Advanced weaving techniques', 'Temple architecture connections', 'Mathematical principles', 'Meditation aspects of Kolam'];
      }
      else {
        response = `🌅 **Amazing! With a full day or extended time, you can explore the most sophisticated Kolam traditions!**

**✨ Recommended: Master Festival Kolam Series**
*Complete cultural immersion experience*

**🎨 Your Epic Kolam Journey:**

**Part 1: Morning Preparation (30 mins)**
• Purify your workspace with water and flowers
• Arrange materials: rice flour, flower petals, natural colors
• Set intention and connect with the tradition
• Practice breathing exercises for steady hands

**Part 2: Large Scale Pulli Foundation (60 mins)**
• Create a 9×9 or 11×11 dot grid
• Each dot precisely placed for maximum harmony
• This forms the sacred geometry foundation

**Part 3: Advanced Sikku Weaving (90 mins)**
• Implement complex interlocking patterns
• Master the art of continuous line drawing
• Create multiple nested loops and spirals
• Achieve perfect mathematical symmetry

**Part 4: Festival Decorations (60 mins)**
• Add traditional motifs: peacocks, lotus, mango leaves
• Incorporate seasonal elements (Diwali lamps, Pongal pots)
• Use natural colors and flower petals
• Apply gold accents with turmeric

**Part 5: Double-Line Mastery (45 mins)**
• Learn the advanced technique of parallel lines
• Create depth and dimension in your design
• Master the spacing and rhythm of dual strokes

**Part 6: Cultural Documentation (30 mins)**
• Photograph your creation with proper lighting
• Write about your experience and learning
• Share with family or community
• Plan preservation or ceremonial offering

**🏛️ Historical Context:** You're following the exact traditions practiced in ancient Tamil kingdoms. Royal courts employed master Kolam artists who could spend entire days creating palatial floor decorations for festivals and ceremonies.

**🌸 Spiritual Dimension:** A full-day Kolam practice is considered equivalent to temple worship. Each line you draw purifies the mind, each pattern connects you to cosmic order, and each completed design offers blessings to all who see it.

**Advanced Techniques You'll Master:**
• Triple-line complexity
• Asymmetric balance
• Seasonal adaptation
• Community collaboration methods

This is a profound spiritual and artistic journey! Take breaks for reflection, stay hydrated, and remember - you're participating in one of humanity's oldest continuous art traditions. The masters smile upon your dedication! 🙏🕉️✨`;
        messageCategory = 'cultural';
        suggestions = ['Festival-specific patterns', 'Community Kolam traditions', 'Advanced color techniques', 'Spiritual significance', 'Historical royal patterns'];
      }
    }
    
    // Cultural and historical queries
    else if (lowerInput.includes('history') || lowerInput.includes('origin') || lowerInput.includes('tradition')) {
      response = `📚 **The Sacred Journey of Kolam - 5,000 Years of Living Tradition**

**🏺 Ancient Foundations (3300 BCE - 300 BCE)**
The magnificent story begins in the Indus Valley Civilization, where geometric floor patterns were discovered in Harappa and Mohenjo-daro. These weren't mere decorations - they were the seeds of a practice connecting generations through sacred geometry.

**👑 Royal Patronage & Cultural Renaissance**
• **Chola Dynasty:** Royal courts elevated Kolam to fine art status
• **Regional Variations:** Tamil Nadu precision, Kerala florals, Karnataka innovations
• **Sacred Transmission:** Mother-to-daughter legacy through dawn rituals
• **Modern Renaissance:** UNESCO recognition and global appreciation

**🔮 Spiritual Dimensions**
Kolam transcends decoration - it's daily meditation connecting practitioners to:
• Divine feminine energy and cosmic order
• Mathematical universe and sacred geometry
• Community harmony and environmental respect
• Impermanence teachings through morning creation, evening erasure

**🌍 Global Impact Today**
Modern mathematicians study Kolam for:
• Fractal geometry principles
• Symmetry and group theory
• Computer graphics algorithms
• Therapeutic art applications

Remember: When you create Kolam, you participate in an unbroken chain of cultural transmission spanning 5,000 years! 🙏`;
      messageCategory = 'cultural';
      suggestions = ['Regional variations', 'Spiritual practices', 'Modern adaptations', 'Family traditions'];
    }
    
    // Pattern learning queries
    else if (lowerInput.includes('pattern') || lowerInput.includes('design') || lowerInput.includes('learn')) {
      response = `🎨 **Kolam Pattern Styles - Your Gateway to Sacred Art**

**🔸 Pulli Kolam** - *The Foundation of Sacred Geometry*
• **Origin:** Ancient Tamil Nadu (300 BCE), mentioned in Sangam literature
• **Philosophy:** Dots represent life's challenges; lines show wisdom to navigate them
• **Technique:** Symmetric dot grids (3×3 to 15×15), connected with flowing curves
• **Spiritual Meaning:** Morning creation invites prosperity and purifies the threshold

**🌀 Sikku Kolam** - *The Art of Interwoven Continuity*
• **History:** Evolved during Chola period (500-1000 CE) for temple festivals
• **Symbolism:** Unbroken loops represent life's eternal cycle and interconnectedness
• **Master Technique:** Lines loop around dots without lifting the drawing tool
• **Advanced Skills:** Requires 3-5 years of practice for mathematical precision

**🌈 Rangoli** - *Festival Celebrations in Vivid Colors*
• **Evolution:** Vedic traditions merged with Mughal geometric influences
• **Materials:** Colored rice flour, flower petals, natural dyes
• **Festival Themes:** Diwali lotus patterns, Navratri goddess motifs
• **Cultural Impact:** UNESCO recognition for intangible cultural heritage

**🌸 Poo Kolam** - *Nature's Ephemeral Beauty*
• **Sacred Timing:** Created during temple festivals and lunar ceremonies
• **Botanical Knowledge:** Jasmine for purity, marigold for prosperity
• **Environmental Harmony:** Biodegradable materials honoring Mother Earth

**💡 Learning Tip:** Start with simple 3×3 pulli patterns and gradually increase complexity. Tell me how much time you have, and I'll suggest the perfect pattern for your practice session!

Which style calls to your artistic spirit today? 🌟`;
      messageCategory = 'tutorial';
      suggestions = ['I have 15 minutes', 'I have 1 hour', 'Show me beginner patterns', 'Festival designs'];
    }

    // Encouragement and mistakes
    else if (lowerInput.includes('mistake') || lowerInput.includes('wrong') || lowerInput.includes('difficult') || lowerInput.includes('hard')) {
      response = `💫 **Dear friend, let me share the wisdom of Kolam masters with you:**

**🌸 The Beauty of Imperfection**
In traditional Tamil philosophy, there's a beautiful concept: "Even the gods make mistakes, and that's what makes creation beautiful." Your Kolam doesn't need to be perfect - it needs to be yours.

**🙏 What Masters Say About Mistakes:**
• "Every 'mistake' teaches your hands something new"
• "A Kolam with love is more beautiful than a perfect one without heart"
• "The rice flour forgives - just smooth and try again"
• "Your grandmother's first Kolam was probably wobbly too!"

**✨ Practical Wisdom:**
• **Rice flour erases easily** - just brush gently and redraw
• **Start smaller** - master 3×3 before attempting 7×7
• **Practice daily** - even 5 minutes builds muscle memory
• **Focus on flow** - smooth motion matters more than perfect shapes

**🌺 Cultural Perspective:**
Traditional Kolam was drawn fresh every morning and swept away each evening. This taught our ancestors that beauty is temporary, practice is eternal, and tomorrow always brings a new chance to create something wonderful.

**🎨 Gentle Challenge:**
Try this: Draw the same simple pattern for 7 days straight. Watch how your hands learn, your confidence grows, and your joy increases. This is the traditional way of learning!

Remember: Every master was once a beginner who refused to give up. You're walking the same path as millions of women and men before you. You belong in this tradition! 🙏💕`;
      messageCategory = 'tips';
      suggestions = ['Show me easier patterns', 'Daily practice routine', 'How to hold the hand steady', 'Traditional learning methods'];
    }

    // Tips and techniques
    else if (lowerInput.includes('tip') || lowerInput.includes('technique') || lowerInput.includes('how to')) {
      response = `🎯 **Master Techniques from Traditional Kolam Gurus**

**✋ Hand Position & Movement:**
• Hold rice flour between thumb and index finger
• Let it flow like gentle rain, not forced drops
• Keep your wrist relaxed, let your whole arm move
• Breathe deeply - tension creates shaky lines

**📐 Perfect Dot Placement:**
• Use your palm width as a natural ruler
• Count "one-two-three" between dots for rhythm
• Start from center and work outward
• Check alignment by squinting - your eye will see imbalances

**🌊 Smooth Line Techniques:**
• Move your body, not just your hand
• Draw curves in one continuous motion
• If a line feels wrong, pause and start that section again
• Think of painting with air before touching the ground

**🧘 Traditional Meditation Method:**
• Begin each session with three deep breaths
• Visualize the completed pattern before starting
• Draw with gratitude for the rice, the tradition, and the moment
• End by touching the earth and saying "thank you"

**⏰ Time Management:**
• Morning practice (5-10 mins): Simple patterns for mindfulness
• Evening practice (15-30 mins): Learning new techniques
• Weekend sessions (1+ hour): Complex patterns and experimentation

**🌿 Sacred Materials:**
• Rice flour: Traditional and eco-friendly
• Rangoli powder: Vibrant colors for festivals
• Flower petals: Special occasions and offerings
• Sand/chalk: Practice materials for beginners

**🏠 Home Setup:**
• Clean, flat surface (traditionally swept ground)
• Good lighting (morning sunlight is ideal)
• Comfortable sitting or squatting position
• Small bowl of water nearby for corrections

The secret ingredient in every beautiful Kolam? Love and patience. These techniques will serve you well, but your heart makes each pattern unique! 🙏✨`;
      messageCategory = 'tips';
      suggestions = ['Morning routine setup', 'Advanced hand techniques', 'Materials and tools', 'Meditation aspects'];
    }

    // General encouragement and cultural connection
    else {
      response = `🙏 **Welcome to Your Kolam Learning Journey, ${username}!**

I'm delighted you're here! As your cultural guide, I'm excited to help you discover the profound beauty of Kolam art - a tradition that has brought joy, mindfulness, and community connection for over 5,000 years.

**✨ What Makes Kolam Special:**
• **Daily Meditation:** Each pattern is a mindful practice
• **Cultural Connection:** Links you to ancient Tamil traditions
• **Mathematical Beauty:** Sacred geometry in everyday art
• **Community Bonding:** Shared practice across generations
• **Spiritual Growth:** Inner peace through creative expression

**🎨 How I Can Help You:**
• **Time-Based Suggestions:** Tell me your available time, get perfect pattern recommendations
• **Step-by-Step Guidance:** Clear instructions for any skill level
• **Cultural Wisdom:** Stories, meanings, and traditions behind each design
• **Technique Mastery:** Tips from traditional masters and modern practitioners
• **Encouragement:** Support for your artistic journey, whatever your pace

**💡 Quick Start Ideas:**
• "I have 15 minutes" → Simple 3×3 pulli pattern
• "Show me festival designs" → Celebration-specific patterns
• "What's the history?" → Deep cultural background
• "I need tips" → Practical techniques and wisdom

**🌺 Remember:** Kolam is not about perfection - it's about connection. Connection to tradition, to community, to the present moment, and to the joy of creating something beautiful with your own hands.

What aspect of this magnificent tradition calls to you today? I'm here to guide every step of your journey! 🌟`;
      suggestions = ['I have 30 minutes', 'Show me cultural history', 'Beginner techniques', 'Festival patterns'];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions,
      category: messageCategory
    };
  }, [username]);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Force auto-scroll for new user messages
    setShouldAutoScroll(true);
    setShowScrollButton(false);

    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      // Ensure scroll to bottom after bot response
      setShouldAutoScroll(true);
    }, 1500);
  }, [generateBotResponse]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    sendMessage(suggestion);
  }, [sendMessage]);

  const handleQuickAction = useCallback((action: typeof quickActions[0]) => {
    sendMessage(action.prompt);
  }, [sendMessage]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  }, [inputMessage, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim()) {
        sendMessage(inputMessage);
      }
    }
  }, [inputMessage, sendMessage]);

  // Smart scroll behavior - track user's scroll position
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    
    const container = messagesContainerRef.current;
    const threshold = 50; // Reduced threshold for better responsiveness
    const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    const isNearBottom = scrollBottom <= threshold;
    
    // Update auto-scroll state only if user intentionally scrolled
    if (scrollBottom > threshold) {
      setShouldAutoScroll(false);
      setShowScrollButton(true);
    } else {
      setShouldAutoScroll(true);
      setShowScrollButton(false);
    }
  }, []);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
      setShouldAutoScroll(true);
      setShowScrollButton(false);
    }
  }, []);

  // Auto scroll only when user is near bottom or when they send a message
  useEffect(() => {
    if (shouldAutoScroll && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      // Use a small delay to ensure DOM has updated
      const timeoutId = setTimeout(() => {
        if (container && shouldAutoScroll) { // Double-check shouldAutoScroll hasn't changed
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages, shouldAutoScroll, isTyping]);

  // Initialize scroll listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Kolam Guru AI
              </h1>
              <p className="text-muted-foreground">Your Comprehensive Cultural Learning Companion</p>
            </div>
          </div>
          
          {/* User Progress Stats */}
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userProgress.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Learning Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{userProgress.streakDays}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{userProgress.skillLevel}</div>
              <div className="text-sm text-muted-foreground">Skill Level</div>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Master the sacred art of Kolam with personalized guidance, cultural wisdom, and comprehensive support from your AI cultural mentor
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Learning Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Learning Paths</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="learning-path-container">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Button
                      variant="outline"
                      className="learning-path-card w-full justify-start rounded-xl h-auto border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                      onClick={() => handleQuickAction(action)}
                    >
                      <div className="text-left w-full py-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="learning-path-icon w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                            <action.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{action.label}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-11">
                          {action.description}
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Skill Progress */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Skill Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                {skillCategories.map((skill, index) => (
                  <div key={index} className="skill-progress-item space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                        <span className="font-medium text-sm text-foreground">{skill.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border-primary/20">
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={skill.progress} className="h-2 bg-muted" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{skill.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cultural Wisdom Card */}
            <Card className="rounded-2xl border-0 shadow-lg bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-3 text-base">Daily Wisdom</h4>
                    <div className="wisdom-card-content">
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "The beauty of Kolam lies not in perfection, but in the love and devotion 
                        with which each line is drawn."
                      </p>
                      <p className="text-xs text-primary/70 mt-2 font-medium">
                        — Traditional Tamil wisdom
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="rounded-2xl border-0 shadow-lg h-[700px] flex flex-col relative">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-lg">Kolam Guru AI</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">
                          Advanced Cultural Learning Mode
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-hidden p-0">
                <div 
                  ref={messagesContainerRef}
                  className="h-full overflow-y-auto px-6 py-4 space-y-4"
                >
                  <AnimatePresence mode="popLayout">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex space-x-3 max-w-[85%] ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className={
                              message.type === 'user' 
                                ? 'bg-secondary text-secondary-foreground' 
                                : 'bg-gradient-to-br from-primary to-secondary text-white'
                            }>
                              {message.type === 'user' ? (
                                <User className="w-4 h-4" />
                              ) : (
                                <Bot className="w-4 h-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>

                          <div className="space-y-2">
                            {/* Message Content */}
                            <div className={`rounded-xl px-4 py-3 ${
                              message.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              {message.category && message.type === 'bot' && (
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline" className="text-xs rounded-full">
                                    {message.category}
                                  </Badge>
                                </div>
                              )}
                              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                {message.content}
                              </p>
                            </div>

                            {/* Message Actions */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{message.timestamp.toLocaleTimeString()}</span>
                              {message.type === 'bot' && (
                                <div className="flex items-center space-x-1">
                                  <Button variant="ghost" size="sm" className="h-6 px-2 rounded">
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 rounded">
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 rounded">
                                    <RefreshCw className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>

                            {/* Suggestions */}
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {message.suggestions.slice(0, 3).map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="rounded-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                                  >
                                    {suggestion}
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-xl px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                className="w-2 h-2 bg-primary rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                className="w-2 h-2 bg-primary rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                className="w-2 h-2 bg-primary rounded-full"
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Analyzing with cultural wisdom...
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Scroll to Bottom Button */}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute bottom-20 right-6 z-10"
                  >
                    <Button
                      onClick={scrollToBottom}
                      size="sm"
                      className="rounded-full shadow-lg"
                      title="Scroll to bottom"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Area */}
              <div className="flex-shrink-0 border-t border-border p-4">
                <form 
                  onSubmit={handleFormSubmit}
                  className="flex items-center space-x-3"
                >
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    className="rounded-xl"
                    title="Upload Kolam image for cultural analysis"
                  >
                    <Image className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about techniques, cultural stories, history, or request personalized guidance..."
                      className="rounded-xl pr-12"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    className="rounded-xl"
                    title="Voice input (coming soon)"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </form>

                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Powered by 5,000 years of cultural wisdom & modern AI</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>24/7 Available</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Crown className="w-3 h-3" />
                      <span>Cultural Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollFixKolamBot;