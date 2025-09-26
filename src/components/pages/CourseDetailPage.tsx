import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  Clock,
  Star,
  Download,
  BookOpen,
  Video,
  FileText,
  Users,
  Award,
  ChevronRight,
  Lock,
  Unlock
} from 'lucide-react';

interface CourseDetailPageProps {
  courseData?: any;
  onPageChange?: (page: string, data?: any) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseData, onPageChange }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  
  // Sample course data if not provided
  const course = courseData || {
    id: 'pulli-kolam',
    title: 'Pulli Kolam Fundamentals',
    description: 'Master the art of dot-based geometric patterns and their mathematical structure.',
    instructor: 'Master Lakshmi Devi',
    duration: '4-6 weeks',
    lessons: 8,
    completedLessons: 3,
    currentLesson: 4,
    totalLessons: 8,
    rating: 4.8,
    students: 1250,
    points: 400
  };

  const lessons = [
    { 
      id: 1, 
      title: 'Introduction to Pulli Kolam History', 
      duration: '15 min', 
      type: 'video',
      completed: true,
      points: 50
    },
    { 
      id: 2, 
      title: 'Understanding Dot Grids and Mathematics', 
      duration: '20 min', 
      type: 'interactive',
      completed: true,
      points: 75
    },
    { 
      id: 3, 
      title: 'Basic 3×3 and 5×5 Patterns', 
      duration: '25 min', 
      type: 'practice',
      completed: true,
      points: 100
    },
    { 
      id: 4, 
      title: 'Symmetry and Balance Principles', 
      duration: '30 min', 
      type: 'video',
      completed: false,
      current: true,
      points: 75
    },
    { 
      id: 5, 
      title: 'Connecting Dots with Flowing Lines', 
      duration: '35 min', 
      type: 'practice',
      completed: false,
      points: 100
    },
    { 
      id: 6, 
      title: 'Traditional Color Applications', 
      duration: '20 min', 
      type: 'theory',
      completed: false,
      points: 50
    },
    { 
      id: 7, 
      title: 'Cultural Significance and Meaning', 
      duration: '25 min', 
      type: 'video',
      completed: false,
      points: 75
    },
    { 
      id: 8, 
      title: 'Master Project: Complex Pulli Design', 
      duration: '45 min', 
      type: 'project',
      completed: false,
      points: 150
    }
  ];

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return CheckCircle;
    
    switch (type) {
      case 'video': return Video;
      case 'practice': return PlayCircle;
      case 'project': return Award;
      case 'theory': return BookOpen;
      case 'interactive': return Star;
      default: return BookOpen;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-700';
      case 'practice': return 'bg-green-100 text-green-700';
      case 'project': return 'bg-purple-100 text-purple-700';
      case 'theory': return 'bg-orange-100 text-orange-700';
      case 'interactive': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const startLesson = (lesson: any) => {
    if (lesson.current || lesson.completed) {
      // Navigate to lesson content
      onPageChange?.('lesson', { 
        courseId: course.id, 
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        lessonType: lesson.type
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl"
              onClick={() => onPageChange?.('courses')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
              <p className="text-muted-foreground">by {course.instructor}</p>
            </div>
          </div>
          
          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{course.completedLessons}/{course.lessons}</div>
              <div className="text-sm text-muted-foreground">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{course.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{course.rating}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{course.students}</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{course.points}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Course Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.floor((course.completedLessons / course.lessons) * 100)}%
              </span>
            </div>
            <Progress value={(course.completedLessons / course.lessons) * 100} className="h-3" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>Course Lessons</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lessons.map((lesson, index) => {
                    const IconComponent = getLessonIcon(lesson.type, lesson.completed);
                    const isAccessible = lesson.completed || lesson.current || index === 0;
                    
                    return (
                      <div 
                        key={lesson.id} 
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          lesson.current 
                            ? 'border-primary bg-primary/5' 
                            : lesson.completed 
                              ? 'border-green-200 bg-green-50' 
                              : isAccessible
                                ? 'border-border bg-muted/30 hover:bg-muted/50'
                                : 'border-muted bg-muted/10 opacity-60'
                        }`}
                        onClick={() => isAccessible && startLesson(lesson)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              lesson.completed 
                                ? 'bg-green-500' 
                                : lesson.current 
                                  ? 'bg-primary' 
                                  : isAccessible
                                    ? 'bg-muted-foreground'
                                    : 'bg-muted-foreground/30'
                            }`}>
                              {isAccessible ? (
                                <IconComponent className={`w-5 h-5 ${
                                  lesson.completed || lesson.current ? 'text-white' : 'text-white'
                                }`} />
                              ) : (
                                <Lock className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-foreground truncate">
                                {lesson.title}
                              </h4>
                              {lesson.current && (
                                <Badge variant="default" className="text-xs rounded-full">
                                  Current
                                </Badge>
                              )}
                              {lesson.completed && (
                                <Badge variant="secondary" className="text-xs rounded-full">
                                  Completed
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                              </span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs rounded-full ${getLessonTypeColor(lesson.type)}`}
                              >
                                {lesson.type}
                              </Badge>
                              <span className="flex items-center space-x-1">
                                <Star className="w-3 h-3" />
                                <span>{lesson.points} pts</span>
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0">
                            {isAccessible && (
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Lesson */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PlayCircle className="w-5 h-5 text-primary" />
                    <span>Continue Learning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <h4 className="font-medium text-foreground mb-2">
                      Lesson {course.currentLesson}: Symmetry and Balance
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn the fundamental principles of creating balanced and symmetrical Kolam patterns.
                    </p>
                    
                    <Button 
                      className="w-full rounded-xl"
                      onClick={() => startLesson(lessons.find(l => l.current))}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continue Lesson
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5 text-primary" />
                    <span>Course Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full rounded-xl justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Course Handbook (PDF)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full rounded-xl justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Practice Templates
                  </Button>
                  <Button variant="outline" size="sm" className="w-full rounded-xl justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Video Tutorials
                  </Button>
                  <Button variant="outline" size="sm" className="w-full rounded-xl justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Join Discussion
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Progress Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Your Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {lessons.filter(l => l.completed).reduce((sum, l) => sum + l.points, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completion</span>
                      <span className="text-sm font-medium">
                        {Math.floor((course.completedLessons / course.lessons) * 100)}%
                      </span>
                    </div>
                    <Progress value={(course.completedLessons / course.lessons) * 100} className="h-2" />
                  </div>
                  
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span>Time Invested</span>
                      <span className="font-medium">2h 15m</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Remaining</span>
                      <span className="font-medium">1h 45m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Certificate Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
                <CardContent className="p-4 text-center">
                  <Award className="w-12 h-12 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">
                    Course Certificate
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete all lessons to earn your certificate in Pulli Kolam Fundamentals
                  </p>
                  <Progress value={(course.completedLessons / course.lessons) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {course.lessons - course.completedLessons} lessons remaining
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;