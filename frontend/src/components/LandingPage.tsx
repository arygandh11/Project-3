import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffffff' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'normal', marginBottom: '40px' }}>Boba POS System</h1>
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