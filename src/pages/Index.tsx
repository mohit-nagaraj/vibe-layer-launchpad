
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Github, Download, Eye, EyeOff, Palette, Settings, Layers, Sparkles, Heart, Users, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [githubStats, setGithubStats] = useState({
    stars: 0,
    forks: 0,
    downloads: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Countdown timer to June 18, 2025 6 PM IST
  useEffect(() => {
    const targetDate = new Date('2025-06-18T18:00:00+05:30').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate fetching GitHub stats with loader
  useEffect(() => {
    setTimeout(() => {
      setGithubStats({
        stars: 342,
        forks: 28,
        downloads: 0
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitted(true);
    toast({
      title: "Welcome to the waitlist! ✨",
      description: "We'll notify you when Vibelayer is ready for launch!",
    });
  };

  const features = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Transparent Stickers",
      description: "Display beautiful stickers in transparent windows that float on your desktop"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Background Remover",
      description: "Built-in AI background removal to create perfect stickers from any image"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Full Customization",
      description: "Light/dark themes, always on top, auto-launch, and much more"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Screen Capture Control",
      description: "Hide or show stickers during screen recording and capturing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Fixed floating elements on sides */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 space-y-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={`left-${i}`}
            className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40 animate-pulse"
            style={{
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 space-y-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={`right-${i}`}
            className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-40 animate-pulse"
            style={{
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Vibelayer
            </h1>
            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Your adorable desktop companion that brings life to your screen with beautiful transparent stickers ✨
          </p>
          <Badge variant="outline" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200 px-4 py-2 text-lg">
            Coming Soon
          </Badge>
        </header>

        {/* Countdown Hero Section */}
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <Clock className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Launch Countdown
                </h2>
                <p className="text-gray-600 text-lg">June 18, 2025 • 6:00 PM IST</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-2 shadow-lg transform hover:scale-105 transition-all duration-300">
                      <div className="text-4xl md:text-5xl font-bold font-mono">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-gray-600 font-semibold uppercase text-sm tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GitHub Stats with Loader */}
        <div className="flex justify-center mb-16 animate-fade-in">
          <div className="flex gap-4 flex-wrap justify-center">
            {isLoading ? (
              <>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-8 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-8 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-8 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">{githubStats.stars}</span>
                    <span className="text-gray-600">Stars</span>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 flex items-center gap-2">
                    <Github className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold">{githubStats.forks}</span>
                    <span className="text-gray-600">Forks</span>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 flex items-center gap-2">
                    <Download className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">{githubStats.downloads}</span>
                    <span className="text-gray-600">Downloads</span>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto mb-20 animate-fade-in">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Join the Waitlist</h2>
                <p className="text-gray-600">Be the first to bring magic to your desktop!</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-purple-200 focus:border-purple-400 rounded-lg h-12"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Waitlist
                  </Button>
                </form>
              ) : (
                <div className="text-center animate-scale-in">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">You're in! ✨</h3>
                  <p className="text-gray-600">We'll notify you when Vibelayer is ready!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Features That'll Make You Smile
            </h2>
            <p className="text-gray-600">Everything you need to personalize your desktop experience</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
            <span>for the community</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Open source and always will be ✨</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
