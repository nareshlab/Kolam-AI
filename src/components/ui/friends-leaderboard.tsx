import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './dialog';
import { Input } from './input';
import { Badge } from './badge';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from "sonner@2.0.3";
import {
  Users,
  Trophy,
  Crown,
  Medal,
  Search,
  UserPlus,
  Check,
  X,
  Star,
  TrendingUp,
  Activity,
  Clock,
  Filter,
  Settings,
  Shield,
  Globe,
  Lock,
  Eye,
  MoreHorizontal,
  Sparkles,
  Target,
  Calendar,
  Award,
  Heart,
  UserCheck,
  UserX,
  MessageCircle,
  Gift
} from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  points: number;
  level: number;
  patternsCreated: number;
  challengesCompleted: number;
  lastActive: string;
  streak: number;
  status: 'online' | 'offline' | 'away';
  rank: number;
}

interface FriendRequest {
  id: string;
  from: Friend;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface FriendsLeaderboardProps {
  className?: string;
  currentUser?: string;
  currentUserId?: string;
}

const FriendsLeaderboard: React.FC<FriendsLeaderboardProps> = ({
  className = "",
  currentUser = "You",
  currentUserId = "user-1"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const [filterBy, setFilterBy] = useState('all');
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    allowFriendRequests: true,
    showOnlineStatus: true
  });

