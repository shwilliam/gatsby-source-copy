# `gatsby-source-copy`

> The easiest way to source copy from non-technical members of your team

## Installation

### 1. Add this package as a dependency

`yarn add gatsby-source-copy`

`npm install --save gatsby-source-copy`

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

### 3. Querying copy

All queried documents will return a node with `content` containing the raw text
of the source document.

If a `format` has been specified, `content` will also contain the parsed data of
the document, accessed with the target format as the key. The return-type of the
formatted data depends on the format specified. For more details consult [the
documentation of your desired format option](#formats).

#### Example query

```
query CopyQuery {
  allCopy {
    edges {
      node {
        content {
          raw
          archieml {
            document_title
          }
          markdown {
            tokens {
              type
              text
            }
          }
        }
      }
    }
  }
}
```

## Google Docs

### Permissions

To ensure your Google Document can be sourced, make sure you have enabled anyone
with a link to view the file. This can be configured in the "Share" menu.

### Document ID

Sourcing content with `gatsby-source-copy` requires configuration containing the
IDs of the target documents. This ID can be found in your Google Doc URL, commonly
between `d/` and `/edit`. For example, a document with the URL
`https://docs.google.com/document/d/dj2k3/edit`, has the ID `dj2k3`.

## Formats

By default, `gatsby-source-copy` **will not** parse your content but return the
raw text of the document. To parse the contents of the document, provide a
`format` configuration option. This option can be set globally or per document.
`gatsby-source-copy` currently supports parsing [Markdown](https://www.markdownguide.org/)
and [ArchieML](http://archieml.org/).

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

| Format   | Key          | Parser                                                    | Example                                                                                                  |
| -------- | ------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Markdown | `"markdown"` | [`marked.js`](https://marked.js.org/#/USING_PRO.md#lexer) | [examples/markdown.md](https://github.com/shwilliam/gatsby-source-copy/blob/main/examples/markdown.md)   |
| ArchieML | `"archieml"` | [`archieml-js`](https://github.com/newsdev/archieml-js)   | [examples/archieml.txt](https://github.com/shwilliam/gatsby-source-copy/blob/main/examples/archieml.txt) |

Can't find the format you're looking for? [Open an issue](https://github.com/shwilliam/gatsby-source-copy/issues)
or [add your own](https://github.com/shwilliam/gatsby-source-copy/compare)!

## Contributing

This project is open to and encourages contributions! Feel free to discuss any
bug fixes/features in the [issues](https://github.com/shwilliam/gatsby-source-copy/issues).
If you wish to work on this project:

1. Fork [this project](https://github.com/shwilliam/gatsby-source-copy)
2. Create a branch (`git checkout -b new-branch`)
3. Commit your changes (`git commit -am 'add new feature'`)
4. Push to the branch (`git push origin new-branch`)
5. [Submit a pull request!](https://github.com/shwilliam/gatsby-source-copy/pull/new/master)
