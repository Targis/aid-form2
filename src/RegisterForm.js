import React from 'react'

import { Form, Formik } from 'formik'

import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material'
import MaskedTextField from './components/MaskedTextField'
import TextInput from './components/TextInput'
import SelectInput from './components/SelectInput'
import * as yup from 'yup'
import { parseDateString } from './helpers/date'
import { streets, cities } from './helpers/toponyms'
import StreetField from './components/StreetField'

const phoneNumberRegex =
  /\(?([0-9]{3})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const today = new Date()
const schema = yup.object({
  // inn: yup
  //   .string()
  //   .required("Це поле обов'язкове")
  //   .length(10, 'Це поле має містити 10 цифр'),
  // phoneNumber: yup
  //   .string()
  //   .matches(phoneNumberRegex, 'Невірний формат номеру, +38(ХХХ)ХХХ-ХХ-ХХ')
  //   .required("Це поле обов'язкове"),
  // lastName: yup
  //   .string()
  //   .matches(/^\D+$/, 'Це поле не може містити числа')
  //   .required("Це поле обов'язкове")
  //   .min(2, 'Дуже коротке прізвище'),
  // firstName: yup
  //   .string()
  //   .matches(/^\D+$/, 'Це поле не може містити числа')
  //   .required("Це поле обов'язкове")
  //   .min(2, "Дуже коротке ім'я"),
  // middleName: yup
  //   .string()
  //   .matches(/^\D+$/, 'Це поле не може містити числа')
  //   .required("Це поле обов'язкове")
  //   .min(4, 'Це поле має містити щонайменше 4 символи'),
  // birthday: yup
  //   .date()
  //   .required()
  //   .transform(parseDateString)
  //   .typeError('Будь ласка, введіть дату в такому форматі ДД-ММ-РРРР')
  //   .max(today, 'Ви дійсно ще не народилися?'),
})

const initialValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  birthday: '',
  inn: '',
  socialStatus: 'відсутній',
  familySize: '',
  children: '0',
  city: '',
  street: '',
  addrNum: '',
  addrCorp: '',
  addrRoom: '',
  factAddress: '',
  vpoNumber: '',
  vpoDate: '',
  phoneNumber: '',
}

