// Add this import at the top
import { createSafeNodes, createSafeEdges } from './WorkflowEditorUtils';

// Then modify your node and edge initialization:
// Before:
// const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

// After:
const safeInitialNodes = createSafeNodes(initialNodes);
const safeInitialEdges = createSafeEdges(initialEdges);
const [nodes, setNodes, onNodesChange] = useNodesState(safeInitialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(safeInitialEdges);
