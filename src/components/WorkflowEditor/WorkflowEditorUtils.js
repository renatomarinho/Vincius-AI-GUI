/**
 * Utility functions for workflow editor to prevent common errors
 */

/**
 * Ensures an object is not null or undefined
 * @param {Object|null|undefined} obj - The object to check
 * @param {Object} defaultValue - Default value to use if obj is null/undefined
 * @returns {Object} - Safe object that won't cause errors
 */
export const ensureObject = (obj, defaultValue = {}) => {
  return obj === null || obj === undefined ? defaultValue : obj;
};

/**
 * Ensures an array is not null or undefined
 * @param {Array|null|undefined} arr - The array to check
 * @param {Array} defaultValue - Default value to use if arr is null/undefined
 * @returns {Array} - Safe array that won't cause errors
 */
export const ensureArray = (arr, defaultValue = []) => {
  return arr === null || arr === undefined ? defaultValue : arr;
};

/**
 * Creates a safe version of node data that won't cause React Flow errors
 * @param {Object} node - Node data
 * @returns {Object} - Safe node data
 */
export const createSafeNodeData = (node) => {
  if (!node) return { id: 'default-id', type: 'default', position: { x: 0, y: 0 } };
  
  return {
    id: node.id || `node-${Date.now()}`,
    type: node.type || 'default',
    position: ensureObject(node.position, { x: 0, y: 0 }),
    data: ensureObject(node.data, {}),
    ...ensureObject(node)
  };
};

/**
 * Safe wrapper for React Flow useNodesState to prevent null/undefined errors
 * @param {Array} initialNodes - Initial nodes array
 * @returns {Array} - Safe nodes array
 */
export const createSafeNodes = (initialNodes) => {
  const nodes = ensureArray(initialNodes);
  return nodes.map(node => createSafeNodeData(node));
};

/**
 * Creates a safe version of edge data that won't cause React Flow errors
 * @param {Object} edge - Edge data
 * @returns {Object} - Safe edge data
 */
export const createSafeEdgeData = (edge) => {
  if (!edge) return { id: 'default-edge-id', source: 'source', target: 'target' };
  
  return {
    id: edge.id || `edge-${Date.now()}`,
    source: edge.source || 'source',
    target: edge.target || 'target',
    ...ensureObject(edge)
  };
};

/**
 * Safe wrapper for React Flow useEdgesState to prevent null/undefined errors
 * @param {Array} initialEdges - Initial edges array
 * @returns {Array} - Safe edges array
 */
export const createSafeEdges = (initialEdges) => {
  const edges = ensureArray(initialEdges);
  return edges.map(edge => createSafeEdgeData(edge));
};
