import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCharactersInfinity } from '../services/CharacterService';
import { Container, List } from '@mui/material';
import { CharacterElement } from '../components/CharacterElement';

export const CharactersInfinityScroll = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['character-infinity'],
      ({ pageParam = 1 }) => fetchCharactersInfinity(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => allPages.length + 1
      }
    );

  useEffect(() => {
    let fetching = false;

    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Container fixed sx={{ paddingTop: '30px' }}>
      <h2>Characters - infinity scroll</h2>
      {isFetchingNextPage && hasNextPage && <div>Loading...</div>}
      <List
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: '20px',
          width: '100%'
        }}>
        {data?.pages?.map((page) =>
          page?.results?.map((character) => (
            <CharacterElement key={character.id} character={character} />
          ))
        )}
      </List>
    </Container>
  );
};
