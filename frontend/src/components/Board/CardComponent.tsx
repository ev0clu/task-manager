import { useState } from 'react';
import { Button, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TCard } from '../../types/card.type';
import CardModalCreate from './Modal/CardModalCreate';
import useQueryAllByItemId from '../../hooks/useQueryAllByItemId';
import CardModalUpdate from './Modal/CardModalUpdate';

type CardComponentProps = {
  workspaceId: string | undefined;
  listId: string | undefined;
};

const CardComponent = ({
  workspaceId,
  listId
}: CardComponentProps) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState('');

  const queryCards = useQueryAllByItemId<TCard[]>(
    'cards',
    `${import.meta.env.VITE_API_LISTS}`,
    listId
  );

  const toggleCreateModal = () => {
    setOpenCreateModal((prevVal) => !prevVal);
  };

  const toggleUpdateModal = (id: string) => {
    setSelectedCardId(id);
    setOpenUpdateModal((prevVal) => !prevVal);
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
            <div key={card.id}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  width: '100%',
                  justifyContent: 'start',
                  textTransform: 'none',
                  fontSize: '0.9rem'
                }}
                onClick={() => toggleUpdateModal(card.id)}
              >
                {card.title}
              </Button>
            </div>
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
      <CardModalUpdate
        openModal={openUpdateModal}
        toggleModal={toggleUpdateModal}
        workspaceId={workspaceId}
        listId={listId}
        card={queryCards.data?.find(
          (card) => card.id === selectedCardId
        )}
      />
    </>
  );
};

export default CardComponent;
