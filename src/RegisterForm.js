import React from 'react'

import { Form, Formik } from 'formik'

import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Typography,
  StepContent,
} from '@mui/material'
import MaskedTextField from './components/MaskedTextField'
import TextInput from './components/TextInput'
import SelectInput from './components/SelectInput'
import * as yup from 'yup'
import { parseDateString } from './helpers/date'
import { streets, cities } from './helpers/toponyms'
import StreetField from './components/StreetField'
import ConfirmStep from './components/ConfirmStep'
import Confirm from './components/Confirm'
import CheckField from './components/CheckField'

import { PatternFormat } from 'react-number-format'

import { TextField } from 'formik-mui'

const phoneNumberRegex =
  /\(?([0-9]{3})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const today = new Date()
const minDate = new Date('2022-02-24')
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
  children: '',
  city: '',
  street: '',
  addrNum: '',
  addrCorp: '',
  addrRoom: '',
  factAddress: '',
  vpoNumber: '',
  vpoDate: '',
  phoneNumber: '',
  agree: false,
}

// const summaryLabels = {
//   fullName: "Повне ім'я",
//   birthday: 'Дата народження',
//   inn: 'Ідентифікаційний номер',
//   socialStatus: 'Соціальний статус',
//   familySize: 'Калькість дорослих',
//   children: 'Кількість дітей',
//   registerAddress: 'Адреса реєстрації',
//   factAddress: 'Фактична адреса',
//   vpo: 'Довідка ВПО',
// }

const RegisterForm = () => {
  return (
    <div style={{ marginBottom: '2em' }}>
      <Typography color="inherit" variant="h6" component="div" sx={{ mb: 4 }}>
        Форма реєстрації
      </Typography>
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
                'Невірний формат номеру, (0ХХ)ХХХ-ХХ-ХХ'
              )
              .required("Це поле обов'язкове"),
          })}
        >
          <MaskedTextField
            name="phoneNumber"
            label="Номер телефону"
            type="tel"
            format="(###)###-##-##"
            valueIsNumericString={true}
            mask="_"
            fullWidth
          />

          <MaskedTextField
            name="inn"
            label="Ідентифікаційний податковий номер (РНОКПП)"
            format="##########"
            type="tel"
            mask="_"
            valueIsNumericString={true}
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
              .typeError('Будь ласка, введіть дату в такому форматі ДД.ММ.РРРР')
              .max(today, 'Ви дійсно ще не народилися?'),
            familySize: yup
              .string()
              .required("Це поле обов'язкове")
              .min(1, 'Мінімальне значення - 1'),
            children: yup
              .string()
              .required("Це поле обов'язкове. Якщо дітей немає - поставте 0.")
              .min(0, 'Мінімальне значення - 0'),
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
            type="tel"
            valueIsNumericString={true}
            formatResult={true}
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
              <TextInput
                type="number"
                name="familySize"
                label="Кількість дорослих"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                type="number"
                name="children"
                label="Кількість дітей"
                fullWidth
              />
            </Grid>
          </Grid>
        </FormikStep>

        <FormikStep
          label="Реєстрація"
          validationSchema={yup.object({
            city: yup.string().required("Це поле обов'язкове"),
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
              <TextInput name="addrNum" label="Номер будинку" type="number" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextInput name="addrCorp" label="Корпус" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput name="addrRoom" label="Квартира" type="number" />
            </Grid>
          </Grid>
        </FormikStep>

        <FormikStep
          label="Дані ВПО"
          validationSchema={yup.object({
            factAddress: yup
              .string()
              .required("Це поле обов'язкове")
              .min(8, 'Введіть повну адресу (місто, вулиця, номер буд./кв.'),
            vpoNumber: yup
              .string()
              .required("Це поле обов'язкове")
              .matches(/^\d{4}[-]\d{10}$/, 'Невірний формат (1234-1234567890)'),
            vpoDate: yup
              .date()
              .required("Це поле обов'язкове")
              .transform(parseDateString)
              .typeError('Будь ласка, введіть дату в такому форматі ДД.ММ.РРРР')
              .min(minDate, 'Мінімальна дата 24.02.2022')
              .max(today, 'Дата з майбутнього? 🤔'),
          })}
        >
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
                valueIsNumericString={true}
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
                valueIsNumericString={true}
                formatResult={true}
                fullWidth
              />
            </Grid>
          </Grid>
        </FormikStep>

        <FormikStep
          name="agree"
          label="Підтвердження"
          validationSchema={yup.object({
            agree: yup
              .boolean()
              .oneOf([true], 'Щоб продовжити, необхідно надати згоду'),
          })}
        >
          <CheckField
            name="agree"
            label="Підтверджую правильність введених даних та даю згоду на обробку персональних даних"
            sx={{ mb: 2, textAlign: 'left' }}
          />
        </FormikStep>
      </FormikStepper>
    </div>
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
      {({ isSubmitting, values }) => (
        <Form autoComplete="off">
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
                {/* <StepContent></StepContent> */}
              </Step>
            ))}
          </Stepper>

          {isLastStep() && <ConfirmStep values={values} />}
          {currentChild}

          {step > 0 ? (
            <Button
              disabled={isSubmitting ? true : false}
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
            {isSubmitting ? 'Submitting' : isLastStep() ? 'Відправити' : 'Далі'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

const FormikStep = ({ children }) => {
  return <>{children}</>
}

export default RegisterForm
