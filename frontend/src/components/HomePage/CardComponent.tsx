import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography
} from '@mui/material';
import { lightGreen, orange, teal } from '@mui/material/colors';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

function CardComponent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'start', sm: 'center' },
        alignItems: { xs: 'center', sm: 'center' },
        gap: { xs: '1rem', sm: '1rem', md: '2rem' },
        py: '3rem',
        mx: {
          xs: '2em',
          sm: '3rem',
          md: '5rem',
          lg: '8rem',
          xl: '12rem'
        }
      }}
    >
      <Card
        sx={{
          height: '16rem',
          width: '18rem',
          position: 'relative',
          borderRadius: '0.5rem'
        }}
      >
        <FolderIcon
          fontSize="large"
          sx={{
            color: orange[600],
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '0.5rem'
          }}
        />
        <CardHeader
          sx={{ backgroundColor: orange[600], height: '2.5rem' }}
        />
        <CardContent>
          <Typography variant="h5" sx={{ mb: '0.5rem' }}>
            Project management
          </Typography>
          <Typography variant="subtitle2">
            Organize tasks and meet deadlines.
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          height: '16rem',
          width: '18rem',
          position: 'relative',
          borderRadius: '0.5rem'
        }}
      >
        <AssignmentIcon
          fontSize="large"
          sx={{
            color: lightGreen[500],
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '0.5rem'
          }}
        />
        <CardHeader
          sx={{
            backgroundColor: lightGreen[500],
            height: '2.5rem'
          }}
        />
        <CardContent>
          <Typography variant="h5" sx={{ mb: '0.5rem' }}>
            Task management
          </Typography>
          <Typography>
            You can track, manage, complete and bring together tasks
            like pieces of a puzzle.
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          height: '16rem',
          width: '18rem',
          position: 'relative',
          borderRadius: '0.5rem'
        }}
      >
        <LightbulbIcon
          fontSize="large"
          sx={{
            color: teal[500],
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '0.5rem'
          }}
        />
        <CardHeader
          sx={{ backgroundColor: teal[500], height: '2.5rem' }}
        />
        <CardContent>
          <Typography variant="h5" sx={{ mb: '0.5rem' }}>
            Idea management
          </Typography>
          <Typography variant="subtitle2">
            Unleash your creativity and keep ideas visible, manageable
            and actionable.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardComponent;
