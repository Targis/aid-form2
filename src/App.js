import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Step1 from './pages/Step1'
import Step2 from './pages/Step2'
import Step3 from './pages/Step3'
import Step4 from './pages/Step4'

import Header from './components/Header'

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="column" spacing="3">
          <Grid item>
            <Header />
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default App
