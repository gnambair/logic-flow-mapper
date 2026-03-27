import type { LogicNode } from "../types/logic";

export function detectCycle(
  graph: Record<string, LogicNode>
): boolean {

  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(nodeId: string): boolean {

    if (stack.has(nodeId)) {
      return true;
    }

    if (visited.has(nodeId)) {
      return false;
    }

    visited.add(nodeId);
    stack.add(nodeId);

    for (const childId of graph[nodeId].children) {

      if (dfs(childId)) {
        return true;
      }

    }

    stack.delete(nodeId);

    return false;
  }

  for (const nodeId in graph) {

    if (dfs(nodeId)) {
      return true;
    }

  }

  return false;

}