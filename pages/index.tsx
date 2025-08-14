import Head from 'next/head';
import { GetStaticProps } from 'next';
// Tailwind now handles layout, no CSS module needed
import NavBar from '@/components/ui/NavBar';
import Hero from '@/components/ui/Hero';
import AboutSection from '@/components/ui/AboutSection';
import TrustedBySection from '@/components/ui/TrustedBySection';
import FeatureTeasers from '@/components/ui/FeatureTeasers';
import ServiceSection from '@/components/ui/CityCardGrid';
import Footer from '@/components/ui/Footer';
import CallToAction from '@/components/ui/CallToAction';
import Packages from '@/components/ui/Packages';
import Testimonials from '@/components/ui/Testimonials';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import FAQ from '@/components/ui/FAQ';
// import ContactForm from '@/components/ui/ContactForm';
import type React from 'react';

type Theme = {
  colors: Record<string, string>;
  fonts: {
    body: string;
    heading: string;
  };
};

type HomeContent = {
  nav: { label: string; href?: string }[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: string;
    backgroundVideo?: string;
    statLabel: string;
    statBody: string;
    statImage: string;
    statStack?: string[];
    ctaLabel: string;
    ctaHref?: string;
  };
  features: Array<{ heading: string; body: string; media?: string; variant?: 'text' | 'media' }>;
  cities: Array<{ name: string; body: string; image: string }>; // This will be used as services data
};

type Props = {
  theme: Theme;
  content: HomeContent;
};

export default function Home({ theme, content }: Props) {
  const styleVars: React.CSSProperties & Record<`--${string}`, string> = {
    "--color-primary": theme.colors.primary,
    "--color-background": theme.colors.background,
    "--color-foreground": theme.colors.foreground,
    "--font-body": theme.fonts.body,
    "--font-heading": theme.fonts.heading,
  };

  return (
    <ErrorBoundary>
      <Head>
        <title>{content.hero.title}</title>
        <meta name="description" content={content.hero.description} />
      </Head>
      <main className="flex flex-col gap-12 p-6" style={styleVars}>
        <NavBar items={content.nav} />
        <Hero
          backgroundImage={content.hero.backgroundImage}
          backgroundVideo={content.hero.backgroundVideo}
          eyebrow={content.hero.eyebrow}
          title={content.hero.title}
          description={content.hero.description}
          statLabel={content.hero.statLabel}
          statBody={content.hero.statBody}
          statImage={content.hero.statImage}
          statStack={content.hero.statStack}
          ctaLabel={content.hero.ctaLabel}
          ctaHref={content.hero.ctaHref}
        />
        <AboutSection />
        <TrustedBySection />
        <FeatureTeasers id="features"/>
        <ServiceSection id="services" services={content.cities} title="Our Services" description="Discover our comprehensive range of professional services designed to meet your needs"/>
        <Packages id="packages"/>
        <Testimonials id="testimonials"/>
        <CallToAction id="cta"/>
        <FAQ id="faq"/>
        <Footer />
      </main>
      <ScrollToTop />
    </ErrorBoundary>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const fs = await import('fs');
  const path = await import('path');
  const readJson = (p: string) => JSON.parse(fs.readFileSync(p, 'utf-8'));
  const base = path.join(process.cwd(), 'public', 'content');
  const theme = readJson(path.join(base, 'theme.json'));
  const content = readJson(path.join(base, 'home.json'));
  return { props: { theme, content } };
};


