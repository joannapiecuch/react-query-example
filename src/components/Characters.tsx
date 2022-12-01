import { ChangeEvent, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCharacters } from '../services/CharacterService';
import Pagination from '@mui/material/Pagination';
import { Container, List } from '@mui/material';
import { CharacterElement } from './CharacterElement';
import { Character } from '../types/character';

export const Characters = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['characters'],
    () => fetchCharacters(page),
    {
      keepPreviousData: true,
      staleTime: 12000,
      cacheTime: 6000,
      onSuccess: (characters) => {
        characters?.results?.forEach((character) => {
          queryClient.setQueryData(['character', character.id], character);
        });
      }
    }
  );

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fixed sx={{ paddingTop: '30px' }}>
      <h2>Characters</h2>
      {/*<button onClick={() => refetch()}>REFETCH DATA</button>*/}
      <List
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: '20px',
          width: '100%'
        }}>
        {' '}
        {data?.results?.map((character: Character) => (
          <CharacterElement key={character.id} character={character} />
        ))}
      </List>
      {data?.info?.pages && data?.info?.pages > 1 && (
        <Pagination
          count={data?.info?.pages}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationChange}
        />
      )}
    </Container>
  );
};