  // Mock friends data
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 'friend-1',
      name: 'Priya Sharma',
      username: 'priya_kolam',
      avatar: undefined,
      points: 3250,
      level: 15,
      patternsCreated: 42,
      challengesCompleted: 28,
      lastActive: '2 minutes ago',
      streak: 12,
      status: 'online',
      rank: 1
    },
    {
      id: 'friend-2',
      name: 'Rajesh Kumar',
      username: 'rajesh_patterns',
      avatar: undefined,
      points: 2890,
      level: 13,
      patternsCreated: 38,
      challengesCompleted: 24,
      lastActive: '1 hour ago',
      streak: 8,
      status: 'away',
      rank: 2
    },
    {
      id: 'friend-3',
      name: 'Anita Menon',
      username: 'anita_art',
      avatar: undefined,
      points: 2750,
      level: 12,
      patternsCreated: 35,
      challengesCompleted: 22,
      lastActive: '3 hours ago',
      streak: 15,
      status: 'online',
      rank: 3
    },
    {
      id: 'friend-4',
      name: 'Vikram Singh',
      username: 'vikram_traditional',
      avatar: undefined,
      points: 2580,
      level: 11,
      patternsCreated: 31,
      challengesCompleted: 19,
      lastActive: '1 day ago',
      streak: 5,
      status: 'offline',
      rank: 4
    },
    {
      id: 'friend-5',
      name: 'Deepa Nair',
      username: 'deepa_rangoli',
      avatar: undefined,
      points: 2420,
      level: 10,
      patternsCreated: 29,
      challengesCompleted: 18,
      lastActive: '2 days ago',
      streak: 3,
      status: 'offline',
      rank: 5
    }
  ]);

  // Current user data
  const currentUserData = {
    id: currentUserId,
    name: currentUser,
    username: currentUser.toLowerCase().replace(/\s+/g, '_'),
    avatar: undefined,
    points: 2485,
    level: 12,
    patternsCreated: 34,
    challengesCompleted: 21,
    lastActive: 'now',
    streak: 7,
    status: 'online' as const,
    rank: 6
  };

  // Mock friend requests
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: 'req-1',
      from: {
        id: 'user-new-1',
        name: 'Kavya Reddy',
        username: 'kavya_kolams',
        avatar: undefined,
        points: 1850,
        level: 8,
        patternsCreated: 22,
        challengesCompleted: 15,
        lastActive: '1 hour ago',
        streak: 4,
        status: 'online',
        rank: 12
      },
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: 'req-2',
      from: {
        id: 'user-new-2',
        name: 'Arun Krishnan',
        username: 'arun_patterns',
        avatar: undefined,
        points: 2100,
        level: 9,
        patternsCreated: 26,
        challengesCompleted: 17,
        lastActive: '30 minutes ago',
        streak: 6,
        status: 'online',
        rank: 8
      },
      timestamp: '5 hours ago',
      status: 'pending'
    }
  ]);

  // Mock search results
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sort friends
  const sortedFriends = [...friends, currentUserData].sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return b.points - a.points;
      case 'level':
        return b.level - a.level;
      case 'patterns':
        return b.patternsCreated - a.patternsCreated;
      case 'challenges':
        return b.challengesCompleted - a.challengesCompleted;
      case 'streak':
        return b.streak - a.streak;
      case 'recent':
        // Mock recent activity sorting
        return a.lastActive.localeCompare(b.lastActive);
      default:
        return b.points - a.points;
    }
  });

  // Filter friends
  const filteredFriends = sortedFriends.filter(friend => {
    if (filterBy === 'online') return friend.status === 'online';
    if (filterBy === 'recent') return friend.lastActive.includes('minute') || friend.lastActive.includes('hour');
    if (filterBy === 'top') return friend.rank <= 5;
    return true;
  });

  // Search for new friends
  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // Mock search API call with timeout protection
      const mockResults = [
        {
          id: 'search-1',
          name: 'Meera Patel',
          username: 'meera_artist',
          avatar: undefined, // Remove external placeholder URL
          points: 1950,
          level: 9,
          patternsCreated: 24,
          challengesCompleted: 16,
          lastActive: '1 day ago',
          streak: 2,
          status: 'offline' as const,
          rank: 10
        },
        {
          id: 'search-2',
          name: 'Arjun Nair',
          username: 'arjun_kolam',
          avatar: undefined, // Remove external placeholder URL
          points: 2650,
          level: 11,
          patternsCreated: 33,
          challengesCompleted: 20,
          lastActive: '3 hours ago',
          streak: 9,
          status: 'away' as const,
          rank: 4
        }
      ].filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      
      // Use requestAnimationFrame instead of setTimeout for better performance
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          setSearchResults(mockResults);
          resolve(void 0);
        });
      });
    } catch (error) {
      console.warn('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle friend request
  const sendFriendRequest = (user: Friend) => {
    toast.success(`Friend request sent to ${user.name}!`, {
      description: "They'll be notified of your request."
    });
  };

  const handleFriendRequest = (requestId: string, action: 'accept' | 'decline') => {
    const request = friendRequests.find(req => req.id === requestId);
    if (!request) return;

    if (action === 'accept') {
      setFriends(prev => [...prev, request.from]);
      toast.success(`You're now friends with ${request.from.name}!`, {
        description: "Start comparing your Kolam creations!"
      });
    }

    setFriendRequests(prev => prev.filter(req => req.id !== requestId));
  };

  // Get rank suffix
  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  // Privacy settings dialog
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    
    const delayedSearch = setTimeout(() => {
      if (!isCancelled) {
        searchUsers(searchQuery);
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(delayedSearch);
    };
  }, [searchQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={`rounded-xl ${className}`}>
          <Trophy className="w-4 h-4 mr-2" />
          View Leaderboard
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Friends Leaderboard</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPrivacySettings(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Connect with other Kolam artists, compare your progress, and celebrate achievements together.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="find-friends">Find Friends</TabsTrigger>
            <TabsTrigger value="requests" className="relative">
              Friend Requests
              {friendRequests.length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">
                  {friendRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            {/* Filters and Sort */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Total Points</SelectItem>
                    <SelectItem value="level">Level</SelectItem>
                    <SelectItem value="patterns">Patterns Created</SelectItem>
                    <SelectItem value="challenges">Challenges</SelectItem>
                    <SelectItem value="streak">Streak</SelectItem>
                    <SelectItem value="recent">Recently Active</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-[120px] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Friends</SelectItem>
                    <SelectItem value="online">Online Now</SelectItem>
                    <SelectItem value="recent">Recently Active</SelectItem>
                    <SelectItem value="top">Top Scorers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Badge variant="outline" className="text-xs">
                {filteredFriends.length} friends
              </Badge>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredFriends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl border transition-colors ${
                    friend.id === currentUserId 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {index === 0 ? (
                      <Crown className="w-6 h-6 text-yellow-500 mx-auto" />
                    ) : index === 1 ? (
                      <Medal className="w-6 h-6 text-gray-400 mx-auto" />
                    ) : index === 2 ? (
                      <Medal className="w-6 h-6 text-amber-600 mx-auto" />
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Avatar with Status */}
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-white`} />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground truncate">
                        {friend.id === currentUserId ? currentUser : friend.name}
                      </h4>
                      {friend.streak >= 7 && (
                        <Badge variant="secondary" className="text-xs">
                          🔥 {friend.streak}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{friend.username}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                      <span>Level {friend.level}</span>
                      <span>•</span>
                      <span>{friend.patternsCreated} patterns</span>
                      <span>•</span>
                      <span>Active {friend.lastActive}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {friend.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>

                  {/* Action Menu */}
                  {friend.id !== currentUserId && (
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Find Friends Tab */}
          <TabsContent value="find-friends" className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            {/* Search Results */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Level {user.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {user.points} points
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={() => sendFriendRequest(user)}
                      size="sm"
                      className="rounded-xl"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add Friend
                    </Button>
                  </motion.div>
                ))
              ) : searchQuery ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">No users found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try searching with a different username or email
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Search for friends to connect with other Kolam artists
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Friend Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {friendRequests.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {friendRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={request.from.avatar} alt={request.from.name} />
                      <AvatarFallback>{request.from.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{request.from.name}</h4>
                      <p className="text-sm text-muted-foreground">@{request.from.username}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Sent {request.timestamp}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleFriendRequest(request.id, 'accept')}
                        size="sm"
                        className="rounded-xl"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleFriendRequest(request.id, 'decline')}
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No pending friend requests</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Search for friends to start connecting with other artists
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Privacy Settings Dialog */}
        <Dialog open={showPrivacySettings} onOpenChange={setShowPrivacySettings}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Privacy Settings</span>
              </DialogTitle>
              <DialogDescription>
                Control who can see your profile and send you friend requests.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Visibility</label>
                <Select
                  value={privacySettings.profileVisibility}
                  onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Public</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="friends">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Friends Only</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Private</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Allow Friend Requests</label>
                  <p className="text-xs text-muted-foreground">Let others send you friend requests</p>
                </div>
                <Button
                  variant={privacySettings.allowFriendRequests ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPrivacySettings(prev => ({ ...prev, allowFriendRequests: !prev.allowFriendRequests }))}
                >
                  {privacySettings.allowFriendRequests ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Show Online Status</label>
                  <p className="text-xs text-muted-foreground">Display when you're online</p>
                </div>
                <Button
                  variant={privacySettings.showOnlineStatus ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPrivacySettings(prev => ({ ...prev, showOnlineStatus: !prev.showOnlineStatus }))}
                >
                  {privacySettings.showOnlineStatus ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default FriendsLeaderboard;