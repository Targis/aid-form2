// Aid registration key
const key = 'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey = `AKfycbxGm-kpn6SnJ_Oq4EThObKkAsZoDha0LJf-S4JI6UELZ81A0b6ucFlcYb7OIOrA8VSO`

// hub's test key
// const hubKey = `AKfycbzPr58cMtP1APX0270S5HBYlkNn41pQBA9ZmR4uVVbJDL32l0JZl1Yh3jX_Y9S6NWDD`


const getActionURI = (keyString) => `https://script.google.com/macros/s/${keyString}/exec`
 
export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)