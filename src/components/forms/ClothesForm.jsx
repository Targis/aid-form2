import React, { useEffect, useState, useCallback } from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import Swal from 'sweetalert2'
import TextInput from 'components/inputs/TextInput'
import MaskedTextField from 'components/inputs/MaskedTextField'
import CheckField from 'components/inputs/CheckField'
import SelectInput from 'components/inputs/SelectInput'
import ToggleButtons from 'components/inputs/ToggleButtons'
import QueueInformer from '../QueueInformer'
import { CircularProgress, Button } from '@mui/material'
import LinearProgressWithLabel from '../LinearProgressWithLabel'
import { getFormData } from 'helpers/normalizeData'
import { dayNames } from 'helpers/date'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import addDays from 'date-fns/addDays'
import addYears from 'date-fns/addYears'
import format from 'date-fns/format'
import { clothesAction } from 'api'
import * as yup from 'yup'
import { parseDateString } from 'helpers/date'


const initialValues = {
  check_delivery: false,
  last_name: '',
  first_name: '',
  middle_name: '',
  inn: '',
  tel: '',
  vpo_number: '',
  child_doc: '',
  child_bday: '',
  size: '',
  agree: false,
  checked: false
}

const phoneNumberRegex =
  /\(?([0-9]{3})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const today = new Date()
const minDate = addYears(today, -18)
const oneDayBeforeMinDate = addDays(minDate, -1)

const validationSchema = yup.object({
  check_delivery: yup
    .boolean()
    .oneOf([true], 'Отримання доступне тільки в місті Запоріжжя'),
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
  vpo_number: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(/^\d{4}[-]\d{10}$/, 'Невірний формат (1234-1234567890)'),
  child_doc: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(/^[A-ZА-ЩЬЮЯҐЄІЇ]{2,}\d{6}$/, 'Невірний формат'),
  child_bday: yup
    .date()
    .required("Це поле обов'язкове")
    .transform(parseDateString)
    .typeError('Будь ласка, введіть дату в такому форматі ДД.ММ.РРРР')
    .min(oneDayBeforeMinDate, `Мінімальна дата ${format(minDate, 'dd.MM.yyyy')}`)
    .max(today, 'Ця дата ще не наступила'),
  size: yup
    .string()
    .required("Це поле обов'язкове"),
  agree: yup
    .boolean()
    .oneOf([true], 'Щоб продовжити, необхідно надати згоду')
})


const ClothesForm = () => {

  const [isLoading, setLoading] = useState(true) //true
  const [isClosed, setClosed] = useState(true) // true
  const [availableCount, setAvailableCount] = useState(100)
  const [availableSizes, setAvailableSizes] = useState([])
  const [datestamp, setDatestamp] = useState(null)
  const [isConfirm, setConfirm] = useState(false)

  const getAvailableCount = (max, current) => {
    max = +max
    current = +current
    if (isNaN(max) || isNaN(current)) {
      return 0
    }
    return Math.ceil(100 - (current / max * 100))
  }

  const getAvailableSizes = (array) => {
    const sizes = array.map(item => {
      const available = Math.ceil(100 - (item[2] / item[3] * 100))
      return {
        id: item[0],
        label: item[1],
        available
      }
    })
    return sizes
  }

  const isFormClosed = useCallback(
    async (action) => {
      try {
        await fetch(action, { method: 'GET' })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data?.status === 'open') {
              console.log(data)
              setClosed(false)
              setDatestamp(data?.datestamp)
              setAvailableCount(getAvailableCount(data?.max, data?.current))
              setAvailableSizes(getAvailableSizes(data?.sizes))
            }
            return null
          })
      } catch (e) {
        throw new Error(e)
      } finally {
        setLoading(false)
      }
    }, []
  )

  const handleConfirm = async (resetForm) => {
    Swal.fire({
      title: 'Важливо',
      text: "Ви проживаєте",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Так, очистити форму',
      cancelButtonText: 'Ні'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Форму очищено',
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      }
    })
  }

  useEffect(() => {

    // getUserAgreement()
    setClosed(isFormClosed(clothesAction))
    // if (isConfirmAgreement) {
    //   setClosed(isFormClosed(clothesAction))
    // }

  }, [])


  const handleSubmit = async (values, helpers) => {
    const toNormalize = ['first_name', 'last_name', 'middle_name']
    const toExclude = ['agree', 'check_delivery']

    const data = getFormData(
      values,
      toNormalize,
      toExclude
    )

    try {
      await fetch(clothesAction, {
        method: 'POST',
        body: data

      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)

          switch (data?.result) {
            case 'closed':
            case 'refused':
              Swal.fire({
                title: 'Відхилено',
                text: `Форма закрита.`,
                icon: 'error',
                confirmButtonText: 'Закрити',
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  helpers?.resetForm()
                  window.location.reload()
                }
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
              helpers?.resetForm()
              break
            case 'timeout':
              Swal.fire('', 'Перевищено час очікування. Спробуйте ще.', 'warning')
              break
            case 'error':
              console.log('error', data.error)
              Swal.fire({
                title: 'Помилка',
                text: `Спробуйте пізніше.`,
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
      helpers?.setSubmitting(false)
    }
  }

  return (
    <div style={{ marginBottom: '2em' }}>


      <Typography color="inherit" variant="h6" component="div" sx={{ mb: 4 }}>
        Заголовок
      </Typography>

      {isLoading && (
        <>
          <div> Завантаження...</div>
          <br />
          <div><CircularProgress size="3rem" /></div>
        </>
      )}

      {isClosed && !isLoading && ('Форма закрита.')}


      {!isClosed && !isLoading && (
        <>

          <LinearProgressWithLabel variant="determinate" value={availableCount} title={'Залишилось одягу*'} />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions)
            }}
          >
            {({ values, isSubmitting, handleSubmit }) => (

              <Form onSubmit={handleSubmit}>

                {isSubmitting ? (
                  <>
                    <div>Завантаження... Не закривайте це вікно.</div> <br />
                    <CircularProgress size="3rem" />
                  </>
                ) : (
                  <>
                    <ToggleButtons name="check_delivery" label={'Ви проживаєте в Запоріжжі і зможете особисто отримати одяг?'} />
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

                    <Grid item xs={12} sm={7}>
                      <MaskedTextField
                        name="vpo_number"
                        label="Номер довідки ВПО"
                        format="####-##########"
                        // valueIsNumericString={true}
                        formatResult={true}
                        mask="_"
                        type="tel"
                        fullWidth
                      />
                    </Grid>
                    <TextInput
                      name="child_doc"
                      label="Серія і номер свідоцтва про народження"
                      helperText="Лише великі букви і цифри. Без пробілів і дефісів. Зразок: ІЖС123456"
                      fullWidth
                    />

                    <MaskedTextField
                      name="child_bday"
                      label="Дата народження"
                      format="##.##.####"
                      mask="_"
                      type="tel"
                      // valueIsNumericString={true}
                      formatResult={true}
                      fullWidth
                    />

                    <SelectInput
                      name="size"
                      label="Оберіть розмір одягу"
                      options={availableSizes.map(size => `${size.label} (залишок ${size.available}%)`)}
                      defaultValue=""
                      fullWidth
                    />

                    <CheckField
                      name="agree"
                      label="Даю згоду на обробку моїх персональних даних"
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
                  </>
                )}



              </Form>
            )}

          </Formik>

          {datestamp && (
            <Typography color="text.secondary" variant="body2" component="div" sx={{ my: 4 }}>
              * - дані станом на {datestamp}
            </Typography>
          )}



        </>
      )}

    </div >
  )
}

export default ClothesForm