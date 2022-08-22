import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Step1 from './pages/Step1'
import Step2 from './pages/Step2'
import Step3 from './pages/Step3'
import Step4 from './pages/Step4'

import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          {/* <Route exact path="/" />
        <Route exact path="/pages/step1" component={Step1} /> */}
          <Route />
          <Route exact path="/" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/step4" element={<Step4 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
