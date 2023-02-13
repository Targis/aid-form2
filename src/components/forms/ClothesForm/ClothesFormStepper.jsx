import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import {
  Button,
  CircularProgress,
  Typography
} from '@mui/material'
import Swal from 'sweetalert2'

import { clothesAction } from 'api'
import { getFormData } from 'helpers/normalizeData'
import { FormContext } from 'components/forms/ClothesForm/ClothesForm'

function FormikStepper({ children, ...props }) {
  const { isFormClosed } = useContext(FormContext);

  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = React.useState(0)

  const currentChild = childrenArray[step]
  const isLastStep = () => step === childrenArray.length - 1

  const handleSubmit = async (values, helpers) => {

    if (isLastStep()) {
      const toNormalize = ['firstName', 'lastName', 'middleName']
      const toExclude = ['agree']

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
            if (data.result === 'success') {
              Swal.fire({
                title: 'Успіх',
                html: `Ви успішно забронювавали цей одяг. <br>Код підтвердження: ${data?.number}<br><br>
               <strong>Бажаєте забронювате одяг ще на одну дитину?</strong>`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Так, зареєструвати ще',
                cancelButtonText: 'Ні, завершити',
                allowEscapeKey: false,
                allowEnterKey: false,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isDismissed) {
                  helpers?.resetForm()
                  setStep(0)
                  window.location.reload()
                } else if (result.isConfirmed) {
                  helpers.setValues({
                    ...values,
                    child_doc: '',
                    child_bday: '',
                    size: '',
                    agree: false
                  })
                  helpers.setTouched({})
                  setStep(1)
                }
              })

            }
            if (data.result === 'refused') {
              Swal.fire('Відмова', 'Такий документ вже зареєстровано (свідоцтво про народження)', 'error')
            }
            if (data.result === 'closed') {
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
            }
            if (data.result === 'unavailable') {
              Swal.fire('Відмова', 'Цей розмір вже недоступний, спробуйте інший', 'error')
              isFormClosed(clothesAction)

            }
            if (data.result === 'timeout') {
              Swal.fire('', 'Перевищено час очікування. Спробуйте ще.', 'warning')
            }

            if (data.result === 'error') {
              Swal.fire({
                title: 'Упс...',
                text: `Виникла помилка на сервері. Спробуйте пізніше.
                Текст помилки: ${data.error}. `,
                icon: 'error',
                confirmButtonText: 'Окей'
              })
            }
          })
      } catch (error) {
        throw new Error(error)
      }
    } else {
      setStep((s) => s + 1)
      helpers.setTouched({})
      window.scrollTo(0, 0)
    }
  }

  const handleReset = async (resetForm) => {
    Swal.fire({
      title: 'Ви впевнені?',
      text: "Всі поля форми будуть очищені.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Так, очистити форму',
      cancelButtonText: 'Ні'
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm()
        setStep(0)
        window.location.reload()
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Форму очищено',
        //   toast: true,
        //   position: 'bottom-start',
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        // })
      }
    })
  }


  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, resetForm }) => (

        <Form autoComplete="off">
          <Typography variant='subtitle2' sx={{ mb: 2 }}> {currentChild.props.label}</Typography>

          {currentChild}

          <div className="form-nav__container">
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

            {step > 0 ? (
              <Button
                disabled={isSubmitting}
                color="primary"
                variant="outlined"
                size="large"
                onClick={() => {
                  setStep((s) => s - 1)
                  window.scrollTo(0, 0)
                }}
                sx={{ mr: 1.5, mb: 2 }}
              >
                Назад
              </Button>
            ) : null}

            <Button
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={{ mb: 2 }}
            >
              {isSubmitting ? 'Завантаження' : isLastStep() ? 'Відправити' : 'Далі'}
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  )
}

export default FormikStepper