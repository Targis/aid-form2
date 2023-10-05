import React, { useCallback, useEffect, useState } from 'react'
import { action } from 'api'
import { getCookie, setCookie } from 'helpers/cookies'
// import { normalizePersonData } from 'helpers/normalizeData'
import Section from 'components/layout/Section'
import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, usePathPattern } from 'react-router-dom'
// import FamilyForm from 'components/family/FamilyForm'
// import CircularProgress from '@mui/material/CircularProgress'
// import FamilyTable from 'components/family/FamilyTable'
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import { Navigate } from 'react-router-dom'
function Protected({ menuDisabled, children }) {
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
        preConfirm: async (pass) => {
          const params = { pass }
          return await fetch(action + '?' + new URLSearchParams(params), {
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
        console.log({ res })
        if (res.value?.result === 'success') {
          setAllowed(true)
          setCookie('ref', 'hub', { 'max-age': 5 * 3600 })
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
    if (!isAllowed) {
      checkUser()
    }
  }, [checkUser, isAllowed])

  if (isAllowed) {
    return (
      <Section maxWidth='md'>
        {/* <Button size="small" startIcon={<ArrowBackIcon />} >
          <Link to="/orikhiv-aid/family/">До меню</Link>
        </Button> */}

        {!menuDisabled && (
          <Button size="small" startIcon={<ArrowBackIcon />} component={Link} to="/orikhiv-aid/new/">
            До меню
          </Button>
        )}

        {children}
      </Section>

    )
  }

  return (
    <Section sx={{ textAlign: 'center' }} maxWidth='sm'>
      <Typography>Ви не авторизовані</Typography>
      <Button onClick={checkUser}>Вхід</Button>
    </Section>
  )
}
export default Protected