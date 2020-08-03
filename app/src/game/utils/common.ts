export function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function concatStrings (array: Array<string>) {
  return array.filter(Boolean).join(' ')
}
