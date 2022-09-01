import React from 'react'

import {
  useFormik,
  useField,
  Field,
  Form,
  Formik,
  useFormikContext,
} from 'formik'

import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import MaskedTextField from './components/MaskedTextField'
import TextInput from './components/TextInput'
// import MultiSelectElement from './components/MultiSelectElement'
import MultiSelectField from './components/MultiSelectField'
import SelectInput from './components/SelectInput'
import AutocompleteField from './components/AutocompliteField'
import * as yup from 'yup'
import { parseDateString } from './helpers/date'

import { streets, cities } from './helpers/toponyms'

const phoneNumberRegex =
  /\(?([0-9]{3})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const today = new Date()
let counter = 0
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
  socialStatus: [],
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
}

const RegisterForm = () => {
  // const formik = useFormik({
  //   validationSchema: schema,
  //   initialValues,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2))
  //   },
  // })

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      // validateOnChange={false}
      // validateOnBlur={false}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {(props) => (
        <>
          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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

            <MultiSelectField
              name="socialStatus"
              label="Оберіть Ваш соціальний статус (якщо є)"
              options={[
                '',
                'пенсіонер',
                'багатодітна родина',
                'особа з інвалідністю',
                'одинока мати (батько)',
                'малозабезпечена родина',
              ]}
              defaultValue=""
              fullWidth
            />

            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  name="familySize"
                  label="Кількість дорослих"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput name="children" label="Кількість дітей" fullWidth />
              </Grid>
            </Grid>
          </div>

          <div>
            <SelectInput
              name="city"
              label="Населений пункт"
              options={cities}
              fullWidth
            />

            {props.values.city === 'м.Оріхів' && (
              <AutocompleteField
                name="street"
                label="Вулиця"
                options={streets}
                fullWidth
              />
            )}

            {props.values.city !== '' && props.values.city !== 'м.Оріхів' && (
              <TextInput name="street" label="Вулиця" fullWidth />
            )}

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
          </div>

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

          <Button type="submit">Submit</Button>
          {/* </FormStepper> */}
        </>
      )}
    </Formik>
  )
}

const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children)
  console.log(children)
  const [step, setStep] = React.useState(0)
  const currentChild = childrenArray[step]
  return (
    <Formik {...props}>
      <Form autoComplete="off">{currentChild}</Form>
    </Formik>
  )
}

const FormStepper = ({ children, props }) => {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = React.useState(0)
  const currentChild = childrenArray[step]
  return <Form autoComplete="off">{currentChild}</Form>
}

const FormikStep = ({ children, ...props }) => {
  return <>{children}</>
}

export default RegisterForm
