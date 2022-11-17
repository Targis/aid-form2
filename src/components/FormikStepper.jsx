import React from 'react'
import { Formik, Form } from 'formik'
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Typography
} from '@mui/material'
import Swal from 'sweetalert2'

import { useWindowSize } from 'hooks'
import { action } from 'api'

function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = React.useState(0)
  const [completed, setCompleted] = React.useState(false)

  const currentChild = childrenArray[step]
  const isLastStep = () => step === childrenArray.length - 1
  const isFirstStep = () => step === 0
  const { width } = useWindowSize()
  const isMobile = width <= 576

  const handleSubmit = async (values, helpers) => {
    if (isFirstStep()) {
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
            console.log(data)
            switch (data?.result) {
              case 'notFoundAll':
                setStep((s) => s + 1)
                helpers.setFieldValue('checked', true)
                helpers.setTouched({})
                break
              case 'success':
                Swal.fire('Увага!', `Ви вже реєструвалися. Ваш номер: ${data?.number}`, 'warning')
                helpers?.resetForm()
                setStep(0)
                break
              case 'different':
                Swal.fire('Невідповідність даних', 'Такі дані вже є в базі, але номер телефону і податковий номер не співпадають. Перевірте правильність введених даних. Якщо ви вважаєте це помилкою, зверніться у хаб з оригіналами документів. ', 'error')
                helpers?.resetForm()
                setStep(0)
                break
              case 'notFoundOne':
                Swal.fire('Відмова', 'Такий номер телефону або податковий номер вже був зареєстрований в базі.', 'error')
                helpers?.resetForm()
                setStep(0)
                break
              case 'invalidInn':
                Swal.fire('Увага!', 'Такий номер телефону вже є в базі, але в нас відсутні деякі ваші дані. Звеніться у хаб з оригіналами паспорта, коду та довідки ВПО, щоб надалі мати змогу отримувати гуманітарну допомогу!', 'warning')
                helpers?.resetForm()
                setStep(0)
                break
              case 'error':
                Swal.fire({
                  title: 'Упс...',
                  text: `Помилка на сервері: ${data.error}`,
                  icon: 'error',
                  confirmButtonText: 'Спробувати ще'
                })
                helpers?.resetForm()
                setStep(0)
                break
              default:
                Swal.fire('Внутрішня помилка', 'Зв\'яжіться з адміністратором', 'error')
                helpers?.resetForm()
                setStep(0)
            }

          })
      } catch (error) {
        throw new Error(error)
      }
    } else if (isLastStep()) {
      const data = new FormData()

      Object.keys(values).forEach(key => {
        if (key !== 'agree' && key !== 'checked')
          data.append(key, values[key])
      })

      try {
        await fetch(action, {
          method: 'POST',
          body: data

        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data)

            if (data.result === 'success') {
              Swal.fire('Успіх!', `Ви успішно зареєструвались у черзі. Ваш номер: <br>
              <strong style="font-size: 1.5em;">${data.number}</strong><br>
              Цей номер потрібно зберегти (записати).`, 'success')
              setCompleted(false)
              setStep(0)
              helpers.resetForm()

            }
            if (data.result === 'refused') {
              Swal.fire('Відмова', data.reason, 'error')
              // <p>Номер в черзі <strong>${data.number}</strong></p>
            }

            if (data.result === 'error') {
              Swal.fire({
                title: 'Упс...',
                text: `Виникла помилка на сервері. Ми вже працюємо над цим. Спробуйте пізніше.
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

  const adaptiveStepper = isMobile ? (<Typography sx={{ mb: 3 }}>Крок {step + 1} / {childrenArray.length}. {currentChild?.props?.label}</Typography>) : (
    <Stepper
      alternativeLabel
      activeStep={step}
      sx={{ mb: 4 }}
    // orientation="vertical"
    >
      {childrenArray.map((child, index) => (
        <Step
          key={child.props.label}
          completed={step > index || completed}
        >
          <StepLabel>{child.props.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, resetForm }) => (

        <Form autoComplete="off">

          {width && adaptiveStepper}

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