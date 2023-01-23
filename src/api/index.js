// Aid registration key
const key =
  'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey =
  'AKfycbzLdaTFaCPT10xNGs8djrERKXPSUW8Q3My-aIlyNharwx_TX9UVLZWbe8V1q1yA71nK'

// hub's test key
// const hubKey = 'AKfycbwOccF4BS_UTu0gsaNss7IZ508GauGObAfks8zCJIxhwb31PKFZO4eQUwXMBwZK818u'

const getActionURI = (keyString) =>
  `https://script.google.com/macros/s/${keyString}/exec`

export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)
