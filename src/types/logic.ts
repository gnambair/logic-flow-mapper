export type NodeId = string;

export interface LogicNode {
  id: NodeId;
  condition: string;
  children: NodeId[];
}

//Graph structure
export interface LogicGraph {
  nodes: Record<NodeId, LogicNode>;
}
