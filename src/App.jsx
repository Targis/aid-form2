import Header from './components/Header'
import RegisterForm from './RegisterForm'
import Container from '@mui/material/Container'
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';

function App() {
  return (
    <div className="App">
      <Header />
      <Container spacing="2" maxWidth="sm" direction="column">
        <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY} >
          <RegisterForm />
        </GoogleReCaptchaProvider>
      </Container>
    </div>
  )
}

export default App