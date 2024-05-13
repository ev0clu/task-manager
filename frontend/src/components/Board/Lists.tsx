import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TList } from '../../types/list.type';
import ListMenu from './Lists/ListMenu';
import ListModalCreate from './Modal/ListModalCreate';

type ListProps = {
  workspaceId: string | undefined;
  boardId: string | undefined;
  lists: TList[] | undefined;
};

const List = ({ workspaceId, boardId, lists }: ListProps) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setOpenCreateModal((prevVal) => !prevVal);
  };

  return (
    <Stack direction="row" gap={2}>
      {lists?.map((list: TList) => {
        return (
          <Card
            key={list.id}
            sx={{ width: 345, height: 'max-content' }}
          >
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
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                p: '8px'
              }}
            >
              {list.cards?.map((card) => {
                return (
                  <Button
                    key={card.id}
                    variant="contained"
                    size="small"
                    sx={{
                      width: '100%',
                      justifyContent: 'start',
                      textTransform: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    {card.title}
                  </Button>
                );
              })}
              <Button
                variant="outlined"
                size="small"
                sx={{
                  width: '100%',
                  justifyContent: 'start',
                  textTransform: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <AddIcon /> Add a card
              </Button>
            </CardContent>
          </Card>
        );
      })}
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
              justifyContent: 'start',
              textTransform: 'none',
              fontSize: '0.9rem'
            }}
            onClick={toggleCreateModal}
          >
            <AddIcon /> Add a list
          </Button>
        </CardContent>
      </Card>
      <ListModalCreate
        openModal={openCreateModal}
        toggleModal={toggleCreateModal}
        workspaceId={workspaceId}
        boardId={boardId}
      />
    </Stack>
  );
};

export default List;
