import Header from 'components/Header'
import RegisterForm from 'components/RegisterForm'
import ReminderForm from 'components/ReminderForm'
import QueueForm from 'components/QueueForm'
import Container from '@mui/material/Container'
import Home from 'components/Home'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container spacing="2" maxWidth="sm" direction="column">
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.REACT_APP_SITE_KEY}
            container={{
              element: "recaptcha",
              parameters: {
                badge: '',
                size: 'invisible',
              }
            }}
          >
            <Routes>
              <Route index element={<Home />} />
              <Route path="orikhiv-aid">
                <Route index element={<Home />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="reminder" element={<ReminderForm />} />
                <Route path="e-queue" element={<QueueForm />} />
              </Route>

            </Routes>

          </GoogleReCaptchaProvider>
        </Container>
      </BrowserRouter>

    </div>
  )
}

export default App