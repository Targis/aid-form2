import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import SectionTitle from "components/layout/SectionTitle"

const Section = ({ children, title, bg, maxWidth = 'lg' }) => {
  return (
    <Box sx={{ background: bg ? bg : '#fff' }}>
      <Container maxWidth={maxWidth} sx={{ py: 5 }}>
        {title && (<SectionTitle title={title} />)}
        {children}
      </Container>
    </Box>
  )
}

export default Section