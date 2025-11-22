# Product Management Application

A modern, high-performance product management application built with React 19, React Router v7, Vite, and Tailwind CSS v4, optimized for Cloudflare Pages deployment.

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **React Router v7** - Modern routing with data loaders
- **Vite 7** - Next-generation frontend tooling
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Zod** - Schema validation
- **React Hook Form** - Performant forms
- **Cloudflare Pages** - Edge deployment

## ✨ Features

- ⚡ **Optimized Performance** - Code splitting, lazy loading, and optimized builds
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- 🔄 **React 19 Features** - Uses `useTransition`, `useOptimistic` for better UX
- 📦 **Code Splitting** - Route-based and component-based code splitting
- 🛡️ **Type Safety** - Full TypeScript support with strict mode
- 🚀 **Fast Development** - Hot module replacement and fast refresh
- ☁️ **Cloudflare Optimized** - Configured for Cloudflare Pages deployment

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
```

## 🛠️ Development

```bash
# Start development server
pnpm dev

# Type check
pnpm type-check

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🚀 Deployment

### Cloudflare Pages

The project is configured for Cloudflare Pages deployment with optimized settings:

1. **Using Wrangler CLI:**
   ```bash
   # Deploy to production
   pnpm deploy
   
   # Deploy to preview branch
   pnpm deploy:preview
   
   # Create a new Pages project
   pnpm pages:project:create
   
   # Test Pages Functions locally
   pnpm pages:dev
   ```

2. **Using GitHub Actions:**
   - Push to `main` branch
   - GitHub Actions will automatically build and deploy
   - Configure secrets in GitHub:
     - `CLOUDFLARE_API_TOKEN`
     - `CLOUDFLARE_ACCOUNT_ID`

3. **Using Cloudflare Dashboard:**
   - Connect your GitHub repository
   - Set build command: `pnpm build`
   - Set output directory: `dist`
   - Framework preset: React
   - Deploy!

### Cloudflare Pages Functions

The project includes a middleware function (`functions/_middleware.ts`) that adds security headers to all responses. This works alongside the static `_headers` file for comprehensive security coverage.

### React Router v7 on Cloudflare Pages

React Router v7 is fully configured for Cloudflare Pages:

- **SPA Routing**: The `_redirects` file ensures all routes serve `index.html`, allowing React Router v7 to handle client-side routing
- **Middleware**: Optimized to skip static assets and only process HTML responses
- **Code Splitting**: Routes are lazy-loaded for optimal performance
- **Error Handling**: Route-level error boundaries for graceful error handling

See [CLOUDFLARE_REACT_ROUTER.md](./CLOUDFLARE_REACT_ROUTER.md) for detailed information about the React Router v7 + Cloudflare Pages setup.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── routes/             # React Router route components
│   ├── index.tsx       # Router configuration
│   └── home.tsx        # Home page route
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── env.ts          # Environment variables
│   └── preload.ts      # Preload utilities
├── types/              # TypeScript type definitions
├── context/            # React context providers
├── styles/             # Global styles
└── assets/             # Static assets
```

## 🎯 Key Optimizations

### Performance
- **Code Splitting**: Automatic route-based and manual chunk splitting
- **Lazy Loading**: Components loaded on demand
- **Optimistic Updates**: Using React 19's `useOptimistic`
- **Transition Management**: Using `useTransition` for non-urgent updates
- **Asset Optimization**: Optimized build output with proper chunking

### Developer Experience
- **Path Aliases**: `@/` for `src/` directory
- **TypeScript**: Strict mode with comprehensive type checking
- **ESLint**: Code quality and consistency
- **Hot Module Replacement**: Fast development feedback
- **Environment Variables**: Type-safe environment configuration

### Cloudflare Optimizations
- **Headers Configuration**: Security and caching headers
- **Redirects**: SPA routing support
- **Build Optimization**: Optimized for Cloudflare's edge network
- **Asset Caching**: Long-term caching for static assets

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_APP_TITLE=Product Management
VITE_API_URL=https://api.example.com
```

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import { Component } from "@/components/Component";
import { useHook } from "@/hooks/useHook";
import type { Product } from "@/types/Product";
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm build:analyze` - Build with bundle analysis
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm type-check` - Type check without emitting
- `pnpm clean` - Clean build artifacts
- `pnpm deploy` - Build and deploy to Cloudflare

## 🎨 Styling

The project uses Tailwind CSS v4 with:
- Custom component classes in `src/styles/index.css`
- Dark mode support
- Responsive design utilities
- Custom animations and transitions

## 🔒 Security

- Content Security Policy headers
- XSS protection
- Secure cookie handling
- Input validation with Zod

## 📄 License

MIT
