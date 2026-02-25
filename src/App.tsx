import { useRef, useCallback } from 'react';
import ReactFlow,{
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowBuilder } from './hooks/useFlowBuilder';
import TextMessageNode from './nodes/TextMessageNode';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import TopBar from './components/TopBar';

/**
 * nodeTypes map — register all custom node components here.
 * The key must match the `type` field on the node object.
 *
 * To add a new node type:
 *   1. Create a new component in src/nodes/
 *   2. Add its type to NodeType in src/types/index.ts
 *   3. Add it to NODE_PANEL_ITEMS in src/types/index.ts
 *   4. Register it below
 */
const nodeTypes = {
  textMessage: TextMessageNode,
  // 🔮 imageMessage: ImageMessageNode,
  // 🔮 buttonMessage: ButtonMessageNode,
};

/**
 * FlowCanvas — inner component that has access to the ReactFlow instance
 * (needed for the `project` function to convert screen coords to canvas coords).
 */
const FlowCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const {
    nodes,
    edges,
    selectedNode,
    saveStatus,
    saveError,
    onConnect,
    onNodeClick,
    onPaneClick,
    onNodesChange,
    onEdgesChange,
    onDrop,
    onDragOver,
    updateNodeLabel,
    handleSave,
    setSelectedNodeId,
  } = useFlowBuilder();

  // Wrap onDrop to inject wrapper ref and project function
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      onDrop(event, reactFlowWrapper.current, project);
    },
    [onDrop, project]
  );

  return (
    <div className="app">
      <TopBar saveStatus={saveStatus} saveError={saveError} onSave={handleSave} />

      <div className="app__body">
        {/* ── Canvas ──────────────────────────────────────────────────────── */}
        <div
          className="canvas-wrapper"
          ref={reactFlowWrapper}
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            deleteKeyCode="Delete"
            snapToGrid
            snapGrid={[15, 15]}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#2a2a3a" />
            <Controls className="rf-controls" />
            <MiniMap
              className="rf-minimap"
              nodeColor="#6c63ff"
              maskColor="rgba(15,15,25,0.7)"
            />
          </ReactFlow>
        </div>

        {/* ── Right Sidebar: Nodes Panel or Settings Panel ─────────────────── */}
        {selectedNode ? (
          <SettingsPanel
            node={selectedNode}
            onLabelChange={updateNodeLabel}
            onBack={() => setSelectedNodeId(null)}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  );
};

/**
 * App — root component, wraps FlowCanvas with the ReactFlowProvider
 * so the `useReactFlow` hook works correctly inside children.
 */
import { ReactFlowProvider } from 'reactflow';

const App = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default App;
