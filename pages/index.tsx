import Head from 'next/head';
import { GetStaticProps } from 'next';
import NavBar from '@/components/ui/NavBar';
import Hero from '@/components/ui/Hero';
import AboutSection from '@/components/ui/AboutSection';
import TrustedBySection from '@/components/ui/TrustedBySection';
import FeatureTeasers from '@/components/ui/Portfolio';
import ServiceSection from '@/components/ui/Services';
import Footer from '@/components/ui/Footer';
import CallToAction from '@/components/ui/CallToAction';
import Packages from '@/components/ui/Packages';
import Testimonials from '@/components/ui/Testimonials';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import FAQ from '@/components/ui/FAQ';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeExample from '@/components/ui/ThemeExample';
import { HomeContent } from '@/lib/content';
import { Theme } from '@/lib/theme';
import type React from 'react';

type Props = {
  theme: Theme;
  content: HomeContent;
};

export default function Home({ content }: Props) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Head>
          <title>{content.seo.title}</title>
          <meta name="description" content={content.seo.description} />
        </Head>
        <main className="flex flex-col gap-12 p-6">
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
          <AboutSection content={content.about} />
          <TrustedBySection content={content.trustedBy} />
          <FeatureTeasers id="features" content={content.portfolio} />
          <ServiceSection 
            id="services" 
            services={content.services} 
            title="Our Services" 
            description="Discover our comprehensive range of professional services designed to meet your needs"
          />
          <Packages id="packages" content={content.packages} />
          <Testimonials id="testimonials" content={content.testimonials} />
          {/* <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--color-foreground)' }}>Theme Example</h2>
            <ThemeExample />
          </div> */}
          <CallToAction id="cta" content={content.cta} />
          <FAQ id="faq" content={content.faq} />
          <Footer content={content.footer} />
        </main>
        <ScrollToTop />
      </ThemeProvider>
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