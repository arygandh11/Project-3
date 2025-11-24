import menuBoardImage from '../assets/menu-board.png';

/**
 * Menu Board View component
 * Renders the provided menu board artwork without altering its format.
 */
function MenuBoardView() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <img
        src={menuBoardImage}
        alt="Boba tea shop menu board"
        className="max-w-full h-auto shadow-2xl"
      />
    </div>
  );
}

export default MenuBoardView;

