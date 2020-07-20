import {SUPPORTED_PARSERS} from './process-document'

export const validateConfig = configOptions => {
  const {documents, format} = configOptions

  if (!Array.isArray(documents))
    throw new Error(
      'Invalid `documents` configuration. Ensure you pass an array of objects with a `key` and `id`.',
    )

  if (documents.length < 1) {
    console.log('[gatsby-source-copy] no copy sourced')
    return
  }

  if (format && !SUPPORTED_PARSERS.includes(format))
    throw new Error('Invalid format option.')

  const seenKeys = []
  documents.forEach(({id, key, format}) => {
    if (!id || !key)
      throw new Error(
        'Invalid configuration. Ensure each document contains `key` and `id` fields.',
      )
    if (format && !['markdown', 'archieml'].includes(format))
      throw new Error(`Invalid format option for document ${key}.`)
    if (seenKeys.includes(key))
      throw new Error(
        'Duplicate document keys detected. Ensure all keys are unique.',
      )
    seenKeys.push(key)
  })
}
