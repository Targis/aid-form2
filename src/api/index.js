// Aid registration key
const key =
  'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey =
  'AKfycbxWkNfOweCE1mwjSdQCvoYbfpz1l0HtwiukUEolSGBNqj8xDZYPqzuS0Mm3hUg2ij3i'

// hub's test key
// const hubKey =
//   'AKfycby4HqOSJ0ltYInfWXzmxbeqFcDVuW2tY30GOb4zUkdbM_67nCkGbFxB004g2ydvJZKl'

const getActionURI = (keyString) =>
  `https://script.google.com/macros/s/${keyString}/exec`

export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)
