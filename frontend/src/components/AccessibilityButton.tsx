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
      className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Text size: ${textSize}. Click to change text size`}
      title={`Text size: ${textSize}. Click to cycle through sizes`}
    >
      <span className="text-lg font-semibold">{getButtonLabel()}</span>
    </button>
  );
}

export default AccessibilityButton;

