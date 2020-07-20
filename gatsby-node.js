const fetch = require("node-fetch")
const archieml = require("archieml")

const makeGoogleDocsReqURL = id =>
  `https://docs.google.com/document/d/${id}/export?format=txt`

const fetchGoogleDocsContent = async id => {
  const docResponse = await fetch(makeGoogleDocsReqURL(id))
  const contentRaw = await docResponse.text()

  return contentRaw
}

const generateNodes = (
  { actions, createNodeId, createContentDigest },
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

  actions.createNode({ ...nodeData, ...nodeMeta })
}

const parseArchie = content => archieml.load(content)

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { documents } = configOptions

  documents.forEach(async ({ id, key, format }) => {
    const contentRaw = await fetchGoogleDocsContent(id)

    let formattedContent = { raw: contentRaw }
    if ([configOptions.format, format].includes("archieml"))
      formattedContent = {
        ...formattedContent,
        archieml: parseArchie(contentRaw)
      }

    generateNodes(
      { actions, createNodeId, createContentDigest },
      { key, content: formattedContent }
    )
  })

  console.log(
    `[gatsby-source-copy] Fetched copy from ${documents.length} documents`
  )

  return
}
