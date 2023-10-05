import { parseISO, isDate } from 'date-fns'

export function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parseISO(originalValue.split('.').reverse().join('-'))

  return parsedDate
}

export const dayNames = [
  'Неділя',
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  "П'ятниця",
  'Субота',
]
