# Boba POS System - Frontend

React + TypeScript + Vite frontend application for the Boba POS System.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Backend server running (see backend README)
- Environment variables configured

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Environment Setup

Create a `.env` file in the `frontend/` directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

For production, update this to your production backend URL:
```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

## Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API client functions
│   │   ├── authApi.ts
│   │   ├── menuApi.ts
│   │   ├── orderApi.ts
│   │   ├── inventoryApi.ts
│   │   ├── analyticsApi.ts
│   │   └── config.ts
│   ├── components/     # React components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ManagerView.tsx
│   │   ├── CashierView.tsx
│   │   ├── CustomerView.tsx
│   │   ├── MenuBoardView.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── AccessibilityButton.tsx
│   │   ├── reports/    # Manager report components
│   │   └── ui/         # Reusable UI components
│   ├── contexts/       # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── AccessibilityContext.tsx
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main app component with routing
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── vercel.json         # Vercel deployment configuration
```

## Features

- **Authentication**: Google OAuth 2.0 integration
- **Role-based Access**: Protected routes for different user roles
- **Real-time Updates**: Live order status updates
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: Built-in accessibility features
- **Type Safety**: Full TypeScript support

## Routes

- `/` - Login page (default)
- `/login` - Login page
- `/home` - Landing page with navigation (protected)
- `/manager` - Manager dashboard (protected)
- `/cashier` - Cashier interface (protected)
- `/customer` - Customer ordering interface (public)
- `/menu-board` - Public menu display (public)

## Development

### Adding New Components

1. Create component file in `src/components/`
2. Import and use in `App.tsx` or parent component
3. Add route in `App.tsx` if needed

### API Integration

All API calls are centralized in `src/api/` directory. Each module has its own API client file that handles communication with the backend.

### Styling

This project uses Tailwind CSS for styling. Configure classes in `tailwind.config.js` and use utility classes in components.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
npm run dev -- --port 3001
```

### CORS Issues

Ensure your backend CORS configuration allows requests from `http://localhost:5173` (or your frontend URL).

### Authentication Not Working

1. Verify `VITE_API_BASE_URL` is correct
2. Check backend is running
3. Verify Google OAuth is configured (see `GOOGLE_OAUTH_SETUP.md`)
4. Check browser console for errors

### Build Errors

If you encounter TypeScript errors during build:

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix linting issues
npm run lint -- --fix
```

## Deployment

### Vercel

The project includes `vercel.json` for Vercel deployment. Simply connect your repository to Vercel and deploy.

### Other Platforms

1. Build the application: `npm run build`
2. Deploy the `dist/` directory to your hosting platform
3. Configure environment variables on your hosting platform
4. Ensure your hosting platform supports client-side routing (SPA)

## Scripts Reference

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM bindings
- `react-router-dom` - Client-side routing
- `typescript` - Type safety

### Build Tools
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite

### Styling
- `tailwindcss` - Utility-first CSS framework
- `autoprefixer` - CSS vendor prefixing
- `postcss` - CSS processing

### Development
- `eslint` - Code linting
- `typescript-eslint` - TypeScript ESLint rules

## License

See root directory for license information.
