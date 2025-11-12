import { Link } from 'react-router-dom';

/**
 * Landing Page component
 * Main entry point of the application
 * Provides navigation links to different views:
 * - Manager: Dashboard for managing inventory, viewing analytics, and orders
 * - Cashier: Interface for creating and processing orders
 * - Customer: Customer-facing ordering interface
 * - Menu Board: Public menu display
 */
function LandingPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffffff' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'normal', marginBottom: '40px' }}>Boba POS System</h1>
      {/* Navigation links to different application views */}
      <div style={{ marginTop: '40px' }}>
        <Link to="/manager" style={{ display: 'block', margin: '10px', padding: '10px', border: '1px solid #ddd', textDecoration: 'none', color: '#000', backgroundColor: '#ffffff' }}>
          Manager
        </Link>
        <Link to="/cashier" style={{ display: 'block', margin: '10px', padding: '10px', border: '1px solid #ddd', textDecoration: 'none', color: '#000', backgroundColor: '#ffffff' }}>
          Cashier
        </Link>
        <Link to="/customer" style={{ display: 'block', margin: '10px', padding: '10px', border: '1px solid #ddd', textDecoration: 'none', color: '#000', backgroundColor: '#ffffff' }}>
          Customer
        </Link>
        <Link to="/menu-board" style={{ display: 'block', margin: '10px', padding: '10px', border: '1px solid #ddd', textDecoration: 'none', color: '#000', backgroundColor: '#ffffff' }}>
          Menu Board
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;