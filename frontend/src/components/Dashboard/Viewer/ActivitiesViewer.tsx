import { Box, List, ListItem, Typography } from '@mui/material';
import { brown } from '@mui/material/colors';
import { format } from 'date-fns';
import { TWorkspace } from '../../../types/workspace.type';

type ActivitiesViewerProps = {
  selectedWorkspace: TWorkspace | undefined;
};

const ActivitiesViewer = ({
  selectedWorkspace
}: ActivitiesViewerProps) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ opacity: '0.8' }}>
        Activities
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {selectedWorkspace !== undefined &&
        selectedWorkspace.activities?.length === 0 ? (
          <Typography variant="subtitle1">
            There is still no any activities!
          </Typography>
        ) : (
          selectedWorkspace !== undefined &&
          selectedWorkspace.activities?.map((activity) => {
            return (
              <ListItem
                key={activity.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  paddingY: 0,
                  paddingX: '0.5rem',
                  borderLeft: `5px solid ${brown[500]}`
                }}
              >
                <Typography variant="subtitle1">
                  {activity.title}
                </Typography>
                <Typography variant="caption" sx={{ opacity: '0.5' }}>
                  {format(
                    new Date(activity.createdAt),
                    'hh:mmaaa MMM do, yyyy'
                  )}
                </Typography>
              </ListItem>
            );
          })
        )}
      </List>
    </Box>
  );
};

export default ActivitiesViewer;
