import { Character } from '../types/character';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

interface Props {
  character: Character;
}
export const CharacterElement = ({ character }: Props) => {
  return (
    <li key={character.id}>
      <Link to={`character/${character.id}`}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          <Typography variant="h4">{character?.name}</Typography>
          <img
            style={{ width: '200px', height: '200px', objectFit: 'contain' }}
            src={character?.image}
            alt={character?.name}
          />
        </Box>
      </Link>
    </li>
  );
};
