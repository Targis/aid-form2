import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { NavLink } from "react-router-dom"

const RegisterClosed = () => {
  return (
    <>
      <Typography>
        З 06.03.2023 онлайн реєстрацію ВПО в гуманітарній базі призупинено <br /><br />

        На даний час реєстрація доступна лише через Простір Єдності Пологівського району за адресою:
        м. Запоріжжя, вул. Лермонтова, буд. 9, БК "Орбіта".<br /><br />

        Зверніть увагу❗️<br />
        Хто вже зареєстрований і має свій номер, звертатись у Простір Єдності НЕ потрібно!<br />
        Реєструється тільки одна особа від сім'ї!<br /><br />

        Перевірити свій номер:
        {' '}
        <Button
          variant="contained"
          color="primary"
          size="small"
          component={NavLink}
          to={'/orikhiv-aid/reminder'}>
          Нагадати номер
        </Button>

      </Typography>
    </>

  )
}

export default RegisterClosed