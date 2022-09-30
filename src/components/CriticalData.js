import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, FormControl, InputLabel, Input, Button } from '@mui/material'
import InputTextMask from './MaskedTextField'
import * as yup from 'yup'

const schema = yup.object().shape({
  inn: yup.number().required(),
  phoneNumber: yup.string().required(),
})

const CriticalData = ({ nextStep, values, handleChange }) => {
  const next = (e) => {
    e.preventDefault()
    nextStep()
  }

  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <Grid container direction="column">
      <FormControl variant="standard" sx={{ mb: 4 }}>
        <InputLabel htmlFor="formatted-text-mask-input">
          Ідентифікаційний податковий номер (РНОКПП)
        </InputLabel>
        <Input
          {...register('inn')}
          name="inn"
          control={control}
          value={values.inn}
          // onChange={handleChange('inn')}
          id="formatted-text-mask-input"
          // inputComponent={InputTextMask}
          // inputProps={{
          //   mask: '0000000000',
          //   placeholderChar: 'x',
          // }}
        />

        <p>{errors.inn ? errors.inn?.message : null}</p>
      </FormControl>

      <FormControl variant="standard" sx={{ mb: 4 }}>
        <InputLabel htmlFor="formatted-text-mask-input">
          Номер телефону
        </InputLabel>
        <Input
          {...register('phoneNumber', { required: true })}
          value={values.phoneNumber}
          onChange={handleChange('phoneNumber')}
          name="phoneNumber"
          id="formatted-text-mask-input"
          // inputComponent={InputTextMask}
          // // placeholderChar="3"
          // inputProps={{
          //   mask: '+{38}(000)000-00-00',
          //   placeholderChar: 'x',
          // }}
        />
      </FormControl>

      <Grid item xs="auto">
        <Button
          type="submit"
          style={{ background: '#2E3B55', color: '#FFFFFF' }}
          label="Далі"
          onClick={(e) => next(e)}
        >
          Далі
        </Button>
      </Grid>
    </Grid>
  )
}

export default CriticalData
