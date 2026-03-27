import { useState } from "react";
import Node from "./components/Node";
import type { LogicGraph } from "./types/logic";
import { detectCycle } from "./utils/cycleDetection";

function App() {
  const [graph, setGraph] = useState<LogicGraph>({
    nodes: {
      "1": {
        id: "1",
        condition: "",
        children: [],
      },
    },
  });

  const handleChange = (id: string, value: string) => {
    setGraph((prev) => ({
      nodes: {
        ...prev.nodes,
        [id]: {
          ...prev.nodes[id],
          condition: value,
        },
      },
    }));
  };

  const addChild = (parentId: string, existingId?: string) => {
    setGraph((prev: LogicGraph) => {
      const newId = existingId || crypto.randomUUID();

      const newNodes = {
        ...prev.nodes,

        ...(existingId
          ? {}
          : {
              [newId]: {
                id: newId,

                condition: "",

                children: [],
              },
            }),

        [parentId]: {
          ...prev.nodes[parentId],

          children: [...prev.nodes[parentId].children, newId],
        },
      };

      return {
        nodes: newNodes,
      };
    });
  };

  const hasCycle = detectCycle(graph.nodes);

  const simulateLogic = () => {
    if (hasCycle) return;

    const visited = new Set<string>();

    function dfs(id: string) {
      if (visited.has(id)) return;

      visited.add(id);

      console.log("Executing:", graph.nodes[id].condition || id);

      graph.nodes[id].children.forEach(dfs);
    }

    dfs("1");

    alert("Simulation completed. Check console.");
  };

  const deleteNode = (id: string) => {
    if (id === "1") return; // prevent deleting root

    setGraph((prev) => {
      const newNodes = { ...prev.nodes };

      delete newNodes[id];

      Object.values(newNodes).forEach((node) => {
        node.children = node.children.filter((childId) => childId !== id);
      });

      return {
        nodes: newNodes,
      };
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Logic Flow Mapper</h1>

      <Node
        node={graph.nodes["1"]}
        graph={graph.nodes}
        visited={new Set()}
        onChange={handleChange}
        onAddChild={addChild}
        onDelete={deleteNode}
      />
      <button
        disabled={hasCycle}
        onClick={simulateLogic}
        className={`mt-6 px-4 py-2 rounded text-white

  ${hasCycle ? "bg-red-400 cursor-not-allowed" : "bg-green-500"}`}
      >
        Simulate Logic
      </button>

      {hasCycle && (
        <p className="text-red-500 mt-2">Invalid Logic Loop detected</p>
      )}
    </div>
  );
}

export default App;
