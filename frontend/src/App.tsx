import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ManagerView from './components/ManagerView';
import CashierView from './components/CashierView';
import CustomerView from './components/CustomerView';
import MenuBoardView from './components/MenuBoardView';

/**
 * Navigation component
 * Displays the current page name and provides a link back to home
 */
function Navigation() {
  const location = useLocation();
  
  /**
   * Get the display name for the current route
   * @returns The page name based on the current pathname
   */
  const getPageName = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/manager':
        return 'Manager';
      case '/cashier':
        return 'Cashier';
      case '/customer':
        return 'Customer';
      case '/menu-board':
        return 'Menu Board';
      default:
        return 'Home';
    }
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: '10px', color: '#000', textDecoration: 'none' }}>
        {getPageName()}
      </Link>
    </nav>
  );
}

/**
 * Main App component
 * Sets up React Router and defines all application routes
 * Routes:
 * - / : Landing page with navigation to different views
 * - /manager : Manager dashboard for inventory, analytics, and orders
 * - /cashier : Cashier interface for creating and managing orders
 * - /customer : Customer ordering interface (placeholder)
 * - /menu-board : Menu board display (placeholder)
 * - * : Catch-all route that redirects to home
 */
function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/manager" element={<ManagerView />} />
          <Route path="/cashier" element={<CashierView />} />
          <Route path="/customer" element={<CustomerView />} />
          <Route path="/menu-board" element={<MenuBoardView />} />
          {/* Catch-all route - redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;