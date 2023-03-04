import { Formik, Form } from 'formik'
import {
  Button,
  CircularProgress,
  Typography
} from '@mui/material'
import { StepCheck, checkSchema } from 'components/steps/StepCheck'
import Section from './layout/Section'
import Swal from 'sweetalert2'

import { action } from 'api'


const initialValues = {
  inn: '',
  phoneNumber: '',
}

const ReminderForm = () => {

  const handleSubmit = async (values, helpers) => {
    const params = {
      phoneNumber: values?.phoneNumber,
      inn: values?.inn
    }
    try {
      await fetch(action + '?' + new URLSearchParams(params), {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          switch (data?.result) {
            case 'notFoundAll':
            case 'notFoundOne':
              Swal.fire('Не знайдено', 'Номер телефону або податковий номер не знайдено!', 'error')
              break
            case 'success':
              Swal.fire({
                title: `${data.number}`,
                text: `Ваш номер в базі`,
                icon: 'info',
                confirmButtonText: 'Дякую'
              })
              break
            case 'different':
              Swal.fire('Невідповідність даних', 'Такі дані вже є в базі, але номер телефону і податковий номер не співпадають. Перевірте правильність введених даних. Якщо ви вважаєте це помилкою, зверніться у хаб з оригіналами документів. ', 'warning')
              break
            case 'invalidInn':
              Swal.fire('Увага!', 'Такий номер телефону вже є в базі, але в нас відсутні деякі ваші дані. Звеніться у хаб з оригіналами паспорта, коду та довідки ВПО, щоб надалі мати змогу отримувати гуманітарну допомогу!', 'warning')
              break
            case 'error':
              Swal.fire({
                title: 'Упс...',
                text: `Помилка на сервері: ${data.error}`,
                icon: 'error',
                confirmButtonText: 'Спробувати ще'
              })
              break
            default:
              Swal.fire('Внутрішня помилка', 'Зв\'яжіться з адміністратором', 'error')
          }
        }).finally(() => {
          helpers?.resetForm()
        })
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleReset = async (resetForm) => {
    Swal.fire({
      title: 'Ви впевнені?',
      text: "Всі поля форми будуть очищені.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Так, очистити форму',
      cancelButtonText: 'Ні'
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm()
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

  return (
    <Section maxWidth={'sm'} title={'Пошук в базі'}>

      <Typography color="inherit" variant="caption" component="div" sx={{ textAlign: 'center', mb: 3 }}>
        Ця форма допоможе знайти ваш номер в базі громади, якщо ви реєструвались.
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={checkSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (

          <Form autoComplete="off">

            <StepCheck />

            <div className="form-nav__container">

              {isSubmitting ? <CircularProgress size="3rem" sx={{ margin: "1em auto" }} /> : (
                <>
                  <Button
                    disabled={isSubmitting}
                    color="error"
                    variant="outlined"
                    size="large"
                    onClick={() => handleReset(resetForm)}
                    sx={{ mr: 1.5, mb: 2 }}
                  >
                    Очистити
                  </Button>

                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    sx={{ mb: 2 }}
                  >
                    Перевірити
                  </Button>
                </>
              )}


            </div>

          </Form>
        )}
      </Formik>

    </Section>
  )
}

export default ReminderForm