// Aid registration key
const key = 'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey = 'AKfycby1JoFZHuubGHkQQeDAgKkUc7NLMgaJczi8nBh_YgJMFrBjw20rzd0QVnI6YB8VUbY'

// hub's test key
// const hubKey = 'AKfycbw8NZ91zq6BU7AqSYmXzIQr9Z0nU2tMxi9eRkIL7ml7f_PVHawxKPUdmRH_6soX_oqM'


const getActionURI = (keyString) => `https://script.google.com/macros/s/${keyString}/exec`
 
export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)