import dagre from '@dagrejs/dagre';

export const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  // Create a new directed graph
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set an object for the graph label
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 70,
    ranksep: 100,
    marginx: 20,
    marginy: 20,
  });

  // Set nodes
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 240, height: 120 });
  });

  // Set edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate the layout (positions for all nodes)
  dagre.layout(dagreGraph);

  // Get the positioned nodes from dagre
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      // We need to pass a slightly different position in order to get directions right
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};
