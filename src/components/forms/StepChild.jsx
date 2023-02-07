import { useContext } from 'react'
import FormikStep from 'components/FormikStep'
import TextInput from 'components/inputs/TextInput'
import MaskedTextField from 'components/inputs/MaskedTextField'
import SelectInput from 'components/inputs/SelectInput'
import CheckField from 'components/inputs/CheckField'
import { FormContext } from 'components/forms/ClothesForm'

import * as yup from 'yup'
import { parseDateString } from 'helpers/date'

import addDays from 'date-fns/addDays'
import addYears from 'date-fns/addYears'
import format from 'date-fns/format'

const today = new Date()
const minDate = addYears(today, -18)
const oneDayBeforeMinDate = addDays(minDate, -1)

const childSchema = yup.object({
  child_doc: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(/^[A-ZА-ЩЬЮЯҐЄІЇ]{2,}\d{6}$/, 'Невірний формат'),
  child_bday: yup
    .date()
    .required("Це поле обов'язкове")
    .transform(parseDateString)
    .typeError('Будь ласка, введіть дату в такому форматі ДД.ММ.РРРР')
    .min(oneDayBeforeMinDate, `Мінімальна дата ${format(minDate, 'dd.MM.yyyy')}`)
    .max(today, 'Ця дата ще не наступила'),
  size: yup
    .string()
    .required("Це поле обов'язкове"),
  agree: yup
    .boolean()
    .oneOf([true], 'Щоб продовжити, необхідно надати згоду'),
})

const StepChild = () => {
  const { availableSizes } = useContext(FormContext);

  return (
    <FormikStep>
      <TextInput
        name="child_doc"
        label="Серія і номер свідоцтва про народження"
        helperText="Лише великі букви і цифри. Без пробілів і дефісів. Зразок: ІЖС123456"
        fullWidth
      />

      <MaskedTextField
        name="child_bday"
        label="Дата народження"
        format="##.##.####"
        mask="_"
        type="tel"
        // valueIsNumericString={true}
        formatResult={true}
        fullWidth
      />

      <SelectInput
        name="size"
        label="Оберіть розмір одягу"
        options={availableSizes.map(size => {
          return {
            ...size,
            label: `зріст ${size.label} (залишилось ${size.available}%)`
          }
        })}
        defaultValue=""
        fullWidth
      />

      <CheckField
        name="agree"
        label="Даю згоду на обробку моїх персональних даних"
        sx={{ mb: 2, textAlign: 'left' }}
      />
    </FormikStep>
  )
}

export {
  StepChild,
  childSchema
}