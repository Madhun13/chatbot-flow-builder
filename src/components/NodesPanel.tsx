import { NODE_PANEL_ITEMS, NodePanelItem } from '../types';

/**
 * NodesPanel — the right sidebar that lists draggable node type tiles.
 *
 * Extensibility: adding a new node type only requires adding an entry to
 * NODE_PANEL_ITEMS in types/index.ts — no changes needed here.
 */
const NodesPanel = () => {
  /**
   * Set the drag data to carry the node type identifier.
   * This is read back in the drop handler in useFlowBuilder.ts.
   */
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, item: NodePanelItem) => {
    event.dataTransfer.setData('application/reactflow/nodetype', item.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__section-label">Node Types</div>

      <div className="sidebar__nodes">
        {NODE_PANEL_ITEMS.map((item) => (
          <div
            key={item.type}
            className="node-tile"
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            title={item.description}
          >
            <span className="node-tile__icon">{item.icon}</span>
            <span className="node-tile__label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar__hint">
        ↖ Drag a node onto the canvas
      </div>
    </aside>
  );
};

export default NodesPanel;
