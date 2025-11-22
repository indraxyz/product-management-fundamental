# Cloudflare Pages + React Router v7 Configuration

This document explains how React Router v7 is configured to work with Cloudflare Pages.

## How It Works

### 1. SPA Routing Configuration

Cloudflare Pages automatically detects Single Page Applications (SPAs) when there's no `404.html` file in the root. When a route doesn't match a static file, Pages serves `index.html`, allowing React Router v7 to handle client-side routing.

### 2. Redirects File

The `_redirects` file ensures all routes are properly handled:

```
/*    /index.html   200
```

This rule:
- Matches all routes (`/*`)
- Serves `/index.html` for any unmatched route
- Returns HTTP 200 (not 301/302) to preserve the original URL in the browser
- Allows React Router v7 to handle routing on the client side

### 3. Middleware Function

The `functions/_middleware.ts` file:
- Skips processing for static assets (JS, CSS, images, etc.)
- Only applies security headers to HTML responses
- Ensures React Router v7's client-side routing isn't interfered with

### 4. Static Assets

Static assets (from `/assets/` directory) are:
- Served directly by Cloudflare Pages
- Cached with long-term headers (via `_headers` file)
- Not processed by middleware or redirects

## React Router v7 Features

### Client-Side Routing

React Router v7 uses `createBrowserRouter` which:
- Uses the browser's History API
- Maintains clean URLs (no hash fragments)
- Works seamlessly with Cloudflare Pages' SPA handling

### Code Splitting

Routes are lazy-loaded using React's `lazy()`:
- Reduces initial bundle size
- Improves load time
- Works perfectly with Cloudflare's CDN caching

### Error Boundaries

Route-level error boundaries handle:
- 404 errors (via `RouteErrorBoundary`)
- Runtime errors
- Network failures

## Deployment

### Build Process

1. Vite builds the React app to `dist/`
2. React Router v7 routes are bundled into the JavaScript
3. All routes resolve to `index.html` on the server
4. React Router v7 handles routing on the client

### Cloudflare Pages Behavior

1. User requests `/products/123`
2. Cloudflare Pages checks for `/products/123.html` or `/products/123/index.html`
3. Not found, so `_redirects` rule applies
4. Serves `/index.html` with HTTP 200
5. Browser loads React app
6. React Router v7 reads the URL and renders the correct route

## Testing Locally

```bash
# Build the app
pnpm build

# Test with Cloudflare Pages dev server
pnpm pages:dev

# Or use Vite preview (simpler, but not exact Cloudflare behavior)
pnpm preview
```

## Troubleshooting

### Routes Not Working

1. Ensure `_redirects` file is in the `dist/` directory after build
2. Check that `index.html` exists in `dist/`
3. Verify no `404.html` file exists (would disable SPA mode)

### Static Assets Not Loading

1. Check that assets are in `dist/assets/`
2. Verify `_headers` file allows asset caching
3. Ensure middleware skips asset processing

### 404 Errors

1. React Router v7 should handle 404s via `RouteErrorBoundary`
2. If seeing Cloudflare 404, check `_redirects` file is deployed
3. Verify the route exists in your router configuration

## Best Practices

1. **Always use `createBrowserRouter`** - Works best with Cloudflare Pages
2. **Lazy load routes** - Improves performance and caching
3. **Use error boundaries** - Handle errors gracefully
4. **Test with `pages:dev`** - Matches production behavior
5. **Keep `_redirects` simple** - One rule is usually enough

## Additional Resources

- [React Router v7 Documentation](https://reactrouter.com/)
- [Cloudflare Pages SPA Routing](https://developers.cloudflare.com/pages/configuration/serving-pages/#single-page-application-spa-rendering)
- [Cloudflare Pages Redirects](https://developers.cloudflare.com/pages/configuration/redirects/)

