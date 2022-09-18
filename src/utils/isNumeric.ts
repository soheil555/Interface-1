export function isNumeric(value: string, decimals = 18) {
  if (value === '') return true
  const pattern = `^\\d+\\.?\\d{0,${decimals}}$`
  const reg = new RegExp(pattern, 'g')

  return !!reg.exec(value)
}
