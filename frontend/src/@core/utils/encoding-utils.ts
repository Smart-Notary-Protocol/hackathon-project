/**
 ** Hex color to RGBA color
 */
export const hexToString = (hex: any) => {
  const bytes = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16))
  }
  const decoder = new TextDecoder()

  return decoder.decode(new Uint8Array(bytes))
}
