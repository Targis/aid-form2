import { LinearProgress, Box, Typography } from '@mui/material'

const LinearProgressWithLabel = ({ value, title = 'Залишилось місць', ...props }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
      <Box sx={{ flex: '1 0 auto' }}>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
      </Box>
      <Box sx={{ width: '100%', mx: 1 }}>
        <LinearProgress variant="determinate" {...props} value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${value}%`}</Typography>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel