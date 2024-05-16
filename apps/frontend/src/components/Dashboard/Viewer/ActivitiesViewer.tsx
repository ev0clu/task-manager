import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography
} from '@mui/material';
import { brown } from '@mui/material/colors';
import { format } from 'date-fns';
import { TWorkspace } from '../../../types/workspace.type';
import { TActivity } from '../../../types/activity.type';
import useQueryAllByItemId from '../../../hooks/useQueryAllByItemId';

type ActivitiesViewerProps = {
  selectedWorkspace: TWorkspace | undefined;
};

const ActivitiesViewer = ({
  selectedWorkspace
}: ActivitiesViewerProps) => {
  const { data: activities, isPending } = useQueryAllByItemId<
    TActivity[]
  >(
    'activities',
    `${import.meta.env.VITE_API_WORKSPACES}`,
    selectedWorkspace?.id
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ opacity: '0.8' }}>
        Activities
      </Typography>
      {isPending ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {activities !== undefined && activities?.length === 0 ? (
            <Typography variant="subtitle1">
              There is still no any activities!
            </Typography>
          ) : (
            activities !== undefined &&
            activities?.map((activity) => {
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
                  <Typography
                    variant="caption"
                    sx={{ opacity: '0.5' }}
                  >
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
      )}
    </Box>
  );
};

export default ActivitiesViewer;
