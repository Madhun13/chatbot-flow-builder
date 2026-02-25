import { Node, Edge } from 'reactflow';
import { FlowNodeData } from '../types';

// ─── ID Generator ──────────────────────────────────────────────────────────────
let nodeCounter = 1;
export const generateNodeId = (): string => `node_${Date.now()}_${nodeCounter++}`;

// ─── Flow Validation ───────────────────────────────────────────────────────────
/**
 * Validates the flow before saving.
 * Rule: if there are more than one nodes, every node must have at least one
 * incoming edge (i.e. its target handle must be connected), EXCEPT for exactly
 * one "root" node (the starting node of the flow).
 *
 * Equivalently: at most one node can have an empty target handle.
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateFlow = (
  nodes: Node<FlowNodeData>[],
  edges: Edge[]
): ValidationResult => {
  if (nodes.length <= 1) {
    return { valid: true };
  }

  // Collect all node IDs that have at least one incoming edge
  const nodesWithIncomingEdge = new Set(edges.map((e) => e.target));

  // Nodes WITHOUT any incoming edge (empty target handle)
  const unconnectedNodes = nodes.filter((n) => !nodesWithIncomingEdge.has(n.id));

  // If more than one node has no incoming edge → invalid
  if (unconnectedNodes.length > 1) {
    return {
      valid: false,
      error: `Cannot save Flow — ${unconnectedNodes.length} nodes have empty target handles. Only one node (the start) can be unconnected.`,
    };
  }

  return { valid: true };
};

// ─── Flow Serializer ───────────────────────────────────────────────────────────
/** Serialises the current flow to a JSON string for download/export */
export const serializeFlow = (
  nodes: Node<FlowNodeData>[],
  edges: Edge[]
): string => {
  return JSON.stringify({ nodes, edges }, null, 2);
};
