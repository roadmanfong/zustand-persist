export function parseJson(text: string | null) {
  try {
    return JSON.parse(text || '{}')
  } catch (error) {
    return undefined
  }
}
