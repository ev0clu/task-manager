import { Box, Typography } from '@mui/material';
import trianglesSrc from '../../assets/triangles.svg';
import productivitySrc from '../../assets/productivity.png';

const BottomComponent = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          py: '3rem',
          px: '1rem',
          height: 'auto',
          width: '100%',
          backgroundImage: `url('${trianglesSrc}')`
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mx: {
              xs: '2em',
              sm: '5rem',
              md: '10rem',
              lg: '15rem',
              xl: '20rem'
            },
            textAlign: 'center'
          }}
        >
          You can see your work from a completely different
          perspective
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mx: {
              xs: '2em',
              sm: '5rem',
              md: '10rem',
              lg: '15rem'
            },
            textAlign: 'center',
            lineHeight: { xs: '1rem', sm: '1.5rem' }
          }}
        >
          You can create your projects in a personalized way, so you
          can see the current tasks from a fresh perspective.
        </Typography>
        <Box
          component="img"
          sx={{
            p: '0.5rem',
            height: 'auto',
            width: {
              sm: '15rem',
              md: '20rem',
              lg: '20rem',
              xl: '20rem'
            },
            display: { xs: 'none', sm: 'block' }
          }}
          src={productivitySrc}
          alt="productivity-img"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          py: '3rem',
          px: '2rem',
          height: 'auto',
          width: '100%'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mx: {
              xs: '2em',
              sm: '5rem',
              md: '10rem',
              lg: '15rem',
              xl: '20rem'
            }
          }}
        >
          Join into other users around the world who are getting more
          productivity with Task manager.
        </Typography>
      </Box>
    </>
  );
};

export default BottomComponent;
