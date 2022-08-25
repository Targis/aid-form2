import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import Header from './components/Header'
import RegisterForm from './RegisterForm'

import Container from '@mui/material/Container'

function App() {
  return (
    <div className="App">
      <Header />
      <Container spacing="2" maxWidth="sm" direction="column">
        <RegisterForm />
      </Container>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
