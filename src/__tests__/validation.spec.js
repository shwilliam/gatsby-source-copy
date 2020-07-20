import {validateConfig} from '../validation'

describe('validateConfig', () => {
  describe('valid config', () => {
    test('does not throw', () => {
      const minimalConfig = {
        documents: [
          {key: 'key1', id: 'id1'},
          {key: 'key2', id: 'id2'},
        ],
      }
      expect(() => validateConfig(minimalConfig)).not.toThrow()

      const configWithGlobalMarkdownFormat = {
        format: 'markdown',
        documents: [
          {key: 'key1', id: 'id1'},
          {key: 'key2', id: 'id2'},
        ],
      }
      expect(() => validateConfig(configWithGlobalMarkdownFormat)).not.toThrow()

      const configWithDocumentMarkdownFormat = {
        documents: [
          {key: 'key1', id: 'id1'},
          {key: 'key2', id: 'id2', format: 'markdown'},
        ],
      }
      expect(() =>
        validateConfig(configWithDocumentMarkdownFormat),
      ).not.toThrow()

      const configWithGlobalArchieMLFormat = {
        format: 'archieml',
        documents: [
          {key: 'key1', id: 'id1'},
          {key: 'key2', id: 'id2'},
        ],
      }
      expect(() => validateConfig(configWithGlobalArchieMLFormat)).not.toThrow()

      const configWithDocumentArchieMLFormat = {
        documents: [
          {key: 'key1', id: 'id1', format: 'archieml'},
          {key: 'key2', id: 'id2'},
        ],
      }
      expect(() =>
        validateConfig(configWithDocumentArchieMLFormat),
      ).not.toThrow()
    })
  })

  describe('invalid config', () => {
    test('throws on invalid format', () => {
      const configWithInvalidGlobalFormat = {
        format: 'boop',
        documents: [
          {key: 'key1', id: 'id1'},
          {key: 'key2', id: 'id2'},
        ],
      }
      expect(() => validateConfig(configWithInvalidGlobalFormat)).toThrow()

      const configWithInvalidDocumentFormat = {
        documents: [
          {key: 'key1', id: 'id1', format: 'boop'},
          {key: 'key2', id: 'id2'},
        ],
      }
      expect(() => validateConfig(configWithInvalidDocumentFormat)).toThrow()
    })

    test('throws on invalid document config object', () => {
      const configWithoutDocuments = {}
      expect(() => validateConfig(configWithoutDocuments)).toThrow()

      const configWithoutID = {
        documents: [{key: 'key1'}],
      }
      expect(() => validateConfig(configWithoutID)).toThrow()

      const configWithoutKey = {
        documents: [{id: 'id1'}],
      }
      expect(() => validateConfig(configWithoutKey)).toThrow()

      const configWithDuplicateKey = {
        documents: [
          {key: 'key1', id: 'id1'},
          {key: 'key1', id: 'id2'},
        ],
      }
      expect(() => validateConfig(configWithDuplicateKey)).toThrow()
    })
  })
})
