import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import { NavLink } from "react-router-dom"



const CategoryItem = ({ name, text, link, active }) => {
  return (
    <Card elevation={1} sx={{ height: '222px', pb: 2, display: 'flex', flexDirection: 'column', justifyContent: "space-between", opacity: active ? 1 : 0.5 }}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ mb: 1.5 }}>
          {name}
        </Typography>
        <Typography variant="body2">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        {active ? (
          <Button
            variant="outlined"
            component={NavLink}
            to={link}
            size="small"
          >
            Перейти
          </Button>
        ) : (
          <Button disabled>Неактивно</Button>
        )}

      </CardActions>
    </Card>
  )
}

export default CategoryItem