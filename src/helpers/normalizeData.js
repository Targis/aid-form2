export function getFormData(
  valuesObject = {},
  stringsToNormalize = [],
  excludeValues = []
) {
  let data = new FormData()

  Object.keys(valuesObject).forEach((key) => {
    if (excludeValues.indexOf(key) > -1) return null

    const currentValue = valuesObject[key]

    if (stringsToNormalize.indexOf(key) > -1) {
      data.append(key, normalizeString(currentValue))
    } else {
      data.append(key, currentValue)
    }
  })

  return data
}

// console.log(getFormData({lastName: ' sads ', firstName: ' AASDASS ', inn: 'abcdef', foo: 'bar'}, ['lastName', 'firstName'], ['foo']))

function normalizeString(string) {
  const newString = string.trim().toLowerCase()
  const firstLetter = newString[0].toUpperCase()

  return `${firstLetter}${newString.slice(1)}`
}

// console.log(normalizeString('ВАСИЛЬ   '))
// console.log(normalizeString('  іван  '))
// console.log(normalizeString('  пЕтРо'))

export function normalizePersonData(
  valuesObject = {},
  stringsToNormalize = []
) {
  let res = {}

  Object.keys(valuesObject).forEach((key) => {
    const currentValue = valuesObject[key]

    if (stringsToNormalize.indexOf(key) > -1) {
      res[key] = normalizeString(currentValue)
    } else {
      res[key] = currentValue
    }
  })

  return res
}
