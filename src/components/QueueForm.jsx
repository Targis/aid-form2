import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import Swal from 'sweetalert2'
import TextInput from 'components/inputs/TextInput'
import MaskedTextField from 'components/inputs/MaskedTextField'
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
  tel: '',
  vpoNumber: '',
  vpoDate: '',
  agree: false,
  checked: false
}

const phoneNumberRegex =
  /\(?([0-9]{3})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const today = new Date()
const minDate = new Date('2022-10-01')
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
    .matches(
      phoneNumberRegex,
      'Невірний формат номеру, (0ХХ)ХХХ-ХХ-ХХ'
    )
    .required("Це поле обов'язкове"),
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
})

const QueueForm = () => {

  const handleSubmit = async (values, helpers) => {
    const toNormalize = ['first_name', 'last_name', 'middle_name']
    const toExclude = ['agree', 'checked']

    const data = getFormData(
      values,
      toNormalize,
      toExclude
    )

    try {
      await fetch(hubAction, {
        method: 'POST',
        body: data

      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)

          if (data.result === 'success') {
            const { number, date, time } = data
            const day = dayNames[getDay(parse(date, 'dd.MM.yyyy', new Date()))]
            // const dateString = format(parseISO(data?.date), 'dd.MM.yyyy')
            // const time = format(parseISO(data?.time), 'hh:mm')
            Swal.fire(
              '',
              `<div style='text-align: left'>
              <table style='margin: '0 auto'>
                <tbody>
                  <tr><td>Ваш №: </td>           <th>${number}</strong></th></tr>
                  <tr><td>Дата: </td>            <th>${date} (${day.toLowerCase()})</th></tr>
                  <tr><td>Час*: </td>            <th>${time} </th></tr>
                </tbody>
              </table>

              <br><br>
              <b> Адреса реєстрації:</b> м. Запоріжжя Лермонтова, 9 (в будівлі БК "Орбіта" з протилежної сторони головного входу).<br><br>
              Номер в черзі дійсний тільки в цей день. <br><br>
              * - Через повітряні тривоги, перебої з електрикою та інші обставини час може бути перенесено адміністратором.
              </div>
              `,
              'success')
            helpers?.resetForm()

          }
          if (data.result === 'refused') {
            Swal.fire('', 'Немає вільних місць на цю дату. Спробуйте пізніше.', 'error')
            helpers?.resetForm()
          }

          if (data.result === 'error') {
            Swal.fire({
              title: 'Помилка',
              text: `Виникла помилка на сервері. Ми вже працюємо над цим. Спробуйте пізніше.
                Текст помилки: ${data.error}. `,
              icon: 'error',
              confirmButtonText: 'Закрити'
            })
          }
        })
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div style={{ marginBottom: '2em' }}>

      <Typography color="inherit" variant="h6" component="div" sx={{ mb: 4 }}>
        Електронна черга <br />
        на реєстрацію для отримання благодійної допомоги <br />
        від чеської благодійної організації "Людина в біді"
      </Typography>

      <Typography color="inherit" variant="p" component="div" sx={{ mb: 4, textAlign: 'left' }}>
        Зверніть увагу!
        <ul>
          <li>Реєструється сім’я (домогосподарство).</li>
          <li>Першочергово реєструються особи, що евакуювалися після 01 жовтня 2022 року (вимоги БО "Людина в біді")</li>
          <li>При реєстрації один член сім’ї надає необхідні дані для внесення в анкету організації, щодо себе та членів сім’ї, які з ним проживають (паспортні дані та податковий номер (РНОКПП))</li>
        </ul>
      </Typography>

      <Typography color="inherit" variant="p" component="div" sx={{ mb: 4, textAlign: 'left' }}>
        <b>Місце реєстрації:</b> м. Запоріжжя Лермонтова, 9 (в будівлі БК "Орбіта" з протилежної сторони головного входу).
      </Typography>

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

    </div >
  )
}

export default QueueForm