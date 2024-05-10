import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TList } from '../../types/list.type';
import ListModal from './Modal/ListModal';
import { useState } from 'react';

type ListProps = {
  worskpaceId: string | undefined;
  boardId: string | undefined;
  lists: TList[] | undefined;
};

const List = ({ worskpaceId, boardId, lists }: ListProps) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prevVal) => !prevVal);
  };

  return (
    <Stack direction="row" gap={2}>
      {lists?.map((list: TList) => {
        return (
          <Card
            key={list.id}
            sx={{ width: 345, height: 'max-content' }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {list.title}
              </Typography>
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
            onClick={toggleModal}
          >
            <AddIcon /> Add a list
          </Button>
        </CardContent>
      </Card>
      <ListModal
        openModal={openModal}
        toggleModal={toggleModal}
        workspaceId={worskpaceId}
        boardId={boardId}
      />
    </Stack>
  );
};

export default List;
