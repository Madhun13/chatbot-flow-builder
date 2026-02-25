import { SaveStatus } from '../hooks/useFlowBuilder';

interface TopBarProps {
  saveStatus: SaveStatus;
  saveError: string;
  onSave: () => void;
}

/**
 * TopBar — fixed header with the app title and Save button.
 * Displays success/error feedback after save attempts.
 */
const TopBar = ({ saveStatus, saveError, onSave }: TopBarProps) => {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo">⚡</span>
        <span className="topbar__title">Flow Builder</span>
      </div>

      <div className="topbar__center">
        {/* Validation error toast */}
        {saveStatus === 'error' && (
          <div className="toast toast--error" role="alert">
            ⚠ {saveError}
          </div>
        )}
        {/* Success toast */}
        {saveStatus === 'success' && (
          <div className="toast toast--success" role="status">
            ✓ Flow saved successfully!
          </div>
        )}
      </div>

      <button
        className={`save-btn ${saveStatus === 'error' ? 'save-btn--error' : ''}`}
        onClick={onSave}
      >
        {saveStatus === 'success' ? '✓ Saved' : 'Save Changes'}
      </button>
    </header>
  );
};

export default TopBar;
