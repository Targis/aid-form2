import React, {useCallback, useEffect, useState} from 'react'
import { Typography} from '@mui/material'
import FormikStepper from './FormikStepper'
import {StepCheck ,checkSchema} from './steps/StepCheck'
import {StepPersonal, personalSchema} from './steps/StepPersonal'
import {StepAddress, addressSchema} from 'components/steps/StepAddress'
import {StepVPO, vpoSchema} from './steps/StepVPO'
import {StepConfirm, confirmSchema} from './steps/StepConfirm'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Swal from 'sweetalert2'

// async function stall(stallTime = 3000) {
//   await new Promise(resolve => setTimeout(resolve, stallTime));
// }

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
  
  const informUser = async () => {
    const skip = localStorage.getItem('skip')
    if(skip) {
      return
    } 
    Swal.fire({
      // icon: 'info',
      titleText: 'Зверніть увагу',
      text: 'Це тестова форма, вона нікуди вас не зареєструє. З одного номеру телефону та податковим номером можна подати лише одну заявку.',
      input: 'checkbox',
      inputValue: 0,
      inputPlaceholder:
        'Більше не показувати це',
      confirmButtonText:
        'Продовжити',
        allowOutsideClick: false
    }).then(({value: accept, isConfirmed}) => {
      if (accept) localStorage.setItem('skip', true)
    })

  }

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    // const token = await executeRecaptcha('someAction');
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
    informUser()
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