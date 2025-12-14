# SEO Setup Guide

## Required Files

### Favicons (Light & Dark Mode)
Place these files in the `/public` directory:

1. **favicon-light.ico** - Light mode favicon
2. **favicon-dark.ico** - Dark mode favicon  
3. **favicon.ico** - Default fallback favicon
4. **apple-touch-icon.png** - Apple touch icon (180x180px)

### Open Graph Image
1. **og.png** - Open Graph image (1200x630px recommended)
   - Place in `/public/og.png`
   - Used for social media sharing previews

### Site Manifest (Optional but recommended)
Create `/public/site.webmanifest`:

```json
{
  "name": "Joide - Blockchain & Software Developer",
  "short_name": "Joide",
  "description": "Joshua Idele's personal website",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/favicon-light.ico",
      "sizes": "any",
      "type": "image/x-icon"
    },
    {
      "src": "/favicon-dark.ico",
      "sizes": "any",
      "type": "image/x-icon"
    }
  ]
}
```

## Environment Variables

Make sure to set in your deployment:
- `NEXT_PUBLIC_BASE_URL` - Your production URL (e.g., `https://joide.me`)

## SEO Features Implemented

✅ **Root Layout (`app/layout.tsx`)**
- Comprehensive metadata
- Open Graph tags
- Twitter Card tags
- Light/Dark mode favicons
- Robots meta tags
- Canonical URLs

✅ **Home Page (`app/page.tsx`)**
- Page-specific metadata
- Structured data (JSON-LD) for Person schema
- Open Graph and Twitter cards

✅ **Blog Listing (`app/blog/page.tsx`)**
- Blog-specific metadata
- SEO-optimized description

✅ **Blog Posts (`app/blog/[slug]/page.tsx`)**
- Dynamic metadata per post
- Article structured data (BlogPosting schema)
- Post-specific Open Graph images
- Tags and keywords from post data

✅ **Project Pages (`app/project/[slug]/page.tsx`)**
- Dynamic metadata per project
- SoftwareApplication structured data
- Project-specific Open Graph images
- Tech stack keywords

✅ **About Page (`app/about/page.tsx`)**
- About page metadata
- SEO-optimized description

✅ **Additional SEO**
- Robots.txt file
- Canonical URLs on all pages
- Proper heading hierarchy
- Semantic HTML
- Alt text on images

## Next Steps

1. Add the favicon files mentioned above
2. Create/upload the og.png image (1200x630px)
3. Set `NEXT_PUBLIC_BASE_URL` environment variable
4. (Optional) Add sitemap.xml generation
5. (Optional) Submit sitemap to Google Search Console

