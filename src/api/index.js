// Aid registration key
const key = 'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey = `AKfycbwB-FQra8faO5kfjzaebFGh8uWAbaxXhDWRcpvgIrA6qIsg9Q0Ya-IKhPdMUFcWMT5s`


const getActionURI = (keyString) => `https://script.google.com/macros/s/${keyString}/exec`
 
export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)