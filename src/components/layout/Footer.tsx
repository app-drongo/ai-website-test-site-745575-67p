'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brandName: 'TestFlow',
  brandDescription: 'Simple, powerful testing solutions for modern development teams',
  companyLinks: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],
  legalLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  socialLinks: [
    { platform: 'GitHub', href: 'https://github.com', icon: 'github' },
    { platform: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  ],
  contactEmail: 'hello@testflow.dev',
  copyrightYear: '2024',
  copyrightText: 'All rights reserved.',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const renderIcon = (iconName: string) => {
    const iconProps = {
      size: 20,
      className: 'text-muted-foreground hover:text-foreground transition-colors',
    };

    switch (iconName) {
      case 'github':
        return <Github {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      default:
        return <Mail {...iconProps} />;
    }
  };

  return (
    <footer id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-foreground">
                <span data-editable="brandName">{config.brandName}</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6">
              <span data-editable="brandDescription">{config.brandDescription}</span>
            </p>

            {/* Contact */}
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = `mailto:${config.contactEmail}`)}
                className="p-0 h-auto text-muted-foreground hover:text-foreground"
                data-editable-href="contactEmail"
                data-href={`mailto:${config.contactEmail}`}
              >
                <Mail size={16} className="mr-2" />
                <span data-editable="contactEmail">{config.contactEmail}</span>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLinkClick(social.href)}
                  className="p-2 h-auto"
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                  aria-label={`Visit our ${social.platform}`}
                >
                  {renderIcon(social.icon)}
                </Button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Company</h4>
            <nav className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLinkClick(link.href)}
                  className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start"
                  data-editable-href={`companyLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Button>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Legal</h4>
            <nav className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLinkClick(link.href)}
                  className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start"
                  data-editable-href={`legalLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © <span data-editable="copyrightYear">{config.copyrightYear}</span>{' '}
            <span data-editable="brandName">{config.brandName}</span>.{' '}
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
