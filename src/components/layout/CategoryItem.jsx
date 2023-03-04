import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import { NavLink } from "react-router-dom"



const CategoryItem = ({ name, text, link }) => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ mb: 1.5 }}>
          {name}
        </Typography>
        <Typography variant="body2">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          component={NavLink}
          to={link}
          size="small"
        >
          Перейти
        </Button>
      </CardActions>
    </Card>
  )
}

export default CategoryItem