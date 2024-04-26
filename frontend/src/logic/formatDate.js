export const formatDate = (mongoDate) => {
  // Crear un objeto Date a partir de la cadena de fecha de MongoDB
  const date = new Date(mongoDate)

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Sumar 1 al mes porque los meses van de 0 a 11
  const day = ('0' + date.getDate()).slice(-2)
  const hour = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  return `${year}/${month}/${day} ${hour}:${minutes}`
} 