/**
 * Utilidades para el API Factory
 */

/**
 * Transforma un objeto de parámetros a string de query params
 * @param {object} params - Objeto con los parámetros
 * @returns {string} String de query params (ej: "?key=value&key2=value2")
 */
export function transformToParamsString(params) {
  if (!params || typeof params !== 'object') return ''
  
  let paramsString = '?'
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      paramsString += `${key}=${encodeURIComponent(params[key])}&`
    }
  })
  
  // Eliminar el último &
  paramsString = paramsString.slice(0, -1)
  
  // Si no hay parámetros, retornar string vacío
  if (paramsString === '?') return ''
  
  return paramsString
}

