import FormikStep from 'components/FormikStep'
import CheckField from 'components/inputs/CheckField'
import ConfirmContent from 'components/steps/ConfirmContent'
import * as yup from 'yup'

const confirmSchema = yup.object({
  agree: yup
    .boolean()
    .oneOf([true], 'Щоб продовжити, необхідно надати згоду'),
})

const StepConfirm = () => {
  return (
    <FormikStep>
      <ConfirmContent />
      <CheckField
        name="agree"
        label="Підтверджую правильність введених даних та даю згоду на обробку персональних даних"
        sx={{ mb: 2, textAlign: 'left' }}
      />
    </FormikStep>
  )
}

export {
  StepConfirm,
  confirmSchema
}

