# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a marketing website for Preston Speaking Club, a Toastmasters organisation in Preston, UK. The site is built with Astro 5.x and uses Tailwind CSS 4.x for styling.

**Key information:**
- Site URL: https://prestonspeakingclub.co.uk
- Meeting schedule: 1st and 3rd Thursday of each month, 6:30 PM - 8:45 PM
- Location: Caritas Care Plungington Community Centre, Brook Street, Preston, PR1 7NB
- Contact: info@prestonspeakingclub.co.uk

## Commands

All commands are run from the root directory:

- `npm run dev` - Start local dev server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview build locally before deploying
- `npm run astro` - Run Astro CLI commands (e.g., `npm run astro add`)

## Architecture

### Tech Stack

- **Framework**: Astro 5.x (static site generation)
- **Styling**: Tailwind CSS 4.x (using @theme directive in global.css)
- **React Integration**: @astrojs/react for interactive components (LocationMap)
- **SEO**: @astrojs/sitemap for sitemap generation

### Project Structure

```
src/
├── pages/
│   └── index.astro          # Main landing page (single-page site)
├── layouts/
│   └── Layout.astro         # Base layout wrapper with SEO components
├── components/
│   ├── Header.astro         # Fixed header with navigation
│   ├── SEO.astro           # SEO meta tags (OG, Twitter, canonical)
│   ├── StructuredData.astro # JSON-LD schema markup
│   └── LocationMap.jsx      # React component for interactive map
└── styles/
    └── global.css          # Tailwind config with brand colors
```

### Component Architecture

**Layout.astro** is the base wrapper that:
- Imports global styles (Tailwind CSS)
- Includes SEO component for meta tags
- Includes StructuredData component for schema markup
- Sets up favicon links

**SEO Component** (`src/components/SEO.astro`):
- Generates canonical URLs
- Provides Open Graph tags for social media
- Provides Twitter Card tags
- Handles robots meta directives
- All URLs are constructed relative to `https://prestonspeakingclub.co.uk`

**StructuredData Component** (`src/components/StructuredData.astro`):
- Includes Organization schema for the club
- Includes LocalBusiness schema with meeting times and location
- Hardcoded coordinates: 53.76886, -2.71142

**LocationMap Component** (`src/components/LocationMap.jsx`):
- React component using react-leaflet and leaflet
- Client-side only (uses `client:load` directive in Astro)
- Dynamically imports map libraries to avoid SSR issues
- Hardcoded venue coordinates: [53.76886, -2.71142]
- Includes "Get Directions" button that opens Google Maps

### Styling System

**Brand Colors** (defined in `src/styles/global.css`):
- Primary brand color: `preston-blue` (#020665)
- Color scale from preston-blue-50 (lightest) to preston-blue-900 (darkest)
- Use `text-preston-blue`, `bg-preston-blue`, etc. in Tailwind classes

**CSS Architecture**:
- Uses Tailwind CSS 4.x with @theme directive (newer syntax)
- Global styles in `src/styles/global.css`
- Component-specific styles use inline `<style>` tags in .astro files
- Smooth scrolling and custom scrollbar defined globally

### Page Structure

The site is a single-page application with sections:
1. Hero (with video background)
2. About
3. Membership Benefits
4. Meetings (with interactive map)
5. FAQ (using HTML details/summary)
6. Contact/Footer

All sections use anchor links (#about, #meetings, etc.) with smooth scrolling.

## Development Notes

### When Adding New Pages

1. Update the SEO component props (title, description, url)
2. Update the Header navigation links if needed
3. Add new routes to the sitemap configuration if necessary

### When Modifying Styles

- Brand colors must use the preston-blue palette defined in global.css
- Follow the existing color scheme: preston-blue (#020665) with white/gray backgrounds
- Use Tailwind utilities; only add custom CSS when absolutely necessary

### When Working with React Components

- Mark with `client:load` directive in Astro files for client-side hydration
- Avoid server-side rendering for components using browser APIs (like Leaflet)
- Use dynamic imports for heavy libraries to improve initial load time

### SEO Considerations

- All meta tags are managed through the SEO component
- Structured data schemas are defined in StructuredData component
- Site URL is hardcoded as `https://prestonspeakingclub.co.uk` in multiple places
- Canonical URLs are automatically generated based on the current pathname

### Images and Assets

- Logo: `/Preston Speaking Club Logo - no bg.png`
- Venue photos: `/community-centre-front.webp` and `/community-centre-back.webp`
- Hero video: `/hero-video.mp4`
- All public assets go in `/public/` directory (not `/src/`)
