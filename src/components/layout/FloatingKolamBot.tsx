import React, { useState, useCallback, memo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAccessibility } from '../context/AccessibilityContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles,
  HelpCircle,
  BookOpen,
  Palette,
  Grid3X3
} from 'lucide-react';

interface FloatingKolamBotProps {
  onPageChange?: (page: string) => void;
}

const FloatingKolamBot: React.FC<FloatingKolamBotProps> = memo(({ onPageChange }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const quickActions = React.useMemo(() => [
    {
      label: 'Open Full Chat',
      icon: MessageCircle,
      action: () => {
        onPageChange?.('bot');
        setIsOpen(false);
      }
    },
    {
      label: 'Pattern Generator',
      icon: Grid3X3,
      action: () => {
        onPageChange?.('generator');
        setIsOpen(false);
      }
    },
    {
      label: 'Learn Kolam',
      icon: BookOpen,
      action: () => {
        onPageChange?.('courses');
        setIsOpen(false);
      }
    },
    {
      label: 'Cultural Info',
      icon: Palette,
      action: () => {
        onPageChange?.('metadata');
        setIsOpen(false);
      }
    }
  ], [onPageChange]);

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      // Redirect to the full bot page instead of handling inline
      onPageChange?.('bot');
      setIsOpen(false);
      // You could also pass the message as a parameter if needed
    }
  }, [message, onPageChange]);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          onClick={handleToggle}
          className="floating-bot-button w-14 h-14 rounded-full hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 group relative overflow-hidden"
          size="lg"
          aria-label={isOpen ? "Close Kolam Bot" : "Open Kolam Bot"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.div>
          
          {/* Pulse animation ring */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          )}
        </Button>
        
        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-card border border-border rounded-lg px-3 py-1 shadow-lg whitespace-nowrap"
            >
              <span className="text-sm text-foreground">Need help? Ask Kolam Bot!</span>
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-card border-r border-b border-border rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={handleClose}
            />
            
            {/* Chat Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] md:w-96"
            >
              <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
                {/* Header */}
                <CardHeader className="bg-gradient-to-r from-primary to-secondary p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">Kolam Bot</CardTitle>
                        <p className="text-white/80 text-sm">Your AI Kolam Assistant</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClose}
                      className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
                      aria-label="Close chat"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Quick Actions */}
                  <div className="p-4 border-b border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2 text-primary" />
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={action.action}
                          className="justify-start rounded-xl h-10"
                        >
                          <action.icon className="w-4 h-4 mr-2" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-64 overflow-y-auto p-4 space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-md p-3 max-w-[80%]">
                        <p className="text-sm text-foreground">
                          Hello! I'm your Kolam AI assistant. I can help you with:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>• Creating beautiful Kolam patterns</li>
                          <li>• Learning traditional techniques</li>
                          <li>• Understanding cultural significance</li>
                          <li>• Getting design inspiration</li>
                        </ul>
                        <p className="text-sm text-foreground mt-2">
                          How can I help you today?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask me about Kolam patterns..."
                        className="flex-1 px-3 py-2 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        onKeyPress={handleKeyPress}
                        maxLength={500}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="rounded-xl px-4"
                        size="sm"
                        aria-label="Send message"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Press Enter to send • Powered by Kolam AI
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

FloatingKolamBot.displayName = 'FloatingKolamBot';

export default FloatingKolamBot;