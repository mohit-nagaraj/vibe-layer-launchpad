import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, GitFork, Download, Sparkles, Eye, Settings, Palette, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [githubStats, setGithubStats] = useState({
    stars: 0,
    forks: 0,
    downloads: 0,
    loading: true
  });

  // Countdown to June 18, 2025 6 PM IST
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

  // Fetch GitHub stats (simulated for now)
  useEffect(() => {
    const fetchGithubStats = async () => {
      // Simulate loading
      setTimeout(() => {
        setGithubStats({
          stars: 247,
          forks: 52,
          downloads: 0, // Coming soon
          loading: false
        });
      }, 2000);
    };

    fetchGithubStats();
  }, []);

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already on the waitlist! 📧",
            description: "This email is already registered for our waitlist."
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome to the waitlist! 🎉",
          description: "We'll notify you when Vibelayer launches!"
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Error signing up for waitlist:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const LoadingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-x-hidden">
      {/* Floating Elements */}
      <div className="fixed left-4 top-1/4 z-10 animate-float">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-60 blur-sm"></div>
      </div>
      <div className="fixed left-8 top-1/2 z-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-50 blur-sm"></div>
      </div>
      <div className="fixed left-2 top-3/4 z-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-20 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full opacity-40 blur-sm"></div>
      </div>

      <div className="fixed right-4 top-1/3 z-10 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="w-14 h-14 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-60 blur-sm"></div>
      </div>
      <div className="fixed right-8 top-1/2 z-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="w-18 h-18 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-50 blur-sm"></div>
      </div>
      <div className="fixed right-2 top-2/3 z-10 animate-float" style={{ animationDelay: '2.5s' }}>
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-300 to-red-300 rounded-full opacity-40 blur-sm"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-20">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
              VibeLayer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your magical desktop companion that brings stickers to life on your screen ✨
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white border-0 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-pulse"
            >
              <Sparkles className="mr-2" />
              Coming Soon
            </Button>
          </div>
        </div>
      </section>

      {/* Countdown & GitHub Stats Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-20">
        <div className="space-y-16 max-w-6xl mx-auto">
          {/* Launch Countdown */}
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Launch Countdown
            </h2>
            
            <div className="flex items-center justify-center space-x-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-6xl md:text-8xl font-bold text-purple-600">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-lg text-muted-foreground font-medium">DAYS</div>
              </div>
              
              <div className="text-6xl md:text-8xl font-bold text-purple-600">:</div>
              
              <div className="flex flex-col items-center">
                <div className="text-6xl md:text-8xl font-bold text-pink-600">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-lg text-muted-foreground font-medium">HOURS</div>
              </div>
              
              <div className="text-6xl md:text-8xl font-bold text-pink-600">:</div>
              
              <div className="flex flex-col items-center">
                <div className="text-6xl md:text-8xl font-bold text-blue-600">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-lg text-muted-foreground font-medium">MINUTES</div>
              </div>
              
              <div className="text-6xl md:text-8xl font-bold text-blue-600">:</div>
              
              <div className="flex flex-col items-center">
                <div className="text-6xl md:text-8xl font-bold text-purple-600">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-lg text-muted-foreground font-medium">SECONDS</div>
              </div>
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <span className="text-3xl font-bold text-purple-600">
                    {githubStats.loading ? <LoadingDots /> : githubStats.stars}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium">GitHub Stars</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <GitFork className="w-8 h-8 text-blue-500" />
                  <span className="text-3xl font-bold text-purple-600">
                    {githubStats.loading ? <LoadingDots /> : githubStats.forks}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium">Forks</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Download className="w-8 h-8 text-green-500" />
                  <span className="text-3xl font-bold text-purple-600">
                    {githubStats.loading ? <LoadingDots /> : "Coming Soon"}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium">Downloads</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist & Features Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-20">
        <div className="space-y-16 max-w-6xl mx-auto">
          {/* Waitlist Signup */}
          <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Join the Waitlist
              </CardTitle>
              <CardDescription>
                Be the first to experience the magic when we launch!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWaitlistSignup} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-purple-200 focus:border-purple-400"
                  required
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={isSubmitting}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Magical Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-700">Transparent Stickers</h3>
                    <p className="text-sm text-muted-foreground">Place animated stickers anywhere on your screen with full transparency</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-700">AI Background Removal</h3>
                    <p className="text-sm text-muted-foreground">Built-in AI removes backgrounds from your images automatically</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-700">Advanced Controls</h3>
                    <p className="text-sm text-muted-foreground">Always on top, auto-launch, and screen capture protection</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-700">Theme Support</h3>
                    <p className="text-sm text-muted-foreground">Dark and light themes to match your desktop aesthetic</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default Index;

</edits_to_apply>
