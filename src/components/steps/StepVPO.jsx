
import FormikStep from 'components/FormikStep'
import TextInput from 'components/inputs/TextInput'
import MaskedTextField from 'components/inputs/MaskedTextField'
import { Grid } from '@mui/material'
import * as yup from 'yup'
import { parseDateString } from 'helpers/date'

const today = new Date()
const minDate = new Date('2022-02-23')

const vpoSchema = yup.object({
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
})

const StepVPO = () => {
  return (
    <FormikStep>
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
            // valueIsNumericString={true}
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
            // valueIsNumericString={true}
            formatResult={true}
            fullWidth
          />
        </Grid>
      </Grid>
    </FormikStep>
  )
}

export { StepVPO, vpoSchema }