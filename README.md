# Products Management System

A modern, responsive web application for managing products with advanced filtering, sorting, and CRUD operations. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality

- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Advanced Filtering**: Search by name, description, tags, and category
- **Smart Sorting**: Sort by any field with ascending/descending options
- **Bulk Operations**: Select and manage multiple products simultaneously
- **Infinite Scroll**: Smooth pagination with auto-loading
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### User Experience

- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Real-time Search**: Debounced search with instant results
- **Interactive UI**: Hover effects, smooth transitions, and loading states
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized rendering with React.memo and useMemo

### Data Management

- **Local Storage**: Theme preferences and user settings
- **Mock Data**: Comprehensive sample data for testing
- **Type Safety**: Full TypeScript implementation
- **State Management**: Custom hooks for efficient state handling

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Icons & UI

- **Lucide React** - Beautiful, consistent icon library
- **Custom Components** - Reusable, accessible UI components
- **Responsive Design** - Mobile-first approach

### Development Tools

- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Type Declarations** - Comprehensive type definitions for all file types

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ProductTable.tsx        # Main product table with actions
│   ├── ProductFilters.tsx      # Search, filter, and sort controls
│   ├── ProductForm.tsx         # Add/edit product form
│   ├── ProductDetail.tsx       # Product detail view
│   ├── DeleteModal.tsx         # Single product deletion
│   ├── DeleteMultipleModal.tsx # Bulk deletion confirmation
│   └── ThemeToggle.tsx         # Theme switcher
├── hooks/              # Custom React hooks
│   ├── useProductManager.ts    # Product state and operations
│   └── useTheme.ts            # Theme management
├── context/            # React context providers
│   └── ThemeContext.tsx       # Theme context and provider
├── types/              # TypeScript type definitions
│   ├── Product.ts             # Product interface and types
│   ├── svg.d.ts              # SVG module declarations
│   ├── css.d.ts              # CSS module declarations
│   ├── images.d.ts           # Image file declarations
│   ├── fonts.d.ts            # Font file declarations
│   ├── data.d.ts             # Data file declarations
│   ├── audio.d.ts            # Audio file declarations
│   ├── video.d.ts            # Video file declarations
│   ├── global.d.ts           # Global utility types
│   ├── react.d.ts            # React extensions
│   └── index.d.ts            # Type exports
├── data/               # Mock data and constants
│   └── mockProducts.ts       # Sample product data
├── styles/             # Global styles
│   └── index.css             # Tailwind CSS and custom styles
└── assets/             # Static assets
    ├── placeholder-image.svg  # Default product image
    └── react.svg             # React logo
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd products-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🎯 Usage

### Adding Products

1. Click the "Add Product" button in the header
2. Fill in product details (name, description, price, stock, etc.)
3. Add product images and tags
4. Click "Save Product"

### Managing Products

- **View Details**: Click the eye icon to see full product information
- **Edit**: Click the edit icon to modify product details
- **Delete**: Click the trash icon to remove products
- **Bulk Actions**: Select multiple products for batch operations

### Filtering & Search

- **Search**: Type in the search bar to find products by name, description, or tags
- **Category Filter**: Select specific categories to narrow results
- **Sorting**: Choose sort field and direction for organized viewing

### Theme Switching

- Click the theme toggle button to switch between light and dark modes
- Theme preference is automatically saved and restored

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Products Management
VITE_APP_VERSION=1.0.0
VITE_DEBUG=true
```

### Customization

- **Colors**: Modify Tailwind CSS variables in `src/styles/index.css`
- **Icons**: Replace Lucide React icons with custom SVGs
- **Data**: Update mock data in `src/data/mockProducts.ts`

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px - Stacked layout, compact tables
- **Tablet**: 640px - 1024px - Adaptive grid, medium spacing
- **Desktop**: > 1024px - Full layout, optimal spacing

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🧪 Testing

### Manual Testing

- Test all CRUD operations
- Verify responsive behavior on different screen sizes
- Check theme switching functionality
- Test keyboard navigation
- Verify accessibility features

### Automated Testing (Future)

- Unit tests with Jest and React Testing Library
- Integration tests for user workflows
- E2E tests with Playwright or Cypress

## 🚀 Performance

### Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useMemo**: Memoizes expensive calculations
- **useCallback**: Prevents function recreation
- **Lazy Loading**: Code splitting for better initial load
- **Debounced Search**: Reduces API calls during typing

### Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- **Input Validation**: Client-side validation for all forms
- **XSS Prevention**: Sanitized user inputs
- **CSRF Protection**: Ready for backend implementation
- **Secure Headers**: Configured for production deployment

## 📦 Deployment

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Docker (Future)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comprehensive comments
- Maintain accessibility standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS approach
- **Lucide** - For the beautiful icon library
- **Vite** - For the fast build tool
- **TypeScript** - For type safety

## 📞 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join community discussions
- **Documentation**: Check the docs folder for detailed guides

## 🔮 Roadmap

### Version 1.1

- [ ] User authentication and authorization
- [ ] Product categories management
- [ ] Image upload and management
- [ ] Export to CSV/Excel

### Version 1.2

- [ ] Advanced analytics dashboard
- [ ] Product variants support
- [ ] Inventory tracking
- [ ] API integration

### Version 1.3

- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] Mobile app (React Native)

---

**Made with ❤️ by the Products Management Team**
