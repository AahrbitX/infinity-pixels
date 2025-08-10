export type NavItem = { 
  label: string; 
  href?: string; 
  anchor?: string 
};

export type HeroContent = {
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

export type Feature = {
  heading: string;
  body: string;
  media?: string;
  variant?: 'text' | 'media';
};

export type City = {
  name: string;
  body: string;
  image: string;
};

export type HomeContent = {
  nav: NavItem[];
  hero: HeroContent;
  features: Feature[];
  cities: City[];
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


