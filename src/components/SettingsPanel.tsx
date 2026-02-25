import { Node } from 'reactflow';
import { FlowNodeData } from '../types';

interface SettingsPanelProps {
  node: Node<FlowNodeData>;
  onLabelChange: (nodeId: string, label: string) => void;
  onBack: () => void;
}

/**
 * SettingsPanel — shown in place of NodesPanel when a node is selected.
 * 
 * Extensibility: to support different settings for different node types,
 * add a switch/map here keyed on `node.data.type` and render the
 * appropriate settings sub-component.
 */
const SettingsPanel = ({ node, onLabelChange, onBack }: SettingsPanelProps) => {
  return (
    <aside className="sidebar sidebar--settings">
      {/* Back navigation */}
      <button className="settings__back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="sidebar__section-label">Message Settings</div>

      {/* Render settings based on node type */}
      {node.data.type === 'textMessage' && (
        <div className="settings__field">
          <label className="settings__label" htmlFor="node-text">
            Text
          </label>
          <textarea
            id="node-text"
            className="settings__textarea"
            value={node.data.label}
            onChange={(e) => onLabelChange(node.id, e.target.value)}
            placeholder="Type your message…"
            rows={5}
            autoFocus
          />
          <span className="settings__hint">
            This text will be sent as the chatbot message.
          </span>
        </div>
      )}

      {/* 🔮 Future: add more type-specific settings panels here */}
    </aside>
  );
};

export default SettingsPanel;
