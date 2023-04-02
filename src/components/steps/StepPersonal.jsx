import FormikStep from 'components/FormikStep'
import TextInput from 'components/inputs/TextInput'
import MaskedTextField from 'components/inputs/MaskedTextField'
import SelectInput from 'components/inputs/SelectInput'
import { Grid } from '@mui/material'

import * as yup from 'yup'
import { parseDateString } from 'helpers/date'
import { add } from 'date-fns'

const today = new Date()
const minDate = add(today, { years: -18 })

const passportRegex =
  /^(?:[А-ЩЬЮЯЄІЇҐ]{2}\d{6}|\d{10}|відмітка)$/

const personalSchema = yup.object({
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
    .max(minDate, 'Мінімальний вік 18 років'),
  passport: yup
    .string()
    .matches(
      passportRegex,
      'Невірний формат, наприклад: СА123456 або 001234567. '
    ).required("Це поле обов'язкове. Якщо в паспорті наявна відмітка про право здійснювати будь-які платежі без ідентифікаційного номера, то напишіть у цьому полі слово \"відмітка\""),
  familySize: yup
    .number()
    .required("Це поле обов'язкове")
    .min(1, 'Мінімальне значення - 1'),
  children: yup
    .number()
    .required("Це поле обов'язкове. Якщо дітей немає - поставте 0.")
    .min(0, 'Мінімальне значення - 0'),
})

const StepPersonal = () => {
  console.log(minDate)
  return (
    <FormikStep>
      <TextInput name="lastName" label="Прізвище" fullWidth />
      <TextInput name="firstName" label="Ім'я" fullWidth />
      <TextInput name="middleName" label="По-батькові" fullWidth />
      <MaskedTextField
        name="birthday"
        label="Дата народження"
        format="##.##.####"
        mask="_"
        type="tel"
        // valueIsNumericString={true}
        formatResult={true}
        fullWidth
      />

      <TextInput name="passport" label="Серія, номер паспорта" fullWidth />

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
  )
}

export {
  StepPersonal,
  personalSchema
}