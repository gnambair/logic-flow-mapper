import React from "react";
import type { LogicNode } from "../types/logic";

type Props = {
  node: LogicNode;

  graph: Record<string, LogicNode>;

  visited: Set<string>;

  onChange: (id: string, value: string) => void;

  onAddChild: (parentId: string, existingId?: string) => void;
  onDelete: (id: string) => void;
};

const Node = ({
  node,
  graph,
  visited,
  onChange,
  onAddChild,
  onDelete,
}: Props) => {
  // if node already visited → loop detected
  if (visited.has(node.id)) {
    return (
      <div className="ml-6 mt-3 text-red-500 font-semibold">
        Loop detected at node {node.id.slice(0, 4)}
      </div>
    );
  }

  const newVisited = new Set([...visited, node.id]);

  return (
    <div className="ml-6 mt-3">
      <div className="border p-4 rounded-lg shadow bg-white">
        <input
          value={node.condition}
          onChange={(e) => onChange(node.id, e.target.value)}
          placeholder={`Condition (${node.id.slice(0, 4)})`}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={() => onAddChild(node.id)}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Child
        </button>

        <select
          onChange={(e) => {
            if (!e.target.value) return;

            onAddChild(node.id, e.target.value);
          }}
          className="border p-2 mt-2 w-full rounded"
        >
          <option value="">Link existing node</option>

          {Object.values(graph).map(
            (n) =>
              n.id !== node.id && (
                <option key={n.id} value={n.id}>
                  {n.condition || n.id}
                </option>
              ),
          )}
        </select>
        <button
          onClick={() => onDelete(node.id)}
          className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>

      {/* children */}

      {node.children.map((childId) => {
        const childNode = graph[childId];

        if (!childNode) return null;

        return (
          <Node
            key={childId}
            node={childNode}
            graph={graph}
            visited={newVisited}
            onChange={onChange}
            onAddChild={onAddChild}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default Node;
