import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Theme,
  Typography,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TList } from '../../types/list.type';
import ListMenu from './List/ListMenu';
import ListModalCreate from './Modal/ListModalCreate';
import CardComponent from './CardComponent';
import Grid from '@mui/material/Unstable_Grid2';

type ListComponentProps = {
  workspaceId: string | undefined;
  boardId: string | undefined;
  lists: TList[] | undefined;
};

const ListComponent = ({
  workspaceId,
  boardId,
  lists
}: ListComponentProps) => {
  const matches = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up('sm')
  );
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setOpenCreateModal((prevVal) => !prevVal);
  };

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 1, sm: 1, md: 4 }}
      sx={{ height: 'max-content' }}
    >
      {lists?.map((list: TList) => {
        return (
          <Grid key={list.id}>
            <Card sx={{ width: 345, height: 'max-content' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {list.title}
                </Typography>
                <ListMenu
                  workspaceId={workspaceId}
                  boardId={boardId}
                  listId={list.id}
                  listTitle={list.title}
                />
              </CardContent>
              <CardComponent
                workspaceId={workspaceId}
                listId={list.id}
              />
            </Card>
          </Grid>
        );
      })}
      <Grid>
        <Card sx={{ width: 345, height: 'max-content' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              p: '8px'
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                justifyContent: matches ? 'start' : 'center',
                textTransform: 'none',
                fontSize: '0.9rem'
              }}
              onClick={toggleCreateModal}
            >
              <AddIcon />{' '}
              <Typography
                variant="subtitle1"
                sx={{ display: matches ? 'block' : 'none' }}
              >
                Add a list
              </Typography>
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <ListModalCreate
        openModal={openCreateModal}
        toggleModal={toggleCreateModal}
        workspaceId={workspaceId}
        boardId={boardId}
      />
    </Grid>
  );
};

export default ListComponent;
