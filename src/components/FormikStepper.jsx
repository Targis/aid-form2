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
            // console.log(data)
            if (data.result === 'success') {
              setStep((s) => s + 1)
              helpers.setFieldValue('checked', true)
              helpers.setTouched({})
            }
            if (data.result === 'refused') {
              Swal.fire('Відмова', data.reason, 'error')
              helpers?.resetForm()
              setStep(0)
              // <p>Номер в черзі <strong>${data.number}</strong></p>
            }

            if (data.result === 'error') {
              Swal.fire({
                title: 'Упс...',
                text: `Помилка на сервері: ${data.error}`,
                icon: 'error',
                confirmButtonText: 'Спробувати ще'
              })
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
        // if (key === 'phoneNumber') {
        //   const tel = values[key]
        //   let formattedTel = `+38(${tel.slice(0, 3)})${tel.slice(3, 6)}-${tel.slice(6, 8)}-${tel.slice(8)}`
        //   data.append(key, formattedTel)
        // } else {
        //   data.append(key, values[key])
        // }
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
      }
    })
  }

  const adaptiveStepper = isMobile ? (<Typography sx={{ mb: 3 }}>Крок {step + 1} / {childrenArray.length}</Typography>) : (
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

          <Button
            disabled={isSubmitting}
            color="error"
            variant="outlined"
            size="large"
            onClick={() => handleReset(resetForm)}
            sx={{ mr: 3 }}
          >
            Очистити
          </Button>

          {step > 0 ? (
            <Button
              disabled={isSubmitting}
              color="primary"
              variant="outlined"
              size="large"
              onClick={() => setStep((s) => s - 1)}
              sx={{ mr: 3 }}
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
          >
            {isSubmitting ? 'Завантаження' : isLastStep() ? 'Відправити' : 'Далі'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikStepper