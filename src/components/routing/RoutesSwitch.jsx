import {
  Routes,
  Route,
  Navigate,
  NavLink
} from "react-router-dom"
// import RegisterForm from 'components/RegisterForm'
import ReminderForm from 'components/ReminderForm'
import QueueForm from 'components/QueueForm'
import ClothesForm from 'components/forms/ClothesForm/ClothesForm'
import Box from '@mui/material/Box'
import Home from 'components/Home'
import RegisterClosed from 'components/RegisterClosed'
import FamilyCreate from 'components/family/FamilyCreate'
// import FamilyAddPerson from 'components/family/FamilyAddPerson'
import FamilyEdit from 'components/family/FamilyEdit'
import FamilyClarify from 'components/family/FamilyClarify'
import Family from 'components/family/Family'
import Protected from "./Protected"
import Section from 'components/layout/Section'

const RoutesSwitch = () => {
  return (
    <Box pt={4} spacing="2" direction="column" sx={{ minHeight: 'calc(100vh - 64px - 87px - 4 * 2 * 8px)' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/orikhiv-aid" />} />
        <Route path="/orikhiv-aid" element={<Home />} />

        <Route path="/orikhiv-aid/register" element={<RegisterClosed />} />
        {/* <Route path="/orikhiv-aid/new" element={<RegisterForm />} /> */}
        <Route path="/orikhiv-aid/reminder" element={<ReminderForm />} />
        <Route path="/orikhiv-aid/queue" element={<QueueForm />} />
        <Route path="/orikhiv-aid/clothes" element={<ClothesForm />} />
        <Route path="/orikhiv-aid/new" element={
          <Protected menuDisabled={true}>
            <Family />
          </Protected>
        } />
        <Route path="/orikhiv-aid/family/create" element={
          <Protected>
            <FamilyCreate />
          </Protected>
        } />

        <Route path="/orikhiv-aid/family/clarify" element={
          <Protected>
            <FamilyClarify />
          </Protected>
        } />

        {/* <Route path="/orikhiv-aid/family/clarify" element={
          <Protected>
            <FamilyCreate hasNumber={true} />
          </Protected>
        } />

        <Route path="/orikhiv-aid/family/add-person" element={
          <Protected>
            <FamilyEdit type="personAdd" />
          </Protected>
        } />

        <Route path="/orikhiv-aid/family/edit" element={
          <Protected>
            <FamilyEdit type="personEdit" />
          </Protected>
        } />

        <Route path="/orikhiv-aid/family/remove-person" element={
          <Protected>
            <FamilyEdit type="personDelete" />
          </Protected>
        } />

        <Route path="/orikhiv-aid/family/remove-family" element={
          <Protected>
            <FamilyEdit type="familyDelete" />
          </Protected>
        } /> */}

        <Route path="*" element={
          <Section sx={{ textAlign: 'center' }} maxWidth='sm'>
            Помилка 404. Сторінку не знайдено. <br />
            <NavLink to="/orikhiv-aid">Повернутись на головну</NavLink>
          </Section>
        } />
      </Routes>
    </Box>
  )
}

export default RoutesSwitch