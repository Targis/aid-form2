import React from "react"
import Box from "@mui/material/Box"
import SectionTitle from "components/layout/SectionTitle"

const Section = ({ children, title }) => {
  // console.log(children)
  return (
    <Box sx={{ py: 5 }}>
      <SectionTitle title={title} />
      {children}
    </Box>
  )
}

export default Section