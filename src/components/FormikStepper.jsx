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
import ConfirmStep from './ConfirmStep'
import { useWindowSize } from 'hooks'

function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = React.useState(0)
  const [completed, setCompleted] = React.useState(false)
  const currentChild = childrenArray[step]
  const isLastStep = () => step === childrenArray.length - 1
  const { width } = useWindowSize()
  const isMobile = width <= 576
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
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
          setCompleted(false)
          setStep(0)
          // helpers.resetForm()
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form autoComplete="off">

          {width && adaptiveStepper}

          {isLastStep() && <ConfirmStep values={values} />}
          {currentChild}

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
            {isSubmitting ? 'Відправка' : isLastStep() ? 'Відправити' : 'Далі'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikStepper