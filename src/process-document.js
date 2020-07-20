const archieml = require('archieml')
const marked = require('marked')

const parseArchie = content => archieml.load(content)
const parseMarkdown = content => marked.lexer(content)

export const processDocument = (options, contentRaw) => {
  let formattedContent = {raw: contentRaw}

  if (options.format === 'archieml')
    formattedContent = {
      ...formattedContent,
      archieml: parseArchie(contentRaw),
    }
  else if (options.format === 'markdown')
    formattedContent = {
      ...formattedContent,
      markdown: parseMarkdown(contentRaw),
    }

  return formattedContent
}
