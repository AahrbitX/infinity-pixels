export type NavItem = { 
  label: string; 
  href?: string; 
  anchor?: string 
};

export type HeroContent = {
  slides: Array<{
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: string;
    backgroundVideo?: string;
    statLabel: string;
    statBody: string;
    statImage: string;
    ctaLabel: string;
    ctaHref?: string;
  }>;
};

export type Feature = {
  heading: string;
  body: string;
  media?: string;
  variant?: 'text' | 'media';
};

export type Service = {
  name: string;
  body: string;
  image: string;
};

export type AboutContent = {
  tagline: string;
  title: string;
  description: string;
  image: string;
  stats: Array<{ value: string; label: string }>;
  floatingCard: {
    title: string;
    subtitle: string;
  };
};

export type FooterContent = {
  brand: {
    title: string;
    description: string;
  };
  quickLinks: Array<{ label: string; href: string; anchor?: string }>;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  social: Array<{ platform: string; url: string; icon: string }>;
  copyright: string;
  backgroundImage: string;
};

export type TestimonialContent = {
  title: string;
  description: string;
  items: Array<{
    name: string;
    position: string;
    company: string;
    image: string;
    quote: string;
    rating: number;
  }>;
};

export type PackageContent = {
  title: string;
  description: string;
  items: Array<{
    title: string;
    price: string;
    duration: string;
    features: string[];
    popular?: boolean;
    ctaText: string;
    ctaHref: string;
  }>;
};

export type FAQContent = {
  title: string;
  description: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type CallToActionContent = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage?: string;
};

export type TrustedByContent = {
  title: string;
  description: string;
  logos: string[];
};

export type PortfolioContent = {
  title: string;
  description: string;
  categories: string[];
  items: Array<{
    title: string;
    category: string;
    image: string;
    description: string;
    link?: string;
  }>;
};

export type HomeContent = {
  nav: NavItem[];
  hero: HeroContent;
  features: Feature[];
  services: Service[];
  about: AboutContent;
  footer: FooterContent;
  testimonials: TestimonialContent;
  packages: PackageContent;
  faq: FAQContent;
  cta: CallToActionContent;
  trustedBy: TrustedByContent;
  portfolio: PortfolioContent;
  seo: {
    title: string;
    description: string;
  };
};

export async function loadHomeContent(): Promise<HomeContent> {
  const res = await fetch('/content/home.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load home content');
  return (await res.json()) as HomeContent;
}

export async function loadNavContent(): Promise<NavItem[]> {
  const res = await fetch('/content/home.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load navigation content');
  const data = await res.json();
  return data.nav || [];
}


