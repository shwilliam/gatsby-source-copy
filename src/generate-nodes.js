export const generateNodes = (
  {actions, createNodeId, createContentDigest},
  {key, content},
) => {
  const nodeData = {key, content}
  const nodeId = createNodeId(`gatsby-source-copy-${key}`)
  const nodeContent = JSON.stringify(nodeData)

  const nodeMeta = {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'Copy',
      content: nodeContent,
      contentDigest: createContentDigest(nodeData),
    },
  }

  actions.createNode({...nodeData, ...nodeMeta})
}
