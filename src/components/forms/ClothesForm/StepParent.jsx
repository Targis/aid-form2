import FormikStep from 'components/FormikStep'
import TextInput from 'components/inputs/TextInput'
import MaskedTextField from 'components/inputs/MaskedTextField'
import { Grid } from '@mui/material'

import * as yup from 'yup'


const phoneNumberRegex =
  /\(?([0-9]{3})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const parentSchema = yup.object({
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
    .matches(/^\d{4}[-]\d{10}$/, 'Невірний формат (1234-1234567890)')
})

const StepParent = ({ label }) => {

  return (
    <FormikStep>

      <TextInput name="last_name" label="Прізвище" fullWidth autoComplete="none" />
      <TextInput name="first_name" label="Ім'я" fullWidth autoComplete="none" />
      <TextInput name="middle_name" label="По-батькові" fullWidth autoComplete="none" />

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
          // disabled={values?.checked}
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
          // disabled={values?.checked}
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
    </FormikStep>
  )
}

export {
  StepParent,
  parentSchema
}