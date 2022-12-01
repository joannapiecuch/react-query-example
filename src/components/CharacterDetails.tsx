import { Box, Container, IconButton, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCharacter } from '../services/CharacterService';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Character } from '../types/character';

export const CharacterDetails = () => {
  const queryClient = useQueryClient();

  const { characterId } = useParams();
  const { isLoading, data } = useQuery(
    ['character', characterId],
    () => fetchCharacter(characterId),
    {
      staleTime: 10000,
      // retry: 2
      initialData: () => {
        return (
          queryClient
            .getQueryData(['characters'])
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ?.results.find((el: Character) => el.id.toString() === characterId)
        );
      }
    }
  );

  if (isLoading) return <div>Loadding...</div>;

  return (
    <Container fixed sx={{ paddingTop: '30px' }}>
      <IconButton>
        <Link to="/" style={{ display: 'flex' }}>
          <ArrowBackIosIcon />
          <Typography>Back</Typography>
        </Link>
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
        <Typography variant="h4">{data?.name}</Typography>
        <img
          style={{ width: '200px', height: '200px' }}
          src={data?.image}
          alt={data?.name}
        />
      </Box>
    </Container>
  );
};
