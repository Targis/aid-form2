import Header from 'components/Header'
import Footer from 'components/layout/Footer'
import RoutesSwitch from 'components/routing/RoutesSwitch'
import {
  BrowserRouter
} from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import uk from 'date-fns/locale/uk'

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
        <BrowserRouter>
          <Header />
          <RoutesSwitch />
          <Footer />
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App