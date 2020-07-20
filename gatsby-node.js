const fetch = require("node-fetch")

const makeGoogleDocsReqURL = id =>
  `https://docs.google.com/document/d/${id}/export?format=txt`

const fetchGoogleDocsContent = async id => {
  const docResponse = await fetch(makeGoogleDocsReqURL(id))
  const contentRaw = await docResponse.text()

  return contentRaw
}

const generateNodes = (
  { createNode, createNodeId, createContentDigest },
  { key, content }
) => {
  const nodeData = { key, content }
  const nodeId = createNodeId(`gatsby-source-copy-${key}`)
  const nodeContent = JSON.stringify(nodeData)

  const nodeMeta = {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: "CopyDocument",
      mediaType: "text/plain",
      content: nodeContent,
      contentDigest: createContentDigest(nodeData)
    }
  }

  createNode({ ...nodeData, ...nodeMeta })
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  const documentsConfig = configOptions.documents

  documentsConfig.forEach(async ({ id, key }) => {
    const contentRaw = await fetchGoogleDocsContent(id)

    generateNodes(
      { createNode, createNodeId, createContentDigest },
      { key, content: contentRaw }
    )
  })

  console.log(
    `[gatsby-source-copy] Fetched copy from ${documentsConfig.length} documents`
  )

  return
}
