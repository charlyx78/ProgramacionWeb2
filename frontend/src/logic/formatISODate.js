export const formatISODate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Se agrega 1 porque los meses en JavaScript son de 0 a 11
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}