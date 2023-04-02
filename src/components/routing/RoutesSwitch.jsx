import {
  Routes,
  Route,
  Navigate,
  NavLink
} from "react-router-dom"
import RegisterForm from 'components/RegisterForm'
import ReminderForm from 'components/ReminderForm'
import QueueForm from 'components/QueueForm'
import ClothesForm from 'components/forms/ClothesForm/ClothesForm'
import Box from '@mui/material/Box'
import Home from 'components/Home'
import RegisterClosed from 'components/RegisterClosed'


const RoutesSwitch = () => {
  return (
    <Box pt={4} spacing="2" direction="column" sx={{ minHeight: 'calc(100vh - 64px - 87px - 4 * 2 * 8px)' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/orikhiv-aid" />} />
        <Route path="/orikhiv-aid" element={<Home />} />

        <Route path="/orikhiv-aid/register" element={<RegisterClosed />} />
        <Route path="/orikhiv-aid/new" element={<RegisterForm />} />
        <Route path="/orikhiv-aid/reminder" element={<ReminderForm />} />
        <Route path="/orikhiv-aid/queue" element={<QueueForm />} />
        <Route path="/orikhiv-aid/clothes" element={<ClothesForm />} />

        <Route path="*" element={
          <div>Помилка 404. Сторінку не знайдено. <br />
            <NavLink to="/orikhiv-aid">Повернутись на головну</NavLink> </div>
        } />
      </Routes>
    </Box>
  )
}

export default RoutesSwitch