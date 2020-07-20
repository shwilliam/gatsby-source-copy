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
            id: '<GOOGLE_DOC_ID>',
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

## Contributing

This project is open to and encourages contributions! Feel free to discuss any
bug fixes/features in the [issues](https://github.com/shwilliam/gatsby-source-copy/issues).
If you wish to work on this project:

1. Fork [this project](https://github.com/shwilliam/gatsby-source-copy)
2. Create a branch (`git checkout -b new-branch`)
3. Commit your changes (`git commit -am 'add new feature'`)
4. Push to the branch (`git push origin new-branch`)
5. [Submit a pull request!](https://github.com/shwilliam/gatsby-source-copy/pull/new/master)
