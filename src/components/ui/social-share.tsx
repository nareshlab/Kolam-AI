import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './dialog';
import { Input } from './input';
import { Textarea } from './textarea';
import { Badge } from './badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from "sonner@2.0.3";
import {
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Copy,
  Download,
  Link,
  Image as ImageIcon,
  CheckCircle,
  Sparkles,
  Heart,
  MessageCircle
} from 'lucide-react';

interface SocialShareProps {
  patternImage?: string;
  patternName?: string;
  patternData?: any;
  onDownload?: () => void;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  patternImage,
  patternName = "Beautiful Kolam Pattern",
  patternData,
  onDownload,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    `Check out this beautiful Kolam pattern I created! 🌺 #KolamArt #TraditionalArt #CreateWithKolamAI`
  );
  const [shareUrl, setShareUrl] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Generate share URL when dialog opens
  const generateShareUrl = () => {
    if (patternData) {
      const encodedData = btoa(JSON.stringify(patternData));
      const url = `${window.location.origin}${window.location.pathname}?pattern=${encodedData}`;
      setShareUrl(url);
      return url;
    }
    return window.location.href;
  };

  // Copy link to clipboard
  const copyLink = async () => {
    const url = shareUrl || generateShareUrl();
    try {
      // Add timeout protection for clipboard operations
      const clipboardPromise = navigator.clipboard.writeText(url);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Clipboard timeout')), 3000);
      });
      
      await Promise.race([clipboardPromise, timeoutPromise]);
      setShareSuccess('link');
      toast.success("Link copied to clipboard!", {
        description: "Share this link with your friends to show off your Kolam pattern!"
      });
      setTimeout(() => setShareSuccess(null), 2000);
    } catch (err) {
      console.warn('Clipboard operation failed:', err);
      toast.error("Failed to copy link", {
        description: "Please try again or copy the link manually."
      });
    }
  };

  // Download pattern as image
  const handleDownload = async () => {
    if (onDownload) {
      onDownload();
      toast.success("Pattern downloaded!", {
        description: "Your Kolam pattern has been saved to your device."
      });
    }
  };

  // Share to social platforms
  const shareToFacebook = () => {
    const url = shareUrl || generateShareUrl();
    const shareText = encodeURIComponent(customMessage);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${shareText}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setShareSuccess('facebook');
    setTimeout(() => setShareSuccess(null), 2000);
  };

  const shareToTwitter = () => {
    const url = shareUrl || generateShareUrl();
    const shareText = encodeURIComponent(customMessage);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setShareSuccess('twitter');
    setTimeout(() => setShareSuccess(null), 2000);
  };

  const shareToInstagram = async () => {
    try {
      // Instagram doesn't support direct URL sharing, so we'll copy the text and show instructions
      const clipboardPromise = navigator.clipboard.writeText(customMessage);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Clipboard timeout')), 3000);
      });
      
      await Promise.race([clipboardPromise, timeoutPromise]);
      
      toast.info("Text copied for Instagram!", {
        description: "Open Instagram, create a new post, and paste this caption with your Kolam image."
      });
      setShareSuccess('instagram');
      setTimeout(() => setShareSuccess(null), 2000);
    } catch (err) {
      console.warn('Instagram share failed:', err);
      toast.error("Failed to copy text", {
        description: "Please copy your caption manually when sharing to Instagram."
      });
    }
  };

  // Share via Web Share API if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        setIsSharing(true);
        
        // Add timeout protection for native sharing
        const sharePromise = navigator.share({
          title: patternName,
          text: customMessage,
          url: shareUrl || generateShareUrl()
        });
        
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Share timeout')), 5000);
        });
        
        await Promise.race([sharePromise, timeoutPromise]);
        
        toast.success("Shared successfully!", {
          description: "Your Kolam pattern has been shared!"
        });
      } catch (err) {
        console.warn('Native share failed:', err);
        if ((err as Error).name !== 'AbortError' && (err as Error).message !== 'Share timeout') {
          toast.error("Sharing failed", {
            description: "Please try using one of the platform-specific buttons."
          });
        }
      } finally {
        setIsSharing(false);
      }
    }
  };

  const platforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: shareToFacebook,
      description: 'Share on Facebook'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-400 hover:bg-blue-500',
      action: shareToTwitter,
      description: 'Tweet your pattern'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      action: shareToInstagram,
      description: 'Share on Instagram'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`rounded-xl ${className}`}
          onClick={() => {
            setIsOpen(true);
            generateShareUrl();
          }}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Pattern
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Share Your Kolam Creation</span>
          </DialogTitle>
          <DialogDescription>
            Share your beautiful Kolam pattern with friends and inspire others to create their own traditional art.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pattern Preview */}
          {patternImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square bg-white rounded-xl border overflow-hidden">
                <img
                  src={patternImage}
                  alt={patternName}
                  className="w-full h-full object-contain"
                />
              </div>
              <Badge className="absolute top-2 right-2 bg-primary/90 text-white">
                <Heart className="w-3 h-3 mr-1" />
                Your Creation
              </Badge>
            </motion.div>
          )}

          {/* Custom Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Customize your message:
            </label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="rounded-xl resize-none"
              rows={3}
              placeholder="Share something about your beautiful Kolam pattern..."
            />
            <p className="text-xs text-muted-foreground">
              {customMessage.length}/280 characters
            </p>
          </div>

          {/* Native Share (if supported) */}
          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              disabled={isSharing}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {isSharing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sharing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </div>
              )}
            </Button>
          )}

          {/* Social Platform Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Share on social media:</h4>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={platform.action}
                    className={`w-full h-auto py-3 px-2 text-white rounded-xl ${platform.color} relative overflow-hidden`}
                    title={platform.description}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <platform.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{platform.name}</span>
                    </div>
                    
                    <AnimatePresence>
                      {shareSuccess === platform.name.toLowerCase() && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute inset-0 bg-green-500/90 flex items-center justify-center"
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground">More options:</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={copyLink}
                variant="outline"
                className="rounded-xl relative overflow-hidden"
              >
                <div className="flex items-center space-x-2">
                  <Link className="w-4 h-4" />
                  <span>Copy Link</span>
                </div>
                
                <AnimatePresence>
                  {shareSuccess === 'link' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute inset-0 bg-green-500/90 flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              <Button
                onClick={handleDownload}
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Share Link Preview */}
          {shareUrl && (
            <div className="space-y-2 pt-4 border-t border-border">
              <label className="text-sm font-medium text-foreground">
                Share link:
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="rounded-xl text-xs"
                />
                <Button
                  onClick={copyLink}
                  variant="outline"
                  size="sm"
                  className="rounded-lg flex-shrink-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Sharing Stats */}
          <div className="bg-muted/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Share and inspire others to create!</span>
              </div>
              <Badge variant="outline" className="text-xs">
                +25 pts for sharing
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShare;