
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Github, Download, Eye, EyeOff, Palette, Settings, Layers, Sparkles, Heart, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [githubStats, setGithubStats] = useState({
    stars: 0,
    forks: 0,
    downloads: 0
  });

  // Simulate fetching GitHub stats
  useEffect(() => {
    // Simulated API call - replace with actual GitHub API
    setTimeout(() => {
      setGithubStats({
        stars: 342,
        forks: 28,
        downloads: 1547
      });
    }, 1000);
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your adorable desktop companion that brings life to your screen with beautiful transparent stickers ✨
          </p>
        </header>

        {/* GitHub Stats */}
        <div className="flex justify-center mb-16 animate-fade-in">
          <div className="flex gap-4 flex-wrap justify-center">
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
