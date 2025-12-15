'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Streamline Your Testing Workflow',
  subtitle:
    'Experience seamless testing with our intuitive platform designed for developers who value simplicity and efficiency.',
  description:
    'Transform your development process with automated testing tools that integrate perfectly into your existing workflow. Built for teams that demand reliability without complexity.',
  primaryCtaText: 'Start Testing Now',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  trustBadges: ['Zero Configuration', 'CI/CD Ready', 'Enterprise Security'],
  statsLabel: 'Trusted by 10,000+ developers worldwide',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              <span data-editable="title">{config.title}</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>

            <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              onClick={handlePrimaryClick}
              data-editable-href="primaryCtaHref"
              data-href={config.primaryCtaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Trust Badges */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Card className="bg-card text-card-foreground border-border shadow-sm">
              <CardContent className="p-8">
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-6">
                  {config.trustBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span
                        className="text-sm sm:text-base font-medium text-foreground"
                        data-editable={`trustBadges[${idx}]`}
                      >
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  <span data-editable="statsLabel">{config.statsLabel}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}
