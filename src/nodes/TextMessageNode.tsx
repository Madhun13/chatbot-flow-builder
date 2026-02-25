import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TextMessageNodeData } from '../types';

/**
 * TextMessageNode — the visual card rendered on the canvas for "Send Message" nodes.
 *
 * Anatomy:
 *   ┌─────────────────────────────┐  ← target handle (top, accepts multiple edges)
 *   │  💬 Send Message       [●]  │  ← source handle (right, max 1 edge)
 *   │  message text here...       │
 *   └─────────────────────────────┘
 *
 * To add a new node type, create a new file like this one and register it
 * in the nodeTypes map in App.tsx.
 */
const TextMessageNode = ({ data, selected }: NodeProps<TextMessageNodeData>) => {
  return (
    <div className={`text-node ${selected ? 'text-node--selected' : ''}`}>
      {/* Target handle — top center, accepts multiple incoming edges */}
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle node-handle--target"
      />

      {/* Node header */}
      <div className="text-node__header">
        <span className="text-node__icon">💬</span>
        <span className="text-node__title">Send Message</span>
        {/* Source handle — right side, only 1 outgoing edge allowed (enforced in onConnect) */}
        <Handle
          type="source"
          position={Position.Right}
          className="node-handle node-handle--source"
        />
      </div>

      {/* Node body — displays the message text */}
      <div className="text-node__body">
        <p className="text-node__text">{data.label || <em>Empty message…</em>}</p>
      </div>
    </div>
  );
};

// memo prevents unnecessary re-renders when unrelated state changes
export default memo(TextMessageNode);
