import { serialize } from 'next-mdx-remote-client/serialize'

const result = await serialize({
  source: '# Hello World\n\nThis is a test.'
})

console.log('Serialize result:', Object.keys(result))
console.log('Has compiledSource:', 'compiledSource' in result)
