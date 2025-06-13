
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, GitFork, Download, Sparkles, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { AvatarCirclesDemo } from '@/components/AvatarCircleDemo';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { HyperText } from '@/components/magicui/hyper-text';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { WobbleCard } from '@/components/ui/wobble-card';
import { Confetti, ConfettiButton, type ConfettiRef } from "@/components/magicui/confetti";
import { BackgroundLines } from "@/components/ui/background-lines";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    downloads: 0,
    loading: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [displayCursor, setDisplayCursor] = useState(true);
  const confettiRef = useRef<ConfettiRef>(null);
  const [currSignUp, setCurrSignup] = useState(0);

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [])

  // Countdown to July 1, 2025 6 PM IST
  useEffect(() => {
    const targetDate = new Date('2025-07-01T18:00:00+05:30').getTime();

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
          downloads: 0,
          loading: false
        });
      }, 2000);
    };


    const fetchWaitlistCount = async () => {
      try {
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        console.log('Waitlist count:', count);
        if (error) {
          console.error('Error fetching waitlist count:', error);
        } else {
          setCurrSignup(count || 0);
        }
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
      }
    };

    fetchWaitlistCount();

    fetchGithubStats();
  }, []);

  const handleConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current?.fire({});
    }
  }

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
        setIsSubmitted(true);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-pink-400 rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
          </div>
          <p className="mt-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loading Vibelayer...
          </p>
        </div>
      </div>
    )
  }

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
      <div className="fixed left-4 top-1/4 z-10 opacity-50 animate-float">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-60 blur-sm"></div>
      </div>
      <div className="fixed left-8 top-1/2 z-10 opacity-50 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-50 blur-sm"></div>
      </div>
      <div className="fixed left-2 top-3/4 z-10 opacity-50 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-20 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full opacity-40 blur-sm"></div>
      </div>

      <div className="fixed right-4 top-1/3 z-10 opacity-50 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="w-14 h-14 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-60 blur-sm"></div>
      </div>
      <div className="fixed right-8 top-1/2 z-10 opacity-50 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="w-18 h-18 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-50 blur-sm"></div>
      </div>
      <div className="fixed right-2 top-2/3 z-10 opacity-50 animate-float" style={{ animationDelay: '2.5s' }}>
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-300 to-red-300 rounded-full opacity-40 blur-sm"></div>
      </div>
      {/* Show only on desktop */}
      <div className="hidden md:block">
        <ScrollProgress className="h-[6px]" />
        {displayCursor && <SmoothCursor />}
      </div>
      {/* <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-100 size-full"
        // resize
        useWorker={false}
      /> */}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-20">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <RetroGrid />
        </div>
        <div className="space-y-8 max-w-4xl mx-auto relative z-10">
          <div className="space-y-4">
            <RainbowButton size="sm" variant='outline' className='mb-6'>Always Free & Open Source</RainbowButton>
            <h1 style={{ lineHeight: 1.5 }} className="text-6xl animate-fade-in md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
              VibeLayer
            </h1>
            <p className="text-xl animate-fade-in-delayed md:text-2xl text-gray-600 mb-8 animate-fade-in-delayed">
              Your adorable desktop companion who vibes with you
            </p>
            <p className="text-lg animate-fade-in-delayed-2 text-gray-500 mb-12 max-w-2xl mx-auto animate-fade-in-delayed-2">
              Transform your desktop with customizable stickers, GIFs, and companions that float alongside on your screen
            </p>
            {/* <Button
              onClick={handleConfetti}
              className='z-1000 fixed bottom-4 right-4 z-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg px-6 py-3 text-sm font-semibold animate-glow'
            >Check</Button> */}

          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="#waitlist">
              <InteractiveHoverButton
                onMouseEnter={() => setDisplayCursor(false)}
                onMouseLeave={() => setDisplayCursor(true)}
                className="px-7 py-3 text-xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 animate-glow"
              >
                Coming Soon
              </InteractiveHoverButton>
            </a>
          </div>
        </div>
      </section>
      <div className="overflow-hidden dark:bg-[#0B0B0F] bg-transparent w-full">
      <MacbookScroll
        title={
          <span>
            Experience VibeLayer in action - your desktop. <br/> Reimagined with floating companions.
          </span>
        }
        badge={
          <a href="https://peerlist.io/manuarora">
            {/* <Badge className="h-10 w-10 transform -rotate-12" /> */}
            <img src="/icon.png" alt="Badge" className="h-10 w-10" />
          </a>
        }
        src={`/preview1.webp`}
        showGradient={false}
      />
    </div>

      {/* Countdown & GitHub Stats Section */}
      <section className="min-h-screen flex items-center justify-center p-4 relative z-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Countdown */}
          <div className="mb-16">
            <div className="relative mb-12 flex justify-center">
              <div
                className="absolute inset-0 w-full h-full rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-br from-white/10 via-purple-200/60 to-pink-200/60 shadow-xl"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  zIndex: 0
                }}
              />
              <SparklesText
                sparklesCount={14}
                className="relative z-10 text-xl sm:text-2xl md:text-6xl text-white special-cursive px-8 py-6"
              >
                Launch Countdown
              </SparklesText>
            </div>
            <p className="text-lg text-gray-500 mb-2 max-w-2xl mx-auto animate-fade-in-delayed-2">
              July 01, 2025 6 PM IST
            </p>
            <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-8 text-3xl sm:text-5xl md:text-8xl font-bold">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {timeLeft.days.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-2">DAYS</div>
              </div>
              <div className="text-purple-400">:</div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-2">HOURS</div>
              </div>
              <div className="text-pink-400">:</div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-2">MINUTES</div>
              </div>
              <div className="text-indigo-400">:</div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-2">SECONDS</div>
              </div>
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/40 backdrop-blur-lg border-[#EAB30880]/50 py-4 md:py-0 hover:shadow-sm transition-all duration-300 glassy-card">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-800">
                  {githubStats.loading ? <LoadingDots /> : <NumberTicker value={githubStats.stars} />}
                </div>
                <div className="text-gray-600">GitHub Stars</div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-lg border-[#A855F766]/50 py-4 md:py-0 hover:shadow-sm transition-all duration-300 glassy-card">
              <CardContent className="p-6 text-center">
                <GitFork className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-800">
                  {githubStats.loading ? <LoadingDots /> : <NumberTicker value={githubStats.forks} />}
                </div>
                <div className="text-gray-600">Forks</div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-lg border-indigo-300/50 py-4 md:py-0 hover:shadow-sm transition-all duration-300 glassy-card">
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-800">
                  {githubStats.loading ? <LoadingDots /> : <NumberTicker value={githubStats.downloads} />}
                </div>
                <div className="text-gray-600">Downloads</div>
              </CardContent>
            </Card>
          </div>
          <style jsx>{`
            .glassy-card {
              background: rgba(255,255,255,0.35);
              box-shadow: 0 2px 4px 0 rgba(31, 38, 135, 0.18);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border-radius: 1.5rem;
            }
          `}</style>
        </div>
      </section>

      {/* <Separator className="my-12 w-full max-w-6xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 opacity-10 h-[2px]"/> */}

      {/* Waitlist Section */}
      <section id='waitlist' className="flex py-12 mt-24 mb-48 items-center justify-center px-4 relative z-20 overflow-hidden">
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Join the Waitlist
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Be the first to know when Vibelayer launches and get exclusive early access!
            </p>
            {!isSubmitted ? (
              <form onSubmit={handleWaitlistSignup} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 p-6 text-lg border-purple-200 focus:border-purple-400 focus:shadow-md rounded-full"
                    disabled={isSubmitting}
                  />
                  <ConfettiButton type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setDisplayCursor(false)}
                    onMouseLeave={() => setDisplayCursor(true)}
                    className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    {isSubmitting ? 'Joining...' : 'Sign Up'}
                  </ConfettiButton>
                </div>
              </form>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-green-200">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-semibold text-green-600 mb-2">You're on the list!</h3>
                <p className="text-gray-600">We'll notify you as soon as Vibelayer is ready to download.</p>
              </div>
            )}
            <AvatarCirclesDemo currSignUp={currSignUp} />
            <div className="mt-6 flex justify-center">
              <a
                href="https://github.com/mohit-nagaraj/VibeLayer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
                <span className="text-lg">View on GitHub</span>
              </a>
            </div>
          </div>
        </BackgroundLines>
      </section>

      <section className="mt-24 flex items-center justify-center px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <HyperText
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Magical Features
            </HyperText>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to make your desktop more fun and personalized
            </p>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full p-4 mb-4">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Effortless Sticker Magic
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              Make your desktop come alive with drag-and-drop stickers, instant background removal, and total layout freedom.
            </p>
          </div>
          <img
            src="/preview1.webp"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Private & Cross-Platform Vibes
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            VibeLayer is built for everyone, everywhere.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Total Control & Customization
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Personalize your experience with powerful settings and seamless sticker management like Auto-launch and Hide Capture.
            </p>
          </div>
          <img
            src="/preview2.webp"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
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
