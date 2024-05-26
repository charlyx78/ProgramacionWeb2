import { ENDPOINT } from '../constants/endpoint'

/** Funcion para validar si el nombre de usuario ya existe en la base de datos o no */
export const validateUserName = (userName) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${ENDPOINT}/users?userName=${userName}`).then((res) => {
      if (!res) {
        throw new Error(res)
      }
      return res.json()
    }).then((users) => {
      /** Si la respuesta no contiene ningun usuario, entonces el nombre de usuario esta disponible */
      if (Object.keys(users).length === 0) {
        resolve(false)
      } else {
        /** Si la respuesta contiene un usuario, entonces el nombre de usuario NO esta disponible */
        resolve(true)
      }
    })
      .catch((err) => {
        reject(err)
      })
  })
}

export const validatePassword = (password) => {
  console.log('Contraseña a validar:', password)
  /** Debe contener:
    Al menos 8 caracteres de longitud.
    Al menos una letra minúscula.
    Al menos una letra mayúscula.
    Al menos un número.
    Al menos un carácter especial (pueden ser: @, $, !, %, *, ? o &).
  */
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(password)
}

export const validateMatchedPasswords = (password, confirmPassword) => {
  return password === confirmPassword
}