const RegisterForm = () => {
  return (
    <FormikStepper
      validationSchema={schema}
      initialValues={initialValues}
      // validateOnChange={false}
      // validateOnBlur={false}
      onSubmit={async (values) => {
        setTimeout(() => alert(JSON.stringify(values, null, 2)), 1500)
      }}
    >
      <FormikStep
        label="Ідентифікація"
        validationSchema={yup.object({
          inn: yup
            .string()
            .required("Це поле обов'язкове")
            .length(10, 'Це поле має містити 10 цифр'),
          phoneNumber: yup
            .string()
            .matches(
              phoneNumberRegex,
              'Невірний формат номеру, +38(ХХХ)ХХХ-ХХ-ХХ'
            )
            .required("Це поле обов'язкове"),
        })}
      >
        <MaskedTextField
          name="phoneNumber"
          label="Номер телефону"
          format="+38(###)###-##-##"
          mask="_"
          fullWidth
        />

        <MaskedTextField
          name="inn"
          label="Ідентифікаційний податковий номер (РНОКПП)"
          format="##########"
          mask="_"
          fullWidth
        />
      </FormikStep>

      <FormikStep
        label="Загальні відомості"
        validationSchema={yup.object({
          lastName: yup
            .string()
            .required("Це поле обов'язкове")
            .matches(/^\D+$/, 'Це поле не може містити числа')
            .min(2, 'Дуже коротке прізвище'),
          firstName: yup
            .string()
            .required("Це поле обов'язкове")
            .matches(/^\D+$/, 'Це поле не може містити числа')
            .min(2, "Дуже коротке ім'я"),
          middleName: yup
            .string()
            .required("Це поле обов'язкове")
            .matches(/^\D+$/, 'Це поле не може містити числа')
            .min(4, 'Це поле має містити щонайменше 4 символи'),
          birthday: yup
            .date()
            .required("Це поле обов'язкове")
            .transform(parseDateString)
            .typeError('Будь ласка, введіть дату в такому форматі ДД-ММ-РРРР')
            .max(today, 'Ви дійсно ще не народилися?'),
          familySize: yup
            .number()
            .required("Це поле обов'язкове")
            .min(1, 'Мінімальне значення - 1'),
        })}
      >
        <TextInput name="lastName" label="Прізвище" fullWidth />
        <TextInput name="firstName" label="Ім'я" fullWidth />
        <TextInput name="middleName" label="По-батькові" fullWidth />
        <MaskedTextField
          name="birthday"
          label="Дата народження"
          format="##.##.####"
          mask="_"
          fullWidth
        />

        <SelectInput
          name="socialStatus"
          label="Оберіть Ваш соціальний статус (якщо є)"
          options={[
            'відсутній',
            'пенсіонер',
            'багатодітна родина',
            'особа з інвалідністю',
            'одинока мати (батько)',
            'малозабезпечена родина',
          ]}
          defaultValue="відсутній"
          fullWidth
        />

        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <MaskedTextField
              mask={Number}
              name="familySize"
              label="Кількість дорослих"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput name="children" label="Кількість дітей" fullWidth />
          </Grid>
        </Grid>
      </FormikStep>

      <FormikStep
        label="Реєстрація"
        validationSchema={yup.object({
          city: yup.string().required("Це поле обов'язкове").min(8, ''),
          street: yup.string().required("Це поле обов'язкове"),
          addrNum: yup.string().required("Це поле обов'язкове"),
        })}
      >
        <SelectInput
          name="city"
          label="Населений пункт"
          options={cities}
          fullWidth
        />

        <StreetField name="street" label="Вулиця" streets={streets} />

        <Grid container columnSpacing={2} columns={11}>
          <Grid item xs={12} sm={4}>
            <TextInput name="addrNum" label="Номер будинку" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextInput name="addrCorp" label="Корпус" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput name="addrRoom" label="Квартира" />
          </Grid>
        </Grid>
      </FormikStep>

      {/*
        <div>
          <TextInput
            name="factAddress"
            label="Фактичне місце проживання згідно довідки ВПО"
            helperText="наприклад, м.Запоріжжя, вул.Перемоги, 1"
            fullWidth
          />

          <Grid container columnSpacing={2} columns={12}>
            <Grid item xs={12} sm={7}>
              <MaskedTextField
                name="vpoNumber"
                label="Номер довідки ВПО"
                format="####-##########"
                mask="_"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <MaskedTextField
                name="vpoDate"
                label="Дата видачі довідки"
                format="##.##.####"
                mask="_"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>

        <div>
          <FormControlLabel
            control={<Checkbox required />}
            label="Підтверджую, що зареєстрований на території Оріхівської громади та даю згоду на обробку персональних даних"
            sx={{ mb: 2, textAlign: 'left' }}
          />
        </div>

        */}
    </FormikStepper>
  )
}

function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = React.useState(0)
  const [completed, setCompleted] = React.useState(false)
  const currentChild = childrenArray[step]
  const isLastStep = () => step === childrenArray.length - 1

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
          setCompleted(true)
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step} sx={{ mb: 4 }}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          {step > 0 ? (
            <Button
              disabled={isSubmitting}
              color="primary"
              variant="outlined"
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
            type="submit"
          >
            {isSubmitting ? 'Submitting' : isLastStep() ? 'Відправити' : 'Далі'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

// const FormikStepper = ({ children, ...props }) => {
//   const childrenArray = React.Children.toArray(children)
//   console.log(children)
//   const [step, setStep] = React.useState(0)
//   const currentChild = childrenArray[step]
//   return (
//     <Formik {...props}>
//       <Form autoComplete="off">{currentChild}</Form>
//     </Formik>
//   )
// }

// const FormStepper = ({ children, props }) => {
//   const childrenArray = React.Children.toArray(children)
//   const [step, setStep] = React.useState(0)
//   const currentChild = childrenArray[step]
//   return <Form autoComplete="off">{currentChild}</Form>
// }

const FormikStep = ({ children }) => {
  return <>{children}</>
}

export default RegisterForm
