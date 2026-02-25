// ─── Node Types ────────────────────────────────────────────────────────────────
// This registry pattern makes it trivial to add new node types in the future:
// just add a new entry here and create corresponding component + panel.

export type NodeType = 'textMessage'; // extend: | 'imageMessage' | 'buttonMessage'

// Data shape for each node type
export interface TextMessageNodeData {
  type: 'textMessage';
  label: string;   // the message text
}

// Union of all node data — add new shapes here as new node types arrive
export type FlowNodeData = TextMessageNodeData;

// ─── Panel Registry ────────────────────────────────────────────────────────────
// Describes what shows in the Nodes Panel sidebar for each draggable node type
export interface NodePanelItem {
  type: NodeType;
  icon: string;       // emoji / unicode icon
  label: string;      // display name
  description: string;
}

// The master list of available node types (rendered as drag tiles in sidebar)
export const NODE_PANEL_ITEMS: NodePanelItem[] = [
  {
    type: 'textMessage',
    icon: '💬',
    label: 'Message',
    description: 'Send a text message',
  },
  // 🔮 Future: add more types here, e.g. image, button, delay, etc.
];
