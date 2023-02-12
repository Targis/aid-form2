import Header from 'components/Header'
import Footer from 'components/layout/Footer'

import RoutesSwitch from 'components/routing/RoutesSwitch'

import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RoutesSwitch />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App