const getActionURI = (keyString) =>
  `https://script.google.com/macros/s/${keyString}/exec`

// Aid registration key
const key =
  'AKfycbz2onZwIjr_l5F5nu1SiL8vuAVf7-KrKKTHUvj-0pBHzP5AUkOMmNbs20jdidJ1bPb9'

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
