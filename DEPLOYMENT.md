# Deployment Configuration for admin.joide.me

## Subdomain Setup

The admin dashboard is configured to work on the `admin.joide.me` subdomain using Next.js middleware.

## Deployment Steps

### 1. DNS Configuration

Add a DNS record for the admin subdomain:
- **Type**: CNAME (recommended) or A
- **Name**: `admin`
- **Value**: 
  - For Vercel: `cname.vercel-dns.com` or your Vercel domain
  - For other providers: Your hosting provider's domain or IP

### 2. Hosting Provider Configuration

#### Vercel (Recommended)
1. Go to your project on Vercel
2. Navigate to **Settings** → **Domains**
3. Add `admin.joide.me` as a domain
4. Vercel will automatically provision SSL and handle DNS
5. Update your DNS records as instructed by Vercel
6. The middleware will automatically route `admin.joide.me` to `/admin`

#### Other Providers (Netlify, Cloudflare Pages, Railway, etc.)
- Add `admin.joide.me` as a custom domain in your hosting provider's settings
- Configure DNS records as required by your provider
- The middleware will automatically route requests from `admin.joide.me` to the `/admin` path

### 3. Environment Variables

Make sure to set the following environment variables in your hosting provider:

```bash
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password_here
DATABASE_URL=your_postgresql_connection_string
```

### 4. Testing

After deployment:
1. Visit `admin.joide.me` - should show the admin login page
2. Visit `joide.me/admin` - will still work in development, but can be blocked in production (see below)

## How It Works

The `middleware.ts` file detects requests coming from the `admin.joide.me` subdomain and internally rewrites them to the `/admin` path. This means:
- `admin.joide.me` → serves `/admin` page
- `admin.joide.me/api/admin/*` → serves `/api/admin/*` routes
- All routing happens internally, so URLs stay clean
- No redirects needed - the rewrite is transparent to the user

## Optional: Enforce Subdomain-Only Access

If you want to block direct access to `/admin` on the main domain in production, uncomment the redirect code in `middleware.ts` (around lines 30-35). This will redirect any attempts to access `joide.me/admin` to `admin.joide.me`.

**Note**: Keep it commented during development so you can test locally at `localhost:3000/admin`.

## Local Development

For local development, you can:
1. Use `localhost:3000/admin` directly (works as-is)
2. Or add to your `/etc/hosts` file:
   ```
   127.0.0.1 admin.localhost
   ```
   Then access via `admin.localhost:3000` (the middleware will detect it)

