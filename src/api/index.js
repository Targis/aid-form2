// Aid registration key
const key = 'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey = `AKfycbyfT_YY8993pPV44zr9-uUkm71C5SZjtjg4xZh8VtsJIlPbzIahh94_j5TTwNPC017-`

// hub's test key
// const hubKey = `AKfycbwmBKUNEDAblfvbMnH_1vXchV2jJPeZGDfeHW3jsbGH5GDwD-Qu4xe1iK4FS23UNArK`


const getActionURI = (keyString) => `https://script.google.com/macros/s/${keyString}/exec`
 
export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)