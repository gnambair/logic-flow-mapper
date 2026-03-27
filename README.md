# Logic Flow Mapper

"Logic Flow Mapper" that allows users to create nested "If-Then" conditions
and validates the integrity of those logic paths in real-time.

---

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Graph traversal algorithm (DFS)

---

## Data Structure Design

I have used Normalized data structure because in Nested, each node will have children as full objects, once this starts expanding, it will be complex to copy multiple level of objects, which can affesct performance.

{
id: "1",
condition: "genre === thriller",
children: [
{
id: "2",
condition: "movie === The Shawshank Redemption",
children: []
}
]
}

That is why I have used Normalized data structure which can do efficient updates for deeply nested nodes, avoids deep cloning which can be difficult, improves performance, and works naturally with graph traversal algorithm.

## Cycle Detection Approach

To detect invalid logic loops, I used the Depth First Search (DFS) graph traversal algorithm.
DFS recursively explores each node and keeps track of:

Visited Set → nodes already explored
Recursion Stack → nodes currently in the active traversal path

If during traversal a node is encountered that already exists in the recursion stack, a cycle is detected.
For Example:
Node A -> Node B -> Node C -> Node A => Cycle is detected

## Installation

Clone repository: git clone https://github.com/gnambair/logic-flow-mapper

Install dependencies: npm install

Run project: npm run dev
