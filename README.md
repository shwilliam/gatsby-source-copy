# `gatsby-source-copy`

> The easiest way to source copy from non-technical members of your team

## Installation

### 1. Add this package as a dependency

```terminal
yarn add gatsby-source-copy
npm i gatsby-source-copy
```

### 2. Configure the plugin in `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-copy',
      options: {
        documents: [
          {
            key: '<SOME_UNIQUE_KEY>',
            id: '<YOUR_GOOGLE_DOC_ID>',
          },
        ],
      },
    },
  ],
}
```

## Formats

By default, `gatsby-source-copy` **will not** parse your content but return the
raw text of the document. If you wish to parse content authored in Markdown or
ArchieML, you can either set the global parser to "markdown" or "archieml", or
provide this configuration on a particular document.

```javascript
// global
{
  resolve: 'gatsby-source-copy',
  options: {
    format: "markdown",
    documents: [...]
  }
}

// per document
{
  resolve: 'gatsby-source-copy',
  options: {
    documents: [
        {key: 'foo', id: 'ajCe2', format: "archieml"},
        {key: 'bar', id: 'a9rcf', format: "markdown"},
      }
    ]
  }
}
```

### Parsers

| Format   | Parser                                                    |
| -------- | --------------------------------------------------------- |
| Markdown | [`marked.js`](https://marked.js.org/#/USING_PRO.md#lexer) |
| ArchieML | [`archieml-js`](https://github.com/newsdev/archieml-js)   |
