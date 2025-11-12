import { useAccessibility } from '../contexts/AccessibilityContext';

/**
 * Accessibility Button component
 * Allows users to toggle text size for better readability
 * Provides three size options: Normal, Large, and Extra Large
 */
function AccessibilityButton() {
  const { textSize, setTextSize } = useAccessibility();

  const cycleTextSize = () => {
    const sizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(textSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setTextSize(sizes[nextIndex]);
  };

  const getButtonLabel = () => {
    switch (textSize) {
      case 'normal':
        return 'Aa';
      case 'large':
        return 'Aa+';
      case 'xlarge':
        return 'Aa++';
      default:
        return 'Aa';
    }
  };

  return (
    <button
      onClick={cycleTextSize}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-full shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-110"
      aria-label={`Text size: ${textSize}. Click to change text size`}
      title={`Text size: ${textSize}. Click to cycle through sizes`}
      style={{ minWidth: '60px', minHeight: '60px' }}
    >
      <span className="text-xl font-bold">{getButtonLabel()}</span>
    </button>
  );
}

export default AccessibilityButton;

