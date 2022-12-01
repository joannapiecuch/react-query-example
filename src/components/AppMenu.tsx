import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const AppMenu = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginRight: '20px' }}>
              Home
            </Typography>
          </Link>
          <Link to="/infinity">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Infinity scroll
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
