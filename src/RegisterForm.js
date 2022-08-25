import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { action } from './api/action'

import CriticalData from './components/CriticalData'
import PersonalData from './components/PersonalData'
import Confirm from './components/Confirm'
import Success from './components/Success'

const RegisterFormElements = () => {
  const initialState = {
    step: 1,
    lastName: '',
    firstName: '',
    middleName: '',
    birthday: '',
    inn: '',
    socialStatus: '',
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
  }

  const [state, setState] = useState(initialState)

  // Go to next step
  const nextStep = () => {
    const { step } = state
    setState({
      ...state,
      step: step + 1,
    })
  }

  // Go to prev step
  const prevStep = () => {
    const { step } = state
    setState({
      ...state,
      step: step - 1,
    })
  }

  const firstStep = () => {
    setState(initialState)
  }

  // Handle fields change
  const handleChange = (input) => (e) => {
    setState({
      ...state,
      [input]: e.target.value,
    })
  }

  const { step } = state
  const {
    lastName,
    firstName,
    middleName,
    birthday,
    inn,
    socialStatus,
    familySize,
    children,
    city,
    street,
    addrNum,
    addrCorp,
    addrRoom,
    factAddress,
    vpoNumber,
    vpoDate,
    phoneNumber,
  } = state
  const values = {
    lastName,
    firstName,
    middleName,
    birthday,
    inn,
    socialStatus,
    familySize,
    children,
    city,
    street,
    addrNum,
    addrCorp,
    addrRoom,
    factAddress,
    vpoNumber,
    vpoDate,
    phoneNumber,
  }
  switch (step) {
    default:
      return <h1>User Forms not working. Enable Javascript!</h1>
    case 1:
      return (
        <CriticalData
          nextStep={(e) => nextStep(e)}
          handleChange={(e) => handleChange(e)}
          values={values}
        />
      )
    case 2:
      return (
        <PersonalData
          nextStep={(e) => nextStep(e)}
          prevStep={(e) => prevStep(e)}
          handleChange={(e) => handleChange(e)}
          values={values}
        />
      )
    case 3:
      return (
        <Confirm
          nextStep={(e) => nextStep(e)}
          prevStep={(e) => prevStep(e)}
          values={values}
        />
      )
    //
    case 4:
      return <Success firstStep={(e) => firstStep(e)} />
  }
}

const RegisterForm = () => {
  const { handleSubmit } = useForm({ mode: 'onBlur' })

  const onSubmit = (e) => {
    console.log(e)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RegisterFormElements />
    </form>
  )
}

export default RegisterForm
