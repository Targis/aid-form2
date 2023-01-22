// Aid registration key
const key = 'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey = 'AKfycbwS9AGdyyMT3j3yXUUQQ3a_xrRYM6bkAz99-a_YOX1DD1CDvQFI6MJ_RgfP1KeBCqiW'

// hub's test key
// const hubKey = 'AKfycbyD121fguC5HZFWWHwARbk89Zm37oTi1bLeYSvVo1vNay3gOv2Qv3W01YsfwEO2Gu-0'


const getActionURI = (keyString) => `https://script.google.com/macros/s/${keyString}/exec`
 
export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)