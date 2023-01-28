// Aid registration key
const key =
  'AKfycbyZMMccNvJpqQMnR6vw4aE5_XyBe1RttzCAWby9wqasH_8AjBTmJpRaAqqafXu5yruB'

// HUB's queue key
const hubKey =
  'AKfycbzyPYPUxXZ3NU6AljPOR7rSi68f_pL8Fw0XstVtWOYRbNhZzReWBSNRJnI5DgYXFhTb'

// hub's test key
// const hubKey = 'AKfycbyzUV6Jzs23ZINeebLJRXP3EYvCfL-oCQ8gaMHAX2Y0ybLaQGJvs3e8PgioZ0uQ6Gad'

const getActionURI = (keyString) =>
  `https://script.google.com/macros/s/${keyString}/exec`

export const action = getActionURI(key)
export const hubAction = getActionURI(hubKey)
