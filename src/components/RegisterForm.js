import React, { useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import FormikStepper from './FormikStepper'
import { StepCheck, checkSchema } from './steps/StepCheck'
import { StepPersonal, personalSchema } from './steps/StepPersonal'
import { StepAddress, addressSchema } from 'components/steps/StepAddress'
import { StepVPO, vpoSchema } from './steps/StepVPO'
import { StepConfirm, confirmSchema } from './steps/StepConfirm'
import Section from './layout/Section'
import Swal from 'sweetalert2'
import { action } from 'api'
import { getCookie, setCookie } from 'helpers/cookies'

// async function stall(stallTime = 3000) {
//   await new Promise(resolve => setTimeout(resolve, stallTime));
// }

const initialValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  birthday: '',
  inn: '',
  passport: '',
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
  checked: false,
}

const RegisterForm = () => {
  // const { executeRecaptcha } = useGoogleReCaptcha();

  const [isAllowed, setAllowed] = useState(false)

  const checkUser = useCallback(async () => {
    const check = getCookie('ref') === 'hub'

    if (check) {
      setAllowed(true)
    } else {
      await Swal.fire({
        title: 'Авторизація',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Продовжити',
        cancelButtonText: 'Скасувати',
        showLoaderOnConfirm: true,
        preConfirm: (pass) => {
          const params = { pass }
          return fetch(action + '?' + new URLSearchParams(params), {
            method: 'GET',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`)
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((res) => {
        // console.log({ res })
        if (res.value?.result === 'success') {
          setAllowed(true)
          setCookie('ref', 'hub', { 'max-age': 4 * 3600 })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Невірний пароль',
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
        }
      })
    }
  }, [])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  return (
    <Section style={{ marginBottom: '2em' }} maxWidth={'sm'}>
      <Typography
        color="inherit"
        variant="h6"
        component="div"
        sx={{ textAlign: 'center', mb: 4 }}
      >
        Форма реєстрації
      </Typography>

      {isAllowed ? (
        <FormikStepper
          initialValues={initialValues}
          // validateOnChange={false}
          // validateOnBlur={false}
          onSubmit={async (values) => {
            // console.log(values)
          }}
        >
          <StepCheck
            label="Перевірка"
            validationSchema={checkSchema}
            isDisabled={(values) => values.checked}
          />
          <StepPersonal label="П.І.Б." validationSchema={personalSchema} />
          <StepAddress label="Адреса" validationSchema={addressSchema} />
          <StepVPO label="ВПО" validationSchema={vpoSchema} />
          <StepConfirm label="Підтвердіть" validationSchema={confirmSchema} />
        </FormikStepper>
      ) : (
        <Section sx={{ textAlign: 'center' }} maxWidth="sm">
          <Typography>Ви не авторизовані</Typography>

          <Button onClick={checkUser}>Вхід</Button>
        </Section>
      )}
    </Section>
  )
}

export default RegisterForm
