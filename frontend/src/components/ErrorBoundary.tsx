import { Box, Divider, Typography } from '@mui/material';

const ErrorBoundary = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#FFFFFF'
      }}
    >
      <Typography
        variant="h1"
        sx={{
          display: 'block',
          mr: '1.25rem',
          pr: '1.5rem',
          verticalAlign: 'top',
          fontSize: '3rem',
          lineHeight: '3rem',
          fontWeight: '600'
        }}
      >
        404
      </Typography>
      <Divider
        orientation="vertical"
        variant="middle"
        sx={{ height: '2.5rem', color: '#9e9e9e' }}
      />
      <Box sx={{ display: 'block', ml: '1.25rem' }}>
        <Typography
          variant="h1"
          sx={{
            m: 0,
            fontSize: '0.875rem',
            fontWeight: '400',
            lineHeight: '3rem'
          }}
        >
          This page could not be found
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorBoundary;
