import { Box, Typography } from '@mui/material';

const InfoComponent = () => {
  return (
    <Box
      sx={{
        color: 'black',
        backgroundColor: '#b3e5fc',
        textAlign: 'center',
        px: '1rem',
        py: '0.5rem'
      }}
    >
      <Typography variant="subtitle1" component={'p'}>
        Accelerate your teams' work with
        <Typography
          variant="subtitle1"
          component={'span'}
          sx={{
            color: '#311b92',
            fontWeight: 600,
            paddingX: '0.2rem'
          }}
        >
          Task Manager 🚀
        </Typography>
      </Typography>
    </Box>
  );
};

export default InfoComponent;
