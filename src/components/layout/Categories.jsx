import { forwardRef } from "react"
import Section from "components/layout/Section"
import CategoryItem from "components/layout/CategoryItem"
import Grid from "@mui/material/Grid"


const cards = [
  {
    id: 1,
    name: 'Продуктові набори',
    text: 'Реєстрація в базі Оріхівської громади на отримання допомоги у вигляді продуктів харчування',
    link: 'register',
    active: true
  },
  {
    id: 2,
    name: 'Грошова допомога',
    text: 'Запис в електронну чергу для оформлення грошової допомоги від благодійних організацій',
    link: 'queue',
    active: false
  },
  {
    id: 3,
    name: 'Теплий одяг',
    text: 'Бронювання одягу з можливістю вибору потрібного розміру',
    link: 'clothes',
    active: false
  },
  {
    id: 4,
    name: 'Альтернативне опалення',
    text: 'Збір даних щодо потреби в альтернативних джерелах опалення (буржуйки)',
    link: 'register',
    active: false
  },
]

const Categories = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Section id={"categories-section"} title={'Няпрямки допомоги'} bg={'#f5f5f5'}>
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item md={3} xs={12} key={card?.id}>
              <CategoryItem {...card} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  )
})

export default Categories