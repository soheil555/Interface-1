import useAddresses from './useAddresses'

export default function useTokenPairs() {
  const addresses = useAddresses()
  if (!addresses) return undefined

  let tokens = Object.values(addresses.tokens)

  // Remove duplicate addresses.
  tokens = tokens.filter((item, pos) => {
    return tokens.indexOf(item) === pos
  })

  const tokenPairs: [string, string][] = []

  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      if (tokens[i] < tokens[j]) {
        tokenPairs.push([tokens[i], tokens[j]])
      } else {
        tokenPairs.push([tokens[j], tokens[i]])
      }
    }
  }

  return tokenPairs
}
