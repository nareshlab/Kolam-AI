import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from "sonner@2.0.3";
import { useAccessibility } from '../context/AccessibilityContext';
import SocialShare from '../ui/social-share';
import { 
  Grid3X3, 
  Download, 
  Undo, 
  Redo, 
  RotateCw, 
  Palette, 
  Zap,
  Eye,
  Share,
  Settings,
  RotateCcw,
  Circle,
  Minus,
  Waves,
  Link,
  FileText,
  Image,
  Trash2,
  RefreshCw,
  ChevronDown
} from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface GridDot {
  x: number;
  y: number;
  row: number;
  col: number;
}

interface DrawingAction {
  type: 'dot' | 'line' | 'curve';
  points: Point[];
  color: string;
  timestamp: number;
}

interface GeneratorPageProps {
  preloadedPattern?: any;
}

const GeneratorPage: React.FC<GeneratorPageProps> = ({ preloadedPattern }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  // Grid and canvas state
  const [gridSize, setGridSize] = useState([9]);
  const [customGrid, setCustomGrid] = useState(false);
  const [customGridRows, setCustomGridRows] = useState('3,5,7,5,3');
  const [gridDots, setGridDots] = useState<GridDot[]>([]);
  
  // Drawing state
  const [activeTool, setActiveTool] = useState('dot');
  const [colorScheme, setColorScheme] = useState('traditional');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  
  // Canvas history for undo/redo
  const [drawingHistory, setDrawingHistory] = useState<DrawingAction[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Ref to store canvas state for efficient live drawing
  const canvasStateRef = useRef<ImageData | null>(null);

  // Symmetry and display
  const [symmetryType, setSymmetryType] = useState('none');
  const [showGrid, setShowGrid] = useState(true);
  const [showSymmetryLines, setShowSymmetryLines] = useState(false);
  
  // Pattern properties
  const [patternStats, setPatternStats] = useState({
    dots: 0,
    lines: 0,
    curves: 0,
    complexity: 'Beginner'
  });
  
  // UI state
  const [quickStartOpen, setQuickStartOpen] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);

  const tools = [
    { id: 'dot', name: 'Dot', icon: Circle, description: 'Place individual dots' },
    { id: 'line', name: 'Line', icon: Minus, description: 'Draw straight lines between points' },
    { id: 'curve', name: 'Curve', icon: Waves, description: 'Draw smooth flowing curves' }
  ];

  const colorSchemes = [
    { id: 'traditional', name: 'Traditional White', colors: ['#c41e3a', '#FFFFFF', '#F5F5F5'] },
    { id: 'festival', name: 'Festival Colors', colors: ['#FF6B35', '#F7931E', '#FFD23F'] },
    { id: 'natural', name: 'Natural Earth', colors: ['#8B4513', '#D2691E', '#F4A460'] },
    { id: 'modern', name: 'Modern Palette', colors: ['#6366F1', '#8B5CF6', '#EC4899'] }
  ];

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      setCanvasContext(ctx);
      
      // Set high DPI
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx?.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    }
  }, []);

  // Load preloaded pattern
  useEffect(() => {
    if (preloadedPattern && canvasContext) {
      const settings = preloadedPattern.gridSettings || {};
      
      // Apply grid settings
      if (settings.customGrid !== undefined) {
        setCustomGrid(settings.customGrid);
      }
      if (settings.customGridRows) {
        setCustomGridRows(settings.customGridRows);
      }
      if (settings.symmetryType) {
        setSymmetryType(settings.symmetryType);
      }
      if (settings.showGrid !== undefined) {
        setShowGrid(settings.showGrid);
      }
      if (settings.colorScheme) {
        setColorScheme(settings.colorScheme);
      }
      
      // Load drawing history
      if (preloadedPattern.drawingHistory) {
        setDrawingHistory(preloadedPattern.drawingHistory);
        setHistoryIndex(preloadedPattern.drawingHistory.length - 1);
      }
      
      // Show success toast
      toast.success(`${preloadedPattern.name || 'Pattern'} loaded successfully!`, {
        description: "The traditional Kolam pattern has been generated on your canvas."
      });
      
      // Add a slight delay to ensure canvas is ready
      setTimeout(() => {
        redrawCanvas();
      }, 100);
    }
  }, [preloadedPattern, canvasContext]);

  // Generate grid dots based on current settings
  const generateGridDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return [];

    const rect = canvas.getBoundingClientRect();
    const dots: GridDot[] = [];

    if (customGrid) {
      const rows = customGridRows.split(',').map(n => parseInt(n.trim()) || 0).filter(n => n > 0);
      const totalHeight = rect.height * 0.8;
      const rowSpacing = totalHeight / (rows.length + 1);
      
      rows.forEach((dotsInRow, rowIndex) => {
        const y = rowSpacing * (rowIndex + 1);
        const totalWidth = rect.width * 0.8;
        const colSpacing = totalWidth / (dotsInRow + 1);
        const startX = (rect.width - totalWidth) / 2;
        
        for (let col = 0; col < dotsInRow; col++) {
          const x = startX + colSpacing * (col + 1);
          dots.push({ x, y, row: rowIndex, col });
        }
      });
    } else {
      const size = gridSize[0];
      const spacing = Math.min(rect.width, rect.height) * 0.8 / (size + 1);
      const startX = (rect.width - spacing * (size - 1)) / 2;
      const startY = (rect.height - spacing * (size - 1)) / 2;

      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          dots.push({
            x: startX + col * spacing,
            y: startY + row * spacing,
            row,
            col
          });
        }
      }
    }

    return dots;
  }, [customGrid, customGridRows, gridSize]);

  // Update grid dots when settings change
  useEffect(() => {
    const dots = generateGridDots();
    setGridDots(dots);
    redrawCanvas();
  }, [customGrid, customGridRows, gridSize, generateGridDots]);

  // Find nearest dot to a point
  const findNearestDot = (point: Point): GridDot | null => {
    let nearest: GridDot | null = null;
    let minDistance = Infinity;
    const threshold = 20; // Maximum distance to snap to dot

    gridDots.forEach(dot => {
      const distance = Math.sqrt(Math.pow(point.x - dot.x, 2) + Math.pow(point.y - dot.y, 2));
      if (distance < threshold && distance < minDistance) {
        minDistance = distance;
        nearest = dot;
      }
    });

    return nearest;
  };

  // Apply symmetry to a point
  const applySymmetry = (point: Point, canvasWidth: number, canvasHeight: number): Point[] => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const points: Point[] = [point];

    switch (symmetryType) {
      case 'horizontal':
        points.push({ x: point.x, y: canvasHeight - point.y });
        break;
      case 'vertical':
        points.push({ x: canvasWidth - point.x, y: point.y });
        break;
      case 'radial':
        // 4-fold radial symmetry
        points.push(
          { x: canvasWidth - point.x, y: point.y },
          { x: point.x, y: canvasHeight - point.y },
          { x: canvasWidth - point.x, y: canvasHeight - point.y }
        );
        break;
      case 'radial8':
        // 8-fold radial symmetry
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        for (let i = 1; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const newX = centerX + (dx * cos - dy * sin);
          const newY = centerY + (dx * sin + dy * cos);
          points.push({ x: newX, y: newY });
        }
        break;
    }

    return points;
  };

  // Draw grid and symmetry lines
  const drawGridAndSymmetry = () => {
    const canvas = canvasRef.current;
    const ctx = canvasContext;
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();

    // Draw grid dots
    if (showGrid) {
      ctx.fillStyle = '#e5e7eb';
      gridDots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw symmetry lines
    if (showSymmetryLines) {
      ctx.strokeStyle = '#d4af37'; // Gold accent color
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      switch (symmetryType) {
        case 'horizontal':
          ctx.beginPath();
          ctx.moveTo(0, centerY);
          ctx.lineTo(rect.width, centerY);
          ctx.stroke();
          break;
        case 'vertical':
          ctx.beginPath();
          ctx.moveTo(centerX, 0);
          ctx.lineTo(centerX, rect.height);
          ctx.stroke();
          break;
        case 'radial':
        case 'radial8':
          ctx.beginPath();
          ctx.moveTo(0, centerY);
          ctx.lineTo(rect.width, centerY);
          ctx.moveTo(centerX, 0);
          ctx.lineTo(centerX, rect.height);
          ctx.stroke();
          
          if (symmetryType === 'radial8') {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(rect.width, rect.height);
            ctx.moveTo(rect.width, 0);
            ctx.lineTo(0, rect.height);
            ctx.stroke();
          }
          break;
      }
      
      ctx.setLineDash([]);
    }
  };

  // Redraw entire canvas
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvasContext;
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw grid and symmetry lines
    drawGridAndSymmetry();

    // Replay drawing history
    const currentScheme = colorSchemes.find(s => s.id === colorScheme);
    const color = currentScheme?.colors[0] || '#c41e3a';

    drawingHistory.slice(0, historyIndex + 1).forEach(action => {
      if (action.type === 'dot' && action.points.length > 0) {
        const symmetryPoints = applySymmetry(action.points[0], rect.width, rect.height);
        ctx.fillStyle = action.color;
        symmetryPoints.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
          ctx.fill();
        });
      } else if (action.type === 'line' && action.points.length >= 2) {
        // Draw straight lines for line tool
        const startPoint = action.points[0];
        const endPoint = action.points[action.points.length - 1];
        
        const symmetryStart = applySymmetry(startPoint, rect.width, rect.height);
        const symmetryEnd = applySymmetry(endPoint, rect.width, rect.height);
        
        ctx.strokeStyle = action.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        for (let j = 0; j < symmetryStart.length; j++) {
          ctx.beginPath();
          ctx.moveTo(symmetryStart[j].x, symmetryStart[j].y);
          ctx.lineTo(symmetryEnd[j].x, symmetryEnd[j].y);
          ctx.stroke();
        }
      } else if (action.type === 'curve' && action.points.length > 1) {
        // Draw curved lines for curve tool
        ctx.strokeStyle = action.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        for (let i = 0; i < action.points.length - 1; i++) {
          const symmetryPoints1 = applySymmetry(action.points[i], rect.width, rect.height);
          const symmetryPoints2 = applySymmetry(action.points[i + 1], rect.width, rect.height);
          
          for (let j = 0; j < symmetryPoints1.length; j++) {
            ctx.beginPath();
            ctx.moveTo(symmetryPoints1[j].x, symmetryPoints1[j].y);
            ctx.lineTo(symmetryPoints2[j].x, symmetryPoints2[j].y);
            ctx.stroke();
          }
        }
      }
    });

    // Update pattern statistics
    updatePatternStats();
    
    // Save the current canvas state for live drawing optimization
    if (!isDrawing) {
      setTimeout(() => saveCanvasState(), 0);
    }
  };

  // Get pattern data for sharing
  const getPatternData = () => {
    return {
      history: drawingHistory.slice(0, historyIndex + 1),
      settings: {
        gridSize: gridSize[0],
        customGrid,
        customGridRows,
        symmetryType,
        colorScheme,
        showGrid,
        showSymmetryLines
      },
      stats: patternStats,
      name: `${patternStats.complexity} ${
        patternStats.dots > patternStats.lines ? 'Pulli Kolam' : 
        symmetryType === 'radial8' ? 'Mandala Style' : 'Geometric Pattern'
      }`,
      timestamp: Date.now()
    };
  };

  // Update pattern statistics
  const updatePatternStats = () => {
    const dots = drawingHistory.filter(action => action.type === 'dot').length;
    const lines = drawingHistory.filter(action => action.type === 'line').length;
    const curves = drawingHistory.filter(action => action.type === 'curve').length;
    
    let complexity = 'Beginner';
    const totalElements = dots + lines + curves;
    if (totalElements > 20) complexity = 'Advanced';
    else if (totalElements > 10) complexity = 'Intermediate';

    setPatternStats({ dots, lines, curves, complexity });
  };

  // Add action to history
  const addToHistory = (action: DrawingAction) => {
    const newHistory = drawingHistory.slice(0, historyIndex + 1);
    newHistory.push(action);
    setDrawingHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    redrawCanvas();
  };

  // Undo functionality
  const undo = () => {
    if (historyIndex >= 0) {
      setHistoryIndex(historyIndex - 1);
      redrawCanvas();
    }
  };

  // Redo functionality
  const redo = () => {
    if (historyIndex < drawingHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      redrawCanvas();
    }
  };

  // Clear canvas
  const clearCanvas = () => {
    setDrawingHistory([]);
    setHistoryIndex(-1);
    redrawCanvas();
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    if (activeTool === 'dot') {
      const nearestDot = findNearestDot(point);
      const targetPoint = nearestDot ? { x: nearestDot.x, y: nearestDot.y } : point;
      
      const currentScheme = colorSchemes.find(s => s.id === colorScheme);
      const color = currentScheme?.colors[0] || '#c41e3a';
      
      addToHistory({
        type: 'dot',
        points: [targetPoint],
        color,
        timestamp: Date.now()
      });
    } else if (activeTool === 'line') {
      setIsDrawing(true);
      const nearestDot = findNearestDot(point);
      const startPointValue = nearestDot ? { x: nearestDot.x, y: nearestDot.y } : point;
      setStartPoint(startPointValue);
      setCurrentPath([startPointValue]);
      saveCanvasState(); // Save the canvas state before drawing
    } else if (activeTool === 'curve') {
      setIsDrawing(true);
      const nearestDot = findNearestDot(point);
      const startPointValue = nearestDot ? { x: nearestDot.x, y: nearestDot.y } : point;
      setCurrentPath([startPointValue]);
      saveCanvasState(); // Save the canvas state before drawing
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    // Work directly with the canvas context for immediate rendering
    // Don't wait for React state updates
    if (activeTool === 'line') {
      // For line tool, create direct path and render immediately
      const directPath = [currentPath[0], point];
      drawLivePreviewOptimized(directPath);
      
      // Update state asynchronously (for final storage on mouseup)
      setCurrentPath(directPath);
    } else if (activeTool === 'curve') {
      // For curve tool, create direct path and render immediately
      const directPath = [...currentPath, point];
      drawLivePreviewOptimized(directPath);
      
      // Update state asynchronously (for final storage on mouseup)
      setCurrentPath(directPath);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 1) {
      const currentScheme = colorSchemes.find(s => s.id === colorScheme);
      const color = currentScheme?.colors[0] || '#c41e3a';
      
      if (activeTool === 'line') {
        // For line tool, create straight line from start to end
        const endPoint = currentPath[currentPath.length - 1];
        const nearestEndDot = findNearestDot(endPoint);
        const finalEndPoint = nearestEndDot ? { x: nearestEndDot.x, y: nearestEndDot.y } : endPoint;
        
        addToHistory({
          type: 'line',
          points: [currentPath[0], finalEndPoint],
          color,
          timestamp: Date.now()
        });
      } else if (activeTool === 'curve') {
        // For curve tool, use all points for smooth curve
        addToHistory({
          type: 'curve',
          points: currentPath,
          color,
          timestamp: Date.now()
        });
      }
    }

    setIsDrawing(false);
    setCurrentPath([]);
    setStartPoint(null);
    
    // Redraw canvas to remove the temporary preview and show final result
    setTimeout(() => redrawCanvas(), 0);
  };

  // Export functions
  const exportAsPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'kolam-pattern.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const exportAsSVG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let svg = `<svg width="${rect.width}" height="${rect.height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Add background
    svg += `<rect width="100%" height="100%" fill="white"/>`;
    
    // Add drawing actions
    drawingHistory.slice(0, historyIndex + 1).forEach(action => {
      if (action.type === 'dot' && action.points.length > 0) {
        const symmetryPoints = applySymmetry(action.points[0], rect.width, rect.height);
        symmetryPoints.forEach(point => {
          svg += `<circle cx="${point.x}" cy="${point.y}" r="6" fill="${action.color}"/>`;
        });
      } else if (action.type === 'line' && action.points.length >= 2) {
        const startPoint = action.points[0];
        const endPoint = action.points[action.points.length - 1];
        const symmetryStart = applySymmetry(startPoint, rect.width, rect.height);
        const symmetryEnd = applySymmetry(endPoint, rect.width, rect.height);
        
        for (let j = 0; j < symmetryStart.length; j++) {
          svg += `<line x1="${symmetryStart[j].x}" y1="${symmetryStart[j].y}" x2="${symmetryEnd[j].x}" y2="${symmetryEnd[j].y}" stroke="${action.color}" stroke-width="3" stroke-linecap="round"/>`;
        }
      } else if (action.type === 'curve' && action.points.length > 1) {
        for (let i = 0; i < action.points.length - 1; i++) {
          const symmetryPoints1 = applySymmetry(action.points[i], rect.width, rect.height);
          const symmetryPoints2 = applySymmetry(action.points[i + 1], rect.width, rect.height);
          
          for (let j = 0; j < symmetryPoints1.length; j++) {
            svg += `<line x1="${symmetryPoints1[j].x}" y1="${symmetryPoints1[j].y}" x2="${symmetryPoints2[j].x}" y2="${symmetryPoints2[j].y}" stroke="${action.color}" stroke-width="3" stroke-linecap="round"/>`;
          }
        }
      }
    });
    
    svg += '</svg>';
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'kolam-pattern.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    // Generate SVG first, then convert to PDF-like format
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // For now, export as high-resolution PNG for PDF compatibility
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    // Set high resolution for print quality
    tempCanvas.width = 2480; // A4 at 300 DPI
    tempCanvas.height = 3508;
    
    // Scale and redraw
    const scaleX = tempCanvas.width / canvas.width;
    const scaleY = tempCanvas.height / canvas.height;
    const scale = Math.min(scaleX, scaleY);
    
    tempCtx.fillStyle = '#ffffff';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.scale(scale, scale);
    tempCtx.drawImage(canvas, 0, 0);
    
    const link = document.createElement('a');
    link.download = 'kolam-pattern-print.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const sharePattern = () => {
    const patternData = {
      history: drawingHistory.slice(0, historyIndex + 1),
      settings: {
        gridSize: gridSize[0],
        customGrid,
        customGridRows,
        symmetryType,
        colorScheme
      }
    };
    
    const encodedData = btoa(JSON.stringify(patternData));
    const shareUrl = `${window.location.origin}${window.location.pathname}?pattern=${encodedData}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Pattern link copied to clipboard!', {
        description: "Share this link with others to show your Kolam creation."
      });
    });
  };

  // Get pattern image for sharing
  const getPatternImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return '';
    try {
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.warn('Failed to generate pattern image:', error);
      return '';
    }
  };

  // Restore canvas state and draw live preview (optimized)
  const drawLivePreviewOptimized = (previewPath: Point[]) => {
    if (!isDrawing || previewPath.length === 0 || !canvasStateRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvasContext;
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const currentScheme = colorSchemes.find(s => s.id === colorScheme);
    const color = currentScheme?.colors[0] || '#c41e3a';

    // Restore the saved canvas state (much faster than redrawing everything)
    ctx.putImageData(canvasStateRef.current, 0, 0);

    // Draw only the live preview on top
    if (activeTool === 'line' && previewPath.length >= 2) {
      // Draw temporary line
      const startPoint = previewPath[0];
      const endPoint = previewPath[previewPath.length - 1];
      
      const symmetryStart = applySymmetry(startPoint, rect.width, rect.height);
      const symmetryEnd = applySymmetry(endPoint, rect.width, rect.height);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.7; // Make preview slightly transparent
      
      for (let j = 0; j < symmetryStart.length; j++) {
        ctx.beginPath();
        ctx.moveTo(symmetryStart[j].x, symmetryStart[j].y);
        ctx.lineTo(symmetryEnd[j].x, symmetryEnd[j].y);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1.0; // Reset opacity
    } else if (activeTool === 'curve' && previewPath.length > 1) {
      // Draw temporary curve
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.7; // Make preview slightly transparent
      
      for (let i = 0; i < previewPath.length - 1; i++) {
        const symmetryPoints1 = applySymmetry(previewPath[i], rect.width, rect.height);
        const symmetryPoints2 = applySymmetry(previewPath[i + 1], rect.width, rect.height);
        
        for (let j = 0; j < symmetryPoints1.length; j++) {
          ctx.beginPath();
          ctx.moveTo(symmetryPoints1[j].x, symmetryPoints1[j].y);
          ctx.lineTo(symmetryPoints2[j].x, symmetryPoints2[j].y);
          ctx.stroke();
        }
      }
      
      ctx.globalAlpha = 1.0; // Reset opacity
    }
  };

  // Save canvas state before starting live drawing
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    const ctx = canvasContext;
    if (!ctx || !canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    canvasStateRef.current = ctx.getImageData(0, 0, rect.width, rect.height);
  };

  // Quick start patterns with actual pattern generation
  const quickStartPatterns = [
    {
      name: 'Simple Pulli',
      description: 'Basic 5x5 dot pattern',
      generate: () => {
        clearCanvas();
        setGridSize([5]);
        setCustomGrid(false);
        setSymmetryType('none');
        
        // Generate sample dots for Simple Pulli
        setTimeout(() => {
          const dots = generateGridDots();
          const color = colorSchemes.find(s => s.id === colorScheme)?.colors[0] || '#c41e3a';
          
          // Add some dots to demonstrate the pattern
          const sampleDots = dots.filter((_, index) => index % 3 === 0);
          sampleDots.forEach((dot, index) => {
            setTimeout(() => {
              addToHistory({
                type: 'dot',
                points: [{ x: dot.x, y: dot.y }],
                color,
                timestamp: Date.now() + index
              });
            }, index * 100);
          });
        }, 100);
      }
    },
    {
      name: 'Flower Kolam',
      description: 'Radial flower design',
      generate: () => {
        clearCanvas();
        setGridSize([7]);
        setCustomGrid(false);
        setSymmetryType('radial8');
        
        // Generate flower pattern
        setTimeout(() => {
          const color = colorSchemes.find(s => s.id === colorScheme)?.colors[0] || '#c41e3a';
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const rect = canvas.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Add center dot
          addToHistory({
            type: 'dot',
            points: [{ x: centerX, y: centerY }],
            color,
            timestamp: Date.now()
          });
          
          // Add petal lines
          setTimeout(() => {
            addToHistory({
              type: 'line',
              points: [
                { x: centerX, y: centerY },
                { x: centerX, y: centerY - 80 }
              ],
              color,
              timestamp: Date.now()
            });
          }, 200);
        }, 100);
      }
    },
    {
      name: 'Diamond Grid',
      description: 'Custom diamond shape',
      generate: () => {
        clearCanvas();
        setCustomGrid(true);
        setCustomGridRows('1,3,5,7,5,3,1');
        setSymmetryType('vertical');
      }
    },
    {
      name: 'Star Pattern',
      description: '8-fold symmetric star',
      generate: () => {
        clearCanvas();
        setGridSize([9]);
        setCustomGrid(false);
        setSymmetryType('radial8');
        
        // Generate star pattern
        setTimeout(() => {
          const color = colorSchemes.find(s => s.id === colorScheme)?.colors[0] || '#c41e3a';
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const rect = canvas.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Add center dot
          addToHistory({
            type: 'dot',
            points: [{ x: centerX, y: centerY }],
            color,
            timestamp: Date.now()
          });
          
          // Add star rays
          setTimeout(() => {
            addToHistory({
              type: 'line',
              points: [
                { x: centerX, y: centerY },
                { x: centerX + 60, y: centerY - 60 }
              ],
              color,
              timestamp: Date.now()
            });
          }, 200);
        }, 100);
      }
    }
  ];

  // Redraw when settings change
  useEffect(() => {
    redrawCanvas();
  }, [showGrid, showSymmetryLines, symmetryType, colorScheme, drawingHistory, historyIndex]);

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
            {currentLang.generator.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentLang.generator.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Drawing Tools */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <span>Drawing Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={activeTool === tool.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTool(tool.id)}
                      className="flex flex-col items-center space-y-1 h-auto py-3 rounded-xl"
                      title={tool.description}
                    >
                      <tool.icon className="w-4 h-4" />
                      <span className="text-xs">{tool.name}</span>
                    </Button>
                  ))}
                </div>

                {/* Color Scheme */}
                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <Select value={colorScheme} onValueChange={setColorScheme}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorSchemes.map((scheme) => (
                        <SelectItem key={scheme.id} value={scheme.id}>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {scheme.colors.slice(0, 3).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span>{scheme.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Grid Settings */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Grid3X3 className="w-5 h-5 text-primary" />
                  <span>Grid Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="custom-grid">Custom Grid</Label>
                    <Switch
                      id="custom-grid"
                      checked={customGrid}
                      onCheckedChange={setCustomGrid}
                    />
                  </div>
                  
                  {customGrid ? (
                    <div className="space-y-2">
                      <Label>Dots per Row</Label>
                      <Input
                        value={customGridRows}
                        onChange={(e) => setCustomGridRows(e.target.value)}
                        placeholder="e.g., 2,3,5,3,2"
                        className="rounded-xl"
                      />
                      <p className="text-xs text-muted-foreground">
                        Comma-separated numbers for each row
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>Grid Size: {gridSize[0]}×{gridSize[0]}</Label>
                      <Slider
                        value={gridSize}
                        onValueChange={setGridSize}
                        max={15}
                        min={5}
                        step={2}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Symmetry Type</Label>
                  <Select value={symmetryType} onValueChange={setSymmetryType}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Symmetry</SelectItem>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="vertical">Vertical</SelectItem>
                      <SelectItem value="radial">Radial (4-fold)</SelectItem>
                      <SelectItem value="radial8">Radial (8-fold)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-grid">Show Grid</Label>
                    <Switch
                      id="show-grid"
                      checked={showGrid}
                      onCheckedChange={setShowGrid}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-symmetry">Symmetry Lines</Label>
                    <Switch
                      id="show-symmetry"
                      checked={showSymmetryLines}
                      onCheckedChange={setShowSymmetryLines}
                    />
                  </div>
                </div>

                {/* Grid Actions */}
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-xl"
                      onClick={clearCanvas}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-xl"
                      onClick={() => {
                        clearCanvas();
                        const dots = generateGridDots();
                        setGridDots(dots);
                        redrawCanvas();
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reset Grid
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Start */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Quick Start</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={quickStartOpen} onOpenChange={setQuickStartOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-xl">
                      Choose Pattern Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Pattern Templates</DialogTitle>
                      <DialogDescription>
                        Choose a template to start creating your Kolam pattern
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {quickStartPatterns.map((pattern, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 rounded-xl"
                          onClick={() => {
                            pattern.generate();
                            setQuickStartOpen(false);
                          }}
                        >
                          <div className="text-center">
                            <div className="font-medium text-sm">{pattern.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {pattern.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>

          {/* Canvas Area */}
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
                    <Grid3X3 className="w-5 h-5 text-primary" />
                    <span>Drawing Canvas</span>
                  </CardTitle>
                  
                  {/* Canvas Controls */}
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl"
                      onClick={undo}
                      disabled={historyIndex < 0}
                      title="Undo"
                    >
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl"
                      onClick={redo}
                      disabled={historyIndex >= drawingHistory.length - 1}
                      title="Redo"
                    >
                      <Redo className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={600}
                    className="w-full max-w-lg mx-auto border rounded-xl bg-white shadow-inner cursor-crosshair"
                    style={{ aspectRatio: '1' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />
                  
                  {/* Canvas Overlay Info */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                    {customGrid ? 'Custom Grid' : `${gridSize[0]}×${gridSize[0]} Grid`} • {symmetryType === 'none' ? 'No' : symmetryType} symmetry
                  </div>
                  
                  {/* Tool Info */}
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-2 rounded-lg text-sm">
                    {tools.find(t => t.id === activeTool)?.name} Tool
                  </div>
                  
                  {/* Drawing Instructions */}
                  {drawingHistory.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="bg-muted/90 rounded-xl p-8 text-center max-w-sm">
                        <Grid3X3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium text-foreground mb-2">
                          Start Creating Your Kolam
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Click to place dots, drag to draw lines or curves. Use symmetry for traditional patterns.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Canvas Actions */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="rounded-xl">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={exportAsPNG}>
                          <Image className="w-4 h-4 mr-2" />
                          PNG Image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={exportAsSVG}>
                          <FileText className="w-4 h-4 mr-2" />
                          SVG Vector
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={exportAsPDF}>
                          <FileText className="w-4 h-4 mr-2" />
                          PDF Print
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={sharePattern}>
                          <Link className="w-4 h-4 mr-2" />
                          Share Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Social Share Component */}
                    {drawingHistory.length > 0 && (
                      <SocialShare
                        patternImage={getPatternImage()}
                        patternName={getPatternData().name}
                        patternData={getPatternData()}
                        onDownload={exportAsPNG}
                        className="ml-2"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Properties Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Pattern Properties */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span>Pattern Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Dots</div>
                    <div className="font-medium">{patternStats.dots}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Lines</div>
                    <div className="font-medium">{patternStats.lines}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Curves</div>
                    <div className="font-medium">{patternStats.curves}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Symmetry</div>
                    <div className="font-medium">
                      {symmetryType === 'none' ? 'None' : 
                       symmetryType === 'radial' ? '4-fold' :
                       symmetryType === 'radial8' ? '8-fold' : symmetryType}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Complexity</div>
                  <Badge variant="outline" className="text-xs rounded-full">
                    {patternStats.complexity}
                  </Badge>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Pattern Type</div>
                  <div className="font-medium">
                    {patternStats.dots > patternStats.lines ? 'Pulli Kolam' : 
                     symmetryType === 'radial8' ? 'Mandala Style' : 'Geometric Pattern'}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Cultural Context</div>
                  <p className="text-sm text-foreground">
                    {patternStats.complexity === 'Beginner' ? 
                      'Simple daily morning pattern for welcoming prosperity.' :
                      patternStats.complexity === 'Intermediate' ?
                      'Traditional festival design with cultural significance.' :
                      'Complex ceremonial pattern used in special occasions.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="rounded-2xl border-0 shadow-lg bg-accent/10">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Pro Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      {activeTool === 'dot' ? 
                        "Click near grid dots to snap perfectly. Use symmetry for traditional patterns." :
                        activeTool === 'line' ?
                        "Draw perfect straight lines between points. Lines snap to grid dots for precision." :
                        "Create flowing curves by dragging. Perfect for organic Kolam designs."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;