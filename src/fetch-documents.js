import fetch from 'node-fetch'

export const fetchDocuments = async id => {
  const requestURL = `https://docs.google.com/document/d/${id}/export?format=txt`
  const docResponse = await fetch(requestURL)
  const contentRaw = await docResponse.text()

  return contentRaw
}
