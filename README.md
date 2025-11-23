# Product Management Application

product management application built with React 19, React Router v7, Vite, and Tailwind CSS v4, optimized for Cloudflare Pages deployment.

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features (`useTransition`, `useOptimistic`)
- **React Router v7** - Modern routing with lazy loading and error boundaries
- **Vite 7** - Next-generation frontend tooling
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe development with strict mode
- **Zod** - Schema validation for forms and data
- **React Hook Form** - Performant form management with validation
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **Cloudflare Pages** - Edge deployment with Functions support

## ✨ Features

### Product Management

- ✅ **Full CRUD Operations** - Create, read, update, and delete products
- 🔍 **Advanced Filtering** - Search by name, filter by category
- 📊 **Sorting** - Sort by price, name, discount, stock, or date (ascending/descending)
- 🗑️ **Bulk Delete** - Select and delete multiple products at once
- 🏷️ **Product Variants** - Support for product variants with price and stock modifiers
- 📸 **Image Management** - Multiple image URLs per product
- 🏷️ **Tags & Categories** - Organize products with tags and categories
- 💰 **Discount Management** - Set percentage-based discounts
- ⚖️ **Weight Tracking** - Track product weight in grams

### User Experience

- ⚡ **Optimized Performance** - Code splitting, lazy loading, and optimized builds
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🌙 **Dark Mode** - Full dark mode support with theme persistence
- 🔄 **React 19 Features** - Uses `useTransition` for non-urgent updates and `useOptimistic` for instant feedback
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔔 **Toast Notifications** - User-friendly feedback for all actions
- ⏳ **Loading States** - Proper loading indicators and skeletons
- 🛡️ **Error Handling** - Comprehensive error boundaries and error states

### Developer Experience

- 📦 **Code Splitting** - Route-based and component-based lazy loading
- 🛡️ **Type Safety** - Full TypeScript support with strict mode
- 🚀 **Fast Development** - Hot module replacement and fast refresh
- 🧪 **Form Validation** - Zod schemas with React Hook Form integration
- 📝 **Mock Data** - Pre-configured mock products for development
- ☁️ **Cloudflare Optimized** - Configured for Cloudflare Pages deployment

## 📦 Installation

```bash
# Install dependencies
pnpm install
```

### Environment Variables (Optional)

The application works out of the box with default values. To customize, create a `.env` file:

```env
VITE_APP_TITLE=Product Management
VITE_API_URL=https://api.example.com
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
├── components/              # Reusable UI components
│   ├── ProductTable.tsx    # Main product table with selection
│   ├── ProductForm.tsx     # Add/Edit product form with validation
│   ├── ProductDetail.tsx   # Product detail drawer
│   ├── ProductFilters.tsx  # Search, filter, and sort controls
│   ├── DeleteModal.tsx     # Single product delete confirmation
│   ├── DeleteMultipleModal.tsx  # Bulk delete confirmation
│   ├── ThemeToggle.tsx     # Dark mode toggle
│   ├── ErrorBoundary.tsx   # Error boundary component
│   └── LoadingFallback.tsx # Loading state component
├── routes/                 # React Router route components
│   ├── index.tsx           # Router configuration
│   └── home.tsx            # Home page route (main product management)
├── hooks/                  # Custom React hooks
│   ├── useProductManager.ts  # Main product management logic
│   └── useTheme.ts         # Theme context hook
├── lib/                    # Utility functions
│   ├── env.ts              # Environment variables
│   └── preload.ts          # Preload utilities
├── types/                  # TypeScript type definitions
│   └── Product.ts          # Product and filter types
├── data/                   # Data and mock data
│   └── mockProducts.ts     # Mock product data for development
├── context/                # React context providers
│   └── ThemeContext.tsx    # Theme context (dark/light mode)
├── styles/                 # Global styles
│   └── index.css           # Tailwind CSS and custom styles
└── assets/                 # Static assets
    ├── react.svg
    └── placeholder-image.svg
```

## 🎯 Key Optimizations

### Performance

- **Code Splitting**: Automatic route-based and component-based lazy loading
- **Lazy Loading**: ProductDetail, ProductForm, and modals loaded on demand
- **Optimistic Updates**: Using React 19's `useOptimistic` for instant UI feedback
- **Transition Management**: Using `useTransition` for non-urgent updates (drawer opens, filters)
- **Memoization**: Strategic use of `useMemo` and `useCallback` for expensive operations
- **Debounced Search**: Search input debounced to reduce unnecessary filtering
- **Pagination**: Virtual pagination with configurable items per page
- **Asset Optimization**: Optimized build output with proper chunking and tree shaking

### Developer Experience

- **Path Aliases**: `@/` for `src/` directory (configured in `tsconfig.json` and `vite.config.ts`)
- **TypeScript**: Strict mode with comprehensive type checking
- **ESLint**: Code quality and consistency with TypeScript support
- **Hot Module Replacement**: Fast development feedback with Vite HMR
- **Environment Variables**: Type-safe environment configuration
- **Mock Data**: Pre-configured mock products for immediate development

### Cloudflare Optimizations

- **Headers Configuration**: Security headers (CSP, XSS protection, frame options) and caching strategies
- **Redirects**: SPA routing support via `_redirects` file
- **Middleware**: Cloudflare Pages Functions middleware for dynamic header injection
- **Build Optimization**: Optimized for Cloudflare's edge network
- **Asset Caching**: Long-term caching for static assets (31536000s), no-cache for HTML

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root:

```env
VITE_APP_TITLE=Product Management
VITE_API_URL=https://api.example.com
```

Environment variables are type-safe and accessed via `src/lib/env.ts`.

### Path Aliases

The project uses path aliases for cleaner imports (configured in `tsconfig.json` and `vite.config.ts`):

```typescript
import { ProductTable } from "@/components/ProductTable";
import { useProductManager } from "@/hooks/useProductManager";
import type { Product } from "@/types/Product";
```

### Tailwind CSS v4

Tailwind CSS v4 is configured via `tailwind.config.js` and `src/styles/index.css`. The project uses:

- Custom color schemes
- Dark mode support
- Custom animations and transitions
- Responsive utilities

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

- **Custom Component Classes**: Defined in `src/styles/index.css`
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Custom Animations**: Smooth transitions for drawers, modals, and interactions
- **Icon System**: Lucide React icons for consistent iconography
- **Theme Context**: React Context API for theme management across the app

## 🔒 Security

### Headers (via `_headers` and `functions/_middleware.ts`)

- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
- **X-XSS-Protection**: 1; mode=block (XSS protection)
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restricts geolocation, microphone, camera

### Input Validation

- **Zod Schemas**: All form inputs validated with Zod schemas
- **React Hook Form**: Client-side validation with server-ready schemas
- **Type Safety**: TypeScript ensures type safety at compile time

### Caching Strategy

- **Static Assets**: Long-term caching (1 year) with immutable flag
- **HTML**: No-cache with must-revalidate for always-fresh content

## 📄 License

MIT
