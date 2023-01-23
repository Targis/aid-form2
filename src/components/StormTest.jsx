import { useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { hubAction } from 'api'

const StormTest = ({ count = 10 }) => {
  const [isStorm, setStorm] = useState(false)

  const testPersons = [
    {
      last_name: 'Артеменко',
      first_name: 'Артем',
      middle_name: 'Артемович',
      inn: '1',
      tel: '+38(095)223-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Бартон',
      first_name: 'ББББ',
      middle_name: 'Бпавпвапвап',
      inn: '2',
      tel: '+38(095)324-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Веменко',
      first_name: 'Вртем',
      middle_name: 'Вртемович',
      inn: '3',
      tel: '+38(095)453-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Геменко',
      first_name: 'Гртем',
      middle_name: 'Гртемович',
      inn: '4',
      tel: '+38(095)123-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '5',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '6',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '7',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '8',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '9',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '10',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '11',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '12',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '13',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '14',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '15',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '16',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '17',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '18',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '19',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
    {
      last_name: 'Деменко',
      first_name: 'Дртем',
      middle_name: 'Дртемович',
      inn: '20',
      tel: '+38(095)279-44-57',
      vpoNumber: '2304-5002321789',
      vpoDate: '12.03.2022',
    },
  ]

  // async function stall(stallTime = 3000) {
  //   await new Promise(resolve => setTimeout(resolve, stallTime));
  // }

  // const makeReq = (url, data) => fetch(url, { method: 'POST', body: data })

  // for (let i = 0; i < count; i++) {
  //   const formData = new FormData()
  //   Object.keys(testPerson).map((key, j) =>
  //     formData.set(key, testPerson[key] + i + j)
  //   )
  //   testData.push(new Promise((resolve, reject) => {
  //     resolve(makeReq(hubAction, formData))
  //   }))
  // }

  // const formData = new FormData()
  // Object.keys(testPerson).map((key) => {
  //   const r = Math.random().toString().slice(2, 12)
  //   console.log(r)
  //   return key === 'inn'
  //     ? formData.set(key, testPerson[key] + r)
  //     : formData.set(key, testPerson[key])
  // }

  // )

  // const promise = new Promise(resolve => {

  //   resolve(fetch(hubAction, { method: 'POST', body: formData })
  //     .then(response => response.json())
  //   )
  // })
  const test = []

  const handleStorm = () => {
    setStorm(true)
    // Promise.all([promise, promise, promise, promise]).then(vals => {
    //   vals.map(val =>
    //     console.log(val.data)
    //   )

    // }, reason => console.log(reason))
    //   .catch(err => console.log('error', err))

    for (let person of testPersons) {
      const formData = new FormData()
      Object.keys(person).map((key) => {

        formData.set(key, person[key])

        return key
      })

      test.push(formData)
    }

    fetch(hubAction, { method: 'POST', body: test[0] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[1] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[2] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[3] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[4] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[5] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[6] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[7] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[8] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[9] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[10] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[11] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[12] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[13] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[14] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[15] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[16] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[17] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[18] }).then(response => response.json()).then(r => console.log(r))
    fetch(hubAction, { method: 'POST', body: test[19] }).then(response => response.json()).then(r => console.log(r))


    setStorm(false)
  }

  return (
    <Button
      startIcon={isStorm ? <CircularProgress size="1rem" /> : null}
      disabled={isStorm}
      variant="contained"
      color="error"
      size="large"
      type="submit"
      onClick={handleStorm}
    >
      {isStorm ? 'Завантаження' : 'Шторм тест'}
    </Button>
  )
}

export default StormTest