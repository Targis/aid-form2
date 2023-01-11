import React, { useEffect, useState } from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import Swal from 'sweetalert2'
import TextInput from 'components/inputs/TextInput'
import MaskedTextField from 'components/inputs/MaskedTextField'
import CheckField from 'components/inputs/CheckField'
import SimpleSelect from 'components/inputs/SimpleSelect'
import { CircularProgress, Button } from '@mui/material'
import { getFormData } from 'helpers/normalizeData'
import { dayNames } from 'helpers/date'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import { hubAction } from 'api'
import * as yup from 'yup'
import { parseDateString } from 'helpers/date'

// async function stall(stallTime = 3000) {
//   await new Promise(resolve => setTimeout(resolve, stallTime));
// }

const initialValues = {
  last_name: '',
  first_name: '',
  middle_name: '',
  inn: '',
  tel: '',
  vpoNumber: '',
  vpoDate: '',
  agree: false,
  checked: false
}

const phoneNumberRegex =
  /\(?([0-9]{3})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const today = new Date()
const minDate = new Date('2022-02-24')
const oneDayBeforeMinDate = addDays(minDate, -1)

const validationSchema = yup.object({
  last_name: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(/^\D+$/, 'Це поле не може містити числа')
    .min(2, 'Дуже коротке прізвище'),
  first_name: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(/^\D+$/, 'Це поле не може містити числа')
    .min(2, "Дуже коротке ім'я"),
  middle_name: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(/^\D+$/, 'Це поле не може містити числа')
    .min(4, 'Це поле має містити щонайменше 4 символи'),
  tel: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(
      phoneNumberRegex,
      'Невірний формат номеру, (0ХХ)ХХХ-ХХ-ХХ'
    ),
  inn: yup
    .string()
    .required("Це поле обов'язкове")
    .length(10, 'Це поле має містити 10 цифр'),
  vpoNumber: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(/^\d{4}[-]\d{10}$/, 'Невірний формат (1234-1234567890)'),
  vpoDate: yup
    .date()
    .required("Це поле обов'язкове")
    .transform(parseDateString)
    .typeError('Будь ласка, введіть дату в такому форматі ДД.ММ.РРРР')
    .min(oneDayBeforeMinDate, `Мінімальна дата ${format(minDate, 'dd.MM.yyyy')}`)
    .max(today, 'Дата з майбутнього? 🤔'),
  agree: yup
    .boolean()
    .oneOf([true], 'Щоб продовжити, необхідно надати згоду'),
})

const services = [
  {
    id: 1,
    name: 'Грошова допомога від ГО "Людина в біді"',
    title: `Електронна черга 
    на реєстрацію для отримання благодійної допомоги від чеської гуманітарної організації "Людина в біді"`,
    description: `❗ ВАЖЛИВО: Прийом на реєстрацію буде проводитись виключно за попереднім записом в електронній черзі.

      Один член сім'ї реєструє всіх інших членів родини.
      Для реєстрації потрібно надати інформацію з оригіналів документів, зокрема:
      ▪ паспорт кожного члена родини, свідоцтво про народження кожної дитини;
      ▪ реєстраційний номер облікової картки платника податків (ідентифікаційний код) кожної особи, яка реєструється;
      ▪ довідка ВПО кожного члена родини, який має статус ВПО (якщо є в наявності).

      Місце реєстрації: м. Запоріжжя Лермонтова, 9 (в будівлі БК "Орбіта" з протилежної сторони від головного входу). НЕ в Просторі Єдності!`,
    action: hubAction
  }
]
const QueueForm = () => {
  const [service, setService] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isClosed, setClosed] = useState(true)

  const isFormVisible = service && !isLoading && !isClosed

  const isFormClosed = async (action) => {
    try {
      await fetch(action, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data?.status === 'open') {
            console.log(data?.status)
            setClosed(false)
          }
          return null
        })
    } catch (e) {
      throw new Error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (service) {
      setClosed(isFormClosed(service?.action))
    }
  }, [service])

  const handleSubmit = async (values, helpers) => {
    const toNormalize = ['first_name', 'last_name', 'middle_name']
    const toExclude = ['agree', 'checked']

    const data = getFormData(
      values,
      toNormalize,
      toExclude
    )

    try {
      if (!service?.action) return null
      await fetch(hubAction, {
        method: 'POST',
        body: data

      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)

          switch (data?.result) {
            case 'closed':
              Swal.fire({
                title: 'Відхилено',
                text: `Нажаль, черга вже сформована і форма закрита. Слідкуйте за оголошеннями.`,
                icon: 'error',
                confirmButtonText: 'Закрити'
              })
              break
            case 'success':
              const { number, date, time } = data
              const day = dayNames[getDay(parse(date, 'dd.MM.yyyy', new Date()))]
              // const dateString = format(parseISO(data?.date), 'dd.MM.yyyy')
              // const time = format(parseISO(data?.time), 'hh:mm')
              Swal.fire({
                html:
                  `<div style='text-align: left'>
                  <table style='margin: 0 auto; border: 2px solid #a5dc86; padding: 0.5em; border-spacing: 10px;'>
                    <tbody>
                      <tr><td>Ваш №: </td>           <th> ${number}</strong></th></tr>
                      <tr><td>Дата: </td>            <th> ${date} (${day.toLowerCase()})</th></tr>
                      <tr><td>Час*: </td>            <th> ${time} </th></tr>
                    </tbody>
                  </table>
    
                  <br><br>
                  <b> Адреса реєстрації:</b> м. Запоріжжя, вул. Лермонтова, 9 (в будівлі БК "Орбіта" з протилежної сторони від головного входу). НЕ в Просторі Єдності!<br><br>
                  Номер в черзі дійсний тільки в цей день. <br><br>
                  * - через повітряні тривоги, перебої з електрикою та інші обставини час може бути змінено адміністратором.
                  </div>
                  `,
                icon: 'success',
                allowOutsideClick: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                confirmButtonText: 'Закрити'
              })
              break
            case 'refused':
              Swal.fire('', 'Немає вільних місць на цю дату. Спробуйте пізніше.', 'error')
              break
            case 'error':
              Swal.fire({
                title: 'Помилка',
                text: `Виникла помилка на сервері. Ми вже працюємо над цим. Спробуйте пізніше.
                  Текст помилки: ${data.error}. `,
                icon: 'error',
                confirmButtonText: 'Закрити'
              })
              break
            default:
              console.log('Uknown answer from the server')
          }
        })
    } catch (error) {
      throw new Error(error)
    } finally {
      helpers?.resetForm()
      // helpers?.setSubmitting(false)
    }
  }

  return (
    <div style={{ marginBottom: '2em' }}>

      {!service && (
        <>
          <Typography color="inherit" variant="h5" component="div" sx={{ mb: 4 }}>
            Електронна черга
          </Typography>

          <SimpleSelect
            name="services"
            label="Оберіть послугу"
            options={services}
            defaultValue=""
            setOption={setService}
            current={service?.name}
            fullWidth
          />
        </>
      )}

      {/* {isLoading ? ('Loading...') : isClosed && ('На даний час форма закрита. ')} */}

      {service && isLoading && (
        <>
          <div> Завантаження...</div> <br />
          <CircularProgress size="3rem" />
        </>
      )}

      {isClosed && !isLoading && ('Форма закрита. Черга сформована або запис ще не розпочався.')}

      {isFormVisible && (
        <>
          <Typography color="inherit" variant="h6" component="div" sx={{ mb: 4 }}>
            {service?.title.split('\n').map((line, k) => (
              <div key={k}>{line} <br /></div>
            ))}
          </Typography>
          {/* <Typography color="inherit" variant="p" component="div" sx={{ mb: 4, textAlign: 'left' }}>
            {service?.description.split('\n').map((line, k) => (
              <div key={k}>{line} <br /></div>
            ))}
          </Typography> */}
          <Formik
            initialValues={initialValues}
            // validateOnChange={false}
            // validateOnBlur={false}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions)
            }}
          >
            {({ values, isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <TextInput name="last_name" label="Прізвище" fullWidth />
                <TextInput name="first_name" label="Ім'я" fullWidth />
                <TextInput name="middle_name" label="По-батькові" fullWidth />

                <Grid container columnSpacing={2} columns={12}>
                  <Grid item xs={12} sm={6}>
                    <MaskedTextField
                      name="tel"
                      label="Номер телефону"
                      type="tel"
                      format="+38(###)###-##-##"
                      // valueIsNumericString={true}
                      mask="_"
                      formatResult={true}
                      fullWidth
                      disabled={values?.checked}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MaskedTextField
                      name="inn"
                      label="Податковий номер (РНОКПП)"
                      format="##########"
                      type="tel"
                      mask="_"
                      valueIsNumericString={true}
                      fullWidth
                      disabled={values?.checked}
                    />
                  </Grid>
                </Grid>

                <Grid container columnSpacing={2} columns={12}>
                  <Grid item xs={12} sm={7}>
                    <MaskedTextField
                      name="vpoNumber"
                      label="Номер довідки ВПО"
                      format="####-##########"
                      // valueIsNumericString={true}
                      formatResult={true}
                      mask="_"
                      type="tel"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <MaskedTextField
                      name="vpoDate"
                      label="Дата видачі довідки"
                      format="##.##.####"
                      mask="_"
                      type="tel"
                      // valueIsNumericString={true}
                      formatResult={true}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <CheckField
                  name="agree"
                  label="Даю згоду на обробку персональних даних"
                  sx={{ mb: 2, textAlign: 'left' }}
                />

                <Button
                  startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  {isSubmitting ? 'Завантаження' : 'Відправити'}
                </Button>

              </Form>
            )}

          </Formik>
        </>
      )}

    </div >
  )
}

export default QueueForm