import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';
import { useAccessibility } from '../context/AccessibilityContext';
import FriendsLeaderboard from '../ui/friends-leaderboard';
import { 
  User,
  Trophy,
  Star,
  Calendar,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Flame,
  Gift,
  Crown,
  Sparkles,
  Heart,
  Zap,
  PlayCircle,
  ChevronRight,
  Lock,
  Unlock,
  Medal,
  Coins,
  BarChart3,
  Activity,
  Eye,
  Camera
} from 'lucide-react';

interface UserDashboardProps {
  onPageChange?: (page: string, data?: any) => void;
  username?: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onPageChange, username = 'Student' }) => {
  const { translations, settings } = useAccessibility();
  const currentLang = translations[settings.language] || translations['en'];
  
  // User progress state
  const [userStats, setUserStats] = useState({
    totalPoints: 2485,
    level: 12,
    streak: 7,
    totalPatterns: 34,
    completedCourses: 3,
    badges: 8
  });
  
  const [dailyChallenge, setDailyChallenge] = useState({
    title: "Symmetric Pulli Kolam Challenge",
    description: "Create a 7×7 Pulli Kolam pattern with perfect 4-fold symmetry using traditional rice flour colors",
    points: 150,
    difficulty: "Intermediate",
    timeRemaining: "18h 42m",
    progress: 0,
    completed: false
  });
  
  const [recentActivity, setRecentActivity] = useState([
    { action: "Completed Festival Rangoli", points: 200, time: "2 hours ago", type: "course" },
    { action: "Created Geometric Pattern", points: 75, time: "Yesterday", type: "create" },
    { action: "Daily Challenge Completed", points: 150, time: "2 days ago", type: "challenge" },
    { action: "Earned 'Pattern Master' Badge", points: 300, time: "3 days ago", type: "achievement" },
    { action: "Finished Pulli Kolam Basics", points: 250, time: "1 week ago", type: "course" }
  ]);
  
  const [availableRewards, setAvailableRewards] = useState([
    { name: "Golden Color Palette", cost: 500, unlocked: false, type: "tools" },
    { name: "Advanced Symmetry Tools", cost: 750, unlocked: true, type: "tools" },
    { name: "Temple Pattern Collection", cost: 1000, unlocked: false, type: "templates" },
    { name: "Master Class Access", cost: 1200, unlocked: false, type: "course" },
    { name: "Pattern Export Pro", cost: 300, unlocked: true, type: "feature" }
  ]);
  
  const [achievements, setAchievements] = useState([
    { name: "First Steps", description: "Created your first Kolam", earned: true, date: "2 weeks ago" },
    { name: "Pattern Explorer", description: "Created 10 different patterns", earned: true, date: "1 week ago" },
    { name: "Cultural Scholar", description: "Completed 3 courses", earned: true, date: "5 days ago" },
    { name: "Daily Devotee", description: "Maintain 7-day streak", earned: true, date: "Today" },
    { name: "Symmetry Master", description: "Create 5 perfect symmetrical patterns", earned: false, progress: 3 },
    { name: "Festival Artist", description: "Complete all Rangoli challenges", earned: false, progress: 2 },
    { name: "Traditional Keeper", description: "Learn all classical patterns", earned: false, progress: 6 },
    { name: "Community Helper", description: "Share 10 patterns", earned: false, progress: 4 }
  ]);
  
  const [courses, setCourses] = useState([
    { 
      name: "Pulli Kolam Fundamentals", 
      progress: 100, 
      lessons: 8, 
      completed: 8, 
      points: 400,
      status: "completed"
    },
    { 
      name: "Sacred Geometry Basics", 
      progress: 75, 
      lessons: 6, 
      completed: 4, 
      points: 240,
      status: "in-progress"
    },
    { 
      name: "Festival Rangoli Designs", 
      progress: 100, 
      lessons: 10, 
      completed: 10, 
      points: 500,
      status: "completed"
    },
    { 
      name: "Advanced Symmetry Techniques", 
      progress: 40, 
      lessons: 8, 
      completed: 3, 
      points: 150,
      status: "in-progress"
    },
    { 
      name: "Poo Kolam Mastery", 
      progress: 0, 
      lessons: 7, 
      completed: 0, 
      points: 0,
      status: "locked"
    }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'create': return Star;
      case 'challenge': return Target;
      case 'achievement': return Trophy;
      default: return Activity;
    }
  };

  const getLevelProgress = () => {
    const pointsForCurrentLevel = (userStats.level - 1) * 200;
    const pointsForNextLevel = userStats.level * 200;
    const currentLevelPoints = userStats.totalPoints - pointsForCurrentLevel;
    const maxLevelPoints = pointsForNextLevel - pointsForCurrentLevel;
    return Math.min((currentLevelPoints / maxLevelPoints) * 100, 100);
  };

  const claimReward = (reward: any, index: number) => {
    if (userStats.totalPoints >= reward.cost && !reward.unlocked) {
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints - reward.cost
      }));
      
      setAvailableRewards(prev => 
        prev.map((r, i) => i === index ? { ...r, unlocked: true } : r)
      );
    }
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
            Welcome back, {username}!
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continue your journey mastering the ancient art of Kolam creation
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardContent className="p-4 text-center">
              <Crown className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">Level {userStats.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-green-100 to-green-50">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.totalPatterns}</div>
              <div className="text-sm text-muted-foreground">Patterns Created</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Level Progress</span>
                    <Badge variant="secondary" className="ml-auto rounded-full">
                      Level {userStats.level}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Progress to Level {userStats.level + 1}</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(getLevelProgress())}%
                    </span>
                  </div>
                  <Progress value={getLevelProgress()} className="h-3" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{userStats.totalPoints - (userStats.level - 1) * 200} points earned</span>
                    <span>{userStats.level * 200 - userStats.totalPoints} points to next level</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Today's Challenge</span>
                    <Badge variant="default" className="ml-auto rounded-full">
                      <Clock className="w-3 h-3 mr-1" />
                      {dailyChallenge.timeRemaining}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {dailyChallenge.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {dailyChallenge.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="rounded-full">
                        <Target className="w-3 h-3 mr-1" />
                        {dailyChallenge.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        <Coins className="w-3 h-3 mr-1" />
                        {dailyChallenge.points} pts
                      </Badge>
                    </div>
                  </div>
                  
                  {dailyChallenge.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{dailyChallenge.progress}%</span>
                      </div>
                      <Progress value={dailyChallenge.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 rounded-xl"
                      onClick={() => onPageChange?.('generator', { challengeMode: true, challenge: dailyChallenge })}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Challenge
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span>Course Progress</span>
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl"
                      onClick={() => onPageChange?.('courses')}
                    >
                      View All Courses
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-xl">
                      <div className="flex-shrink-0">
                        {course.status === 'completed' ? (
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        ) : course.status === 'in-progress' ? (
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <PlayCircle className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-muted-foreground rounded-full flex items-center justify-center">
                            <Lock className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{course.name}</h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className="flex-1">
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {course.completed}/{course.lessons}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs rounded-full">
                          {course.points} pts
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs rounded-full">
                          +{activity.points}
                        </Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Points & Rewards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <span>Rewards Store</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-accent/10 rounded-xl p-3 text-center mb-4">
                    <Coins className="w-6 h-6 text-accent mx-auto mb-1" />
                    <div className="font-bold text-foreground">{userStats.totalPoints}</div>
                    <div className="text-xs text-muted-foreground">Available Points</div>
                  </div>
                  
                  {availableRewards.slice(0, 3).map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {reward.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{reward.cost} points</p>
                      </div>
                      <Button
                        size="sm"
                        variant={reward.unlocked ? "secondary" : "default"}
                        className="rounded-lg"
                        disabled={reward.unlocked || userStats.totalPoints < reward.cost}
                        onClick={() => claimReward(reward, index)}
                      >
                        {reward.unlocked ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Owned
                          </>
                        ) : userStats.totalPoints >= reward.cost ? (
                          <>
                            <Unlock className="w-3 h-3 mr-1" />
                            Claim
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full rounded-xl">
                    View All Rewards
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span>Achievements</span>
                    <Badge variant="outline" className="ml-auto rounded-full">
                      {achievements.filter(a => a.earned).length}/{achievements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.slice(0, 6).map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        achievement.earned ? 'bg-accent/10' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {achievement.earned ? (
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <Medal className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-muted-foreground/30 rounded-full flex items-center justify-center">
                            <Medal className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.earned ? achievement.date : achievement.description}
                        </p>
                        {!achievement.earned && achievement.progress !== undefined && (
                          <div className="mt-1">
                            <Progress value={(achievement.progress / 5) * 100} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full rounded-xl">
                    View All Achievements
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Weekly Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Complete 3 Patterns</span>
                      <span className="text-xs text-muted-foreground">2/3</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Learn New Technique</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Practice 5 Days</span>
                      <span className="text-xs text-muted-foreground">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="pt-2 border-t border-border text-center">
                    <Badge variant="secondary" className="rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      200 Bonus Points Available
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Your Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <div className="text-lg font-bold text-primary">{userStats.completedCourses}</div>
                      <div className="text-xs text-muted-foreground">Courses Done</div>
                    </div>
                    <div className="p-3 bg-secondary/10 rounded-xl">
                      <div className="text-lg font-bold text-secondary">{userStats.badges}</div>
                      <div className="text-xs text-muted-foreground">Badges Earned</div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <h5 className="font-medium text-foreground mb-2">Pattern Types Mastered</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Pulli Kolam</span>
                        <Badge variant="secondary" className="text-xs">Expert</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Festival Rangoli</span>
                        <Badge variant="secondary" className="text-xs">Advanced</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sacred Geometry</span>
                        <Badge variant="outline" className="text-xs">Intermediate</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Poo Kolam</span>
                        <Badge variant="outline" className="text-xs">Beginner</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Streak */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{userStats.streak} Day Streak!</h4>
                      <p className="text-sm text-muted-foreground">Keep practicing to maintain your streak</p>
                      <Badge variant="secondary" className="mt-1 text-xs rounded-full">
                        <Heart className="w-3 h-3 mr-1" />
                        Streak Bonus: +50 pts daily
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full rounded-xl justify-start"
                    onClick={() => onPageChange?.('generator')}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create New Pattern
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full rounded-xl justify-start"
                    onClick={() => onPageChange?.('courses')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full rounded-xl justify-start"
                    onClick={() => onPageChange?.('scan')}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Scan & Analyze
                  </Button>

                  <FriendsLeaderboard className="w-full justify-start" currentUser={username} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;