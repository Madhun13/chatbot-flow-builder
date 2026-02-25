import { useCallback, useState } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import { FlowNodeData } from '../types';
import { generateNodeId, validateFlow, serializeFlow } from '../utils/flowUtils';

export type SaveStatus = 'idle' | 'success' | 'error';

/**
 * useFlowBuilder — central state hook for the entire flow builder.
 * Encapsulates nodes, edges, selection, and all mutation logic.
 * Keeping all state here makes the App component thin and easy to reason about.
 */
export const useFlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Currently selected node id (null = nothing selected)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Save status feedback
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState<string>('');

  // ── Derived: the currently selected node object ──────────────────────────
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  // ── Edge connection handler ───────────────────────────────────────────────
  /**
   * Called when the user drags from a source handle to a target handle.
   * Enforces the rule: each SOURCE handle can have only ONE outgoing edge.
   */
  const onConnect = useCallback(
    (params: Connection) => {
      // Remove any existing edge from the same source handle before adding new one
      setEdges((eds) => {
        const filtered = eds.filter(
          (e) => !(e.source === params.source && e.sourceHandle === params.sourceHandle)
        );
        return addEdge({ ...params, animated: false }, filtered);
      });
    },
    [setEdges]
  );

  // ── Node selection ────────────────────────────────────────────────────────
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // ── Node changes (position, selection, removal) ───────────────────────────
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      // If selected node was removed, deselect
      const removedIds = changes
        .filter((c) => c.type === 'remove')
        .map((c) => (c as { id: string }).id);
      if (selectedNodeId && removedIds.includes(selectedNodeId)) {
        setSelectedNodeId(null);
      }
    },
    [onNodesChange, selectedNodeId]
  );

  // ── Drop handler (drag node from sidebar onto canvas) ─────────────────────
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, reactFlowWrapper: HTMLDivElement | null, project: (pos: { x: number; y: number }) => { x: number; y: number }) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData('application/reactflow/nodetype') as FlowNodeData['type'];
      if (!nodeType || !reactFlowWrapper) return;

      const wrapperBounds = reactFlowWrapper.getBoundingClientRect();
      const position = project({
        x: event.clientX - wrapperBounds.left,
        y: event.clientY - wrapperBounds.top,
      });

      const newNode: Node<FlowNodeData> = {
        id: generateNodeId(),
        type: nodeType,           // maps to the registered custom node component
        position,
        data: { type: nodeType, label: 'New message...' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // ── Settings Panel: update node label ────────────────────────────────────
  const updateNodeLabel = useCallback(
    (nodeId: string, label: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
        )
      );
    },
    [setNodes]
  );

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = useCallback(() => {
    const result = validateFlow(nodes, edges);
    if (!result.valid) {
      setSaveStatus('error');
      setSaveError(result.error ?? 'Invalid flow');
      // Auto-clear error after 4 seconds
      setTimeout(() => setSaveStatus('idle'), 4000);
      return;
    }

    // Export flow as downloadable JSON
    const json = serializeFlow(nodes, edges);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chatbot-flow.json';
    a.click();
    URL.revokeObjectURL(url);

    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  }, [nodes, edges]);

  return {
    nodes,
    edges,
    selectedNode,
    selectedNodeId,
    saveStatus,
    saveError,
    onConnect,
    onNodeClick,
    onPaneClick,
    onNodesChange: handleNodesChange,
    onEdgesChange,
    onDrop,
    onDragOver,
    updateNodeLabel,
    handleSave,
    setSelectedNodeId,
  };
};
