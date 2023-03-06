const getActionURI = (keyString) =>
  `https://script.google.com/macros/s/${keyString}/exec`

// Aid registration key
const key =
  'AKfycbwj6YBEmohgohLFLGMnp5gTiTjHhK1pC_P5Yowjy-2zTyCtmK9rzWI58EZBaK9pKD8g'

// HUB's queue key
const hubKey =
  'AKfycbxWkNfOweCE1mwjSdQCvoYbfpz1l0HtwiukUEolSGBNqj8xDZYPqzuS0Mm3hUg2ij3i'

// hub's test key
// const hubKey =
//   'AKfycby4HqOSJ0ltYInfWXzmxbeqFcDVuW2tY30GOb4zUkdbM_67nCkGbFxB004g2ydvJZKl'

const clothesKey =
  'AKfycbymPkQbrAix6CmeLX3uljb-sz3ZuYVIyaKksppndcNPro4lEE29fFXVmhEnjT2pIBML4w'

export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)
export const clothesAction = getActionURI(clothesKey)
