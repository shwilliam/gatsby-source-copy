import {fetchDocuments} from './fetch-documents'
import {generateNodes} from './generate-nodes'
import {processDocument} from './process-document'

export const sourceNodes = async (
  {actions, createNodeId, createContentDigest},
  configOptions,
) => {
  const {documents} = configOptions

  documents.forEach(async ({id, key, format}) => {
    const contentRaw = await fetchDocuments(id)

    const options = format ? {...configOptions, format} : configOptions
    const formattedContent = processDocument(options, contentRaw)

    generateNodes(
      {actions, createNodeId, createContentDigest},
      {key, content: formattedContent},
    )
  })

  console.log(
    `[gatsby-source-copy] Fetched copy from ${documents.length} documents`,
  )

  return
}
