import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  BookOpen,
  PlayCircle,
  Clock,
  Star,
  Users,
  Download,
  CheckCircle,
  Lock,
  Unlock,
  Award,
  Target,
  Palette,
  Grid3X3,
  Flower,
  Heart,
  Crown,
  Sparkles,
  ChevronRight,
  Video,
  FileText,
  Image,
  Calendar,
  TrendingUp,
  Eye,
  Coins,
  User,
  Trophy
} from 'lucide-react';

interface CoursesPageProps {
  onPageChange?: (page: string, data?: any) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ onPageChange }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userProgress, setUserProgress] = useState({
    totalPoints: 2485,
    completedCourses: 3,
    inProgressCourses: 2
  });

  const courseCategories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'beginner', name: 'Beginner', icon: Star },
    { id: 'intermediate', name: 'Intermediate', icon: Target },
    { id: 'advanced', name: 'Advanced', icon: Crown },
    { id: 'traditional', name: 'Traditional', icon: Heart }
  ];

  const courses = [
    {
      id: 'pulli-kolam',
      title: 'Pulli Kolam Fundamentals',
      description: 'Master the art of dot-based geometric patterns and their mathematical structure. Learn traditional techniques passed down through generations.',
      image: 'https://tse1.mm.bing.net/th/id/OIP.XAyRh0kPcoFLsLKSENchHgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'beginner',
      difficulty: 'Beginner',
      duration: '4-6 weeks',
      lessons: 8,
      completedLessons: 8,
      points: 400,
      students: 1250,
      rating: 4.8,
      status: 'completed',
      instructor: 'Master Lakshmi Devi',
      skills: ['Dot Placement', 'Grid Mathematics', 'Sacred Geometry', 'Traditional Methods'],
      syllabus: [
        'Introduction to Pulli Kolam History',
        'Understanding Dot Grids and Mathematics',
        'Basic 3×3 and 5×5 Patterns',
        'Symmetry and Balance Principles',
        'Connecting Dots with Flowing Lines',
        'Traditional Color Applications',
        'Cultural Significance and Meaning',
        'Master Project: Complex Pulli Design'
      ],
      unlocked: true
    },
    {
      id: 'muggu-kolam',
      title: 'Muggu Kolam Interlaced Designs',
      description: 'Explore sophisticated interlaced patterns with deep cultural and spiritual significance. Master the art of continuous loops.',
      image: 'https://th.bing.com/th/id/R.84f59acce9b85c0372aed5dcd4edaaa9?rik=9IMUykj1DFI2jg&riu=http%3a%2f%2fvinns.in%2fwp-content%2fuploads%2f2022%2f04%2f11_dots_sikku_chikku_rangoli_kolam_chukkala_loops-768x768.jpg&ehk=8LTDLkvl2%2fzZ0R7wOx0%2fXU3WOYnKqB64UZxnfEiYY%2f0%3d&risl=&pid=ImgRaw&r=0',
      category: 'intermediate',
      difficulty: 'Intermediate',
      duration: '6-8 weeks',
      lessons: 10,
      completedLessons: 6,
      points: 240,
      students: 890,
      rating: 4.7,
      status: 'in-progress',
      instructor: 'Guru Priya Nair',
      skills: ['Interlacing Techniques', 'Loop Formations', 'Cultural Context', 'Advanced Patterns'],
      syllabus: [
        'Origins of Muggu Kolam Tradition',
        'Understanding Interlaced Patterns',
        'Basic Loop Formations',
        'Connecting Multiple Loops',
        'Regional Variations and Styles',
        'Spiritual Symbolism in Designs',
        'Festival-Specific Muggu Patterns',
        'Complex Interlacing Techniques',
        'Color Theory in Muggu Designs',
        'Final Project: Temple Muggu Creation'
      ],
      unlocked: true
    },
    {
      id: 'festival-rangoli',
      title: 'Festival Rangoli Designs',
      description: 'Learn vibrant festive patterns, decorative elements, and masterful color usage. Perfect for celebrations and special occasions.',
      image: 'https://images.unsplash.com/photo-1678517098446-988b07ed68f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHJhbmdvbGklMjBmZXN0aXZhbCUyMHBhdHRlcm58ZW58MXx8fHwxNzU3NjIyNTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'intermediate',
      difficulty: 'Intermediate to Advanced',
      duration: '8-10 weeks',
      lessons: 12,
      completedLessons: 12,
      points: 600,
      students: 2100,
      rating: 4.9,
      status: 'completed',
      instructor: 'Artist Meera Krishnan',
      skills: ['Color Theory', 'Festival Patterns', 'Decorative Elements', 'Cultural Context'],
      syllabus: [
        'History of Rangoli Traditions',
        'Understanding Festival Contexts',
        'Color Theory and Combinations',
        'Basic Geometric Patterns',
        'Floral and Natural Motifs',
        'Diwali Special Designs',
        'Holi Color Rangoli',
        'Wedding Celebration Patterns',
        'Regional Festival Variations',
        'Advanced Decorative Techniques',
        'Contemporary Fusion Styles',
        'Master Project: Grand Festival Display'
      ],
      unlocked: true
    },
    {
      id: 'poo-kolam',
      title: 'Poo Kolam Floral Mastery',
      description: 'Discover the beauty of floral arrangements in worship and celebrations. Learn seasonal flower selection and traditional layouts.',
      image: 'https://www.wedandbeyond.com/blog/wp-content/uploads/2017/09/2.jpg',
      category: 'beginner',
      difficulty: 'Beginner to Intermediate',
      duration: '5-7 weeks',
      lessons: 9,
      completedLessons: 0,
      points: 0,
      students: 567,
      rating: 4.6,
      status: 'locked',
      instructor: 'Temple Priest Raman',
      skills: ['Flower Selection', 'Seasonal Awareness', 'Natural Patterns', 'Worship Context'],
      syllabus: [
        'Introduction to Poo Kolam Tradition',
        'Seasonal Flowers and Their Meanings',
        'Basic Floral Arrangement Principles',
        'Temple and Worship Contexts',
        'Creating Natural Geometric Patterns',
        'Flower Preservation Techniques',
        'Festival-Specific Poo Designs',
        'Combining Flowers with Traditional Kolam',
        'Master Project: Wedding Ceremony Display'
      ],
      unlocked: false,
      unlockRequirement: 'Complete Pulli Kolam Fundamentals'
    },
    {
      id: 'sacred-geometry',
      title: 'Sacred Geometry & Mandalas',
      description: 'Advanced course exploring mathematical precision in spiritual art. Create complex mandala patterns for meditation and worship.',
      image: 'https://img.freepik.com/premium-photo/kolam-mandala-india-tradition-happy-top-view-medium-shot_935410-10985.jpg',
      category: 'advanced',
      difficulty: 'Advanced',
      duration: '10-12 weeks',
      lessons: 15,
      completedLessons: 3,
      points: 150,
      students: 423,
      rating: 4.8,
      status: 'in-progress',
      instructor: 'Dr. Vasuki Belavadi',
      skills: ['Mathematical Precision', 'Spiritual Symbolism', 'Complex Geometry', 'Meditation Art'],
      syllabus: [
        'Ancient Origins of Sacred Geometry',
        'Mathematical Principles in Kolam',
        'Basic Mandala Construction',
        'Sri Yantra Fundamentals',
        'Lotus Pattern Geometry',
        'Chakra-Based Designs',
        'Temple Architecture Influence',
        'Meditation and Art Connection',
        'Complex Symmetry Systems',
        'Golden Ratio Applications',
        'Creating Personal Mandalas',
        'Advanced Geometric Constructions',
        'Spiritual Practice Integration',
        'Teaching Sacred Geometry',
        'Master Project: Personal Sacred Space'
      ],
      unlocked: true
    },
    {
      id: 'sikku-kolam',
      title: 'Sikku Kolam Advanced Techniques',
      description: 'Master the sophisticated art of continuous interwoven lines. Learn complex mathematical patterns and traditional techniques.',
      image: 'https://kolamsofindia.com/wp-content/uploads/2018/06/20180627_082719-1-e1530098261450.jpg',
      category: 'advanced',
      difficulty: 'Advanced',
      duration: '8-10 weeks',
      lessons: 11,
      completedLessons: 0,
      points: 0,
      students: 334,
      rating: 4.9,
      status: 'locked',
      instructor: 'Master Kamala Selvam',
      skills: ['Continuous Lines', 'Mathematical Precision', 'Complex Interlacing', 'Traditional Methods'],
      syllabus: [
        'History of Sikku Kolam Masters',
        'Understanding Continuous Line Theory',
        'Basic Interlacing Principles',
        'Creating Flowing Connections',
        'Advanced Loop Techniques',
        'Mathematical Patterns in Sikku',
        'Regional Variations and Styles',
        'Master-Level Techniques',
        'Teaching and Preserving Tradition',
        'Contemporary Applications',
        'Final Master Project'
      ],
      unlocked: false,
      unlockRequirement: 'Complete Sacred Geometry course'
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-primary';
      case 'locked': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getCourseIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return PlayCircle;
      case 'locked': return Lock;
      default: return BookOpen;
    }
  };

  const startCourse = (course: any) => {
    if (!course.unlocked) return;
    
    onPageChange?.('course-detail', {
      courseId: course.id,
      courseName: course.title,
      currentLesson: course.completedLessons + 1,
      totalLessons: course.lessons
    });
  };

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
            Kolam Learning Academy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the ancient art of Kolam through structured courses, expert guidance, and hands-on practice
          </p>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{userProgress.completedCourses}</div>
                  <div className="text-sm text-muted-foreground">Courses Completed</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{userProgress.inProgressCourses}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{userProgress.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {courseCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredCourses.map((course, index) => {
            const StatusIcon = getCourseIcon(course.status);
            return (
              <Card key={course.id} className="rounded-2xl border-0 shadow-lg group hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Course Status Overlay */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={course.status === 'completed' ? 'default' : course.status === 'in-progress' ? 'secondary' : 'outline'}
                      className="rounded-full"
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {course.status === 'completed' ? 'Completed' : 
                       course.status === 'in-progress' ? 'In Progress' : 
                       'Locked'}
                    </Badge>
                  </div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="rounded-full bg-white/90 text-foreground">
                      {course.difficulty}
                    </Badge>
                  </div>
                  
                  {/* Progress Overlay for In-Progress Courses */}
                  {course.status === 'in-progress' && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <span>{course.completedLessons}/{course.lessons} lessons</span>
                        <span>{Math.floor((course.completedLessons / course.lessons) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(course.completedLessons / course.lessons) * 100} 
                        className="h-2 mt-1" 
                      />
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Course Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="text-muted-foreground">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{course.points} pts</span>
                      </div>
                    </div>
                    
                    {/* Instructor */}
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">by {course.instructor}</span>
                    </div>
                    
                    {/* Skills */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-foreground">Skills You'll Learn</h5>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs rounded-full">
                            {skill}
                          </Badge>
                        ))}
                        {course.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs rounded-full">
                            +{course.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-border">
                      {course.unlocked ? (
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            size="sm" 
                            className="rounded-xl"
                            onClick={() => startCourse(course)}
                          >
                            {course.status === 'completed' ? (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Review
                              </>
                            ) : course.status === 'in-progress' ? (
                              <>
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Continue
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Course
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                          <Button disabled size="sm" className="w-full rounded-xl">
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {course.unlockRequirement}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Learning Path Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Recommended Learning Paths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-primary/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Beginner Path</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Perfect for newcomers to Kolam art. Start with fundamentals and build your skills progressively.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Pulli Kolam Fundamentals</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Poo Kolam Mastery</span>
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Festival Rangoli Basics</span>
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Intermediate Path</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advance your skills with complex patterns and cultural understanding.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Festival Rangoli Designs</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Muggu Kolam Interlaced</span>
                      <PlayCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sacred Geometry</span>
                      <PlayCircle className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-accent/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Master Path</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Become a Kolam master with advanced techniques and teaching skills.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Sikku Kolam Advanced</span>
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Teaching Methodology</span>
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cultural Preservation</span>
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="default" className="rounded-full mb-4">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured Course
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Festival Rangoli Mastery
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Join our most popular course to master the vibrant art of festival Rangoli. Learn from expert artists and create stunning designs for every celebration.
                  </p>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm">2,100+ students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-sm">4.9 rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm">Certificate included</span>
                    </div>
                  </div>
                  
                  <Button size="lg" className="rounded-xl">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Learning Today
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">What You'll Master</h4>
                  <div className="space-y-3">
                    {[
                      'Traditional Festival Patterns',
                      'Advanced Color Theory',
                      'Regional Rangoli Styles',
                      'Sacred Symbolism',
                      'Contemporary Fusion Techniques'
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Course Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-primary" />
                <span>Learning Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="rounded-xl justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF Guides
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl justify-start">
                  <Image className="w-4 h-4 mr-2" />
                  Pattern Templates
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl justify-start">
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Practice Grids
                </Button>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h5 className="font-medium text-foreground mb-3">Popular Downloads</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">Pulli Kolam Guide</span>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-lg">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Image className="w-4 h-4 text-primary" />
                      <span className="text-sm">Rangoli Templates</span>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-lg">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-primary/5 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">Master Class: Diwali Rangoli</h5>
                      <p className="text-sm text-muted-foreground">Live session with expert artist</p>
                      <Badge variant="outline" className="mt-1 text-xs rounded-full">
                        Tomorrow, 7:00 PM
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-secondary/5 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">Pattern Competition</h5>
                      <p className="text-sm text-muted-foreground">Weekly community contest</p>
                      <Badge variant="outline" className="mt-1 text-xs rounded-full">
                        Ends in 3 days
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full rounded-xl">
                View All Events
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;