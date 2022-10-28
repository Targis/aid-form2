import React, {useCallback, useEffect} from 'react'
import { Typography} from '@mui/material'
import FormikStepper from './components/FormikStepper'
import {StepCheck ,checkSchema} from './components/steps/StepCheck'
import {StepPersonal, personalSchema} from './components/steps/StepPersonal'
import {StepAddress, addressSchema} from 'components/steps/StepAddress'
import {StepVPO, vpoSchema} from './components/steps/StepVPO'
import {StepConfirm, confirmSchema} from './components/steps/StepConfirm'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Swal from 'sweetalert2'

import { action } from 'api'

async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

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
  checked: false
}

const RegisterForm = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    // const token = await executeRecaptcha('someAction');
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <div style={{ marginBottom: '2em' }}>
      <Typography color="inherit" variant="h6" component="div" sx={{ mb: 4 }}>
        Форма реєстрації
      </Typography>
      <FormikStepper
        initialValues={initialValues}
        // validateOnChange={false}
        // validateOnBlur={false}
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
        
        <StepCheck label="Перевірка" validationSchema={checkSchema} isDisabled={(values) => values.checked} />
        <StepPersonal label="П.І.Б." validationSchema={personalSchema} />
        <StepAddress label="Адреса" validationSchema={addressSchema} />
        <StepVPO label="ВПО" validationSchema={vpoSchema} />
        <StepConfirm label="Підтвердіть" validationSchema={confirmSchema} />

      </FormikStepper>
    </div>
  )
}

export default RegisterForm