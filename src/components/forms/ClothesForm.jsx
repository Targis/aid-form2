import React, { useEffect, useState, useCallback, createContext } from 'react'
import { Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import ToggleButtons from 'components/inputs/ToggleButtons'
import { CircularProgress, Button } from '@mui/material'
import LinearProgressWithLabel from '../LinearProgressWithLabel'
import { clothesAction } from 'api'
import * as yup from 'yup'
import ClothesFormStepper from 'components/forms/ClothesFormStepper'
import { StepParent, parentSchema } from 'components/forms/StepParent'
import { StepChild, childSchema } from 'components/forms/StepChild'


const initialValues = {
  check_delivery: false,
  last_name: '',
  first_name: '',
  middle_name: '',
  inn: '',
  tel: '',
  vpo_number: '',
  child_doc: '',
  child_bday: '',
  size: '',
  agree: false,
}


export const FormContext = createContext(null)

const ClothesForm = () => {

  const [isLoading, setLoading] = useState(false) //true
  const [isClosed, setClosed] = useState(false) // true
  const [availableCount, setAvailableCount] = useState(100)
  const [availableSizes, setAvailableSizes] = useState([])
  const [datestamp, setDatestamp] = useState(null)
  const [isConfirm, setConfirm] = useState(false)

  const getAvailableCount = (max, current) => {
    max = +max
    current = +current
    if (isNaN(max) || isNaN(current)) {
      return 0
    }
    return Math.ceil(current / max * 100)
  }

  const getAvailableSizes = (array) => {
    const avSizes = array.filter(a => +a[2] !== 0)
    const sizes = avSizes.map(item => {
      const available = Math.ceil(item[2] / item[3] * 100)
      return {
        id: item[0],
        label: item[1],
        available
      }
    })
    return sizes
  }

  const isFormClosed = useCallback(
    async (action) => {
      try {
        await fetch(action, { method: 'GET' })
          .then(res => res.json())
          .then(data => {
            if (data?.status === 'open') {
              setClosed(false)
              setDatestamp(data?.datestamp)
              setAvailableCount(getAvailableCount(data?.max, data?.current))
              setAvailableSizes(getAvailableSizes(data?.sizes))
            } else {
              setClosed(true)
            }
            return null
          })
      } catch (e) {
        throw new Error(e)
      } finally {
        setLoading(false)
      }
    }, []
  )

  useEffect(() => {
    if (isConfirm) {
      isFormClosed(clothesAction)
    }


  }, [isConfirm, isFormClosed])


  return (
    <FormContext.Provider value={{ availableSizes, isFormClosed }}>
      <div style={{ marginBottom: '2em' }}>


        <Typography color="inherit" variant="h6" component="div" sx={{ mb: 4 }}>
          Форма на отримання дитячого одягу
        </Typography>

        {!isConfirm && (
          <Formik
            initialValues={{
              check_delivery: false
            }}
            validationSchema={
              yup.object({
                check_delivery: yup
                  .boolean()
                  .oneOf([true], 'Отримання доступне тільки в місті Запоріжжя'),
              })
            }
            onSubmit={(values, actions) => {
              setLoading(true)
              setConfirm(true)
            }}
          >
            {({ isSubmitting, values }) => (

              <Form>
                <ToggleButtons name="check_delivery" label={'Ви проживаєте в Запоріжжі та зможете особисто прийти, щоб отримати одяг?'} />
                <Button
                  startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  {isSubmitting ? 'Завантаження' : 'Продовжити'}
                </Button>
              </Form>

            )}
          </Formik>
        )}



        {isLoading && (
          <>
            <div>Завантаження...</div>
            <br />
            <div><CircularProgress size="3rem" /></div>
          </>
        )}

        {isClosed && ('Форма закрита.')}


        {!isClosed && !isLoading && isConfirm && (

          <>
            <LinearProgressWithLabel variant="determinate" value={availableCount} title={'Залишилось одягу*'} />
            <ClothesFormStepper initialValues={initialValues} availableSizes={availableSizes} >
              <StepParent label="Крок 1. Введіть дані контактної особи (представника) дитини (мати, батько або опікун)" validationSchema={parentSchema} />
              <StepChild label="Крок 2. Введіть дані дитини" validationSchema={childSchema} />
            </ClothesFormStepper>
            {/* 
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions)
            }}
          >
            {({ values, isSubmitting, handleSubmit }) => (

              <Form onSubmit={handleSubmit}>

                {isSubmitting ? (
                  <>
                    <div>Завантаження... Не закривайте це вікно.</div> <br />
                    <CircularProgress size="3rem" />
                  </>
                ) : (
                  <>
                    <FormikStep>
                      <TextInput name="last_name" label="Прізвище" fullWidth />
                      <TextInput name="first_name" label="Ім'я" fullWidth />
                      <TextInput name="middle_name" label="По-батькові" fullWidth />

                      <Grid container columnSpacing={2} columns={12}>
                        <Grid item xs={12} sm={6}>
                          <MaskedTextField
                            name="tel"
                            label="Номер телефону"
                            type="tel"
                            format="+38(###)###-##-##"
                            // valueIsNumericString={true}
                            mask="_"
                            formatResult={true}
                            fullWidth
                            disabled={values?.checked}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MaskedTextField
                            name="inn"
                            label="Податковий номер (РНОКПП)"
                            format="##########"
                            type="tel"
                            mask="_"
                            valueIsNumericString={true}
                            fullWidth
                            disabled={values?.checked}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={7}>
                        <MaskedTextField
                          name="vpo_number"
                          label="Номер довідки ВПО"
                          format="####-##########"
                          // valueIsNumericString={true}
                          formatResult={true}
                          mask="_"
                          type="tel"
                          fullWidth
                        />
                      </Grid>
                    </FormikStep>

                    <FormikStep>
                      <TextInput
                        name="child_doc"
                        label="Серія і номер свідоцтва про народження"
                        helperText="Лише великі українські букви і цифри. Без пробілів і дефісів. Зразок: ІЖС123456"
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
                        options={availableSizes.map(size => `${size.label} (залишилось ${size.available}%)`)}
                        defaultValue=""
                        fullWidth
                      />

                      <CheckField
                        name="agree"
                        label="Даю згоду на обробку моїх персональних даних"
                        sx={{ mb: 2, textAlign: 'left' }}
                      />
                    </FormikStep>


                    <Button
                      startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      {isSubmitting ? 'Завантаження' : 'Відправити'}
                    </Button>
                  </>
                )}



              </Form>
            )}

          </Formik>

           */}



          </>
        )}
        {datestamp && (
          <Typography color="text.secondary" variant="body2" component="div" sx={{ my: 4 }}>
            * - дані станом на {datestamp}
          </Typography>
        )}
      </div>
    </FormContext.Provider>
  )
}

export default ClothesForm