import { useParams } from 'react-router-dom';
import useQueryByItemId from '../hooks/useQueryByItemId';
import { Box, CircularProgress, Container } from '@mui/material';
import { TBoard } from '../types/board.type';
import BoardTitleForm from '../components/Board/BordTitleForm';
import ListComponent from '../components/Board/ListComponent';

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();

  const queryBoard = useQueryByItemId<TBoard>(
    'board',
    `${import.meta.env.VITE_API_BOARDS}`,
    boardId
  );

  return (
    <div>
      {queryBoard.isPending ? (
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
        <Container>
          <BoardTitleForm board={queryBoard.data} />
          <ListComponent
            workspaceId={queryBoard.data?.workspaceId}
            boardId={queryBoard.data?.id}
            lists={queryBoard.data?.lists}
          />
        </Container>
      )}
    </div>
  );
};

export default BoardPage;
