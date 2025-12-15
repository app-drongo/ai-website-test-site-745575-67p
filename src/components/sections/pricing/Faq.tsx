'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our unified deployment platform',
  ctaText: 'Still have questions?',
  ctaHref: '/contact',
  ctaButtonText: 'Contact Support',
  faqs: [
    {
      question: 'What is unified deployment?',
      answer:
        'Unified deployment is a streamlined approach that consolidates your entire application deployment pipeline into a single, cohesive process. It eliminates silos between development, testing, and production environments.',
    },
    {
      question: 'How does it improve deployment speed?',
      answer:
        'By automating manual processes and reducing configuration overhead, unified deployment can reduce deployment times by up to 80%. Our platform handles dependency management, environment provisioning, and rollback procedures automatically.',
    },
    {
      question: 'Is it compatible with existing infrastructure?',
      answer:
        'Yes, our platform integrates seamlessly with popular cloud providers, CI/CD tools, and container orchestration systems. We support AWS, Azure, GCP, Docker, Kubernetes, and most modern development workflows.',
    },
    {
      question: 'What about security and compliance?',
      answer:
        'Security is built into every layer of our deployment process. We provide end-to-end encryption, role-based access controls, audit logging, and compliance with SOC 2, GDPR, and industry-specific regulations.',
    },
    {
      question: 'How do you handle rollbacks?',
      answer:
        'Our platform maintains complete deployment history and enables instant rollbacks to any previous version. Zero-downtime rollbacks are performed automatically if issues are detected during deployment.',
    },
    {
      question: "What's included in the pricing?",
      answer:
        'All plans include unlimited deployments, 24/7 monitoring, automated scaling, security scanning, and comprehensive analytics. Enterprise plans add advanced compliance features, dedicated support, and custom integrations.',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const handleContactClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {config.faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-card-foreground pr-4">
                        <span data-editable={`faqs[${index}].question`}>{faq.question}</span>
                      </h3>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        <span data-editable={`faqs[${index}].answer`}>{faq.answer}</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-lg p-8 border border-border">
          <h3 className="text-xl font-semibold mb-4">
            <span data-editable="ctaText">{config.ctaText}</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Our technical team is here to help you get started with unified deployment.
          </p>
          <Button
            onClick={handleContactClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span data-editable="ctaButtonText">{config.ctaButtonText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
