'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Shield, Clock, Users, BarChart3 } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Why Choose Test Site',
  sectionSubtitle: 'Powerful features designed for modern testing needs',
  features: [
    {
      id: 'automated-testing',
      icon: 'Zap',
      title: 'Automated Testing',
      description:
        'Run comprehensive test suites automatically with intelligent scheduling and parallel execution.',
      badge: 'Core',
    },
    {
      id: 'real-time-monitoring',
      icon: 'BarChart3',
      title: 'Real-time Monitoring',
      description:
        'Monitor application performance and catch issues before they impact your users.',
      badge: 'Pro',
    },
    {
      id: 'secure-testing',
      icon: 'Shield',
      title: 'Secure Testing Environment',
      description:
        'Enterprise-grade security with isolated test environments and encrypted data handling.',
      badge: 'Enterprise',
    },
    {
      id: 'fast-execution',
      icon: 'Clock',
      title: 'Lightning Fast Execution',
      description:
        'Optimized test runners deliver results in seconds, not minutes. Speed up your development cycle.',
      badge: 'Performance',
    },
    {
      id: 'team-collaboration',
      icon: 'Users',
      title: 'Team Collaboration',
      description:
        'Share test results, collaborate on test cases, and maintain quality standards across teams.',
      badge: 'Teams',
    },
    {
      id: 'comprehensive-reporting',
      icon: 'CheckCircle',
      title: 'Comprehensive Reporting',
      description:
        'Detailed analytics and reporting with customizable dashboards and export capabilities.',
      badge: 'Analytics',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

const iconMap = {
  Zap,
  BarChart3,
  Shield,
  Clock,
  Users,
  CheckCircle,
};

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || CheckCircle;
    return <IconComponent className="h-8 w-8 text-primary" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={feature.id}
              className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-200"
            >
              <CardContent className="p-8">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">{getIcon(feature.icon)}</div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-muted/50 text-muted-foreground rounded-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                All features included in every plan
              </span>
            </div>
            <p className="text-sm">
              No hidden costs, no feature limitations. Get access to our complete testing suite with
              transparent pricing and unlimited usage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
