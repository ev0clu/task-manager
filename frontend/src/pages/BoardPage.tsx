import { useParams } from 'react-router-dom';
import useQueryAllByItemId from '../hooks/useQueryAllByItemId';
import useQueryByItemId from '../hooks/useQueryByItemId';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { TList } from '../types/list.type';
import { TBoard } from '../types/board.type';
import AddIcon from '@mui/icons-material/Add';
import BoardTitleForm from '../components/Board/BordTitleForm';

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();

  const queryBoard = useQueryByItemId<TBoard>(
    'board',
    `${import.meta.env.VITE_API_BOARDS}`,
    boardId
  );

  const queryLists = useQueryAllByItemId<TList[]>(
    'lists',
    `${import.meta.env.VITE_API_BOARDS}`,
    boardId
  );

  return (
    <div>
      {queryBoard.isPending || queryLists.isPending ? (
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
          <Stack direction="row" gap={2}>
            {queryLists.data?.map((list) => {
              return (
                <Card
                  key={list.id}
                  sx={{ width: 345, height: 'max-content' }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
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
                >
                  <AddIcon /> Add a list
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      )}
    </div>
  );
};

export default BoardPage;
