# Infinity Pixel - Dynamic Next.js Template

A fully dynamic Next.js website template that allows you to customize all content and themes through simple JSON files. Perfect for agencies, freelancers, or businesses looking to quickly deploy customized websites for clients.

## Features

- 🔄 **Fully Dynamic Content**: All website content is loaded from JSON files
- 🎨 **Theming System**: Change colors, fonts, and styling through theme presets
- 📱 **Responsive Design**: Works on all devices from mobile to desktop
- 🚀 **Fast Performance**: Built with Next.js for optimal loading speed
- ✨ **Modern UI**: Sleek animations and modern design elements
- 🧩 **Modular Components**: Easy to extend with additional sections

## Getting Started

### Prerequisites

- Node.js 14.x or later
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Content Customization

All website content is stored in JSON files located in the `public/content` directory:

- `home.json`: Main content for all website sections
- `theme.json`: Theme configuration including colors, fonts, etc.
- `seo.json`: SEO-related content like meta descriptions

### How to Modify Content

To customize the website content, simply edit the JSON files:

#### Example: Changing the Hero Section

1. Open `public/content/home.json`
2. Locate the `hero` section
3. Modify the values:

```json
"hero": {
  "eyebrow": "Your custom eyebrow text",
  "title": "Your custom title",
  "description": "Your custom description text",
  "backgroundImage": "/images/your-image.jpg",
  "backgroundVideo": "/videos/your-video.mp4",
  "statLabel": "Your stat label",
  "statBody": "Your stat description",
  "statImage": "/images/your-image.jpg",
  "statStack": ["/images/image1.jpg", "/images/image2.jpg"],
  "ctaLabel": "Your button text",
  "ctaHref": "#your-section"
}
```

### Theme Customization

#### Basic Theme Changes

1. Open `public/content/theme.json`
2. Modify the main theme values:

```json
{
  "colors": {
    "primary": "#your-color-code",
    "secondary": "#your-color-code",
    "background": "#your-color-code",
    "foreground": "#your-color-code"
  },
  "fonts": {
    "body": "Your Font, system-ui, sans-serif",
    "heading": "Your Font, system-ui, sans-serif"
  }
}
```

#### Theme Presets

The template comes with multiple theme presets that can be switched in real-time:

```json
"presets": {
  "light": {
    "colors": {
      "primary": "#6b5bff",
      "background": "#ffffff",
      "foreground": "#111111"
    }
  },
  "dark": {
    "colors": {
      "primary": "#8b7dff",
      "background": "#111111",
      "foreground": "#ffffff"
    }
  }
}
```

You can add your own presets by adding new entries to the `presets` object.

### Adding Images and Media

1. Add your media files to the appropriate folders in the `public` directory:
   - `/public/images/` for images
   - `/public/videos/` for videos

2. Reference them in the JSON files using relative paths, e.g., `/images/your-image.jpg`

## Structure Overview

- `pages/`: Next.js pages
- `src/components/ui/`: UI components for different sections
- `src/components/ThemeProvider.tsx`: Theme management
- `src/lib/`: Helper functions and type definitions
- `src/styles/`: Global styles
- `public/content/`: JSON content files
- `public/images/`: Image assets
- `public/videos/`: Video assets

## Advanced Customization

### Adding New Sections

1. Create a new component in `src/components/ui/`
2. Add corresponding content structure to `src/lib/content.ts`
3. Add the content data to `public/content/home.json`
4. Import and use the component in `pages/index.tsx`

### Creating Custom Theme Presets

1. Add a new preset in `public/content/theme.json`:

```json
"presets": {
  "your-preset-name": {
    "colors": {
      "primary": "#your-color",
      "secondary": "#your-color",
      "background": "#your-color",
      "foreground": "#your-color"
    },
    "fonts": {
      "body": "Your Font, sans-serif",
      "heading": "Your Font, sans-serif"
    }
  }
}
```

2. The preset will automatically appear in the theme switcher

## Usage Tips

- Use descriptive content in the JSON files for better maintainability
- Keep image file sizes optimized for better performance
- For larger images, consider using Next.js Image component's optimization
- Test your site on different devices to ensure responsiveness

## License

[Include your license information here]
