# Infinity Pixel - Modern Next.js Project

A beautiful, modern website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features a dynamic file structure, responsive design, and smooth animations.

## ✨ Features

- **Modern Tech Stack**: Next.js 13+, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dynamic Content**: JSON-based content management system
- **Video Backgrounds**: Support for hero video backgrounds with fallbacks
- **Accessibility**: ARIA labels, focus management, and semantic HTML
- **Performance**: Optimized images, lazy loading, and efficient animations
- **Error Handling**: Error boundaries and graceful fallbacks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Infinity_pixel
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Infinity_pixel/
├── pages/                 # Next.js pages
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # Document wrapper
│   ├── index.tsx         # Homepage
│   └── portfolio.tsx     # Portfolio page
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # UI components
│   │   │   ├── Hero.tsx
│   │   │   ├── NavBar.tsx
│   │   │   ├── FeatureTeasers.tsx
│   │   │   ├── CityCardGrid.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ErrorBoundary.tsx
│   ├── lib/              # Utility libraries
│   │   ├── content.ts    # Content loading utilities
│   │   └── theme.ts      # Theme management
│   └── styles/           # Global styles
│       └── globals.css   # Global CSS with Tailwind
├── public/               # Static assets
│   ├── content/          # JSON content files
│   │   ├── home.json     # Homepage content
│   │   ├── seo.json      # SEO configuration
│   │   └── theme.json    # Theme configuration
│   ├── images/           # Image assets
│   └── videos/           # Video assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Components

### Core Components

- **Hero**: Main hero section with video/image backgrounds
- **NavBar**: Responsive navigation with scroll highlighting
- **FeatureTeasers**: Feature showcase with media support
- **CityCardGrid**: Location cards with hover effects
- **AboutSection**: Company information with statistics
- **Footer**: Site footer with social links
- **ScrollToTop**: Floating scroll-to-top button
- **LoadingSpinner**: Animated loading indicator
- **ErrorBoundary**: Error handling component

### Component Features

- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first responsive layouts
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading
- **Hover Effects**: Interactive hover states and animations

## 📝 Content Management

The project uses a JSON-based content management system:

### Content Files

- `public/content/home.json`: Homepage content and navigation
- `public/content/theme.json`: Theme configuration
- `public/content/seo.json`: SEO metadata

### Content Structure

```json
{
  "nav": [...],
  "hero": {
    "backgroundImage": "...",
    "backgroundVideo": "...",
    "title": "...",
    "description": "..."
  },
  "features": [...],
  "cities": [...]
}
```

## 🎯 Key Features

### Video Backgrounds
- Support for MP4 video backgrounds in hero sections
- Automatic fallback to images if video fails to load
- Optimized for performance and accessibility

### Animations
- Scroll-triggered animations using Framer Motion
- Smooth hover effects and transitions
- Performance-optimized animations

### Responsive Design
- Mobile-first responsive approach
- Flexible grid layouts
- Touch-friendly interactions

### Accessibility
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

### Performance

- Image optimization with Next.js Image component
- Lazy loading for components
- Efficient animations with Framer Motion
- Optimized bundle sizes

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- The open source community for inspiration

---

Built with ❤️ using modern web technologies
