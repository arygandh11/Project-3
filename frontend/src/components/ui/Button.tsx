import { Link } from 'react-router-dom';

/**
 * Button component props
 */
interface ButtonProps {
  children: React.ReactNode; // Button content
  to?: string; // If provided, renders as a Link instead of button
  onClick?: () => void; // Click handler (used when to is not provided)
  variant?: 'primary' | 'secondary'; // Button variant (currently not implemented)
  style?: React.CSSProperties; // Additional inline styles
}

/**
 * Reusable Button component
 * Can render as either a Link (if 'to' prop is provided) or a button element
 * Supports custom styling via the style prop
 * 
 * @param children - Content to display inside the button
 * @param to - Optional route path (renders as Link if provided)
 * @param onClick - Optional click handler (used when to is not provided)
 * @param style - Optional custom styles to merge with base styles
 */
function Button({ children, to, onClick, style }: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    padding: '8px 16px',
    border: '1px solid #000',
    backgroundColor: '#ffffff',
    color: '#000',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'inline-block',
    ...style
  };

  if (to) {
    return (
      <Link to={to} style={baseStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} style={baseStyle}>
      {children}
    </button>
  );
}

export default Button;