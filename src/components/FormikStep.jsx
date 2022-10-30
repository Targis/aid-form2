import ScrollToError from 'components/ScrollToError'
const FormikStep = ({ children }) => {
  return (
    <>
      {children}
      <ScrollToError />
    </>
  )
}
export default FormikStep