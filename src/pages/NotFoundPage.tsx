import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Box sx={{ textAlign: 'center', py: 12, px: 2 }}>
      <Typography variant="h1" sx={{ fontSize: '5rem', color: 'primary.main', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! We couldn't find that page.
      </Typography>
      <Button component={NavLink} to="/" variant="contained" color="primary" sx={{ mt: 3 }}>
        Back to Home
      </Button>
    </Box>
  );
}
