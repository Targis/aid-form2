import Header from 'components/Header'
import RegisterForm from 'components/RegisterForm'
import ReminderForm from 'components/ReminderForm'
import QueueForm from 'components/QueueForm'
import Container from '@mui/material/Container'
import Home from 'components/Home'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink
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
              <Route path="/" element={<Navigate to="/orikhiv-aid" />} />
              <Route path="/orikhiv-aid" element={<Home />} />

              <Route path="/orikhiv-aid/register" element={<RegisterForm />} />
              <Route path="/orikhiv-aid/reminder" element={<ReminderForm />} />
              <Route path="/orikhiv-aid/queue" element={<QueueForm />} />
              <Route path="*" element={
                <div>Помилка 404. Сторінку не знайдено. <br />
                  <NavLink to="/orikhiv-aid">Повернутись на головну</NavLink> </div>
              } />


            </Routes>

          </GoogleReCaptchaProvider>
        </Container>
      </BrowserRouter>

    </div>
  )
}

export default App