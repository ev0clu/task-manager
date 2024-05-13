import { useState } from 'react';
import { Button, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TCard } from '../../types/card.type';
import CardModalCreate from './Modal/CardModalCreate';
import useQueryAllByItemId from '../../hooks/useQueryAllByItemId';

type CardComponentProps = {
  workspaceId: string | undefined;
  listId: string | undefined;
};

const CardComponent = ({
  workspaceId,
  listId
}: CardComponentProps) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const queryCards = useQueryAllByItemId<TCard[]>(
    'cards',
    `${import.meta.env.VITE_API_LISTS}`,
    listId
  );

  const toggleCreateModal = () => {
    setOpenCreateModal((prevVal) => !prevVal);
  };

  return (
    <>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          p: '8px'
        }}
      >
        {queryCards.data?.map((card) => {
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
          onClick={toggleCreateModal}
        >
          <AddIcon /> Add a card
        </Button>
      </CardContent>
      <CardModalCreate
        openModal={openCreateModal}
        toggleModal={toggleCreateModal}
        workspaceId={workspaceId}
        listId={listId}
      />
    </>
  );
};

export default CardComponent;
