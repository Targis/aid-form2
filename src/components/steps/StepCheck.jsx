import FormikStep from 'components/FormikStep'
import MaskedTextField from 'components/inputs/MaskedTextField'
import * as yup from 'yup'
import { useFormikContext } from 'formik';

const phoneNumberRegex =
  /\(?(0[0-9]{2})\)?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/

const checkSchema = yup.object({
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
})

const StepCheck = () => {
  const { values } = useFormikContext()
  return (
    <FormikStep>
      <MaskedTextField
        name="phoneNumber"
        label="Номер телефону"
        placeholder="Напр., 050 123 45 67"
        type="tel"
        format="+38(###)###-##-##"
        // valueIsNumericString={true}
        mask="_"
        formatResult={true}
        fullWidth
        disabled={values?.checked}
      />

      <MaskedTextField
        name="inn"
        label="Ідентифікаційний податковий номер (РНОКПП)"
        format="##########"
        type="tel"
        mask="_"
        valueIsNumericString={true}
        fullWidth
        disabled={values?.checked}
      />

    </FormikStep>
  )
}

export { StepCheck, checkSchema }

